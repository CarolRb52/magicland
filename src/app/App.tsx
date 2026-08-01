import { useState } from 'react';
import { Header } from './components/park/Header';
import { Footer } from './components/park/Footer';
import { HomePage } from './components/park/HomePage';
import { AttractionsPage } from './components/park/AttractionsPage';
import { ContactPage } from './components/park/ContactPage';
import { TicketSelector } from './components/park/TicketSelector';
import { PurchaseForm } from './components/park/PurchaseForm';
import { SuccessScreen } from './components/park/SuccessScreen';
import { type TicketType, generateBookingCode } from './constants/tickets';

type Page = 'home' | 'attractions' | 'tickets' | 'contact';
type Step = 'select' | 'pay' | 'done';
type TicketMap = Record<TicketType, number>;

const emptyCart = (): TicketMap => ({ general: 0, child: 0, vip: 0, family: 0 });

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [step, setStep] = useState<Step>('select');
  const [tickets, setTickets] = useState<TicketMap>(emptyCart());
  const [visitDate, setVisitDate] = useState('');
  const [bookingCode] = useState(() => generateBookingCode());

  function nav(p: Page) {
    setPage(p);
    window.scrollTo(0, 0);
  }

  function updateTicket(type: TicketType, qty: number) {
    setTickets(prev => ({ ...prev, [type]: qty }));
  }

  const totalSelected = Object.values(tickets).reduce((a, b) => a + b, 0);

  const showFooter = !(page === 'tickets' && step === 'done');

  return (
    <div className="min-h-screen bg-white">
      <Header activePage={page} onNav={nav} />

      {page === 'home' && (
        <HomePage onBuyTickets={() => nav('tickets')} onSeeAttractions={() => nav('attractions')} />
      )}

      {page === 'attractions' && <AttractionsPage />}

      {page === 'contact' && <ContactPage />}

      {page === 'tickets' && step === 'select' && (
        <TicketSelector
          selectedTickets={tickets}
          onTicketChange={updateTicket}
          onPurchase={() => setStep('pay')}
          totalTickets={totalSelected}
          selectedDate={visitDate}
          onDateChange={setVisitDate}
        />
      )}

      {page === 'tickets' && step === 'pay' && (
        <PurchaseForm
          selectedTickets={tickets}
          selectedDate={visitDate}
          onClose={() => setStep('select')}
          onSuccess={() => setStep('done')}
        />
      )}

      {page === 'tickets' && step === 'done' && (
        <SuccessScreen
          selectedTickets={tickets}
          selectedDate={visitDate}
          bookingCode={bookingCode}
          onHome={() => { setPage('home'); setStep('select'); setTickets(emptyCart()); window.scrollTo(0, 0); }}
        />
      )}

      {showFooter && <Footer onNav={nav} />}
    </div>
  );
}
