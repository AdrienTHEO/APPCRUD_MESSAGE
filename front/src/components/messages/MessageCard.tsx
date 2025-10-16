import { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import type { Message, UpdateMessageDto } from '../../types/message.types';

interface MessageCardProps {
  message: Message;
  onDelete: (id: number) => Promise<boolean>;
  onUpdate: (id: number, data: UpdateMessageDto) => Promise<boolean>;
}

export default function MessageCard({ message, onDelete, onUpdate }: MessageCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = async () => {
    if (editedContent.trim() === message.content) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      await onUpdate(message.id, { content: editedContent.trim() });
      setIsEditing(false);
    } catch (err) {
      setEditedContent(message.content);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(message.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(message.id);
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-gray-500">
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            #{message.id}
          </span>
        </div>

        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            disabled={loading}
            rows={4}
            className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        ) : (
          <p className="text-gray-800 leading-relaxed mb-4">{message.content}</p>
        )}

        <div className="flex gap-2 justify-end">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={handleCancel} disabled={loading}>
                Annuler
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={loading}>
                Sauvegarder
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(true)} 
                disabled={loading}
              >
                Modifier
              </Button>
              <Button 
                variant="danger" 
                onClick={() => setShowDeleteModal(true)} 
                disabled={loading}
              >
                Supprimer
              </Button>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </>
  );
}