/**
 * 应用配置
 */

export const appConfig = {
  // 应用名称
  appName: 'AwesomeProject',

  // API 配置
  api: {
    baseURL: 'https://api.example.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  },

  // 存储配置
  storage: {
    prefix: '@app',
  },

  // 开发环境配置
  isDev: __DEV__,
} as const;

export type AppConfig = typeof appConfig;
