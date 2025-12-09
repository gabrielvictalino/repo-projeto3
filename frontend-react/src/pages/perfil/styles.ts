const css = `
.perfil-page {
  min-height: 100vh;
  background: #f0f2f5;
}

[data-theme="dark"] .perfil-page {
  background: #1a1a1a;
}

.perfil-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

/* Back Button */
.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border: 2px solid var(--sr-blue);
  border-radius: 4px;
  color: var(--sr-blue);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 32px;
}

[data-theme="dark"] .btn-back {
  background: #2a2a2a;
  border-color: #4a9eff;
  color: #4a9eff;
}

.btn-back:hover {
  background: var(--sr-blue);
  color: white;
}

[data-theme="dark"] .btn-back:hover {
  background: #4a9eff;
  color: #1a1a1a;
}

/* Content Layout */
.perfil-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
  align-items: start;
}

/* Sidebar */
.perfil-sidebar {
  background: white;
  border: 1px solid #d1d5db;
  border-right: none;
  padding: 0;
}

[data-theme="dark"] .perfil-sidebar {
  background: #2a2a2a;
  border-color: #3a3a3a;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.sidebar-item {
  padding: 16px 20px;
  background: white;
  border: none;
  border-bottom: 1px solid #d1d5db;
  color: var(--sr-blue);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

[data-theme="dark"] .sidebar-item {
  background: #2a2a2a;
  border-bottom-color: #3a3a3a;
  color: #b0b0b0;
}

.sidebar-item:hover {
  background: #f9fafb;
}

[data-theme="dark"] .sidebar-item:hover {
  background: #353535;
  color: #4a9eff;
}

.sidebar-item.active {
  background: var(--sr-blue);
  color: white;
}

[data-theme="dark"] .sidebar-item.active {
  background: #4a9eff;
  color: white;
  font-weight: 700;
}

/* Main Content */
.perfil-main {
  background: white;
  border: 1px solid #d1d5db;
  padding: 40px;
  min-height: 600px;
}

[data-theme="dark"] .perfil-main {
  background: #2a2a2a;
  border-color: #3a3a3a;
}

.perfil-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--sr-blue);
  margin-bottom: 32px;
}

[data-theme="dark"] .perfil-title {
  color: #4a9eff;
}

/* Cards */
.perfil-card {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06);
  position: relative;
}

[data-theme="dark"] .perfil-card {
  background: #242424;
  border-color: #3a3a3a;
  box-shadow: 0 4px 12px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4);
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

[data-theme="dark"] .card-title {
  color: #e0e0e0;
  border-bottom-color: #3a3a3a;
}

.card-content-wrapper {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* Form Grid */
.form-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
  text-transform: none;
}

[data-theme="dark"] .form-group label {
  color: #a0a0a0;
}

.form-group .required {
  color: #4b5563;
  font-weight: 400;
  font-size: 12px;
  margin-left: 0;
}

[data-theme="dark"] .form-group .required {
  color: #a0a0a0;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background: white;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

[data-theme="dark"] .form-group input,
[data-theme="dark"] .form-group select {
  background: #1f1f1f;
  border-color: #3a3a3a;
  color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--sr-blue);
  box-shadow: 0 0 0 3px rgba(0,75,141,0.15), 0 2px 6px rgba(0,0,0,0.15);
}

[data-theme="dark"] .form-group input:focus,
[data-theme="dark"] .form-group select:focus {
  border-color: #4a9eff;
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.25), 0 3px 8px rgba(0,0,0,0.5);
  background: #1a1a1a;
}

.form-group input::placeholder {
  color: #9ca3af;
  font-style: italic;
}

[data-theme="dark"] .form-group input::placeholder {
  color: #606060;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.avatar-preview {
  width: 110px;
  height: 110px;
  border-radius: 8px;
  background: linear-gradient(135deg, #8b7355 0%, #6b5d52 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border: 3px solid #f0f2f5;
}

[data-theme="dark"] .avatar-preview {
  border-color: #1f1f1f;
  box-shadow: 0 2px 8px rgba(0,0,0,0.6);
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  color: white;
  opacity: 0.9;
  font-size: 48px;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-choose-avatar {
  padding: 8px 20px;
  background: var(--sr-blue);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
}

[data-theme="dark"] .btn-choose-avatar {
  background: #4a9eff;
  color: white;
}

.btn-choose-avatar:hover {
  background: #004b8d;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,75,141,0.3);
}

[data-theme="dark"] .btn-choose-avatar:hover {
  background: #6bb0ff;
  box-shadow: 0 2px 6px rgba(74,158,255,0.4);
}

/* Save Section */
.save-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-save {
  padding: 12px 32px;
  background: var(--sr-blue);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

[data-theme="dark"] .btn-save {
  background: #4a9eff;
  color: white;
}

.btn-save:hover {
  background: #004b8d;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,75,141,0.3);
}

[data-theme="dark"] .btn-save:hover {
  background: #6bb0ff;
  box-shadow: 0 4px 12px rgba(74,158,255,0.4);
}

/* Responsive */
@media (max-width: 1024px) {
  .perfil-content {
    grid-template-columns: 1fr;
  }

  .perfil-sidebar {
    border-right: 1px solid #d1d5db;
    border-bottom: none;
  }

  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
  }

  .sidebar-item {
    border-right: 1px solid #d1d5db;
    border-bottom: none;
    white-space: nowrap;
  }

  .card-content-wrapper {
    flex-direction: column;
  }

  .avatar-section {
    align-self: center;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .perfil-container {
    padding: 16px;
  }

  .perfil-main {
    padding: 24px 20px;
  }

  .perfil-card {
    padding: 20px;
  }

  .card-content-wrapper {
    flex-direction: column;
  }

  .avatar-section {
    align-self: center;
  }
}
`;

export default function injectPerfilStyles() {
  const id = 'perfil-styles';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }
}
