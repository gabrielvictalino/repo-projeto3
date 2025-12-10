const css = `

:root{
  --sr-blue: #004b8d;
  --sr-accent: #ffd200;
  --sr-teal: #00a99d;
  --sr-bg: #f6f9fc;
  --sr-surface: #ffffff;
  --sr-text: #1f2937;
  --sr-text-secondary: #6b7280;
  --sr-border: #e6eef8;
  --header-height: 72px;
  --footer-height: 72px;
}

[data-theme="dark"]{
  --sr-blue: #3b82f6;
  --sr-accent: #fbbf24;
  --sr-teal: #14b8a6;
  --sr-bg: #1a1a1a;
  --sr-surface: #2a2a2a;
  --sr-text: #e5e5e5;
  --sr-text-secondary: #a3a3a3;
  --sr-border: #404040;
}

.sr-app{ display:flex; flex-direction:column; min-height:100vh; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background: var(--sr-bg); color: var(--sr-text) }
.r-sans{ font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto }
.sr-main{ flex:1; padding:40px 24px; background:var(--sr-bg); min-height: calc(100vh - var(--header-height) - var(--footer-height)) }
.sr-editor, .sr-responder, .sr-results, .sr-respondents{ max-width:1100px; background:var(--sr-surface); padding:36px 40px; border-radius:10px; box-shadow:0 3px 15px rgba(0,75,141,0.08); margin:24px auto; border:1px solid var(--sr-border) }
.sr-editor h2, .sr-responder h2, .sr-results h2, .sr-respondents h2{ color:var(--sr-text); margin-top:0; font-size:24px; font-weight:700; margin-bottom:28px }
.field{ margin-bottom:20px }
.field label{ display:block; font-size:14px; margin-bottom:9px; color:var(--sr-text); font-weight:600 }
.field input[type=text], .field input, .field select{ width:100%; padding:13px 15px; border-radius:8px; border:1px solid var(--sr-border); background:var(--sr-surface); box-shadow:0 1px 3px rgba(0,0,0,0.04); color:var(--sr-text); font-size:15px; transition: all 0.2s ease }
.field input:focus, .field select:focus{ outline:none; border-color:var(--sr-blue); box-shadow:0 0 0 3px rgba(59,130,246,0.1) }
.mcq label{ display:block; margin-bottom:8px; color:var(--sr-text) }
.actions{ margin-top:28px; display:flex; gap:14px; padding-top:20px; border-top:1px solid var(--sr-border) }
.primary{ background:var(--sr-blue); color:white; border:none; padding:13px 26px; border-radius:8px; cursor:pointer; box-shadow:0 3px 10px rgba(0,75,141,0.15); font-weight:600; font-size:15px; transition: all 0.2s ease }
.primary:hover{ opacity:0.9; transform:translateY(-1px); box-shadow:0 5px 14px rgba(0,75,141,0.25) }
.secondary{ background:transparent; border:2px solid var(--sr-blue); color:var(--sr-blue); padding:11px 24px; border-radius:8px; cursor:pointer; font-weight:600; font-size:15px; transition: all 0.2s ease }
.secondary:hover{ background:var(--sr-border); transform:translateY(-1px) }
.questions-list ol{ padding-left:18px }
.questions-list .opts{ font-size:13px; color:var(--sr-text-secondary) }
.q-cards{ display:flex; flex-direction:column; gap:18px; margin-top:20px }
.q-card{ border:1px solid var(--sr-border); padding:22px; border-radius:10px; background:var(--sr-surface); box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:all 0.2s ease }
.q-card:hover{ box-shadow:0 4px 14px rgba(0,75,141,0.08); border-color:var(--sr-blue) }
.q-card.draggable{ cursor:grab }
.q-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:14px; margin-bottom:14px }
.q-title{ font-weight:600; color:var(--sr-text); font-size:16px }
.q-title .req{ color:#dc2626; margin-left:6px }
.q-actions{ display:flex; gap:6px }
.q-actions button{ background:transparent; border:none; color:var(--sr-blue); cursor:pointer; padding:6px 10px; border-radius:6px; transition:all 0.2s ease; font-size:20px }
.q-actions button:hover{ background:var(--sr-border) }
.q-opts{ margin-top:12px; color:var(--sr-text) }
.opt{ padding:9px 0; font-size:15px }

.q-card.responder{ 
  padding:24px; 
  padding-left:28px;
  background:var(--sr-surface); 
  border:1px solid var(--sr-border); 
  border-left:4px solid var(--sr-blue);
  margin-bottom:20px; 
  border-radius:8px; 
  transition:all 0.3s ease;
  position:relative;
}
.q-card.responder:hover{ box-shadow:0 4px 12px rgba(0,75,141,0.08); border-left-color:var(--sr-teal) }
.q-card.responder .q-title{ 
  font-size:15px; 
  color:#1f2937; 
  font-weight:600; 
  margin-bottom:16px; 
  line-height:1.6;
}
[data-theme="dark"] .q-card.responder .q-title{ 
  color:#f3f4f6;
}
.q-card.responder .q-body{ margin-top:14px }

/* Text input questions */
.responder-text-input{ 
  width:100%; 
  min-height:80px; 
  padding:14px 16px; 
  border:1px solid #d1d5db; 
  border-radius:4px; 
  background:#f3f4f6; 
  color:#1f2937; 
  font-size:14px; 
  font-weight:500;
  font-family:inherit; 
  resize:vertical; 
  transition:all 0.2s ease;
}
[data-theme="dark"] .responder-text-input{ 
  background:#374151; 
  border-color:#4b5563;
  color:#f3f4f6;
}
.responder-text-input:focus{ 
  outline:none; 
  border-color:var(--sr-blue); 
  background:white; 
  box-shadow:0 2px 8px rgba(0,75,141,0.1);
}
[data-theme="dark"] .responder-text-input:focus{ 
  background:#1f2937;
}
.responder-text-input::placeholder{ 
  color:#9ca3af; 
  font-size:13px;
}

/* Multiple choice with rounded radio buttons */
.mcq{ display:flex; flex-direction:column; gap:12px }
.mcq-item{ 
  display:flex; 
  align-items:center; 
  gap:12px; 
  padding:12px 14px; 
  border:1px solid #e5e7eb; 
  border-radius:6px; 
  transition:all 0.2s ease; 
  cursor:pointer;
  background:var(--sr-surface);
}
.mcq-item:hover{ 
  background:#f9fafb; 
  border-color:#d1d5db;
  transform:translateX(4px);
}
.mcq-item input[type="radio"]{ 
  appearance:none; 
  width:20px; 
  height:20px; 
  border:2px solid #d1d5db; 
  border-radius:50%; 
  cursor:pointer; 
  position:relative; 
  flex-shrink:0; 
  transition:all 0.2s ease;
}
.mcq-item input[type="radio"]:checked{ 
  border-color:var(--sr-blue); 
  background:var(--sr-blue);
}
.mcq-item input[type="radio"]:checked::after{ 
  content:''; 
.mcq-item label{ 
  cursor:pointer; 
  font-size:14px; 
  color:#374151; 
  font-weight:500;
  flex:1;
  user-select:none;
}
[data-theme="dark"] .mcq-item label{ 
  color:#e5e7eb;
}
.mcq-item input[type="radio"]:checked ~ label{ 
  font-weight:700; 
  color:var(--sr-blue);
} color:#374151; 
  font-weight:500;
  flex:1;
  user-select:none;
}
.mcq-item input[type="radio"]:checked ~ label{ 
  font-weight:700; 
  color:var(--sr-blue);
} color:var(--sr-blue);
}

/* Rating scale with circles */
.rating-scale{ 
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  gap:16px; 
  margin-top:20px; 
  padding:20px;
  background:#f9fafb;
  border-radius:8px;
}
.rating-option{ 
  display:flex; 
  flex-direction:column; 
  align-items:center; 
  gap:8px; 
  cursor:pointer; 
  transition:all 0.2s ease;
}
.rating-circle{ 
  width:52px; 
  height:52px; 
  border:2px solid #d1d5db; 
  border-radius:50%; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  background:white; 
  transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
  font-size:18px; 
  color:#6b7280;
  cursor:pointer;
}
.rating-label{ 
  font-size:12px; 
  color:#374151; 
  font-weight:600; 
  text-align:center; 
  max-width:80px;
}
[data-theme="dark"] .rating-label{ 
  color:#d1d5db;
}
.rating-option.selected .rating-label{ 
  color:var(--sr-blue); 
  font-weight:700;
} box-shadow:0 6px 16px rgba(0,75,141,0.3);
.rating-label{ 
  font-size:12px; 
  color:#374151; 
  font-weight:600; 
  text-align:center; 
  max-width:80px;
}
.rating-option.selected .rating-label{ 
  color:var(--sr-blue); 
  font-weight:700;
}

/* Satisfaction Scale - Horizontal Layout with Emojis */
.satisfaction-scale {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 20px;
  background: var(--sr-bg);
  border-radius: 12px;
  flex-wrap: wrap;
}

.satisfaction-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 12px;
  border-radius: 12px;
  min-width: 80px;
}

.satisfaction-option:hover {
  background: rgba(0, 75, 141, 0.05);
  transform: translateY(-4px);
}

[data-theme="dark"] .satisfaction-option:hover {
  background: rgba(59, 130, 246, 0.1);
}

.satisfaction-emoji {
  font-size: 48px;
  line-height: 1;
  transition: all 0.3s ease;
  filter: grayscale(100%);
  opacity: 0.5;
}

.satisfaction-option:hover .satisfaction-emoji {
  filter: grayscale(0%);
  opacity: 0.8;
  transform: scale(1.1);
}

.satisfaction-option.selected .satisfaction-emoji {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.2);
  animation: satisfactionPop 0.4s ease;
}

@keyframes satisfactionPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1.2); }
}

.satisfaction-label {
  font-size: 13px;
  color: var(--sr-text-secondary);
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.satisfaction-option.selected .satisfaction-label {
  color: var(--sr-blue);
  font-weight: 700;
  font-size: 14px;
}

[data-theme="dark"] .satisfaction-option.selected .satisfaction-label {
  color: var(--sr-accent);
}

@media (max-width: 768px) {
  .satisfaction-scale {
    gap: 8px;
    padding: 16px 8px;
  }
  
  .satisfaction-option {
    min-width: 60px;
    padding: 8px;
  }
  
  .satisfaction-emoji {
    font-size: 36px;
  }
  
  .satisfaction-label {
    font-size: 11px;
  }
}

.req{ color:#ef4444; margin-left:6px }

/* editor two-column preview layout */
.editor-wrap{ display:flex; gap:20px; flex-wrap: wrap }
.editor-left{ flex:1; min-width: 300px }
.editor-right{ width:420px; max-width:42%; min-width:280px }

@media (max-width: 968px) {
  .editor-wrap { flex-direction: column; }
  .editor-right { width: 100%; max-width: 100%; }
}
.preview-card{ padding:18px; border-radius:10px; border:1px solid var(--sr-border); background:var(--sr-surface); box-shadow:0 8px 20px rgba(2,6,23,0.1) }
.preview-card h3{ margin-top:0; font-size:16px; color:var(--sr-text) }
.preview-note{ font-size:13px; color:var(--sr-text-secondary); margin-bottom:12px }
.sr-empty{ color:var(--sr-text-secondary); padding:24px }
.result-item{ padding:14px 0; border-bottom:1px solid var(--sr-border) }
.counts li, .text-list li{ margin-bottom:8px }

/* Respondents - Mobile & Gamified Style */
.sr-respondents {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0;
}

.respondents-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #b3d9f2;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 75, 141, 0.12);
}

[data-theme="dark"] .respondents-header {
  background: #2a5a7a;
}

.respondents-header h2 {
  margin: 0 0 8px 0;
  color: #004b8d;
  font-size: 26px;
  font-weight: 800;
  text-shadow: none;
}

[data-theme="dark"] .respondents-header h2 {
  color: #e8f4f8;
}

.respondents-header p {
  margin: 0;
  color: #004b8d;
  font-size: 15px;
  font-weight: 500;
}

[data-theme="dark"] .respondents-header p {
  color: #e8f4f8;
}

.questionnaire-group {
  margin-bottom: 40px;
}

.questionnaire-group-header {
  --group-color: #004b8d;
  background: #b3d9f2;
  padding: 20px 24px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 75, 141, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

[data-theme="dark"] .questionnaire-group-header {
  background: #2a5a7a;
}

.questionnaire-group-header h3 {
  margin: 0;
  color: #004b8d;
  font-size: 20px;
  font-weight: 700;
  text-shadow: none;
}

[data-theme="dark"] .questionnaire-group-header h3 {
  color: #e8f4f8;
}

.respondents-count {
  background: rgba(0, 75, 141, 0.2);
  color: #004b8d;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  backdrop-filter: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] .respondents-count {
  background: rgba(232, 244, 248, 0.2);
  color: #e8f4f8;
}

.respondents-bubbles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.respondent-bubble {
  --bubble-color: #4ECDC4;
  background: white;
  border: 3px solid var(--bubble-color);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

[data-theme="dark"] .respondent-bubble {
  background: #2a2a2a;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.respondent-bubble::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--bubble-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.respondent-bubble:hover::before {
  transform: scaleX(1);
}

.respondent-bubble:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-width: 4px;
}

.respondent-avatar {
  width: 56px;
  height: 56px;
  min-width: 56px;
  background: var(--bubble-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.respondent-bubble:hover .respondent-avatar {
  transform: rotate(10deg) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.respondent-content {
  flex: 1;
  min-width: 0;
}

.respondent-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--sr-text);
  margin-bottom: 8px;
}

[data-theme="dark"] .respondent-name {
  color: #f3f4f6;
}

.respondent-stats {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.respondent-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #ffd200;
  color: #1f2937;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] .respondent-badge {
  background: #00a99d;
  color: white;
}

.guest-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #ffd200;
  color: #1f2937;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] .guest-badge {
  background: #3b82f6;
  color: white;
}

.respondent-time {
  font-size: 12px;
  color: var(--sr-text-secondary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 768px) {
  .respondents-header h2 {
    font-size: 22px;
  }
  
  .respondent-bubble {
    padding: 16px;
  }
  
  .respondent-avatar {
    width: 48px;
    height: 48px;
    min-width: 48px;
    font-size: 20px;
  }
  
  .respondent-name {
    font-size: 16px;
  }
}

/* Results grouped by questionnaire */
.questionnaire-results{
  background: var(--sr-surface);
  border: 3px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(16,24,40,0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .questionnaire-results {
  border-color: #404040;
}

.questionnaire-results.questionnaire-bubble {
  --quest-color: #4ECDC4;
  border-color: var(--quest-color);
}

.questionnaire-results.questionnaire-bubble::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--quest-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.questionnaire-results.questionnaire-bubble:hover::before {
  transform: scaleX(1);
}

.questionnaire-results:hover{
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(16,24,40,0.15);
  border-width: 4px;
}

.questionnaire-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--sr-border);
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

.card-small{ background:var(--sr-surface); padding:12px; border-radius:10px; box-shadow:0 6px 18px rgba(16,24,40,0.06); border:1px solid var(--sr-border) }
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
.quiz-grid{ 
  display:grid; 
  grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); 
  gap:20px; 
  flex:1; 
  max-height:calc(100vh - 220px); 
  overflow:auto; 
  padding-right:6px;
}

/* Modern quiz cards with images */
.quiz-card{ 
  position:relative; 
  border-radius:4px; 
  background:var(--sr-surface); 
  border:1px solid var(--sr-border); 
  box-shadow:0 2px 8px rgba(16,24,40,0.1); 
  cursor:pointer; 
  transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
  overflow:hidden;
  display:flex;
  flex-direction:column;
  min-height:240px;
  animation: cardFadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

.quiz-card:nth-child(1) { animation-delay: 0.05s; }
.quiz-card:nth-child(2) { animation-delay: 0.1s; }
.quiz-card:nth-child(3) { animation-delay: 0.15s; }
.quiz-card:nth-child(4) { animation-delay: 0.2s; }
.quiz-card:nth-child(5) { animation-delay: 0.25s; }
.quiz-card:nth-child(6) { animation-delay: 0.3s; }
.quiz-card:nth-child(7) { animation-delay: 0.35s; }
.quiz-card:nth-child(8) { animation-delay: 0.4s; }

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.quiz-card:hover{ 
  transform:translateY(-4px) scale(1.02); 
  box-shadow:0 8px 24px rgba(0,75,141,0.15);
  border-color:var(--sr-blue);
}

.quiz-card.selected{ 
  border-color:var(--sr-teal); 
  box-shadow:0 8px 24px rgba(0,169,157,0.2);
  transform:translateY(-4px) scale(1.02);
  animation: cardSelected 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes cardSelected {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.05);
  }
  100% {
    transform: translateY(-4px) scale(1.02);
  }
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
  color:var(--sr-text-secondary); 
  font-weight:500;
}

.responder-panel{ 
  width:520px; 
  min-width:360px; 
  background:var(--sr-surface); 
  border-radius:4px; 
  padding:24px; 
  border:1px solid var(--sr-border); 
  box-shadow:0 2px 8px rgba(16,24,40,0.1); 
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
  flex:0 0 420px;
  opacity: 1;
  transform: translateX(0);
}

.responder-panel.expanded{ 
  width:auto; 
  min-width:0; 
  flex:1 1 100%;
  animation: panelExpand 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes panelExpand {
  from {
    opacity: 0.7;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.responder-panel h3{ color:var(--sr-blue); margin-top:0; font-size:20px }
.responder-panel .q-card{ 
  background:var(--sr-bg); 
  border:1px solid var(--sr-border); 
  color:var(--sr-text);
  animation: questionSlideIn 0.5s ease-out;
  animation-fill-mode: both;
}

.responder-panel .q-card:nth-child(1) { animation-delay: 0.1s; }
.responder-panel .q-card:nth-child(2) { animation-delay: 0.2s; }
.responder-panel .q-card:nth-child(3) { animation-delay: 0.3s; }
.responder-panel .q-card:nth-child(4) { animation-delay: 0.4s; }
.responder-panel .q-card:nth-child(5) { animation-delay: 0.5s; }
.responder-panel .q-card:nth-child(6) { animation-delay: 0.6s; }
.responder-panel .q-card:nth-child(7) { animation-delay: 0.7s; }
.responder-panel .q-card:nth-child(8) { animation-delay: 0.8s; }

@keyframes questionSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.futuristic-input{ width:100%; padding:12px; border-radius:4px; background:var(--sr-surface); border:1px solid var(--sr-border); color:var(--sr-text); transition:all 0.2s ease }
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
  border-top:1px solid var(--sr-border);
}
.btn-edit, .btn-delete-quiz{
  flex:1;
  padding:8px 12px;
  border:1px solid var(--sr-border);
  background:var(--sr-surface);
  border-radius:4px;
  cursor:pointer;
  font-size:14px;
  transition:all 0.2s ease;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  font-weight:600;
  color:var(--sr-text);
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
  border:1px solid var(--sr-border);
}
.mode-btn{
  flex:1;
  padding:12px 20px;
  border:2px solid var(--sr-border);
  background:var(--sr-surface);
  border-radius:4px;
  cursor:pointer;
  font-size:15px;
  font-weight:600;
  color:var(--sr-text);
  transition:all 0.2s ease;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
}
.mode-btn:hover{
  border-color:var(--sr-blue);
  background:rgba(0,75,141,0.05);
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
  border:1px solid var(--sr-border);
  background:var(--sr-surface);
  font-size:14px;
  font-weight:500;
  color:var(--sr-text);
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
  color:var(--sr-text);
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
  background:var(--sr-surface);
  border:2px solid var(--sr-border);
  border-radius:4px;
  overflow:hidden;
  cursor:pointer;
  transition:all 0.3s ease;
  box-shadow:0 2px 8px rgba(16,24,40,0.1);
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
  color:var(--sr-text-secondary);
  font-weight:500;
}
.editor-q-actions{
  display:flex;
  gap:8px;
  padding:12px;
  border-top:1px solid var(--sr-border);
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
  background:var(--sr-surface);
  border:1px solid var(--sr-border);
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
  color:var(--sr-text-secondary);
  font-size:14px;
  font-weight:500;
}

/* Back button */
.editor-back-button-container{
  margin-bottom:20px;
}
.editor-back-button{
  padding:12px 24px;
  background:var(--sr-surface);
  border:2px solid var(--sr-border);
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

/* Submission Success Screen */
.submission-success {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 60px 20px;
}

.success-content {
  text-align: center;
  max-width: 600px;
  animation: successFadeIn 0.6s ease-out;
}

@keyframes successFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #d1f4e0;
  color: #059669;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: successPulse 0.8s ease-out;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.15);
}

@keyframes successPulse {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-content h2 {
  font-size: 24px;
  color: var(--sr-text);
  margin: 0 0 8px 0;
  font-weight: 600;
  line-height: 1.4;
}

.success-content p {
  font-size: 16px;
  color: var(--sr-text-secondary);
  margin: 0;
}

.view-form-link {
  display: inline-block;
  margin-top: 28px;
  padding: 12px 28px;
  background: var(--sr-blue);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 75, 141, 0.2);
}

.view-form-link:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 75, 141, 0.3);
}

/* Response Bubbles - Mobile & Gamified Style */
.responses-list {
  margin-bottom: 50px;
  padding: 0;
  background: transparent;
  border-radius: 0;
  border: none;
}

.responses-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #b3d9f2;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 75, 141, 0.12);
}

[data-theme="dark"] .responses-header {
  background: #2a5a7a;
}

.responses-header h3 {
  margin: 0 0 8px 0;
  color: #004b8d;
  font-size: 26px;
  font-weight: 800;
  text-shadow: none;
}

[data-theme="dark"] .responses-header h3 {
  color: #e8f4f8;
}

.responses-header p {
  margin: 0;
  color: #004b8d;
  font-size: 15px;
  font-weight: 500;
}

[data-theme="dark"] .responses-header p {
  color: #e8f4f8;
}

.response-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 0;
}

.response-bubble {
  --bubble-color: #4ECDC4;
  background: white;
  border: 3px solid var(--bubble-color);
  border-radius: 24px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .response-bubble {
  background: #2a2a2a;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.response-bubble::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--bubble-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.response-bubble:hover::before {
  transform: scaleX(1);
}

.response-bubble:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-width: 4px;
}

.response-bubble:active {
  transform: translateY(-2px) scale(0.98);
}

.bubble-avatar {
  width: 56px;
  height: 56px;
  min-width: 56px;
  background: var(--bubble-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.response-bubble:hover .bubble-avatar {
  transform: rotate(10deg) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.bubble-content {
  flex: 1;
  min-width: 0;
}

.bubble-user {
  font-size: 18px;
  font-weight: 700;
  color: var(--sr-text);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

[data-theme="dark"] .bubble-user {
  color: #f3f4f6;
}

.bubble-title {
  font-size: 14px;
  color: var(--sr-text-secondary);
  margin-bottom: 8px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bubble-stats {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #ffd200;
  color: #1f2937;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] .stat-badge {
  background: #00a99d;
  color: white;
}

.stat-date {
  font-size: 13px;
  color: var(--sr-text-secondary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.bubble-arrow {
  font-size: 32px;
  color: var(--bubble-color);
  font-weight: 700;
  transition: transform 0.3s ease;
  line-height: 1;
}

.response-bubble:hover .bubble-arrow {
  transform: translateX(8px);
}

@media (max-width: 768px) {
  .responses-header h3 {
    font-size: 22px;
  }
  
  .response-bubble {
    padding: 16px;
  }
  
  .bubble-avatar {
    width: 48px;
    height: 48px;
    min-width: 48px;
    font-size: 20px;
  }
  
  .bubble-user {
    font-size: 16px;
  }
  
  .bubble-title {
    font-size: 13px;
  }
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
