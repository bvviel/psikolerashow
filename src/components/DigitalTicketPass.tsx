import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, ShieldCheck, Calendar, MapPin, Clock, Ticket as TicketIcon } from 'lucide-react';
import { BAND_ASSETS } from '../data/bandData';
import { DigitalPassData } from '../types';

interface DigitalTicketPassProps {
  passData: DigitalPassData | null;
  onSelectAnotherSector?: () => void;
}

export default function DigitalTicketPass({ passData, onSelectAnotherSector }: DigitalTicketPassProps) {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Fallback pass data if user navigates directly before checkout
  const currentPass: DigitalPassData = passData || {
    orderId: 'PSIKO-2026-98124',
    holderName: 'GABRIEL SILVA RAMOS',
    documentId: '439.812.908-11',
    sectorName: 'PISTA PREMIUM // FRONT STAGE',
    modalityName: 'Meia-Entrada (Estudante)',
    gate: 'PORTÃO B (ENTRADA ANTECIPADA)',
    entryTime: '19:00',
    pricePaid: 160.0,
    timestamp: '05/10/2026 às 19:00',
    qrPayload: 'https://psikolera.com.br/valida/PSIKO-2026-98124?auth=E60000-BLOOD-RITUAL',
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Meu ingresso para o show da PSIKOLERA: ${currentPass.sectorName} no The Monica Club! Código: ${currentPass.orderId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#3f1e1a] border border-[#b91c1c]/60 px-3 py-1 mb-3">
          <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#f3efe6] font-bold">
            CREDENCIAL OFICIAL // BILHETE NOMINAL DIGITAL
          </span>
        </div>
        <h1 className="font-headline text-4xl sm:text-6xl uppercase tracking-tight text-[#f3efe6]">
          SEU PASSE DE <span className="text-[#ef4444]">ACESSO</span>
        </h1>
        <p className="font-body text-sm text-[#cfc8ba] max-w-xl mx-auto mt-2">
          Apresente o QR-Code na tela do celular junto a um documento oficial com foto na portaria do The Monica Club.
        </p>
      </div>

      {/* TICKET CONTAINER WITH HIGH-CONTRAST CARD */}
      <div className="relative bg-[#140e0d] border-2 border-[#b91c1c] shadow-[0_0_40px_rgba(185,28,28,0.3)] overflow-hidden transition-all duration-300">
        {/* Top Warning Banner */}
        <div className="distress-tape py-1.5 px-4 text-center text-white font-mono text-[11px] font-bold tracking-widest uppercase">
          ★ INGRESSO AUTÊNTICO ★ LOTE 02 ★ NÃO COMPARTILHE O QR-CODE COM TERCEIROS ★
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* MAIN TICKET BODY */}
          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#4a2820] relative">
            <div>
              {/* Header Lockup */}
              <div className="flex items-start justify-between gap-4 border-b border-[#4a2820] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={BAND_ASSETS.logo}
                    alt="Psikolera Logo"
                    className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(185,28,28,0.8)]"
                  />
                  <div>
                    <span className="font-headline text-2xl text-[#f3efe6] uppercase tracking-wider block">
                      PSIKOLERA
                    </span>
                    <span className="font-mono text-[10px] text-[#ef4444] uppercase tracking-widest font-bold">
                      PEGADAS DE SANGUE TOUR 2026
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] text-[#cfc8ba] block">TOKEN BILHETERIA:</span>
                  <span className="text-xs text-[#ef4444] font-bold">{currentPass.orderId}</span>
                </div>
              </div>

              {/* Sector Big Title */}
              <div className="mb-6">
                <span className="bg-[#b91c1c] text-white font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 inline-block mb-2">
                  SETOR SELECIONADO
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl text-[#f3efe6] uppercase">
                  {currentPass.sectorName}
                </h2>
                <span className="font-mono text-xs text-[#ffb4a8] block mt-1">
                  Modalidade: {currentPass.modalityName}
                </span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs mb-6">
                <div className="bg-[#0b0706] p-3 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] text-[10px] block">TITULAR DO INGRESSO</span>
                  <span className="text-[#f3efe6] font-bold uppercase truncate block">
                    {currentPass.holderName}
                  </span>
                </div>

                <div className="bg-[#0b0706] p-3 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] text-[10px] block">DOCUMENTO / CPF</span>
                  <span className="text-[#f3efe6] font-bold block">{currentPass.documentId}</span>
                </div>

                <div className="bg-[#0b0706] p-3 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] text-[10px] block">PORTÃO DE ENTRADA</span>
                  <span className="text-[#ef4444] font-bold block">{currentPass.gate}</span>
                </div>

                <div className="bg-[#0b0706] p-3 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] text-[10px] block flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#ef4444]" /> DATA DO SHOW
                  </span>
                  <span className="text-[#f3efe6] font-bold block">05/10/2026</span>
                </div>

                <div className="bg-[#0b0706] p-3 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] text-[10px] block flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#ef4444]" /> HORÁRIO ENTRADA
                  </span>
                  <span className="text-[#f3efe6] font-bold block">{currentPass.entryTime}</span>
                </div>

                <div className="bg-[#0b0706] p-3 border border-[#4a2820]">
                  <span className="text-[#cfc8ba] text-[10px] block flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#ef4444]" /> LOCALIZAÇÃO
                  </span>
                  <span className="text-[#f3efe6] font-bold block">The Monica Club</span>
                </div>
              </div>
            </div>

            {/* Simulated barcode */}
            <div className="pt-4 border-t border-[#4a2820] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 h-8">
                {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((w, i) => (
                  <div
                    key={i}
                    className="bg-[#f3efe6] h-full"
                    style={{ width: `${w * 1.5}px`, opacity: i % 2 === 0 ? 0.9 : 0.4 }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#cfc8ba]">
                SERIAL: {currentPass.orderId}-AUTH-VAL-2026
              </span>
            </div>
          </div>

          {/* PERFORATED STUB WITH DYNAMIC QR CODE FROM qrcode.react */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-[#1a0e0c] flex flex-col items-center justify-between text-center relative">
            <div className="w-full flex flex-col items-center">
              <div className="bg-[#3f1e1a] border border-[#b91c1c]/40 text-[#f3efe6] font-mono text-[10px] uppercase font-bold py-1 px-3 mb-4 w-full">
                VALIDAÇÃO ELETRÔNICA OFICIAL
              </div>

              {/* DYNAMIC QR CODE RENDERED VIA qrcode.react */}
              <div className="bg-white p-3 inline-block shadow-2xl border-2 border-[#b91c1c] mx-auto">
                <QRCodeSVG
                  value={currentPass.qrPayload || `https://psikolera.com.br/valida/${currentPass.orderId}`}
                  size={152}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: BAND_ASSETS.iconSkull,
                    x: undefined,
                    y: undefined,
                    height: 28,
                    width: 28,
                    excavate: true,
                  }}
                />
              </div>

              <div className="font-mono text-xs mt-3">
                <span className="text-[#cfc8ba] block text-[10px]">STATUS DO BILHETE:</span>
                <span className="text-[#ef4444] font-bold uppercase">ATIVO • PRONTO PARA ACESSO</span>
                <span className="text-[#cfc8ba]/70 block text-[9px] mt-0.5">
                  Renderizado dinamicamente via qrcode.react
                </span>
              </div>
            </div>

            <div className="w-full mt-6 pt-4 border-t border-[#4a2820]">
              <span className="font-headline text-2xl text-[#f3efe6] block">
                R$ {currentPass.pricePaid.toFixed(2).replace('.', ',')}
              </span>
              <span className="font-mono text-[10px] text-[#cfc8ba] uppercase">
                PAGO VIA PIX / CARTÃO • TAXAS INCLUSAS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS (DOWNLOAD / SHARE / PRINT) */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrint}
          className="bg-[#b91c1c] hover:bg-[#ef4444] text-white px-6 py-3 font-headline text-lg uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Baixar / Imprimir Bilhete</span>
        </button>

        <button
          onClick={handleShare}
          className="bg-[#140e0d] hover:bg-[#3f1e1a] border border-[#4a2820] text-[#f3efe6] px-6 py-3 font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#ef4444]" />
          <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Dados do Ingresso'}</span>
        </button>

        {onSelectAnotherSector && (
          <button
            onClick={onSelectAnotherSector}
            className="bg-[#291512] hover:bg-[#3f1e1a] text-[#ffb4a8] border border-[#b91c1c]/40 px-6 py-3 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <TicketIcon className="w-4 h-4 text-[#ef4444]" />
            <span>Adquirir Mais Ingressos</span>
          </button>
        )}
      </div>

      {downloadSuccess && (
        <div className="mt-4 p-3 bg-[#1a0e0c] border border-[#ef4444] text-center font-mono text-xs text-[#ef4444] uppercase">
          ✓ Janela de impressão aberta! Seu bilhete está seguro e validado.
        </div>
      )}
    </div>
  );
}
