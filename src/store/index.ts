/**
 * Redux Store 配置
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './rootReducer';

/**
 * 创建 Redux Store
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
  devTools: __DEV__
    ? {
        name: 'AwesomeProject',
        trace: true,
        traceLimit: 25,
      }
    : false,
});

/**
 * Store 类型
 */
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

/**
 * Typed Hooks
 * 使用这些 hooks 代替普通的 useDispatch 和 useSelector
 * 以获得完整的 TypeScript 类型支持
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * 导出 RootState 类型
 */
export type RootState = ReturnType<typeof store.getState>;
