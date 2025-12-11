import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { feedbacksAPI, notificacoesAPI, type Feedback, type Notificacao } from '../services/api';

interface FeedbackContextType {
  feedbacks: Feedback[];
  notifications: Notificacao[];
  unreadCount: number;
  addFeedback: (feedback: Feedback) => Promise<void>;
  markFeedbackAsRead: (feedbackId: number) => void;
  markNotificationAsRead: (notificationId: number) => Promise<void>;
  refreshFeedbacks: (userId: number) => Promise<void>;
  refreshNotifications: (userId: number) => Promise<void>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within FeedbackProvider');
  }
  return context;
}

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [notifications, setNotifications] = useState<Notificacao[]>([]);

  // Load feedbacks and notifications from API
  const refreshFeedbacks = async (userId: number) => {
    try {
      const data = await feedbacksAPI.getByUserId(userId);
      setFeedbacks(data);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      // Fallback to localStorage
      try {
        const raw = localStorage.getItem('sr_feedbacks');
        if (raw) setFeedbacks(JSON.parse(raw));
      } catch(e) {}
    }
  };

  const refreshNotifications = async (userId: number) => {
    try {
      const data = await notificacoesAPI.getByUserId(userId);
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
      // Fallback to localStorage
      try {
        const raw = localStorage.getItem('sr_notifications');
        if (raw) setNotifications(JSON.parse(raw));
      } catch(e) {}
    }
  };

  // Cleanup old read notifications every hour
  useEffect(() => {
    const cleanupInterval = setInterval(async () => {
      const userId = getCurrentUserId();
      if (userId) {
        try {
          await notificacoesAPI.cleanup(userId, 24); // Delete notifications older than 24 hours
          await refreshNotifications(userId);
        } catch (error) {
          console.error('Error cleaning up notifications:', error);
        }
      }
    }, 3600000); // Every hour

    return () => clearInterval(cleanupInterval);
  }, []);

  const addFeedback = async (feedback: Feedback) => {
    try {
      const savedFeedback = await feedbacksAPI.create(feedback);
      setFeedbacks(prev => [savedFeedback, ...prev]);
      
      // Create notification for the user
      if (feedback.userId) {
        const notification: Notificacao = {
          userId: feedback.userId,
          message: 'Você recebeu um novo feedback!',
          read: false,
          type: 'feedback',
          relatedId: savedFeedback.id
        };
        await notificacoesAPI.create(notification);
        await refreshNotifications(feedback.userId);
      }
    } catch (error) {
      console.error('Error creating feedback:', error);
      // Fallback to localStorage
      setFeedbacks(prev => {
        const updated = [feedback, ...prev];
        try {
          localStorage.setItem('sr_feedbacks', JSON.stringify(updated));
        } catch(e) {}
        return updated;
      });
    }
  };

  const markFeedbackAsRead = (feedbackId: number) => {
    setFeedbacks(prev =>
      prev.map(f => f.id === feedbackId ? { ...f, read: true } : f)
    );
  };

  const markNotificationAsRead = async (notificationId: number) => {
    try {
      await notificacoesAPI.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Fallback to local state update
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Helper to get current user ID from localStorage
  function getCurrentUserId(): number | null {
    try {
      const raw = localStorage.getItem('sr_user');
      if (raw) {
        const user = JSON.parse(raw);
        return user.id || null;
      }
    } catch(e) {}
    return null;
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        notifications,
        unreadCount,
        addFeedback,
        markFeedbackAsRead,
        markNotificationAsRead,
        refreshFeedbacks,
        refreshNotifications
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
