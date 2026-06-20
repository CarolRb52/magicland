import { Sparkles, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../ui/ImageWithFallback';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1770234209384-da4f3ca3bb9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="MagicLand Parque de Atracciones"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
      </div>

      <div className="container mx-auto px-6 py-24 md:py-32 relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#F6131E]/90 backdrop-blur-md rounded-full px-5 py-2.5 mb-6 shadow-lg border border-white/10">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Temporada 2026 Abierta</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Vive la Magia en
            <span className="block bg-gradient-to-r from-[#FF5E66] to-[#F6131E] bg-clip-text text-transparent">
              MagicLand
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">
            El parque de atracciones más emocionante de la región.
            Más de 30 atracciones, espectáculos en vivo y diversión sin límites.
          </p>

          <div className="flex flex-wrap gap-6 mb-10 text-gray-200">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <Clock className="w-5 h-5 text-[#FF5E66]" />
              <span className="font-medium">10:00 AM - 10:00 PM</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <MapPin className="w-5 h-5 text-[#FF5E66]" />
              <span className="font-medium">Ciudad Mágica, España</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#tickets"
              className="px-8 py-4 bg-gradient-to-r from-[#F6131E] to-[#CF0610] text-white rounded-lg font-bold text-lg hover:from-[#CF0610] hover:to-[#AB0911] transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Comprar Tickets
            </a>
            <button className="px-8 py-4 bg-white/95 backdrop-blur-md text-gray-900 rounded-lg font-bold text-lg hover:bg-white transition-all shadow-lg border border-white/20">
              Ver Mapa del Parque
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
