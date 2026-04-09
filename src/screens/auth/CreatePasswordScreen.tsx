import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'CreatePassword'>;
  route: RouteProp<AuthStackParamList, 'CreatePassword'>;
};

const CreatePasswordScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValid = password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password);

  const handleContinue = () => {
    if (!isValid) {
      setError('Password must contain 8 characters, 1 uppercase and 1 number.');
      return;
    }
    setError('');
    navigation.navigate('CreateUsername', { email, password });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Create password</Text>
        <AppInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          errorText={error}
        />
        {!error && (
          <Text style={[styles.hint, { color: colors.textSub }]}>
            Your password must contain{' '}
            <Text style={[styles.hintBold, { color: colors.text }]}>8 characters</Text>,{' '}
            <Text style={[styles.hintBold, { color: colors.text }]}>1 uppercase</Text> and{' '}
            <Text style={[styles.hintBold, { color: colors.text }]}>1 number</Text>.
          </Text>
        )}
      </View>
      <View style={styles.footer}>
        <AppButton
          title="Continue"
          onPress={handleContinue}
          disabled={password.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24 },
  hint: { fontSize: 14, lineHeight: 20, marginTop: 8 },
  hintBold: { fontWeight: '700' },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
});

export default CreatePasswordScreen;
