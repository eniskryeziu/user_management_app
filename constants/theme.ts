/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

//'#3b82f6'
export const Colors = {
  light: {
    primary: '#0d2140ff',
    secondary: '#8b5cf6',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',
    border: '#e2e8f0',
    inputBackground: '#f1f5f9',
    placeholder: '#94a3b8',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  dark: {
    primary: '#7dd3fc',
    secondary: '#c084fc',
    background: '#0b0f19',
    card: '#131a24',
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
    textTertiary: '#64748b',
    border: '#1e293b',
    inputBackground: '#1a2230',
    placeholder: '#475569',
    error: '#e43953ff',
    success: '#4ade80',
    warning: '#facc15',
  }
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};