import { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, ShieldCheck, QrCode, CreditCard, ArrowRight, AlertCircle, Copy, Check } from 'lucide-react';
import { DigitalPassData, ModalityType, SectorId, SelectedTicket } from '../types';
import { SECTORS } from '../data/bandData';

interface TicketCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTickets: Record<SectorId, SelectedTicket>;
  discountPercent: number;
  onSuccess: (pass: DigitalPassData) => void;
}

export default function TicketCheckoutModal({
  isOpen,
  onClose,
  selectedTickets,
  discountPercent,
  onSuccess,
}: TicketCheckoutModalProps) {
  const [holderName, setHolderName] = useState('GABRIEL SILVA RAMOS');
  const [documentId, setDocumentId] = useState('439.812.908-11');
  const [email, setEmail] = useState('fa.psikolera@gmail.com');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate totals
  let subtotal = 0;
  let totalCount = 0;
  const itemsList: { sectorName: string; modality: ModalityType; qty: number; total: number }[] = [];

  (Object.keys(selectedTickets) as SectorId[]).forEach((secId) => {
    const item = selectedTickets[secId];
    if (item.quantity > 0) {
      const secDef = SECTORS.find((s) => s.id === secId);
      const name = secDef ? secDef.name : secId;
      const lineTotal = item.quantity * item.unitPrice;
      subtotal += lineTotal;
      totalCount += item.quantity;
      itemsList.push({
        sectorName: name,
        modality: item.modality,
        qty: item.quantity,
        total: lineTotal,
      });
    }
  });

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalPrice = Math.max(0, subtotal - discountAmount);

  const mockPixKey = '00020126580014br.gov.bcb.pix0136psikolera-bilheteria-2026-autenticada-sp5204000053039865405160.005802BR5925PSIKOLERA PRODUCOES LTDA6009SAO PAULO62070503***6304E600';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  const handleConfirmPurchase = () => {
    if (!holderName.trim() || !documentId.trim()) {
      alert('Por favor, informe o nome completo e documento do titular.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Trigger visceral blood-red & ash particles with canvas-confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#b91c1c', '#7f1d1d', '#140e0d', '#f3efe6'],
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }

      const primaryItem = itemsList[0] || {
        sectorName: 'PISTA GERAL',
        modality: 'meia',
      };

      const primarySec = primaryItem.sectorName.toLowerCase().includes('camarote')
        ? 'PORTÃO C (ACESSO VIP)'
        : primaryItem.sectorName.toLowerCase().includes('premium')
        ? 'PORTÃO B (ENTRADA ANTECIPADA)'
        : 'PORTÃO A (PISTA GERAL)';

      const newPass: DigitalPassData = {
        orderId: `PSIKO-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        holderName: holderName.toUpperCase(),
        documentId: documentId,
        sectorName: primaryItem.sectorName,
        modalityName:
          primaryItem.modality === 'meia'
            ? 'Meia-Entrada Oficial'
            : primaryItem.modality === 'social'
            ? 'Ingresso Social (+1kg Alimento)'
            : 'Inteira',
        gate: primarySec,
        entryTime: primarySec.includes('ANTECIPADA') ? '19:00' : '19:30',
        pricePaid: finalPrice,
        timestamp: '05/10/2026 às 19:00',
        qrPayload: `PSIKOLERA-TOKEN-${Date.now()}-VAL`,
      };

      setIsProcessing(false);
      onSuccess(newPass);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#140e0d] border-2 border-[#b91c1c] shadow-[0_0_50px_rgba(185,28,28,0.5)] my-8">
        {/* Top Header */}
        <div className="bg-[#1a0e0c] border-b border-[#4a2820] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#ef4444]" />
            <span className="font-headline text-xl text-[#f3efe6] uppercase tracking-wide">
              CHECKOUT // BILHETERIA OFICIAL
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#cfc8ba] hover:text-white p-1 hover:bg-[#3f1e1a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Order Summary */}
          <div className="bg-[#0b0706] p-4 border border-[#4a2820]">
            <span className="font-mono text-[11px] text-[#ef4444] uppercase font-bold tracking-wider block mb-2">
              RESUMO DOS INGRESSOS SELECIONADOS:
            </span>

            {itemsList.length === 0 ? (
              <div className="text-xs font-mono text-[#cfc8ba] flex items-center gap-2 py-2">
                <AlertCircle className="w-4 h-4 text-[#ef4444]" />
                Nenhum ingresso selecionado na tela principal. Selecione pelo menos 1 ingresso.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {itemsList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs font-mono border-b border-[#4a2820]/40 pb-1.5"
                  >
                    <div>
                      <span className="text-[#f3efe6] font-bold">{item.sectorName}</span>
                      <span className="text-[#cfc8ba] text-[10px] block uppercase">
                        {item.qty}x ({item.modality})
                      </span>
                    </div>
                    <span className="text-[#ef4444] font-bold">
                      R$ {item.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-xs font-mono text-[#ffb4a8] pt-1">
                    <span>Desconto do Cupom ({discountPercent}%):</span>
                    <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#4a2820] font-mono">
                  <span className="text-xs uppercase text-[#cfc8ba] font-bold">TOTAL FINAL:</span>
                  <span className="font-headline text-2xl text-[#ef4444]">
                    R$ {finalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Nominal Holder Form */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="text-[#f3efe6] uppercase font-bold tracking-wider">
              DADOS NOMINAIS DO TITULAR DO INGRESSO:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#cfc8ba] block mb-1">NOME COMPLETO (CONFORME RG/CNH)</label>
                <input
                  type="text"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="w-full bg-[#0b0706] border border-[#4a2820] p-2.5 text-[#f3efe6] uppercase focus:border-[#ef4444] focus:outline-none"
                  placeholder="EX: GABRIEL SILVA RAMOS"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#cfc8ba] block mb-1">CPF OU DOCUMENTO OFICIAL</label>
                <input
                  type="text"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                  className="w-full bg-[#0b0706] border border-[#4a2820] p-2.5 text-[#f3efe6] focus:border-[#ef4444] focus:outline-none"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#cfc8ba] block mb-1">E-MAIL PARA ENVIO DO COMPROVANTE</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0b0706] border border-[#4a2820] p-2.5 text-[#f3efe6] focus:border-[#ef4444] focus:outline-none"
                  placeholder="seuemail@exemplo.com"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#cfc8ba] block mb-1">TELEFONE WHATSAPP (NOTIFICAÇÃO)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0b0706] border border-[#4a2820] p-2.5 text-[#f3efe6] focus:border-[#ef4444] focus:outline-none"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <span className="font-mono text-xs text-[#f3efe6] uppercase font-bold tracking-wider block mb-2">
              FORMA DE PAGAMENTO:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3 border text-left font-mono text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'pix'
                    ? 'bg-[#291512] border-[#ef4444] text-[#f3efe6]'
                    : 'bg-[#0b0706] border-[#4a2820] text-[#cfc8ba]'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#ef4444]" />
                <div>
                  <span className="font-bold block">PIX INSTANTÂNEO</span>
                  <span className="text-[10px] text-[#cfc8ba]">Emissão imediata do bilhete</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`p-3 border text-left font-mono text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'credit'
                    ? 'bg-[#291512] border-[#ef4444] text-[#f3efe6]'
                    : 'bg-[#0b0706] border-[#4a2820] text-[#cfc8ba]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#ef4444]" />
                <div>
                  <span className="font-bold block">CARTÃO DE CRÉDITO</span>
                  <span className="text-[10px] text-[#cfc8ba]">Até 6x sem juros</span>
                </div>
              </button>
            </div>

            {/* Pix Box */}
            {paymentMethod === 'pix' && (
              <div className="mt-3 p-3 bg-[#0b0706] border border-[#4a2820] flex items-center justify-between gap-3 text-xs font-mono">
                <div className="truncate">
                  <span className="text-[#cfc8ba] block text-[10px]">CHAVE PIX COPIA E COLA:</span>
                  <span className="text-[#f3efe6] truncate block">{mockPixKey}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="bg-[#3f1e1a] hover:bg-[#b91c1c] text-[#f3efe6] px-3 py-1.5 uppercase font-bold text-[10px] flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {pixCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {pixCopied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleConfirmPurchase}
              disabled={isProcessing || totalCount === 0}
              className={`w-full py-4 text-center font-headline text-xl uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                isProcessing
                  ? 'bg-[#3f1e1a] cursor-wait'
                  : totalCount === 0
                  ? 'bg-neutral-800 cursor-not-allowed opacity-50'
                  : 'bg-[#b91c1c] hover:bg-[#ef4444]'
              }`}
            >
              {isProcessing ? (
                <span>PROCESSANDO VALIDAÇÃO DO RITUAL...</span>
              ) : (
                <>
                  <span>CONFIRMAR & EMITIR BILHETE DIGITAL</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <span className="font-mono text-[10px] text-[#cfc8ba]/80 text-center block mt-2">
              Seus dados estão protegidos com criptografia SSL 256-bit e em conformidade com a LGPD.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
