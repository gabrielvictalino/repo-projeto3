import React from 'react';
import '../styles/error-notification.css';

interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
}

export default function ErrorNotification({ message, onClose }: ErrorNotificationProps) {
  return (
    <div className="error-notification-overlay" onClick={onClose}>
      <div className="error-notification-content" onClick={(e) => e.stopPropagation()}>
        <div className="error-speech-bubble">
          <button className="error-close-btn" onClick={onClose}>×</button>
          <h4>⚠️ Atenção!</h4>
          <p>{message}</p>
        </div>
        <div className="error-illustration">
          <img src="/assets/helper-girl.png" alt="Assistente" />
        </div>
      </div>
    </div>
  );
}
