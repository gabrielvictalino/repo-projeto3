import React from 'react';
import injectMainStyles from './styles';

injectMainStyles();

export default function Main({ onStart }: { onStart?: () => void }) {
  return (
    <div className="main-root">
      <div className="main-landing">
        <h1>Bem-vindo</h1>
        <p>Esta é a área de questionários. Use o menu à esquerda para criar, responder e ver resultados.</p>
        <div className="actions">
          <button className="primary" onClick={onStart}>Começar</button>
        </div>
      </div>
    </div>
  );
}
