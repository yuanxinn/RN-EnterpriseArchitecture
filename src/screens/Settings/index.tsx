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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>外观设置</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>主题模式</Text>
              <Text style={styles.settingDescription}>
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
                    themeMode === mode && styles.themeButtonActive,
                  ]}
                  onPress={() => dispatch(setThemeMode(mode))}>
                  <Text
                    style={[
                      styles.themeButtonText,
                      themeMode === mode && styles.themeButtonTextActive,
                    ]}>
                    {mode === 'light' ? '浅色' : mode === 'dark' ? '深色' : '系统'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>应用状态</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>网络状态</Text>
              <Text style={styles.settingDescription}>
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

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Redux Store</Text>
              <Text style={styles.settingDescription}>状态管理正常运行</Text>
            </View>
            <View style={[styles.statusBadge, styles.statusConnected]}>
              <Text style={styles.statusText}>正常</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>其他</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
            <Text style={styles.menuLabel}>关于应用</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleResetApp}>
            <Text style={[styles.menuLabel, styles.menuLabelDanger]}>重置应用</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>AwesomeProject v0.0.1</Text>
          <Text style={styles.footerText}>React Native 0.86.0</Text>
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
  section: {
    backgroundColor: colors.white,
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
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: fontSize.base,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  themeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
  },
  themeButtonActive: {
    backgroundColor: colors.primary,
  },
  themeButtonText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  themeButtonTextActive: {
    color: colors.white,
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
    borderBottomColor: colors.border.light,
  },
  menuLabel: {
    fontSize: fontSize.base,
    color: colors.text.primary,
  },
  menuLabelDanger: {
    color: colors.error,
  },
  menuArrow: {
    fontSize: fontSize.xl,
    color: colors.text.secondary,
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
});
