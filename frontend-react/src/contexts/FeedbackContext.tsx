import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Feedback, Notification } from '../types/feedback';

interface FeedbackContextType {
  feedbacks: Feedback[];
  notifications: Notification[];
  addFeedback: (feedback: Omit<Feedback, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markFeedbackAsRead: (feedbackId: string) => void;
  getUnreadCount: (userId: string) => number;
  getUserFeedbacks: (userId: string) => Feedback[];
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    try {
      const raw = localStorage.getItem('sr_feedbacks');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const raw = localStorage.getItem('sr_notifications');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Clean up old read notifications (older than 24 hours)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      setNotifications(prev => 
        prev.filter(notif => {
          // Keep unread notifications
          if (!notif.read) return true;
          
          // Remove read notifications older than 24 hours
          const notifTime = new Date(notif.timestamp).getTime();
          return (now - notifTime) < twentyFourHours;
        })
      );
    }, 60 * 60 * 1000); // Check every hour

    // Run cleanup on mount
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    setNotifications(prev => 
      prev.filter(notif => {
        if (!notif.read) return true;
        const notifTime = new Date(notif.timestamp).getTime();
        return (now - notifTime) < twentyFourHours;
      })
    );

    return () => clearInterval(cleanupInterval);
  }, []);

  // Save to localStorage whenever feedbacks or notifications change
  useEffect(() => {
    try {
      localStorage.setItem('sr_feedbacks', JSON.stringify(feedbacks));
    } catch (e) {
      console.error('Error saving feedbacks:', e);
    }
  }, [feedbacks]);

  useEffect(() => {
    try {
      localStorage.setItem('sr_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error('Error saving notifications:', e);
    }
  }, [notifications]);

  const addFeedback = (feedbackData: Omit<Feedback, 'id' | 'timestamp' | 'read'>) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `feedback_${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setFeedbacks(prev => [newFeedback, ...prev]);

    // Create notification for the user
    const newNotification: Notification = {
      id: `notif_${Date.now()}`,
      type: 'feedback',
      title: 'Novo Feedback Recebido',
      message: `${feedbackData.managerName} enviou feedback sobre "${feedbackData.questionnaireTitle}"`,
      feedbackId: newFeedback.id,
      timestamp: new Date().toISOString(),
      read: false,
      userId: feedbackData.userId,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markFeedbackAsRead = (feedbackId: string) => {
    setFeedbacks(prev =>
      prev.map(feedback =>
        feedback.id === feedbackId ? { ...feedback, read: true } : feedback
      )
    );
  };

  const getUnreadCount = (userId: string) => {
    return notifications.filter(n => n.userId === userId && !n.read).length;
  };

  const getUserFeedbacks = (userId: string) => {
    return feedbacks.filter(f => f.userId === userId);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        notifications,
        addFeedback,
        markNotificationAsRead,
        markFeedbackAsRead,
        getUnreadCount,
        getUserFeedbacks,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}
