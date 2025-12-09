import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import injectQuestionarioStyles from './styles';
import { EditIcon, TrashIcon, UserIcon, LightBulbIcon } from '../../components/Icons';

injectQuestionarioStyles();

export type Question = {
  id: string;
  text: string;
  type: 'text' | 'mcq';
  options?: string[];
  required?: boolean;
};

// Available cover images for questionnaires
export const COVER_IMAGES = [
  { id: 'sebrae1', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop', label: 'Negócios e Estratégia' },
  { id: 'sebrae2', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop', label: 'Trabalho em Equipe' },
  { id: 'sebrae3', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop', label: 'Reunião de Negócios' },
  { id: 'sebrae4', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=400&fit=crop', label: 'Profissional Moderno' },
  { id: 'sebrae5', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop', label: 'Colaboração' },
  { id: 'sebrae6', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop', label: 'Equipe Diversa' },
  { id: 'sebrae7', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop', label: 'Apresentação' },
  { id: 'sebrae8', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop', label: 'Empreendedorismo' },
];

type View = 'criar' | 'responder' | 'resultados' | 'respondentes';

function Editor({ onSave }: { onSave: (qs: Question[]) => void }) {
  // Check if editing existing questionnaire
  const loadEditingQuestionnaire = () => {
    try {
      const raw = localStorage.getItem('sr_editing_questionnaire');
      if (raw) {
        localStorage.removeItem('sr_editing_questionnaire');
        return JSON.parse(raw);
      }
    } catch(e) {}
    return null;
  };

  const editingQuestionnaire = loadEditingQuestionnaire();

  const [editorMode, setEditorMode] = useState<'create' | 'edit'>(editingQuestionnaire ? 'edit' : 'create');
  const [availableQuestionnaires, setAvailableQuestionnaires] = useState<Questionnaire[]>([]);
  const [selectedQuestionnaireForEdit, setSelectedQuestionnaireForEdit] = useState<string | null>(editingQuestionnaire?.id || null);
  const [showSelector, setShowSelector] = useState(!editingQuestionnaire);
  
  const [questions, setQuestions] = useState<Question[]>(editingQuestionnaire?.questions || []);
  const [text, setText] = useState('');
  const [title, setTitle] = useState(editingQuestionnaire?.title || '');
  const [coverImage, setCoverImage] = useState<string>(editingQuestionnaire?.coverImage || COVER_IMAGES[0].url);
  const [questionnaireId, setQuestionnaireId] = useState<string | null>(editingQuestionnaire?.id || null);
  const [type, setType] = useState<'text' | 'mcq'>('text');
  const [optionsText, setOptionsText] = useState('');
  const [required, setRequired] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  // Load available questionnaires on mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('sr_questionarios');
      if (raw) {
        setAvailableQuestionnaires(JSON.parse(raw));
      }
    } catch(e) {}
  }, []);

  // Handle mode change
  function handleModeChange(mode: 'create' | 'edit') {
    setEditorMode(mode);
    if (mode === 'create') {
      // Reset form for new questionnaire
      setQuestions([]);
      setTitle('');
      setCoverImage(COVER_IMAGES[0].url);
      setQuestionnaireId(null);
      setSelectedQuestionnaireForEdit(null);
      setShowSelector(true);
    }
  }

  // Start creating new questionnaire
  function startCreateNew() {
    setEditorMode('create');
    setQuestions([]);
    setTitle('');
    setCoverImage(COVER_IMAGES[0].url);
    setQuestionnaireId(null);
    setSelectedQuestionnaireForEdit(null);
    setShowSelector(false);
  }

  // Load questionnaire for editing
  function loadQuestionnaireForEdit(id: string) {
    const questionnaire = availableQuestionnaires.find(q => q.id === id);
    if (questionnaire) {
      setSelectedQuestionnaireForEdit(id);
      setQuestions(questionnaire.questions);
      setTitle(questionnaire.title);
      setCoverImage(questionnaire.coverImage || COVER_IMAGES[0].url);
      setQuestionnaireId(questionnaire.id);
      setEditorMode('edit');
      setShowSelector(false);
    }
  }

  // Delete questionnaire from editor
  function deleteQuestionnaireFromEditor(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const questionnaire = availableQuestionnaires.find(q => q.id === id);
    if (!questionnaire) return;
    
    if (!window.confirm(`Tem certeza que deseja excluir o questionário "${questionnaire.title}"?`)) return;
    
    const updated = availableQuestionnaires.filter(q => q.id !== id);
    setAvailableQuestionnaires(updated);
    try {
      localStorage.setItem('sr_questionarios', JSON.stringify(updated));
    } catch(e) {}
    
    // Reset form if deleting currently edited questionnaire
    if (selectedQuestionnaireForEdit === id) {
      handleModeChange('create');
    }
  }

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
      <h2>{editorMode === 'create' ? 'Criar Novo Questionário' : `Editando: ${title || 'Questionário'}`}</h2>
      
      {/* Visual questionnaire grid selector */}
      {showSelector && (
        <div className="editor-selector-section">
          <h3>Escolha uma opção:</h3>
          <div className="editor-questionnaire-grid">
            {/* Create new card */}
            <div 
              className="editor-q-card create-new-card"
              onClick={startCreateNew}
            >
              <div className="create-new-icon">➕</div>
              <div className="editor-q-title">Criar Novo</div>
              <div className="editor-q-meta">Criar questionário do zero</div>
            </div>
            
            {/* Existing questionnaires */}
            {availableQuestionnaires.map(q => (
              <div 
                key={q.id}
                className="editor-q-card"
                onClick={() => loadQuestionnaireForEdit(q.id)}
              >
                <div 
                  className="editor-q-image"
                  style={{ backgroundImage: `url(${q.coverImage || COVER_IMAGES[0].url})` }}
                >
                  <div className="editor-q-overlay"></div>
                </div>
                <div className="editor-q-content">
                  <div className="editor-q-title">{q.title}</div>
                  <div className="editor-q-meta">{q.questions.length} pergunta{q.questions.length !== 1 ? 's' : ''}</div>
                </div>
                <div className="editor-q-actions">
                  <button 
                    className="editor-btn-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      loadQuestionnaireForEdit(q.id);
                    }}
                    title="Editar questionário"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button 
                    className="editor-btn-delete"
                    onClick={(e) => deleteQuestionnaireFromEditor(q.id, e)}
                    title="Excluir questionário"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="editor-selection-hint">
            <p style={{display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center'}}><LightBulbIcon size={18} /> Clique em um questionário para editá-lo ou crie um novo do zero</p>
          </div>
        </div>
      )}

      {!showSelector && (
        <div className="editor-back-button-container">
          <button 
            className="editor-back-button"
            onClick={() => handleModeChange('create')}
          >
            ← Voltar para seleção
          </button>
        </div>
      )}

      {!showSelector && (
      <div className="editor-wrap">
        <div className="editor-left">
          <div className="editor-top">
        <div className="field">
          <label>Título do questionário</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Pesquisa de Satisfação" />
        </div>
        
        <div className="field">
          <label>Imagem de Capa</label>
          <div className="cover-image-selector">
            {COVER_IMAGES.map(img => (
              <div 
                key={img.id} 
                className={`cover-option ${coverImage === img.url ? 'selected' : ''}`}
                onClick={() => setCoverImage(img.url)}
                style={{ backgroundImage: `url(${img.url})` }}
                title={img.label}
              >
                {coverImage === img.url && <span className="check-icon">✓</span>}
              </div>
            ))}
          </div>
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
            // persist questionnaire with title and cover image to localStorage
            try{
              const qn = { 
                id: questionnaireId || String(Date.now()), 
                title: title || `Questionário ${new Date().toLocaleString()}`, 
                questions, 
                coverImage 
              };
              const raw = localStorage.getItem('sr_questionarios');
              const arr = raw ? JSON.parse(raw) : [];
              
              // Check if updating existing questionnaire
              const existingIndex = arr.findIndex((q: Questionnaire) => q.id === qn.id);
              if (existingIndex !== -1) {
                arr[existingIndex] = qn;
                alert('Questionário atualizado!');
              } else {
                arr.unshift(qn);
                alert('Questionário salvo!');
              }
              
              localStorage.setItem('sr_questionarios', JSON.stringify(arr));
              
              // Reset form
              setQuestions([]);
              setTitle('');
              setCoverImage(COVER_IMAGES[0].url);
              setQuestionnaireId(null);
            }catch(e){}
            onSave(questions);
          }} className="secondary">{questionnaireId ? 'Atualizar questionário' : 'Salvar questionário'}</button>
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
      )}
    </div>
  );
}

type Questionnaire = { id: string; title: string; questions: Question[]; coverImage?: string };

function Responder({ questions, onSubmit, currentUser, isManager }: { questions: Question[]; onSubmit: (r:any)=>void; currentUser?: { name: string; role: string } | null; isManager?: boolean }) {
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

  // Helper function to detect if options represent a rating scale
  function isRatingScale(options: string[]): boolean {
    // Check if options look like a rating scale (numbers, very short text, or emojis)
    return options.every(opt => {
      const trimmed = opt.trim().toLowerCase();
      return /^\d+$/.test(trimmed) || // Just numbers
             trimmed.length <= 15 || // Short labels
             /ruim|péssimo|regular|bom|ótimo|excelente|muito/i.test(trimmed); // Common rating words
    });
  }

  function setAnswer(qid: string, value: string) { setAnswers(prev => ({ ...prev, [qid]: value })); }
  
  function submit(){
    if (!selectedId) return;
    // Determine user ID - 'guest' if no user logged in
    const userId = currentUser ? currentUser.name : 'guest';
    const userName = currentUser ? currentUser.name : 'Visitante';
    
    // clear selection UI so selection grid can reappear later
    setIsResponding(false);
    setSelectedId(null);
    
    // Submit with user information
    onSubmit({ 
      id: String(Date.now()), 
      questionnaireId: selectedId, 
      answers,
      userId,
      userName,
      timestamp: new Date().toISOString()
    });
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

  function deleteQuestionnaire(id: string) {
    if (!window.confirm('Tem certeza que deseja deletar este questionário?')) return;
    const updated = questionnaires.filter(q => q.id !== id);
    setQuestionnaires(updated);
    try { localStorage.setItem('sr_questionarios', JSON.stringify(updated)); } catch(e){}
    if (selectedId === id) {
      setSelectedId(null);
      setIsResponding(false);
    }
  }

  function editQuestionnaire(id: string) {
    // Store questionnaire ID for editing and navigate to editor
    const questionnaire = questionnaires.find(q => q.id === id);
    if (questionnaire) {
      try {
        localStorage.setItem('sr_editing_questionnaire', JSON.stringify(questionnaire));
        window.location.href = '/criar';
      } catch(e){}
    }
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
              <div 
                key={q.id} 
                className={"quiz-card" + (q.id === selectedId ? ' selected' : '')}
              >
                <div 
                  className="quiz-card-image" 
                  style={{ backgroundImage: `url(${q.coverImage || COVER_IMAGES[0].url})` }}
                  onClick={() => { setSelectedId(q.id); setAnswers({}); setIsResponding(true); }}
                >
                  <div className="quiz-card-overlay"></div>
                </div>
                <div className="quiz-card-content">
                  <div className="quiz-card-main" onClick={() => { setSelectedId(q.id); setAnswers({}); setIsResponding(true); }}>
                    <div className="title">{q.title || 'Sem título'}</div>
                    <div className="meta">
                      📝 {q.questions.length} pergunta{q.questions.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  {isManager && (
                    <div className="quiz-card-actions">
                      <button 
                        className="btn-edit" 
                        onClick={(e) => { e.stopPropagation(); editQuestionnaire(q.id); }}
                        title="Editar questionário"
                      >
                        <EditIcon size={14} />
                      </button>
                      <button 
                        className="btn-delete-quiz" 
                        onClick={(e) => { e.stopPropagation(); deleteQuestionnaire(q.id); }}
                        title="Deletar questionário"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  )}
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
                <div className="q-card responder" key={q.id}>
                  <div className="q-title">{q.text}{q.required ? <span className="req">*</span> : null}</div>
                  <div className="q-body">
                    {q.type === 'text' ? (
                      <textarea 
                        className="responder-text-input" 
                        value={answers[q.id]||''} 
                        onChange={e=>setAnswer(q.id,e.target.value)} 
                        placeholder="Digite sua resposta aqui..."
                        rows={3}
                      />
                    ) : q.type === 'mcq' && (q.options||[]).length <= 5 && isRatingScale(q.options||[]) ? (
                      <div className="rating-scale">
                        {(q.options||[]).map((opt,idx)=>(
                          <div 
                            key={idx} 
                            className={`rating-option ${answers[q.id]===opt ? 'selected' : ''}`}
                            onClick={()=>setAnswer(q.id,opt)}
                          >
                            <div className="rating-circle">
                              {idx === 0 ? '😞' : idx === 1 ? '😐' : idx === 2 ? '🙂' : idx === 3 ? '😊' : '😍'}
                            </div>
                            <div className="rating-label">{opt}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mcq">
                        {(q.options||[]).map((opt,idx)=>(
                          <div key={idx} className="mcq-item">
                            <input 
                              type="radio" 
                              name={q.id} 
                              id={`${q.id}-${idx}`}
                              checked={answers[q.id]===opt} 
                              onChange={()=>setAnswer(q.id,opt)} 
                            />
                            <label htmlFor={`${q.id}-${idx}`}>{opt}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="response-actions">
                <button type="submit" className="btn-neon">Enviar resposta</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Results({ questions, responses, currentUser }: { questions: Question[]; responses: any[]; currentUser?: { name: string; role: string } | null }){
  // Load all questionnaires to show their titles
  const loadQuestionnaires = (): Questionnaire[] => {
    try {
      const raw = localStorage.getItem('sr_questionarios');
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) return parsed;
    } catch (e) { /* ignore */ }
    return [];
  };

  const questionnaires = loadQuestionnaires();

  // Filter responses by current user (only for clients viewing their own responses)
  const userResponses = currentUser && currentUser.role === 'cliente' 
    ? responses.filter(r => r.userId === currentUser.name)
    : responses;

  // Group responses by questionnaire
  const responsesByQuestionnaire: Record<string, any[]> = {};
  userResponses.forEach(r => {
    if (!responsesByQuestionnaire[r.questionnaireId]) {
      responsesByQuestionnaire[r.questionnaireId] = [];
    }
    responsesByQuestionnaire[r.questionnaireId].push(r);
  });

  const questionnaireIds = Object.keys(responsesByQuestionnaire);

  if (questionnaireIds.length === 0) {
    return <div className="sr-empty">
      {currentUser?.role === 'cliente' 
        ? 'Você ainda não respondeu nenhum questionário.' 
        : 'Nenhuma resposta enviada ainda.'}
    </div>;
  }

  return (
    <div className="sr-results">
      <h2>{currentUser?.role === 'cliente' ? 'Minhas Respostas' : 'Resultados'}</h2>
      
      {questionnaireIds.map(qId => {
        const questionnaire = questionnaires.find(q => q.id === qId);
        const qResponses = responsesByQuestionnaire[qId];
        
        if (!questionnaire) return null;

        return (
          <div key={qId} className="questionnaire-results">
            <div className="questionnaire-header">
              <h3>{questionnaire.title || 'Questionário'}</h3>
              <span className="response-count">{qResponses.length} resposta{qResponses.length !== 1 ? 's' : ''}</span>
            </div>

            {questionnaire.questions.map(q => {
              // Aggregate responses for this question
              const answersForQuestion = qResponses.map(r => r.answers[q.id]).filter(Boolean);
              
              return (
                <div key={q.id} className="result-item">
                  <h4>{q.text}</h4>
                  {q.type === 'text' ? (
                    <ul className="text-list">
                      {answersForQuestion.map((answer, i) => (
                        <li key={i}>{answer}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="counts">
                      {(() => {
                        const counts: Record<string, number> = {};
                        (q.options || []).forEach(o => counts[o] = 0);
                        answersForQuestion.forEach(answer => {
                          if (answer && counts[answer] !== undefined) counts[answer]++;
                        });
                        return Object.entries(counts).map(([option, count]) => (
                          <li key={option}>{option}: {count}</li>
                        ));
                      })()}
                    </ul>
                  )}
                </div>
              );
            })}
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
      <ul>
        {responses.map(r=>(
          <li key={r.id}>
            <strong>{r.userName || 'Anônimo'}</strong> 
            {r.userId === 'guest' && <span style={{color: 'var(--sr-teal)', fontSize: 12, marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 4}}><UserIcon size={12} /> Visitante</span>}
            {' '}— {Object.keys(r.answers).length} respostas
            {r.timestamp && <span style={{fontSize: 11, opacity: 0.7, marginLeft: 8}}>({new Date(r.timestamp).toLocaleString()})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuestionarioPage({ view, setView, questions, setQuestions, responses, addResponse, currentUser }: { view: View; setView:(v:View)=>void; questions: Question[]; setQuestions:(qs:Question[])=>void; responses:any[]; addResponse:(r:any)=>void; currentUser?: { name: string; role: string } | null }){
  const isManager = currentUser?.role === 'manager';
  
  return (
    <>
      {view === 'criar' && <Editor onSave={(qs)=>{ setQuestions(qs); setView('responder'); }} />}
      {view === 'responder' && <Responder questions={questions} onSubmit={(r)=>{ addResponse(r); }} currentUser={currentUser} isManager={isManager} />}
      {view === 'resultados' && <Results questions={questions} responses={responses} currentUser={currentUser} />}
      {view === 'respondentes' && <Respondents responses={responses} />}
    </>
  );
}
