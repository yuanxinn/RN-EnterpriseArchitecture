/**
 * API 服务层基础配置
 */

import { appConfig } from '../config';

/**
 * HTTP 方法类型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * 请求配置
 */
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

/**
 * API 错误类
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API 客户端类
 */
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor() {
    this.baseURL = appConfig.api.baseURL;
    this.defaultHeaders = appConfig.api.headers;
    this.timeout = appConfig.api.timeout;
  }

  /**
   * 设置授权 Token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * 清除授权 Token
   */
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * 发送请求
   */
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);

    // 添加查询参数
    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const headers = {
      ...this.defaultHeaders,
      ...config?.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config?.timeout || this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, response.statusText, errorData);
      }

      const result = await response.json();
      return result as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError(408, '请求超时');
        }
        throw new ApiError(0, error.message);
      }

      throw new ApiError(0, '未知错误');
    }
  }

  /**
   * GET 请求
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  /**
   * POST 请求
   */
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', endpoint, data, config);
  }

  /**
   * PUT 请求
   */
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  /**
   * DELETE 请求
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  /**
   * PATCH 请求
   */
  async patch<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, config);
  }
}

// 导出单例 API 客户端
export const apiClient = new ApiClient();
