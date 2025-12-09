const css = `
.manager-panel {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}

.panel-header {
  background: linear-gradient(135deg, var(--sr-blue), var(--sr-teal));
  color: white;
  padding: 48px 40px;
  border-radius: 4px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(0, 75, 141, 0.08);
}

.panel-header h2 {
  margin: 0 0 8px 0;
  font-size: 36px;
  font-weight: 700;
  color: white;
}

.panel-header .subtitle {
  margin: 0;
  font-size: 16px;
  opacity: 0.95;
}

.manager-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.manager-section {
  background: var(--sr-surface);
  border-radius: 4px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.04);
  border: 1px solid var(--sr-border);
  transition: all 0.3s ease;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--sr-border);
}

.section-header h3 {
  margin: 0;
  font-size: 24px;
  color: var(--sr-text);
  font-weight: 600;
}

.btn-add {
  background: var(--sr-blue);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 75, 141, 0.12);
}

.btn-add:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 75, 141, 0.2);
}

.add-user-form {
  background: var(--sr-bg);
  padding: 24px;
  border-radius: 4px;
  margin-bottom: 24px;
  border: 1px solid var(--sr-border);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 150px auto;
  gap: 16px;
  align-items: end;
}

.add-user-form .field {
  margin: 0;
}

.add-user-form .field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--sr-text);
}

.add-user-form input,
.add-user-form select {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--sr-border);
  border-radius: 4px;
  font-size: 14px;
  background: var(--sr-surface);
  color: var(--sr-text);
  transition: all 0.2s ease;
}

.add-user-form input:focus,
.add-user-form select:focus {
  outline: none;
  border-color: var(--sr-blue);
  box-shadow: 0 0 0 3px rgba(0, 75, 141, 0.1);
}

.btn-save {
  background: var(--sr-teal);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.btn-save:hover {
  background: #008d84;
  transform: translateY(-1px);
}

.users-table {
  overflow-x: auto;
}

.users-table table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  text-align: left;
  padding: 14px 16px;
  background: var(--sr-bg);
  color: var(--sr-text);
  font-weight: 600;
  font-size: 14px;
  border-bottom: 2px solid var(--sr-border);
}

.users-table td {
  padding: 16px;
  border-bottom: 1px solid var(--sr-border);
  font-size: 14px;
  color: var(--sr-text-secondary);
}

.users-table tbody tr:hover {
  background: var(--sr-bg);
}

.user-name {
  font-weight: 600;
  color: var(--sr-text);
}

.user-email {
  color: var(--sr-text-secondary);
}

.user-date {
  color: var(--sr-text-secondary);
  font-size: 13px;
  opacity: 0.8;
}

.role-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
}

.role-badge.manager {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
}

.role-badge.cliente {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.btn-toggle,
.btn-delete {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 6px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-toggle:hover {
  background: rgba(0, 169, 157, 0.1);
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.1);
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: var(--sr-text-secondary);
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.stat-card {
  background: var(--sr-bg);
  border: 1px solid var(--sr-border);
  border-radius: 4px;
  padding: 28px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 75, 141, 0.06);
}

.stat-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.9;
}

.stat-value {
  font-size: 42px;
  font-weight: 700;
  color: var(--sr-blue);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--sr-text-secondary);
  font-weight: 500;
}

@media (max-width: 968px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
`;

let injected = false;
export default function injectManagerStyles() {
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles', 'manager');
  el.innerHTML = css;
  document.head.appendChild(el);
}
