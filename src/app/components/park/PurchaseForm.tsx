import { useState, useRef } from 'react';
import { User, CreditCard, Lock, HelpCircle, AlertTriangle } from 'lucide-react';
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
  onClose: () => void;
  onSuccess?: () => void;
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

function formatCardNumber(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

export function PurchaseForm({ selectedTickets, selectedDate, onClose, onSuccess }: Props) {
  const [payMethod, setPayMethod] = useState<'card' | 'wallet'>('card');
  const [accepted, setAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [pais, setPais] = useState('España');
  const [dni, setDni] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cardNameRef   = useRef<HTMLInputElement>(null);
  const cardNumberRef = useRef<HTMLInputElement>(null);
  const expiryRef     = useRef<HTMLInputElement>(null);
  const cvvRef        = useRef<HTMLInputElement>(null);

  const subtotal = calcSubtotal(selectedTickets);
  const iva      = +(subtotal - subtotal / (1 + IVA_RATE)).toFixed(2); // IVA ya incluido en el precio
    const total    = +(subtotal + MANAGEMENT_FEE).toFixed(2);
  const lineItems = TICKET_CATALOG.filter(t => selectedTickets[t.id] > 0);
  const hasChild  = selectedTickets.child > 0;
  const hasAdult  = selectedTickets.general > 0 || selectedTickets.vip > 0 || selectedTickets.family > 0;

  const fieldClass = (field: string) =>
    `w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8003a] transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  function validate() {
    const e: Record<string, string> = {};
    if (!nombre.trim()) e.nombre = 'Obligatorio';
    if (!apellidos.trim()) e.apellidos = 'Obligatorio';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email no válido';
    if (!dni.trim()) e.dni = 'Obligatorio';
    if (payMethod === 'card') {
      if ((cardNameRef.current?.value ?? '').trim().length < 3) e.cardName = 'Obligatorio';
      if ((cardNumberRef.current?.value ?? '').replace(/\s/g, '').length < 16) e.cardNumber = 'Número incompleto';
      if ((expiryRef.current?.value ?? '').length < 5) e.expiry = 'Fecha inválida';
      if ((cvvRef.current?.value ?? '').length < 3) e.cvv = 'CVV inválido';
    }
    if (!accepted) e.terms = 'Debes aceptar los términos';
    return e;
  }

  function handlePay() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (cardNameRef.current)   cardNameRef.current.value   = '';
      if (cardNumberRef.current) cardNumberRef.current.value = '';
      if (expiryRef.current)     expiryRef.current.value     = '';
      if (cvvRef.current)        cvvRef.current.value        = '';
      setNombre('');
      setApellidos('');
      setEmail('');
      setDni('');
      onSuccess?.();
    }
  }

  return (
    <div className="min-h-screen bg-[#e5edf9]">
      <div className="max-w-6xl mx-auto px-6">
        <ProgressBar step={2} />
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-800 mb-4 transition-colors"
        >
          ← Volver a Tickets
        </button>

        <div className="grid md:grid-cols-5 gap-6 pb-16">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h2 className="font-black text-gray-900 text-lg mb-4">Resumen de Compra</h2>

              <div className="space-y-3 mb-4">
                {lineItems.map(t => (
                  <div key={t.id}>
                    <div className="flex justify-between text-sm font-semibold text-gray-800">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[#e8003a] font-black">✓</span>
                        {t.label} ({t.subtitle})
                      </span>
                      <span>{(t.price * selectedTickets[t.id]).toFixed(2).replace('.', ',')}€</span>
                    </div>
                    <div className="text-xs text-gray-400 ml-5">{selectedTickets[t.id]}x {t.price.toFixed(2).replace('.', ',')}€</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-500">
               <span>Subtotal <span className="text-gray-400">(IVA incl.)</span></span>
               <span>{subtotal.toFixed(2).replace('.', ',')}€</span>
           </div>

            <div className="flex justify-between text-gray-500">
            <span>Gastos de gestión</span>
            <span>{MANAGEMENT_FEE.toFixed(2).replace('.', ',')}€</span>
          </div>
                <p className="text-xs text-gray-400 -mt-1">
                   Cargo único por emisión y envío digital de las entradas.
                </p>

         <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
           <span>Total</span>
           <span className="text-[#e8003a]">{total.toFixed(2).replace('.', ',')}€</span>
           </div>

       <div className="flex justify-between text-gray-300">
           <span>IVA (21%)</span><span>{iva.toFixed(2).replace('.', ',')}€</span>
       </div>
              
              </div> 
              

              {/* Child warning */}
              {hasChild && !hasAdult && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2">
                  <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 font-medium">
                    Las entradas infantiles solo pueden adquirirse en conjunto con al menos una entrada de adulto.
                  </p>
                </div>
              )}

              {/* Promo code */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">¿Tienes un código promocional?</p>
                <div className="flex gap-2">
                  <input
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Introduce tu código"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0039ca]"
                  />
                  <button className="px-4 py-2 bg-[#011a48] border-2 border-[#0039ca] text-white text-sm font-bold rounded-lg hover:bg-[#000d24] transition-colors">
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
                <User size={20} className="text-[#e8003a]" /> Información del Comprador
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Nombre</label>
                  <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Juan" className={fieldClass('nombre')} />
                  {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Apellidos</label>
                  <input value={apellidos} onChange={e => setApellidos(e.target.value)} placeholder="Ej: García Pérez" className={fieldClass('apellidos')} />
                  {errors.apellidos && <p className="text-xs text-red-500 mt-1">{errors.apellidos}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Correo Electrónico</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" className={fieldClass('email')} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">País</label>
                  <select value={pais} onChange={e => setPais(e.target.value)} className={fieldClass('pais') + ' bg-white'}>
                    <option>España</option>
                    <option>México</option>
                    <option>Argentina</option>
                    <option>Colombia</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">DNI / NIE / Pasaporte</label>
                  <input value={dni} onChange={e => setDni(e.target.value)} placeholder="12345678X" className={fieldClass('dni')} />
                  {errors.dni && <p className="text-xs text-red-500 mt-1">{errors.dni}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
                <CreditCard size={20} className="text-[#e8003a]" /> Método de Pago
              </h2>

              {/* Tabs */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={() => setPayMethod('card')}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                    payMethod === 'card' ? 'border-[#e8003a] bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>Tarjeta de Crédito / Débito</span>
                  <CreditCard size={16} className={payMethod === 'card' ? 'text-[#e8003a]' : 'text-gray-400'} />
                </button>
                <button
                  onClick={() => setPayMethod('wallet')}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                    payMethod === 'wallet' ? 'border-[#e8003a] bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>Billeteras Digitales</span>
                  <Lock size={16} className={payMethod === 'wallet' ? 'text-[#e8003a]' : 'text-gray-400'} />
                </button>
              </div>

              {payMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Nombre en la Tarjeta</label>
                    <input
                      ref={cardNameRef}
                      defaultValue=""
                      autoComplete="cc-name"
                      placeholder="Nombre Completo"
                      className={fieldClass('cardName')}
                    />
                    {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Número de Tarjeta</label>
                    <div className="relative">
                      <input
                        ref={cardNumberRef}
                        defaultValue=""
                        autoComplete="cc-number"
                        placeholder="0000 0000 0000 0000"
                        className={fieldClass('cardNumber') + ' pr-10'}
                        maxLength={19}
                      />
                      <Lock size={16} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Fecha de Caducidad</label>
                      <input
                        ref={expiryRef}
                        defaultValue=""
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        className={fieldClass('expiry')}
                        maxLength={5}
                      />
                      {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">CVV</label>
                      <div className="relative">
                        <input
                          ref={cvvRef}
                          defaultValue=""
                          autoComplete="cc-csc"
                          type="password"
                          placeholder="***"
                          className={fieldClass('cvv') + ' pr-10'}
                          maxLength={4}
                        />
                        <HelpCircle size={16} className="absolute right-3 top-3 text-gray-400" />
                      </div>
                      {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {payMethod === 'wallet' && (
                <div className="py-8 text-center text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
                  Selecciona tu billetera digital para continuar
                </div>
              )}

              {/* Terms */}
              <div className="mt-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
                    className="mt-0.5 accent-[#e8003a]"
                  />
                  <span className="text-sm text-gray-600">
                    He leído y acepto la{' '}
                    <span className="text-[#e8003a] font-semibold cursor-pointer">Política de Privacidad</span>
                    {' '}y los{' '}
                    <span className="text-[#e8003a] font-semibold cursor-pointer">Términos de Venta</span>
                    {' '}de MagicLand.
                  </span>
                </label>
                {errors.terms && <p className="text-xs text-red-500 mt-1 ml-6">{errors.terms}</p>}
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                className="mt-5 w-full py-4 bg-[#e8003a] hover:bg-[#b8002e] text-white font-black text-lg rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Pagar {total.toFixed(2).replace('.', ',')}€ →
              </button>

                <div className="mt-3 flex items-center justify-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Lock size={12} /> Pago 100% Seguro</span>
                <span className="flex items-center gap-1"><Lock size={12} /> Encriptación SSL 256 bits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
