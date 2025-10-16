import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import type { CreateMessageDto } from '../../types/message.types';

interface MessageFormProps {
  onSubmit: (data: CreateMessageDto) => Promise<boolean>;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Le message ne peut pas être vide');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit({ content: content.trim() });
      setContent('');
    } catch (err) {
      setError('Erreur lors de la création du message');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
         Nouveau Message
      </h2>

      {error && (
        <div className="bg-red-50  border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <Input
        label="Votre message"
        value={content}
        onChange={setContent}
        placeholder="Écrivez quelque chose..."
        required
        disabled={loading}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full mt-4"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </Button>
    </form>
  );
}