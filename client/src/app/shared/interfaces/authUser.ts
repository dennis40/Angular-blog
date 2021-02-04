export interface AuthUserRequest {
  login: string;
  password: string;
}

export interface AuthUserResponse {
  success: boolean;
  msg: string;
  token: string;
  user: AuthUser;
}

export interface AuthUser {
  name: string;
  login: string;
  email: string;
}
