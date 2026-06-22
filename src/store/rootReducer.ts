/**
 * 根 Reducer
 */

import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';

/**
 * 根 Reducer
 */
export const rootReducer = combineReducers({
  app: appReducer,
  // 在这里添加其他 reducers
  // user: userReducer,
  // auth: authReducer,
});

/**
 * Root State 类型
 */
export type RootState = ReturnType<typeof rootReducer>;
