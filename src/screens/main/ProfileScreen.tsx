import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../firebase/authService';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const { profile, user } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: Colors.primaryLight }]}>
        <Text style={styles.avatarText}>
          {(profile?.username?.[0] ?? user?.email?.[0] ?? '?').toUpperCase()}
        </Text>
      </View>
      <Text style={[styles.username, { color: colors.text }]}>
        {profile?.username ?? 'User'}
      </Text>
      <Text style={[styles.email, { color: colors.textSub }]}>{user?.email}</Text>

      {/* Stats */}
      <View style={[styles.statsRow, { backgroundColor: colors.inputBg }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSub }]}>Streak</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSub }]}>XP</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSub }]}>Lessons</Text>
        </View>
      </View>

      {/* Info rows */}
      <View style={styles.infoSection}>
        <InfoRow label="Language" value={profile?.selectedLanguage ?? '-'} colors={colors} />
        <InfoRow label="Level" value={profile?.languageLevel ?? '-'} colors={colors} />
        <InfoRow label="Daily goal" value={profile?.dailyGoal ? `${profile.dailyGoal} min/day` : '-'} colors={colors} />
        <InfoRow label="Premium" value={profile?.isPremium ? '✅ Active' : '❌ Free plan'} colors={colors} />
      </View>

      <TouchableOpacity
        style={[styles.logoutBtn, { borderColor: Colors.error }]}
        onPress={handleLogout}>
        <Text style={{ color: Colors.error, fontSize: 16, fontWeight: '600' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const InfoRow = ({ label, value, colors }: any) => (
  <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
    <Text style={[styles.infoLabel, { color: colors.textSub }]}>{label}</Text>
    <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 34, fontWeight: '700', color: Colors.primary },
  username: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  email: { fontSize: 14, marginBottom: 24 },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 2 },
  statDivider: { width: 1 },
  infoSection: { width: '100%', marginBottom: 32 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  infoLabel: { fontSize: 15 },
  infoValue: { fontSize: 15, fontWeight: '500' },
  logoutBtn: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
