import { useState, useEffect, useCallback } from 'react';
import { messageService } from '../services/messageService';
import type { Message, CreateMessageDto, UpdateMessageDto, LoadingState } from '../types/message.types';


export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>('');

  const loadMessages = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await messageService.getAll();
      setMessages(data);
      setStatus('success');
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des messages');
      setStatus('error');
      console.error(err);
    }
  }, []);

  const createMessage = useCallback(async (data: CreateMessageDto) => {
    try {
      await messageService.create(data);
      await loadMessages(); // Recharger la liste
      return true;
    } catch (err) {
      setError('Erreur lors de la création du message');
      throw err;
    }
  }, [loadMessages]);

  const updateMessage = useCallback(async (id: number, data: UpdateMessageDto) => {
    try {
      await messageService.update(id, data);
      await loadMessages(); // Recharger la liste
      return true;
    } catch (err) {
      setError('Erreur lors de la mise à jour');
      throw err;
    }
  }, [loadMessages]);

  const deleteMessage = useCallback(async (id: number) => {
    try {
      await messageService.delete(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      return true;
    } catch (err) {
      setError('Erreur lors de la suppression');
      throw err;
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    messages,
    status,
    error,
    loadMessages,
    createMessage,
    updateMessage,
    deleteMessage
  };
}
