import type { User } from '../types/user';

/**
 * Usuários pré-cadastrados para testes
 * Usar estas credenciais no login:
 * 
 * MANAGER:
 * - Nome: admin | Senha: admin123
 * - Nome: manager | Senha: manager123
 * 
 * CLIENTE:
 * - Nome: cliente1 | Senha: cliente123
 * - Nome: joao | Senha: joao123
 * - Nome: maria | Senha: maria123
 */

export const DEFAULT_USERS: User[] = [
  {
    id: 'usr_001',
    name: 'admin',
    email: 'admin@sebrae.com.br',
    role: 'manager',
    token: 'token_admin_001',
    createdAt: '2025-01-01T10:00:00.000Z'
  },
  {
    id: 'usr_002',
    name: 'manager',
    email: 'manager@sebrae.com.br',
    role: 'manager',
    token: 'token_manager_002',
    createdAt: '2025-01-15T14:30:00.000Z'
  },
  {
    id: 'usr_003',
    name: 'cliente1',
    email: 'cliente1@email.com',
    role: 'cliente',
    token: 'token_cliente_003',
    createdAt: '2025-02-10T09:15:00.000Z'
  },
  {
    id: 'usr_004',
    name: 'joao',
    email: 'joao.silva@email.com',
    role: 'cliente',
    token: 'token_joao_004',
    createdAt: '2025-02-20T16:45:00.000Z'
  },
  {
    id: 'usr_005',
    name: 'maria',
    email: 'maria.santos@email.com',
    role: 'cliente',
    token: 'token_maria_005',
    createdAt: '2025-03-05T11:20:00.000Z'
  }
];

// Senhas correspondentes (apenas para referência - em produção usar hash)
export const DEFAULT_PASSWORDS: Record<string, string> = {
  'admin': 'admin123',
  'manager': 'manager123',
  'cliente1': 'cliente123',
  'joao': 'joao123',
  'maria': 'maria123'
};

/**
 * Valida credenciais contra usuários padrão
 */
export function validateCredentials(username: string, password: string): User | null {
  const user = DEFAULT_USERS.find(u => u.name.toLowerCase() === username.toLowerCase());
  if (!user) return null;
  
  const expectedPassword = DEFAULT_PASSWORDS[user.name];
  if (expectedPassword !== password) return null;
  
  return user;
}
