import React from 'react';
import type { Question } from './Editor';

export default function Results({ questions, responses }: { questions: Question[]; responses: any[] }) {
  if (!questions || questions.length === 0) return <div className="sr-empty">Nenhuma pergunta para mostrar resultados.</div>;

  function aggregate(q: Question) {
    if (q.type === 'text') {
      return responses.map(r => r.answers[q.id] || '').filter(Boolean);
    }
    const counts: Record<string, number> = {};
    (q.options || []).forEach(o => counts[o] = 0);
    responses.forEach(r => {
      const v = r.answers[q.id];
      if (v && counts[v] !== undefined) counts[v]++;
    });
    return counts;
  }

  return (
    <div className="sr-results">
      <h2>Resultados</h2>
      {questions.map(q => {
        const agg = aggregate(q);
        return (
          <div key={q.id} className="result-item">
            <h4>{q.text}</h4>
            {q.type === 'text' ? (
              <ul className="text-list">{(agg as any[]).map((t:any, i:number)=>(<li key={i}>{t}</li>))}</ul>
            ) : (
              <ul className="counts">{Object.entries(agg as Record<string,number>).map(([k,v])=>(<li key={k}>{k}: {v}</li>))}</ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
