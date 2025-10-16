import api from '../api/axios.config';
import type { Message, CreateMessageDto, UpdateMessageDto } from '../types/message.types';

export const messageService = {
  // GET - Récupérer tous les messages
  getAll: async (): Promise<Message[]> => {
    const response = await api.get('/');
    const contents: string[] = response.data; 
    return contents.map((content, index) => ({
      id: index + 1, // ID temporaire
      content: content,
      created_at: new Date().toISOString()
    }));
  },

  // POST - Créer un message
  create: async (data: CreateMessageDto): Promise<string> => {
    const formData = new URLSearchParams();
    formData.append('content', data.content); 
    const response = await api.post('/', formData);
    return response.data;
  },

  // POST - Mettre à jour un message
  update: async (id: number, data: UpdateMessageDto): Promise<string> => {
    const formData = new URLSearchParams();
    formData.append('content', data.content);
   
    const response = await api.post(`/update/${id}`, formData);
    return response.data;
  },

  // POST - Supprimer un message
  delete: async (id: number): Promise<string> => {
    const response = await api.post(`/delete/${id}`);
    return response.data;
  }
};