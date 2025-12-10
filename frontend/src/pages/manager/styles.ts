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

/* Motivational Banner */
.motivational-banner {
  position: relative;
  background: #e8f4f8;
  padding: 32px 80px;
  border-radius: 12px;
  margin-bottom: 32px;
  box-shadow: 0 2px 12px rgba(0, 75, 141, 0.08);
  overflow: hidden;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-theme="dark"] .motivational-banner {
  background: #2a4858;
}

.banner-content {
  flex: 1;
  text-align: center;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-quote {
  color: #004b8d;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  animation: fadeIn 0.6s ease-in-out;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

[data-theme="dark"] .banner-quote {
  color: #a8d5e2;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 75, 141, 0.1);
  border: 2px solid rgba(0, 75, 141, 0.2);
  color: #004b8d;
  font-size: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
  font-weight: 700;
}

[data-theme="dark"] .banner-arrow {
  background: rgba(168, 213, 226, 0.1);
  border-color: rgba(168, 213, 226, 0.2);
  color: #a8d5e2;
}

.banner-arrow:hover {
  background: rgba(0, 75, 141, 0.2);
  border-color: rgba(0, 75, 141, 0.3);
  transform: translateY(-50%) scale(1.1);
}

[data-theme="dark"] .banner-arrow:hover {
  background: rgba(168, 213, 226, 0.2);
  border-color: rgba(168, 213, 226, 0.3);
}

.banner-arrow-left {
  left: 16px;
}

.banner-arrow-right {
  right: 16px;
}

.banner-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.banner-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 75, 141, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

[data-theme="dark"] .banner-dot {
  background: rgba(168, 213, 226, 0.3);
}

.banner-dot.active {
  background: #004b8d;
  width: 24px;
  border-radius: 5px;
}

[data-theme="dark"] .banner-dot.active {
  background: #a8d5e2;
}

.banner-dot:hover {
  background: rgba(0, 75, 141, 0.5);
}

[data-theme="dark"] .banner-dot:hover {
  background: rgba(168, 213, 226, 0.5);
}

@media (max-width: 768px) {
  .motivational-banner {
    padding: 20px 60px;
    height: 140px;
  }
  
  .banner-quote {
    font-size: 15px;
  }
  
  .banner-arrow {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }
  
  .banner-arrow-left {
    left: 8px;
  }
  
  .banner-arrow-right {
    right: 8px;
  }
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
