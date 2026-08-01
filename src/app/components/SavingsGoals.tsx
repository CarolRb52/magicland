import { Briefcase, Car, ChevronRight } from 'lucide-react';

interface GoalProps {
  title: string;
  amount: string;
  icon: 'briefcase' | 'car';
  color: string;
}

function GoalItem({ title, amount, icon, color }: GoalProps) {
  const icons = {
    briefcase: <Briefcase className="w-8 h-8" />,
    car: <Car className="w-8 h-8" />
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${color}30, ${color}15)`,
          color: color
        }}
      >
        {icons[icon]}
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-purple-900 mb-0.5">{title}</h4>
        <p className="text-2xl font-bold text-purple-600">{amount} SAR</p>
      </div>

      <button className="text-purple-400 hover:text-purple-600 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export function SavingsGoals() {
  const goals = [
    { title: 'Travel Savings', amount: '2,100', icon: 'briefcase' as const, color: '#9333ea' },
    { title: 'New Car Fund', amount: '18,500', icon: 'car' as const, color: '#a855f7' }
  ];

  return (
    <div className="px-6 pb-4 space-y-3">
      {goals.map((goal) => (
        <GoalItem key={goal.title} {...goal} />
      ))}
    </div>
  );
}
