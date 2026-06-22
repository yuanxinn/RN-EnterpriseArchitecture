/**
 * 根导航器
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet } from 'react-native';

import { HomeScreen, SettingsScreen } from '../screens';
import type { RootStackParamList, MainTabParamList } from '../types/navigation';
import { colors } from '../constants/colors';

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
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border.light,
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
