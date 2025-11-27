import React from 'react';
import injectHeaderStyles from './styles';

injectHeaderStyles();

export default function Header({ subtitle, onLogin, user, onLogout }: { subtitle?: string; onLogin?: () => void; user?: { name: string } | null; onLogout?: () => void }){
  return (
    <header className="sr-header">
      <div className="brand">
        <div className="logo" />
        <div>
          <div className="title">Questionários SEBRAE</div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      </div>
      <div className="actions">
        {/* notification bell */}
        <button className="sr-bell" title="Notificações" aria-label="Notificações">🔔<span className="badge">0</span></button>
        {user ? (
          <div className="user" title="Sair" onClick={() => onLogout && onLogout()} style={{ cursor: 'pointer' }}>
            <div className="avatar" />
            <div>{user.name}</div>
          </div>
        ) : (
          <button className="primary" onClick={() => onLogin && onLogin()}>Entrar</button>
        )}
      </div>
    </header>
  );
}
