import React, { useState } from 'react';

export type Question = {
  id: string;
  text: string;
  type: 'text' | 'mcq';
  options?: string[];
};

export default function Editor({ onSave }: { onSave: (qs: Question[]) => void }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [text, setText] = useState('');
  const [type, setType] = useState<'text' | 'mcq'>('text');
  const [optionsText, setOptionsText] = useState('');

  function addQuestion() {
    if (!text.trim()) return;
    const q: Question = { id: String(Date.now()), text: text.trim(), type };
    if (type === 'mcq') {
      q.options = optionsText.split(',').map(s => s.trim()).filter(Boolean);
    }
    setQuestions(prev => [...prev, q]);
    setText(''); setOptionsText(''); setType('text');
  }

  return (
    <div className="sr-editor">
      <h2>Criar questionário</h2>
      <div className="field">
        <label>Pergunta</label>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Escreva a pergunta" />
      </div>
      <div className="field">
        <label>Tipo</label>
        <select value={type} onChange={e => setType(e.target.value as any)}>
          <option value="text">Texto</option>
          <option value="mcq">Múltipla escolha</option>
        </select>
      </div>
      {type === 'mcq' && (
        <div className="field">
          <label>Opções (separadas por vírgula)</label>
          <input value={optionsText} onChange={e => setOptionsText(e.target.value)} placeholder="Sim,Não,Talvez" />
        </div>
      )}
      <div className="actions">
        <button onClick={addQuestion} className="primary">Adicionar pergunta</button>
        <button onClick={() => onSave(questions)} className="secondary">Salvar questionário</button>
      </div>

      <div className="questions-list">
        <h3>Perguntas atuais</h3>
        {questions.length === 0 && <p>Nenhuma pergunta adicionada ainda.</p>}
        <ol>
          {questions.map(q => (
            <li key={q.id}>{q.text} <small>({q.type})</small>
              {q.type === 'mcq' && <div className="opts">{(q.options||[]).join(' • ')}</div>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
