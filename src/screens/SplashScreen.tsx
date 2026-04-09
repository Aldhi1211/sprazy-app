import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen = ({ navigation }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      if (!user) {
        navigation.replace('Auth');
      } else if (!profile?.onboardingComplete) {
        navigation.replace('Onboarding');
      } else {
        navigation.replace('Main');
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [loading, user, profile]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/logo_vertical.png')}
          style={styles.logoVertical}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Your personal language{'\n'}learning tutor</Text>
        <View style={styles.dotsRow}>
          <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: Colors.primaryLight }]} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoVertical: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default SplashScreen;
