import React, { useEffect, useState } from 'react';
import injectLogonStyles from './styles';
import type { User, UserRole } from '../../types/user';
import { validateCredentials } from '../../data/defaultUsers';

injectLogonStyles();

export default function Logon({ onLogin }: { onLogin: (user: User) => void }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('cliente');
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
    
    // Validate against default users
    const validUser = validateCredentials(name.trim(), password);
    
    if (!validUser) {
      setError('Credenciais inválidas. Verifique nome e senha.');
      return;
    }
    
    onLogin(validUser);
    setName(''); 
    setPassword('');
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
            <div className="field">
              <label>Entrar como</label>
              <select value={role} onChange={e => setRole(e.target.value as UserRole)}>
                <option value="cliente">👤 Cliente</option>
                <option value="manager">👔 Manager</option>
              </select>
            </div>
            {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 8, lineHeight: 1.5 }}>
              💡 <strong>Credenciais de teste:</strong><br/>
              Manager: <code>admin/admin123</code> ou <code>manager/manager123</code><br/>
              Cliente: <code>cliente1/cliente123</code> ou <code>joao/joao123</code>
            </div>
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
