/**
 * 根导航器
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

import { HomeScreen, SettingsScreen } from '../screens';
import type { RootStackParamList, MainTabParamList } from '../types/navigation';
import { colors } from '../constants/colors';
import { selectThemeMode } from '../store/slices/appSlice';

/**
 * 底部标签导航器
 */
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * 根堆栈导航器
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * 标签图标组件
 */
const TabIcon = ({ name, color }: { name: string; color: string }) => (
  <Text style={[styles.tabIcon, { color }]}>{name}</Text>
);

/**
 * 主标签导航器
 */
function MainTabNavigator() {
  const systemColorScheme = useColorScheme();
  const themeMode = useSelector(selectThemeMode);
  const isDarkMode =
    themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  const tabBarBackground = isDarkMode ? colors.gray[900] : colors.white;
  const tabBarActiveColor = colors.primary;
  const tabBarInactiveColor = isDarkMode ? colors.gray[400] : colors.gray[500];
  const headerBackground = isDarkMode ? colors.gray[900] : colors.white;
  const headerTintColor = isDarkMode ? colors.gray[100] : colors.text.primary;

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: headerBackground,
        },
        headerTintColor: headerTintColor,
        headerTitleStyle: {
          fontWeight: '600',
        },
        tabBarActiveTintColor: tabBarActiveColor,
        tabBarInactiveTintColor: tabBarInactiveColor,
        tabBarStyle: {
          backgroundColor: tabBarBackground,
          borderTopColor: isDarkMode ? colors.gray[700] : colors.border.light,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <TabIcon name="🏠" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '设置',
          tabBarIcon: ({ color }) => <TabIcon name="⚙️" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * 根导航器
 */
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 24,
  },
});
