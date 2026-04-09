import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ScreeningWelcome'>;
  route: RouteProp<OnboardingStackParamList, 'ScreeningWelcome'>;
};

const { width } = Dimensions.get('window');

const ScreeningWelcomeScreen = ({ navigation, route }: Props) => {
  const { language, knowledgeLevel, reason } = route.params;

  const handleStart = () => {
    navigation.navigate('ScreeningQuestion', {
      language,
      knowledgeLevel,
      reason,
      questionIndex: 0,
      answers: [],
    });
  };

  const CHIPS = [
    { icon: '📝', label: '20 Questions' },
    { icon: '⏱️', label: '~8 Minutes' },
    { icon: '🎁', label: 'Free Test' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../../assets/images/logo_horizontal.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Illustration */}
      <View style={styles.illustrationWrapper}>
        <Image
          source={require('../../../assets/images/illustration_letsgo.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Let's find your{'\n'}English level!</Text>
        <Text style={styles.description}>
          Answer 20 quick questions across Grammar, Vocabulary, Reading, and Listening to get your personalized CEFR level.
        </Text>

        {/* Stat chips */}
        <View style={styles.chips}>
          {CHIPS.map((chip) => (
            <View key={chip.label} style={styles.chip}>
              <Text style={styles.chipIcon}>{chip.icon}</Text>
              <Text style={styles.chipLabel}>{chip.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startBtn} onPress={handleStart} activeOpacity={0.85}>
          <Text style={styles.startText}>Take Screening Test  →</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B4332',
  },
  backBtn: {
    position: 'absolute',
    top: 52,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: '#fff', fontSize: 20 },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 56,
  },
  logo: { width: 140, height: 44 },
  illustrationWrapper: {
    alignItems: 'center',
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
  },
  illustration: { width: width * 0.65, height: width * 0.65 },
  content: {
    paddingHorizontal: 28,
    marginTop: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  chips: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  chipIcon: { fontSize: 14 },
  chipLabel: { color: '#fff', fontSize: 13, fontWeight: '600' },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 44,
    paddingTop: 20,
  },
  startBtn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  startText: { color: '#1B4332', fontSize: 16, fontWeight: '700' },
  skipBtn: { alignItems: 'center', paddingVertical: 6 },
  skipText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
});

export default ScreeningWelcomeScreen;
