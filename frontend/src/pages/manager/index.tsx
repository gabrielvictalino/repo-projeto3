import React, { useState, useEffect } from 'react';
import type { User } from '../../types/user';
import injectManagerStyles from './styles';
import { UserIcon, ManagerIcon, TrashIcon, ChartIcon, HomeIcon, PlusIcon, DocumentIcon, UsersIcon, BellIcon } from '../../components/Icons';
import { usuariosAPI } from '../../services/api';

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

  const [dbUsers, setDbUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'cliente' as 'manager' | 'cliente' });
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Carregar usuários do banco de dados
  useEffect(() => {
    async function loadUsersFromDB() {
      try {
        const usuarios = await usuariosAPI.findAll();
        setDbUsers(usuarios);
        setTotalUsers(usuarios.length);
        setTotalManagers(usuarios.filter(u => u.tipo === 'MANAGER').length);
        setTotalClientes(usuarios.filter(u => u.tipo === 'CLIENTE').length);
      } catch (error) {
        console.error('Erro ao carregar usuários do banco:', error);
      }
    }
    loadUsersFromDB();
  }, []);

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
          <div className="section-header centered">
            <h3>📊 Bem-vindo ao Painel SEBRAE</h3>
          </div>

          <div className="welcome-content">
            <div className="welcome-card">
              <PlusIcon size={48} />
              <h4>Criar Questionários</h4>
              <p>Crie novos questionários personalizados com perguntas de múltipla escolha, escalas e textos.</p>
            </div>

            <div className="welcome-card">
              <ChartIcon size={48} />
              <h4>Ver Resultados</h4>
              <p>Analise respostas, visualize gráficos e exporte relatórios detalhados.</p>
            </div>

            <div className="welcome-card">
              <UsersIcon size={48} />
              <h4>Gerenciar Respondentes</h4>
              <p>Veja quem respondeu, acompanhe o progresso e envie lembretes.</p>
            </div>

            <div className="welcome-card">
              <DocumentIcon size={48} />
              <h4>Feedbacks Recebidos</h4>
              <p>Leia feedbacks dos usuários e responda dúvidas ou comentários.</p>
            </div>
          </div>

          <div className="instructions-section">
            <h4>📋 Como Usar a Plataforma</h4>
            <div className="instructions-grid">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Criar Questionário</h5>
                  <p>Clique em "Criar" no menu e adicione suas perguntas usando os tipos disponíveis.</p>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>Compartilhar</h5>
                  <p>Envie o link do questionário para seus clientes ou disponibilize na aba "Questionários".</p>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5>Acompanhar Respostas</h5>
                  <p>Acesse "Respondentes" para ver quem já respondeu e "Resultados" para análises.</p>
                </div>
              </div>
              <div className="instruction-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h5>Receber Feedback</h5>
                  <p>Veja os feedbacks deixados pelos usuários na aba "Feedbacks" e responda quando necessário.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sebrae-info">
            <img src="/assets/sebrae-logo.gif" alt="SEBRAE" style={{ height: '60px', marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
              O SEBRAE apoia o empreendedorismo brasileiro oferecendo ferramentas e soluções que impulsionam 
              pequenas e médias empresas. Utilize esta plataforma para fortalecer a conexão com seus clientes.
            </p>
          </div>
        </section>

        <section className="manager-section">
          <div className="section-header">
            <h3 style={{display: 'flex', alignItems: 'center', gap: 8}}><ChartIcon size={20} /> Estatísticas de Usuários</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{totalUsers}</div>
              <div className="stat-label">Total de Usuários</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👔</div>
              <div className="stat-value">{totalManagers}</div>
              <div className="stat-label">Managers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><UserIcon size={24} /></div>
              <div className="stat-value">{totalClientes}</div>
              <div className="stat-label">Clientes</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
