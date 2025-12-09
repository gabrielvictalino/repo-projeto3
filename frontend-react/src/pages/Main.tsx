import React from 'react';

export default function Main({ onStart }: { onStart?: () => void }) {
  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Bem-vindo</h1>
      <p>Esta é a área de questionários. Use o menu à esquerda para criar, responder e ver resultados.</p>
      <div className="actions">
        <button className="primary" onClick={onStart}>Começar</button>
      </div>
    </div>
  );
}
