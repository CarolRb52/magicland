import { Clock, Gamepad2, TreePine, PartyPopper } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const attractions = [
  {
    id: 'dragon',
    name: 'Montaña Rusa Dragón',
    type: 'Extrema',
    wait: '25 min',
    img: `${BASE}images/dragon-coaster.jpg`,
    description: 'La montaña rusa más alta de Europa',
  },
  {
    id: 'rio',
    name: 'Jungle Rapids',
    type: 'Agua',
    wait: '15 min',
    img: `${BASE}images/jungle-rapids.jpg`,
    description: 'Aventura acuática llena de emociones',
  },
  {
    id: 'castillo',
    name: 'Castillo Mágico',
    type: 'Familiar',
    wait: '10 min',
    img: `${BASE}images/castillo-magico.jpg`,
    description: 'Viaje mágico para toda la familia',
  },
  {
    id: 'noria',
    name: 'Gran Noria',
    type: 'Panorámica',
    wait: '5 min',
    img: `${BASE}images/noria-parque.jpg`,
    description: 'Vistas espectaculares de todo el parque',
  },
  {
    id: 'bosque',
    name: 'Bosque Encantado',
    type: 'Infantil',
    icon: <TreePine className="w-10 h-10" />,
    color: 'from-green-700 to-green-500',
    description: 'Zona de juegos para los más pequeños',
  },
  {
    id: 'show',
    name: 'Show Nocturno',
    type: 'Espectáculo',
    icon: <PartyPopper className="w-10 h-10" />,
    color: 'from-[#AB0911] to-[#c0052d]',
    description: 'Espectáculo de luces y música en vivo',
  },
];

export function Attractions() {
  return (
    <section id="atracciones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Nuestras Atracciones
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Más de 30 atracciones diseñadas para toda la familia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map(a => (
            <div
              key={a.id}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100"
            >
              {a.img ? (
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#c0052d] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {a.type}
                  </span>
                  <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                    <Clock size={11} /> {a.wait}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-black text-xl">{a.name}</h3>
                    <p className="text-white/80 text-sm">{a.description}</p>
                  </div>
                </div>
              ) : (
                <div className={`bg-gradient-to-br ${a.color} p-8 text-white h-52 flex flex-col justify-between`}>
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                      {a.type}
                    </span>
                    <div className="mb-3 group-hover:scale-110 transition-transform">{a.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1">{a.name}</h3>
                    <p className="text-white/90 text-sm">{a.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
