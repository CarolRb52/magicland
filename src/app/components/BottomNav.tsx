import { Home, CreditCard, PiggyBank, BarChart3, User } from 'lucide-react';

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-purple-100 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around px-6 py-3">
        <button className="flex flex-col items-center gap-1 text-purple-600">
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-purple-300 hover:text-purple-600 transition-colors">
          <CreditCard className="w-6 h-6" />
          <span className="text-xs">Cards</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-purple-300 hover:text-purple-600 transition-colors">
          <PiggyBank className="w-6 h-6" />
          <span className="text-xs">Savings</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-purple-300 hover:text-purple-600 transition-colors">
          <BarChart3 className="w-6 h-6" />
          <span className="text-xs">Analytics</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-purple-300 hover:text-purple-600 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
