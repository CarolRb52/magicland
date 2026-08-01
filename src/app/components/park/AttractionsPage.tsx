import { useState } from 'react';
import { Clock, Star, ChevronLeft, ChevronRight, X, SlidersHorizontal } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

type Categoria = 'Extrema' | 'Agua' | 'Familiar' | 'Infantil' | 'Espectáculo';

interface Atraccion {
  id: string;
  nombre: string;
  categoria: Categoria;
  espera: number;
  valoracion: number;
  altura: string | null;
  descripcion: string;
  img: string;
}

const TODAS: Atraccion[] = [
  {
    id: 'dragon',
    nombre: 'Dragon de Fuego',
    categoria: 'Extrema',
    espera: 25,
    valoracion: 4.9,
    altura: '140cm',
    descripcion: 'La montaña rusa más rápida del parque. Vive la emoción de un lanzamiento a 120km/h con giros extremos.',
    img: `${BASE}images/dragon-coaster.jpg`,
  },
  {
    id: 'poseidon',
    nombre: 'La Venganza de Poseidón',
    categoria: 'Agua',
    espera: 15,
    valoracion: 4.7,
    altura: '120cm',
    descripcion: 'Prepárate para mojarte en nuestra aventura acuática más épica. Descensos y salpicaduras garantizadas.',
    img: `${BASE}images/poseidon-revenge.jpg`,
  },
  {
    id: 'carrusel',
    nombre: 'Gran Carrusel',
    categoria: 'Familiar',
    espera: 5,
    valoracion: 4.5,
    altura: null,
    descripcion: 'Un clásico mágico para toda la familia. Disfruta de un paseo encantado bajo las estrellas del parque.',
    img: `${BASE}images/gran-carrusel.jpg`,
  },
  {
    id: 'castillo',
    nombre: 'Castillo Mágico',
    categoria: 'Familiar',
    espera: 10,
    valoracion: 4.6,
    altura: null,
    descripcion: 'Un viaje interactivo por las leyendas de MagicLand. Ideal para los más pequeños y toda la familia.',
    img: `${BASE}images/castillo-magico.jpg`,
  },
  {
    id: 'galactico',
    nombre: 'Vacío Galáctico 4D',
    categoria: 'Extrema',
    espera: 45,
    valoracion: 5.0,
    altura: '110cm',
    descripcion: 'Viaja a través del hiperespacio en nuestra experiencia 4D más inmersiva. ¡Una aventura fuera de este mundo!',
    img: `${BASE}images/dragon-coaster.jpg`,
  },
  {
    id: 'expedicion',
    nombre: 'Expedición Jungla',
    categoria: 'Agua',
    espera: 10,
    valoracion: 4.3,
    altura: null,
    descripcion: 'Un viaje relajante por el corazón de la jungla. Descubre criaturas exóticas en una aventura fluvial.',
    img: `${BASE}images/poseidon-revenge.jpg`,
  },
  {
    id: 'kraken',
    nombre: 'El Abrazo del Kraken',
    categoria: 'Extrema',
    espera: 60,
    valoracion: 4.8,
    altura: '130cm',
    descripcion: 'Balancéate 40 metros en el aire a 100km/h. Esta atracción pendular pondrá a prueba tu valentía.',
    img: `${BASE}images/noria-parque.jpg`,
  },
  {
    id: 'noria',
    nombre: 'Gran Noria',
    categoria: 'Familiar',
    espera: 5,
    valoracion: 4.4,
    altura: null,
    descripcion: 'Vistas panorámicas de todo el parque desde 60 metros de altura. Una experiencia tranquila e impresionante.',
    img: `${BASE}images/noria-parque.jpg`,
  },
  {
    id: 'bosque',
    nombre: 'Bosque Encantado',
    categoria: 'Infantil',
    espera: 5,
    valoracion: 4.7,
    altura: null,
    descripcion: 'Zona de juegos y aventuras para los más pequeños. Un mundo de magia diseñado especialmente para ellos.',
    img: `${BASE}images/castillo-magico.jpg`,
  },
];

const CATEGORIAS: Categoria[] = ['Extrema', 'Agua', 'Familiar', 'Infantil', 'Espectáculo'];
const POR_PAGINA = 6;

const colorCategoria: Record<Categoria, string> = {
  Extrema: 'bg-[#e8003a]',
  Agua: 'bg-blue-600',
  Familiar: 'bg-[#0039ca]',
  Infantil: 'bg-purple-600',
  Espectáculo: 'bg-amber-600',
};

