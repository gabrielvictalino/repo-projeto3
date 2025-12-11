// API service for communicating with Spring Boot backend
const API_BASE_URL = '/api';

// ==================== Questionários ====================

export interface Question {
  id?: string;
  conteudo: string;
  perguntaTipo: 'TEXT' | 'MULTIPLA_ESCOLHA' | 'SATISFACTION';
  options?: string; // JSON string for MCQ options
  required?: boolean;
}

export interface Questionario {
  id?: number;
  titulo: string;
  coverImage?: string;
  status?: 'ATIVO' | 'INATIVO';
  perguntas: Question[];
}

export const questionariosAPI = {
  getAll: async (): Promise<Questionario[]> => {
    const response = await fetch(`${API_BASE_URL}/questionarios/find/all`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar questionários');
    return response.json();
  },

  getById: async (id: number): Promise<Questionario> => {
    const response = await fetch(`${API_BASE_URL}/questionarios/find/${id}`);
    if (!response.ok) throw new Error('Questionário não encontrado');
    return response.json();
  },

  getActive: async (): Promise<Questionario[]> => {
    const response = await fetch(`${API_BASE_URL}/questionarios/find/active`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar questionários ativos');
    return response.json();
  },

  create: async (questionario: Questionario): Promise<Questionario> => {
    const response = await fetch(`${API_BASE_URL}/questionarios/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionario),
    });
    if (!response.ok) throw new Error('Erro ao criar questionário');
    return response.json();
  },

  update: async (id: number, questionario: Questionario): Promise<Questionario> => {
    const response = await fetch(`${API_BASE_URL}/questionarios/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionario),
    });
    if (!response.ok) throw new Error('Erro ao atualizar questionário');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/questionarios/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar questionário');
  },

  activate: async (id: number): Promise<Questionario> => {
    const response = await fetch(`${API_BASE_URL}/questionarios/activate/${id}`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Erro ao ativar questionário');
    return response.json();
  },
};

// ==================== Usuários ====================

export interface Usuario {
  id?: number;
  cpf?: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
  tipo: 'MANAGER' | 'CLIENTE';
  genero?: 'MASCULINO' | 'FEMININO' | 'OUTRO' | 'PREFIRO_NAO_DIZER';
  escolaridade?: 'FUNDAMENTAL' | 'MEDIO' | 'SUPERIOR' | 'POS_GRAD' | 'MESTRADO' | 'DOUTORADO';
}

export const usuariosAPI = {
  create: async (usuario: Usuario): Promise<Usuario> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Erro ao criar usuário');
    return response.json();
  },

  login: async (email: string, senha: string): Promise<Usuario> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    if (!response.ok) throw new Error('Credenciais inválidas');
    return response.json();
  },

  findAll: async (): Promise<Usuario[]> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/find/all`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar usuários');
    return response.json();
  },

  findById: async (id: number): Promise<Usuario> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/find/${id}`);
    if (!response.ok) throw new Error('Usuário não encontrado');
    return response.json();
  },

  update: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Erro ao atualizar usuário');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir usuário');
  },
};

// ==================== Respostas ====================

export interface RespostaUsuario {
  id?: number;
  perguntaId: number;
  resposta: string;
}

export interface QuestionarioRespondido {
  id?: number;
  userId: number;
  questionarioId: number;
  respostas: RespostaUsuario[];
  timestamp?: string;
}

export const respostasAPI = {
  submit: async (resposta: QuestionarioRespondido): Promise<QuestionarioRespondido> => {
    const response = await fetch(`${API_BASE_URL}/respostas/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resposta),
    });
    if (!response.ok) throw new Error('Erro ao enviar resposta');
    return response.json();
  },

  getByUserId: async (userId: number): Promise<QuestionarioRespondido[]> => {
    const response = await fetch(`${API_BASE_URL}/respostas/find/usuario/${userId}`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar respostas do usuário');
    return response.json();
  },

  getByQuestionarioId: async (questionarioId: number): Promise<QuestionarioRespondido[]> => {
    const response = await fetch(`${API_BASE_URL}/respostas/find/all/${questionarioId}`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar respostas do questionário');
    return response.json();
  },

  getAll: async (): Promise<QuestionarioRespondido[]> => {
    const response = await fetch(`${API_BASE_URL}/respostas/find/all`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar respostas');
    return response.json();
  },
};

// ==================== Feedbacks ====================

export interface Feedback {
  id?: number;
  userId: number;
  respostaId: number;
  feedback: string;
  timestamp?: string;
  read?: boolean;
}

export const feedbacksAPI = {
  create: async (feedback: Feedback): Promise<Feedback> => {
    const response = await fetch(`${API_BASE_URL}/feedback/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });
    if (!response.ok) throw new Error('Erro ao criar feedback');
    return response.json();
  },

  getByUserId: async (userId: number): Promise<Feedback[]> => {
    const response = await fetch(`${API_BASE_URL}/feedback/find/user/${userId}`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar feedbacks');
    return response.json();
  },

  markAsRead: async (feedbackId: number): Promise<Feedback> => {
    const response = await fetch(`${API_BASE_URL}/feedback/mark-read/${feedbackId}`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Erro ao marcar feedback como lido');
    return response.json();
  },
};

// ==================== Notificações ====================

export interface Notificacao {
  id?: number;
  userId: number;
  message: string;
  read: boolean;
  createdAt?: string;
  readAt?: string;
  type: string;
  relatedId?: number;
}

export const notificacoesAPI = {
  create: async (notificacao: Notificacao): Promise<Notificacao> => {
    const response = await fetch(`${API_BASE_URL}/notificacoes/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificacao),
    });
    if (!response.ok) throw new Error('Erro ao criar notificação');
    return response.json();
  },

  getByUserId: async (userId: number): Promise<Notificacao[]> => {
    const response = await fetch(`${API_BASE_URL}/notificacoes/find/user/${userId}`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar notificações');
    return response.json();
  },

  getUnreadByUserId: async (userId: number): Promise<Notificacao[]> => {
    const response = await fetch(`${API_BASE_URL}/notificacoes/find/unread/${userId}`);
    if (response.status === 204) return [];
    if (!response.ok) throw new Error('Erro ao buscar notificações não lidas');
    return response.json();
  },

  markAsRead: async (id: number): Promise<Notificacao> => {
    const response = await fetch(`${API_BASE_URL}/notificacoes/mark-read/${id}`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Erro ao marcar notificação como lida');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/notificacoes/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar notificação');
  },

  cleanup: async (userId: number, hours: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/notificacoes/cleanup/user/${userId}/hours/${hours}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao limpar notificações antigas');
  },
};
