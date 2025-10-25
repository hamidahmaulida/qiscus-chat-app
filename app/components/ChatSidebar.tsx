import { Search, Settings } from 'lucide-react';

interface Room {
  id: number;
  name: string;
  image_url: string;
}

interface Message {
  message: string;
}

interface ChatSidebarProps {
  room: Room;
  lastMessage?: Message;
  showSidebar: boolean;
}

export default function ChatSidebar({ room, lastMessage, showSidebar }: ChatSidebarProps) {
  return (
    <div className={`${showSidebar ? 'flex' : 'hidden'} md:flex w-80 bg-linear-to-b from-blue-600 to-blue-700 text-white flex-col`}>
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
                {lastMessage?.message.substring(0, 30)}...
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}