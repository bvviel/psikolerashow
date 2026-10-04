import { useState } from 'react';
import { Volume2, ShieldAlert, Disc3, Mic, Wrench, ArrowLeft, Sparkles } from 'lucide-react';
import { BAND_MEMBERS } from '../data/bandData';
import { BandMember } from '../types';
import { playMemberSample } from '../utils/audioSynth';

interface BandDossierProps {
  initialMemberId?: string;
  onBackToTour: () => void;
}

export default function BandDossier({ initialMemberId, onBackToTour }: BandDossierProps) {
  const [selectedMember, setSelectedMember] = useState<BandMember>(() => {
    if (initialMemberId) {
      const found = BAND_MEMBERS.find((m) => m.id === initialMemberId);
      if (found) return found;
    }
    return BAND_MEMBERS[0];
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlaySound = (type: BandMember['soundType']) => {
    setIsPlayingAudio(true);
    playMemberSample(type);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1500);
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToTour}
          className="inline-flex items-center gap-2 bg-[#140e0d] hover:bg-[#3f1e1a] border border-[#4a2820] text-[#f3efe6] px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#ef4444]" />
          <span>Voltar para Turnê & Ingressos</span>
        </button>

        <div className="bg-[#291512] border border-[#b91c1c]/40 px-3 py-1 font-mono text-xs text-[#ef4444] uppercase tracking-widest font-bold">
          ARQUIVO CONFIDENCIAL // LINE-UP PSIKOLERA
        </div>
      </div>

      {/* Main Dossier Header */}
      <div className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ef4444] font-bold">
          ESTÚDIO & FICHA TÉCNICA
        </span>
        <h1 className="font-headline text-4xl sm:text-6xl uppercase tracking-tight text-[#f3efe6] mt-1">
          DOSSIÊ DOS <span className="text-[#ef4444]">INTEGRANTES</span>
        </h1>
        <p className="font-body text-sm text-[#cfc8ba] max-w-2xl mx-auto mt-2">
          Conheça a história, a instrumentação e teste o laboratório sonoro de cada um dos cinco músicos responsáveis pelo ataque sonoro da Psikolera.
        </p>
      </div>

      {/* MEMBER SELECTOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
        {BAND_MEMBERS.map((member) => {
          const isSelected = selectedMember.id === member.id;
          return (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`p-3 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#291512] border-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'bg-[#140e0d] border-[#4a2820] hover:border-[#b91c1c]/60'
              }`}
            >
              <div>
                <span className="font-mono text-[10px] text-[#ef4444] block font-bold">
                  {member.number} // {member.style}
                </span>
                <span className="font-headline text-xl text-[#f3efe6] uppercase mt-0.5 block">
                  {member.name}
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#cfc8ba] uppercase mt-2 truncate block">
                {member.role}
              </span>
            </button>
          );
        })}
      </div>

      {/* MEMBER ACTIVE DOSSIER DISPLAY */}
      <div
        key={selectedMember.id}
        className="bg-[#140e0d] border-2 border-[#b91c1c] p-6 lg:p-10 shadow-[0_0_35px_rgba(0,0,0,0.8)] transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Member Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] bg-[#0b0706] border-2 border-[#4a2820] overflow-hidden group">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover object-top contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0706] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="bg-[#b91c1c] text-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider">
                  {selectedMember.role}
                </span>
                <span className="bg-[#0b0706]/90 border border-[#4a2820] text-[#cfc8ba] px-2.5 py-1 font-mono text-[11px] font-bold">
                  ID: #{selectedMember.number}
                </span>
              </div>
            </div>

            {/* Sonic preview button */}
            <div className="mt-4 bg-[#0b0706] p-4 border border-[#4a2820]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase text-[#f3efe6] font-bold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#ef4444]" />
                  LABORATÓRIO DE ÁUDIO WEB
                </span>
                <span className="font-mono text-[10px] text-[#ef4444] font-bold">
                  {isPlayingAudio ? 'EXECUTANDO SÍNTESE...' : 'PRONTO PARA DISPARO'}
                </span>
              </div>

              {/* Animated visualizer wavebars */}
              <div className="h-8 flex items-end justify-center gap-1 bg-[#140e0d] p-1 border border-[#4a2820] mb-3">
                {[12, 28, 45, 70, 85, 60, 40, 95, 80, 50, 65, 30, 85, 40, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      height: isPlayingAudio ? `${h}%` : '20%',
                    }}
                    className={`w-2 transition-all duration-150 ${isPlayingAudio ? 'bg-[#ef4444]' : 'bg-[#3f1e1a]'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => handlePlaySound(selectedMember.soundType)}
                className="w-full bg-[#b91c1c] hover:bg-[#ef4444] text-white py-3 font-headline text-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Volume2 className="w-5 h-5" />
                <span>OUVIR TIMBRE CARACTERÍSTICO ({selectedMember.soundType.toUpperCase()})</span>
              </button>
            </div>
          </div>

          {/* Member Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="inline-block bg-[#3f1e1a] text-[#ffb4a8] font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 mb-2">
                {selectedMember.tag}
              </div>
              <h2 className="font-headline text-5xl uppercase text-[#f3efe6]">{selectedMember.name}</h2>
              <span className="font-mono text-sm text-[#ef4444] font-bold uppercase block mt-1">
                ESTILO: {selectedMember.style}
              </span>
            </div>

            <div className="bg-[#0b0706] p-5 border border-[#4a2820]">
              <h3 className="font-headline text-xl uppercase text-[#f3efe6] mb-2 flex items-center gap-2">
                <Disc3 className="w-5 h-5 text-[#ef4444]" />
                BIOGRAFIA NO CENÁRIO UNDERGROUND
              </h3>
              <p className="font-body text-sm text-[#cfc8ba] leading-relaxed">
                {selectedMember.fullBio}
              </p>
            </div>

            <div className="bg-[#0b0706] p-5 border border-[#4a2820]">
              <h3 className="font-headline text-xl uppercase text-[#f3efe6] mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#ef4444]" />
                EQUIPAMENTO & ARSENAL DE PALCO (RIG)
              </h3>
              <ul className="flex flex-col gap-2 font-mono text-xs text-[#cfc8ba]">
                {selectedMember.gear.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#ef4444] font-bold">▶</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#291512] border border-[#b91c1c]/50 flex items-center justify-between">
              <div>
                <span className="font-headline text-lg text-[#f3efe6] uppercase block">
                  VEJA {selectedMember.name} AO VIVO EM SÃO PAULO
                </span>
                <span className="font-mono text-xs text-[#cfc8ba]">
                  05 de Outubro de 2026 no The Monica Club
                </span>
              </div>
              <button
                onClick={onBackToTour}
                className="bg-[#b91c1c] hover:bg-[#ef4444] text-white px-5 py-2.5 font-headline text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                Garantir Ingresso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
