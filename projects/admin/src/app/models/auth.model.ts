export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}
