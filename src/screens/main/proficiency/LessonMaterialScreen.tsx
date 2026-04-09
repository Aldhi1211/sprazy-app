import React from 'react';
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
  navigation: NativeStackNavigationProp<ProficiencyStackParamList, 'LessonMaterial'>;
  route: RouteProp<ProficiencyStackParamList, 'LessonMaterial'>;
};

const TOTAL_STEPS = 5;

const LessonMaterialScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { courseId, lessonId } = route.params;

  const course = getCourseById(courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  if (!course || !lesson) { return null; }

  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const hasContent = lesson.vocabulary.length > 0;

  // Current step: vocab (step 3 of 5 in mockup → index 2)
  const currentStep = 2;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: Colors.primaryLight }]}
            onPress={() => navigation.goBack()}>
            <Text style={[styles.backIcon, { color: Colors.primaryDark }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerCourse, { color: Colors.primaryDark }]}>
            {course.title.split(' ').slice(0, 2).join(' ')} · Lesson {lessonIndex + 1}
          </Text>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+15 XP</Text>
          </View>
        </View>

        {/* Progress Steps */}
        <View style={styles.stepsRow}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.step,
                i < currentStep
                  ? styles.stepDone
                  : i === currentStep
                  ? styles.stepCurrent
                  : styles.stepFuture,
              ]}
            />
          ))}
        </View>
      </View>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <ScrollView
        style={[styles.body, { backgroundColor: Colors.primaryLight }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyContent}>

        <View style={styles.lessonTagPill}>
          <Text style={styles.lessonTagText}>{lesson.lessonTag}</Text>
        </View>
        <Text style={[styles.lessonTitle, { color: '#0a2e15' }]}>
          {hasContent ? lesson.lessonTitle : lesson.title}
        </Text>

        {hasContent ? (
          <>
            {/* Vocabulary Box */}
            <View style={[styles.card, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
              <Text style={styles.cardLabel}>📘 Key Vocabulary</Text>
              {lesson.vocabulary.map((item, i) => (
                <View
                  key={i}
                  style={[
                    styles.vocabRow,
                    i < lesson.vocabulary.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: '#edfaf2',
                      paddingBottom: 8,
                      marginBottom: 8,
                    },
                  ]}>
                  <Text style={[styles.vocabWord, { color: colors.text }]}>{item.word}</Text>
                  <Text style={[styles.vocabDef, { color: Colors.primaryDark }]}>{item.definition}</Text>
                </View>
              ))}
            </View>

            {/* Dialogue Box */}
            {lesson.dialogue.length > 0 && (
              <View style={styles.dialogueCard}>
                <Text style={styles.cardLabel}>💬 Sample Dialogue</Text>
                {lesson.dialogue.map((line, i) => {
                  const isRight = line.side === 'right';
                  return (
                    <View
                      key={i}
                      style={[
                        styles.chatRow,
                        isRight ? styles.chatRowRight : styles.chatRowLeft,
                        i < lesson.dialogue.length - 1 && { marginBottom: 10 },
                      ]}>
                      {/* Avatar */}
                      <View
                        style={[
                          styles.avatar,
                          { backgroundColor: isRight ? '#5dd98a' : Colors.primary },
                        ]}>
                        <Text style={[styles.avatarText, { color: isRight ? '#0a2e15' : '#fff' }]}>
                          {line.avatarLabel}
                        </Text>
                      </View>

                      {/* Bubble */}
                      <View style={isRight ? { alignItems: 'flex-end' } : {}}>
                        <Text style={styles.speakerLabel}>{line.speakerLabel}</Text>
                        <View
                          style={[
                            styles.bubble,
                            isRight
                              ? { backgroundColor: Colors.primary, borderBottomRightRadius: 3 }
                              : { backgroundColor: '#fff', borderBottomLeftRadius: 3 },
                          ]}>
                          <Text style={[styles.bubbleText, { color: isRight ? '#fff' : '#0a2e15' }]}>
                            {line.text}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Tip Box */}
            {lesson.tip.length > 0 && (
              <View style={styles.tipBox}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipText}>{lesson.tip}</Text>
              </View>
            )}
          </>
        ) : (
          /* Coming Soon placeholder for locked/empty lessons */
          <View style={[styles.comingSoon, { backgroundColor: colors.bg, borderColor: colors.border }]}>
            <Text style={{ fontSize: 32, marginBottom: 10 }}>🔒</Text>
            <Text style={[styles.comingSoonTitle, { color: colors.text }]}>Content Coming Soon</Text>
            <Text style={[styles.comingSoonSub, { color: colors.textSub }]}>
              This lesson's material will be available soon. Complete earlier lessons first!
            </Text>
          </View>
        )}

        {/* Start Quiz Button */}
        <TouchableOpacity
          style={[styles.quizBtn, !hasContent && { opacity: 0.5 }]}
          onPress={() => {
            if (hasContent && lesson.quiz.length > 0) {
              navigation.navigate('ProficiencyQuiz', { courseId, lessonId });
            }
          }}
          disabled={!hasContent || lesson.quiz.length === 0}
          activeOpacity={0.85}>
          <Text style={styles.quizBtnText}>
            {hasContent && lesson.quiz.length > 0 ? 'Start Quiz →' : 'Quiz Unavailable'}
          </Text>
        </TouchableOpacity>

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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 16, fontWeight: '600' },
  headerCourse: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  xpBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  xpText: { fontSize: 11, fontWeight: '700', color: Colors.primaryDark },

  // Steps
  stepsRow: { flexDirection: 'row', gap: 5 },
  step: { flex: 1, height: 4, borderRadius: 3 },
  stepDone: { backgroundColor: Colors.primary },
  stepCurrent: { backgroundColor: '#5dd98a' },
  stepFuture: { backgroundColor: '#d4f0de' },

  // Body
  body: { flex: 1 },
  bodyContent: { padding: 16 },

  lessonTagPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#d4f5e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 7,
  },
  lessonTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 14,
  },

  // Card (vocabulary)
  card: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 13,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  vocabRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  vocabWord: {
    fontSize: 13.5,
    fontWeight: '700',
    minWidth: 100,
    flexShrink: 0,
  },
  vocabDef: { flex: 1, fontSize: 12, lineHeight: 17 },

  // Dialogue
  dialogueCard: {
    backgroundColor: '#edfaf2',
    borderWidth: 1.5,
    borderColor: '#b5e8ca',
    borderRadius: 14,
    padding: 13,
    marginBottom: 12,
  },
  chatRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  chatRowLeft: { flexDirection: 'row' },
  chatRowRight: { flexDirection: 'row-reverse' },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontSize: 9, fontWeight: '700' },
  speakerLabel: {
    fontSize: 9.5,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 3,
  },
  bubble: {
    maxWidth: 210,
    borderRadius: 11,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  bubbleText: { fontSize: 12, lineHeight: 17 },

  // Tip
  tipBox: {
    flexDirection: 'row',
    gap: 9,
    backgroundColor: '#fffbea',
    borderWidth: 1.5,
    borderColor: '#fde68a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  tipIcon: { fontSize: 16, flexShrink: 0 },
  tipText: { flex: 1, fontSize: 12, color: '#92600a', lineHeight: 18 },

  // Coming soon
  comingSoon: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  comingSoonTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  comingSoonSub: { fontSize: 12.5, textAlign: 'center', lineHeight: 18 },

  // Quiz Button
  quizBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
  },
  quizBtnText: { color: '#fff', fontSize: 13.5, fontWeight: '700' },
});

export default LessonMaterialScreen;
