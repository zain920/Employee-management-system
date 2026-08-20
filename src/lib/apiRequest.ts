import axios, { type AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export async function apiRequest<T>({
  url,
  method = 'GET',
  data,
  params,
  headers,
}: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
  headers?: any;
}): Promise<T> {
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    params,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  const response = await apiClient(config);
  return response.data;
}