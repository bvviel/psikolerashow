import { useState, useEffect } from 'react';
import TickerTape from './components/TickerTape';
import Header from './components/Header';
import TourLanding from './components/TourLanding';
import DigitalTicketPass from './components/DigitalTicketPass';
import BandDossier from './components/BandDossier';
import MerchStore from './components/MerchStore';
import TicketCheckoutModal from './components/TicketCheckoutModal';
import LibrariesModal from './components/LibrariesModal';
import { CartItem, DigitalPassData, ModalityType, SectorId, SelectedTicket, MerchItem } from './types';
import { SECTORS } from './data/bandData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'tour' | 'tickets' | 'dossier' | 'merch'>('tour');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isLibrariesModalOpen, setIsLibrariesModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [dossierMemberId, setDossierMemberId] = useState<string | undefined>(undefined);

  // Initial tickets state with 0 qty
  const [selectedTickets, setSelectedTickets] = useState<Record<SectorId, SelectedTicket>>({
    pista: { sectorId: 'pista', modality: 'meia', quantity: 0, unitPrice: 90 },
    premium: { sectorId: 'premium', modality: 'meia', quantity: 0, unitPrice: 160 },
    camarote: { sectorId: 'camarote', modality: 'meia', quantity: 0, unitPrice: 380 },
  });

  // Emitted digital pass state
  const [activePass, setActivePass] = useState<DigitalPassData | null>(() => {
    try {
      const saved = localStorage.getItem('psikolera_ticket_pass');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // Merch store cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('psikolera_cart');
      if (savedCart) return JSON.parse(savedCart);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      if (activePass) {
        localStorage.setItem('psikolera_ticket_pass', JSON.stringify(activePass));
      }
    } catch (err) {
      console.warn('Storage error:', err);
    }
  }, [activePass]);

  useEffect(() => {
    try {
      localStorage.setItem('psikolera_cart', JSON.stringify(cart));
    } catch (err) {
      console.warn('Storage error:', err);
    }
  }, [cart]);

  // Update discount percent when coupon changes
  useEffect(() => {
    if (appliedCoupon === 'PSIKOPACK10') {
      setDiscountPercent(10);
    } else if (appliedCoupon === 'FACLUBE') {
      setDiscountPercent(15);
    } else if (appliedCoupon === 'SANGUE2026') {
      setDiscountPercent(10);
    } else {
      setDiscountPercent(0);
    }
  }, [appliedCoupon]);

  const handleUpdateTicket = (sectorId: SectorId, modality: ModalityType, delta: number) => {
    setSelectedTickets((prev) => {
      const current = prev[sectorId];
      const newQty = Math.max(0, current.quantity + delta);
      return {
        ...prev,
        [sectorId]: {
          ...current,
          modality,
          quantity: newQty,
        },
      };
    });
  };

  const handleSetModality = (sectorId: SectorId, modality: ModalityType) => {
    const secDef = SECTORS.find((s) => s.id === sectorId);
    if (!secDef) return;

    const newPrice = secDef.prices[modality];
    setSelectedTickets((prev) => ({
      ...prev,
      [sectorId]: {
        ...prev[sectorId],
        modality,
        unitPrice: newPrice,
      },
    }));
  };

  const handleProceedToCheckout = () => {
    const totalQty = Object.values(selectedTickets).reduce((acc, curr) => acc + curr.quantity, 0);
    if (totalQty === 0) {
      // Default to 1 Pista Premium ticket for convenience if user clicked without selecting
      setSelectedTickets((prev) => ({
        ...prev,
        premium: { ...prev.premium, quantity: 1 },
      }));
    }
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = (newPass: DigitalPassData) => {
    setActivePass(newPass);
    setIsCheckoutModalOpen(false);
    setCurrentTab('tickets');
  };

  const handleQuickBuy = () => {
    if (currentTab !== 'tour') {
      setCurrentTab('tour');
      setTimeout(() => {
        const el = document.getElementById('ingressos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('ingressos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDossier = (memberId?: string) => {
    setDossierMemberId(memberId);
    setCurrentTab('dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMerch = () => {
    setCurrentTab('merch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: MerchItem, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          size,
          type: 'merch',
        },
      ];
    });
  };

  const handleUpdateCartQty = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const totalTicketsCount = Object.values(selectedTickets).reduce((acc, curr) => acc + curr.quantity, 0);
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0706] text-[#cfc8ba] flex flex-col relative selection:bg-[#b91c1c] selection:text-white">
      {/* 1. TOP MARQUEE EMERGENCY TICKER */}
      <TickerTape />

      {/* 2. HEADER NAVIGATION */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openLibrariesModal={() => setIsLibrariesModalOpen(true)}
        cartCount={cartCount}
        totalTicketsCount={totalTicketsCount}
        onQuickBuy={handleQuickBuy}
      />

      {/* 3. ACTIVE SCREEN CONTENT */}
      <main className="flex-1 w-full">
        {currentTab === 'tour' && (
          <TourLanding
            selectedTickets={selectedTickets}
            onUpdateTicket={handleUpdateTicket}
            onSetModality={handleSetModality}
            onProceedToCheckout={handleProceedToCheckout}
            onOpenDossier={handleOpenDossier}
            onOpenMerch={handleOpenMerch}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            discountPercent={discountPercent}
          />
        )}

        {currentTab === 'tickets' && (
          <DigitalTicketPass
            passData={activePass}
            onSelectAnotherSector={() => {
              setCurrentTab('tour');
              setTimeout(() => {
                const el = document.getElementById('ingressos');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          />
        )}

        {currentTab === 'dossier' && (
          <BandDossier
            initialMemberId={dossierMemberId}
            onBackToTour={() => setCurrentTab('tour')}
          />
        )}

        {currentTab === 'merch' && (
          <MerchStore
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onBackToTour={() => setCurrentTab('tour')}
          />
        )}
      </main>

      {/* 4. MODALS */}
      <TicketCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        selectedTickets={selectedTickets}
        discountPercent={discountPercent}
        onSuccess={handleCheckoutSuccess}
      />

      <LibrariesModal
        isOpen={isLibrariesModalOpen}
        onClose={() => setIsLibrariesModalOpen(false)}
      />
    </div>
  );
}
