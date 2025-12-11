import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import injectCadastroStyles from './styles';
import { usuariosAPI } from '../../services/api';

injectCadastroStyles();

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cpf: '',
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipo: 'CLIENTE' as 'CLIENTE' | 'MANAGER',
    tokenManager: '',
    genero: 'PREFIRO_NAO_DIZER' as 'MASCULINO' | 'FEMININO' | 'OUTRO' | 'PREFIRO_NAO_DIZER',
    escolaridade: 'MEDIO' as 'FUNDAMENTAL' | 'MEDIO' | 'SUPERIOR' | 'POS_GRAD' | 'MESTRADO' | 'DOUTORADO',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCPF = (cpf: string): boolean => {
    // Remove non-numeric characters
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.length === 11;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validations
    if (!formData.cpf || !validateCPF(formData.cpf)) {
      setError('CPF inválido. Digite 11 dígitos.');
      return;
    }
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    if (!formData.sobrenome.trim()) {
      setError('Sobrenome é obrigatório');
      return;
    }
    if (!formData.email || !validateEmail(formData.email)) {
      setError('E-mail inválido');
      return;
    }
    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }
    if (formData.tipo === 'MANAGER' && formData.tokenManager !== 'hjk') {
      setError('Token de manager inválido');
      return;
    }

    setLoading(true);

    try {
      const usuario = {
        cpf: formData.cpf.replace(/\D/g, ''),
        nome: formData.nome.trim(),
        sobrenome: formData.sobrenome.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        tipo: formData.tipo,
        genero: formData.genero,
        escolaridade: formData.escolaridade,
      };

      await usuariosAPI.create(usuario);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Erro ao criar usuário:', err);
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="cadastro-success">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Cadastro realizado com sucesso!</h2>
          <p>Redirecionando para o login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-split">
      <div className="cadastro-top" />
      
      {/* SEBRAE Logo Header */}
      <div className="cadastro-header">
        <img 
          src="/assets/sebrae-logo.gif" 
          alt="SEBRAE Logo" 
          className="logo-sebrae"
          style={{ maxWidth: '200px', height: 'auto', marginBottom: '20px' }}
        />
        <div className="cadastro-header-text">
          Crie sua conta SEBRAE e acesse todos os serviços disponíveis
        </div>
      </div>

      <div className="cadastro-wrapper">
        <div className="cadastro-card">
          <form onSubmit={submit}>
            <h2>Criar Conta</h2>
            
            <div className="field">
              <label>CPF *</label>
              <input 
                name="cpf"
                value={formData.cpf} 
                onChange={handleChange}
                placeholder="000.000.000-00" 
                maxLength={14}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label>Nome *</label>
                <input 
                  name="nome"
                  value={formData.nome} 
                  onChange={handleChange}
                  placeholder="Seu nome" 
                />
              </div>
              <div className="field">
                <label>Sobrenome *</label>
                <input 
                  name="sobrenome"
                  value={formData.sobrenome} 
                  onChange={handleChange}
                  placeholder="Seu sobrenome" 
                />
              </div>
            </div>

            <div className="field">
              <label>E-mail *</label>
              <input 
                name="email"
                type="email"
                value={formData.email} 
                onChange={handleChange}
                placeholder="seu.email@exemplo.com" 
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label>Senha *</label>
                <input 
                  name="senha"
                  type="password"
                  value={formData.senha} 
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres" 
                />
              </div>
              <div className="field">
                <label>Confirmar Senha *</label>
                <input 
                  name="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha} 
                  onChange={handleChange}
                  placeholder="Digite a senha novamente" 
                />
              </div>
            </div>

            <div className="field">
              <label>Tipo de Usuário *</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="CLIENTE">Cliente</option>
                <option value="MANAGER">Manager</option>
              </select>
            </div>

            {formData.tipo === 'MANAGER' && (
              <div className="field">
                <label>Token de Manager *</label>
                <input 
                  name="tokenManager"
                  type="password"
                  value={formData.tokenManager} 
                  onChange={handleChange}
                  placeholder="Digite o token de manager" 
                />
                <small style={{ display: 'block', marginTop: '4px', color: '#6b7280', fontSize: '12px' }}>
                  Token necessário para validar conta de manager
                </small>
              </div>
            )}

            <div className="field-row">
              <div className="field">
                <label>Gênero</label>
                <select name="genero" value={formData.genero} onChange={handleChange}>
                  <option value="PREFIRO_NAO_DIZER">Prefiro não dizer</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>
              <div className="field">
                <label>Escolaridade</label>
                <select name="escolaridade" value={formData.escolaridade} onChange={handleChange}>
                  <option value="FUNDAMENTAL">Ensino Fundamental</option>
                  <option value="MEDIO">Ensino Médio</option>
                  <option value="SUPERIOR">Ensino Superior</option>
                  <option value="POS_GRAD">Pós-graduação</option>
                  <option value="MESTRADO">Mestrado</option>
                  <option value="DOUTORADO">Doutorado</option>
                </select>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <div className="actions">
              <button type="submit" className="primary" disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
              <button type="button" className="secondary" onClick={() => navigate('/login')}>
                Voltar para Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Help Bubble */}
      <div className="help-bubble">
        <div className="help-speech-bubble">
          <h4>Tem alguma dúvida?</h4>
          <p>Acesse a nossa página <a href="#" className="sac-link">SAC</a></p>
        </div>
        <div className="help-illustration">
          <img src="/assets/helper-girl.png" alt="Assistente" />
        </div>
      </div>
    </div>
  );
}
