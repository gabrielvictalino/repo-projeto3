import React, { useState, useEffect } from 'react';
import type { User } from '../../types/user';
import injectManagerStyles from './styles';
import { UserIcon, ManagerIcon, TrashIcon, ChartIcon } from '../../components/Icons';

injectManagerStyles();

const motivationalQuotes = [
  "Liderança é a capacidade de transformar visão em realidade.",
  "Um bom líder inspira as pessoas a terem confiança nele. Um grande líder inspira as pessoas a terem confiança em si mesmas.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Gerenciar é fazer as coisas certas; liderar é fazer as coisas corretas.",
  "A melhor maneira de prever o futuro é criá-lo.",
  "Feedback construtivo é a ferramenta mais poderosa de desenvolvimento.",
  "Equipes motivadas produzem resultados extraordinários.",
  "Delegação inteligente multiplica sua capacidade de realização.",
  "O reconhecimento genuíno fortalece vínculos e aumenta o engajamento.",
  "Comunicação clara evita 90% dos problemas de gestão."
];

export default function ManagerPanel() {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const raw = localStorage.getItem('sr_all_users');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'cliente' as 'manager' | 'cliente' });
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % motivationalQuotes.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sr_all_users', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  function addUser() {
    if (!newUser.name.trim()) return;
    const user: User = {
      id: String(Date.now()),
      name: newUser.name.trim(),
      email: newUser.email.trim() || undefined,
      role: newUser.role,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: 'cliente' });
    setShowAddUser(false);
  }

  function deleteUser(id: string) {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  }

  function toggleRole(id: string) {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, role: u.role === 'manager' ? 'cliente' : 'manager' } : u
    ));
  }

  return (
    <div className="manager-panel">
      <div className="panel-header">
        <h2>Painel de Gerenciamento</h2>
        <p className="subtitle">Gerencie usuários e questionários da plataforma</p>
      </div>

      {/* Faixa motivacional com carrossel */}
      <div className="motivational-banner">
        <button 
          className="banner-arrow banner-arrow-left"
          onClick={() => setCurrentQuoteIndex(prev => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length)}
          aria-label="Frase anterior"
        >
          ‹
        </button>
        
        <div className="banner-content">
          <div className="banner-quote" key={currentQuoteIndex}>
            {motivationalQuotes[currentQuoteIndex]}
          </div>
        </div>
        
        <button 
          className="banner-arrow banner-arrow-right"
          onClick={() => setCurrentQuoteIndex(prev => (prev + 1) % motivationalQuotes.length)}
          aria-label="Próxima frase"
        >
          ›
        </button>
        
        <div className="banner-dots">
          {motivationalQuotes.map((_, index) => (
            <span 
              key={index}
              className={`banner-dot ${index === currentQuoteIndex ? 'active' : ''}`}
              onClick={() => setCurrentQuoteIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="manager-sections">
        <section className="manager-section">
          <div className="section-header">
            <h3>👥 Usuários Cadastrados</h3>
            <button className="btn-add" onClick={() => setShowAddUser(!showAddUser)}>
              {showAddUser ? '✕ Cancelar' : '+ Novo Usuário'}
            </button>
          </div>

          {showAddUser && (
            <div className="add-user-form">
              <div className="form-row">
                <div className="field">
                  <label>Nome*</label>
                  <input 
                    value={newUser.name} 
                    onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome do usuário"
                  />
                </div>
                <div className="field">
                  <label>E-mail</label>
                  <input 
                    type="email"
                    value={newUser.email} 
                    onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="field">
                  <label>Tipo</label>
                  <select 
                    value={newUser.role} 
                    onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value as any }))}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <button className="btn-save" onClick={addUser}>Adicionar</button>
              </div>
            </div>
          )}

          <div className="users-table">
            {users.length === 0 ? (
              <div className="empty-state">Nenhum usuário cadastrado ainda.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Tipo</th>
                    <th>Cadastro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="user-name">{user.name}</td>
                      <td className="user-email">{user.email || '—'}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          <span style={{display: 'flex', alignItems: 'center', gap: 6}}>
                            {user.role === 'manager' ? <><ManagerIcon size={14} /> Manager</> : <><UserIcon size={14} /> Cliente</>}
                          </span>
                        </span>
                      </td>
                      <td className="user-date">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '—'}
                      </td>
                      <td className="user-actions">
                        <button 
                          className="btn-toggle" 
                          onClick={() => toggleRole(user.id)}
                          title="Alternar tipo de usuário"
                        >
                          🔄
                        </button>
                        <button 
                          className="btn-delete" 
                          onClick={() => deleteUser(user.id)}
                          title="Remover usuário"
                        >
                          <TrashIcon size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <section className="manager-section">
          <div className="section-header">
            <h3 style={{display: 'flex', alignItems: 'center', gap: 8}}><ChartIcon size={20} /> Estatísticas</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{users.length}</div>
              <div className="stat-label">Total de Usuários</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👔</div>
              <div className="stat-value">{users.filter(u => u.role === 'manager').length}</div>
              <div className="stat-label">Managers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><UserIcon size={24} /></div>
              <div className="stat-value">{users.filter(u => u.role === 'cliente').length}</div>
              <div className="stat-label">Clientes</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
