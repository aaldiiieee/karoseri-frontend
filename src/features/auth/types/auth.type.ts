// Login payload
export interface LoginRequest {
  username: string;
  password: string;
}

// Login API response
export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: string;
  username: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
