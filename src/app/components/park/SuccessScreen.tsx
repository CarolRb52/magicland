import { CheckCircle, Download, Printer, Home, Mail, MapPin, Utensils } from 'lucide-react';
import {
  TICKET_CATALOG,
  calcSubtotal,
  IVA_RATE,
  MANAGEMENT_FEE,
  type TicketType,
} from '../../constants/tickets';

interface Props {
  selectedTickets: Record<TicketType, number>;
  selectedDate: string;
  bookingCode: string;
  onHome: () => void;
}

function ProgressBar() {
  const steps = [
    { n: 1, label: 'TICKETS' },
    { n: 2, label: 'PAGO' },
    { n: 3, label: 'LISTO' },
  ];
  return (
    <div className="flex items-center justify-center gap-0 py-5">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 ${
              s.n < 3
                ? 'bg-gray-600 border-gray-600 text-white'
                : 'bg-[#e8003a] border-[#e8003a] text-white'
            }`}>
              {s.n < 3 ? '✓' : '3'}
            </div>
            <span className={`text-[10px] font-bold tracking-widest ${s.n === 3 ? 'text-[#e8003a]' : 'text-gray-500'}`}>
              {s.label}
            </span>
          </div>
          {i < 2 && <div className="w-24 h-0.5 mb-5 bg-gray-600" />}
        </div>
      ))}
    </div>
  );
}

const confettiColors = ['#e8003a', '#e8003a', '#ffffff', '#e5edf9', '#ffffff', '#e8003a'];

export function SuccessScreen({ selectedTickets, selectedDate, bookingCode, onHome }: Props) {
  const subtotal  = calcSubtotal(selectedTickets);
  const iva       = +(subtotal * IVA_RATE).toFixed(2);
  const total     = +(subtotal + iva + MANAGEMENT_FEE).toFixed(2);
  const lineItems = TICKET_CATALOG.filter(t => selectedTickets[t.id] > 0);

  const dateLabel = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '—';

  const confetti = Array.from({ length: 28 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-[#e5edf9]">
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
        }
        .confetti-piece {
          animation: confettiFall linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <ProgressBar />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden pb-10 pt-2">
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confetti.map(i => (
            <div
              key={i}
              className="confetti-piece absolute"
              style={{
                width: i % 3 === 0 ? '10px' : '8px',
                height: i % 3 === 0 ? '10px' : '14px',
                backgroundColor: confettiColors[i % confettiColors.length],
                left: `${(i * 71 + 3) % 100}%`,
                top: `-20px`,
                borderRadius: i % 4 === 0 ? '50%' : '2px',
                animationDuration: `${2.5 + (i % 5) * 0.6}s`,
                animationDelay: `${(i * 0.3) % 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative text-center mb-6 px-6">
          <div className="w-16 h-16 rounded-full bg-[#e8003a] flex items-center justify-center mx-auto mb-4 shadow-xl">
            <CheckCircle size={32} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">¡Compra Realizada con Éxito!</h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Tu aventura en MagicLand está a punto de comenzar. Hemos enviado tus entradas y los
            detalles de tu compra a tu correo electrónico.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-5">
          {/* Detalle del pedido */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-0.5">
              <h2 className="font-black text-gray-900 text-base">Detalle de tu Pedido</h2>
              <span className="text-[#e8003a] font-mono text-xs font-bold">◆</span>
            </div>
            <div className="text-xs text-gray-400 mb-0.5">Orden #{bookingCode}</div>
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>Fecha: {dateLabel}</span>
              <span>Visa ●●●● 4242</span>
            </div>

            <div className="space-y-2 mb-3">
              {lineItems.map(t => (
                <div key={t.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{selectedTickets[t.id]}× {t.label}</div>
                    <div className="text-xs text-gray-400">{t.subtitle}</div>
                  </div>
                  <div className="font-bold text-sm text-gray-900">
                    {(t.price * selectedTickets[t.id]).toFixed(2).replace('.', ',')}€
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-gray-100 rounded-xl p-3 space-y-1.5 text-sm mb-4">
              <div className="flex justify-between text-gray-500 text-xs">
                <span>Subtotal</span><span>{subtotal.toFixed(2).replace('.', ',')}€</span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs">
                <span>Impuestos (Incluidos)</span><span>{iva.toFixed(2).replace('.', ',')}€</span>
              </div>
              <div className="flex justify-between font-black text-gray-900 pt-1 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#e8003a]">{total.toFixed(2).replace('.', ',')}€</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-[#0039ca] text-[#0039ca] text-sm font-bold rounded-xl hover:bg-[#0039ca]/10 transition-colors">
              <Printer size={15} /> Imprimir Factura
            </button>
          </div>

          {/* Digital ticket */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
              <h2 className="font-black text-gray-900 mb-1 self-start text-base">Tu Entrada Digital</h2>

              <div className="w-full border-2 border-gray-200 rounded-2xl p-4 mt-2 mb-3">
                <div className="w-36 h-36 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-2">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=144x144&data=MAGICLAND-TICKET"
                    alt="QR Code"
                    className="w-32 h-32 rounded-lg"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="text-xs font-black text-gray-700 tracking-widest">MOSTRAR EN ENTRADA</div>
              </div>

              <p className="text-xs text-gray-500 mb-3">
                Escanea este código en la puerta principal desde tu móvil para entrar directamente.
              </p>

              <button className="w-full py-2.5 bg-[#e8003a] hover:bg-[#b8002e] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Download size={15} /> Descargar Tickets PDF
              </button>
            </div>

            {/* Prepara tu visita */}
            <div className="bg-blue-50 rounded-2xl p-4">
              <h3 className="font-black text-gray-900 text-sm mb-3 flex items-center gap-2">
                🚀 Prepara tu Visita
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail size={15} className="text-[#e8003a]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Revisa tu email</div>
                    <div className="text-xs text-gray-500">Hemos enviado una copia y el recibo a tu correo.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin size={15} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Mapa del Parque</div>
                    <div className="text-xs text-[#e8003a] font-semibold cursor-pointer hover:underline">Descargar mapa interactivo</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Utensils size={15} className="text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Reserva Comida</div>
                    <div className="text-xs text-gray-500">Evita colas reservando tu menú desde nuestra app.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volver a Inicio */}
        <div className="max-w-5xl mx-auto px-6 mt-6">
          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 mx-auto px-8 py-3 border-2 border-gray-300 text-gray-700 text-sm font-bold rounded-xl hover:bg-white transition-colors"
          >
            <Home size={15} /> Volver a Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
