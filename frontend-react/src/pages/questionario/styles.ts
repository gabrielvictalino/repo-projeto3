const css = `

:root{
  --sr-blue: #004b8d;
  --sr-accent: #ffd200;
  --sr-teal: #00a99d;
  --sr-bg: #f6f9fc;
  --sr-surface: #ffffff;
  --header-height: 72px;
  --footer-height: 72px;
}

.sr-app{ display:flex; flex-direction:column; min-height:100vh; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial }
.r-sans{ font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto }
.sr-main{ flex:1; padding:36px; background:linear-gradient(180deg,var(--sr-bg),#ffffff) }
.sr-editor, .sr-responder, .sr-results, .sr-respondents{ max-width:1000px; background:var(--sr-surface); padding:28px; border-radius:4px; box-shadow:0 2px 10px rgba(16,24,40,0.04); margin:20px auto; border: 1px solid rgba(18,24,40,0.03) }
.sr-editor h2, .sr-responder h2, .sr-results h2, .sr-respondents h2{ color:#1f2937; margin-top:0; font-size:20px; font-weight:600 }
.field{ margin-bottom:14px }
.field label{ display:block; font-size:13px; margin-bottom:8px; color:#374151 }
.field input[type=text], .field input, .field select{ width:100%; padding:12px 14px; border-radius:4px; border:1px solid #e6eef8; background:#ffffff; box-shadow:none }
.mcq label{ display:block; margin-bottom:8px }
.actions{ margin-top:18px; display:flex; gap:12px }
.primary{ background:var(--sr-blue); color:white; border:none; padding:12px 18px; border-radius:4px; cursor:pointer; box-shadow:0 2px 8px rgba(0,75,141,0.1); font-weight:600; transition: all 0.2s ease }
.secondary{ background:transparent; border:1px solid rgba(0,75,141,0.08); color:var(--sr-blue); padding:10px 16px; border-radius:4px; cursor:pointer; transition: all 0.2s ease }
.questions-list ol{ padding-left:18px }
.questions-list .opts{ font-size:13px; color:#6b7280 }
.q-cards{ display:flex; flex-direction:column; gap:12px }
.q-card{ border:1px solid #eef2ff; padding:14px; border-radius:4px; background:linear-gradient(180deg,#fff,#fbfdff) }
.q-card.draggable{ cursor:grab }
.q-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:12px }
.q-title{ font-weight:600; color:#0f172a }
.q-title .req{ color:#dc2626; margin-left:6px }
.q-actions button{ background:transparent; border:none; color:#2563eb; cursor:pointer; margin-left:8px }
.q-opts{ margin-top:10px; color:#374151 }
.opt{ padding:6px 0 }

.q-card.responder{ padding:18px }
.q-card.responder .q-title{ font-size:16px }
.q-card.responder .q-body{ margin-top:10px }
.mcq-item{ display:flex; align-items:center; gap:8px; padding:8px 0 }
.mcq-item input{ margin-right:8px }
.req{ color:#ef4444; margin-left:6px }

/* editor two-column preview layout */
.editor-wrap{ display:flex; gap:20px }
.editor-left{ flex:1 }
.editor-right{ width:420px; max-width:42%; min-width:280px }
.preview-card{ padding:18px; border-radius:10px; border:1px solid #eef2ff; background:linear-gradient(180deg,#ffffff,#fbfdff); box-shadow:0 8px 20px rgba(2,6,23,0.06) }
.preview-card h3{ margin-top:0; font-size:16px; color:#0f172a }
.preview-note{ font-size:13px; color:#6b7280; margin-bottom:12px }
.sr-empty{ color:#6b7280; padding:24px }
.result-item{ padding:14px 0; border-bottom:1px solid #f1f5f9 }
.counts li, .text-list li{ margin-bottom:8px }

/* Results grouped by questionnaire */
.questionnaire-results{
  background: white;
  border: 1px solid rgba(0,75,141,0.08);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(16,24,40,0.04);
}
.questionnaire-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--sr-bg);
}
.questionnaire-header h3{
  margin: 0;
  color: var(--sr-blue);
  font-size: 22px;
  font-weight: 600;
}
.response-count{
  background: var(--sr-teal);
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
}

.card-small{ background:linear-gradient(180deg,#fff,#fbfdff); padding:12px; border-radius:10px; box-shadow:0 6px 18px rgba(16,24,40,0.06) }
/* Image cover selector in editor */
.cover-image-selector{ display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-top:8px }
.cover-option{ 
  height:80px; 
  border-radius:4px; 
  background-size:cover; 
  background-position:center; 
  cursor:pointer; 
  border:2px solid transparent; 
  transition:all 0.2s ease; 
  position:relative;
  overflow:hidden;
}
.cover-option:hover{ transform:scale(1.05); border-color:var(--sr-blue) }
.cover-option.selected{ border-color:var(--sr-teal); box-shadow:0 0 0 3px rgba(0,169,157,0.2) }
.cover-option .check-icon{ 
  position:absolute; 
  top:4px; 
  right:4px; 
  background:var(--sr-teal); 
  color:white; 
  width:24px; 
  height:24px; 
  border-radius:50%; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  font-size:14px;
  font-weight:700;
}

/* futuristic responder/grid styles */
.sr-responder{ max-width:1200px; padding:28px; background:linear-gradient(180deg, rgba(3,7,18,0.02), rgba(4,6,35,0.01)); border-radius:4px; box-shadow:0 2px 8px rgba(2,6,23,0.04); }
/* layout: force side-by-side grid + panel on larger screens */
.responder-wrap{ display:flex; gap:20px; align-items:flex-start; flex-direction:row; flex-wrap:nowrap }
.quiz-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:20px; flex:1; max-height:calc(100vh - 220px); overflow:auto; padding-right:6px }

/* Modern quiz cards with images */
.quiz-card{ 
  position:relative; 
  border-radius:4px; 
  background:white; 
  border:1px solid rgba(0,75,141,0.08); 
  box-shadow:0 2px 8px rgba(16,24,40,0.04); 
  cursor:pointer; 
  transition:all 0.2s ease; 
  overflow:hidden;
  display:flex;
  flex-direction:column;
  min-height:240px;
}
.quiz-card:hover{ 
  transform:translateY(-4px); 
  box-shadow:0 8px 24px rgba(0,75,141,0.12);
  border-color:var(--sr-blue);
}
.quiz-card.selected{ 
  border-color:var(--sr-teal); 
  box-shadow:0 8px 24px rgba(0,169,157,0.2);
  transform:translateY(-4px);
}

.quiz-card-image{
  width:100%;
  height:140px;
  background-size:cover;
  background-position:center;
  position:relative;
}
.quiz-card-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(180deg, transparent 0%, rgba(0,75,141,0.4) 100%);
}
.quiz-card-content{
  padding:20px;
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}
.quiz-card .title{ 
  font-weight:700; 
  font-size:18px; 
  color:var(--sr-blue); 
  margin-bottom:8px;
  line-height:1.3;
}
.quiz-card .meta{ 
  font-size:13px; 
  color:#6b7280; 
  font-weight:500;
}

.responder-panel{ width:520px; min-width:360px; background:white; border-radius:4px; padding:24px; border:1px solid rgba(0,75,141,0.08); box-shadow:0 2px 8px rgba(16,24,40,0.04); transition: width .18s ease, min-width .18s ease; flex:0 0 420px }
.responder-panel.expanded{ width:auto; min-width:0; flex:1 1 100% }
.responder-panel h3{ color:var(--sr-blue); margin-top:0; font-size:20px }
.responder-panel .q-card{ background:var(--sr-bg); border:1px solid rgba(0,75,141,0.06); color:#1f2937 }
.futuristic-input{ width:100%; padding:12px; border-radius:4px; background:white; border:1px solid #e6eef8; color:#1f2937; transition:all 0.2s ease }
.futuristic-input:focus{ outline:none; border-color:var(--sr-blue); box-shadow:0 0 0 3px rgba(0,75,141,0.1) }
.response-actions{ display:flex; gap:8px; margin-top:14px }
.btn-ghost{ background:transparent; border:1px solid rgba(0,75,141,0.2); color:var(--sr-blue); padding:10px 16px; border-radius:4px; cursor:pointer; font-weight:600; transition:all 0.2s ease }
.btn-ghost:hover{ background:rgba(0,75,141,0.05); border-color:var(--sr-blue) }
.btn-neon{ background:var(--sr-teal); color:white; border:none; padding:10px 20px; border-radius:4px; font-weight:700; cursor:pointer; transition:all 0.2s ease }
.btn-neon:hover{ background:#008d84; transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,169,157,0.3) }

/* Manager action buttons */
.quiz-card-main{
  cursor:pointer;
}
.quiz-card-actions{
  display:flex;
  gap:8px;
  margin-top:12px;
  padding-top:12px;
  border-top:1px solid rgba(0,75,141,0.08);
}
.btn-edit, .btn-delete-quiz{
  flex:1;
  padding:8px 12px;
  border:1px solid rgba(0,75,141,0.2);
  background:white;
  border-radius:4px;
  cursor:pointer;
  font-size:14px;
  transition:all 0.2s ease;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  font-weight:600;
  color:#374151;
}
.btn-edit:hover{
  background:var(--sr-blue);
  color:white;
  border-color:var(--sr-blue);
  transform:translateY(-1px);
  box-shadow:0 4px 12px rgba(0,75,141,0.2);
}
.btn-delete-quiz:hover{
  background:#dc2626;
  color:white;
  border-color:#dc2626;
  transform:translateY(-1px);
  box-shadow:0 4px 12px rgba(220,38,38,0.2);
}

/* Editor mode selector */
.editor-mode-selector{
  display:flex;
  gap:12px;
  margin-bottom:20px;
  padding:16px;
  background:var(--sr-bg);
  border-radius:4px;
  border:1px solid rgba(0,75,141,0.08);
}
.mode-btn{
  flex:1;
  padding:12px 20px;
  border:2px solid rgba(0,75,141,0.2);
  background:white;
  border-radius:4px;
  cursor:pointer;
  font-size:15px;
  font-weight:600;
  color:#374151;
  transition:all 0.2s ease;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
}
.mode-btn:hover{
  border-color:var(--sr-blue);
  background:rgba(0,75,141,0.03);
}
.mode-btn.active{
  background:var(--sr-blue);
  color:white;
  border-color:var(--sr-blue);
  box-shadow:0 4px 12px rgba(0,75,141,0.25);
}
.questionnaire-selector{
  width:100%;
  padding:12px 14px;
  border-radius:4px;
  border:1px solid #e6eef8;
  background:white;
  font-size:14px;
  font-weight:500;
  color:#1f2937;
  cursor:pointer;
  transition:all 0.2s ease;
}
.questionnaire-selector:focus{
  outline:none;
  border-color:var(--sr-blue);
  box-shadow:0 0 0 3px rgba(0,75,141,0.1);
}

/* Visual questionnaire grid selector */
.editor-selector-section{
  margin-bottom:32px;
}
.editor-selector-section h3{
  font-size:18px;
  color:#1f2937;
  margin-bottom:20px;
  font-weight:600;
}
.editor-questionnaire-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));
  gap:20px;
  margin-bottom:16px;
}
.editor-q-card{
  position:relative;
  background:white;
  border:2px solid rgba(0,75,141,0.1);
  border-radius:4px;
  overflow:hidden;
  cursor:pointer;
  transition:all 0.3s ease;
  box-shadow:0 2px 8px rgba(16,24,40,0.04);
  min-height:200px;
  display:flex;
  flex-direction:column;
}
.editor-q-card:hover{
  transform:translateY(-6px) scale(1.02);
  box-shadow:0 12px 32px rgba(0,75,141,0.15);
  border-color:var(--sr-blue);
}
.editor-q-card:active{
  transform:translateY(-4px) scale(1.01);
}

/* Create new card */
.create-new-card{
  background:linear-gradient(135deg, var(--sr-blue) 0%, var(--sr-teal) 100%);
  border:none;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:32px;
  color:white;
}
.create-new-card:hover{
  transform:translateY(-6px) scale(1.02);
  box-shadow:0 12px 32px rgba(0,75,141,0.3);
}
.create-new-icon{
  font-size:48px;
  margin-bottom:12px;
  animation:pulse 2s ease-in-out infinite;
}
@keyframes pulse{
  0%, 100%{ transform:scale(1); }
  50%{ transform:scale(1.1); }
}
.create-new-card .editor-q-title{
  color:white;
  font-size:20px;
  margin-bottom:8px;
}
.create-new-card .editor-q-meta{
  color:rgba(255,255,255,0.9);
  text-align:center;
}

/* Existing questionnaire cards */
.editor-q-image{
  width:100%;
  height:120px;
  background-size:cover;
  background-position:center;
  position:relative;
}
.editor-q-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(180deg, transparent 0%, rgba(0,75,141,0.5) 100%);
}
.editor-q-content{
  padding:16px;
  flex:1;
}
.editor-q-title{
  font-size:16px;
  font-weight:700;
  color:var(--sr-blue);
  margin-bottom:6px;
  line-height:1.3;
}
.editor-q-meta{
  font-size:13px;
  color:#6b7280;
  font-weight:500;
}
.editor-q-actions{
  display:flex;
  gap:8px;
  padding:12px;
  border-top:1px solid rgba(0,75,141,0.08);
  background:var(--sr-bg);
}
.editor-btn-edit, .editor-btn-delete{
  flex:1;
  padding:10px;
  border:none;
  border-radius:4px;
  cursor:pointer;
  font-size:18px;
  transition:all 0.2s ease;
  background:white;
  border:1px solid rgba(0,75,141,0.15);
}
.editor-btn-edit:hover{
  background:var(--sr-blue);
  transform:scale(1.05);
  box-shadow:0 4px 12px rgba(0,75,141,0.25);
}
.editor-btn-delete:hover{
  background:#dc2626;
  transform:scale(1.05);
  box-shadow:0 4px 12px rgba(220,38,38,0.25);
}
.editor-selection-hint{
  text-align:center;
  padding:16px;
  background:var(--sr-bg);
  border-radius:4px;
  margin-top:8px;
}
.editor-selection-hint p{
  margin:0;
  color:#6b7280;
  font-size:14px;
  font-weight:500;
}

/* Back button */
.editor-back-button-container{
  margin-bottom:20px;
}
.editor-back-button{
  padding:12px 24px;
  background:white;
  border:2px solid rgba(0,75,141,0.2);
  border-radius:4px;
  color:var(--sr-blue);
  font-size:14px;
  font-weight:600;
  cursor:pointer;
  transition:all 0.2s ease;
  display:inline-flex;
  align-items:center;
  gap:8px;
}
.editor-back-button:hover{
  background:var(--sr-blue);
  color:white;
  border-color:var(--sr-blue);
  transform:translateX(-4px);
  box-shadow:0 4px 12px rgba(0,75,141,0.2);
}

`;

let injected = false;
export default function injectQuestionarioStyles(){
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles','questionario');
  el.innerHTML = css;
  document.head.appendChild(el);
}
