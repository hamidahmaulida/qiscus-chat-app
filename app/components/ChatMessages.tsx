// app/components/ChatMessages.tsx
interface Attachment {
  id: string;
  file_type: string;
  file_name: string;
  file_url: string;
  file_size: number;
  duration?: number;
}

interface ChatMessage {
  id: number;
  type: string;
  message: string;
  attachments?: Attachment[];
  sender: string;
  sender_name: string;
  sent_at: string;
  status: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  currentUser: string;
}

export default function ChatMessages({ messages, currentUser }: ChatMessagesProps) {
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (msg: ChatMessage) => {
    const isCurrentUser = msg.sender === currentUser;
    const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
    const bubbleColor = isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black';

    return (
      <div key={msg.id} className="flex flex-col gap-1 mb-4">
        {!isCurrentUser && (
          <p className="text-xs text-gray-600 px-3 font-semibold">{msg.sender_name}</p>
        )}

        <div className={`flex ${alignment} gap-2`}>
          <div className={`max-w-xs md:max-w-md ${bubbleColor} rounded-lg p-3 break-word`}>
            {msg.type === 'text' && (
              <p className="text-sm">{msg.message}</p>
            )}

            {msg.type === 'image' && msg.attachments && (
              <div className="space-y-2">
                {msg.message && <p className="text-sm font-semibold">{msg.message}</p>}
                <img
                  src={msg.attachments[0].file_url}
                  alt="attachment"
                  className="w-full rounded-md max-h-64 object-cover"
                />
              </div>
            )}

            {msg.type === 'video' && msg.attachments && (
              <div className="space-y-2">
                {msg.message && <p className="text-sm font-semibold">{msg.message}</p>}
                <video
                  src={msg.attachments[0].file_url}
                  controls
                  className="w-full rounded-md max-h-64"
                  style={{ backgroundColor: '#000' }}
                />
              </div>
            )}

            {msg.type === 'pdf' && msg.attachments && (
              <div className="space-y-2">
                {msg.message && <p className="text-sm font-semibold">{msg.message}</p>}
                <a
                  href={msg.attachments[0].file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    isCurrentUser ? 'bg-blue-600' : 'bg-gray-300'
                  } hover:opacity-80 transition`}
                >
                  <span className="text-lg">📄</span>
                  <div className="text-left">
                    <p className="text-xs font-semibold truncate max-w-40">
                      {msg.attachments[0].file_name}
                    </p>
                    <p className="text-xs opacity-70">
                      {(msg.attachments[0].file_size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>

          {isCurrentUser && (
            <span
              className={`text-xs mt-1 ${
                msg.status === 'read' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {msg.status === 'read' ? '✓✓' : '✓'}
            </span>
          )}
        </div>

        <p
          className={`text-xs text-gray-500 px-3 ${
            isCurrentUser ? 'text-right' : 'text-left'
          }`}
        >
          {formatTime(msg.sent_at)}
        </p>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
      {messages.map((msg) => renderMessage(msg))}
    </div>
  );
}