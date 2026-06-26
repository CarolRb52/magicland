import { useState, useRef } from 'react';
import {
  X, CreditCard, Calendar, User, Mail, Phone,
  CheckCircle, Ticket, Receipt, AlertCircle, Lock,
} from 'lucide-react';
import {
  TICKET_CATALOG,
  calcSubtotal,
  countHeads,
  generateBookingCode,
  IVA_RATE,
  type TicketType,
} from '../../constants/tickets';

interface Props {
  selectedTickets: Record<TicketType, number>;
  selectedDate: string;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

interface PersonalData {
  name: string;
  email: string;
  phone: string;
}

// Solo errores de campos personales + campos de tarjeta (sin guardar valores de tarjeta en estado)
type PersonalErrors = Partial<Record<keyof PersonalData, string>>;
type CardErrors = Partial<Record<'number' | 'expiry' | 'cvv', string>>;
type FieldErrors = PersonalErrors & CardErrors;

export function PurchaseForm({ selectedTickets, selectedDate, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [personal, setPersonal] = useState<PersonalData>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [bookingCode] = useState(() => generateBookingCode());
  const topRef = useRef<HTMLDivElement>(null);

  // Refs para inputs de tarjeta — los datos nunca pasan por el estado de React
  const cardNumberRef = useRef<HTMLInputElement>(null);
  const cardExpiryRef = useRef<HTMLInputElement>(null);
  const cardCvvRef = useRef<HTMLInputElement>(null);

  const subtotal = calcSubtotal(selectedTickets);
  const taxes = subtotal * IVA_RATE;
  const total = subtotal + taxes;
  const totalPax = countHeads(selectedTickets);

  /* ─── Validaciones ─────────────────────────────────────────── */

  function validateStep1(): FieldErrors {
    const e: FieldErrors = {};
    if (!personal.name.trim()) e.name = 'Campo obligatorio';
    if (!personal.email.trim()) {
      e.email = 'Campo obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) {
      e.email = 'Formato de email no válido';
    }
    if (!personal.phone.trim()) e.phone = 'Campo obligatorio';
    return e;
  }

  function validateStep2(): FieldErrors {
    const e: FieldErrors = {};
    // Leemos los refs una sola vez para validar — nunca almacenamos en estado
    const digits = (cardNumberRef.current?.value ?? '').replace(/\s/g, '');
    const expiry = cardExpiryRef.current?.value ?? '';
    const cvv = cardCvvRef.current?.value ?? '';

    if (!digits) e.number = 'Campo obligatorio';
    else if (digits.length < 16) e.number = 'Introduce los 16 dígitos';

    if (!expiry) e.expiry = 'Campo obligatorio';
    else if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = 'Formato MM/AA';

    if (!cvv) e.cvv = 'Campo obligatorio';
    else if (cvv.length < 3) e.cvv = 'Mínimo 3 dígitos';
    return e;
  }

  function handleNext() {
    const errs = step === 1 ? validateStep1() : validateStep2();
    if (Object.keys(errs).length) {
      setErrors(errs);
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setErrors({});

    // Al avanzar del paso 2, limpiamos los campos de tarjeta del DOM
    if (step === 2) {
      if (cardNumberRef.current) cardNumberRef.current.value = '';
      if (cardExpiryRef.current) cardExpiryRef.current.value = '';
      if (cardCvvRef.current) cardCvvRef.current.value = '';
    }

    setStep(s => (s + 1) as Step);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function clearError(field: keyof FieldErrors) {
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }

  /* ─── Helpers de UI ─────────────────────────────────────────── */

  const fieldClass = (field: keyof FieldErrors) =>
    `w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border transition-all
    focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300/50'
        : 'border-gray-300/50 focus:ring-[#F6131E]/50 focus:border-[#F6131E]/50'
    }`;

  const dateLabel = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'No seleccionada';

  const stepDefs = [
    { n: 1, label: 'Datos Personales', icon: <User className="w-5 h-5" /> },
    { n: 2, label: 'Pago', icon: <CreditCard className="w-5 h-5" /> },
    { n: 3, label: 'Confirmación', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  /* ─── Render ─────────────────────────────────────────────────── */

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-6xl w-full my-8 border border-white/40">

        {/* Cabecera */}
        <div className="bg-gradient-to-r from-[#F6131E] to-[#CF0610] text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Finalizar Compra</h2>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {stepDefs.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s.n
                      ? 'bg-white text-[#F6131E] shadow-lg'
                      : 'bg-white/20 text-white/60 border-2 border-white/30'
                  }`}>
                    {step > s.n ? <CheckCircle className="w-6 h-6" /> : s.icon}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step >= s.n ? 'text-white' : 'text-white/60'}`}>
                    {s.label}
                  </span>
                </div>
                {i < stepDefs.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded-full transition-all ${step > s.n ? 'bg-white' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ancla de scroll al cambiar de paso */}
        <div ref={topRef} />

        <div className="grid lg:grid-cols-3 gap-6 p-6">

          {/* ── Columna izquierda: formulario ── */}
          <div className="lg:col-span-2">

            {step === 3 ? (
              /* Paso 3: confirmación */
              <div className="text-center bg-white/60 backdrop-blur-md rounded-xl p-8 border border-gray-200/50">
                <div className="w-20 h-20 bg-[#FFC3C6]/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FF5E66]/30">
                  <CheckCircle className="w-12 h-12 text-[#F6131E]" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">¡Compra Completada!</h3>
                <p className="text-gray-600 mb-6">
                  Hemos enviado tus tickets a <strong>{personal.email}</strong>
                </p>
                <div className="bg-white/70 rounded-xl p-6 mb-6 border border-[#FF5E66]/30">
                  <p className="text-sm text-gray-500 mb-1">Código de Reserva</p>
                  <p className="text-3xl font-bold tracking-widest text-[#F6131E]">{bookingCode}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-gradient-to-r from-[#F6131E] to-[#CF0610] text-white rounded-xl font-bold hover:from-[#CF0610] hover:to-[#AB0911] transition-all shadow-lg"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 space-y-5">

                {/* Paso 1: datos personales */}
                {step === 1 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900">Información Personal</h3>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <User className="w-5 h-5 text-[#F6131E]" /> Nombre Completo
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        value={personal.name}
                        onChange={e => { setPersonal(p => ({ ...p, name: e.target.value })); clearError('name'); }}
                        className={fieldClass('name')}
                        placeholder="Juan Pérez"
                      />
                      {errors.name && <FieldError msg={errors.name} />}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <Mail className="w-5 h-5 text-[#F6131E]" /> Correo Electrónico
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        value={personal.email}
                        onChange={e => { setPersonal(p => ({ ...p, email: e.target.value })); clearError('email'); }}
                        className={fieldClass('email')}
                        placeholder="juan@ejemplo.com"
                      />
                      {errors.email && <FieldError msg={errors.email} />}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <Phone className="w-5 h-5 text-[#F6131E]" /> Teléfono
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={personal.phone}
                        onChange={e => { setPersonal(p => ({ ...p, phone: e.target.value })); clearError('phone'); }}
                        className={fieldClass('phone')}
                        placeholder="+34 600 000 000"
                      />
                      {errors.phone && <FieldError msg={errors.phone} />}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <Calendar className="w-5 h-5 text-[#F6131E]" /> Fecha de Visita
                      </label>
                      <div className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-700 font-medium capitalize">
                        {dateLabel}
                      </div>
                    </div>
                  </>
                )}

                {/* Paso 2: pago — inputs NO controlados (sin estado React) */}
                {step === 2 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900">Datos de Pago</h3>

                    {/* Aviso de entorno demo */}
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700 leading-relaxed">
                        <strong>Entorno de demo.</strong> No introduzcas datos reales de tarjeta.
                        En producción, este formulario sería reemplazado por Stripe Elements u otro
                        proveedor certificado PCI-DSS que nunca expone los datos al frontend.
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <CreditCard className="w-5 h-5 text-[#F6131E]" /> Número de Tarjeta
                      </label>
                      {/*
                        Input NO controlado: ref en lugar de value+onChange.
                        Los datos de tarjeta nunca se almacenan en el estado de React.
                      */}
                      <input
                        ref={cardNumberRef}
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        maxLength={19}
                        onInput={e => {
                          const el = e.currentTarget;
                          const raw = el.value.replace(/\D/g, '').slice(0, 16);
                          el.value = raw.replace(/(\d{4})/g, '$1 ').trimEnd();
                          clearError('number');
                        }}
                        className={fieldClass('number')}
                        placeholder="1234 5678 9012 3456"
                        aria-label="Número de tarjeta"
                      />
                      {errors.number && <FieldError msg={errors.number} />}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expiración</label>
                        <input
                          ref={cardExpiryRef}
                          type="text"
                          inputMode="numeric"
                          autoComplete="off"
                          maxLength={5}
                          onInput={e => {
                            const el = e.currentTarget;
                            const digits = el.value.replace(/\D/g, '').slice(0, 4);
                            el.value = digits.length > 2
                              ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                              : digits;
                            clearError('expiry');
                          }}
                          className={fieldClass('expiry')}
                          placeholder="MM/AA"
                          aria-label="Fecha de expiración"
                        />
                        {errors.expiry && <FieldError msg={errors.expiry} />}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV</label>
                        <input
                          ref={cardCvvRef}
                          type="password"
                          inputMode="numeric"
                          autoComplete="off"
                          maxLength={4}
                          onInput={e => {
                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                            clearError('cvv');
                          }}
                          className={fieldClass('cvv')}
                          placeholder="•••"
                          aria-label="Código de seguridad CVV"
                        />
                        {errors.cvv && <FieldError msg={errors.cvv} />}
                      </div>
                    </div>
                  </>
                )}

                {/* Botón siguiente / pagar */}
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-[#F6131E] to-[#CF0610] text-white rounded-xl font-bold text-lg hover:from-[#CF0610] hover:to-[#AB0911] transition-all shadow-lg mt-2"
                >
                  {step === 2 ? `Pagar ${total.toFixed(2)} €` : 'Continuar →'}
                </button>
              </div>
            )}
          </div>

          {/* ── Columna derecha: resumen ── */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-5 border border-gray-200/50 self-start">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#F6131E]" /> Resumen
            </h3>

            <div className="space-y-3 mb-4">
              {TICKET_CATALOG.filter(t => selectedTickets[t.id] > 0).map(t => (
                <div key={t.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">{t.label}</p>
                    <p className="text-gray-500">x{selectedTickets[t.id]}</p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {(selectedTickets[t.id] * t.price).toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#FFF0F1] rounded-lg p-3 mb-3 border border-[#FF5E66]/20">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#F6131E]" />
                <p className="text-xs font-semibold text-gray-800">Fecha de Visita</p>
              </div>
              <p className="text-sm text-gray-700 font-medium capitalize">{dateLabel}</p>
            </div>

            <div className="bg-[#FFF0F1] rounded-lg p-3 mb-4 border border-[#FF5E66]/20">
              <div className="flex items-center gap-2 mb-1">
                <Ticket className="w-4 h-4 text-[#F6131E]" />
                <p className="text-xs font-semibold text-gray-800">Total de Tickets</p>
              </div>
              <p className="text-2xl font-bold text-[#F6131E]">{totalPax} tickets</p>
            </div>

            <div className="space-y-2 pt-3 border-t-2 border-gray-200">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>IVA (10%)</span>
                <span className="font-medium">{taxes.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#F6131E]">{total.toFixed(2)} €</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-200/50 flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Pago 100% seguro y encriptado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Componente pequeño para mensajes de error de campo */
function FieldError({ msg }: { msg: string }) {
  return (
    <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {msg}
    </p>
  );
}
