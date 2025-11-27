import React, { useState } from 'react';
import injectMenuStyles from './styles';

injectMenuStyles();

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';

export default function Menu({ current, onChange }: { current?: string; onChange?: (v: any) => void }) {
  const [collapsed, setCollapsed] = useState(false);

  const items: { key: View; icon: string; label: string; path: string }[] = [
    { key: 'responder', icon: '📝', label: 'Responder', path: '/' },
    { key: 'criar', icon: '✏️', label: 'Criar', path: '/criar' },
    { key: 'resultados', icon: '📊', label: 'Resultados', path: '/resultados' },
    { key: 'respondentes', icon: '👥', label: 'Respondentes', path: '/respondentes' },
  ];

  return (
    <aside className={`sr-menu ${collapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sr-top">
        <div className="sr-brand" onClick={() => setCollapsed(c => !c)} style={{ cursor: 'pointer' }}>
          <div className="logo" />
          <div className="brand-text">Questionários</div>
        </div>
      </div>

      <nav className="sr-nav">
        {items.map(item => (
          <button key={item.key} className={current === item.path ? 'nav-item active' : 'nav-item'} onClick={() => onChange && onChange(item.path)}>
            <span className="icon" aria-hidden>{item.icon}</span>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="sr-toggle" onClick={() => setCollapsed(c => !c)} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}>
        {collapsed ? '▶' : '◀'}
      </button>

      <div className="sr-footer">SEBRAE</div>
    </aside>
  );
}
