import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    border: string;
    inputBackground: string;
    placeholder: string;
    error: string;
    success: string;
    warning: string;
}

export const useTheme = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const colors: ThemeColors = isDark ? Colors.dark : Colors.light;

    return { colors, isDark };
};