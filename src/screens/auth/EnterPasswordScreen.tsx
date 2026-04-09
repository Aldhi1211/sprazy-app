import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { Colors } from '../../theme/colors';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { loginWithEmail } from '../../firebase/authService';
import { resetPassword } from '../../firebase/authService';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'EnterPassword'>;
  route: RouteProp<AuthStackParamList, 'EnterPassword'>;
};

const EnterPasswordScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const hasError = error.length > 0;

  const handleContinue = async () => {
    if (!password) { setError('Please enter your password'); return; }
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      // Navigation handled by auth state listener
    } catch {
      setError('You entered the wrong password. Try again or click the reset password button.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      await resetPassword(email);
      setError('');
      alert('Password reset email sent! Check your inbox.');
    } catch {
      alert('Failed to send reset email. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Enter your password</Text>
        <AppInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={(t) => { setPassword(t); setError(''); }}
          secureTextEntry
          errorText={error}
        />
      </View>
      <View style={styles.footer}>
        {hasError ? (
          <AppButton
            title="Reset my password"
            onPress={handleReset}
            variant="danger"
            loading={resetting}
          />
        ) : (
          <AppButton
            title="Continue"
            onPress={handleContinue}
            loading={loading}
            disabled={password.length === 0}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24 },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
});

export default EnterPasswordScreen;
