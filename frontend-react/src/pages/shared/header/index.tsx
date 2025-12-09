import React, { useState } from 'react';
import injectHeaderStyles from './styles';
import type { User } from '../../../types/user';

injectHeaderStyles();

interface HeaderProps {
  subtitle?: string;
  onLogin?: () => void;
  user?: User | null;
  onLogout?: () => void;
  onToggleMenu?: () => void;
  showMenuToggle?: boolean;
}

export default function Header({ subtitle, onLogin, user, onLogout, onToggleMenu, showMenuToggle = false }: HeaderProps){
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sr-header">
      {/* Menu toggle button on left */}
      {showMenuToggle && (
        <button 
          className="sr-hamburger-header"
          onClick={onToggleMenu}
          aria-label="Toggle menu"
          title="Menu"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      )}

      <div className="brand">
        <div className="logo" />
        <div>
          <div className="title">Questionários SEBRAE</div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      </div>

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
