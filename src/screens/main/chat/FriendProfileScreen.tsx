import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../../theme/colors';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { ChatStackParamList } from '../../../navigation/types';
import {
  getUserPublicProfile,
  removeFriend,
  PublicUserProfile,
} from '../../../firebase/friendsService';

type Props = {
  navigation: NativeStackNavigationProp<ChatStackParamList, 'FriendProfile'>;
  route: RouteProp<ChatStackParamList, 'FriendProfile'>;
};

// Derive achievements from profile stats
const deriveAchievements = (
  friend: PublicUserProfile,
): { icon: string; label: string }[] => {
  const list: { icon: string; label: string }[] = [];
  if ((friend.xp ?? 0) >= 1000) { list.push({ icon: '🏅', label: 'Top Scorer' }); }
  if ((friend.streak ?? 0) >= 7) { list.push({ icon: '🔥', label: `${friend.streak}-day streak` }); }
  if ((friend.lessonsCount ?? 0) >= 20) { list.push({ icon: '⭐', label: 'Fast Learner' }); }
  if ((friend.coursesCount ?? 0) >= 3) { list.push({ icon: '💼', label: 'Course Pro' }); }
  if (list.length === 0) {
    list.push({ icon: '🌱', label: 'Getting Started' });
  }
  return list;
};

const FriendProfileScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { friendId } = route.params;

  const [friend, setFriend] = useState<PublicUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPublicProfile(friendId)
      .then(setFriend)
      .finally(() => setLoading(false));
  }, [friendId]);

  const handleUnfriend = () => {
    Alert.alert(
      'Remove Friend',
      `Remove ${friend?.username ?? 'this user'} from your friends?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            if (user && friend) {
              await removeFriend(user.uid, friend.uid);
              navigation.goBack();
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: Colors.primaryLight }]}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (!friend) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: Colors.primaryLight }]}>
        <Text style={{ fontSize: 32, marginBottom: 10 }}>😕</Text>
        <Text style={{ color: Colors.primaryDark, fontSize: 15, fontWeight: '600' }}>
          User not found
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const achievements = deriveAchievements(friend);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moreBtn}
            onPress={() =>
              Alert.alert(
                friend.displayName || friend.username,
                '',
                [
                  {
                    text: '💬 Send Message',
                    onPress: () => navigation.navigate('Conversation', { friendId: friend.uid }),
                  },
                  { text: '🚫 Remove Friend', style: 'destructive', onPress: handleUnfriend },
                  { text: 'Cancel', style: 'cancel' },
                ],
              )
            }>
            <Text style={styles.moreIcon}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={[styles.heroAvatar, { backgroundColor: friend.avatarColor }]}>
          <Text style={styles.heroAvatarText}>{friend.initials}</Text>
        </View>

        <Text style={styles.heroName}>{friend.displayName || friend.username}</Text>
        <Text style={styles.heroUsername}>
          @{friend.username}{friend.location ? ` · ${friend.location}` : ''}
        </Text>

        <View style={styles.heroTags}>
          {friend.level && (
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>{friend.level} Intermediate</Text>
            </View>
          )}
          {(friend.streak ?? 0) > 0 && (
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>🔥 {friend.streak}-day streak</Text>
            </View>
          )}
        </View>
      </View>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <ScrollView
        style={[styles.body, { backgroundColor: Colors.primaryLight }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyContent}>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { num: friend.lessonsCount ?? 0, label: 'Lessons' },
            { num: friend.coursesCount ?? 0, label: 'Courses' },
            { num: friend.xp ?? 0, label: 'XP' },
            { num: friend.friendsCount ?? 0, label: 'Friends' },
          ].map(stat => (
            <View key={stat.label} style={[styles.statBox, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
              <Text style={styles.statNum}>{stat.num}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.btnMessage}
            onPress={() => navigation.navigate('Conversation', { friendId: friend.uid })}
            activeOpacity={0.85}>
            <Text style={styles.btnMessageText}>💬 Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnChallenge, { borderColor: '#b5e8ca', backgroundColor: colors.bg }]}>
            <Text style={[styles.btnChallengeText, { color: Colors.primaryDark }]}>
              ⚡ Challenge
            </Text>
          </TouchableOpacity>
        </View>

        {/* Achievements */}
        <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>Achievements</Text>
        <View style={styles.achieveRow}>
          {achievements.map((ach, i) => (
            <View key={i} style={[styles.achBadge, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
              <Text style={styles.achIcon}>{ach.icon}</Text>
              <Text style={[styles.achLabel, { color: Colors.primaryDark }]}>{ach.label}</Text>
            </View>
          ))}
        </View>

        {/* Active Courses (placeholder — in production would come from Firebase) */}
        <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>Active Courses</Text>
        {(friend.coursesCount ?? 0) > 0 ? (
          <>
            <View style={[styles.courseCard, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
              <View style={styles.courseRow}>
                <Text style={{ fontSize: 17 }}>💼</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.courseTitle, { color: colors.text }]}>
                    Job Interview Mastery
                  </Text>
                  <View style={[styles.progressBar, { backgroundColor: '#d4f0de' }]}>
                    <View style={[styles.progressFill, { width: '75%' }]} />
                  </View>
                </View>
                <Text style={styles.coursePct}>75%</Text>
              </View>
            </View>
            <View style={[styles.courseCard, { backgroundColor: colors.bg, borderColor: '#c8edda' }]}>
              <View style={styles.courseRow}>
                <Text style={{ fontSize: 17 }}>✈️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.courseTitle, { color: colors.text }]}>
                    Travel English Survival
                  </Text>
                  <View style={[styles.progressBar, { backgroundColor: '#d4f0de' }]}>
                    <View style={[styles.progressFill, { width: '40%' }]} />
                  </View>
                </View>
                <Text style={styles.coursePct}>40%</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={[styles.emptyCard, { backgroundColor: colors.bg, borderColor: colors.border }]}>
            <Text style={[styles.emptyCardText, { color: colors.textSub }]}>
              No active courses yet.
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hero
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 22,
    alignItems: 'center',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
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
  moreBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: { fontSize: 16, color: '#fff' },

  heroAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
  },
  heroAvatarText: { fontSize: 26, fontWeight: '800', color: '#fff' },
  heroName: { fontSize: 19, fontWeight: '800', color: '#fff', marginBottom: 3 },
  heroUsername: { fontSize: 12.5, color: 'rgba(255,255,255,0.8)', marginBottom: 10 },
  heroTags: { flexDirection: 'row', gap: 7 },
  heroTag: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heroTagText: { fontSize: 10.5, fontWeight: '700', color: '#d4fce8' },

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
  statNum: { fontSize: 16, fontWeight: '800', color: Colors.primaryDark, marginBottom: 2 },
  statLabel: { fontSize: 9.5, color: Colors.primary, fontWeight: '500' },

  // Actions
  actionRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  btnMessage: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnMessageText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  btnChallenge: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnChallengeText: { fontSize: 13, fontWeight: '700' },

  // Section
  sectionLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },

  // Achievements
  achieveRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  achBadge: {
    borderWidth: 1.5,
    borderRadius: 11,
    paddingHorizontal: 11,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 4,
    minWidth: 66,
  },
  achIcon: { fontSize: 20 },
  achLabel: { fontSize: 9.5, fontWeight: '700', textAlign: 'center' },

  // Courses
  courseCard: {
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 11,
    paddingHorizontal: 13,
    marginBottom: 8,
  },
  courseRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  courseTitle: { fontSize: 12.5, fontWeight: '700', marginBottom: 5 },
  progressBar: { height: 5, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  coursePct: { fontSize: 11, fontWeight: '700', color: Colors.primaryDark },

  emptyCard: {
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 18,
    alignItems: 'center',
  },
  emptyCardText: { fontSize: 13 },
});

export default FriendProfileScreen;
