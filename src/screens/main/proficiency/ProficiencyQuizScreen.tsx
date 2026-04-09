import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../../theme/colors';
import { useTheme } from '../../../context/ThemeContext';
import { ProficiencyStackParamList } from '../../../navigation/types';
import { getCourseById } from '../../../data/proficiencyData';

type Props = {
  navigation: NativeStackNavigationProp<ProficiencyStackParamList, 'ProficiencyQuiz'>;
  route: RouteProp<ProficiencyStackParamList, 'ProficiencyQuiz'>;
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const ProficiencyQuizScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { courseId, lessonId } = route.params;

  const course = getCourseById(courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const questions = lesson?.quiz ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!course || !lesson || questions.length === 0) { return null; }

  const currentQ = questions[currentIndex];
  const progressPct = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;
  const isCorrect = selectedOption === currentQ.correctAnswer;

  const handleSelect = (index: number) => {
    if (showFeedback) { return; }
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) { return; }
    if (isCorrect) { setScore(prev => prev + 1); }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  // ── Finished Screen ───────────────────────────────────────────────────────
  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    const isPerfect = score === questions.length;
    const isGood = pct >= 60;

    return (
      <View style={[styles.container, { backgroundColor: Colors.primaryLight }]}>
        <StatusBar barStyle="dark-content" />
        <View style={[styles.finishCard, { backgroundColor: colors.bg }]}>
          <Text style={styles.finishEmoji}>
            {isPerfect ? '🏆' : isGood ? '🎉' : '💪'}
          </Text>
          <Text style={[styles.finishTitle, { color: colors.text }]}>
            {isPerfect ? 'Perfect Score!' : isGood ? 'Well Done!' : 'Keep Practicing!'}
          </Text>
          <Text style={[styles.finishSub, { color: colors.textSub }]}>
            You scored {score} out of {questions.length}
          </Text>

          <View style={styles.finishScoreBig}>
            <Text style={styles.finishScoreNum}>{pct}%</Text>
          </View>

          <View style={styles.finishProgress}>
            <View style={[styles.finishFill, { width: `${pct}%` }]} />
          </View>

          <Text style={[styles.finishXp, { color: Colors.primary }]}>
            +{score * 10} XP earned
          </Text>

          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setShowFeedback(false);
              setScore(0);
              setIsFinished(false);
            }}
            activeOpacity={0.85}>
            <Text style={styles.retryBtnText}>Retry Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.backToLessonBtn, { borderColor: colors.border }]}
            onPress={() => navigation.navigate('CourseDetail', { courseId })}
            activeOpacity={0.75}>
            <Text style={[styles.backToLessonText, { color: colors.text }]}>Back to Course</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Quiz Screen ───────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: Colors.primaryLight }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.backIcon, { color: Colors.primaryDark }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: Colors.primaryDark }]}>
            {lesson.title} Quiz
          </Text>
          <View style={styles.scoreTag}>
            <Text style={styles.scoreTagText}>Score: {score}/{questions.length}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
      </View>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <ScrollView
        style={[styles.body, { backgroundColor: Colors.primaryLight }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyContent}>

        <Text style={styles.qType}>{currentQ.questionType}</Text>
        <Text style={[styles.qNum, { color: colors.textSub }]}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <Text style={[styles.qText, { color: '#0a2e15' }]}>{currentQ.question}</Text>

        {/* Context Box */}
        {currentQ.context && (
          <View style={[styles.contextBox, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
            <Text style={styles.contextLabel}>{currentQ.context.label}</Text>
            <Text style={[styles.contextText, { color: colors.text }]}>
              {currentQ.context.text}
            </Text>
          </View>
        )}

        {/* Options */}
        <View style={styles.options}>
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isRightAnswer = i === currentQ.correctAnswer;

            let bgColor = colors.bg;
            let borderColor = colors.border;
            let letterBg = Colors.primaryLight;
            let letterColor = Colors.primaryDark;

            if (showFeedback) {
              if (isRightAnswer) {
                bgColor = '#edfaf2';
                borderColor = Colors.primary;
                letterBg = Colors.primary;
                letterColor = '#fff';
              } else if (isSelected && !isRightAnswer) {
                bgColor = '#fff0f0';
                borderColor = '#f28b82';
                letterBg = '#f28b82';
                letterColor = '#fff';
              }
            } else if (isSelected) {
              bgColor = '#edfaf2';
              borderColor = Colors.primary;
              letterBg = Colors.primary;
              letterColor = '#fff';
            }

            return (
              <TouchableOpacity
                key={i}
                style={[styles.option, { backgroundColor: bgColor, borderColor }]}
                onPress={() => handleSelect(i)}
                activeOpacity={showFeedback ? 1 : 0.75}>
                <View style={[styles.optionLetter, { backgroundColor: letterBg }]}>
                  <Text style={[styles.optionLetterText, { color: letterColor }]}>
                    {OPTION_LETTERS[i]}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: colors.text }]}>{opt}</Text>
                {showFeedback && isRightAnswer && (
                  <Text style={{ fontSize: 14, color: Colors.primary }}>✓</Text>
                )}
                {showFeedback && isSelected && !isRightAnswer && (
                  <Text style={{ fontSize: 14, color: '#f28b82' }}>✗</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
        {showFeedback && (
          <View style={[styles.feedbackBox, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <Text style={{ fontSize: 16, flexShrink: 0 }}>{isCorrect ? '✅' : '❌'}</Text>
            <Text style={[styles.feedbackText, { color: isCorrect ? '#1a3325' : '#5c1d1d' }]}>
              {currentQ.feedback}
            </Text>
          </View>
        )}

        {/* Action Button */}
        {!showFeedback ? (
          <TouchableOpacity
            style={[styles.actionBtn, selectedOption === null && { opacity: 0.5 }]}
            onPress={handleCheck}
            disabled={selectedOption === null}
            activeOpacity={0.85}>
            <Text style={styles.actionBtnText}>Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleNext}
            activeOpacity={0.85}>
            <Text style={styles.actionBtnText}>
              {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results →'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 16, fontWeight: '600' },
  headerTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  scoreTag: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  scoreTagText: { fontSize: 11, fontWeight: '700', color: Colors.primaryDark },

  // Progress
  progressBar: {
    height: 5,
    backgroundColor: '#d4f0de',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },

  // Body
  body: { flex: 1 },
  bodyContent: { padding: 16 },

  qType: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  qNum: { fontSize: 11, fontWeight: '500', marginBottom: 4 },
  qText: {
    fontSize: 14.5,
    fontWeight: '800',
    lineHeight: 21,
    marginBottom: 14,
  },

  // Context
  contextBox: {
    borderWidth: 1.5,
    borderRadius: 11,
    padding: 12,
    marginBottom: 14,
  },
  contextLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  contextText: {
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // Options
  options: { gap: 8, marginBottom: 14 },
  option: {
    borderWidth: 1.5,
    borderRadius: 11,
    padding: 11,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionLetter: {
    width: 27,
    height: 27,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionLetterText: { fontSize: 11, fontWeight: '700' },
  optionText: { flex: 1, fontSize: 12.5, lineHeight: 17 },

  // Feedback
  feedbackBox: {
    borderWidth: 1.5,
    borderRadius: 11,
    padding: 11,
    paddingHorizontal: 13,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  feedbackCorrect: { backgroundColor: '#edfaf2', borderColor: '#b5e8ca' },
  feedbackWrong: { backgroundColor: '#fff0f0', borderColor: '#ffcaca' },
  feedbackText: { flex: 1, fontSize: 12, lineHeight: 18 },

  // Action Button
  actionBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionBtnText: { color: '#fff', fontSize: 13.5, fontWeight: '700' },

  // Finish Screen
  finishCard: {
    flex: 1,
    margin: 20,
    marginTop: 80,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  finishEmoji: { fontSize: 52, marginBottom: 12 },
  finishTitle: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  finishSub: { fontSize: 14, marginBottom: 20 },
  finishScoreBig: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  finishScoreNum: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  finishProgress: {
    width: '100%',
    height: 8,
    backgroundColor: '#d4f0de',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  finishFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  finishXp: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 24,
  },
  retryBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 10,
  },
  retryBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  backToLessonBtn: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backToLessonText: { fontSize: 13.5, fontWeight: '600' },
});

export default ProficiencyQuizScreen;
