export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserPayLoad {
  username: string;
  password: string;
  email: string;
}

export interface LoginPayLoad {
  username: string;
  password: string;
}
