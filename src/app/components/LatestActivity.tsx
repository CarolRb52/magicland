interface ActivityProps {
  name: string;
  date: string;
  description: string;
  amount: string;
  type: 'savings' | 'spent';
  color: string;
}

function ActivityItem({ name, date, description, amount, type, color }: ActivityProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-purple-900">{name}</span>
          <span className="text-xs text-purple-400">•</span>
          <span className="text-xs text-purple-400">{date}</span>
        </div>
        <p className="text-sm text-purple-600/70">{description}</p>
      </div>

      <div className={`font-semibold ${type === 'savings' ? 'text-green-600' : 'text-red-500'}`}>
        {type === 'savings' ? '+' : '-'}{amount}
      </div>
    </div>
  );
}

export function LatestActivity() {
  const activities = [
    {
      name: 'Warren',
      date: 'Today',
      description: 'Dining Round-Up',
      amount: '12 SAR',
      type: 'savings' as const,
      color: '#f59e0b'
    },
    {
      name: 'You',
      date: 'Yesterday',
      description: 'Netflix Subscription',
      amount: '63 SAR',
      type: 'spent' as const,
      color: '#9333ea'
    },
    {
      name: 'Ingrid',
      date: 'May 9',
      description: 'Grocery Round-Up',
      amount: '8 SAR',
      type: 'savings' as const,
      color: '#ec4899'
    }
  ];

  return (
    <div className="px-6 pb-20">
      <h3 className="text-lg font-semibold text-purple-900 mb-2">Latest Activity</h3>
      <div className="divide-y divide-purple-100">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}
