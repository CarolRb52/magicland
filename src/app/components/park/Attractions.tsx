import { Rocket, Waves, Castle, Gamepad2, TreePine, PartyPopper } from 'lucide-react';

// usamos el nombre como key — más estable que el índice del array
const attractions = [
  {
    id: 'dragon',
    name: 'Montaña Rusa Dragón',
    type: 'Extrema',
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-[#F6131E] to-[#CF0610]',
    description: 'La montaña rusa más alta de Europa',
  },
  {
    id: 'rio',
    name: 'Río Salvaje',
    type: 'Agua',
    icon: <Waves className="w-8 h-8" />,
    color: 'from-[#FF5E66] to-[#FF2C36]',
    description: 'Aventura acuática llena de emociones',
  },
  {
    id: 'castillo',
    name: 'Castillo Mágico',
    type: 'Familiar',
    icon: <Castle className="w-8 h-8" />,
    color: 'from-[#FF999E] to-[#FF5E66]',
    description: 'Viaje mágico para toda la familia',
  },
  {
    id: 'vr',
    name: 'Realidad Virtual',
    type: 'Tecnología',
    icon: <Gamepad2 className="w-8 h-8" />,
    color: 'from-[#CF0610] to-[#AB0911]',
    description: 'Experiencia de realidad virtual 360°',
  },
  {
    id: 'bosque',
    name: 'Bosque Encantado',
    type: 'Infantil',
    icon: <TreePine className="w-8 h-8" />,
    color: 'from-[#FFC3C6] to-[#FF999E]',
    description: 'Zona de juegos para los más pequeños',
  },
  {
    id: 'show',
    name: 'Show Nocturno',
    type: 'Espectáculo',
    icon: <PartyPopper className="w-8 h-8" />,
    color: 'from-[#AB0911] to-[#8D0F15]',
    description: 'Espectáculo de luces y música',
  },
];

export function Attractions() {
  return (
    <section id="atracciones" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestras Atracciones
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Más de 30 atracciones diseñadas para toda la familia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map(a => (
            <div
              key={a.id}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-white/30"
            >
              <div className={`bg-gradient-to-br ${a.color} p-8 text-white h-full backdrop-blur-sm`}>
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {a.icon}
                </div>
                <span className="inline-block px-3 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-xs font-semibold mb-3 uppercase tracking-wide border border-white/20">
                  {a.type}
                </span>
                <h3 className="text-2xl font-bold mb-2">{a.name}</h3>
                <p className="text-white/95 text-sm">{a.description}</p>
              </div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
