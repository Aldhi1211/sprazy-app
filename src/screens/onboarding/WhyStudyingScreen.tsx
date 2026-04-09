import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'WhyStudying'>;
  route: RouteProp<OnboardingStackParamList, 'WhyStudying'>;
};

const REASONS = [
  { id: 'family', label: 'Friend and Family', icon: '👥' },
  { id: 'entertainment', label: 'Entertainment & Culture', icon: '🎬' },
  { id: 'study', label: 'Study', icon: '🎓' },
  { id: 'trips', label: 'Trips', icon: '🌐' },
  { id: 'work', label: 'Work', icon: '💼' },
];

const WhyStudyingScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { language, knowledgeLevel } = route.params;

  const handleSelect = (reason: string) => {
    navigation.navigate('LevelCheck', { language, knowledgeLevel, reason });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Why are you studying {language}?
        </Text>
        {REASONS.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={[styles.option, { backgroundColor: colors.inputBg }]}
            onPress={() => handleSelect(r.id)}
            activeOpacity={0.7}>
            <Text style={styles.icon}>{r.icon}</Text>
            <Text style={[styles.label, { color: colors.text }]}>{r.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '700', lineHeight: 34, marginBottom: 24 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  icon: { fontSize: 22 },
  label: { fontSize: 17, fontWeight: '500' },
});

export default WhyStudyingScreen;
