// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import ParticipantList from './components/ParticipantList';
import { Search, Settings, Phone, MoreVertical, X } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: number;
  status: string;
}

interface Room {
  id: number;
  name: string;
  type: string;
  image_url: string;
  participants: Participant[];
}

interface Attachment {
  id: string;
  file_type: string;
  file_name: string;
  file_url: string;
  file_size: number;
  duration?: number;
}

interface Message {
  id: number;
  type: string;
  message: string;
  attachments?: Attachment[];
  sender: string;
  sender_name: string;
  sent_at: string;
  status: string;
}

interface ChatData {
  room: Room;
  comments: Message[];
}

export default function ChatPage() {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const currentUser = 'customer@mail.com';

  useEffect(() => {
    const loadChat = async () => {
      try {
        const res = await fetch('/chat_extended.json');
        if (!res.ok) throw new Error('Failed to fetch chat data');
        const data = await res.json();
        setChatData(data.results[0]);
        setMessages(data.results[0].comments);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Make sure chat_extended.json exists in public folder');
        console.error('Failed to load chat:', err);
      } finally {
        setLoading(false);
      }
    };
    loadChat();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const msg: Message = {
        id: Date.now(),
        type: 'text',
        message: newMessage,
        sender: currentUser,
        sender_name: 'You',
        sent_at: new Date().toISOString(),
        status: 'sent'
      };
      setMessages([...messages, msg]);
      setNewMessage('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (error || !chatData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Failed to load chat data</p>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const room = chatData.room;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar with Chat List & Participants */}
      <div className={`${showSidebar ? 'flex' : 'hidden'} md:flex w-80 bg-linear-to-b from-blue-600 to-blue-700 text-white flex-col fixed md:relative h-full md:h-auto z-50 md:z-auto top-0 left-0`}>
        {/* Close Button Mobile */}
        {showSidebar && (
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition self-end m-2"
          >
            <X size={24} />
          </button>
        )}

        {/* Chat List Section */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Chats</h1>
              <button className="p-2 hover:bg-blue-500 rounded-lg transition">
                <Settings size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-blue-500 rounded-full px-4 py-2">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search chats..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <button className="w-full p-4 text-left border-b border-blue-500 bg-blue-500 hover:bg-blue-500 transition">
              <div className="flex items-center gap-3">
                <img
                  src={room.image_url}
                  alt={room.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{room.name}</h3>
                  <p className="text-sm opacity-80 truncate">
                    {messages[messages.length - 1]?.message.substring(0, 30)}...
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Participants Section */}
        <ParticipantList participants={room.participants} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Mobile Header with Toggle */}
        <div className="flex md:hidden items-center justify-between bg-blue-600 text-white p-3 border-b border-blue-500">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-blue-500 rounded-lg transition text-xl"
          >
            ☰
          </button>
          <h1 className="font-bold flex-1 text-center">{room.name}</h1>
          <div className="w-8"></div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex bg-linear-to-r from-blue-500 to-blue-600 text-white p-4 items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={room.image_url}
              alt={room.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <h2 className="font-bold truncate">{room.name}</h2>
              <p className="text-xs opacity-80">{room.participants.length} participants</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-blue-400 rounded-lg transition">
              <Phone size={20} />
            </button>
            <button className="p-2 hover:bg-blue-400 rounded-lg transition">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <ChatMessages messages={messages} currentUser={currentUser} />

        {/* Input */}
        <ChatInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
}