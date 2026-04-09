import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export interface ChapterProgress {
  score: number;
  total: number;
  attempted: boolean;
}

interface ProgressContextType {
  progress: Record<number, ChapterProgress>;
  saveChapterProgress: (chapterId: number, score: number, total: number) => Promise<void>;
  getChapterProgress: (chapterId: number) => ChapterProgress;
  isChapterUnlocked: (chapterId: number) => boolean;
}

const defaultProgress: ChapterProgress = { score: 0, total: 0, attempted: false };

const ProgressContext = createContext<ProgressContextType>({
  progress: {},
  saveChapterProgress: async () => {},
  getChapterProgress: () => defaultProgress,
  isChapterUnlocked: () => false,
});

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Record<number, ChapterProgress>>({});

  const storageKey = user ? `sprazy_progress_${user.uid}` : null;

  // Load progress whenever the logged-in user changes
  useEffect(() => {
    if (!storageKey) {
      setProgress({});
      return;
    }
    AsyncStorage.getItem(storageKey).then(raw => {
      if (raw) {
        try { setProgress(JSON.parse(raw)); } catch {}
      } else {
        setProgress({});
      }
    });
  }, [storageKey]);

  const saveChapterProgress = useCallback(
    async (chapterId: number, score: number, total: number) => {
      if (!storageKey) { return; }
      const updated = {
        ...progress,
        [chapterId]: { score, total, attempted: true },
      };
      setProgress(updated);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
    },
    [progress, storageKey],
  );

  const getChapterProgress = useCallback(
    (chapterId: number): ChapterProgress => progress[chapterId] ?? defaultProgress,
    [progress],
  );

  // Chapter 1 is always unlocked. Each subsequent chapter unlocks when the
  // previous chapter's quiz has been attempted at least once.
  const isChapterUnlocked = useCallback(
    (chapterId: number): boolean => {
      if (chapterId === 1) { return true; }
      return !!(progress[chapterId - 1]?.attempted);
    },
    [progress],
  );

  return (
    <ProgressContext.Provider
      value={{ progress, saveChapterProgress, getChapterProgress, isChapterUnlocked }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
