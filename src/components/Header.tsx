import { Ticket, Users, ShoppingBag, BookOpen, Sparkles, QrCode } from 'lucide-react';
import { BAND_ASSETS } from '../data/bandData';

interface HeaderProps {
  currentTab: 'tour' | 'tickets' | 'dossier' | 'merch';
  setCurrentTab: (tab: 'tour' | 'tickets' | 'dossier' | 'merch') => void;
  openLibrariesModal: () => void;
  cartCount: number;
  totalTicketsCount: number;
  onQuickBuy: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  openLibrariesModal,
  cartCount,
  totalTicketsCount,
  onQuickBuy,
}: HeaderProps) {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#0b0706]/95 backdrop-blur-md border-b border-[#4a2820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* BRAND ZONE */}
        <button
          onClick={() => setCurrentTab('tour')}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
        >
          <img
            alt="Logo Oficial Psikolera"
            src={BAND_ASSETS.logo}
            className="h-11 w-auto object-contain drop-shadow-[0_0_12px_rgba(185,28,28,0.7)] group-hover:scale-105 transition-transform duration-200"
          />
          <div className="flex flex-col">
            <span className="font-headline text-2xl tracking-wider text-[#f3efe6] group-hover:text-[#ef4444] transition-colors">
              PSIKOLERA
            </span>
            <span className="font-mono text-[10px] text-[#ef4444] tracking-[0.25em] uppercase font-bold">
              PEGADAS DE SANGUE TOUR 2026
            </span>
          </div>
        </button>

        {/* NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => setCurrentTab('tour')}
            className={`font-mono text-xs uppercase tracking-widest py-1 border-b transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'tour'
                ? 'text-[#f3efe6] border-[#ef4444] font-bold'
                : 'text-[#cfc8ba] border-transparent hover:text-[#ef4444]'
            }`}
          >
            <Ticket className="w-3.5 h-3.5 text-[#ef4444]" />
            Turnê & Ingressos
          </button>

          <button
            onClick={() => setCurrentTab('dossier')}
            className={`font-mono text-xs uppercase tracking-widest py-1 border-b transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'dossier'
                ? 'text-[#f3efe6] border-[#ef4444] font-bold'
                : 'text-[#cfc8ba] border-transparent hover:text-[#f3efe6]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#b91c1c]" />
            Dossiê dos Membros
          </button>

          <button
            onClick={() => setCurrentTab('merch')}
            className={`font-mono text-xs uppercase tracking-widest py-1 border-b transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'merch'
                ? 'text-[#f3efe6] border-[#ef4444] font-bold'
                : 'text-[#cfc8ba] border-transparent hover:text-[#f3efe6]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#b91c1c]" />
            Merch Store
            {cartCount > 0 && (
              <span className="bg-[#b91c1c] text-white text-[10px] px-1.5 py-0.2 rounded-none font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('tickets')}
            className={`font-mono text-xs uppercase tracking-widest py-1 border-b transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'tickets'
                ? 'text-[#f3efe6] border-[#ef4444] font-bold'
                : 'text-[#cfc8ba] border-transparent hover:text-[#f3efe6]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-[#ef4444]" />
            Bilhete Digital
            {totalTicketsCount > 0 && (
              <span className="bg-[#ef4444] text-black text-[10px] px-1.5 font-bold">
                {totalTicketsCount}
              </span>
            )}
          </button>

          {/* LIBRARIES MODAL BUTTON */}
          <button
            onClick={openLibrariesModal}
            className="font-mono text-[11px] uppercase tracking-wider text-[#ffb4a8] bg-[#3f1e1a]/80 border border-[#b91c1c]/60 px-2.5 py-1 hover:bg-[#b91c1c] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            title="Conheça as 3 bibliotecas utilizadas neste app"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#ef4444]" />
            <span>3 Bibliotecas Utilizadas</span>
            <Sparkles className="w-3 h-3 text-[#ffb4a8]" />
          </button>
        </nav>

        {/* PRIMARY ACTIONS ZONE */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-mono text-[10px] text-[#cfc8ba] uppercase">Data Única</span>
            <span className="font-mono text-xs text-[#ef4444] font-bold">05/10/2026</span>
          </div>

          <button
            onClick={onQuickBuy}
            className="bg-[#b91c1c] hover:bg-[#ef4444] text-white font-headline text-lg tracking-wider px-5 py-2.5 transition-all shadow-[0_0_15px_rgba(185,28,28,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] uppercase flex items-center gap-2 cursor-pointer"
          >
            <span>Comprar</span>
            <Ticket className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MOBILE SECONDARY TAB BAR */}
      <div className="flex lg:hidden overflow-x-auto border-t border-[#4a2820] bg-[#140e0d] px-4 py-2 gap-2 text-xs font-mono">
        <button
          onClick={() => setCurrentTab('tour')}
          className={`px-3 py-1.5 whitespace-nowrap ${currentTab === 'tour' ? 'bg-[#b91c1c] text-white font-bold' : 'text-[#cfc8ba]'}`}
        >
          Turnê & Ingressos
        </button>
        <button
          onClick={() => setCurrentTab('tickets')}
          className={`px-3 py-1.5 whitespace-nowrap ${currentTab === 'tickets' ? 'bg-[#b91c1c] text-white font-bold' : 'text-[#cfc8ba]'}`}
        >
          Bilhete Digital {totalTicketsCount > 0 ? `(${totalTicketsCount})` : ''}
        </button>
        <button
          onClick={() => setCurrentTab('dossier')}
          className={`px-3 py-1.5 whitespace-nowrap ${currentTab === 'dossier' ? 'bg-[#b91c1c] text-white font-bold' : 'text-[#cfc8ba]'}`}
        >
          Dossiê Banda
        </button>
        <button
          onClick={() => setCurrentTab('merch')}
          className={`px-3 py-1.5 whitespace-nowrap ${currentTab === 'merch' ? 'bg-[#b91c1c] text-white font-bold' : 'text-[#cfc8ba]'}`}
        >
          Merch Store {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
        <button
          onClick={openLibrariesModal}
          className="px-3 py-1.5 whitespace-nowrap bg-[#3f1e1a] text-[#ffb4a8] border border-[#b91c1c]"
        >
          📚 3 Bibliotecas
        </button>
      </div>
    </header>
  );
}
