const css = `
:root{
  --sr-blue: #004b8d;
  --sr-accent: #ffd200;
  --sr-bg: #f6f9fc;
  --sr-surface: #ffffff;
  --sr-text: #1f2937;
  --sr-border: #e6eef8;
}

[data-theme="dark"]{
  --sr-blue: #3b82f6;
  --sr-accent: #fbbf24;
  --sr-bg: #1a1a1a;
  --sr-surface: #2a2a2a;
  --sr-text: #e5e5e5;
  --sr-border: #404040;
}

/* Full screen split background - half blue, half white */
.logon-split {
  min-height: 100vh;
  position: relative;
  background: white;
}

[data-theme="dark"] .logon-split {
  background: #1a1a1a;
}

/* Top half - blue with geometric pattern */
.logon-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background: #005ca9;
}

[data-theme="dark"] .logon-top {
  background: #003d73;
}

.logon-top:before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(135deg, transparent 25%, rgba(0, 39, 77, 0.4) 25%, rgba(0, 39, 77, 0.4) 50%, transparent 50%),
    linear-gradient(45deg, transparent 75%, rgba(0, 39, 77, 0.3) 75%),
    linear-gradient(135deg, transparent 25%, rgba(0, 75, 141, 0.2) 25%, rgba(0, 75, 141, 0.2) 50%, transparent 50%, transparent 75%, rgba(0, 39, 77, 0.2) 75%);
  background-size: 400px 400px, 300px 300px, 200px 200px;
  background-position: 0 0, 40px 60px, 80px 120px;
  opacity: 0.6;
}

[data-theme="dark"] .logon-top:before {
  opacity: 0.4;
}

.logon-bottom {
  display: none;
}

/* SEBRAE Logo and header text */
.logon-header {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  color: white;
}

.logon-header .logo-sebrae {
  width: 120px;
  height: auto;
  margin-bottom: 16px;
}

.logon-header-text {
  font-size: 13px;
  line-height: 1.5;
  color: white;
  max-width: 500px;
  margin: 0 auto;
}

[data-theme="dark"] .logon-header-text {
  opacity: 0.9;
}

/* White card positioned center */
.logon-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
  padding: 0 20px;
}

.logon-card {
  width: 100%;
  max-width: 480px;
  background: white;
  padding: 40px 48px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] .logon-card {
  background: #2a2a2a;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.logon-card h2 {
  color: var(--sr-blue);
  margin: 0 0 32px 0;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
}

.logon-card .field {
  margin-bottom: 20px;
}

.logon-card .field label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

[data-theme="dark"] .logon-card .field label {
  color: #b0b0b0;
}

.logon-card .field input,
.logon-card .field select {
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: white;
  color: #1f2937;
  font-size: 14px;
  transition: all 0.2s;
}

[data-theme="dark"] .logon-card .field input,
[data-theme="dark"] .logon-card .field select {
  background: #1f1f1f;
  border-color: #3a3a3a;
  color: #e0e0e0;
}

.logon-card .field input:focus,
.logon-card .field select:focus {
  outline: none;
  border-color: var(--sr-blue);
  box-shadow: 0 0 0 3px rgba(0, 75, 141, 0.1);
}

[data-theme="dark"] .logon-card .field input:focus,
[data-theme="dark"] .logon-card .field select:focus {
  border-color: #4a9eff;
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.2);
}

.logon-card .remember-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.logon-card .remember-row input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.logon-card .remember-row label {
  margin: 0;
  font-size: 13px;
  color: #666;
}

.logon-card .forgot-link {
  color: #4a9eff;
  text-decoration: none;
  font-size: 13px;
  margin-left: auto;
}

.logon-card .forgot-link:hover {
  text-decoration: underline;
}

.logon-card .actions {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.primary {
  background: var(--sr-blue);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 15px;
  width: 100%;
}

.primary:hover {
  background: #003d73;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 75, 141, 0.3);
}

[data-theme="dark"] .primary {
  background: #4a9eff;
}

[data-theme="dark"] .primary:hover {
  background: #6bb0ff;
}

/* Social login section */
.social-divider {
  margin: 24px 0;
  text-align: center;
  position: relative;
}

.social-divider:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: #e5e7eb;
}

[data-theme="dark"] .social-divider:before {
  background: #404040;
}

.social-divider span {
  background: white;
  padding: 0 16px;
  position: relative;
  font-size: 13px;
  color: #9ca3af;
}

[data-theme="dark"] .social-divider span {
  background: #2a2a2a;
  color: #707070;
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.social-dot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #e5e7eb;
}

[data-theme="dark"] .social-dot {
  background: #1f1f1f;
  border-color: #3a3a3a;
}

.social-dot:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-dot.small {
  width: 40px;
  height: 40px;
}

.social-dot span {
  font-size: 16px;
  font-weight: 700;
  color: #6b7280;
}

[data-theme="dark"] .social-dot span {
  color: #b0b0b0;
}

/* Register section */
.register-section {
  text-align: center;
  padding: 20px 0 0;
  border-top: 1px solid #e5e7eb;
}

[data-theme="dark"] .register-section {
  border-top-color: #404040;
}

.register-section p {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 12px 0;
}

[data-theme="dark"] .register-section p {
  color: #9ca3af;
}

.btn-register {
  display: inline-block;
  background: white;
  color: var(--sr-blue);
  border: 2px solid var(--sr-blue);
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-register:hover {
  background: var(--sr-blue);
  color: white;
}

[data-theme="dark"] .btn-register {
  background: transparent;
  color: #4a9eff;
  border-color: #4a9eff;
}

[data-theme="dark"] .btn-register:hover {
  background: #4a9eff;
  color: white;
}

/* Help bubble */
.help-bubble {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  z-index: 10;
}

[data-theme="dark"] .help-bubble {
  background: #2a2a2a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.help-bubble:before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
}

[data-theme="dark"] .help-bubble:before {
  border-color: transparent #2a2a2a transparent transparent;
}

.help-bubble h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #1f2937;
}

[data-theme="dark"] .help-bubble h4 {
  color: #e5e5e5;
}

.help-bubble p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

[data-theme="dark"] .help-bubble p {
  color: #9ca3af;
}

.help-bubble .sac-link {
  color: var(--sr-blue);
  font-weight: 600;
  text-decoration: none;
}

.help-bubble .sac-link:hover {
  text-decoration: underline;
}

/* Character illustration */
.character-illustration {
  position: absolute;
  bottom: 0;
  right: 40px;
  width: 200px;
  height: auto;
  z-index: 1;
}

/* Loading overlay */
.logon-loading {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #005ca9, #004b8d);
  color: white;
  z-index: 9999;
}

[data-theme="dark"] .logon-loading {
  background: linear-gradient(180deg, #003d73, #002f5c);
}

.spinner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .help-bubble,
  .character-illustration {
    display: none;
  }
}

@media (max-width: 720px) {
  .logon-card {
    padding: 32px 24px;
  }

  .logon-header {
    top: 20px;
  }

  .logon-header .logo-sebrae {
    width: 100px;
  }

  .logon-wrapper {
    padding: 0 16px;
  }
}
`;

let injected = false;
export default function injectLogonStyles(){
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles','logon');
  el.innerHTML = css;
  document.head.appendChild(el);
}
