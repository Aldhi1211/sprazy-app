import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SocialButtonProps {
  type: 'google' | 'apple';
  label: string;
  onPress: () => void;
}

const SocialButton = ({ type, label, onPress }: SocialButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: colors.inputBg }]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles.icon}>{type === 'google' ? 'G' : ''}</Text>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SocialButton;
