import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { HomeStackParamList } from '../../navigation/types';
import { getCurriculumByLevel, Chapter } from '../../data/curriculum';
import { useProgress } from '../../context/ProgressContext';
import AppIcon from '../../components/AppIcon';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'ChapterList'>;
};

const CHAPTER_ICONS: Record<number, string> = { 1: '📖', 2: '⏰', 3: '💬', 4: '📋', 5: '💭' };

const ChapterCard = ({
  chapter,
  status,
  progress,
  progressTotal,
  onPress,
  colors,
}: {
  chapter: Chapter;
  status: 'done' | 'active' | 'locked';
  progress: number;
  progressTotal: number;
  onPress: () => void;
  colors: any;
}) => {
  const isLocked = status === 'locked';
  const isDone = status === 'done';

  return (
    <TouchableOpacity
      style={[
        styles.chapterCard,
        {
          backgroundColor: colors.bg,
          borderColor: status === 'active' ? Colors.primary : colors.border,
          borderWidth: status === 'active' ? 1.5 : 1,
          opacity: isLocked ? 0.55 : 1,
        },
      ]}
      onPress={isLocked ? undefined : onPress}
      disabled={isLocked}
      activeOpacity={0.75}>
      {/* Icon */}
      <View style={[styles.chapterIcon, { backgroundColor: chapter.iconBg }]}>
        {isLocked
          ? <AppIcon name="lock" size={22} />
          : <Text style={styles.chapterIconText}>{CHAPTER_ICONS[chapter.id]}</Text>
        }
      </View>

      {/* Info */}
      <View style={styles.chapterInfo}>
        <Text style={[styles.chapterNum, { color: Colors.primary }]}>
          Chapter {chapter.id}
        </Text>
        <Text style={[styles.chapterTitle, { color: colors.text }]} numberOfLines={1}>
          {chapter.title}
        </Text>
        <View style={styles.chapterMeta}>
          <Text style={[styles.metaText, { color: colors.textSub }]}>
            {chapter.lessons.length} lessons
          </Text>
          <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
          <Text style={[styles.metaText, { color: colors.textSub }]}>
            {chapter.estimatedTime}
          </Text>
        </View>
      </View>

      {/* Right side */}
      <View style={styles.chapterRight}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isDone
                ? Colors.primaryLight
                : status === 'active'
                ? Colors.primary
                : colors.inputBg,
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color: isDone
                  ? Colors.primaryDark
                  : status === 'active'
                  ? '#fff'
                  : colors.textSub,
              },
            ]}>
            {isDone ? 'Done' : status === 'active' ? 'Active' : 'Locked'}
          </Text>
        </View>
        <View
          style={[
            styles.progressRing,
            {
              borderColor: isDone
                ? Colors.primary
                : status === 'active'
                ? Colors.primary
                : colors.border,
              backgroundColor: isDone ? Colors.primary : 'transparent',
            },
          ]}>
          {isDone ? (
            <Text style={styles.ringTextDone}>✓</Text>
          ) : (
            <Text style={[styles.ringText, { color: isDone ? '#fff' : Colors.primary }]}>
              {progress}/{progressTotal}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }: Props) => {
  const { colors, isDark } = useTheme();
  const { profile } = useAuth();
  const { getChapterProgress, isChapterUnlocked } = useProgress();
  const insets = useSafeAreaInsets();

  const level = profile?.languageLevel || 'B1';
  const chapters = getCurriculumByLevel(level);

  const LEVEL_NAMES: Record<string, string> = {
    A1: 'Beginner', A2: 'Elementary',
    B1: 'Intermediate', B2: 'Upper Intermediate',
    C1: 'Advanced', C2: 'Proficient',
  };
  const levelName = LEVEL_NAMES[level] ?? 'Intermediate';

  const getChapterStatus = (chapterId: number): 'done' | 'active' | 'locked' => {
    if (!isChapterUnlocked(chapterId)) { return 'locked'; }
    const p = getChapterProgress(chapterId);
    if (p.attempted) { return isChapterUnlocked(chapterId + 1) ? 'done' : 'active'; }
    return 'active';
  };

  const completedChapters = chapters.filter(ch => getChapterProgress(ch.id).attempted).length;
  const overallProgress = Math.round((completedChapters / chapters.length) * 100);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <View style={[styles.topBar, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.languageBtn}>
          <Image
            source={require('../../../assets/images/logo_icon.png')}
            style={styles.topBarLogo}
            resizeMode="contain"
          />
          <Text style={styles.flagLarge}>🇬🇧</Text>
          <Text style={[styles.chevron, { color: colors.text }]}>▼</Text>
        </TouchableOpacity>
        <View style={styles.topStats}>
          <View style={styles.statItem}>
            <AppIcon name="fire" size={20} />
            <Text style={[styles.statVal, { color: colors.text }]}>0</Text>
          </View>
          <View style={styles.statItem}>
            <AppIcon name="star" size={20} />
            <Text style={[styles.statVal, { color: colors.text }]}>0/20</Text>
          </View>
          <TouchableOpacity>
            <AppIcon name="notification" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Level Row ───────────────────────────────────────────── */}
      <View style={styles.levelRow}>
        <TouchableOpacity style={styles.levelBtn}>
          <Text style={[styles.levelText, { color: colors.text }]}>
            {levelName} · {level}
          </Text>
          <Text style={[styles.chevron, { color: colors.text }]}>▼</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <AppIcon name="star_outline" size={22} opacity={0.5} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Progress Card ───────────────────────────────────────── */}
        <View style={[styles.progressCard, { backgroundColor: Colors.primaryLight, borderColor: Colors.primary }]}>
          <View style={styles.progressCardTop}>
            <Text style={[styles.progressCardTitle, { color: Colors.primaryDark }]}>
              {level} {levelName} · Overall Progress
            </Text>
            <Text style={[styles.progressPct, { color: Colors.primary }]}>
              {overallProgress}%
            </Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: '#c8edda' }]}>
            <View
              style={[
                styles.progressBarFill,
                {
                  backgroundColor: Colors.primary,
                  width: `${overallProgress}%` as any,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressSub, { color: Colors.primaryDark }]}>
            {completedChapters} of {chapters.length} chapters completed
          </Text>
        </View>

        {/* ── Premium Banner ──────────────────────────────────────── */}
        {!profile?.isPremium && (
          <View style={[styles.premiumBanner, { backgroundColor: Colors.primaryLight, borderColor: Colors.primary }]}>
            <Text style={styles.premiumText}>7 days - Free</Text>
            <Text style={[styles.premiumSub, { color: Colors.primary }]}>
              Try Premium For Free
            </Text>
          </View>
        )}

        {/* ── Chapter List ────────────────────────────────────────── */}
        <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>
          All Chapters
        </Text>

        {chapters.map(chapter => {
          const cp = getChapterProgress(chapter.id);
          return (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            status={getChapterStatus(chapter.id)}
            progress={cp.attempted ? cp.score : 0}
            progressTotal={cp.attempted ? cp.total : chapter.questions.length}
            colors={colors}
            onPress={() => {
              navigation.navigate('LessonDetail', {
                chapterId: chapter.id,
                lessonIndex: 0,
              });
            }}
          />
        );})}

        <View style={{ height: 28 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  languageBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  topBarLogo: { width: 28, height: 28 },
  flagLarge: { fontSize: 26 },
  chevron: { fontSize: 12 },
  topStats: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statIcon: { fontSize: 18 },
  statVal: { fontSize: 15, fontWeight: '600' },

  // Level row
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  levelBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  levelText: { fontSize: 16, fontWeight: '600' },

  scroll: { flex: 1 },

  // Progress card
  progressCard: {
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  progressCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressPct: { fontSize: 13, fontWeight: '700' },
  progressBarBg: {
    height: 8,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: { height: '100%', borderRadius: 6, minWidth: 6 },
  progressSub: { fontSize: 11, fontWeight: '500' },

  // Premium
  premiumBanner: {
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  premiumText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  premiumSub: { fontSize: 13, marginTop: 2 },

  // Section label
  sectionLabel: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // Chapter card
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderRadius: 16,
  },
  chapterIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chapterIconText: { fontSize: 22 },
  chapterInfo: { flex: 1 },
  chapterNum: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 1 },
  chapterTitle: { fontSize: 14, fontWeight: '700', marginBottom: 3 },
  chapterMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 11, fontWeight: '500' },
  metaDot: { width: 3, height: 3, borderRadius: 2 },
  chapterRight: { alignItems: 'flex-end', gap: 6 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 7,
  },
  statusText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  progressRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: { fontSize: 9, fontWeight: '700' },
  ringTextDone: { fontSize: 13, color: '#fff', fontWeight: '700' },
});

export default HomeScreen;
