import { api } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  authToken: string;
  refreshToken: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    api.setAuthToken(response.authToken);
    return response;
  },

  async register(data: RegisterRequest): Promise<{ id: string }> {
    return api.post<{ id: string }>('/auth/register', data);
  },

  logout() {
    api.setAuthToken(null);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};

