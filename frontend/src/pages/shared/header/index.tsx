import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import injectHeaderStyles from './styles-new';
import type { User } from '../../../types/user';
import { useSearch } from '../../../contexts/SearchContext';
import { useFeedback } from '../../../contexts/FeedbackContext';
import NotificationsPanel from '../../../components/NotificationsPanel';
import { 
  HomeIcon, 
  PlusIcon, 
  ChartIcon, 
  UsersIcon, 
  DocumentIcon, 
  KeyIcon,
  SearchIcon,
  BellIcon,
  LogoutIcon
} from '../../../components/Icons';

injectHeaderStyles();

interface HeaderProps {
  subtitle?: string;
  onLogin?: () => void;
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ subtitle, onLogin, user, onLogout }: HeaderProps){
  const { searchQuery, setSearchQuery } = useSearch();
  const { getUnreadCount, refreshNotifications } = useFeedback();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isManager = user?.role === 'manager';
  const isCliente = user?.role === 'cliente';
  
  // Load notifications when user logs in
  React.useEffect(() => {
    if (user?.id) {
      const match = user.id.match(/\d+/);
      const numericUserId = match ? parseInt(match[0]) : parseInt(user.id) || 0;
      if (numericUserId > 0) {
        console.log('🔔 [Header] Carregando notificações para userId:', numericUserId);
        refreshNotifications(numericUserId);
      }
    }
  }, [user, refreshNotifications]);

  // Menu items based on role
  const getNavItems = () => {
    if (isManager) {
      return [
        { path: '/gerenciar', label: 'Painel', icon: <HomeIcon /> },
        { path: '/criar', label: 'Criar', icon: <PlusIcon /> },
        { path: '/resultados', label: 'Resultados', icon: <ChartIcon /> },
        { path: '/respondentes', label: 'Respondentes', icon: <UsersIcon /> },
        { path: '/feedbacks', label: 'Feedbacks', icon: <DocumentIcon /> },
      ];
    } else if (isCliente) {
      return [
        { path: '/home', label: 'Início', icon: <HomeIcon /> },
        { path: '/responder', label: 'Questionários', icon: <DocumentIcon /> },
        { path: '/meus-resultados', label: 'Respostas', icon: <ChartIcon /> },
        { path: '/feedbacks', label: 'Feedbacks', icon: <BellIcon /> },
      ];
    } else {
      return [
        { path: '/', label: 'Início', icon: <HomeIcon /> },
        { path: '/responder', label: 'Questionários', icon: <DocumentIcon /> },
        { path: '/login', label: 'Entrar', icon: <KeyIcon /> },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <header className="sr-header">
      {/* Logo and Title */}
      <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img 
          src="/assets/sebrae-logo.gif" 
          alt="SEBRAE Logo" 
          className="logo"
          style={{ height: '50px', width: 'auto', marginRight: '15px' }}
        />
        <div>
          <div className="title">Questionários SEBRAE</div>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      </div>

      {/* Navigation Menu */}
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

      {/* Search */}
      <div className="header-center">
        {user && (
          <div className={`search-container ${showSearch ? 'expanded' : ''}`}>
            <button 
              className="search-toggle" 
              onClick={() => setShowSearch(!showSearch)}
              title="Buscar"
            >
              <SearchIcon size={18} />
            </button>
            {showSearch && (
              <input 
                type="text" 
                placeholder="Buscar questionários..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input visible"
                autoFocus
              />
            )}
          </div>
        )}
      </div>

      {/* Actions: Bell, Profile, Logout */}
      <div className="actions">
        {user && (
          <>
            <button 
              className="header-btn bell-btn" 
              title="Notificações"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon size={18} />
              {getUnreadCount(user.id) > 0 && (
                <span className="badge">{getUnreadCount(user.id)}</span>
              )}
            </button>
            <button className="header-btn profile-info" onClick={() => navigate('/perfil')} title="Ver perfil">
              <img 
                src={user.avatarUrl || 'https://via.placeholder.com/28'} 
                alt={user.name} 
                className="user-avatar" 
              />
              <span className="user-text">{user.name}</span>
            </button>
            <button className="header-btn logout-icon" onClick={() => onLogout && onLogout()} title="Sair">
              <LogoutIcon size={18} />
            </button>
          </>
        )}
        {!user && (
          <button className="header-btn btn-login" onClick={() => onLogin && onLogin()}>
            Entrar
          </button>
        )}
      </div>
      
      {/* Notifications Panel */}
      {showNotifications && user && (
        <NotificationsPanel
          userId={user.id}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
}
