/**
 * 间距系统定义
 * 定义应用中使用的间距、圆角、字体大小等
 */

export const spacing = {
  // 间距（基于 4px 网格系统）
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
 '2xl': 24,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
 '2xl': 24,
 '3xl': 30,
 '4xl': 36,
 '5xl': 48,
} as const;

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type FontSize = typeof fontSize;
