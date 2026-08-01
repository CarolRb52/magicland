import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

type Page = 'home' | 'attractions' | 'tickets' | 'contact';

interface Props {
  activePage: Page;
  onNav: (p: Page) => void;
}

export function Header({ activePage, onNav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: 'Inicio', page: 'home' },
    { label: 'Atracciones', page: 'attractions' },
    { label: 'Tickets', page: 'tickets' },
    { label: 'Contacto', page: 'contact' },
  ];

  return (
    <header className="bg-[#f1f6fd] border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onNav('home')}
          className="text-2xl font-black text-[#e8003a] tracking-tight"
        >
          MagicLand
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => onNav(l.page)}
              className={`text-sm font-medium transition-colors pb-0.5 ${
                activePage === l.page
                  ? 'text-[#e8003a] border-b-2 border-[#e8003a]'
                  : 'text-gray-700 hover:text-[#e8003a]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex text-gray-600 hover:text-gray-900 transition-colors">
            <Search size={20} />
          </button>
          <button
            onClick={() => onNav('tickets')}
            className="hidden md:flex px-5 py-2.5 bg-[#e8003a] hover:bg-[#b8002e] text-white text-sm font-bold rounded-lg transition-colors"
          >
            Comprar Tickets
          </button>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-blue-100 bg-[#f1f6fd] px-6 py-4 space-y-3">
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => { onNav(l.page); setMenuOpen(false); }}
              className={`block w-full text-left text-sm font-medium py-2 ${
                activePage === l.page ? 'text-[#e8003a]' : 'text-gray-700'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { onNav('tickets'); setMenuOpen(false); }}
            className="w-full mt-2 px-5 py-2.5 bg-[#e8003a] text-white text-sm font-bold rounded-lg"
          >
            Comprar Tickets
          </button>
        </div>
      )}
    </header>
  );
}
