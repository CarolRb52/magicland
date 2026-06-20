import { Ticket, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F6131E] to-[#CF0610] rounded-xl flex items-center justify-center shadow-lg">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MagicLand</h1>
              <p className="text-xs text-gray-600">Parque de Atracciones</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-gray-700 hover:text-[#F6131E] transition-colors font-medium">Inicio</a>
            <a href="#tickets" className="text-gray-700 hover:text-[#F6131E] transition-colors font-medium">Tickets</a>
            <a href="#atracciones" className="text-gray-700 hover:text-[#F6131E] transition-colors font-medium">Atracciones</a>
            <a href="#contacto" className="text-gray-700 hover:text-[#F6131E] transition-colors font-medium">Contacto</a>
          </nav>

          <button className="md:hidden text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
