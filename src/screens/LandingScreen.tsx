import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { Colors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';
import AppButton from '../components/AppButton';
import ScreenHeader from '../components/ScreenHeader';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Landing'>;
};

const LandingScreen = ({ navigation }: Props) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScreenHeader showBack={false} />

      {/* Hero area */}
      <View style={styles.heroContainer}>
        {/* Logo horizontal di atas ilustrasi */}
        <Image
          source={require('../../assets/images/logo_horizontal.png')}
          style={styles.logoHorizontal}
          resizeMode="contain"
        />
        {/* Ilustrasi hero 4 video cards */}
        <Image
          source={require('../../assets/images/hero_illustration.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom section */}
      <View style={styles.bottomSection}>
        <Text style={[styles.headline, { color: colors.text }]}>
          Learn a language{'\n'}in 3 minute a day
        </Text>
        <AppButton
          title="Start learning"
          onPress={() => navigation.navigate('SignUp')}
          style={styles.startBtn}
        />
        <View style={styles.loginRow}>
          <Text style={[styles.loginText, { color: colors.textSub }]}>
            Already, have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoHorizontal: {
    width: 160,
    height: 48,
    marginBottom: 16,
  },
  heroImage: {
    width: width - 32,
    height: (width - 32) * 0.75,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 28,
  },
  startBtn: { marginBottom: 16 },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: { fontSize: 15 },
  loginLink: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LandingScreen;
