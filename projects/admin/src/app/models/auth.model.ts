export interface AuthResponse {
  accessToken: string;
}

export interface StoredAuthData {
  token: string;
  expiresAt: number;
}