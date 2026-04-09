import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';
import { SCREENING_QUESTIONS } from '../../data/screeningQuestions';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ScreeningQuestion'>;
  route: RouteProp<OnboardingStackParamList, 'ScreeningQuestion'>;
};

const { width } = Dimensions.get('window');
const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const SECTION_COLORS: Record<string, string> = {
  grammar: '#3DAA6D',
  vocabulary: '#7C5CBF',
  reading: '#E5890A',
  listening: '#1A85C8',
};

const SECTION_LABELS: Record<string, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
};

const ScreeningQuestionScreen = ({ navigation, route }: Props) => {
  const { language, knowledgeLevel, reason, questionIndex, answers } = route.params;
  const question = SCREENING_QUESTIONS[questionIndex];
  const total = SCREENING_QUESTIONS.length;

  const [selected, setSelected] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const showQuitDialog = () => {
    Alert.alert(
      'Quit Test?',
      'If you go back, all your answers so far will be lost and you\'ll need to start over.',
      [
        { text: 'Continue Test', style: 'cancel' },
        {
          text: 'Quit',
          style: 'destructive',
          onPress: () => navigation.navigate('LevelCheck', {
            language,
            knowledgeLevel,
            reason,
          }),
        },
      ],
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        showQuitDialog();
        return true;
      });
      return () => subscription.remove();
    }, []),
  );

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    const nextIndex = questionIndex + 1;

    if (nextIndex >= total) {
      navigation.navigate('ScreeningResult', {
        language,
        knowledgeLevel,
        reason,
        answers: newAnswers,
      });
    } else {
      navigation.push('ScreeningQuestion', {
        language,
        knowledgeLevel,
        reason,
        questionIndex: nextIndex,
        answers: newAnswers,
      });
    }
  };

  const progress = ((questionIndex + 1) / total) * 100;
  const sectionColor = SECTION_COLORS[question.type] ?? '#3DAA6D';
  const sectionLabel = SECTION_LABELS[question.type] ?? question.type;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={showQuitDialog}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.counter}>{questionIndex + 1}/{total}</Text>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>⏱ {formatTime(elapsed)}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: sectionColor }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section tag */}
        <View style={[styles.sectionTag, { backgroundColor: sectionColor + '22', borderColor: sectionColor }]}>
          <Text style={[styles.sectionLabel, { color: sectionColor }]}>{sectionLabel} · Level {question.level}</Text>
        </View>

        {/* Reading passage */}
        {question.passage && (
          <View style={styles.passageCard}>
            <Text style={styles.passageTitle}>📄 Read the passage:</Text>
            <Text style={styles.passageText}>{question.passage}</Text>
          </View>
        )}

        {/* Listening audio card */}
        {question.audioText && (
          <View style={styles.audioCard}>
            <View style={styles.audioTop}>
              <View style={styles.audioIconCircle}>
                <Text style={{ fontSize: 22 }}>🔊</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.audioTitle}>Listen to the audio</Text>
                <Text style={styles.audioDuration}>Duration: {question.audioDuration}</Text>
              </View>
            </View>
            {/* Simulated waveform */}
            <View style={styles.waveRow}>
              {Array.from({ length: 32 }).map((_, i) => {
                const h = 4 + Math.abs(Math.sin(i * 0.7) * 18);
                return <View key={i} style={[styles.waveBar, { height: h }]} />;
              })}
            </View>
            <View style={styles.audioScript}>
              <Text style={styles.audioScriptText}>{question.audioText}</Text>
            </View>
          </View>
        )}

        {/* Question */}
        <Text style={styles.questionText}>{question.question}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionBtn,
                  isSelected && { borderColor: sectionColor, backgroundColor: sectionColor + '18' },
                ]}
                onPress={() => setSelected(idx)}
                activeOpacity={0.7}>
                <View style={[styles.optionLetter, isSelected && { backgroundColor: sectionColor }]}>
                  <Text style={[styles.optionLetterText, isSelected && { color: '#fff' }]}>
                    {OPTION_LETTERS[idx]}
                  </Text>
                </View>
                <Text style={[styles.optionText, isSelected && { color: sectionColor, fontWeight: '600' }]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Next button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: selected !== null ? sectionColor : '#C8C8C8' }]}
          onPress={handleNext}
          disabled={selected === null}
          activeOpacity={0.85}>
          <Text style={styles.nextText}>
            {questionIndex + 1 === total ? 'Finish Test' : 'Next Question →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 20, color: '#333' },
  counter: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  timerBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timerText: { fontSize: 13, fontWeight: '600', color: '#555' },
  progressTrack: {
    height: 5,
    backgroundColor: '#E8E8E8',
    width: '100%',
  },
  progressFill: {
    height: 5,
    borderRadius: 3,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  sectionTag: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 16,
  },
  sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.3 },
  passageCard: {
    backgroundColor: '#F0F7FF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D0E8FF',
  },
  passageTitle: { fontSize: 13, fontWeight: '700', color: '#1A85C8', marginBottom: 8 },
  passageText: { fontSize: 14, color: '#333', lineHeight: 22 },
  audioCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  audioTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  audioIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  audioDuration: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginBottom: 14,
    height: 30,
  },
  waveBar: {
    width: (width - 96) / 34,
    backgroundColor: '#3DAA6D',
    borderRadius: 2,
  },
  audioScript: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 10,
    padding: 12,
  },
  audioScriptText: { color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 20, fontStyle: 'italic' },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 26,
    marginBottom: 20,
  },
  optionsContainer: { gap: 10 },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  optionLetter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterText: { fontSize: 13, fontWeight: '700', color: '#555' },
  optionText: { flex: 1, fontSize: 14, color: '#1A1A1A', lineHeight: 20 },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  nextBtn: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ScreeningQuestionScreen;
