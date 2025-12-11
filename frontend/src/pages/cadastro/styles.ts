const css = `
/* Cadastro Page Styles - Based on Login Page */
.cadastro-split {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #004b8d 0%, #0066b3 50%, #00a99d 100%);
  position: relative;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

[data-theme="dark"] .cadastro-split {
  background: linear-gradient(135deg, #1a2332 0%, #0a1628 50%, #0d1f2d 100%);
}

.cadastro-top {
  height: 40px;
  background: rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

[data-theme="dark"] .cadastro-top {
  background: rgba(0,0,0,0.3);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

/* Header Section */
.cadastro-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px 20px;
  color: white;
  text-align: center;
}

.cadastro-header .logo-sebrae {
  filter: brightness(1.1);
}

.cadastro-header-text {
  font-size: 15px;
  line-height: 1.5;
  opacity: 0.95;
  max-width: 500px;
  font-weight: 500;
}

/* Main Wrapper */
.cadastro-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  flex: 1;
}

/* Card */
.cadastro-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 600px;
  padding: 40px;
  animation: fadeIn 0.5s ease;
}

[data-theme="dark"] .cadastro-card {
  background: #2a2a2a;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.cadastro-card h2 {
  margin: 0 0 30px 0;
  color: #004b8d;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}

[data-theme="dark"] .cadastro-card h2 {
  color: #4a9eff;
}

/* Form Fields */
.cadastro-card .field {
  margin-bottom: 20px;
  flex: 1;
}

.cadastro-card .field-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.cadastro-card .field label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
}

[data-theme="dark"] .cadastro-card .field label {
  color: #e5e5e5;
}

.cadastro-card .field input,
.cadastro-card .field select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e3e8ee;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  box-sizing: border-box;
  font-family: inherit;
}

.cadastro-card .field input:focus,
.cadastro-card .field select:focus {
  border-color: #004b8d;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,75,141,0.1);
}

[data-theme="dark"] .cadastro-card .field input:focus,
[data-theme="dark"] .cadastro-card .field select:focus {
  border-color: #4a9eff;
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.2);
}

.cadastro-card .field select {
  cursor: pointer;
  background-color: white;
}

[data-theme="dark"] .cadastro-card .field input,
[data-theme="dark"] .cadastro-card .field select {
  background: #1a1a1a;
  border-color: #404040;
  color: #e5e5e5;
}

/* Error Message */
.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
}

[data-theme="dark"] .error-message {
  background: #3d1a1a;
  border-color: #7f1d1d;
  color: #fca5a5;
}

/* Actions */
.cadastro-card .actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.cadastro-card button {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}

.cadastro-card button.primary {
  background: linear-gradient(120deg, #004b8d 0%, #0066b3 100%);
  color: white;
}

.cadastro-card button.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,75,141,0.3);
}

.cadastro-card button.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cadastro-card button.secondary {
  background: white;
  color: #004b8d;
  border: 2px solid #004b8d;
}

.cadastro-card button.secondary:hover {
  background: #f6f9fc;
}

[data-theme="dark"] .cadastro-card button.secondary {
  background: transparent;
  color: #4a9eff;
  border-color: #4a9eff;
}

[data-theme="dark"] .cadastro-card button.secondary:hover {
  background: rgba(74, 158, 255, 0.1);
}

/* Success Screen */
.cadastro-success {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #004b8d 0%, #0066b3 50%, #00a99d 100%);
}

.success-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  padding: 60px 40px;
  text-align: center;
  max-width: 500px;
  animation: fadeIn 0.5s ease;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(120deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.success-card h2 {
  color: #004b8d;
  font-size: 24px;
  margin: 0 0 12px 0;
  font-weight: 700;
}

[data-theme="dark"] .success-card h2 {
  color: #4a9eff;
}

.success-card p {
  color: #6b7280;
  font-size: 16px;
  margin: 0;
}

[data-theme="dark"] .success-card p {
  color: #9ca3af;
}

[data-theme="dark"] .success-card {
  background: #2a2a2a;
}

/* Help Bubble */
.help-bubble {
  position: fixed;
  bottom: 0;
  right: -120px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
  z-index: 1000;
}

.help-speech-bubble {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  max-width: 240px;
  position: relative;
  margin-bottom: 10px;
  margin-right: 150px;
  z-index: 2;
}

.help-speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 60px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 0;
  border-color: white transparent transparent transparent;
}

.help-speech-bubble h4 {
  margin: 0 0 8px 0;
  color: #004b8d;
  font-size: 14px;
  font-weight: 700;
}

[data-theme="dark"] .help-speech-bubble {
  background: #2a2a2a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

[data-theme="dark"] .help-speech-bubble h4 {
  color: #4a9eff;
}

.help-speech-bubble p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

[data-theme="dark"] .help-speech-bubble p {
  color: #9ca3af;
}

[data-theme="dark"] .help-speech-bubble::after {
  border-color: #2a2a2a transparent transparent transparent;
}

.sac-link {
  color: #004b8d;
  font-weight: 600;
  text-decoration: none;
}

.sac-link:hover {
  text-decoration: underline;
}

.help-illustration {
  width: 350px;
  height: 400px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin-right: 0;
}

.help-illustration img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 75, 141, 0.15));
}

/* Responsive */
@media (max-width: 768px) {
  .cadastro-card {
    padding: 30px 24px;
    margin: 10px;
  }

  .cadastro-card .field-row {
    flex-direction: column;
    gap: 0;
  }

  .cadastro-card .actions {
    flex-direction: column;
  }

  .help-bubble {
    bottom: 20px;
    right: 20px;
  }

  .help-speech-bubble {
    max-width: 200px;
    padding: 12px 16px;
  }

  .help-illustration {
    width: 60px;
    height: 60px;
  }
}
`;

let injected = false;
export default function injectCadastroStyles() {
  if (injected) return;
  injected = true;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
