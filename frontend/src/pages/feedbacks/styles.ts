const css = `

.feedbacks-page {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 24px;
}

.feedbacks-container {
  background: var(--sr-surface);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 75, 141, 0.08);
  border: 1px solid var(--sr-border);
}

.feedbacks-container h1 {
  color: var(--sr-text);
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
}

.feedbacks-subtitle {
  color: var(--sr-text-secondary);
  font-size: 15px;
  margin: 0 0 32px 0;
}

.feedbacks-empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--sr-text-secondary);
}

.feedbacks-empty h2 {
  color: var(--sr-text);
  margin: 0 0 12px 0;
  font-size: 24px;
}

.feedbacks-empty p {
  font-size: 16px;
  margin: 0;
}

.feedbacks-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feedback-card {
  background: var(--sr-surface);
  border: 1px solid var(--sr-border);
  border-radius: 10px;
  padding: 24px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.feedback-card:hover {
  box-shadow: 0 4px 14px rgba(0, 75, 141, 0.08);
  border-color: var(--sr-blue);
  transform: translateY(-2px);
}

.feedback-card.unread {
  border-left: 4px solid #3b82f6;
  background: rgba(59, 130, 246, 0.03);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--sr-border);
}

.feedback-header h3 {
  color: var(--sr-text);
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.feedback-date {
  color: var(--sr-text-secondary);
  font-size: 14px;
}

.feedback-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feedback-status {
  color: var(--sr-text);
  font-size: 15px;
  margin: 0;
  font-weight: 500;
}

.status-pending {
  color: #f59e0b;
  font-weight: 600;
}

.status-completed {
  color: #10b981;
  font-weight: 600;
}

.feedback-info {
  color: var(--sr-text-secondary);
  font-size: 14px;
  margin: 0;
}

.feedback-sender,
.feedback-recipient {
  color: var(--sr-text);
  font-size: 14px;
  margin: 0 0 8px 0;
}

.feedback-preview {
  color: var(--sr-text-secondary);
  font-size: 14px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.new-badge {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 8px;
}

/* Feedback Modal */
.feedback-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  animation: fadeIn 0.3s ease-out;
}

.feedback-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  background: var(--sr-surface);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 10001;
  display: flex;
  flex-direction: column;
  animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.feedback-modal-header {
  padding: 24px 28px;
  border-bottom: 1px solid var(--sr-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.feedback-modal-header h2 {
  margin: 0;
  color: var(--sr-text);
  font-size: 20px;
  font-weight: 600;
}

.modal-close-btn {
  background: transparent;
  border: none;
  font-size: 32px;
  color: var(--sr-text-secondary);
  cursor: pointer;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  line-height: 1;
  flex-shrink: 0;
}

.modal-close-btn:hover {
  background: var(--sr-border);
  color: var(--sr-text);
  transform: rotate(90deg);
}

.feedback-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
}

.feedback-modal-info {
  background: var(--sr-bg);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.feedback-modal-info p {
  margin: 8px 0;
  color: var(--sr-text);
  font-size: 14px;
}

.feedback-modal-info strong {
  color: var(--sr-text-secondary);
  font-weight: 600;
}

.feedback-modal-message {
  padding-top: 16px;
  border-top: 1px solid var(--sr-border);
}

.feedback-modal-message h3 {
  margin: 0 0 16px 0;
  color: var(--sr-blue);
  font-size: 16px;
  font-weight: 600;
}

.feedback-modal-message p {
  margin: 0;
  color: var(--sr-text);
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-wrap;
}

/* Dark mode adjustments */
[data-theme="dark"] .feedback-card {
  background: #2a2a2a;
}

[data-theme="dark"] .feedback-card:hover {
  background: #333333;
}

/* Responsive */
@media (max-width: 768px) {
  .feedbacks-container {
    padding: 24px 20px;
  }

  .feedback-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

`;

let injected = false;
export default function injectFeedbacksStyles() {
  if (injected) return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-styles', 'feedbacks');
  el.innerHTML = css;
  document.head.appendChild(el);
}
