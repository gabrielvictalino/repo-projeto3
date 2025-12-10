export interface Feedback {
  id: string;
  questionnaireId: string;
  questionnaireTitle: string;
  responseId: string;
  userId: string;
  userName: string;
  managerId: string;
  managerName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'feedback' | 'system';
  title: string;
  message: string;
  feedbackId?: string;
  timestamp: string;
  read: boolean;
  userId: string;
}
