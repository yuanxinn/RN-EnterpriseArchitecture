/**
 * 导航类型定义
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

/**
 * 根堆栈导航器参数
 */
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  // 在这里添加其他堆栈页面
  // ExampleDetail: { id: string };
};

/**
 * 主标签导航器参数
 */
export type MainTabParamList = {
  Home: undefined;
  Settings: undefined;
};

/**
 * 屏幕 Props 类型
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * 声明导航类型
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
