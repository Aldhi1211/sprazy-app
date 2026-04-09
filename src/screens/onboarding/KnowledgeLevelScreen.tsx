import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'KnowledgeLevel'>;
  route: RouteProp<OnboardingStackParamList, 'KnowledgeLevel'>;
};

const KnowledgeLevelScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { language } = route.params;

  const handleSelect = (level: string) => {
    navigation.navigate('WhyStudying', { language, knowledgeLevel: level });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome User!</Text>
        <Text style={[styles.subtitle, { color: colors.textSub }]}>
          Tell us a little about yourself
        </Text>

        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.inputBg }]}
          onPress={() => handleSelect('beginner')}
          activeOpacity={0.7}>
          <Text style={styles.optionIcon}>🚩</Text>
          <Text style={[styles.optionLabel, { color: colors.text }]}>
            I don't know {language}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.inputBg }]}
          onPress={() => handleSelect('studied')}
          activeOpacity={0.7}>
          <Text style={styles.optionIcon}>📖</Text>
          <Text style={[styles.optionLabel, { color: colors.text }]}>
            I have already studied {language}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 6 },
  subtitle: { fontSize: 18, marginBottom: 32 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
  },
  optionIcon: { fontSize: 22 },
  optionLabel: { fontSize: 17, fontWeight: '500' },
});

export default KnowledgeLevelScreen;
