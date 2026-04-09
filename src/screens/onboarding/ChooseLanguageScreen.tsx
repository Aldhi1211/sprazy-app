import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ChooseLanguage'>;
};

const LANGUAGES = [
  { id: 'English', label: 'English', flag: '🇬🇧' },
  { id: 'Spanish', label: 'Spain', flag: '🇪🇸' },
  { id: 'Italian', label: 'Italy', flag: '🇮🇹' },
  { id: 'Belgian', label: 'Belgian', flag: '🇧🇪' },
  { id: 'Japanese', label: 'Japan', flag: '🇯🇵' },
];

const ChooseLanguageScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  const handleSelect = (language: string) => {
    navigation.navigate('KnowledgeLevel', { language });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Choose the language you want to learn
        </Text>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[styles.langItem, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
            onPress={() => handleSelect(lang.id)}
            activeOpacity={0.7}>
            <View style={styles.langLeft}>
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.langLabel, { color: colors.text }]}>{lang.label}</Text>
            </View>
            <Text style={[styles.arrow, { color: colors.textSub }]}>→</Text>
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
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  langLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flag: { fontSize: 26 },
  langLabel: { fontSize: 17, fontWeight: '500' },
  arrow: { fontSize: 18 },
});

export default ChooseLanguageScreen;