export function AttractionsPage() {
  const [seleccionadas, setSeleccionadas] = useState<Set<Categoria>>(new Set(CATEGORIAS));
  const [maxEspera, setMaxEspera] = useState(120);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosActivos, setFiltrosActivos] = useState<string[]>([]);

  function toggleCategoria(cat: Categoria) {
    setSeleccionadas(prev => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
        setFiltrosActivos(f => [...f, cat]);
      } else {
        next.add(cat);
        setFiltrosActivos(f => f.filter(x => x !== cat));
      }
      return next;
    });
    setPaginaActual(1);
  }

  function quitarFiltro(label: string) {
    if (CATEGORIAS.includes(label as Categoria)) {
      setSeleccionadas(prev => { const n = new Set(prev); n.add(label as Categoria); return n; });
      setFiltrosActivos(f => f.filter(x => x !== label));
    }
  }

  function limpiarFiltros() {
    setSeleccionadas(new Set(CATEGORIAS));
    setMaxEspera(120);
    setFiltrosActivos([]);
    setPaginaActual(1);
  }

  const filtradas = TODAS.filter(a => seleccionadas.has(a.categoria) && a.espera <= maxEspera);
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const pagina = Math.min(paginaActual, totalPaginas);
  const visibles = filtradas.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <main className="bg-[#f0f6fd]">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={`${BASE}images/banner-atracciones.jpg`}
          alt="Atracciones MagicLand"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#011a48]/85 via-[#011a48]/60 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-8 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Atracciones del Parque</h1>
          <p className="text-white/75 max-w-xl">
            Desde montañas rusas de adrenalina hasta aventuras acuáticas, explora la magia
            que te espera en cada rincón de MagicLand.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Chips de filtros activos */}
        {filtrosActivos.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filtrosActivos.map(f => (
              <span key={f} className="flex items-center gap-1.5 bg-[#c0052d] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {f} <button onClick={() => quitarFiltro(f)}><X size={12} /></button>
              </span>
            ))}
            {maxEspera < 120 && (
              <span className="flex items-center gap-1.5 bg-[#c0052d] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Espera &lt; {maxEspera} min <button onClick={() => setMaxEspera(120)}><X size={12} /></button>
              </span>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar filtros */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-blue-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <span className="font-black text-gray-900">Filtros</span>
                <SlidersHorizontal size={16} className="text-gray-400" />
              </div>

              <div className="mb-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Busca atracciones</div>
                <input
                  type="text"
                  placeholder="Ej: Dragon de Fuego"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#c0052d]"
                />
              </div>

              <div className="mb-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categoría</div>
                {CATEGORIAS.map(cat => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seleccionadas.has(cat)}
                      onChange={() => toggleCategoria(cat)}
                      className="accent-[#c0052d]"
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>

              <div className="mb-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tiempo máx. de espera</div>
                <input
                  type="range"
                  min={0}
                  max={120}
                  value={maxEspera}
                  onChange={e => { setMaxEspera(+e.target.value); setPaginaActual(1); }}
                  className="w-full accent-[#c0052d]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0 min</span><span>120 min</span>
                </div>
              </div>

              <button
                onClick={limpiarFiltros}
                className="w-full py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-[#f0f6fd] transition-colors"
              >
                Eliminar filtros
              </button>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <div className="text-sm text-gray-500">Mostrando {filtradas.length} resultados</div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibles.map(a => (
                <div
                  key={a.id}
                  className="rounded-2xl overflow-hidden group cursor-pointer border border-[#1e4080] relative h-64"
                  style={{ boxShadow: '0 4px 24px 0 rgba(1,26,72,0.45)' }}
                >
                  <img src={a.img} alt={a.nombre} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(1,26,72,0.10) 0%, rgba(1,26,72,0.50) 40%, rgba(1,26,72,0.93) 100%)' }} />
                  <span className={`absolute top-3 left-3 ${colorCategoria[a.categoria]} text-white text-xs font-black px-2.5 py-1 rounded-full uppercase shadow-lg`}>
                    {a.categoria}
                  </span>
                  <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                    <Clock size={11} /> {a.espera} min
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black text-white drop-shadow-lg">{a.nombre}</h3>
                      <span className="flex items-center gap-1 text-xs font-bold text-[#ff3a5c]">
                        <Star size={12} fill="#ff3a5c" /> {a.valoracion}
                      </span>
                    </div>
                    <p className="text-sm text-white/75 mb-3 line-clamp-2">{a.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">
                        {a.altura ? `Altura mínima: ${a.altura}` : 'Sin límite de altura'}
                      </span>
                      <button className="text-sm font-bold text-white bg-[#011a48] border border-[#0039ca] px-3 py-1 rounded-lg hover:bg-[#0039ca]/30 transition-colors">
                        Ver Detalles →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                  disabled={pagina === 1}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:border-[#c0052d] transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPaginaActual(n)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-colors ${
                      n === pagina
                        ? 'bg-[#c0052d] text-white'
                        : 'border border-gray-300 text-gray-700 hover:border-[#c0052d]'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                  disabled={pagina === totalPaginas}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:border-[#c0052d] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
