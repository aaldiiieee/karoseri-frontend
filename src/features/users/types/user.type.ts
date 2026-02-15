export interface User {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "admin" | "user";

export interface UserCreate {
  username: string;
  password: string;
  role?: UserRole;
}

export interface UserUpdate {
  username?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UserActionHandlers {
  onEdit: (item: User) => void;
  onDelete: (item: User) => void;
}
