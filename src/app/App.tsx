import { useState } from 'react';
import { Header } from './components/park/Header';
import { Hero } from './components/park/Hero';
import { TicketSelector } from './components/park/TicketSelector';
import { Attractions } from './components/park/Attractions';
import { PurchaseForm } from './components/park/PurchaseForm';
import { Footer } from './components/park/Footer';
import { type TicketType } from './constants/tickets';

type TicketMap = Record<TicketType, number>;

const emptyCart = (): TicketMap => ({ general: 0, child: 0, vip: 0, family: 0 });

export default function App() {
  const [tickets, setTickets]         = useState<TicketMap>(emptyCart());
  const [visitDate, setVisitDate]     = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  function updateTicket(type: TicketType, qty: number) {
    setTickets(prev => ({ ...prev, [type]: qty }));
  }

  const totalSelected = Object.values(tickets).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0F1] via-white to-[#FFDEE0]">
      <Header />
      <Hero />
      <TicketSelector
        selectedTickets={tickets}
        onTicketChange={updateTicket}
        onPurchase={() => setShowCheckout(true)}
        totalTickets={totalSelected}
        selectedDate={visitDate}
        onDateChange={setVisitDate}
      />
      <Attractions />

      {showCheckout && (
        <PurchaseForm
          selectedTickets={tickets}
          selectedDate={visitDate}
          onClose={() => setShowCheckout(false)}
        />
      )}

      <Footer />
    </div>
  );
}
