// app/components/ChatInput.tsx
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 flex gap-2">
      <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600">
        <Paperclip size={20} />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition text-black"
      />
      <button
        onClick={onSend}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        <Send size={20} />
      </button>
    </div>
  );
}