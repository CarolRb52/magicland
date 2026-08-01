import { Clock, Utensils, ParkingSquare, Shield, ChevronRight } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

interface Props {
  onBuyTickets: () => void;
  onSeeAttractions: () => void;
}

export function HomePage({ onBuyTickets, onSeeAttractions }: Props) {
  return (
    <main className="bg-[#f0f6fd]">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[560px] overflow-hidden">
        <img
          src={`${BASE}images/banner-home.jpg`}
          alt="MagicLand"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#011a48]/90 via-[#011a48]/60 to-transparent" />

        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 bg-[#c0052d] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 w-fit">
            Temporada 2026 Abierta ✦
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Vive la Magia en<br />
            <span className="text-[#ff4466]">MagicLand</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
            Descubre un mundo donde la aventura se convierte en fantasía. Montañas rusas de clase
            mundial, espectáculos épicos y momentos inolvidables te esperan.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onBuyTickets}
              className="px-7 py-3.5 bg-[#e8003a] hover:bg-[#b8002e] text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              Comprar Tickets →
            </button>
            <button
              onClick={onSeeAttractions}
              className="px-7 py-3.5 bg-[#011a48] hover:bg-[#0039ca]/30 text-white font-bold rounded-lg border-2 border-[#0039ca] transition-colors flex items-center gap-2"
            >
              ☆ Explorar Atracciones
            </button>
          </div>
        </div>

        {/* Abierto Hoy badge */}
        <div className="absolute bottom-8 right-8 bg-[#0039ca] rounded-xl shadow-lg px-4 py-3 flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <div>
            <div className="text-xs text-white/70 font-medium">Abierto hoy</div>
            <div className="text-sm font-bold text-white">09:00 – 21:00</div>
          </div>
        </div>
      </section>

      {/* Atracciones Destacadas */}
      <section className="py-16 px-6 bg-[#f0f6fd]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <h2 className="text-4xl font-black text-gray-900 flex items-center gap-2">
                Atracciones Destacadas <span className="text-[#e8003a]">✦</span>
              </h2>
              <p className="text-gray-500 mt-1">Siente la velocidad y déjate llevar por la fantasía.</p>
            </div>
            <button
              onClick={onSeeAttractions}
              className="text-sm font-semibold text-[#c0052d] hover:underline whitespace-nowrap flex items-center gap-1"
            >
              Ver todas las atracciones <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Dragon de Fuego */}
            <div
              className="rounded-2xl overflow-hidden group cursor-pointer border border-[#1e4080] relative h-72"
              onClick={onSeeAttractions}
              style={{ boxShadow: '0 4px 32px 0 rgba(1,26,72,0.5)' }}
            >
              <img
                src={`${BASE}images/dragon-coaster.jpg`}
                alt="Dragon de Fuego"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(1,26,72,0.15) 0%, rgba(1,26,72,0.55) 45%, rgba(1,26,72,0.92) 100%)' }} />
              <span className="absolute top-4 left-4 bg-[#e8003a] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                Extrema
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-black text-2xl mb-1.5 drop-shadow-lg">Dragon de Fuego</h3>
                <p className="text-white/75 text-sm mb-4 leading-relaxed">
                  La montaña rusa más rápida de la región. Alcanza los 120km/h en un recorrido
                  lleno de adrenalina y giros inolvidables.
                </p>
                <button className="px-5 py-2 bg-[#011a48] border-2 border-[#0039ca] hover:bg-[#0039ca]/30 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5">
                  Ver Detalles →
                </button>
              </div>
            </div>

            {/* Castillo Mágico */}
            <div
              className="rounded-2xl overflow-hidden group cursor-pointer border border-[#1e4080] relative h-72"
              onClick={onSeeAttractions}
              style={{ boxShadow: '0 4px 32px 0 rgba(1,26,72,0.5)' }}
            >
              <img
                src={`${BASE}images/castillo-magico.jpg`}
                alt="Castillo Mágico"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(1,26,72,0.15) 0%, rgba(1,26,72,0.55) 45%, rgba(1,26,72,0.92) 100%)' }} />
              <span className="absolute top-4 left-4 bg-[#0039ca] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                Familiar
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-black text-2xl mb-1.5 drop-shadow-lg">Castillo Mágico</h3>
                <p className="text-white/75 text-sm mb-4 leading-relaxed">
                  Un viaje encantado para las aventuras familiares. Vive la magia en cada rincón
                  de la fantasía.
                </p>
                <button className="px-5 py-2 bg-[#011a48] border-2 border-[#0039ca] hover:bg-[#0039ca]/30 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5">
                  Explorar →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planifica tu Visita */}
      <section className="py-16 px-6 bg-[#f0f4fd]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-10">Planifica tu Visita</h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              {/* Horarios */}
              <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Clock size={20} className="text-[#c0052d]" />
                  </div>
                  <h3 className="font-black text-gray-900">Horarios de Apertura</h3>
                </div>
                <div className="space-y-1.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Lunes – Viernes</span>
                    <span className="font-semibold">10:00 – 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados – Domingos</span>
                    <span className="font-semibold">09:00 – 21:00</span>
                  </div>
                </div>
                <p className="text-xs text-[#c0052d] mt-3">
                  *Los horarios pueden variar en días festivos.
                </p>
              </div>

              {/* Restaurantes y Parking */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-blue-100 p-5 flex flex-col items-center gap-2 shadow-sm">
                  <Utensils size={28} className="text-[#c0052d]" />
                  <span className="text-sm font-semibold text-gray-700">Restaurantes</span>
                </div>
                <div className="bg-white rounded-2xl border border-blue-100 p-5 flex flex-col items-center gap-2 shadow-sm">
                  <ParkingSquare size={28} className="text-[#c0052d]" />
                  <span className="text-sm font-semibold text-gray-700">Parking Gratis</span>
                </div>
              </div>

              <button className="w-full py-4 bg-[#011a48] hover:bg-[#000d24] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border-2 border-[#0039ca]">
                <Shield size={18} /> Ver Guía de Seguridad →
              </button>
            </div>

            {/* Mapa */}
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-full min-h-72 bg-gray-200 shadow-sm">
              <img
                src={`${BASE}images/mapa-parque.jpg`}
                alt="Mapa del Parque"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl shadow-lg px-4 py-3">
                <div className="font-bold text-gray-900 text-sm">Mapa Interactivo</div>
                <div className="text-xs text-gray-500">Localiza tus atracciones favoritas</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
