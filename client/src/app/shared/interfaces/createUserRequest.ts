export interface CreateUserRequest {
  name: string;
  login: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  success: boolean;
  msg?: string;
}
