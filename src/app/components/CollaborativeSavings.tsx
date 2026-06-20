import { Plus } from 'lucide-react';

interface AvatarProps {
  name: string;
  color: string;
}

function MemojiAvatar({ name, color }: AvatarProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg border-2 border-white"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </div>
      <span className="text-xs text-purple-700 font-medium">{name}</span>
    </div>
  );
}

export function CollaborativeSavings() {
  const members = [
    { name: 'Warren', color: '#f59e0b' },
    { name: 'Edwards', color: '#3b82f6' },
    { name: 'Ingrid', color: '#ec4899' },
    { name: 'Sophie', color: '#10b981' }
  ];

  return (
    <div className="px-6 pb-4">
      <h3 className="text-lg font-semibold text-purple-900 mb-3">Collaborative Savings</h3>
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {members.map((member) => (
          <MemojiAvatar key={member.name} {...member} />
        ))}
        <button className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center border-2 border-dashed border-purple-300 hover:bg-purple-200 transition-colors">
            <Plus className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs text-purple-600 font-medium">Add</span>
        </button>
      </div>
    </div>
  );
}
