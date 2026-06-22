/**
 * 设置页面
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector, useAppDispatch } from '../../store';
import {
  selectThemeMode,
  setThemeMode,
  selectIsConnected,
  reset,
} from '../../store/slices/appSlice';
import { colors } from '../../constants/colors';
import { spacing, fontSize } from '../../constants/spacing';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const isConnected = useAppSelector(selectIsConnected);
  const systemColorScheme = useColorScheme();

  const isDarkMode =
    themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  const themeColors = {
    background: isDarkMode ? colors.gray[900] : colors.background.secondary,
    card: isDarkMode ? colors.gray[800] : colors.white,
    sectionTitle: isDarkMode ? colors.gray[50] : colors.text.primary,
    settingLabel: isDarkMode ? colors.gray[100] : colors.text.primary,
    settingDesc: isDarkMode ? colors.gray[400] : colors.text.secondary,
    border: isDarkMode ? colors.gray[700] : colors.border.light,
    menuLabel: isDarkMode ? colors.gray[100] : colors.text.primary,
    menuArrow: isDarkMode ? colors.gray[400] : colors.text.secondary,
    menuDivider: isDarkMode ? colors.gray[700] : colors.border.light,
    footerText: isDarkMode ? colors.gray[500] : colors.text.secondary,
    themeBtn: isDarkMode ? colors.gray[700] : colors.gray[100],
    themeBtnActive: isDarkMode ? colors.primaryDark : colors.primary,
    themeBtnText: isDarkMode ? colors.gray[200] : colors.text.secondary,
    themeBtnTextActive: colors.white,
  };

  const handleResetApp = () => {
    Alert.alert(
      '重置应用',
      '确定要重置应用状态吗？这将清除所有本地数据。',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            dispatch(reset());
            Alert.alert('成功', '应用状态已重置');
          },
        },
      ],
    );
  };

  const handleAbout = () => {
    Alert.alert(
      '关于',
      'AwesomeProject v0.0.1\n\n企业级 React Native 架构模板\n\n特性：\n• Redux Toolkit 状态管理\n• React Navigation 导航\n• TypeScript 类型安全\n• 模块化架构',
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.sectionTitle }]}>外观设置</Text>

          <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: themeColors.settingLabel }]}>主题模式</Text>
              <Text style={[styles.settingDescription, { color: themeColors.settingDesc }]}>
                {themeMode === 'light'
                  ? '浅色模式'
                  : themeMode === 'dark'
                  ? '深色模式'
                  : '跟随系统'}
              </Text>
            </View>
            <View style={styles.themeButtons}>
              {(['light', 'system', 'dark'] as const).map(mode => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.themeButton,
                    { backgroundColor: themeColors.themeBtn },
                    themeMode === mode && { backgroundColor: themeColors.themeBtnActive },
                  ]}
                  onPress={() => dispatch(setThemeMode(mode))}>
                  <Text
                    style={[
                      styles.themeButtonText,
                      { color: themeColors.themeBtnText },
                      themeMode === mode && { color: themeColors.themeBtnTextActive },
                    ]}>
                    {mode === 'light' ? '浅色' : mode === 'dark' ? '深色' : '系统'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.sectionTitle }]}>应用状态</Text>

          <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: themeColors.settingLabel }]}>网络状态</Text>
              <Text style={[styles.settingDescription, { color: themeColors.settingDesc }]}>
                {isConnected ? '已连接' : '未连接'}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                isConnected ? styles.statusConnected : styles.statusDisconnected,
              ]}>
              <Text style={styles.statusText}>{isConnected ? '在线' : '离线'}</Text>
            </View>
          </View>

          <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: themeColors.settingLabel }]}>Redux Store</Text>
              <Text style={[styles.settingDescription, { color: themeColors.settingDesc }]}>状态管理正常运行</Text>
            </View>
            <View style={[styles.statusBadge, styles.statusConnected]}>
              <Text style={styles.statusText}>正常</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.sectionTitle }]}>其他</Text>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: themeColors.menuDivider }]} onPress={handleAbout}>
            <Text style={[styles.menuLabel, { color: themeColors.menuLabel }]}>关于应用</Text>
            <Text style={[styles.menuArrow, { color: themeColors.menuArrow }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomColor: themeColors.menuDivider }]} onPress={handleResetApp}>
            <Text style={[styles.menuLabel, { color: themeColors.menuLabel }, styles.menuLabelDanger]}>重置应用</Text>
            <Text style={[styles.menuArrow, { color: themeColors.menuArrow }]}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.footerText }]}>AwesomeProject v0.0.1</Text>
          <Text style={[styles.footerText, { color: themeColors.footerText }]}>React Native 0.86.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  section: {
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: fontSize.base,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: fontSize.sm,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  themeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  themeButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusConnected: {
    backgroundColor: colors.success + '20',
  },
  statusDisconnected: {
    backgroundColor: colors.error + '20',
  },
  statusText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  menuLabel: {
    fontSize: fontSize.base,
  },
  menuLabelDanger: {
    color: colors.error,
  },
  menuArrow: {
    fontSize: fontSize.xl,
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
});
