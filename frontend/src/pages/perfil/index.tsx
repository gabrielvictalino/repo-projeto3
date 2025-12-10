import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/user';
import injectPerfilStyles from './styles';
import ErrorNotification from '../../components/ErrorNotification';

injectPerfilStyles();

interface UserProfile {
  cpf: string;
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: string;
  education: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  neighborhood: string;
  number: string;
  complement: string;
  avatarUrl?: string;
}

interface PerfilProps {
  user: User | null;
  onLogout?: () => void;
}

export default function Perfil({ user, onLogout }: PerfilProps) {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<UserProfile>({
    cpf: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    gender: '',
    education: '',
    cep: '',
    address: '',
    city: '',
    state: '',
    neighborhood: '',
    number: '',
    complement: '',
    avatarUrl: user?.avatarUrl || ''
  });

  const [activeSection, setActiveSection] = useState<string>('external-accounts');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setProfile(prev => ({ ...prev, avatarUrl }));
        
        // Atualizar o avatar no user global
        if (user) {
          const updatedUser = { ...user, avatarUrl };
          // Salvar no localStorage
          try {
            localStorage.setItem('sr_user', JSON.stringify(updatedUser));
          } catch(e) {}
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  const handleSave = () => {
    // Validar campos obrigatórios
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      setErrorMessage('Por favor, preencha seu nome completo antes de salvar o perfil.');
      return;
    }
    
    if (!profile.cpf.trim()) {
      setErrorMessage('O campo CPF é obrigatório para salvar seu perfil.');
      return;
    }
    
    if (!profile.birthDate) {
      setErrorMessage('Por favor, informe sua data de nascimento.');
      return;
    }

    // Atualizar o user com os dados do perfil
    if (user) {
      const updatedUser = { ...user, avatarUrl: profile.avatarUrl };
      try {
        localStorage.setItem('sr_user', JSON.stringify(updatedUser));
        // Recarregar a página para atualizar o header
        window.location.reload();
      } catch(e) {
        console.error('Erro ao salvar perfil:', e);
        setErrorMessage('Ocorreu um erro ao salvar seu perfil. Tente novamente.');
        return;
      }
    }
    alert('Perfil salvo com sucesso!');
  };

  return (
    <div className="perfil-page">
      {errorMessage && (
        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
      <div className="perfil-container">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar
        </button>

        <div className="perfil-content">
          <aside className="perfil-sidebar">
            <nav className="sidebar-nav">
              <button 
                className={`sidebar-item ${activeSection === 'external-accounts' ? 'active' : ''}`}
                onClick={() => setActiveSection('external-accounts')}
              >
                Contas externas
              </button>
              <button 
                className={`sidebar-item ${activeSection === 'consents' ? 'active' : ''}`}
                onClick={() => setActiveSection('consents')}
              >
                Consentimentos
              </button>
              <button 
                className={`sidebar-item ${activeSection === 'sessions' ? 'active' : ''}`}
                onClick={() => setActiveSection('sessions')}
              >
                Sessões
              </button>
              <button 
                className={`sidebar-item ${activeSection === 'dependents' ? 'active' : ''}`}
                onClick={() => setActiveSection('dependents')}
              >
                Meus dependentes
              </button>
              <button 
                className={`sidebar-item ${activeSection === 'surveys' ? 'active' : ''}`}
                onClick={() => setActiveSection('surveys')}
              >
                Pesquisas realizadas
              </button>
            </nav>
          </aside>

          <main className="perfil-main">
            <h1 className="perfil-title">Meu perfil</h1>

            <div className="perfil-card">
              <h2 className="card-title">Dados Pessoais</h2>
              
              <div className="card-content-wrapper">
                <div className="form-grid">
                  <div className="form-group">
                    <label>CPF</label>
                    <input 
                      type="text" 
                      value={profile.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      placeholder=""
                    />
                  </div>

                  <div className="form-group">
                    <label>Data de nascimento</label>
                    <input 
                      type="date" 
                      value={profile.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Primeiro nome <span className="required">Obrigatório</span></label>
                    <input 
                      type="text" 
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Obrigatório"
                    />
                  </div>

                  <div className="form-group">
                    <label>Sobrenome <span className="required">Obrigatório</span></label>
                    <input 
                      type="text" 
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Obrigatório"
                    />
                  </div>

                  <div className="form-group">
                    <label>Gênero</label>
                    <select 
                      value={profile.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                      <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Escolaridade</label>
                    <select 
                      value={profile.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="fundamental">Ensino Fundamental</option>
                      <option value="medio">Ensino Médio</option>
                      <option value="superior">Ensino Superior</option>
                      <option value="pos">Pós-graduação</option>
                      <option value="mestrado">Mestrado</option>
                      <option value="doutorado">Doutorado</option>
                    </select>
                  </div>
                </div>

                <div className="avatar-section">
                  <div className="avatar-preview">
                    {profile.avatarUrl ? (
                      <img src={profile.avatarUrl} alt="Avatar" />
                    ) : (
                      <div className="avatar-placeholder">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                          <path d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4C18.4772 4 14 8.47715 14 14C14 19.5228 18.4772 24 24 24Z" fill="currentColor" opacity="0.3"/>
                          <path d="M24 28C13.5066 28 5 33.3726 5 40C5 42.2091 6.79086 44 9 44H39C41.2091 44 43 42.2091 43 40C43 33.3726 34.4934 28 24 28Z" fill="currentColor" opacity="0.3"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <label className="btn-choose-avatar">
                    Escolher
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="perfil-card">
              <h2 className="card-title">Dados de Contato</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>CEP</label>
                  <input 
                    type="text" 
                    value={profile.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                  />
                </div>

                <div className="form-group">
                  <label>Endereço</label>
                  <input 
                    type="text" 
                    value={profile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Cidade</label>
                  <input 
                    type="text" 
                    value={profile.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Estado</label>
                  <select 
                    value={profile.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Bairro</label>
                  <input 
                    type="text" 
                    value={profile.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Número</label>
                  <input 
                    type="text" 
                    value={profile.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label>Complemento</label>
                  <input 
                    type="text" 
                    value={profile.complement}
                    onChange={(e) => handleInputChange('complement', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="save-section">
              <button className="btn-save" onClick={handleSave}>
                Salvar
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
