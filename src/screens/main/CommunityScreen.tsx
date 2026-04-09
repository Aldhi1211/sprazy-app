import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const CommunityScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Community</Text>
      <Text style={[styles.sub, { color: colors.textSub }]}>Coming soon — connect with fellow learners.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  sub: { fontSize: 15, textAlign: 'center' },
});

export default CommunityScreen;
