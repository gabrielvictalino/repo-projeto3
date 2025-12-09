import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import injectHeaderStyles from './styles';
import type { User } from '../../../types/user';

injectHeaderStyles();

interface HeaderProps {
  subtitle?: string;
  onLogin?: () => void;
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ subtitle, onLogin, user, onLogout }: HeaderProps){
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isManager = user?.role === 'manager';
  const isCliente = user?.role === 'cliente';

  // Menu items based on role
  const getNavItems = () => {
    if (isManager) {
      return [
        { path: '/gerenciar', label: '🏠 Painel', icon: '🏠' },
        { path: '/criar', label: '➕ Criar', icon: '➕' },
        { path: '/resultados', label: '📊 Resultados', icon: '📊' },
        { path: '/respondentes', label: '👥 Respondentes', icon: '👥' },
      ];
    } else if (isCliente) {
      return [
        { path: '/home', label: '🏠 Início', icon: '🏠' },
        { path: '/responder', label: '📝 Questionários', icon: '📝' },
        { path: '/meus-resultados', label: '📊 Minhas Respostas', icon: '📊' },
      ];
    } else {
      return [
        { path: '/', label: '🏠 Início', icon: '🏠' },
        { path: '/responder', label: '📝 Questionários', icon: '📝' },
        { path: '/login', label: '🔑 Entrar', icon: '🔑' },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <header className="sr-header">
      <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div className="logo" />
        <div>
          <div className="title">Questionários SEBRAE</div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="header-center">
        {/* Search bar */}
        {user && (
          <div className={`search-container ${showSearch ? 'expanded' : ''}`}>
            <button 
              className="search-toggle" 
              onClick={() => setShowSearch(!showSearch)}
              title="Buscar questionários"
            >
              🔍
            </button>
            {showSearch && (
              <input 
                type="text" 
                placeholder="Buscar questionários..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
            )}
          </div>
        )}
      </div>

      <div className="actions">
        {/* notification bell */}
        <button className="sr-bell" title="Notificações" aria-label="Notificações">🔔<span className="badge">0</span></button>
        {user ? (
          <div className="user" title="Sair" onClick={() => onLogout && onLogout()} style={{ cursor: 'pointer' }}>
            <div className="avatar" />
            <div>
              <div style={{ fontWeight: 600 }}>{user.name}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>
                {user.role === 'manager' ? '👔 Manager' : '👤 Cliente'}
              </div>
            </div>
          </div>
        ) : (
          <button className="primary" onClick={() => onLogin && onLogin()}>Entrar</button>
        )}
      </div>
    </header>
  );
}
