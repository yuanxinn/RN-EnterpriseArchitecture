/**
 * 首页
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector, useAppDispatch } from '../../store';
import { setThemeMode, selectThemeMode } from '../../store/slices/appSlice';
import { colors } from '../../constants/colors';
import { spacing, fontSize } from '../../constants/spacing';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const systemColorScheme = useColorScheme();

  // 根据 Redux 主题模式确定是否深色
  const isDarkMode =
    themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  const handleToggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    dispatch(setThemeMode(newTheme));
  };

  // 动态样式 - 根据主题切换颜色
  const themeColors = {
    background: isDarkMode ? colors.gray[900] : colors.background.secondary,
    card: isDarkMode ? colors.gray[800] : colors.white,
    cardTitle: isDarkMode ? colors.gray[50] : colors.text.primary,
    cardDescription: isDarkMode ? colors.gray[300] : colors.text.secondary,
    textPrimary: isDarkMode ? colors.gray[100] : colors.text.primary,
    textSecondary: isDarkMode ? colors.gray[400] : colors.text.secondary,
    border: isDarkMode ? colors.gray[700] : colors.border.light,
    button: isDarkMode ? colors.primaryDark : colors.primary,
    infoValue: isDarkMode ? colors.gray[100] : colors.text.primary,
    tabActive: isDarkMode ? colors.primaryLight : colors.primary,
    tabInactive: isDarkMode ? colors.gray[500] : colors.gray[500],
    tabBarBg: isDarkMode ? colors.gray[900] : colors.white,
    tabBarBorder: isDarkMode ? colors.gray[700] : colors.border.light,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>欢迎使用 AwesomeProject</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>企业级 React Native 架构</Text>
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.cardTitle, { color: themeColors.cardTitle }]}>架构特性</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={[styles.featureText, { color: themeColors.textPrimary }]}>Redux Toolkit 状态管理</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={[styles.featureText, { color: themeColors.textPrimary }]}>React Navigation 导航系统</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={[styles.featureText, { color: themeColors.textPrimary }]}>TypeScript 类型安全</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={[styles.featureText, { color: themeColors.textPrimary }]}>模块化目录结构</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={[styles.featureText, { color: themeColors.textPrimary }]}>API 服务层封装</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.cardTitle, { color: themeColors.cardTitle }]}>主题切换</Text>
          <Text style={[styles.cardDescription, { color: themeColors.cardDescription }]}>
            当前主题：{themeMode === 'system' ? '跟随系统' : themeMode === 'light' ? '浅色' : '深色'}
          </Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.button }]} onPress={handleToggleTheme}>
            <Text style={styles.buttonText}>切换主题</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.cardTitle, { color: themeColors.cardTitle }]}>系统信息</Text>
          <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>系统配色方案</Text>
            <Text style={[styles.infoValue, { color: themeColors.infoValue }]}>{isDarkMode ? '深色' : '浅色'}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>Redux DevTools</Text>
            <Text style={[styles.infoValue, { color: themeColors.infoValue }]}>已启用</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  cardDescription: {
    fontSize: fontSize.base,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  featureList: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: fontSize.lg,
    color: colors.success,
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: fontSize.base,
    color: colors.text.primary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  infoLabel: {
    fontSize: fontSize.base,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: fontSize.base,
    color: colors.text.primary,
    fontWeight: '500',
  },
});
