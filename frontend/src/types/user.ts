export type UserRole = 'manager' | 'cliente';

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  token?: string;
  createdAt?: string;
  avatarUrl?: string;
  cpf?: string;
  sobrenome?: string;
  genero?: string;
  escolaridade?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isManager: boolean;
  isCliente: boolean;
}
