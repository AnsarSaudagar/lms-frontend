export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  accessToken: string;
  _id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNumber?: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}
