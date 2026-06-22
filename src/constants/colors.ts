/**
 * 颜色主题配置
 * 定义应用中使用的颜色常量
 */

export const colors = {
  // 主色调
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#4DA2FF',

  // 次要色调
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7D7AFF',

  // 成功/警告/错误/信息
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // 中性色
  black: '#000000',
  white: '#FFFFFF',

  // 灰色系
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // 背景色
  background: {
    light: '#FFFFFF',
    dark: '#000000',
    secondary: '#F3F4F6',
  },

  // 文本色
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // 边框色
  border: {
    light: '#E5E7EB',
    dark: '#374151',
    focus: '#007AFF',
  },

  // 透明度
  opacity: {
    transparent: 'rgba(0, 0, 0, 0)',
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },
} as const;

export type Colors = typeof colors;
