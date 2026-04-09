import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'LessonLoading'>;
};

const LessonLoadingScreen = ({ navigation }: Props) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const numAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    Animated.timing(numAnim, {
      toValue: 99.9,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      // Brief pause then show quote
      setTimeout(() => navigation.navigate('Quote'), 500);
    });
  }, []);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['5%', '95%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressBar, { width: barWidth }]} />
      </View>
      <Text style={styles.subText}>Just a second and we'll start the lesson!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  progressTrack: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  subText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default LessonLoadingScreen;
