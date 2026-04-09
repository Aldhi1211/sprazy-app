import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import SocialButton from '../../components/SocialButton';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;
};

const SignUpScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleContinue = () => {
    if (!email) { setEmailError('Email is required'); return; }
    if (!validateEmail(email)) { setEmailError('Enter a valid email address'); return; }
    setEmailError('');
    navigation.navigate('CreatePassword', { email });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoRow}>
          <Image
            source={require('../../../assets/images/logo_icon.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <Text style={[styles.hello, { color: colors.text }]}>Hello!</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          Sign up and start learning any language
        </Text>

        <AppInput
          label="Email"
          placeholder="user@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          errorText={emailError}
          rightLabel="Sign In with Phone Number"
          onRightLabelPress={() => Alert.alert('Coming soon', 'Phone sign-in coming soon!')}
        />

        <AppButton title="Continue" onPress={handleContinue} style={styles.btn} />

        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <Text style={[styles.orText, { color: colors.textSub }]}>or</Text>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
        </View>

        <SocialButton
          type="google"
          label="Sign up with Google"
          onPress={() => Alert.alert('Coming soon', 'Google sign-in coming soon!')}
        />
        <View style={{ height: 12 }} />
        <SocialButton
          type="apple"
          label="Sign up with Apple"
          onPress={() => Alert.alert('Coming soon', 'Apple sign-in coming soon!')}
        />

        <Text style={[styles.terms, { color: colors.textSub }]}>
          By joining, I declare that I have read and accent the{' '}
          <Text style={styles.termsLink}>Terms and Privacy Policy</Text>
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSub }]}>
          Already, have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  logoIcon: { width: 48, height: 48 },
  hello: { fontSize: 28, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '700', lineHeight: 30, marginBottom: 24 },
  btn: { marginTop: 8, marginBottom: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  line: { flex: 1, height: 1 },
  orText: { fontSize: 14 },
  terms: { fontSize: 13, textAlign: 'center', marginTop: 20, lineHeight: 18 },
  termsLink: { color: Colors.primary },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 },
  footerText: { fontSize: 15 },
  footerLink: { fontSize: 15, color: Colors.primary, fontWeight: '600', textDecorationLine: 'underline' },
});

export default SignUpScreen;
