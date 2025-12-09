import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Menu, { MenuState } from './pages/menu/index';
import QuestionarioPage from './pages/questionario/index';
import Logon from './pages/login/index';
import HomePage from './pages/home/index';
import ManagerPanel from './pages/manager/index';
import Header from './pages/shared/header/index';
import Footer from './pages/shared/footer/index';
import type { Question } from './pages/questionario/index';
import type { User } from './types/user';

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<any[]>(() => {
    try { 
      const raw = localStorage.getItem('sr_responses'); 
      return raw ? JSON.parse(raw) : [];
    } catch(e){ return []; }
  });
  const [user, setUser] = useState<User | null>(() => {
    try { const raw = localStorage.getItem('sr_user'); return raw ? JSON.parse(raw) as User : null; } catch(e){ return null; }
  });
  const [menuState, setMenuState] = useState<MenuState>('expanded');

  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location && location.pathname === '/login';
  const isManager = user?.role === 'manager';
  const isCliente = user?.role === 'cliente';

  function handleSave(qs: Question[]) {
    setQuestions(qs);
    navigate('/');
  }

  function handleSubmitResponse(resp: any) {
    setResponses(prev => {
      const updated = [resp, ...prev];
      // Persist to localStorage
      try {
        localStorage.setItem('sr_responses', JSON.stringify(updated));
      } catch(e) {}
      return updated;
    });
    // Navigate to home after submission
    navigate(user ? '/home' : '/');
  }

  function handleLogout(){ setUser(null); try{ localStorage.removeItem('sr_user'); }catch(e){} navigate('/'); }

  function cycleMenuState() {
    setMenuState(current => {
      if (current === 'expanded') return 'collapsed';
      if (current === 'collapsed') return 'hidden';
      return 'expanded';
    });
  }

  return (
    <div className="sr-app">
      {!isLogin && (
        <Header 
          subtitle="Crie e responda questionários com facilidade" 
          onLogin={() => navigate('/login')} 
          user={user} 
          onLogout={handleLogout}
          onToggleMenu={cycleMenuState}
          showMenuToggle={true}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
        {!isLogin && <Menu current={location.pathname} onChange={(p)=>navigate(p)} userRole={user?.role} menuState={menuState} />}
        <main className="sr-main" style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Logon onLogin={(u) => { setUser(u); try{ localStorage.setItem('sr_user', JSON.stringify(u)); }catch(e){} navigate(u.role === 'manager' ? '/gerenciar' : '/home'); }} />} />
            
            {/* Manager routes */}
            {isManager && (
              <>
                <Route path="/gerenciar" element={<ManagerPanel />} />
                <Route path="/criar" element={<QuestionarioPage view={'criar'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} />} />
                <Route path="/resultados" element={<QuestionarioPage view={'resultados'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} />} />
                <Route path="/respondentes" element={<QuestionarioPage view={'respondentes'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} />} />
              </>
            )}
            
            {/* Cliente routes */}
            {isCliente && (
              <>
                <Route path="/home" element={<HomePage />} />
                <Route path="/responder" element={<QuestionarioPage view={'responder'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} />} />
                <Route path="/meus-resultados" element={<QuestionarioPage view={'resultados'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} />} />
              </>
            )}
            
            {/* Guest/default routes - can access home and responder without login */}
            <Route path="/" element={user ? (isManager ? <ManagerPanel /> : <HomePage />) : <HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/responder" element={<QuestionarioPage view={'responder'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} currentUser={user} />} />
          </Routes>
        </main>
      </div>
      {!isLogin && <Footer />}
    </div>
  );
}

export default App;
