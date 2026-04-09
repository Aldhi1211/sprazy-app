import React, { createContext, useContext, useState } from 'react';
import { Colors } from '../theme/colors';

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  colors: typeof Colors & { bg: string; surface: string; text: string; textSub: string; border: string; inputBg: string };
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => setIsDark(prev => !prev);

  const colors = {
    ...Colors,
    bg: isDark ? Colors.dark.background : Colors.white,
    surface: isDark ? Colors.dark.surface : Colors.white,
    text: isDark ? Colors.dark.text : Colors.textDark,
    textSub: isDark ? Colors.dark.textSub : Colors.textGray,
    border: isDark ? Colors.dark.border : Colors.borderGray,
    inputBg: isDark ? Colors.dark.inputBg : Colors.inputBg,
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
