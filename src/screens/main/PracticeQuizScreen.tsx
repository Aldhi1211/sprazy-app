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
import { HomeStackParamList } from '../../navigation/types';
import { getCurriculumByLevel, Question } from '../../data/curriculum';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'PracticeQuiz'>;
  route: RouteProp<HomeStackParamList, 'PracticeQuiz'>;
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const PracticeQuizScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { profile } = useAuth();
  const { saveChapterProgress } = useProgress();
  const { chapterId } = route.params;

  const chapters = getCurriculumByLevel(profile?.languageLevel || 'B1');
  const chapter = chapters.find(c => c.id === chapterId);
  const questions: Question[] = chapter?.questions ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!chapter || questions.length === 0) { return null; }

  const currentQ = questions[currentIndex];
  const progressPct = ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100;
  const isFillBlank = !!(currentQ.fillSentence && currentQ.fillAnswer);
  const isCorrect = selectedOption === currentQ.correctAnswer;

  const handleSelectOption = (index: number) => {
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
      saveChapterProgress(chapterId, score, questions.length);
      setIsFinished(true);
    }
  };

  // ── Finished Screen ──────────────────────────────────────────────────────────
  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <View style={[styles.container, { backgroundColor: Colors.primaryLight }]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.finishCard}>
          <Text style={styles.finishEmoji}>{passed ? '🎉' : '📚'}</Text>
          <Text style={styles.finishTitle}>
            {passed ? 'Practice Complete!' : 'Keep Practicing!'}
          </Text>
          <Text style={[styles.finishSub, { color: colors.textSub }]}>
            Chapter {chapterId} · {chapter.title}
          </Text>

          <View style={[styles.scoreBadge, { backgroundColor: passed ? Colors.primaryLight : '#fff5d6', borderColor: passed ? Colors.primary : '#f5c842' }]}>
            <Text style={[styles.scoreNum, { color: passed ? Colors.primaryDark : '#a06800' }]}>
              {score}/{questions.length}
            </Text>
            <Text style={[styles.scoreSub, { color: passed ? Colors.primaryDark : '#a06800' }]}>
              {pct}% correct
            </Text>
          </View>

          <View style={[styles.xpRow]}>
            <Text style={styles.xpIcon}>⭐</Text>
            <Text style={[styles.xpText, { color: Colors.primaryDark }]}>
              +{score * 10} XP earned
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.finishBtn, { backgroundColor: Colors.primary }]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.finishBtnText}>Back to Lessons</Text>
          </TouchableOpacity>

          {!passed && (
            <TouchableOpacity
              style={[styles.retryBtn, { borderColor: Colors.primary }]}
              onPress={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setShowFeedback(false);
                setScore(0);
                setIsFinished(false);
              }}>
              <Text style={[styles.retryBtnText, { color: Colors.primary }]}>
                Try Again
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // ── Quiz Screen ──────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ───────────────────────────────────────────────── */}
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: colors.textSub }]}>✕</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: Colors.primaryDark }]}>
            Chapter {chapterId} · Practice
          </Text>
          <View style={styles.xpBadge}>
            <Text style={styles.xpBadgeText}>+10 XP</Text>
          </View>
        </View>
        <View style={[styles.progressBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: Colors.primary, width: `${progressPct}%` as any },
            ]}
          />
        </View>
      </View>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <ScrollView
        style={[styles.body, { backgroundColor: Colors.primaryLight }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyContent}>

        <Text style={styles.qTypeLabel}>
          {isFillBlank ? 'Fill in the Blank' : 'Multiple Choice'}
        </Text>
        <Text style={[styles.qNum, { color: colors.textSub }]}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <Text style={[styles.qText, { color: '#0d3320' }]}>
          {currentQ.question}
        </Text>

        {/* Fill-blank display */}
        {isFillBlank && (
          <View style={[styles.fillBox, { backgroundColor: '#fff', borderColor: showFeedback ? (isCorrect ? Colors.primary : '#e05252') : Colors.primary }]}>
            <Text style={[styles.fillText, { color: '#0d3320' }]}>
              {currentQ.fillSentence!.replace('_____', '').split('___').map((part, i, arr) => (
                <React.Fragment key={i}>
                  <Text>{part}</Text>
                  {i < arr.length - 1 && (
                    <Text style={[styles.blankText, { color: showFeedback ? (isCorrect ? Colors.primary : '#e05252') : Colors.primary }]}>
                      {showFeedback ? currentQ.fillAnswer! : '_________'}
                    </Text>
                  )}
                </React.Fragment>
              ))}
            </Text>
          </View>
        )}

        {/* Options */}
        <Text style={styles.chooseLabel}>Choose the answer:</Text>
        <View style={styles.optionsContainer}>
          {currentQ.options.map((opt, i) => {
            let borderColor = colors.border;
            let bgColor = colors.bg;
            let letterBg = Colors.primaryLight;
            let letterColor = Colors.primaryDark;

            if (showFeedback) {
              if (i === currentQ.correctAnswer) {
                borderColor = Colors.primary;
                bgColor = Colors.primaryLight;
                letterBg = Colors.primary;
                letterColor = '#fff';
              } else if (i === selectedOption && i !== currentQ.correctAnswer) {
                borderColor = '#e05252';
                bgColor = '#fff5f5';
                letterBg = '#e05252';
                letterColor = '#fff';
              }
            } else if (i === selectedOption) {
              borderColor = Colors.primary;
              bgColor = Colors.primaryLight;
              letterBg = Colors.primary;
              letterColor = '#fff';
            }

            return (
              <TouchableOpacity
                key={i}
                style={[styles.option, { borderColor, backgroundColor: bgColor }]}
                onPress={() => handleSelectOption(i)}
                activeOpacity={showFeedback ? 1 : 0.7}>
                <View style={[styles.optionLetter, { backgroundColor: letterBg }]}>
                  <Text style={[styles.optionLetterText, { color: letterColor }]}>
                    {OPTION_LETTERS[i]}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: colors.text }]}>{opt}</Text>
                {showFeedback && i === currentQ.correctAnswer && (
                  <Text style={{ color: Colors.primary, fontSize: 16, marginLeft: 4 }}>✓</Text>
                )}
                {showFeedback && i === selectedOption && i !== currentQ.correctAnswer && (
                  <Text style={{ color: '#e05252', fontSize: 16, marginLeft: 4 }}>✗</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback box */}
        {showFeedback && (
          <View
            style={[
              styles.feedbackBox,
              {
                backgroundColor: isCorrect ? '#edfaf2' : '#fff5f5',
                borderColor: isCorrect ? '#b5e8ca' : '#f5c6c6',
              },
            ]}>
            <Text style={styles.feedbackIcon}>{isCorrect ? '✅' : '❌'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.feedbackTitle, { color: isCorrect ? Colors.primaryDark : '#c0392b' }]}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </Text>
              <Text style={[styles.feedbackText, { color: isCorrect ? '#1a3325' : '#7b2424' }]}>
                {currentQ.explanation}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Bottom Button ─────────────────────────────────────────── */}
      <View style={[styles.bottomBar, { backgroundColor: colors.bg, borderTopColor: colors.border }]}>
        {!showFeedback ? (
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                backgroundColor: selectedOption !== null ? Colors.primary : colors.inputBg,
              },
            ]}
            onPress={handleCheck}
            disabled={selectedOption === null}>
            <Text
              style={[
                styles.actionBtnText,
                { color: selectedOption !== null ? '#fff' : colors.textSub },
              ]}>
              Check Answer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Colors.primary }]}
            onPress={handleNext}>
            <Text style={[styles.actionBtnText, { color: '#fff' }]}>
              {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish Practice 🎉'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeBtn: { padding: 4, marginRight: 10 },
  closeText: { fontSize: 18, fontWeight: '600' },
  headerTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  xpBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  xpBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  progressBg: { height: 5, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5, minWidth: 6 },

  // Body
  body: { flex: 1 },
  bodyContent: { padding: 18 },

  qTypeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  qNum: { fontSize: 12, fontWeight: '500', marginBottom: 6 },
  qText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 14,
  },

  // Fill blank
  fillBox: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  fillText: { fontSize: 14, lineHeight: 22 },
  blankText: { fontWeight: '700', fontSize: 14 },

  chooseLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  // Options
  optionsContainer: { gap: 8, marginBottom: 14 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionLetterText: { fontSize: 12, fontWeight: '700' },
  optionText: { flex: 1, fontSize: 13, fontWeight: '500' },

  // Feedback
  feedbackBox: {
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  feedbackIcon: { fontSize: 18 },
  feedbackTitle: { fontSize: 13, fontWeight: '700', marginBottom: 3 },
  feedbackText: { fontSize: 12, lineHeight: 18 },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  actionBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionBtnText: { fontSize: 15, fontWeight: '700' },

  // Finish screen
  finishCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  finishEmoji: { fontSize: 64, marginBottom: 16 },
  finishTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0d3320',
    marginBottom: 6,
    textAlign: 'center',
  },
  finishSub: { fontSize: 14, marginBottom: 24, textAlign: 'center' },
  scoreBadge: {
    borderWidth: 2,
    borderRadius: 18,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreNum: { fontSize: 36, fontWeight: '800' },
  scoreSub: { fontSize: 14, fontWeight: '600' },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 32,
  },
  xpIcon: { fontSize: 20 },
  xpText: { fontSize: 16, fontWeight: '700' },
  finishBtn: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  finishBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  retryBtn: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 2,
    paddingVertical: 13,
    alignItems: 'center',
  },
  retryBtnText: { fontSize: 16, fontWeight: '700' },
});

export default PracticeQuizScreen;
