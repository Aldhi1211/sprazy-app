import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../../theme/colors';
import { useTheme } from '../../../context/ThemeContext';
import { ProficiencyStackParamList } from '../../../navigation/types';
import {
  PROFICIENCY_CATEGORIES,
  PROFICIENCY_COURSES,
  getFeaturedCourse,
  getPopularCourses,
  ProficiencyCourse,
} from '../../../data/proficiencyData';

type Props = {
  navigation: NativeStackNavigationProp<ProficiencyStackParamList, 'ExploreCourses'>;
};

const ExploreCoursesScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const featured = getFeaturedCourse();
  const popular = getPopularCourses();

  const filteredCourses: ProficiencyCourse[] = searchQuery.trim()
    ? PROFICIENCY_COURSES.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.categoryId.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const showSearch = searchQuery.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Explore Courses</Text>
          <View style={[styles.notifBtn, { backgroundColor: colors.bg === '#121212' ? '#2C2C2C' : '#edfaf2' }]}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </View>
        </View>
        <View style={[styles.searchBar, { backgroundColor: Colors.primaryLight, borderColor: '#c8edda' }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search courses, topics..."
            placeholderTextColor="#a0c8b0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ fontSize: 14, color: '#5a9e75' }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}>

        {/* ── Search Results ──────────────────────────────────────── */}
        {showSearch ? (
          <>
            <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>
              Results for "{searchQuery}"
            </Text>
            {filteredCourses.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.textSub }]}>No courses found.</Text>
            ) : (
              filteredCourses.map(course => (
                <TouchableOpacity
                  key={course.id}
                  style={[styles.listCard, { backgroundColor: colors.bg, borderColor: colors.border }]}
                  onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
                  activeOpacity={0.75}>
                  <View style={[styles.listIcon, { backgroundColor: Colors.primaryLight }]}>
                    <Text style={{ fontSize: 18 }}>{course.icon}</Text>
                  </View>
                  <View style={styles.listInfo}>
                    <Text style={[styles.listTitle, { color: colors.text }]}>{course.title}</Text>
                    <Text style={[styles.listMeta, { color: Colors.primary }]}>
                      {course.lessons.length} lessons · {course.studentsCount} students
                    </Text>
                  </View>
                  {course.badge && (
                    <View style={[styles.badge, course.badge === 'Hot' ? styles.badgeHot : styles.badgeNew]}>
                      <Text style={[styles.badgeText, { color: course.badge === 'Hot' ? '#92600a' : '#1a7a40' }]}>
                        {course.badge}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))
            )}
          </>
        ) : (
          <>
            {/* ── Featured Card ───────────────────────────────────── */}
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => navigation.navigate('CourseDetail', { courseId: featured.id })}
              activeOpacity={0.9}>
              <View style={styles.featCircle1} />
              <View style={styles.featCircle2} />
              <View style={[styles.featTag]}>
                <Text style={styles.featTagText}>⭐ Featured</Text>
              </View>
              <Text style={styles.featTitle}>{featured.title}</Text>
              <Text style={styles.featSub}>Land your dream job with confident English</Text>
              <View style={styles.featBtn}>
                <Text style={styles.featBtnText}>Start Free →</Text>
              </View>
            </TouchableOpacity>

            {/* ── Categories ──────────────────────────────────────── */}
            <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>Browse by Category</Text>
            <View style={styles.categoryGrid}>
              {PROFICIENCY_CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catCard, { backgroundColor: cat.colorBg, borderColor: cat.colorBorder }]}
                  onPress={() => {
                    // Navigate to first course in category
                    const first = PROFICIENCY_COURSES.find(c => c.categoryId === cat.id);
                    if (first) { navigation.navigate('CourseDetail', { courseId: first.id }); }
                  }}
                  activeOpacity={0.8}>
                  <Text style={styles.catIcon}>{cat.icon}</Text>
                  <Text style={[styles.catTitle, { color: colors.text }]}>{cat.title}</Text>
                  <Text style={[styles.catCount, { color: Colors.primary }]}>{cat.coursesCount} courses</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ── Popular ─────────────────────────────────────────── */}
            <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>Popular Right Now</Text>
            {popular.map(course => (
              <TouchableOpacity
                key={course.id}
                style={[styles.listCard, { backgroundColor: colors.bg, borderColor: colors.border }]}
                onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
                activeOpacity={0.75}>
                <View style={[styles.listIcon, { backgroundColor: Colors.primaryLight }]}>
                  <Text style={{ fontSize: 18 }}>{course.icon}</Text>
                </View>
                <View style={styles.listInfo}>
                  <Text style={[styles.listTitle, { color: colors.text }]}>{course.title}</Text>
                  <Text style={[styles.listMeta, { color: Colors.primary }]}>
                    {course.lessons.length} lessons · {course.studentsCount} students
                  </Text>
                </View>
                {course.badge && (
                  <View style={[styles.badge, course.badge === 'Hot' ? styles.badgeHot : styles.badgeNew]}>
                    <Text style={[styles.badgeText, { color: course.badge === 'Hot' ? '#92600a' : '#1a7a40' }]}>
                      {course.badge}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={{ height: 24 }} />
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchIcon: { fontSize: 14 },
  searchInput: { flex: 1, fontSize: 13, fontWeight: '500', padding: 0 },

  // Body
  body: { padding: 16 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 4,
  },

  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },

  // Featured
  featuredCard: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featCircle1: {
    position: 'absolute',
    right: -10,
    top: -10,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  featCircle2: {
    position: 'absolute',
    right: 30,
    bottom: -20,
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  featTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginBottom: 7,
  },
  featTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#d4fce8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  featSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  featBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 9,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  featBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },

  // Category Grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  catCard: {
    width: '47%',
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 12,
    paddingBottom: 10,
  },
  catIcon: { fontSize: 24, marginBottom: 7 },
  catTitle: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  catCount: { fontSize: 11, fontWeight: '500' },

  // List Cards
  listCard: {
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 11,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 9,
  },
  listIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  listInfo: { flex: 1 },
  listTitle: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  listMeta: { fontSize: 11, fontWeight: '500' },

  // Badges
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeHot: { backgroundColor: '#fff5d6' },
  badgeNew: { backgroundColor: '#d4f5e0' },
  badgeText: { fontSize: 10, fontWeight: '700' },
});

export default ExploreCoursesScreen;
