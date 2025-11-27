import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import injectQuestionarioStyles from './styles';

injectQuestionarioStyles();

export type Question = {
  id: string;
  text: string;
  type: 'text' | 'mcq';
  options?: string[];
  required?: boolean;
};

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';

function Editor({ onSave }: { onSave: (qs: Question[]) => void }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'text' | 'mcq'>('text');
  const [optionsText, setOptionsText] = useState('');
  const [required, setRequired] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  function addQuestion() {
    if (!text.trim()) return;
    if (editingId) {
      setQuestions(prev => prev.map(q => q.id === editingId ? ({ ...q, text: text.trim(), type, options: type === 'mcq' ? optionsText.split(',').map(s=>s.trim()).filter(Boolean) : undefined, required }) : q));
      setEditingId(null);
    } else {
      const q: Question = { id: String(Date.now()), text: text.trim(), type, required };
      if (type === 'mcq') q.options = optionsText.split(',').map(s => s.trim()).filter(Boolean);
      setQuestions(prev => [...prev, q]);
    }
    setText(''); setOptionsText(''); setType('text'); setRequired(false);
  }

  function editQuestion(q: Question){ setEditingId(q.id); setText(q.text); setType(q.type); setOptionsText((q.options||[]).join(',')); setRequired(!!q.required); }
  function removeQuestion(id: string){ setQuestions(prev => prev.filter(q => q.id !== id)); }

  function onDragEnd(result: DropResult){
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    if (from === to) return;
    setQuestions(prev => {
      const copy = Array.from(prev);
      const [moved] = copy.splice(from,1);
      copy.splice(to,0,moved);
      return copy;
    });
  }

  return (
    <div className="sr-editor">
      <h2>Criar questionário</h2>
      <div className="editor-wrap">
        <div className="editor-left">
          <div className="editor-top">
        <div className="field">
          <label>Título do questionário</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Pesquisa de Satisfação" />
        </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13 }}><input type="checkbox" checked={showPreview} onChange={e => setShowPreview(e.target.checked)} /> Mostrar pré-visualização</label>
          </div>
        <div className="field">
          <label>Pergunta</label>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Escreva a pergunta" />
        </div>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <div style={{ flex:1 }}>
            <label>Tipo</label>
            <select value={type} onChange={e => setType(e.target.value as any)}>
              <option value="text">Resposta curta</option>
              <option value="mcq">Múltipla escolha</option>
            </select>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <label style={{ fontSize:13 }}><input type="checkbox" checked={required} onChange={e=>setRequired(e.target.checked)} /> Obrigatória</label>
          </div>
        </div>
        {type === 'mcq' && (
          <div className="field">
            <label>Opções (separadas por vírgula)</label>
            <input value={optionsText} onChange={e => setOptionsText(e.target.value)} placeholder="Sim,Não,Talvez" />
          </div>
        )}
        <div className="actions">
          <button onClick={addQuestion} className="primary">{editingId ? 'Atualizar pergunta' : 'Adicionar pergunta'}</button>
          <button onClick={() => {
            // persist questionnaire with title to localStorage
            try{
              const qn = { id: String(Date.now()), title: title || `Questionário ${new Date().toLocaleString()}`, questions };
              const raw = localStorage.getItem('sr_questionarios');
              const arr = raw ? JSON.parse(raw) : [];
              arr.unshift(qn);
              localStorage.setItem('sr_questionarios', JSON.stringify(arr));
            }catch(e){}
            onSave(questions);
          }} className="secondary">Salvar questionário</button>
        </div>
      </div>

      <div className="questions-list">
        <h3>Perguntas atuais</h3>
        {questions.length === 0 && <p>Nenhuma pergunta adicionada ainda.</p>}
        <div className="q-cards">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions-droppable">
              {(provided: any) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questions.map((q, idx) => (
                    <Draggable key={q.id} draggableId={q.id} index={idx}>
                      {(prov: any, snap: any) => (
                        <div ref={prov.innerRef} {...prov.draggableProps} className={"q-card draggable" + (snap.isDragging ? ' dragging' : '')}>
                          <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                            <div className="drag-handle" {...prov.dragHandleProps} aria-hidden title="Arrastar para reordenar">≡</div>
                            <div style={{flex:1}}>
                              <div className="q-top"><div className="q-title">{q.text}{q.required ? <span className="req">*</span> : null}</div>
                                <div className="q-actions"><button onClick={()=>editQuestion(q)}>Editar</button><button onClick={()=>removeQuestion(q.id)}>Remover</button></div>
                              </div>
                              {q.type === 'mcq' && <div className="q-opts">{(q.options||[]).map((o,i)=>(<div key={i} className="opt">• {o}</div>))}</div>}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          </div>
        </div>
      </div>

        {showPreview && (
        <div className="editor-right">
          <div className="preview-card">
            <h3>Pré-visualização (Como ficará)</h3>
            <div className="preview-note">Esta área mostra como o questionário ficará para os respondentes. Atualize perguntas à esquerda para ver as mudanças.</div>
            {/* render live preview using current questions + in-progress question */}
            <div>
              {/** show unsaved question first if present */}
              {(((text.trim() ? [{ id: 'preview-unsaved', text: text.trim(), type, options: type === 'mcq' ? optionsText.split(',').map(s=>s.trim()).filter(Boolean) : undefined, required }] : []) as Question[]).concat(questions)).map((q, idx) => (
                <div key={q.id+String(idx)} className="q-card responder" style={{ marginBottom:10 }}>
                  <div className="q-title">{q.text}{q.required ? <span className="req">*</span> : null}</div>
                  <div className="q-body">
                    {q.type === 'text' ? (
                      <input placeholder="Sua resposta" disabled style={{ width:'100%', padding:10, borderRadius:6, border:'1px solid #e6eef8' }} />
                    ) : (
                      <div className="mcq">{(q.options||[]).map((opt,oidx)=>(<div key={oidx} className="mcq-item"><input type="radio" disabled /> <span>{opt}</span></div>))}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

type Questionnaire = { id: string; title: string; questions: Question[] };

function Responder({ questions, onSubmit }: { questions: Question[]; onSubmit: (r:any)=>void }) {
  // Load saved questionnaires from localStorage (if any)
  const loadSaved = (): Questionnaire[] => {
    try {
      const raw = localStorage.getItem('sr_questionarios');
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) return parsed;
    } catch (e) { /* ignore */ }
    return [];
  };

  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>(() => {
    const saved = loadSaved();
    return saved;
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [isResponding, setIsResponding] = useState(false);

  function setAnswer(qid: string, value: string) { setAnswers(prev => ({ ...prev, [qid]: value })); }
  function submit(){
    if (!selectedId) return;
    // clear selection UI so selection grid can reappear later
    setIsResponding(false);
    setSelectedId(null);
    onSubmit({ id: String(Date.now()), questionnaireId: selectedId, answers });
    setAnswers({});
  }

  function selectedQuestionnaire(): Questionnaire | undefined {
    if (!selectedId) return undefined;
    return questionnaires.find(q => q.id === selectedId);
  }

  function saveSelectedAsNew(title?: string){
    const sel = selectedQuestionnaire();
    if (!sel) return;
    const item: Questionnaire = { id: String(Date.now()), title: title || (`Questionário ${new Date().toLocaleString()}`), questions: sel.questions };
    const updated = [item, ...questionnaires.filter(q=>q.id !== 'draft')];
    setQuestionnaires(updated);
    try { localStorage.setItem('sr_questionarios', JSON.stringify(updated.filter(q=>q.id !== 'draft'))); } catch(e){}
    setSelectedId(item.id);
  }

  if (!questionnaires || questionnaires.length === 0) return <div className="sr-empty">Nenhum questionário disponível. Crie um na aba "Criar".</div>;

  const sel = selectedQuestionnaire();

  return (
    <div className="sr-responder">
      <h2>Responder questionário</h2>
      <div className="responder-wrap">
        {!isResponding && (
          <div className="quiz-grid">
            {questionnaires.map(q => (
              <div key={q.id} className={"quiz-card" + (q.id === selectedId ? ' selected' : '')} onClick={() => { setSelectedId(q.id); setAnswers({}); setIsResponding(true); }}>
                <div>
                  <div className="title">{q.title || 'Sem título'}</div>
                  <div className="meta">{q.questions.length} pergunta{q.questions.length !== 1 ? 's' : ''}</div>
                </div>
                <div style={{fontSize:12, opacity:0.9}}>
                  <small>ID: {q.id}</small>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={"responder-panel" + (isResponding ? ' expanded' : '')}>
          <h3>{sel?.title || 'Questionário'}</h3>
          {!sel ? (
            <div className="sr-empty">Selecione um questionário no painel à esquerda para ver as perguntas e responder.</div>
          ) : !sel.questions || sel.questions.length === 0 ? (
            <div className="sr-empty">Esse questionário não possui perguntas.</div>
          ) : (
            <form onSubmit={e=>{ e.preventDefault(); submit(); }}>
              <div style={{ marginBottom: 10 }}>
                <button type="button" className="btn-ghost" onClick={() => { setIsResponding(false); setSelectedId(null); setAnswers({}); }}>Voltar à seleção</button>
              </div>
              {sel.questions.map(q => (
                <div className="q-card responder" key={q.id} style={{ marginBottom:12 }}>
                  <div className="q-title">{q.text}{q.required ? <span className="req">*</span> : null}</div>
                  <div className="q-body">
                    {q.type === 'text' ? (
                      <input className="futuristic-input" value={answers[q.id]||''} onChange={e=>setAnswer(q.id,e.target.value)} placeholder="Sua resposta" />
                    ) : (
                      <div className="mcq">{(q.options||[]).map((opt,idx)=>(<label key={idx} className="mcq-item"><input type="radio" name={q.id} checked={answers[q.id]===opt} onChange={()=>setAnswer(q.id,opt)} /> <span>{opt}</span></label>))}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="response-actions">
                <button type="button" className="btn-ghost" onClick={()=>saveSelectedAsNew()}>Salvar como novo</button>
                <button type="submit" className="btn-neon">Enviar resposta</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Results({ questions, responses }: { questions: Question[]; responses: any[] }){
  if (!questions || questions.length === 0) return <div className="sr-empty">Nenhuma pergunta para mostrar resultados.</div>;
  function aggregate(q: Question){
    if (q.type === 'text') return responses.map(r=>r.answers[q.id]||'').filter(Boolean);
    const counts: Record<string,number> = {};
    (q.options||[]).forEach(o=>counts[o]=0);
    responses.forEach(r=>{ const v = r.answers[q.id]; if (v && counts[v] !== undefined) counts[v]++; });
    return counts;
  }
  return (
    <div className="sr-results">
      <h2>Resultados</h2>
      {questions.map(q=>{
        const agg = aggregate(q);
        return (
          <div key={q.id} className="result-item">
            <h4>{q.text}</h4>
            {q.type === 'text' ? (<ul className="text-list">{(agg as any[]).map((t:any,i:number)=>(<li key={i}>{t}</li>))}</ul>) : (<ul className="counts">{Object.entries(agg as Record<string,number>).map(([k,v])=>(<li key={k}>{k}: {v}</li>))}</ul>)}
          </div>
        );
      })}
    </div>
  );
}

function Respondents({ responses }: { responses: any[] }){
  if (!responses || responses.length === 0) return <div className="sr-empty">Nenhuma resposta enviada ainda.</div>;
  return (
    <div className="sr-respondents">
      <h2>Respondentes</h2>
      <ul>{responses.map(r=>(<li key={r.id}>ID: {r.id} — {Object.keys(r.answers).length} respostas</li>))}</ul>
    </div>
  );
}

export default function QuestionarioPage({ view, setView, questions, setQuestions, responses, addResponse }: { view: View; setView:(v:View)=>void; questions: Question[]; setQuestions:(qs:Question[])=>void; responses:any[]; addResponse:(r:any)=>void }){
  return (
    <>
      {view === 'criar' && <Editor onSave={(qs)=>{ setQuestions(qs); setView('responder'); }} />}
      {view === 'responder' && <Responder questions={questions} onSubmit={(r)=>{ addResponse(r); setView('resultados'); }} />}
      {view === 'resultados' && <Results questions={questions} responses={responses} />}
      {view === 'respondentes' && <Respondents responses={responses} />}
    </>
  );
}
