import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import QuestionarioPage from './pages/questionario/index';
import type { View } from './pages/questionario/index';
import Logon from './pages/login/index';
import HomePage from './pages/home/index';
import ManagerPanel from './pages/manager/index';
import Perfil from './pages/perfil';
import Feedbacks from './pages/feedbacks';
import Header from './pages/shared/header/index';
import Footer from './pages/shared/footer/index';
import type { Question } from './pages/questionario/index';
import type { User } from './types/user';
import { MoonIcon, SunIcon } from './components/Icons';
import { SearchProvider } from './contexts/SearchContext';
import { FeedbackProvider } from './contexts/FeedbackContext';
import { questionariosAPI, respostasAPI } from './services/api';

// Animated wrapper component
function AnimatedRoute({ children }: { children: React.ReactNode }) {
  return (
    <div key={Math.random()} style={{ animation: 'pageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      {children}
    </div>
  );
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    try { const raw = localStorage.getItem('sr_user'); return raw ? JSON.parse(raw) as User : null; } catch(e){ return null; }
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { 
      const saved = localStorage.getItem('sr_theme'); 
      return (saved === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
    } catch(e){ return 'light'; }
  });

  // Load data from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [questData, respData] = await Promise.all([
          questionariosAPI.getAll(),
          respostasAPI.getAll()
        ]);
        setQuestionnaires(questData);
        
        console.log('=== Carregando respostas da API ===');
        console.log('Respostas da API:', respData);
        
        // Convert API responses to frontend format
        const convertedResponses = respData.map(apiResp => {
          // Convert respostas array to answers object
          const answers: Record<string, string> = {};
          apiResp.respostas.forEach((r: any) => {
            answers[r.perguntaId.toString()] = r.resposta;
          });
          
          // Convert numeric userId back to usr_XXX format
          const userIdStr = `usr_${String(apiResp.userId).padStart(3, '0')}`;
          
          const converted = {
            id: apiResp.id?.toString() || String(Date.now()),
            questionnaireId: apiResp.questionarioId.toString(),
            answers: answers,
            userId: userIdStr,
            userName: userIdStr, // TODO: buscar nome do usuário
            timestamp: apiResp.timestamp || new Date().toISOString()
          };
          
          console.log('Resposta convertida:', converted);
          return converted;
        });
        
        console.log('Total de respostas convertidas:', convertedResponses.length);
        setResponses(convertedResponses);
      } catch (error) {
        console.error('Erro ao carregar dados da API, usando localStorage:', error);
        // Fallback to localStorage
        try {
          const rawQ = localStorage.getItem('sr_questionarios');
          const rawR = localStorage.getItem('sr_responses');
          if (rawQ) setQuestionnaires(JSON.parse(rawQ));
          if (rawR) setResponses(JSON.parse(rawR));
        } catch(e) {}
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('sr_theme', theme);
    } catch(e) {}
  }, [theme]);

  function toggleTheme() {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }

  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location && location.pathname === '/login';
  const isManager = user?.role === 'manager';
  const isCliente = user?.role === 'cliente';

  function handleSave(qs: Question[]) {
    setQuestions(qs);
    navigate('/');
  }

  async function handleSubmitResponse(resp: any) {
    try {
      console.log('=== Enviando resposta do cliente ===');
      console.log('Resposta original:', resp);
      console.log('Answers:', resp.answers);
      
      // Convert frontend format to API format
      const respostasArray = Object.entries(resp.answers).map(([perguntaId, resposta]) => {
        console.log(`Pergunta ID: ${perguntaId}, Resposta: ${resposta}`);
        return {
          perguntaId: parseInt(perguntaId),
          resposta: resposta as string
        };
      });
      
      console.log('RespostasArray convertido:', respostasArray);
      
      // Extract numeric ID from user.id (e.g., "usr_004" -> 4, or direct number)
      let userId = 0;
      if (user?.id) {
        // Try to extract number from string like "usr_004" or "4"
        const match = user.id.match(/\d+/);
        userId = match ? parseInt(match[0]) : parseInt(user.id) || 0;
      } else if (resp.userId) {
        userId = parseInt(resp.userId) || 0;
      }
      
      console.log('User logado:', user);
      console.log('User ID original:', user?.id);
      console.log('User ID numérico extraído:', userId);
      
      const apiPayload = {
        userId: userId,
        questionarioId: parseInt(resp.questionnaireId),
        respostas: respostasArray,
        timestamp: resp.timestamp
      };
      
      console.log('Payload final para API:', apiPayload);
      
      // Try to submit to API
      const submitted = await respostasAPI.submit(apiPayload);
      console.log('Resposta da API:', submitted);
      
      // Reload all responses from API to ensure consistency
      console.log('✓ Resposta enviada com sucesso! Recarregando todas as respostas...');
      await reloadResponses();
      
      // Navigate to home after submission
      navigate(user ? '/home' : '/');
    } catch (error) {
      console.error('Erro ao enviar resposta para API, salvando no localStorage:', error);
      // Fallback to localStorage
      setResponses(prev => {
        const updated = [resp, ...prev];
        try {
          localStorage.setItem('sr_responses', JSON.stringify(updated));
        } catch(e) {}
        return updated;
      });
      navigate(user ? '/home' : '/');
    }
  }

  function handleLogout(){ setUser(null); try{ localStorage.removeItem('sr_user'); }catch(e){} navigate('/'); }

  // Function to reload responses from API
  async function reloadResponses() {
    try {
      console.log('=== Recarregando respostas da API ===');
      console.log('Timestamp:', new Date().toLocaleTimeString());
      const respData = await respostasAPI.getAll();
      console.log('Respostas recarregadas da API:', respData);
      console.log('Número de respostas:', respData.length);
      
      const convertedResponses = respData.map(apiResp => {
        const answers: Record<string, string> = {};
        apiResp.respostas.forEach((r: any) => {
          answers[r.perguntaId.toString()] = r.resposta;
        });
        
        // Convert numeric userId back to usr_XXX format
        const userIdStr = `usr_${String(apiResp.userId).padStart(3, '0')}`;
        
        return {
          id: apiResp.id?.toString() || String(Date.now()),
          questionnaireId: apiResp.questionarioId.toString(),
          answers: answers,
          userId: userIdStr,
          userName: userIdStr,
          timestamp: apiResp.timestamp || new Date().toISOString()
        };
      });
      console.log('Respostas convertidas no reload:', convertedResponses);
      setResponses(convertedResponses);
    } catch (error) {
      console.error('Erro ao recarregar respostas:', error);
    }
  }

  // Reload responses when user logs in or navigates to results/feedbacks
  useEffect(() => {
    if (user && (location.pathname.includes('resultados') || location.pathname.includes('feedbacks') || location.pathname.includes('respondentes'))) {
      console.log('🔄 Detectada navegação para página de respostas, recarregando...');
      console.log('Caminho atual:', location.pathname);
      reloadResponses();
    }
  }, [location.pathname, user]);

  return (
    <FeedbackProvider>
      <SearchProvider>
        <div className="sr-app">
          {!isLogin && (
            <Header 
              subtitle="Crie e responda questionários com facilidade" 
              onLogin={() => navigate('/login')} 
            user={user} 
            onLogout={handleLogout}
          />
        )}
        <main className="sr-main" style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<AnimatedRoute><Logon onLogin={(u) => { setUser(u); try{ localStorage.setItem('sr_user', JSON.stringify(u)); }catch(e){} navigate(u.role === 'manager' ? '/gerenciar' : '/home'); }} /></AnimatedRoute>} />
            
            {/* Shared routes for authenticated users */}
            {user && <Route path="/perfil" element={<AnimatedRoute><Perfil user={user} onLogout={handleLogout} /></AnimatedRoute>} />}
            {user && <Route path="/feedbacks" element={<AnimatedRoute><Feedbacks currentUser={user} responses={responses} /></AnimatedRoute>} />}
            
            {/* Manager routes */}
            {isManager && (
              <>
                <Route path="/gerenciar" element={<AnimatedRoute><ManagerPanel /></AnimatedRoute>} />
                <Route path="/criar" element={<AnimatedRoute><QuestionarioPage view={'criar'} setView={(v:View)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} questionnaires={questionnaires} /></AnimatedRoute>} />
                <Route path="/resultados" element={<AnimatedRoute><QuestionarioPage view={'resultados'} setView={(v:View)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} questionnaires={questionnaires} /></AnimatedRoute>} />
                <Route path="/respondentes" element={<AnimatedRoute><QuestionarioPage view={'respondentes'} setView={(v:View)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} questionnaires={questionnaires} /></AnimatedRoute>} />
              </>
            )}
            
            {/* Cliente routes */}
            {isCliente && (
              <>
                <Route path="/home" element={<AnimatedRoute><HomePage /></AnimatedRoute>} />
                <Route path="/responder" element={<AnimatedRoute><QuestionarioPage view={'responder'} setView={(v:View)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} questionnaires={questionnaires} /></AnimatedRoute>} />
                <Route path="/meus-resultados" element={<AnimatedRoute><QuestionarioPage view={'resultados'} setView={(v:View)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} questionnaires={questionnaires} /></AnimatedRoute>} />
              </>
            )}
            
            {/* Guest/default routes - can access home and responder without login */}
            <Route path="/" element={<AnimatedRoute>{user ? (isManager ? <ManagerPanel /> : <HomePage />) : <HomePage />}</AnimatedRoute>} />
            <Route path="/home" element={<AnimatedRoute><HomePage /></AnimatedRoute>} />
            <Route path="/responder" element={<AnimatedRoute><QuestionarioPage view={'responder'} setView={(v:View)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} questionnaires={questionnaires} /></AnimatedRoute>} />
          </Routes>
        </main>
      {!isLogin && <Footer />}
      
      {/* Floating theme toggle button */}
      <button 
        className="theme-toggle-btn"
        onClick={toggleTheme}
        title={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
        aria-label="Alternar tema"
      >
        {theme === 'light' ? <MoonIcon size={22} /> : <SunIcon size={22} />}
      </button>
        </div>
      </SearchProvider>
    </FeedbackProvider>
  );
}

export default App;
