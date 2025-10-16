import { useMessages } from './hooks/useMessages';
import MessageForm from './components/messages/MessageForm';
import MessageList from './components/messages/MessageList';
import './App.css';

function App() {
  const {
    messages,
    status,
    error,
    createMessage,
    updateMessage,
    deleteMessage
  } = useMessages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
             Gestion des Messages
          </h1>
          <p className="text-gray-600 mt-2">
            Application CRUD - React TypeScript + Flask
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-1">
            <MessageForm onSubmit={createMessage} />
          </div>

          {/* Liste des messages */}
          <div className="lg:col-span-2">
            <MessageList
              messages={messages}
              loading={status === 'loading'}
              error={error}
              onDelete={deleteMessage}
              onUpdate={updateMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;