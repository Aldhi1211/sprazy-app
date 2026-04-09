import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors } from '../theme/colors';
import { useTheme } from '../context/ThemeContext';

interface AppInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorText?: string;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  style?: ViewStyle;
}

const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  errorText,
  rightLabel,
  onRightLabelPress,
  style,
}: AppInputProps) => {
  const { colors } = useTheme();
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={[styles.wrapper, style]}>
      {(label || rightLabel) && (
        <View style={styles.labelRow}>
          {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
          {rightLabel && (
            <TouchableOpacity onPress={onRightLabelPress}>
              <Text style={styles.rightLabel}>{rightLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.inputBg, borderColor: errorText ? Colors.error : 'transparent' },
        ]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSub}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden(!hidden)} style={styles.eyeBtn}>
            <Text style={styles.eyeIcon}>{hidden ? '⊘' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  rightLabel: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    height: 54,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeBtn: {
    paddingLeft: 8,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#999',
  },
  error: {
    color: Colors.error,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
});

export default AppInput;
