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
import { getCourseById, PROFICIENCY_CATEGORIES } from '../../../data/proficiencyData';

type Props = {
  navigation: NativeStackNavigationProp<ProficiencyStackParamList, 'CourseDetail'>;
  route: RouteProp<ProficiencyStackParamList, 'CourseDetail'>;
};

// Lessons 1-2 are "done", lesson 3 is "active", 4 upcoming, 5+ locked for featured course
const getLessonStatus = (
  courseId: string,
  lessonIndex: number,
): 'done' | 'active' | 'upcoming' | 'locked' => {
  if (courseId === 'interview-mastery') {
    if (lessonIndex < 2) { return 'done'; }
    if (lessonIndex === 2) { return 'active'; }
    if (lessonIndex === 3) { return 'upcoming'; }
    return 'locked';
  }
  if (lessonIndex === 0) { return 'active'; }
  return 'locked';
};

const CourseDetailScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { courseId } = route.params;
  const course = getCourseById(courseId);

  if (!course) { return null; }

  const category = PROFICIENCY_CATEGORIES.find(c => c.id === course.categoryId);
  const activeIndex = course.lessons.findIndex(
    (_, i) => getLessonStatus(courseId, i) === 'active',
  );

  const handleContinue = () => {
    const idx = activeIndex >= 0 ? activeIndex : 0;
    const lesson = course.lessons[idx];
    if (lesson.vocabulary.length > 0) {
      navigation.navigate('LessonMaterial', { courseId, lessonId: lesson.id });
    } else {
      // Lesson has no content yet
      navigation.navigate('LessonMaterial', { courseId, lessonId: lesson.id });
    }
  };

  const completedCount = course.lessons.filter((_, i) => getLessonStatus(courseId, i) === 'done').length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Hero Header ────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareIcon}>⬆</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heroIcon}>{course.icon}</Text>
        <Text style={styles.heroCategory}>
          {category?.title ?? course.categoryId} · Professional
        </Text>
        <Text style={styles.heroTitle}>{course.title}</Text>

        <View style={styles.tagsRow}>
          <View style={styles.tag}><Text style={styles.tagText}>{course.level}</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>{course.lessons.length} Lessons</Text></View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{course.isFree ? 'Free' : 'Premium'}</Text>
          </View>
        </View>
      </View>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <ScrollView
        style={[styles.body, { backgroundColor: Colors.primaryLight }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyContent}>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
            <Text style={styles.statNum}>{course.lessons.length}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
            <Text style={styles.statNum}>{course.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
            <Text style={styles.statNum}>{course.studentsCount}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
            <Text style={styles.statNum}>{course.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Progress summary */}
        {completedCount > 0 && (
          <View style={[styles.progressCard, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
            <Text style={{ fontSize: 13 }}>📈</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.progressLabel, { color: colors.text }]}>
                Your Progress
              </Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(completedCount / course.lessons.length) * 100}%` },
                  ]}
                />
              </View>
            </View>
            <Text style={styles.progressPct}>
              {completedCount}/{course.lessons.length}
            </Text>
          </View>
        )}

        {/* Lessons List */}
        <Text style={styles.sectionLabel}>Course Lessons</Text>

        {course.lessons.map((lesson, i) => {
          const status = getLessonStatus(courseId, i);
          const isLocked = status === 'locked';
          const isDone = status === 'done';
          const isActive = status === 'active';

          return (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonRow,
                {
                  backgroundColor: isActive ? '#edfaf2' : colors.bg,
                  borderColor: isActive ? Colors.primary : colors.border,
                },
              ]}
              onPress={() => {
                if (isLocked) { return; }
                if (lesson.vocabulary.length > 0) {
                  navigation.navigate('LessonMaterial', { courseId, lessonId: lesson.id });
                } else {
                  navigation.navigate('LessonMaterial', { courseId, lessonId: lesson.id });
                }
              }}
              disabled={isLocked}
              activeOpacity={isLocked ? 1 : 0.75}>

              {/* Lesson Number / Status */}
              <View
                style={[
                  styles.lessonNum,
                  isDone
                    ? { backgroundColor: Colors.primary }
                    : isActive
                    ? { backgroundColor: Colors.primary }
                    : isLocked
                    ? { backgroundColor: '#f0f0f0' }
                    : { backgroundColor: Colors.primaryLight },
                ]}>
                <Text
                  style={[
                    styles.lessonNumText,
                    { color: isDone || isActive ? '#fff' : isLocked ? '#aaa' : Colors.primaryDark },
                  ]}>
                  {isDone ? '✓' : isLocked ? '🔒' : String(i + 1)}
                </Text>
              </View>

              {/* Info */}
              <View style={styles.lessonInfo}>
                <Text style={[styles.lessonTitle, { color: isLocked ? colors.textSub : colors.text }]}>
                  {lesson.title}
                </Text>
                <Text style={[styles.lessonSub, { color: Colors.primary }]}>
                  {lesson.subtitle}
                </Text>
              </View>

              {/* Arrow */}
              <Text style={[styles.lessonArrow, { color: isActive ? Colors.primary : colors.border }]}>
                {isActive ? '▶' : '›'}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaBtn} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.ctaBtnText}>
            {completedCount === 0
              ? 'Start Course →'
              : activeIndex >= 0
              ? `Continue Lesson ${activeIndex + 1} →`
              : 'Review Course →'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Hero
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 20,
  },
  heroTop: {
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
  shareBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: { fontSize: 14, color: '#fff' },
  heroIcon: { fontSize: 38, marginBottom: 8 },
  heroCategory: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    lineHeight: 26,
  },
  tagsRow: { flexDirection: 'row', gap: 7 },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { fontSize: 11, fontWeight: '600', color: '#d4fce8' },

  // Body
  body: { flex: 1 },
  bodyContent: { padding: 16 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  statBox: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 11,
    paddingVertical: 9,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primaryDark,
    marginBottom: 2,
  },
  statLabel: { fontSize: 9.5, color: Colors.primary, fontWeight: '500' },

  // Progress
  progressCard: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  progressLabel: { fontSize: 12, fontWeight: '600', marginBottom: 5 },
  progressBarBg: {
    height: 5,
    backgroundColor: '#d4f0de',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  progressPct: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },

  // Section
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },

  // Lesson Row
  lessonRow: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 11,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  lessonNum: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  lessonNumText: { fontSize: 11, fontWeight: '700' },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  lessonSub: { fontSize: 10.5, fontWeight: '500' },
  lessonArrow: { fontSize: 14 },

  // CTA
  ctaBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  ctaBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});

export default CourseDetailScreen;
