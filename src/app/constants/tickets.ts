// Precios y configuración de tickets
// Si cambian precios, solo tocar aquí

export type TicketType = 'general' | 'child' | 'vip' | 'family';

export interface TicketPricing {
  id: TicketType;
  label: string;
  subtitle: string;
  price: number;
  // cuántos "adultos" cuenta este ticket para la regla niño/adulto
  adultWeight: number;
  // cuántos visitantes incluye (para el contador total)
  headcount: number;
}

export const TICKET_CATALOG: TicketPricing[] = [
  { id: 'general', label: 'Entrada General', subtitle: 'Adulto',            price: 45,  adultWeight: 1, headcount: 1 },
  { id: 'child',   label: 'Entrada Infantil', subtitle: '3-12 años',        price: 30,  adultWeight: 0, headcount: 1 },
  { id: 'vip',     label: 'Entrada VIP',      subtitle: 'Sin colas',        price: 85,  adultWeight: 1, headcount: 1 },
  { id: 'family',  label: 'Pack Familiar',    subtitle: '2 adultos + 2 niños', price: 150, adultWeight: 2, headcount: 4 },
];

export const MAX_TICKETS_PER_ORDER = 10;

// Fuente única de verdad para calcular subtotal
export function calcSubtotal(tickets: Record<TicketType, number>): number {
  return TICKET_CATALOG.reduce((sum, t) => sum + (tickets[t.id] ?? 0) * t.price, 0);
}

// Cuántos adultos hay en el carrito (familia cuenta doble)
export function countAdults(tickets: Record<TicketType, number>): number {
  return TICKET_CATALOG.reduce((sum, t) => sum + (tickets[t.id] ?? 0) * t.adultWeight, 0);
}

// Total de visitantes (familia = 4 personas)
export function countHeads(tickets: Record<TicketType, number>): number {
  return TICKET_CATALOG.reduce((sum, t) => sum + (tickets[t.id] ?? 0) * t.headcount, 0);
}

// Genera un código de reserva usando la Web Crypto API (no Math.random)
export function generateBookingCode(): string {
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);
  return 'ML-' + Array.from(array, b => b.toString(36).toUpperCase()).join('').slice(0, 9);
}

export const IVA_RATE = 0.10;
