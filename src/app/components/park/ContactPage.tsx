import { useState } from 'react';
import { ChevronDown, Send, Twitter, Instagram, Youtube } from 'lucide-react';

const FAQS = [
  { q: '¿Cuál es el horario del parque?', a: 'Lunes a Viernes de 10:00 a 19:00. Sábados y Domingos de 09:00 a 21:00. Los horarios pueden variar en días festivos.' },
  { q: '¿Se pueden comprar entradas en taquilla?', a: 'Sí, puedes comprar entradas en taquilla el mismo día, aunque recomendamos comprar online para evitar colas y aprovechar los mejores precios.' },
  { q: '¿Hay opciones de comida para alérgicos?', a: 'Sí, contamos con menús especiales para personas con alergias alimentarias. Consulta en cualquiera de nuestros restaurantes.' },
  { q: '¿Cómo funciona el FastPass?', a: 'El FastPass te permite saltarte las colas en las atracciones más populares. Está disponible al comprar tu entrada VIP Gold o Pack Familiar.' },
];

const RULES = [
  'Seguridad primero. Siga las instrucciones del personal en todo momento.',
  'Prohibido el ingreso de envases de vidrio y objetos punzantes.',
  'Espacio libre de humo. Solo se permite fumar en áreas designadas.',
  'Los menores deben estar acompañados por un adulto responsable.',
];

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Información General', message: '' });

  return (
    <main>
      {/* Header */}
      <div className="px-8 py-14 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Centro de Ayuda y Contacto</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Estamos aquí para hacer que tu visita a MagicLand sea una experiencia inolvidable.
          Encuentra respuestas y ponte en contacto con nosotros.
        </p>
      </div>

      {/* Map + Rules */}
      <div className="px-8 pb-16 max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
        {/* Map */}
        <div className="md:col-span-3 rounded-2xl overflow-hidden border border-blue-100 min-h-72 relative">
          <img
            src={`${import.meta.env.BASE_URL}images/mapa-contacto.png`}
            alt="Mapa de ubicación MagicLand"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.75 }}
          />
          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 z-10 max-w-xs">
            <div className="font-bold text-gray-900 text-sm mb-1">Cómo llegar</div>
            <p className="text-xs text-gray-500">
              Estamos ubicados en el corazón del Valle de la Alegría, con acceso directo desde la Autopista Central.
            </p>
            <div className="text-xs text-[#e8003a] font-semibold mt-2">🅿 Parking gratuito incluido</div>
          </div>
        </div>

        {/* Rules */}
        <div className="md:col-span-2 bg-[#e8003a] text-white rounded-2xl p-6">
          <h3 className="text-lg font-black mb-4">Reglas del Parque</h3>
          <ul className="space-y-3">
            {RULES.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">✓</span>
                {r}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full py-2.5 bg-white text-[#e8003a] font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors">
            Ver Reglamento Completo
          </button>
        </div>
      </div>

      {/* FAQ + Form */}
      <div className="px-8 pb-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-blue-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 text-sm hover:bg-[#f0f6fd] transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm font-semibold text-[#e8003a] hover:underline">
            Ver todas las preguntas →
          </button>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Envíanos un mensaje</h2>
          <p className="text-sm text-gray-500 mb-6">Responderemos a tu consulta en menos de 24 horas laborables.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Nombre Completo</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ej: Juan"
                  className="w-full border border-blue-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8003a]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Correo Electrónico</label>
                <input
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="juan@ejemplo.com"
                  className="w-full border border-blue-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8003a]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Asunto</label>
              <select
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full border border-blue-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8003a] bg-white"
              >
                <option>Información General</option>
                <option>Reservas y Tickets</option>
                <option>Atracciones</option>
                <option>Sugerencias</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Mensaje</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="¿En qué podemos ayudarte?"
                rows={5}
                className="w-full border border-blue-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8003a] resize-none"
              />
            </div>

            <button className="w-full py-3.5 bg-[#e8003a] hover:bg-[#b8002e] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Send size={16} /> Enviar Mensaje
            </button>
          </div>
        </div>
      </div>

      {/* Social Banner */}
      <div className="bg-[#011a48] py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-black text-white text-lg">Únete a la comunidad</div>
            <div className="text-gray-400 text-sm">Síguenos para sorteos, noticias y ofertas relámpago.</div>
          </div>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
