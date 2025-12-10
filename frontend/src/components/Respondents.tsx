import React from 'react';

export default function Respondents({ responses }: { responses: any[] }) {
  if (!responses || responses.length === 0) return <div className="sr-empty">Nenhuma resposta enviada ainda.</div>;

  return (
    <div className="sr-respondents">
      <h2>Respondentes</h2>
      <ul>
        {responses.map(r => (
          <li key={r.id}>ID: {r.id} — {Object.keys(r.answers).length} respostas</li>
        ))}
      </ul>
    </div>
  );
}
