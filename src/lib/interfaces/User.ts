export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | undefined;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string[] | null;
  setUser: (user: User | null) => Promise<void>;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; phone: string; password: string; confirmPassword: string }) => Promise<void>;
  logout: () => Promise<void>;
}
