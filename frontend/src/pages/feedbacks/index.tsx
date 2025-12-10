import React, { useState } from 'react';
import { useFeedback } from '../../contexts/FeedbackContext';
import injectFeedbacksStyles from './styles';

injectFeedbacksStyles();

interface FeedbacksProps {
  currentUser: { name: string; role: string } | null;
  responses: any[];
}

export default function Feedbacks({ currentUser, responses }: FeedbacksProps) {
  const { getUserFeedbacks, feedbacks, markFeedbackAsRead, notifications, markNotificationAsRead } = useFeedback();
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);

  const handleFeedbackClick = (feedback: any) => {
    setSelectedFeedback(feedback);
    // Marcar como lido se for cliente e não estiver lido
    if (!currentUser?.role || currentUser.role !== 'manager') {
      if (!feedback.read) {
        markFeedbackAsRead(feedback.id);
      }
      // Marcar todas as notificações relacionadas a este feedback como lidas
      notifications
        .filter(n => n.feedbackId === feedback.id && !n.read)
        .forEach(n => markNotificationAsRead(n.id));
    }
  };

  if (!currentUser) {
    return (
      <div className="feedbacks-page">
        <div className="feedbacks-empty">
          <h2>Acesso Restrito</h2>
          <p>Você precisa estar logado para visualizar seus feedbacks.</p>
        </div>
      </div>
    );
  }

  const isManager = currentUser.role === 'manager';
  
  // Para clientes: feedbacks recebidos
  // Para managers: feedbacks enviados
  const userFeedbacks = isManager
    ? feedbacks.filter(f => f.managerId === currentUser.name)
    : getUserFeedbacks(currentUser.name);

  return (
    <div className="feedbacks-page">
      <div className="feedbacks-container">
        <h1>{isManager ? 'Feedbacks Enviados' : 'Meus Feedbacks'}</h1>
        <p className="feedbacks-subtitle">
          {isManager
            ? 'Feedbacks que você enviou para os usuários sobre suas respostas.'
            : 'Feedbacks recebidos dos gestores sobre suas respostas nos questionários.'}
        </p>

        {userFeedbacks.length === 0 ? (
          <div className="feedbacks-empty">
            <p>
              {isManager
                ? 'Você ainda não enviou nenhum feedback. Acesse a aba "Resultados" para enviar feedbacks.'
                : 'Você ainda não possui feedbacks. Responda alguns questionários para receber feedback!'}
            </p>
          </div>
        ) : (
          <div className="feedbacks-list">
            {userFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className={`feedback-card ${!feedback.read && !isManager ? 'unread' : ''}`}
                onClick={() => handleFeedbackClick(feedback)}
              >
                <div className="feedback-header">
                  <h3>{feedback.questionnaireTitle}</h3>
                  <span className="feedback-date">
                    {new Date(feedback.timestamp).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="feedback-body">
                  {isManager ? (
                    <>
                      <p className="feedback-recipient">
                        <strong>Para:</strong> {feedback.userName}
                      </p>
                      <p className="feedback-preview">{feedback.message}</p>
                    </>
                  ) : (
                    <>
                      <p className="feedback-sender">
                        <strong>De:</strong> {feedback.managerName}
                      </p>
                      <p className="feedback-preview">{feedback.message}</p>
                      {!feedback.read && <span className="new-badge">Novo</span>}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Detail Modal */}
        {selectedFeedback && (
          <>
            <div className="feedback-modal-overlay" onClick={() => setSelectedFeedback(null)} />
            <div className="feedback-modal">
              <div className="feedback-modal-header">
                <h2>{selectedFeedback.questionnaireTitle}</h2>
                <button className="modal-close-btn" onClick={() => setSelectedFeedback(null)}>×</button>
              </div>
              <div className="feedback-modal-body">
                <div className="feedback-modal-info">
                  <p><strong>{isManager ? 'Para' : 'De'}:</strong> {isManager ? selectedFeedback.userName : selectedFeedback.managerName}</p>
                  <p><strong>Data:</strong> {new Date(selectedFeedback.timestamp).toLocaleString('pt-BR')}</p>
                  <p><strong>Questionário:</strong> {selectedFeedback.questionnaireTitle}</p>
                </div>
                <div className="feedback-modal-message">
                  <h3>Feedback</h3>
                  <p>{selectedFeedback.message}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
