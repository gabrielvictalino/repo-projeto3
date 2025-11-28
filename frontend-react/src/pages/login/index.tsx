import React, { useEffect, useState } from 'react';
import injectLogonStyles from './styles';

injectLogonStyles();

export default function Logon({ onLogin }: { onLogin: (user: { name: string; token?: string }) => void }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading (e.g., fetching config) before showing login
    // increased by ~1s per request: originally 700ms, now 1700ms
    const t = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(t);
  }, []);

  function submit() {
    setError(null);
    if (!name.trim()) { setError('Informe o nome de usuário'); return; }
    if (!password) { setError('Informe a senha'); return; }
    // demo acceptance
    onLogin({ name: name.trim(), token: 'demo-token' });
    setName(''); setPassword('');
  }

  if (loading) {
    return (
      <div className="logon-loading">
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" />
          <div style={{ marginTop:12, fontSize:16, opacity:0.95 }}>Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="logon-split">
      <div className="logon-top" />
      <div className="logon-bottom" />
      <div className="logon-wrapper">
        <div className="logon-card">
            <h2>Entrar</h2>
            <div className="field">
              <label>Nome</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
            </div>
            <div className="field">
              <label>Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
            </div>
            {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
            <div className="actions">
              <button className="primary" onClick={submit}>Entrar</button>
            </div>
            <div className="social-row" aria-hidden>
              <div className="social-dot"><span>G</span></div>
              <div className="social-dot"><span>I</span></div>
              <div className="social-dot small"><span>F</span></div>
            </div>
          </div>
        </div>
    </div>
  );
}
