import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Feedback, Notification } from '../types/feedback';
import { feedbacksAPI, notificacoesAPI, respostasAPI, questionariosAPI } from '../services/api';

interface FeedbackContextType {
  feedbacks: Feedback[];
  notifications: Notification[];
  addFeedback: (feedback: Omit<Feedback, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  markFeedbackAsRead: (feedbackId: string) => Promise<void>;
  getUnreadCount: (userId: string) => number;
  getUserFeedbacks: (userId: string) => Feedback[];
  refreshFeedbacks: (userId: number) => Promise<void>;
  refreshNotifications: (userId: number) => Promise<void>;
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
    const cleanupInterval = setInterval(async () => {
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      // Try API cleanup for each user's old notifications
      const userIds = Array.from(new Set(notifications.map(n => parseInt(n.userId))));
      for (const userId of userIds) {
        try {
          await notificacoesAPI.cleanup(userId, 24);
        } catch (error) {
          console.error('Erro ao limpar notificações antigas via API:', error);
        }
      }

      // Local cleanup
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
    (async () => {
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      const userIds = Array.from(new Set(notifications.map(n => parseInt(n.userId))));
      for (const userId of userIds) {
        try {
          await notificacoesAPI.cleanup(userId, 24);
        } catch (error) {
          console.error('Erro ao limpar notificações antigas via API:', error);
        }
      }
      
      setNotifications(prev => 
        prev.filter(notif => {
          if (!notif.read) return true;
          const notifTime = new Date(notif.timestamp).getTime();
          return (now - notifTime) < twentyFourHours;
        })
      );
    })();

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

  const refreshFeedbacks = async (userId: number) => {
    try {
      console.log('🔄 Carregando feedbacks para userId:', userId);
      const apiFeedbacks = await feedbacksAPI.getByUserId(userId);
      console.log('Feedbacks da API:', apiFeedbacks);
      
      // Load all responses and questionnaires to get titles
      const [allResponses, allQuestionnaires] = await Promise.all([
        respostasAPI.getAll(),
        questionariosAPI.getAll()
      ]);
      
      // Convert API feedbacks to frontend format
      const converted: Feedback[] = apiFeedbacks.map(fb => {
        // Convert numeric userId back to usr_XXX format
        const userIdStr = `usr_${String(fb.userId).padStart(3, '0')}`;
        
        // Find the response to get the questionnaire ID
        const response = allResponses.find(r => r.id === fb.respostaId);
        const questionnaireId = response ? response.questionarioId : 0;
        
        // Find the questionnaire to get the title
        const questionnaire = allQuestionnaires.find(q => q.id === questionnaireId);
        const questionnaireTitle = questionnaire ? questionnaire.titulo : 'Questionário';
        
        return {
          id: fb.id?.toString() || `fb_${Date.now()}`,
          questionnaireId: questionnaireId.toString(),
          questionnaireTitle: questionnaireTitle,
          responseId: fb.respostaId.toString(),
          userId: userIdStr,
          userName: 'Usuário',
          managerId: '0',
          managerName: 'Gestor',
          message: fb.feedback,
          timestamp: fb.timestamp || new Date().toISOString(),
          read: fb.read || false
        };
      });
      
      console.log('Feedbacks convertidos com títulos:', converted);
      setFeedbacks(converted);
    } catch (error) {
      console.error('Erro ao buscar feedbacks da API:', error);
    }
  };

  const refreshNotifications = async (userId: number) => {
    try {
      const apiNotifs = await notificacoesAPI.getByUserId(userId);
      // Convert API notifications to frontend format
      const converted: Notification[] = apiNotifs.map(notif => {
        // Convert numeric userId back to usr_XXX format
        const userIdStr = `usr_${String(notif.userId).padStart(3, '0')}`;
        
        return {
          id: notif.id?.toString() || `notif_${Date.now()}`,
          type: (notif.type === 'feedback' ? 'feedback' : 'system') as 'feedback' | 'system',
          title: 'Notificação',
          message: notif.message,
          timestamp: notif.createdAt || new Date().toISOString(),
          read: notif.read,
          userId: userIdStr,
          feedbackId: notif.relatedId?.toString()
        };
      });
      setNotifications(converted);
    } catch (error) {
      console.error('Erro ao buscar notificações da API:', error);
    }
  };

  const addFeedback = async (feedbackData: Omit<Feedback, 'id' | 'timestamp' | 'read'>) => {
    console.log('=== ENVIANDO FEEDBACK ===');
    console.log('Dados do feedback:', feedbackData);
    
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `feedback_${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    try {
      // Extract numeric ID from userId (e.g., "usr_004" -> 4)
      let numericUserId = 0;
      if (feedbackData.userId) {
        const match = feedbackData.userId.match(/\d+/);
        numericUserId = match ? parseInt(match[0]) : parseInt(feedbackData.userId) || 0;
      }
      
      console.log('userId original:', feedbackData.userId);
      console.log('userId numérico extraído:', numericUserId);
      console.log('responseId:', feedbackData.responseId);
      
      // Try to save to API
      const apiFeedback = await feedbacksAPI.create({
        userId: numericUserId,
        respostaId: parseInt(feedbackData.responseId),
        feedback: feedbackData.message
      });
      
      console.log('Feedback criado na API:', apiFeedback);
      
      // Create notification via API
      const apiNotif = await notificacoesAPI.create({
        userId: numericUserId,
        message: `${feedbackData.managerName} enviou feedback sobre "${feedbackData.questionnaireTitle}"`,
        read: false,
        type: 'feedback',
        relatedId: apiFeedback.id
      });
      
      console.log('Notificação criada na API:', apiNotif);

      // Update local state
      setFeedbacks(prev => [newFeedback, ...prev]);
      
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
      
    } catch (error) {
      console.error('Erro ao salvar feedback na API, salvando localmente:', error);
      // Fallback to localStorage
      setFeedbacks(prev => [newFeedback, ...prev]);
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
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await notificacoesAPI.markAsRead(parseInt(notificationId));
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Erro ao marcar notificação como lida na API:', error);
      // Fallback to local update
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  };

  const markFeedbackAsRead = async (feedbackId: string) => {
    try {
      console.log('🔖 Marcando feedback como lido:', feedbackId);
      await feedbacksAPI.markAsRead(parseInt(feedbackId));
      setFeedbacks(prev =>
        prev.map(feedback =>
          feedback.id === feedbackId ? { ...feedback, read: true } : feedback
        )
      );
      console.log('✓ Feedback marcado como lido com sucesso');
    } catch (error) {
      console.error('Erro ao marcar feedback como lido na API:', error);
      // Fallback to local update
      setFeedbacks(prev =>
        prev.map(feedback =>
          feedback.id === feedbackId ? { ...feedback, read: true } : feedback
        )
      );
    }
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
        refreshFeedbacks,
        refreshNotifications,
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
