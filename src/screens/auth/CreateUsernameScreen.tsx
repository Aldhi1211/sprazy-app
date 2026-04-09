import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import ScreenHeader from '../../components/ScreenHeader';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { registerWithEmail } from '../../firebase/authService';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'CreateUsername'>;
  route: RouteProp<AuthStackParamList, 'CreateUsername'>;
};

const CreateUsernameScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { email, password } = route.params;
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidUsername = (val: string) => /^[a-zA-Z0-9_-]+$/.test(val);

  const handleContinue = async () => {
    if (!username) { setError('Username is required'); return; }
    if (!isValidUsername(username)) {
      setError('Only letters, numbers, underscores and dashes allowed');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerWithEmail(email, password, username);
      // Navigation handled by AuthContext state change → AppNavigator → Onboarding
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScreenHeader />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Create your User Name</Text>
        <AppInput
          label="User Name"
          placeholder="username001"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          errorText={error}
        />
        {!error && (
          <Text style={[styles.hint, { color: colors.textSub }]}>
            Create a unique username, you can use numbers from 0 to 9 and underscores and dashes
          </Text>
        )}
      </View>
      <View style={styles.footer}>
        <AppButton
          title="Continue"
          onPress={handleContinue}
          loading={loading}
          disabled={username.length === 0}
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
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
});

export default CreateUsernameScreen;
