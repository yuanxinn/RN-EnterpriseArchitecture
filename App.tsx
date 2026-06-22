/**
 * AwesomeProject - 企业级 React Native 应用
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store, useAppSelector } from './src/store';
import { selectThemeMode } from './src/store/slices';
import { RootNavigator } from './src/navigation';

/**
 * 应用内容组件
 */
function AppContent() {
  const themeMode = useAppSelector(selectThemeMode);
  const systemColorScheme = useColorScheme();

  // 确定当前主题
  const isDarkMode =
    themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </>
  );
}

/**
 * 应用根组件
 */
function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
