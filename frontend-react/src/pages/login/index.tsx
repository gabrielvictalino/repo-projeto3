import React, { useEffect, useState } from 'react';
import injectLogonStyles from './styles';
import type { User, UserRole } from '../../types/user';
import { validateCredentials } from '../../data/defaultUsers';
import { LightBulbIcon } from '../../components/Icons';
import { usuariosAPI } from '../../services/api';

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

  async function submit() {
    setError(null);
    if (!name.trim()) { setError('Informe o e-mail ou CPF'); return; }
    if (!password) { setError('Informe a senha'); return; }
    
    try {
      // Try API login first
      const apiUser = await usuariosAPI.login(name.trim(), password);
      
      // Convert API user to frontend User type
      const user: User = {
        id: apiUser.id,
        name: apiUser.nome,
        email: apiUser.email,
        role: apiUser.tipo === 'MANAGER' ? 'manager' : 'cliente',
        cpf: apiUser.cpf
      };
      
      onLogin(user);
      setName(''); 
      setPassword('');
    } catch (error) {
      // Fallback to default users if API fails
      const validUser = validateCredentials(name.trim(), password);
      
      if (!validUser) {
        setError('Credenciais inválidas. Verifique e-mail/CPF e senha.');
        return;
      }
      
      onLogin(validUser);
      setName(''); 
      setPassword('');
    }
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
      
      {/* SEBRAE Logo Header */}
      <div className="logon-header">
        <svg className="logo-sebrae" viewBox="0 0 200 60" fill="white">
          <rect x="20" y="10" width="160" height="8" />
          <text x="100" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">SEBRAE</text>
          <rect x="20" y="42" width="160" height="8" />
        </svg>
        <div className="logon-header-text">
          Para acessar as soluções do Sebrae e parceiros, insira seu CPF ou E-mail<br/>
          cadastrados ou crie uma conta. É rapidinho!
        </div>
      </div>

      <div className="logon-wrapper">
        <div className="logon-card">
          <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <h2>Login</h2>
            <div className="field">
              <label>CPF</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
            </div>
            <div className="field">
              <label>Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div className="remember-row">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Lembre-se de mim</label>
              </div>
              <a href="#" className="forgot-link">Esqueceu sua senha?</a>
            </div>

            {error && <div style={{ color: 'crimson', marginTop: 8, marginBottom: 16 }}>{error}</div>}
            
            <div className="actions">
              <button type="submit" className="primary">Entrar</button>
            </div>
          </form>
            <div className="social-divider">
              <span>Se preferir, entre com outras contas:</span>
            </div>

            <div className="social-row">
              <div className="social-dot"><span>🔵</span></div>
              <div className="social-dot"><span>📧</span></div>
              <div className="social-dot"><span>🔗</span></div>
              <div className="social-dot"><span>📱</span></div>
              <div className="social-dot small"><span>📘</span></div>
            </div>

            <div className="register-section">
              <p>Ainda não tem uma conta Sebrae?</p>
              <a href="#" className="btn-register">Cadastre-se</a>
            </div>

            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 16, lineHeight: 1.5, textAlign: 'center' }}>
              <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}><LightBulbIcon size={16} /> <strong>Credenciais de teste:</strong></span><br/>
              Manager: <code>admin/admin123</code> ou <code>manager/manager123</code><br/>
              Cliente: <code>cliente1/cliente123</code> ou <code>joao/joao123</code>
            </div>
          </div>
      </div>

      {/* Help Bubble */}
      <div className="help-bubble">
        <div className="help-speech-bubble">
          <h4>Tem algum problema para entrar na sua conta?</h4>
          <p>Acesse a nossa página <a href="#" className="sac-link">SAC</a></p>
        </div>
        <div className="help-illustration">
          <img src="/assets/helper-girl.png" alt="Assistente" />
        </div>
      </div>
    </div>
  );
}
