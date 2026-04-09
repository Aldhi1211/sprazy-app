import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';
import AppButton from '../../components/AppButton';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'LevelCheck'>;
  route: RouteProp<OnboardingStackParamList, 'LevelCheck'>;
};

const LEVELS = [
  { id: 'A1', label: 'A1 - Beginning' },
  { id: 'A2', label: 'A2 - Elementary' },
  { id: 'B1', label: 'B1 - Intermediate' },
  { id: 'B2', label: 'B2 - Upper intermediate' },
  { id: 'C1', label: 'C1 - Advanced' },
];

const { width } = Dimensions.get('window');

const LevelCheckScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { language, knowledgeLevel, reason } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState('');

  const handleChooseLevel = () => setShowModal(true);

  const handleConfirm = () => {
    if (!selected) return;
    setShowModal(false);
    navigation.navigate('DailyPractice', { language, knowledgeLevel, reason, level: selected });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Do you already know your level?
        </Text>

        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../../../assets/images/illustration_confused.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton title="Choose your level" onPress={handleChooseLevel} style={styles.mainBtn} />
        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <Text style={[styles.or, { color: colors.textSub }]}>or</Text>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
        </View>
        <TouchableOpacity
          style={[styles.screeningBtn, { backgroundColor: colors.primaryLight }]}
          onPress={() =>
            navigation.navigate('ScreeningWelcome', {
              language,
              knowledgeLevel,
              reason,
            })
          }>
          <Text style={[styles.screeningText, { color: colors.text }]}>
            Take a screening test
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        />
        <View style={[styles.sheet, { backgroundColor: colors.bg }]}>
          <Text style={[styles.sheetTitle, { color: colors.text }]}>Your Level</Text>
          {LEVELS.map((lv) => (
            <TouchableOpacity
              key={lv.id}
              style={[
                styles.levelItem,
                selected === lv.id && {
                  backgroundColor: Colors.primaryLight,
                  borderColor: Colors.primary,
                  borderWidth: 1.5,
                },
              ]}
              onPress={() => setSelected(lv.id)}
              activeOpacity={0.7}>
              <Text style={[styles.levelLabel, { color: colors.text }]}>{lv.label}</Text>
              <Text style={[styles.arrow, { color: colors.textSub }]}>→</Text>
            </TouchableOpacity>
          ))}
          <AppButton
            title="Continue"
            onPress={handleConfirm}
            disabled={!selected}
            style={styles.confirmBtn}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  illustrationWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: width - 32,
    height: (width - 32) * 0.75,
  },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
  mainBtn: { marginBottom: 12 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  line: { flex: 1, height: 1 },
  or: { fontSize: 14 },
  screeningBtn: {
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screeningText: { fontSize: 16, fontWeight: '600' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  sheetTitle: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  levelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  levelLabel: { fontSize: 16, fontWeight: '500' },
  arrow: { fontSize: 18 },
  confirmBtn: { marginTop: 12 },
});

export default LevelCheckScreen;
