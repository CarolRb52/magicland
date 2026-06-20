import { Plane, Tv, ShoppingCart } from 'lucide-react';

interface CardProps {
  title: string;
  balance: string;
  lastFour: string;
  icon: 'plane' | 'tv' | 'cart';
  index: number;
}

function VirtualCard({ title, balance, lastFour, icon, index }: CardProps) {
  const icons = {
    plane: <Plane className="w-5 h-5" />,
    tv: <Tv className="w-5 h-5" />,
    cart: <ShoppingCart className="w-5 h-5" />
  };

  return (
    <div
      className="relative rounded-3xl p-6 backdrop-blur-xl border border-white/20 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.6) 0%, rgba(167, 139, 250, 0.4) 100%)',
        transform: `translateY(${index * -12}px) scale(${1 - index * 0.02})`,
        zIndex: 10 - index
      }}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            {icons[icon]}
          </div>
          <span className="text-white/90 text-sm font-medium">{title}</span>
        </div>
        <div className="text-white/90 font-bold text-xs">VISA</div>
      </div>

      <div className="space-y-1 mb-4">
        <div className="text-white/70 text-xs">Available Balance</div>
        <div className="text-white text-2xl font-semibold">{balance} SAR</div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-white/70 text-xs mb-1">Card Number</div>
          <div className="text-white text-sm font-medium">•••• {lastFour}</div>
        </div>
        <div className="text-white/70 text-xs">Valid</div>
      </div>
    </div>
  );
}

export function CardStack() {
  const cards = [
    { title: 'Travel Card', balance: '15,000', lastFour: '9012', icon: 'plane' as const },
    { title: 'Online Subscriptions', balance: '450', lastFour: '7834', icon: 'tv' as const },
    { title: 'Dining & Groceries', balance: '2,500', lastFour: '5621', icon: 'cart' as const }
  ];

  return (
    <div className="px-6 py-6 relative" style={{ minHeight: '280px' }}>
      {cards.map((card, index) => (
        <VirtualCard key={card.title} {...card} index={index} />
      ))}
    </div>
  );
}
