import MessageCard from './MessageCard';
import Loader from '../common/Loader';
import type { Message, UpdateMessageDto } from '../../types/message.types';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  error: string;
  onDelete: (id: number) => Promise<boolean>;
  onUpdate: (id: number, data: UpdateMessageDto) => Promise<boolean>
}

export default function MessageList({
  messages,
  loading,
  error,
  onDelete,
  onUpdate
}: MessageListProps) {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-red-500 p-6 rounded-lg">
        <h3 className="text-red-800 font-bold mb-2">Erreur veuillez reessayer plus tard </h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <div className="text-6xl mb-4"></div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          Aucun message
        </h3>
        <p className="text-gray-500">
          Soyez le premier à écrire un message !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
         Messages ({messages.length})
      </h2>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}