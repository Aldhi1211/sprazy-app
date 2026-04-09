import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

interface ScreenHeaderProps {
  showBack?: boolean;
}

const ScreenHeader = ({ showBack = true }: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const { isDark, toggleDark, colors } = useTheme();

  return (
    <View style={styles.row}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Text style={[styles.icon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconBtn} />
      )}
      <TouchableOpacity
        onPress={toggleDark}
        style={[styles.moonBtn, { backgroundColor: colors.inputBg }]}>
        <Text style={styles.moonIcon}>{isDark ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    fontWeight: '600',
  },
  moonBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonIcon: {
    fontSize: 18,
  },
});

export default ScreenHeader;
