import { Menu, Plus } from 'lucide-react';

export function WalletHeader() {
  return (
    <div className="px-6 pt-4 pb-2">
      <div className="flex items-center justify-between mb-1">
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
          <Menu className="w-5 h-5 text-white" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
      <h1 className="text-2xl font-semibold text-white">Nexus Wallet</h1>
      <p className="text-sm text-white/70">Manage Your Purpose-Built Cards</p>
    </div>
  );
}
