import React from 'react';
import injectMenuStyles from './styles';
import type { UserRole } from '../../types/user';

injectMenuStyles();

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';

export type MenuState = 'expanded' | 'collapsed' | 'hidden';

interface MenuProps {
  current?: string;
  onChange?: (v: any) => void;
  userRole?: UserRole;
  menuState: MenuState;
}

export default function Menu({ current, onChange, userRole, menuState }: MenuProps) {
  // Manager menu items
  const managerItems = [
    { key: 'gerenciar', icon: '👔', label: 'Gerenciar', path: '/gerenciar' },
    { key: 'criar', icon: '✏️', label: 'Criar', path: '/criar' },
    { key: 'resultados', icon: '📊', label: 'Resultados', path: '/resultados' },
    { key: 'respondentes', icon: '👥', label: 'Respondentes', path: '/respondentes' },
  ];

  // Cliente menu items
  const clienteItems = [
    { key: 'home', icon: '🏠', label: 'Início', path: '/home' },
    { key: 'responder', icon: '📝', label: 'Questionários', path: '/responder' },
    { key: 'meus-resultados', icon: '📊', label: 'Minhas Respostas', path: '/meus-resultados' },
  ];

  // Guest menu items (when not logged in)
  const guestItems = [
    { key: 'home', icon: '🏠', label: 'Início', path: '/home' },
    { key: 'responder', icon: '📝', label: 'Questionários', path: '/responder' },
    { key: 'login', icon: '🔐', label: 'Entrar', path: '/login' },
  ];

  const items = userRole === 'manager' ? managerItems : (userRole === 'cliente' ? clienteItems : guestItems);

  if (menuState === 'hidden') return null;

  return (
    <aside className={`sr-menu ${menuState}`}>
      <div className="sr-top">
        <div className="sr-brand">
          <div className="logo" />
          {menuState === 'expanded' && <div className="brand-text">Questionários</div>}
        </div>
      </div>

      <nav className="sr-nav">
        {items.map(item => (
          <button 
            key={item.key} 
            className={current === item.path ? 'nav-item active' : 'nav-item'} 
            onClick={() => onChange && onChange(item.path)}
            title={menuState === 'collapsed' ? item.label : undefined}
          >
            <span className="icon" aria-hidden>{item.icon}</span>
            {menuState === 'expanded' && <span className="label">{item.label}</span>}
          </button>
        ))}
      </nav>

      {menuState === 'expanded' && <div className="sr-footer">SEBRAE</div>}
    </aside>
  );
}
