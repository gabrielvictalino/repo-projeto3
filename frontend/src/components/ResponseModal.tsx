import React, { useState } from 'react';
import { useFeedback } from '../contexts/FeedbackContext';
import './response-modal.css';

interface ResponseModalProps {
  response: any;
  questionnaire: any;
  onClose: () => void;
  currentUser: { name: string; role: string } | null;
}

export default function ResponseModal({ response, questionnaire, onClose, currentUser }: ResponseModalProps) {
  const { addFeedback } = useFeedback();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [sending, setSending] = useState(false);

  const isManager = currentUser?.role === 'manager';

  const handleSendFeedback = () => {
    if (!feedbackMessage.trim() || !currentUser) return;

    setSending(true);

    setTimeout(() => {
      addFeedback({
        questionnaireId: response.questionnaireId,
        questionnaireTitle: questionnaire?.title || 'Questionário',
        responseId: response.id,
        userId: response.userId,
        userName: response.userName,
        managerId: currentUser.name,
        managerName: currentUser.name,
        message: feedbackMessage,
      });

      setSending(false);
      setFeedbackMessage('');
      setShowFeedbackForm(false);
      
      // Show success message
      alert('Feedback enviado com sucesso! O usuário receberá uma notificação.');
    }, 500);
  };

  return (
    <>
      <div className="response-modal-overlay" onClick={onClose} />
      <div className="response-modal">
        <div className="response-modal-header">
          <div>
            <h2>Resposta de {response.userName}</h2>
            <p className="response-meta">
              {new Date(response.timestamp).toLocaleDateString('pt-BR')} às{' '}
              {new Date(response.timestamp).toLocaleTimeString('pt-BR')}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="response-modal-body">
          <h3>{questionnaire?.title || 'Questionário'}</h3>
          
          <div className="answers-list">
            {questionnaire?.questions?.map((question: any, index: number) => {
              const answer = response.answers[question.id];
              return (
                <div key={question.id} className="answer-item">
                  <div className="answer-question">
                    <span className="answer-number">{index + 1}.</span>
                    <span>{question.text}</span>
                  </div>
                  <div className="answer-response">
                    {answer || <span className="answer-empty">Não respondido</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {isManager && (
            <div className="feedback-section">
              {!showFeedbackForm ? (
                <button 
                  className="btn-send-feedback"
                  onClick={() => setShowFeedbackForm(true)}
                >
                  📝 Enviar Feedback para {response.userName}
                </button>
              ) : (
                <div className="feedback-form">
                  <h4>Enviar Feedback</h4>
                  <textarea
                    className="feedback-textarea"
                    placeholder="Escreva seu feedback sobre as respostas..."
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    rows={5}
                  />
                  <div className="feedback-actions">
                    <button 
                      className="btn-cancel"
                      onClick={() => {
                        setShowFeedbackForm(false);
                        setFeedbackMessage('');
                      }}
                    >
                      Cancelar
                    </button>
                    <button 
                      className="btn-submit"
                      onClick={handleSendFeedback}
                      disabled={!feedbackMessage.trim() || sending}
                    >
                      {sending ? 'Enviando...' : 'Enviar Feedback'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
