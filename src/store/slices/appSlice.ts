/**
 * 应用全局状态 Slice
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * 应用状态类型
 */
export interface AppState {
  /** 应用是否已初始化 */
  isInitialized: boolean;
  /** 当前主题模式 */
  themeMode: 'light' | 'dark' | 'system';
  /** 网络状态 */
  isConnected: boolean;
  /** 加载状态 */
  isLoading: boolean;
  /** 全局错误信息 */
  error: string | null;
}

/**
 * 初始状态
 */
const initialState: AppState = {
  isInitialized: false,
  themeMode: 'system',
  isConnected: true,
  isLoading: false,
  error: null,
};

/**
 * 应用状态 Slice
 */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /**
     * 设置初始化状态
     */
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },

    /**
     * 设置主题模式
     */
    setThemeMode: (state, action: PayloadAction<AppState['themeMode']>) => {
      state.themeMode = action.payload;
    },

    /**
     * 设置网络状态
     */
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },

    /**
     * 设置加载状态
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * 设置错误信息
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /**
     * 清除错误
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * 重置应用状态
     */
    reset: () => initialState,
  },
});

// 导出 actions
export const {
  setInitialized,
  setThemeMode,
  setConnected,
  setLoading,
  setError,
  clearError,
  reset,
} = appSlice.actions;

// 导出 reducer
export default appSlice.reducer;

// 导出 selectors
export const selectApp = (state: { app: AppState }) => state.app;
export const selectIsInitialized = (state: { app: AppState }) => state.app.isInitialized;
export const selectThemeMode = (state: { app: AppState }) => state.app.themeMode;
export const selectIsConnected = (state: { app: AppState }) => state.app.isConnected;
export const selectIsLoading = (state: { app: AppState }) => state.app.isLoading;
export const selectError = (state: { app: AppState }) => state.app.error;
