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
      const userId = `usr_${String(apiUser.id).padStart(3, '0')}`;
      const user: User = {
        id: userId,
        name: apiUser.nome,
        email: apiUser.email,
        role: apiUser.tipo === 'MANAGER' ? 'manager' : 'cliente',
        cpf: apiUser.cpf,
        sobrenome: apiUser.sobrenome,
        genero: apiUser.genero,
        escolaridade: apiUser.escolaridade
      };
      console.log('✅ Login via API bem-sucedido:', user);
      onLogin(user);
      setName(''); 
      setPassword('');
    } catch (error) {
      console.error('Erro no login via API, tentando validação local:', error);
      // Fallback to local validation
      const validUser = validateCredentials(name.trim(), password);
      if (!validUser) {
        setError('Credenciais inválidas. Verifique e-mail/CPF e senha.');
        return;
      }
      console.log('✅ Login local bem-sucedido:', validUser);
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
        <img 
          src="/assets/sebrae-logo.gif" 
          alt="SEBRAE Logo" 
          className="logo-sebrae"
          style={{ maxWidth: '200px', height: 'auto', marginBottom: '20px' }}
        />
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
              <label>E-mail ou CPF</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="seu.email@exemplo.com" />
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
              <a href="/cadastro" className="btn-register">Cadastre-se</a>
            </div>

            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 16, lineHeight: 1.5, textAlign: 'center' }}>
              <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}><LightBulbIcon size={16} /> <strong>Nota:</strong></span><br/>
              Para criar conta de Manager, é necessário o token: <code>hjk</code>
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
