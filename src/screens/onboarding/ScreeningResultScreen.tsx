import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';
import { calculateLevel, calculateSectionScores } from '../../data/screeningQuestions';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ScreeningResult'>;
  route: RouteProp<OnboardingStackParamList, 'ScreeningResult'>;
};

const SECTION_COLORS: Record<string, string> = {
  Grammar: '#3DAA6D',
  Vocabulary: '#7C5CBF',
  Reading: '#E5890A',
  Listening: '#1A85C8',
};

const NEXT_STEPS: Record<string, string[]> = {
  A1: ['Learn basic greetings & vocabulary', 'Practice simple sentence structures', 'Listen to beginner English content'],
  A2: ['Expand everyday vocabulary', 'Practice past & future tenses', 'Read simple short texts daily'],
  B1: ['Work on complex grammar patterns', 'Build academic & formal vocabulary', 'Practice listening to podcasts'],
  B2: ['Focus on nuanced vocabulary & idioms', 'Practice writing essays & reports', 'Watch English content without subtitles'],
  C1: ['Refine advanced grammar usage', 'Read complex academic texts', 'Practice professional English speaking'],
};

const ScreeningResultScreen = ({ navigation, route }: Props) => {
  const { language, knowledgeLevel, reason, answers } = route.params;
  const { score, result } = calculateLevel(answers);
  const sections = calculateSectionScores(answers);
  const tips = NEXT_STEPS[result.level] ?? NEXT_STEPS['B1'];

  const handleStart = () => {
    navigation.navigate('DailyPractice', {
      language,
      knowledgeLevel,
      reason,
      level: result.level,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header card */}
      <View style={styles.headerCard}>
        <Text style={styles.resultEmoji}>{result.emoji}</Text>
        <Text style={styles.levelBadge}>{result.level}</Text>
        <Text style={styles.levelLabel}>{result.label}</Text>
        <Text style={styles.levelDesc}>{result.description}</Text>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>Score: {score}/20 correct</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Skill breakdown */}
        <Text style={styles.sectionTitle}>Skill Breakdown</Text>
        {sections.map((sec) => {
          const color = SECTION_COLORS[sec.name] ?? '#3DAA6D';
          return (
            <View key={sec.name} style={styles.skillRow}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{sec.name}</Text>
                <Text style={[styles.skillPct, { color }]}>{sec.pct}%</Text>
              </View>
              <View style={styles.skillTrack}>
                <View style={[styles.skillFill, { width: `${sec.pct}%`, backgroundColor: color }]} />
              </View>
              <Text style={styles.skillSub}>{sec.correct}/{sec.total} correct</Text>
            </View>
          );
        })}

        {/* Recommended steps */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Your Recommended Next Steps</Text>
        {tips.map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startBtn} onPress={handleStart} activeOpacity={0.85}>
          <Text style={styles.startText}>Start Learning at {result.level}  →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  headerCard: {
    backgroundColor: '#1B4332',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  resultEmoji: { fontSize: 56, marginBottom: 8 },
  levelBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3DAA6D',
    backgroundColor: 'rgba(61,170,109,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
  },
  levelLabel: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 6 },
  levelDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  scorePill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  scoreText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  skillRow: { marginBottom: 16 },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  skillName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  skillPct: { fontSize: 14, fontWeight: '700' },
  skillTrack: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  skillFill: { height: 8, borderRadius: 4 },
  skillSub: { fontSize: 12, color: '#888' },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3DAA6D',
    marginTop: 5,
  },
  tipText: { flex: 1, fontSize: 14, color: '#333', lineHeight: 20 },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  startBtn: {
    backgroundColor: '#3DAA6D',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ScreeningResultScreen;
