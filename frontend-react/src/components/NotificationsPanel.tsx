import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../contexts/FeedbackContext';
import type { Notification } from '../types/feedback';
import './notifications.css';

interface NotificationsPanelProps {
  userId: string;
  onClose: () => void;
}

export default function NotificationsPanel({ userId, onClose }: NotificationsPanelProps) {
  const { notifications, markNotificationAsRead } = useFeedback();
  const navigate = useNavigate();

  const userNotifications = notifications.filter((n: Notification) => n.userId === userId);

  const handleNotificationClick = (notifId: string, feedbackId?: string) => {
    markNotificationAsRead(notifId);
    if (feedbackId) {
      navigate('/feedbacks');
      onClose();
    }
  };

  return (
    <>
      <div className="notifications-overlay" onClick={onClose} />
      <div className="notifications-panel">
        <div className="notifications-header">
          <h3>Notificações</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="notifications-body">
          {userNotifications.length === 0 ? (
            <div className="notifications-empty">
              <p>Nenhuma notificação no momento</p>
            </div>
          ) : (
            <div className="notifications-list">
              {userNotifications.map((notif: Notification) => (
                <div
                  key={notif.id}
                  className={`notification-item ${!notif.read ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notif.id, notif.feedbackId)}
                >
                  <div className="notification-icon">
                    {notif.type === 'feedback' ? '💬' : '🔔'}
                  </div>
                  <div className="notification-content">
                    <h4>{notif.title}</h4>
                    <p>{notif.message}</p>
                    <span className="notification-time">
                      {new Date(notif.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  {!notif.read && <div className="unread-badge" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
