import React, { useState } from 'react';
import type { Question } from './Editor';

export default function Responder({ questions, onSubmit }: { questions: Question[]; onSubmit: (resp: any) => void }) {
  const [answers, setAnswers] = useState<Record<string,string>>({});

  function setAnswer(qid: string, value: string) {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  }

  function submit() {
    const payload = { id: String(Date.now()), answers };
    onSubmit(payload);
    setAnswers({});
  }

  if (!questions || questions.length === 0) return <div className="sr-empty">Nenhum questionário disponível. Crie um na aba "Criar".</div>;

  return (
    <div className="sr-responder">
      <h2>Responder questionário</h2>
      <form onSubmit={e => { e.preventDefault(); submit(); }}>
        {questions.map(q => (
          <div className="field" key={q.id}>
            <label>{q.text}</label>
            {q.type === 'text' && (
              <input value={answers[q.id] || ''} onChange={e => setAnswer(q.id, e.target.value)} />
            )}
            {q.type === 'mcq' && (
              <div className="mcq">
                {(q.options || []).map((opt, idx) => (
                  <label key={idx}><input type="radio" name={q.id} checked={answers[q.id]===opt} onChange={() => setAnswer(q.id, opt)} /> {opt}</label>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="actions">
          <button type="submit" className="primary">Enviar resposta</button>
        </div>
      </form>
    </div>
  );
}
