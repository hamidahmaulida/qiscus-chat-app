// app/components/ChatHeader.tsx
import { Phone, MoreVertical } from 'lucide-react';

interface RoomHeader {
  id: number;
  name: string;
  image_url: string;
  participants: { id: string }[];
}

interface ChatHeaderProps {
  room: RoomHeader;
  showMobileHeader?: boolean;
  onToggleSidebar?: () => void;
}

export default function ChatHeader({ room, showMobileHeader = false, onToggleSidebar }: ChatHeaderProps) {
  if (showMobileHeader) {
    return (
      <div className="flex md:hidden items-center justify-between bg-blue-600 text-white p-3 border-b border-blue-500">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-blue-500 rounded-lg transition text-xl"
        >
          ☰
        </button>
        <h1 className="font-bold flex-1 text-center">{room.name}</h1>
        <div className="w-8"></div>
      </div>
    );
  }

  return (
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
  );
}