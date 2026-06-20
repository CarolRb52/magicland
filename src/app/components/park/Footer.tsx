import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contacto" className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#FF5E66]">MagicLand</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              El parque de atracciones más emocionante de España.
              Diversión garantizada para toda la familia.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#F6131E]/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-[#F6131E]/30 transition-colors border border-[#F6131E]/20">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#F6131E]/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-[#F6131E]/30 transition-colors border border-[#F6131E]/20">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#F6131E]/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-[#F6131E]/30 transition-colors border border-[#F6131E]/20">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#F6131E]/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-[#F6131E]/30 transition-colors border border-[#F6131E]/20">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nuestras Atracciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Precios y Tickets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eventos Especiales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Información</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Normas del Parque</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabaja con Nosotros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Av. de la Diversión 123<br />28001 Ciudad Mágica, España</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+34 900 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@magicland.es</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 MagicLand. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
