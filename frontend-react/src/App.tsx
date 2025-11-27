import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Menu from './pages/menu/index';
import QuestionarioPage from './pages/questionario/index';
import Logon from './pages/login/index';
import Header from './pages/shared/header/index';
import Footer from './pages/shared/footer/index';
import type { Question } from './pages/questionario/index';

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';
type User = { name: string; token?: string } | null;

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [user, setUser] = useState<User>(() => {
    try { const raw = localStorage.getItem('sr_user'); return raw ? JSON.parse(raw) as User : null; } catch(e){ return null; }
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location && location.pathname === '/login';

  function handleSave(qs: Question[]) {
    setQuestions(qs);
    navigate('/');
  }

  function handleSubmitResponse(resp: any) {
    setResponses(prev => [resp, ...prev]);
    navigate('/resultados');
  }

  function handleLogout(){ setUser(null); try{ localStorage.removeItem('sr_user'); }catch(e){} navigate('/'); }

  return (
    <div className="sr-app">
      {!isLogin && (
        <Header subtitle="Crie e responda questionários com facilidade" onLogin={() => navigate('/login')} user={user} onLogout={handleLogout} />
      )}
      <div style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
        {!isLogin && <Menu current={''} onChange={(p)=>navigate(p)} />}
        <main className="sr-main" style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Logon onLogin={(u) => { setUser(u); try{ localStorage.setItem('sr_user', JSON.stringify(u)); }catch(e){} navigate('/'); }} />} />
            <Route path="/criar" element={<QuestionarioPage view={'criar'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} />} />
            <Route path="/resultados" element={<QuestionarioPage view={'resultados'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} />} />
            <Route path="/respondentes" element={<QuestionarioPage view={'respondentes'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} />} />
            <Route path="/" element={<QuestionarioPage view={'responder'} setView={(v)=>navigate(v)} questions={questions} setQuestions={setQuestions} responses={responses} addResponse={handleSubmitResponse} />} />
          </Routes>
        </main>
      </div>
      {!isLogin && <Footer />}
    </div>
  );
}

export default App;
