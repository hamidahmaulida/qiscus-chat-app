// app/components/ParticipantList.tsx
interface Participant {
  id: string;
  name: string;
  role: number;
  status: string;
}

interface ParticipantListProps {
  participants: Participant[];
}

export default function ParticipantList({ participants }: ParticipantListProps) {
  const getRoleLabel = (role: number) => {
    const roles = ['Admin', 'Agent', 'Customer'];
    return roles[role] || 'Unknown';
  };

  return (
    <div className="p-4 border-t border-blue-500">
      <h4 className="text-xs font-semibold mb-3 uppercase opacity-75">Participants</h4>
      <div className="space-y-2">
        {participants.map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <img
              src={`https://i.pravatar.cc/32?u=${encodeURIComponent(p.id)}`}
              alt={p.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs opacity-70">Role: {getRoleLabel(p.role)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}