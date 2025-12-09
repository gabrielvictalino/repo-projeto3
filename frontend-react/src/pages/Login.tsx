import React, { useState } from 'react';

export default function Login({ onLogin }: { onLogin: (user: { name: string }) => void }) {
  const [name, setName] = useState('');

  return (
    <div className="sr-login" style={{ maxWidth: 480, margin: '0 auto', background: 'white', padding: 20, borderRadius: 8 }}>
      <h2>Entrar</h2>
      <div className="field">
        <label>Nome</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
      </div>
      <div className="actions">
        <button className="primary" onClick={() => onLogin({ name: name || 'Usuário' })}>Entrar</button>
      </div>
    </div>
  );
}
