import React from 'react';
import Editor, { Question } from '../components/Editor';
import Responder from '../components/Responder';
import Results from '../components/Results';
import Respondents from '../components/Respondents';

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';

export default function QuestionarioPage({
  view,
  setView,
  questions,
  setQuestions,
  responses,
  addResponse,
}: {
  view: View;
  setView: (v: View) => void;
  questions: Question[];
  setQuestions: (qs: Question[]) => void;
  responses: any[];
  addResponse: (r: any) => void;
}) {
  return (
    <>
      {view === 'criar' && <Editor onSave={(qs) => { setQuestions(qs); setView('responder'); }} />}
      {view === 'responder' && <Responder questions={questions} onSubmit={(r) => { addResponse(r); setView('resultados'); }} />}
      {view === 'resultados' && <Results questions={questions} responses={responses} />}
      {view === 'respondentes' && <Respondents responses={responses} />}
    </>
  );
}
