import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import AppButton from '../../components/AppButton';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'WelcomeFirstLesson'>;
};

const { width } = Dimensions.get('window');

const WelcomeFirstLessonScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.bg, opacity: fadeAnim }]}>
      {/* Logo horizontal */}
      <Image
        source={require('../../../assets/images/logo_horizontal.png')}
        style={styles.logoHorizontal}
        resizeMode="contain"
      />

      {/* Ilustrasi LET'S GO */}
      <Image
        source={require('../../../assets/images/illustration_letsgo.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Text */}
      <Text style={[styles.title, { color: colors.text }]}>
        Welcome to your{'\n'}first lessons!
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSub }]}>Let's start studying!</Text>

      {/* CTA */}
      <View style={styles.footer}>
        <AppButton
          title="Let's Go!"
          onPress={() => navigation.navigate('LessonLoading')}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  logoHorizontal: {
    width: 160,
    height: 48,
    marginBottom: 20,
  },
  illustration: {
    width: width - 32,
    height: (width - 32) * 0.72,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  footer: {
    width: '100%',
    paddingBottom: 50,
  },
});

export default WelcomeFirstLessonScreen;
