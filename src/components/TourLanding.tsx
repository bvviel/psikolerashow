import { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Users,
  MapPin,
  Clock,
  ShieldAlert,
  ChevronDown,
  ShoppingBag,
  Volume2,
  Ticket as TicketIcon,
} from 'lucide-react';
import { BAND_ASSETS, BAND_MEMBERS, SECTORS } from '../data/bandData';
import { ModalityType, SectorId, SelectedTicket } from '../types';
import { playMemberSample } from '../utils/audioSynth';

interface TourLandingProps {
  selectedTickets: Record<SectorId, SelectedTicket>;
  onUpdateTicket: (sectorId: SectorId, modality: ModalityType, qtyDelta: number) => void;
  onSetModality: (sectorId: SectorId, modality: ModalityType) => void;
  onProceedToCheckout: () => void;
  onOpenDossier: (memberId?: string) => void;
  onOpenMerch: () => void;
  appliedCoupon: string;
  setAppliedCoupon: (code: string) => void;
  discountPercent: number;
}

export default function TourLanding({
  selectedTickets,
  onUpdateTicket,
  onSetModality,
  onProceedToCheckout,
  onOpenDossier,
  onOpenMerch,
  appliedCoupon,
  setAppliedCoupon,
  discountPercent,
}: TourLandingProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [soundPlayingMember, setSoundPlayingMember] = useState<string | null>(null);

  const calculateSubtotal = () => {
    let sum = 0;
    (Object.keys(selectedTickets) as SectorId[]).forEach((secId) => {
      const item = selectedTickets[secId];
      sum += item.quantity * item.unitPrice;
    });
    return sum;
  };

  const totalTickets = Object.values(selectedTickets).reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = calculateSubtotal();
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (clean === 'PSIKOPACK10' || clean === 'SANGUE2026' || clean === 'FACLUBE') {
      setAppliedCoupon(clean);
      setCouponFeedback('CUPOM VALIDADO COM SUCESSO! 10% DE DESCONTO APLICADO.');
    } else if (clean.length === 0) {
      setCouponFeedback('Digite o código do cupom ou credencial.');
    } else {
      setCouponFeedback('Código inválido ou expirado. Tente PSIKOPACK10 ou FACLUBE');
    }
  };

  const triggerSound = (memberId: string, soundType: 'vocal' | 'drums' | 'guitar' | 'bass' | 'synth') => {
    setSoundPlayingMember(memberId);
    playMemberSample(soundType);
    setTimeout(() => {
      setSoundPlayingMember(null);
    }, 1200);
  };

  const scrollToTickets = () => {
    const el = document.getElementById('ingressos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative w-full pt-10 pb-16 lg:py-20 bg-gradient-to-b from-[#0b0706] via-[#1a0e0c] to-[#0b0706] overflow-hidden border-b border-[#4a2820]">
        {/* Glow ambient background */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-screen scale-105"
          style={{ backgroundImage: `url('${BAND_ASSETS.ambientBg}')`, filter: 'blur(3px)' }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#7f1d1d]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#291512]/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* TOP STAMP BADGE */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-[#3f1e1a] border border-[#4a2820] px-3.5 py-1.5 shadow-md">
              <span className="w-2.5 h-2.5 bg-[#ef4444] rounded-full animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#f3efe6] font-bold">
                TURNÊ NACIONAL OFICIAL // SHOW HISTÓRICO
              </span>
            </div>
            <div className="bg-[#140e0d] border border-[#b91c1c]/40 px-3.5 py-1.5 text-xs font-mono text-[#ef4444] tracking-widest uppercase">
              STATUS: LOTE 02 DISPONÍVEL • 72% VENDIDO
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* FLYER POSTER SHOWCASE (Colagem Nu Metal com fita) */}
            <div className="lg:col-span-5 relative group transition-all duration-500">
              {/* Duct tape top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#3f1e1a]/95 border border-[#4a2820] -rotate-2 z-20 shadow-md flex items-center justify-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#cfc8ba] font-bold">
                  FLYER OFICIAL
                </span>
              </div>
              <div className="relative bg-[#140e0d] p-3 border-2 border-[#4a2820] shadow-[0_15px_40px_rgba(0,0,0,0.9)] transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                <img
                  alt="Cartaz Oficial Psicose do Sangue Turnê Pegadas de Sangue"
                  className="w-full h-auto object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  src={BAND_ASSETS.flyer}
                />
                <div className="mt-3 pt-2.5 border-t border-[#4a2820] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#cfc8ba] uppercase">THE MONICA CLUB // SÃO PAULO</span>
                  <span className="text-[#ef4444] font-bold">05.OUT.2026</span>
                </div>
              </div>
            </div>

            {/* TOUR INFO & BAND HEADLINE */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="inline-block">
                  <span className="bg-[#b91c1c] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] px-3 py-1">
                    NU METAL BRASILEIRO // SHOW DE LANÇAMENTO
                  </span>
                </div>
                <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[#f3efe6] leading-[0.9] text-stencil mt-2">
                  PEGADAS DE <span className="text-[#ef4444]">SANGUE</span> TOUR
                </h1>
                <p className="font-body text-lg text-[#cfc8ba] max-w-2xl leading-relaxed mt-2">
                  A banda mais brutal do cenário pesado nacional desembarca em São Paulo para a apresentação
                  definitiva de lançamento do single <strong className="text-[#f3efe6]">&quot;PORTAL&quot;</strong> e músicas
                  do novo disco. Uma tempestade sônica de afinações baixas, sintetizadores rasgados e moshpit
                  visceral.
                </p>
              </div>

              {/* BAND BANNER IMMERSION BOX */}
              <div className="relative overflow-hidden border border-[#4a2820] bg-[#140e0d] group">
                <img
                  alt="Banda Psikolera Banner"
                  className="w-full h-44 object-cover object-center brightness-90 contrast-125 group-hover:scale-105 transition-transform duration-500"
                  src={BAND_ASSETS.banner}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0706] via-[#0b0706]/60 to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-headline text-xl text-[#f3efe6] uppercase tracking-wider">
                        FORMAÇÃO COMPLETA NO PALCO
                      </span>
                      <p className="font-mono text-xs text-[#ef4444]">Caio • Eloy • Franco • Cindy • Alê</p>
                    </div>
                    <span className="hidden sm:inline-block bg-[#291512] border border-[#4a2820] text-[#f3efe6] px-3 py-1 font-mono text-xs uppercase font-bold">
                      100% AO VIVO
                    </span>
                  </div>
                </div>
              </div>

              {/* FAST EVENT DATA GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="bg-[#140e0d] border border-[#4a2820] p-3">
                  <span className="text-[#cfc8ba] block text-[10px]">DATA DO EVENTO</span>
                  <span className="font-bold text-[#f3efe6] text-sm">05/10/2026</span>
                </div>
                <div className="bg-[#140e0d] border border-[#4a2820] p-3">
                  <span className="text-[#cfc8ba] block text-[10px]">ABERTURA / SHOW</span>
                  <span className="font-bold text-[#f3efe6] text-sm">19:00 / 21:30</span>
                </div>
                <div className="bg-[#140e0d] border border-[#4a2820] p-3">
                  <span className="text-[#cfc8ba] block text-[10px]">LOCALIZAÇÃO</span>
                  <span className="font-bold text-[#f3efe6] text-sm">The Monica Club</span>
                </div>
                <div className="bg-[#140e0d] border border-[#4a2820] p-3">
                  <span className="text-[#cfc8ba] block text-[10px]">CLASSIFICAÇÃO</span>
                  <span className="font-bold text-[#ef4444] text-sm">16 ANOS</span>
                </div>
              </div>

              {/* BUTTONS ACTION GROUP */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={scrollToTickets}
                  className="flex-1 bg-[#b91c1c] hover:bg-[#ef4444] text-white px-6 py-4 font-headline text-xl uppercase tracking-wider text-center transition-all shadow-[0_4px_20px_rgba(185,28,28,0.5)] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>SELECIONAR INGRESSO & SETORES</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
                <button
                  onClick={() => onOpenDossier()}
                  className="bg-[#1a1210] hover:bg-[#3f1e1a] border border-[#4a2820] text-[#f3efe6] px-6 py-4 font-mono text-xs uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>CONHEÇA A BANDA</span>
                  <Users className="w-4 h-4 text-[#ef4444]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BILHETERIA & SETORES */}
      <section className="w-full py-20 bg-[#140e0d] border-b border-[#4a2820] relative" id="ingressos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TicketIcon className="w-5 h-5 text-[#ef4444]" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ef4444] font-bold">
                  BILHETERIA OFICIAL DA TURNÊ
                </span>
              </div>
              <h2 className="font-headline text-4xl sm:text-6xl uppercase tracking-tight text-[#f3efe6]">
                ESCOLHA SEU SETOR
              </h2>
              <p className="font-body text-[#cfc8ba] max-w-2xl mt-1">
                Ingressos nominais e intransferíveis com emissão digital instantânea. Parcelamento em até 6x ou chave PIX.
              </p>
            </div>
            <div className="bg-[#291512] border border-[#4a2820] px-4 py-2 self-start md:self-auto flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ef4444]" />
              <span className="font-mono text-xs uppercase text-[#f3efe6] font-bold">
                BILHETE DIGITAL VIA QR-CODE
              </span>
            </div>
          </div>

          {/* 3 TICKET CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8" id="setores">
            {SECTORS.map((sector) => {
              const currentTicket = selectedTickets[sector.id];
              const isPopular = sector.badgeType === 'popular';
              const isVip = sector.badgeType === 'vip';

              return (
                <div
                  key={sector.id}
                  className={`p-6 flex flex-col justify-between relative transition-all ${
                    isPopular
                      ? 'bg-[#1a0e0c] border-2 border-[#b91c1c] shadow-[0_0_30px_rgba(185,28,28,0.25)]'
                      : 'bg-[#1a1210] border-2 border-[#4a2820] hover:border-[#b91c1c]/50'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-6 bg-[#b91c1c] text-white px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      MAIS POPULAR // GRADE DO PALCO
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between border-b border-[#4a2820] pb-3 mb-4 mt-1">
                      <span
                        className={`font-mono text-xs uppercase px-2.5 py-1 font-bold ${
                          isPopular
                            ? 'bg-[#7f1d1d] text-white'
                            : isVip
                            ? 'bg-[#3f1e1a] text-[#ffb4a8]'
                            : 'bg-[#3f1e1a] text-[#f3efe6]'
                        }`}
                      >
                        {sector.badge}
                      </span>
                      <span className="font-mono text-xs text-[#ef4444] font-bold">
                        {isPopular ? 'ÚLTIMOS INGRESSOS' : isVip ? 'CAPACIDADE LIMITADA' : 'LOTE 02 DISPONÍVEL'}
                      </span>
                    </div>

                    <h3 className="font-headline text-3xl uppercase text-[#f3efe6]">{sector.name}</h3>
                    <p className="font-body text-sm text-[#cfc8ba] mt-1 leading-relaxed">
                      {sector.description}
                    </p>

                    {/* MODALIDADE SELECTOR */}
                    {sector.id !== 'camarote' ? (
                      <div className="mt-4 bg-[#0b0706] p-1.5 border border-[#4a2820] flex gap-1">
                        {(['meia', 'social', 'inteira'] as ModalityType[]).map((mod) => (
                          <button
                            key={mod}
                            type="button"
                            onClick={() => onSetModality(sector.id, mod)}
                            className={`flex-1 py-1.5 text-[11px] font-mono uppercase font-bold text-center transition-all cursor-pointer ${
                              currentTicket.modality === mod
                                ? 'bg-[#b91c1c] text-white'
                                : 'text-[#cfc8ba] hover:text-[#f3efe6]'
                            }`}
                          >
                            {mod === 'meia'
                              ? `Meia R$ ${sector.prices.meia}`
                              : mod === 'social'
                              ? `Social R$ ${sector.prices.social}`
                              : `Inteira R$ ${sector.prices.inteira}`}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 bg-[#0b0706] p-2 border border-[#4a2820] text-center">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#cfc8ba]">
                          VALOR ÚNICO COM SERVIÇO & OPEN BAR INCLUSO
                        </span>
                      </div>
                    )}

                    {/* PRICE DISPLAY */}
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-headline text-4xl text-[#ef4444]">
                        R$ {currentTicket.unitPrice.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="font-mono text-xs text-[#cfc8ba]">
                        {currentTicket.modality === 'meia'
                          ? 'Meia-Entrada'
                          : currentTicket.modality === 'social'
                          ? 'Social (+1kg Alimento)'
                          : 'Inteira'}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#cfc8ba]/80 block mt-0.5">
                      ou até 6x de R$ {(currentTicket.unitPrice / 6).toFixed(2).replace('.', ',')} sem juros
                    </span>

                    {/* FEATURES LIST */}
                    <ul className="mt-6 flex flex-col gap-2.5 text-xs text-[#cfc8ba] font-body border-t border-[#4a2820] pt-4">
                      {sector.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* QUANTITY COUNTER */}
                  <div className="mt-8 pt-4 border-t border-[#4a2820] flex items-center justify-between bg-[#0b0706] p-3">
                    <span className="font-mono text-xs uppercase text-[#cfc8ba] font-bold">QUANTIDADE:</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onUpdateTicket(sector.id, currentTicket.modality, -1)}
                        className="w-8 h-8 bg-[#3f1e1a] text-[#f3efe6] hover:bg-[#b91c1c] hover:text-white font-mono font-bold flex items-center justify-center transition-colors cursor-pointer"
                        disabled={currentTicket.quantity <= 0}
                      >
                        -
                      </button>
                      <span className="font-mono text-base font-bold text-[#f3efe6] w-6 text-center">
                        {currentTicket.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateTicket(sector.id, currentTicket.modality, 1)}
                        className="w-8 h-8 bg-[#3f1e1a] text-[#f3efe6] hover:bg-[#b91c1c] hover:text-white font-mono font-bold flex items-center justify-center transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RESUMO DA COMPRA & CUPOM */}
          <div className="mt-12 bg-[#0b0706] border-2 border-[#4a2820] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex flex-col gap-1 w-full lg:w-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-[#cfc8ba] font-bold">
                RESUMO DA COMPRA // INGRESSOS SELECIONADOS
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-4xl sm:text-5xl text-[#ef4444]">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="font-mono text-xs text-[#cfc8ba]">
                  ({totalTickets} {totalTickets === 1 ? 'ingresso' : 'ingressos'})
                </span>
                {discountPercent > 0 && (
                  <span className="bg-[#b91c1c] text-white font-mono text-[10px] px-2 py-0.5 uppercase font-bold">
                    -{discountPercent}% APLICADO
                  </span>
                )}
              </div>
              <p className="font-body text-xs text-[#cfc8ba]/80">
                Taxa de conveniência de 10% isenta na bilheteria oficial online neste lote promocional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="CUPOM: PSIKOPACK10"
                  className="bg-[#140e0d] border border-[#4a2820] text-[#f3efe6] font-mono text-xs px-4 py-3.5 focus:border-[#ef4444] focus:outline-none uppercase w-full sm:w-56"
                />
                <button
                  type="submit"
                  className="bg-[#3f1e1a] hover:bg-[#b91c1c] text-[#f3efe6] font-mono text-xs px-4 py-3.5 uppercase font-bold transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="bg-[#b91c1c] hover:bg-[#ef4444] text-white font-headline text-xl px-8 py-3.5 uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(185,28,28,0.5)] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>GARANTIR INGRESSOS</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {couponFeedback && (
            <div className="mt-3 p-3 bg-[#1a0e0c] border border-[#b91c1c]/50 text-xs font-mono text-[#ffb4a8]">
              {couponFeedback}
            </div>
          )}
        </div>
      </section>

      {/* CONHEÇA OS INTEGRANTES */}
      <section className="w-full py-20 bg-[#0b0706] border-b border-[#4a2820] relative" id="a-banda">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ef4444]" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ef4444] font-bold">
                  LINE-UP OFICIAL
                </span>
              </div>
              <h2 className="font-headline text-4xl sm:text-6xl uppercase tracking-tight text-[#f3efe6]">
                CONHEÇA OS INTEGRANTES
              </h2>
              <p className="font-body text-[#cfc8ba] max-w-3xl leading-relaxed">
                Formada no underground, a <strong className="text-[#f3efe6]">PSIKOLERA</strong> une agressão rítmica com
                a estética pesada do nu metal. Toque nos botões para ouvir os timbres individuais gerados no sintetizador da banda!
              </p>
            </div>

            <button
              onClick={() => onOpenDossier()}
              className="bg-[#3f1e1a] hover:bg-[#b91c1c] text-[#f3efe6] border border-[#4a2820] px-5 py-3 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <span>Abrir Dossiê Completo</span>
              <ArrowRight className="w-4 h-4 text-[#ef4444]" />
            </button>
          </div>

          {/* 5 MEMBERS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {BAND_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-[#140e0d] border border-[#4a2820] flex flex-col overflow-hidden group hover:border-[#ef4444]/60 transition-all"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-[#1a0e0c]">
                  <img
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                    src={member.image}
                  />
                  <div className={`absolute bottom-2 left-2 ${member.tagColor} text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider`}>
                    {member.role}
                  </div>

                  {/* Sound Preview Trigger Button */}
                  <button
                    onClick={() => triggerSound(member.id, member.soundType)}
                    className="absolute top-2 right-2 bg-[#0b0706]/90 hover:bg-[#b91c1c] text-white p-2 border border-[#4a2820] transition-colors cursor-pointer flex items-center gap-1"
                    title={`Ouvir timbre de ${member.name}`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${soundPlayingMember === member.id ? 'text-[#ef4444] animate-bounce' : 'text-[#cfc8ba]'}`} />
                    <span className="font-mono text-[9px] uppercase font-bold">Ouvir</span>
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-[10px] text-[#ef4444] uppercase tracking-widest">
                      {member.tag}
                    </span>
                    <h3 className="font-headline text-2xl uppercase text-[#f3efe6] mt-0.5">{member.name}</h3>
                    <p className="font-body text-xs text-[#cfc8ba] mt-2 leading-relaxed">
                      {member.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#4a2820] font-mono text-[10px] text-[#cfc8ba] flex items-center justify-between">
                    <span>ESTILO</span>
                    <span className="text-[#ef4444] font-bold">{member.style}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL & DATA DO EVENTO */}
      <section className="w-full py-16 bg-[#1a1210] border-b border-[#4a2820]" id="local-data">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ef4444]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#ef4444] font-bold">
                  GUIA DO EVENTO
                </span>
              </div>
              <h2 className="font-headline text-4xl sm:text-5xl uppercase text-[#f3efe6]">
                THE MONICA CLUB // SÃO PAULO
              </h2>
              <p className="font-body text-sm text-[#cfc8ba] leading-relaxed">
                O palco escolhido para a gravação ao vivo da turnê é uma das casas de shows alternativas mais conceituadas da capital, equipada com sistema de som line-array de alta potência e isolamento acústico total.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 font-mono text-xs">
                <div className="bg-[#0b0706] p-3.5 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] block text-[10px]">ENDEREÇO</span>
                  <span className="text-[#f3efe6] font-bold">Rua Augusta, Centro - São Paulo, SP</span>
                </div>
                <div className="bg-[#0b0706] p-3.5 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] block text-[10px]">ACESSO TRANSPORTE</span>
                  <span className="text-[#f3efe6] font-bold">A 400m da Estação Consolação (Metrô)</span>
                </div>
                <div className="bg-[#0b0706] p-3.5 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] block text-[10px]">ESTACIONAMENTO</span>
                  <span className="text-[#f3efe6] font-bold">Convênio no local com vagas limitadas</span>
                </div>
                <div className="bg-[#0b0706] p-3.5 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] block text-[10px]">ACESSIBILIDADE</span>
                  <span className="text-[#f3efe6] font-bold">Espaço PCD com rampa e plataforma</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0b0706] border-2 border-[#4a2820] p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#4a2820] pb-3">
                <span className="font-headline text-xl text-[#f3efe6] uppercase">
                  CRONOGRAMA DO DIA 05/10/2026
                </span>
                <span className="font-mono text-xs text-[#ef4444] font-bold">SEGUNDA-FEIRA</span>
              </div>
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center justify-between bg-[#140e0d] p-3 border border-[#4a2820]/60">
                  <span className="text-[#cfc8ba]">18:30</span>
                  <span className="text-[#f3efe6] font-bold">Abertura de Bilheteria & Validação de Ingressos</span>
                </div>
                <div className="flex items-center justify-between bg-[#140e0d] p-3 border border-[#4a2820]/60">
                  <span className="text-[#cfc8ba]">19:00</span>
                  <span className="text-[#ef4444] font-bold">Abertura dos Portões (Pista Premium & Camarote)</span>
                </div>
                <div className="flex items-center justify-between bg-[#140e0d] p-3 border border-[#4a2820]/60">
                  <span className="text-[#cfc8ba]">19:30</span>
                  <span className="text-[#f3efe6] font-bold">Abertura dos Portões para Pista Geral</span>
                </div>
                <div className="flex items-center justify-between bg-[#140e0d] p-3 border border-[#4a2820]/60">
                  <span className="text-[#cfc8ba]">20:15</span>
                  <span className="text-[#f3efe6] font-bold">Banda de Abertura Convidada</span>
                </div>
                <div className="flex items-center justify-between bg-[#291512] p-3 border border-[#b91c1c]/40">
                  <span className="text-white font-bold">21:30</span>
                  <span className="text-white font-bold uppercase">PSIKOLERA NO PALCO (SHOW COMPLETO)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MERCHANDISE QUICK CALLOUT */}
      <section className="w-full py-16 bg-[#140e0d] border-b border-[#4a2820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1a0e0c] via-[#291512] to-[#140e0d] border-2 border-[#b91c1c]/60 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <ShoppingBag className="w-12 h-12 text-[#ef4444] shrink-0" />
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#ef4444] font-bold">
                  BOUTIQUE OFICIAL // ITENS DE COLECIONADOR
                </span>
                <h3 className="font-headline text-3xl sm:text-4xl text-[#f3efe6] uppercase">
                  MERCHANDISE OFICIAL DA TURNÊ
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#cfc8ba] max-w-xl mt-1">
                  Camisetas exclusivas, moletons heavyweight, palhetas de aço e bonés da turnê Pegadas de Sangue disponíveis para entrega rápida ou retirada no dia do show.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenMerch}
              className="bg-[#b91c1c] hover:bg-[#ef4444] text-white px-6 py-3.5 font-headline text-lg uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shrink-0 shadow-lg"
            >
              <span>Acessar Merch Store</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full py-16 bg-[#0b0706] border-b border-[#4a2820]" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ef4444] font-bold">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl uppercase text-[#f3efe6] mt-1">
              INFORMAÇÕES & REGRAS DO SHOW
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                q: 'Como funciona o benefício de Meia-Entrada?',
                a: 'Válido para estudantes (com Carteira de Identificação Estudantil - CIE oficial física ou digital válida), idosos acima de 60 anos, professores da rede pública e jovens de baixa renda cadastrados no CadÚnico. O documento comprobatório original deverá ser apresentado na portaria do evento.',
              },
              {
                q: 'O que é a modalidade Ingresso Social?',
                a: 'Qualquer fã tem direito ao desconto social mediante a entrega de 1kg de alimento não perecível (exceto sal e fubá) na entrada do evento. Os alimentos arrecadados serão doados integralmente a projetos comunitários da Grande São Paulo.',
              },
              {
                q: 'Qual é a classificação etária permitida?',
                a: 'Classificação indicativa de 16 anos. Jovens de 14 e 15 anos podem entrar exclusivamente acompanhados de pai, mãe ou tutor legal munidos de documentação comprobatória com foto. Menores de 14 anos não terão acesso permitido por motivos de segurança e pressão sonora.',
              },
              {
                q: 'Como funciona a emissão e validação do Bilhete Digital via QR-Code?',
                a: 'Imediatamente após a conclusão do pedido na bilheteria, o bilhete digital nominal é gerado com seu nome, CPF e um QR Code criptografado exclusivo. Você pode visualizá-lo na aba "Bilhete Digital", salvar como print ou apresentar direto na tela do celular no The Monica Club.',
              },
              {
                q: 'Haverá venda física de merchandise e itens oficiais?',
                a: 'Sim! Camisetas oficiais da turnê Pegadas de Sangue, casacos com capuz, adesivos, palhetas e o novo single físico estarão à venda na tenda oficial do local, com pagamentos em PIX, cartões de crédito e débito.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#140e0d] border border-[#4a2820]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#1a0e0c] transition-colors"
                >
                  <h3 className="font-headline text-lg uppercase text-[#f3efe6]">{item.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ef4444] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#cfc8ba] font-body leading-relaxed border-t border-[#4a2820]/40">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RODAPÉ DO EVENTO */}
      <footer className="w-full bg-[#070403] text-[#cfc8ba] border-t-2 border-[#4a2820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* BIO & LOGO */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  alt="Psikolera Logo"
                  className="h-10 w-auto object-contain"
                  src={BAND_ASSETS.iconSkull}
                />
                <span className="font-headline text-2xl tracking-wider text-[#f3efe6]">PSIKOLERA</span>
              </div>
              <p className="font-body text-xs text-[#cfc8ba] leading-relaxed">
                Nu metal independente do Brasil. Sonoridade visceral, afinações graves e teatralidade urbana.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-mono text-xs text-[#ef4444] font-bold">@PSIKOLERA</span>
                <span className="text-[#4a2820]">•</span>
                <span className="font-mono text-[11px] text-[#cfc8ba]">#PegadasDeSangue2026</span>
              </div>
            </div>

            {/* LINKS DO EVENTO */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              <span className="font-headline text-base text-[#f3efe6] uppercase mb-1 tracking-wider">
                NAVEGAÇÃO RÁPIDA
              </span>
              <button onClick={scrollToTickets} className="text-left hover:text-[#ef4444] transition-colors cursor-pointer">
                Comprar Ingressos
              </button>
              <button onClick={scrollToTickets} className="text-left hover:text-[#ef4444] transition-colors cursor-pointer">
                Mapa dos Setores
              </button>
              <button onClick={() => onOpenDossier()} className="text-left hover:text-[#ef4444] transition-colors cursor-pointer">
                Integrantes da Banda
              </button>
              <button onClick={onOpenMerch} className="text-left hover:text-[#ef4444] transition-colors cursor-pointer">
                Merchandise Oficial
              </button>
            </div>

            {/* INFORMAÇÕES LEGAIS */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              <span className="font-headline text-base text-[#f3efe6] uppercase mb-1 tracking-wider">
                INFORMAÇÕES LEGAIS
              </span>
              <span>Classificação: 16 anos acompanhado</span>
              <span>Lei Federal da Meia-Entrada Nº 12.933/2013</span>
              <span>Alvará de Funcionamento Nº 8941/SP</span>
              <span>Capacidade máxima: 1.200 pessoas</span>
            </div>

            {/* CANAIS DE ATENDIMENTO */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              <span className="font-headline text-base text-[#f3efe6] uppercase mb-1 tracking-wider">
                SUPORTE AO FÃ
              </span>
              <span>E-mail: contato@psikolera.com.br</span>
              <span>Bilheteria: Seg a Sex, 10h às 18h</span>
              <div className="bg-[#140e0d] p-3 border border-[#4a2820] mt-2">
                <span className="text-[11px] text-[#f3efe6] font-bold block">ASSESSORIA & BOOKING:</span>
                <span className="text-[10px] text-[#ef4444]">shows@psikolera.com.br</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#4a2820]/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#cfc8ba]">
            <p>© 2026 PSIKOLERA MUSIC • TODOS OS DIREITOS RESERVADOS. PRODUÇÃO INDEPENDENTE.</p>
            <div className="flex items-center gap-4">
              <span>Termos de Uso</span>
              <span>•</span>
              <span>Política de Privacidade</span>
              <span>•</span>
              <span>Segurança do Consumidor</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
