import React, { useState, useEffect } from 'react';
import type { User } from '../../types/user';
import injectManagerStyles from './styles';

injectManagerStyles();

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
                          {user.role === 'manager' ? '👔 Manager' : '👤 Cliente'}
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
                          🗑️
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
            <h3>📊 Estatísticas</h3>
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
              <div className="stat-icon">👤</div>
              <div className="stat-value">{users.filter(u => u.role === 'cliente').length}</div>
              <div className="stat-label">Clientes</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
