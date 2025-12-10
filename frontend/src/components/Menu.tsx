import React from 'react';

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';

export default function Menu({ current, onChange }: { current: View; onChange: (v: View) => void }) {
  return (
    <aside className="sr-menu">
      <div className="sr-brand">Questionários</div>
      <nav>
        <button className={current === 'responder' ? 'active' : ''} onClick={() => onChange('responder')}>Responder</button>
        <button className={current === 'criar' ? 'active' : ''} onClick={() => onChange('criar')}>Criar</button>
        <button className={current === 'resultados' ? 'active' : ''} onClick={() => onChange('resultados')}>Resultados</button>
        <button className={current === 'respondentes' ? 'active' : ''} onClick={() => onChange('respondentes')}>Respondentes</button>
      </nav>
      <div className="sr-footer">SEBRAE style</div>
    </aside>
  );
}
