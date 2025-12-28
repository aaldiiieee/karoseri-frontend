import { useThemeContext } from "../context/ThemeProvider";

export const useTheme = () => {
  const { theme, isDark, toggleTheme, setTheme } = useThemeContext();

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
};
