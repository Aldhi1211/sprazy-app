import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Quote'>;
};

const QuoteScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to Main app (handled by root navigator via auth state / onboardingComplete flag)
      // Actually we need to pop to root here — we'll use reset
      navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Main' as any }] });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>❝</Text>
      <Text style={styles.quoteText}>
        "There is only one good, knowledge, and one evil, ignorance."
      </Text>
      <Text style={styles.author}>— Socrates</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4EDE1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  quote: {
    fontSize: 60,
    color: Colors.primary,
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textDark,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 16,
  },
  author: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default QuoteScreen;
