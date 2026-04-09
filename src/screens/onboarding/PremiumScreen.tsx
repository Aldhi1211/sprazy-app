import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import AppButton from '../../components/AppButton';
import { useAuth } from '../../context/AuthContext';
import { updateUserProfile } from '../../firebase/firestoreService';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Premium'>;
  route: RouteProp<OnboardingStackParamList, 'Premium'>;
};

const PLANS = [
  { id: '12month', label: '12 month', price: '144$ 72$', perMonth: '6$ per month', badge: 'Save 50%', selected: true },
  { id: '6month', label: '6 month', price: '72$ 64$', perMonth: '10$ per month', badge: 'Save 20%', selected: false },
  { id: '1month', label: '1 month', price: '12$', perMonth: '12$ per month', badge: 'Save 0%', selected: false },
];

const FEATURES = [
  { icon: '▶▶', title: 'Access to all lessons', desc: 'Choose lessons that are right for you.' },
  { icon: '🚫', title: 'No advertising', desc: "Don't get distracted in vain!" },
  { icon: '🌐', title: 'Versatile practice tools', desc: "Practice what you've learned with spaced repetition." },
  { icon: '💬', title: 'Priority feedback from the community', desc: 'Receive oral and written comments from native speakers.' },
  { icon: '👑', title: 'Premium-only content', desc: 'Exclusive content for premium members.' },
  { icon: '🏅', title: 'Certificates', desc: 'Take tests at the end of the level and confirm your knowledge.' },
];

const PremiumScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { user, refreshProfile } = useAuth();
  const { language, knowledgeLevel, reason, level, dailyGoal } = route.params;
  const [selectedPlan, setSelectedPlan] = useState('12month');
  const [loading, setLoading] = useState(false);

  const saveAndContinue = async (isPremium: boolean) => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.uid, {
        selectedLanguage: language,
        knowledgeLevel,
        studyReason: reason,
        languageLevel: level,
        dailyGoal,
        isPremium,
        onboardingComplete: true,
      });
      await refreshProfile();
      navigation.navigate('WelcomeFirstLesson');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header stats */}
        <Text style={[styles.mainTitle, { color: colors.text }]}>
          More than 100.000 people{' '}
          <Text style={{ color: Colors.primary }}>have purchased Premium</Text>
        </Text>
        <Text style={[styles.guarantee, { color: colors.textSub }]}>14 days money back guarantee</Text>

        {/* Plans */}
        <View style={styles.plansRow}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                { backgroundColor: colors.inputBg, borderColor: colors.border, borderWidth: 1 },
                selectedPlan === plan.id && { borderColor: Colors.primary, borderWidth: 2, backgroundColor: Colors.primaryLight },
              ]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.8}>
              <Text style={[styles.planLabel, { color: colors.text }]}>{plan.label}</Text>
              <Text style={[styles.planPrice, { color: colors.textSub }]}>{plan.price}</Text>
              <Text style={[styles.planPerMonth, { color: colors.textSub }]}>{plan.perMonth}</Text>
              <View style={[styles.badgePill, { backgroundColor: Colors.primary }]}>
                <Text style={styles.badgeText}>{plan.badge}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Google Play rating */}
        <View style={[styles.ratingCard, { backgroundColor: colors.inputBg }]}>
          <Text style={[styles.ratingLabel, { color: colors.textSub }]}>Google Play</Text>
          <Text style={[styles.ratingUsers, { color: colors.text }]}>1M Users</Text>
          <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
          <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '700' }}>5.0</Text>
        </View>

        {/* Features */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>What do you get with premium?</Text>
        {FEATURES.map((f, i) => (
          <View key={i} style={styles.featureRow}>
            <View style={[styles.featureIcon, { backgroundColor: Colors.primaryLight }]}>
              <Text style={{ fontSize: 16 }}>{f.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>{f.title}</Text>
              <Text style={[styles.featureDesc, { color: colors.textSub }]}>{f.desc}</Text>
            </View>
          </View>
        ))}

        {/* Trial info */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>How does the free trial work?</Text>
        <View style={styles.trialStep}>
          <View style={[styles.trialDot, { backgroundColor: Colors.primary }]} />
          <View>
            <Text style={[styles.trialStepTitle, { color: colors.text }]}>Now: You open access to Premium</Text>
            <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: '600' }}>Free for 7 days</Text>
          </View>
        </View>
        <View style={styles.trialStep}>
          <View style={[styles.trialDot, { backgroundColor: colors.border }]} />
          <View>
            <Text style={[styles.trialStepTitle, { color: colors.text }]}>Day 5: Renewal reminder</Text>
            <Text style={[styles.trialStepDesc, { color: colors.textSub }]}>We will inform you that the trial period is coming to an end! You can cancel at any time.</Text>
          </View>
        </View>
        <View style={styles.trialStep}>
          <View style={[styles.trialDot, { backgroundColor: colors.border }]} />
          <View>
            <Text style={[styles.trialStepTitle, { color: colors.text }]}>Day 7: End of trial period</Text>
            <Text style={[styles.trialStepDesc, { color: colors.textSub }]}><Text style={{ color: Colors.primary, fontWeight: '700' }}>Save 50%</Text> and pay 95$ for full year of premium membership</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.restoreBtn}>
          <Text style={{ color: Colors.primary, fontSize: 14 }}>Restore purchase</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer CTA */}
      <View style={[styles.footerCta, { backgroundColor: colors.bg }]}>
        <AppButton
          title="Try 7 days Free"
          onPress={() => saveAndContinue(true)}
          loading={loading}
          style={styles.tryBtn}
        />
        <TouchableOpacity onPress={() => saveAndContinue(false)} style={styles.skipBtn}>
          <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: '600' }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 160 },
  mainTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', lineHeight: 30, marginBottom: 6 },
  guarantee: { fontSize: 13, textAlign: 'center', marginBottom: 20 },
  plansRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  planCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  planLabel: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  planPrice: { fontSize: 12, marginBottom: 2 },
  planPerMonth: { fontSize: 11, marginBottom: 8 },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  ratingCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    gap: 4,
  },
  ratingLabel: { fontSize: 13 },
  ratingUsers: { fontSize: 20, fontWeight: '700' },
  stars: { fontSize: 18 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 16, marginTop: 8 },
  featureRow: { flexDirection: 'row', gap: 14, marginBottom: 16, alignItems: 'flex-start' },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  featureDesc: { fontSize: 13, lineHeight: 18 },
  trialStep: { flexDirection: 'row', gap: 14, marginBottom: 16, alignItems: 'flex-start' },
  trialDot: { width: 14, height: 14, borderRadius: 7, marginTop: 3 },
  trialStepTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  trialStepDesc: { fontSize: 13, lineHeight: 18 },
  restoreBtn: { alignItems: 'center', marginTop: 8 },
  footerCta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tryBtn: { marginBottom: 10 },
  skipBtn: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PremiumScreen;
