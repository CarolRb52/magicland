import { Twitter, Instagram, Youtube } from 'lucide-react';

type Page = 'home' | 'attractions' | 'tickets' | 'contact';

interface Props {
  onNav: (p: Page) => void;
}

export function Footer({ onNav }: Props) {
  return (
    <footer
      className="text-[#f1f6fd] pt-12 pb-6"
      style={{ background: 'linear-gradient(160deg, #00194c 0%, #001744 50%, #00143e 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-2xl font-black text-[#f1f6fd] mb-3">MagicLand</div>
            <p className="text-[#f1f6fd]/60 text-sm leading-relaxed mb-5">
              Creamos experiencias extraordinarias que trascienden la imaginación.
              Tu destino número uno para la diversión familiar.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-[#f1f6fd]">Explorar</h4>
            <ul className="space-y-2.5 text-sm text-[#f1f6fd]/60">
              <li><button onClick={() => onNav('home')} className="hover:text-[#f1f6fd] transition-colors">Sitemap</button></li>
              <li><button onClick={() => onNav('attractions')} className="hover:text-[#f1f6fd] transition-colors">Atracciones</button></li>
              <li><a href="#" className="hover:text-[#f1f6fd] transition-colors">Espectáculos</a></li>
              <li><a href="#" className="hover:text-[#f1f6fd] transition-colors">Restaurantes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-[#f1f6fd]">Legal</h4>
            <ul className="space-y-2.5 text-sm text-[#f1f6fd]/60">
              <li><a href="#" className="hover:text-[#f1f6fd] transition-colors">Políticas de Privacidad</a></li>
              <li><a href="#" className="hover:text-[#f1f6fd] transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-[#f1f6fd] transition-colors">Guía de seguridad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 text-[#f1f6fd]">Ayuda</h4>
            <ul className="space-y-2.5 text-sm text-[#f1f6fd]/60">
              <li><button onClick={() => onNav('contact')} className="hover:text-[#f1f6fd] transition-colors">Contacto</button></li>
              <li><button onClick={() => onNav('contact')} className="hover:text-[#f1f6fd] transition-colors">Preguntas Frecuentes</button></li>
              <li><a href="#" className="hover:text-[#f1f6fd] transition-colors">Accesibilidad</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-[#f1f6fd]/40 text-xs">
          © 2026 MagicLand Amusement Parks. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
