export interface Message {
  content: string;
  created_at: string;
}

export interface CreateMessageDto {
  content: string;
}

export interface UpdateMessageDto {
  content: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';