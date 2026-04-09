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
import { getCurriculumByLevel } from '../../data/curriculum';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'LessonDetail'>;
  route: RouteProp<HomeStackParamList, 'LessonDetail'>;
};

const LessonDetailScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { profile } = useAuth();
  const { chapterId, lessonIndex: initialIndex } = route.params;
  const [lessonIndex, setLessonIndex] = useState(initialIndex);

  const chapters = getCurriculumByLevel(profile?.languageLevel || 'B1');
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter) { return null; }

  const lesson = chapter.lessons[lessonIndex];
  const totalLessons = chapter.lessons.length;
  const isFirst = lessonIndex === 0;
  const isLast = lessonIndex === totalLessons - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Green Header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <View style={styles.lessonTag}>
            <Text style={styles.lessonTagText}>
              Lesson {lessonIndex + 1} of {totalLessons}
            </Text>
          </View>
        </View>

        <Text style={styles.chapterLabel}>
          Chapter {chapterId} · {chapter.title}
        </Text>
        <Text style={styles.headerLessonTitle} numberOfLines={2}>
          {lesson.title}
        </Text>

        {/* Progress steps */}
        <View style={styles.stepsRow}>
          {chapter.lessons.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setLessonIndex(i)}
              style={[
                styles.step,
                i < lessonIndex
                  ? styles.stepDone
                  : i === lessonIndex
                  ? styles.stepCurrent
                  : styles.stepFuture,
              ]}
            />
          ))}
        </View>
      </View>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <ScrollView
        style={[styles.body, { backgroundColor: Colors.primaryLight }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyContent}>

        <Text style={styles.lessonNumLabel}>Lesson {lessonIndex + 1}</Text>
        <Text style={[styles.lessonBigTitle, { color: '#0d3320' }]}>
          {lesson.title}
        </Text>

        {/* Theory Box */}
        <View style={[styles.card, { backgroundColor: '#fff', borderColor: '#c8edda' }]}>
          <Text style={styles.cardLabel}>📘 {lesson.formulaLabel}</Text>
          <View style={[styles.formulaBox, { backgroundColor: Colors.primaryLight }]}>
            <Text style={[styles.formulaText, { color: Colors.primaryDark }]}>
              {lesson.formula}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: '#edfaf2' }]} />
          <Text style={[styles.theoryText, { color: '#1a3325' }]}>
            {lesson.theoryBody}
          </Text>
        </View>

        {/* Examples Box */}
        <View style={[styles.card, { backgroundColor: '#edfaf2', borderColor: '#b5e8ca' }]}>
          <Text style={styles.cardLabel}>💡 Examples</Text>
          {lesson.examples.map((ex, i) => (
            <View key={i} style={styles.exRow}>
              <View style={[styles.exDot, { backgroundColor: Colors.primary }]} />
              <Text style={[styles.exText, { color: '#0d3320' }]}>{ex}</Text>
            </View>
          ))}
        </View>

        {/* Tip Box */}
        <View style={styles.tipBox}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>{lesson.tip}</Text>
        </View>

        {/* Navigation Row */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[
              styles.navBtn,
              { borderColor: Colors.primary, opacity: isFirst ? 0.3 : 1 },
            ]}
            onPress={() => !isFirst && setLessonIndex(lessonIndex - 1)}
            disabled={isFirst}>
            <Text style={[styles.navBtnText, { color: Colors.primary }]}>← Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.practiceBtn}
            onPress={() =>
              navigation.navigate('PracticeQuiz', { chapterId })
            }>
            <Text style={styles.practiceBtnText}>Start Practice →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navBtn,
              { borderColor: Colors.primary, opacity: isLast ? 0.3 : 1 },
            ]}
            onPress={() => !isLast && setLessonIndex(lessonIndex + 1)}
            disabled={isLast}>
            <Text style={[styles.navBtnText, { color: Colors.primary }]}>Next →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 18,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 16, color: '#fff', fontWeight: '600' },
  lessonTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lessonTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#d4fce8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chapterLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
    marginBottom: 4,
    fontWeight: '500',
  },
  headerLessonTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 14,
    lineHeight: 26,
  },
  stepsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  stepDone: { backgroundColor: '#fff' },
  stepCurrent: { backgroundColor: '#d4fce8' },
  stepFuture: { backgroundColor: 'rgba(255,255,255,0.25)' },

  // Body
  body: { flex: 1 },
  bodyContent: { padding: 18 },

  lessonNumLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  lessonBigTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 14,
  },

  // Cards
  card: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  formulaBox: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  formulaText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  divider: { height: 1, marginBottom: 10 },
  theoryText: { fontSize: 13, lineHeight: 20 },

  // Examples
  exRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  exDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0 },
  exText: { flex: 1, fontSize: 12.5, lineHeight: 19, fontStyle: 'italic', fontWeight: '500' },

  // Tip
  tipBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#fffbea',
    borderWidth: 1.5,
    borderColor: '#fde68a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  tipIcon: { fontSize: 16 },
  tipText: { flex: 1, fontSize: 12, color: '#92600a', lineHeight: 18 },

  // Navigation
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navBtn: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  navBtnText: { fontSize: 12, fontWeight: '700' },
  practiceBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  practiceBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});

export default LessonDetailScreen;
