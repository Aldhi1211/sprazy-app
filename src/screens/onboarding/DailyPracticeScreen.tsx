import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';
import AppButton from '../../components/AppButton';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'DailyPractice'>;
  route: RouteProp<OnboardingStackParamList, 'DailyPractice'>;
};

const OPTIONS = [3, 5, 10, 15, 20];

const DailyPracticeScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { language, knowledgeLevel, reason, level } = route.params;
  const [selected, setSelected] = useState(10);

  const handleContinue = () => {
    navigation.navigate('Premium', { language, knowledgeLevel, reason, level, dailyGoal: selected });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          How long do you want to exercise per day?
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSub }]}>
          For your level, it's recommended to practice 10 minutes a day.
        </Text>

        <View style={styles.optionsRow}>
          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionBtn,
                { backgroundColor: colors.inputBg },
                selected === opt && styles.optionSelected,
              ]}
              onPress={() => setSelected(opt)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.optionNum,
                  { color: colors.text },
                  selected === opt && styles.optionNumSelected,
                ]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.unit, { color: colors.textSub }]}>min/day</Text>
      </View>

      <View style={styles.footer}>
        <AppButton title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', lineHeight: 34, alignSelf: 'flex-start', marginBottom: 10 },
  subtitle: { fontSize: 14, lineHeight: 20, alignSelf: 'flex-start', marginBottom: 40 },
  optionsRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  optionBtn: {
    width: 58,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  optionNum: { fontSize: 22, fontWeight: '700' },
  optionNumSelected: { color: Colors.textDark },
  unit: { fontSize: 14, fontWeight: '600', marginTop: 10 },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
});

export default DailyPracticeScreen;
