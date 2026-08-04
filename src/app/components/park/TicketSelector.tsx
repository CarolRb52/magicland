import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Smile, Star, UsersRound, Clock, Sun, BarChart3, Minus, Plus } from 'lucide-react';
import {
  TICKET_CATALOG,
  calcSubtotal,
  countAdults,
  IVA_RATE,
  MANAGEMENT_FEE,
  type TicketType,
} from '../../constants/tickets';

interface Props {
  selectedTickets: Record<TicketType, number>;
  onTicketChange: (type: TicketType, qty: number) => void;
  onPurchase: () => void;
  totalTickets: number;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: 'TICKETS' },
    { n: 2, label: 'PAGO' },
    { n: 3, label: 'LISTO' },
  ];
  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 ${
              s.n < step
                ? 'bg-gray-700 border-gray-700 text-white'
                : s.n === step
                ? 'bg-[#e8003a] border-[#e8003a] text-white'
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {s.n < step ? '✓' : s.n}
            </div>
            <span className={`text-[10px] font-bold tracking-widest ${s.n === step ? 'text-[#e8003a]' : 'text-gray-400'}`}>
              {s.label}
            </span>
          </div>
          {i < 2 && (
            <div className={`w-24 h-0.5 mb-5 ${s.n < step ? 'bg-gray-700' : 'bg-gray-300'}`} />
          )}
        </div>
      ))}
    </div>
  );
}


function Calendar({ selectedDate, onDateChange }: { selectedDate: string; onDateChange: (d: string) => void }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAY_HEADERS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  // Build calendar grid
  const firstDay = new Date(year, month, 1);
  // In JS, getDay() returns 0=Sun, 1=Mon...6=Sat. We need Mon=0 offset
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  function pad(n: number) { return String(n).padStart(2, '0'); }
  function toISO(d: number) { return `${year}-${pad(month + 1)}-${pad(d)}`; }

  function isPast(d: number) {
    const date = new Date(year, month, d);
    date.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return date < t;
  }

  function isWeekend(colIdx: number) { return colIdx === 5 || colIdx === 6; } // Sáb=5, Dom=6

  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;
  const selectedLabel = selectedDateObj
    ? selectedDateObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-black text-gray-900">{MONTHS_ES[month]} {year}</span>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((d, i) => (
          <div key={d} className={`text-center text-xs font-semibold py-1 ${i >= 5 ? 'text-blue-500' : 'text-gray-500'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso = toISO(d);
          const past = isPast(d);
          const weekend = isWeekend(i % 7);
          const selected = selectedDate === iso;
          return (
            <button
              key={i}
              onClick={() => { if (!past) onDateChange(iso); }}
              disabled={past}
              className={`mx-auto w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                selected
                  ? 'bg-[#e8003a] text-white font-black'
                  : past
                  ? 'text-gray-300 cursor-not-allowed'
                  : weekend
                  ? 'bg-blue-50 text-gray-800 hover:bg-blue-100'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Selected label */}
      {selectedLabel && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Fecha seleccionada: </span>
          <span className="text-xs font-bold text-[#e8003a] capitalize">{selectedLabel}</span>
        </div>
      )}
    </div>
  );
}


const TICKET_FEATURES: Record<TicketType, string[]> = {
  general: ['Acceso a todas las atracciones', 'Espectáculos en vivo incluidos', 'Entrada desde las 10:00h'],
  child:   ['Válido para niños de 3 a 11 años.', 'Acceso zonas infantiles exclusivas', 'Encuentro con personajes', 'Regalo sorpresa de bienvenida'],
  vip:     ['Acceso Rápido Express ilimitado', 'Asientos VIP en espectáculos', 'Parking preferente gratuito', '15% dto en restauración'],
  family:  ['Incluye 2 adultos + 2 niños.', 'Ahorro del 20% vs compra individual', 'Menú familiar incluido (Almuerzo)', 'Foto familiar de recuerdo gratis'],
};

interface CardProps {
  id: TicketType;
  qty: number;
  adultCount: number;
  onInc: () => void;
  onDec: () => void;
}

