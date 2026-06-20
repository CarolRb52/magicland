import { useState } from 'react';
import { Users, Crown, Heart, Plus, Minus, ShoppingCart, Baby, Calendar, AlertCircle, Info } from 'lucide-react';
import {
  TICKET_CATALOG,
  MAX_TICKETS_PER_ORDER,
  calcSubtotal,
  countAdults,
  countHeads,
  type TicketType,
} from '../../constants/tickets';

interface TicketSelectorProps {
  selectedTickets: Record<TicketType, number>;
  onTicketChange: (type: TicketType, quantity: number) => void;
  onPurchase: () => void;
  totalTickets: number;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

// Icono y color por tipo de ticket — separado de los datos de precio
const TICKET_META: Record<TicketType, { icon: React.ReactNode; color: string }> = {
  general: { icon: <Users className="w-8 h-8" />,  color: 'bg-gradient-to-br from-[#FF5E66] to-[#FF2C36]' },
  child:   { icon: <Baby className="w-8 h-8" />,   color: 'bg-gradient-to-br from-[#FFC3C6] to-[#FF999E]' },
  vip:     { icon: <Crown className="w-8 h-8" />,  color: 'bg-gradient-to-br from-[#F6131E] to-[#CF0610]' },
  family:  { icon: <Heart className="w-8 h-8" />,  color: 'bg-gradient-to-br from-[#CF0610] to-[#AB0911]' },
};

// Features descriptivas — solo UI, no lógica de negocio
const TICKET_FEATURES: Record<TicketType, string[]> = {
  general: [
    'Acceso ilimitado a todas las atracciones',
    'Válido por 1 día',
    'Incluye espectáculos',
    'Mapa del parque incluido',
  ],
  child: [
    'Acceso a todas las atracciones infantiles',
    'Válido por 1 día',
    'Incluye espectáculos',
    'Requiere entrada de adulto',
  ],
  vip: [
    'Acceso Fast Pass (sin colas)',
    'Zona VIP exclusiva',
    'Parking preferente',
    'Descuento 20% en restaurantes',
    'Meet & Greet con personajes',
  ],
  family: [
    '4 entradas generales incluidas',
    'Comida para 4 personas',
    'Foto familiar gratis',
    'Acceso a zona infantil premium',
    'Souvenir de regalo',
  ],
};

/* ─── TicketCard ────────────────────────────────────────────── */

interface CardProps {
  ticketId: TicketType;
  quantity: number;
  adultCount: number;
  highlighted: boolean; // aviso rojo si intentaron comprar sin adulto
  onIncrease: () => void;
  onDecrease: () => void;
}

function TicketCard({ ticketId, quantity, adultCount, highlighted, onIncrease, onDecrease }: CardProps) {
  const catalog = TICKET_CATALOG.find(t => t.id === ticketId)!;
  const meta    = TICKET_META[ticketId];
  const isChild = ticketId === 'child';

  const noAdult      = isChild && adultCount === 0;
  const maxKidsReached = isChild && quantity >= adultCount && adultCount > 0;
  const cantAdd      = noAdult || maxKidsReached;

  return (
    <div className={`bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border transition-all ${
      highlighted
        ? 'border-amber-400/60 ring-2 ring-amber-300/50'
        : 'border-white/40 hover:shadow-2xl hover:border-[#FF5E66]/30'
    }`}>
      {/* Cabecera con color */}
      <div className={`${meta.color} p-6 text-white relative`}>
        {isChild && (
          <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold border border-white/30">
            Requiere adulto
          </span>
        )}
        <div className="flex items-center gap-3 mb-3">
          {meta.icon}
          <h3 className="text-2xl font-bold">{catalog.label}</h3>
        </div>
        <p className="text-4xl font-bold mb-1">{catalog.price} €</p>
        <p className="text-sm text-white/90">{catalog.subtitle}</p>
      </div>

      {/* Cuerpo */}
      <div className="p-6 bg-white/50 backdrop-blur-sm">
        <ul className="space-y-2 mb-5">
          {TICKET_FEATURES[ticketId].map(f => (
            <li key={f} className="flex items-start gap-2 text-gray-800 text-sm">
              <span className="text-[#F6131E] font-bold mt-0.5">✓</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Avisos inline */}
        {noAdult && (
          <div className="mb-4 bg-amber-50 border border-amber-300/60 rounded-xl p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Añade primero una entrada de adulto para poder comprar entradas infantiles.
            </p>
          </div>
        )}
        {maxKidsReached && (
          <div className="mb-4 bg-amber-50 border border-amber-300/60 rounded-xl p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Máximo {adultCount} niño{adultCount !== 1 ? 's' : ''} por adulto.
            </p>
          </div>
        )}

        {/* Selector de cantidad */}
        <div className={`flex items-center justify-between rounded-xl p-2 border ${
          noAdult ? 'bg-gray-100/60 border-gray-200/40' : 'bg-white/60 backdrop-blur-md border-white/50'
        }`}>
          <button
            onClick={onDecrease}
            disabled={quantity === 0}
            className="w-10 h-10 rounded-lg bg-white/80 border border-gray-200/50 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <Minus className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
          <button
            onClick={onIncrease}
            disabled={cantAdd}
            className="w-10 h-10 rounded-lg bg-[#F6131E] flex items-center justify-center hover:bg-[#CF0610] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── TicketSelector ─────────────────────────────────────────── */

export function TicketSelector({
  selectedTickets,
  onTicketChange,
  onPurchase,
  totalTickets,
  selectedDate,
  onDateChange,
}: TicketSelectorProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [childBlocked, setChildBlocked] = useState(false);

  const adultCount    = countAdults(selectedTickets);
  const totalPax      = countHeads(selectedTickets);
  const onlyKids      = selectedTickets.child > 0 && adultCount === 0;
  const subtotal      = calcSubtotal(selectedTickets);
  const minDate       = new Date().toISOString().split('T')[0];

  function showError(msg: string) {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 4000);
  }

  function handleAdd(type: TicketType) {
    if (totalPax >= MAX_TICKETS_PER_ORDER) {
      showError(`Máximo ${MAX_TICKETS_PER_ORDER} tickets por compra`);
      return;
    }
    if (type === 'child') {
      if (adultCount === 0)                            return; // aviso inline ya lo explica
      if (selectedTickets.child >= adultCount)         return;
    }
    if (type !== 'child') setChildBlocked(false);
    setErrorMsg('');
    onTicketChange(type, selectedTickets[type] + 1);
  }

  function handleRemove(type: TicketType) {
    if (selectedTickets[type] <= 0) return;
    onTicketChange(type, selectedTickets[type] - 1);
    setErrorMsg('');
    setChildBlocked(false);
  }

  function handlePurchaseClick() {
    if (!selectedDate) {
      showError('Por favor selecciona una fecha de visita');
      return;
    }
    if (totalTickets === 0) {
      showError('Debes seleccionar al menos un ticket');
      return;
    }
    if (onlyKids) {
      setChildBlocked(true);
      document.getElementById('child-warning-banner')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setChildBlocked(false);
    onPurchase();
  }

  const dateLabel = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  return (
    <section id="tickets" className="py-20 bg-gradient-to-b from-white/50 to-transparent">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Selecciona tus Tickets
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Elige el mejor ticket para tu visita a MagicLand y disfruta de una experiencia inolvidable
          </p>

          {/* Selector de fecha */}
          <div className="max-w-md mx-auto bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40 mb-8">
            <label className="flex items-center gap-3 text-gray-800 font-semibold mb-3">
              <Calendar className="w-6 h-6 text-[#F6131E]" />
              Selecciona tu fecha de visita
            </label>
            <input
              type="date"
              value={selectedDate}
              min={minDate}
              onChange={e => { onDateChange(e.target.value); setErrorMsg(''); }}
              className="w-full px-4 py-3 border border-gray-300/50 bg-white/70 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6131E]/50 focus:border-[#F6131E]/50 text-lg font-medium"
            />
          </div>

          {/* Error genérico */}
          {errorMsg && (
            <div className="max-w-md mx-auto bg-[#F6131E]/10 border border-[#F6131E]/30 rounded-xl p-4 mb-8 flex items-center gap-3 animate-pulse">
              <AlertCircle className="w-6 h-6 text-[#F6131E] shrink-0" />
              <p className="text-[#F6131E] font-medium text-sm">{errorMsg}</p>
            </div>
          )}

          {/* Aviso: intentó comprar solo entradas infantiles */}
          {childBlocked && (
            <div
              id="child-warning-banner"
              className="max-w-2xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl border-2 border-amber-400/70"
              role="alert"
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg">No puedes comprar solo entradas infantiles</p>
                  <p className="text-white/85 text-sm">Se requiere al menos una entrada de adulto</p>
                </div>
              </div>
              <div className="bg-amber-50 px-6 py-5">
                <p className="text-amber-900 text-sm font-medium mb-4 leading-relaxed">
                  Los menores de 12 años deben ir acompañados de al menos un adulto. Añade una{' '}
                  <strong>Entrada General</strong>, <strong>Entrada VIP</strong> o un{' '}
                  <strong>Pack Familiar</strong> para continuar.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {(['general', 'vip', 'family'] as TicketType[]).map(type => {
                    const t = TICKET_CATALOG.find(c => c.id === type)!;
                    const m = TICKET_META[type];
                    return (
                      <button
                        key={type}
                        onClick={() => { handleAdd(type); setChildBlocked(false); }}
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-amber-300/50 hover:border-[#F6131E]/50 hover:bg-[#FFF0F1] transition-all shadow-sm group"
                      >
                        <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center shadow`}>
                          <span className="text-white scale-75">{m.icon}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-800 group-hover:text-[#F6131E]">
                          + {t.label.replace('Entrada ', '').replace('Pack ', '')}
                        </span>
                        <span className="text-xs text-gray-500">{t.price} €</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Contador */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-6 py-3 shadow-md border border-white/40">
            <span className="text-gray-700 font-medium">Total de tickets:</span>
            <span className="text-2xl font-bold text-[#F6131E]">{totalPax}</span>
            <span className="text-gray-500">/ {MAX_TICKETS_PER_ORDER}</span>
          </div>
        </div>

        {/* Grid de tickets — orden: General, Infantil, VIP, Familiar */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TICKET_CATALOG.map(t => (
            <TicketCard
              key={t.id}
              ticketId={t.id}
              quantity={selectedTickets[t.id] ?? 0}
              adultCount={adultCount}
              highlighted={childBlocked && t.id === 'child'}
              onIncrease={() => handleAdd(t.id)}
              onDecrease={() => handleRemove(t.id)}
            />
          ))}
        </div>

        {/* Resumen de compra */}
        {totalTickets > 0 && (
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/40">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Resumen de Compra</h3>
                <p className="text-gray-600">
                  {totalPax} entrada{totalPax !== 1 ? 's' : ''} seleccionada{totalPax !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-4xl font-bold text-[#F6131E]">{subtotal} €</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 border-t border-gray-300/50 pt-5">
              {TICKET_CATALOG.filter(t => (selectedTickets[t.id] ?? 0) > 0).map(t => (
                <div key={t.id} className="flex justify-between text-gray-800">
                  <span>{t.label} × {selectedTickets[t.id]}</span>
                  <span className="font-semibold">{selectedTickets[t.id] * t.price} €</span>
                </div>
              ))}
              {dateLabel && (
                <div className="flex justify-between text-gray-600 text-sm pt-3 border-t border-gray-300/50 capitalize">
                  <span>Fecha de visita</span>
                  <span className="font-medium">{dateLabel}</span>
                </div>
              )}
            </div>

            {onlyKids && (
              <div className="mb-4 bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-800 text-sm font-medium">
                  Tienes solo entradas infantiles. Añade al menos una entrada de adulto para continuar.
                </p>
              </div>
            )}

            <button
              onClick={handlePurchaseClick}
              className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                onlyKids
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#F6131E] to-[#CF0610] hover:from-[#CF0610] hover:to-[#AB0911] hover:scale-[1.02]'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {onlyKids ? 'Añade una entrada de adulto para continuar' : 'Proceder al Pago'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