function TicketCard({ id, qty, adultCount, onInc, onDec }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const t = TICKET_CATALOG.find(x => x.id === id)!;
  const isChild = id === 'child';
  const isVip = id === 'vip';
  const isFamily = id === 'family';
  const cantAdd = isChild && adultCount === 0;
  const childActive = isChild && adultCount > 0;

  const headerStyle: React.CSSProperties =
    id === 'general'
      ? { background: 'linear-gradient(160deg, #00194c 0%, #001744 50%, #00143e 100%)' }
      : id === 'vip'
      ? { background: '#e8003a' }
      : id === 'child'
      ? childActive
        ? { background: '#0039ca' }
        : { background: '#9CA3AF' }
      : { background: '#011a48' }; // family

  const headerTextColor = 'text-white';

  const cardBorder = isVip
    ? 'border-[#e8003a]'
    : isChild && childActive
    ? 'border-[#0039ca]'
    : 'border-gray-200';

  const checkColor = isVip ? 'text-[#e8003a]' : isFamily ? 'text-[#0039ca]' : 'text-[#0039ca]';

  const features = isChild
    ? (expanded ? TICKET_FEATURES.child : TICKET_FEATURES.child.slice(0, 1))
    : TICKET_FEATURES[id];

  const icon =
    id === 'general' ? <Users size={28} /> :
    id === 'child'   ? <Smile size={28} /> :
    id === 'vip'     ? <Star size={28} /> :
                       <UsersRound size={28} />;

  return (
    <div className={`rounded-2xl overflow-hidden border-2 flex flex-col ${cardBorder} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${headerTextColor} p-5 text-center transition-colors duration-300`} style={headerStyle}>
        <div className="flex justify-center mb-2">{icon}</div>
        <div className="font-black text-lg">{t.label}</div>
        <div className="font-black text-2xl mt-1">{t.price.toFixed(2).replace('.', ',')}€</div>
        <div className="text-xs opacity-75 mt-0.5">IVA incluido</div>
      </div>

      {/* Features */}
      <div className="flex-1 p-4 flex flex-col" style={{ minHeight: '200px' }}>
        <ul className="space-y-2 mb-3 flex-1">
          {features.map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
              <span className={`${checkColor} font-bold flex-shrink-0 mt-0.5`}>✓</span>
              {f}
            </li>
          ))}
          {isChild && (
            <li>
              <button
                onClick={() => setExpanded(v => !v)}
                className="text-xs font-bold text-[#0039ca] hover:underline mt-1"
              >
                {expanded ? 'Ver menos ▲' : 'Ver más ▼'}
              </button>
            </li>
          )}
        </ul>

        {isChild && !childActive && (
          <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-800 leading-relaxed">
            Requiere al menos un ticket de adulto.
          </div>
        )}

        <div className="flex items-center justify-between border border-gray-200 rounded-xl p-1.5 mt-auto">
          <button
            onClick={onDec}
            disabled={qty === 0}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-black text-lg text-gray-900">{qty}</span>
          <button
            onClick={onInc}
            disabled={cantAdd}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}


export function TicketSelector({ selectedTickets, onTicketChange, onPurchase, selectedDate, onDateChange }: Props) {
  const [error, setError] = useState('');

  const adultCount = countAdults(selectedTickets);
  const subtotal   = calcSubtotal(selectedTickets);
  const iva        = +(subtotal * IVA_RATE).toFixed(2);
    const fee     = subtotal > 0 ? MANAGEMENT_FEE : 0;
      const total   = +(subtotal + iva + fee).toFixed(2);
  const totalQty   = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
  const onlyKids   = selectedTickets.child > 0 && adultCount === 0;

  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;
  const dateShort = selectedDateObj
    ? selectedDateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  function handleAdd(type: TicketType) {
    if (type === 'child' && adultCount === 0) return;
    onTicketChange(type, selectedTickets[type] + 1);
    setError('');
  }

  function handleRemove(type: TicketType) {
    if (selectedTickets[type] <= 0) return;
    onTicketChange(type, selectedTickets[type] - 1);
    setError('');
  }

  function handleContinue() {
    if (!selectedDate) { setError('Por favor selecciona una fecha de visita'); return; }
    if (totalQty === 0) { setError('Debes seleccionar al menos un ticket'); return; }
    if (onlyKids) { setError('Las entradas infantiles requieren al menos una entrada de adulto'); return; }
    setError('');
    onPurchase();
  }

  return (
    <div className="min-h-screen bg-[#e5edf9]">
      <div className="max-w-6xl mx-auto px-6">
        <ProgressBar step={1} />

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">Reserva tus Entradas</h1>
          <p className="text-sm text-gray-500 mt-1">Selecciona el día de tu visita para ver los mejores precios disponibles.</p>
        </div>

        {/* Calendar + Info del Día */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />

          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5">
            <h3 className="font-black text-gray-900 mb-4">Información del Día</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Clock size={16} className="text-[#e8003a] flex-shrink-0" />
                <span>Horario: 10:00 – 22:00</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Sun size={16} className="text-[#e8003a] flex-shrink-0" />
                <span>Pronóstico: Soleado 28°C</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <BarChart3 size={16} className="text-[#e8003a] flex-shrink-0" />
                <span>Afluencia estimada: Media</span>
              </div>
            </div>

            {selectedDate && (
              <div className="mt-5 pt-4 border-t border-blue-200">
                <p className="text-xs text-gray-500 mb-0.5">Fecha seleccionada:</p>
                <p className="font-black text-[#e8003a] capitalize text-sm">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Ticket cards */}
        <h2 className="font-black text-gray-900 text-xl mb-5">Tickets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
          {TICKET_CATALOG.map(t => (
            <TicketCard
              key={t.id}
              id={t.id}
              qty={selectedTickets[t.id]}
              adultCount={adultCount}
              onInc={() => handleAdd(t.id)}
              onDec={() => handleRemove(t.id)}
            />
          ))}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#011a48] px-6 py-5 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="font-black text-white text-lg">Resumen de tu compra</div>
            <div className="text-gray-400 text-sm">
              {dateShort ? `${dateShort} • ` : ''}{totalQty} Entrada{totalQty !== 1 ? 's' : ''} Seleccionada{totalQty !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-gray-400 text-xs">Total a pagar</div>
              <div className="text-white font-black text-2xl">{total.toFixed(2).replace('.', ',')}€</div>
            </div>
            <button
              onClick={handleContinue}
              className="px-7 py-3.5 bg-[#e8003a] hover:bg-[#b8002e] text-white font-black rounded-xl text-base transition-colors whitespace-nowrap"
            >
              Continuar al pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
