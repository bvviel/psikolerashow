import { useState } from 'react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  Sparkles,
  BookOpen,
  QrCode,
  Layers,
  CheckCircle,
  Play,
  Flame,
  Ticket,
  ShieldCheck,
  ShoppingBag,
  Volume2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { BAND_ASSETS } from '../data/bandData';

interface LibrariesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LibrariesModal({ isOpen, onClose }: LibrariesModalProps) {
  // Interactive state for qrcode.react live test
  const [customQrText, setCustomQrText] = useState('PSIKOLERA-INGRESSO-VIP-LOTE02-TOKEN-98124');
  const [includeBandLogo, setIncludeBandLogo] = useState(true);

  // Interactive state for lucide-react live test
  const [iconColor, setIconColor] = useState<'red' | 'white' | 'crimson'>('red');
  const [iconSize, setIconSize] = useState<number>(24);

  if (!isOpen) return null;

  const handleTestConfetti = (mode: 'subtle' | 'burst') => {
    if (mode === 'subtle') {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#b91c1c', '#cfc8ba'],
      });
    } else {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#b91c1c', '#7f1d1d', '#f3efe6', '#0b0706'],
      });
    }
  };

  const getIconColorHex = () => {
    if (iconColor === 'white') return '#f3efe6';
    if (iconColor === 'crimson') return '#7f1d1d';
    return '#ef4444';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#140e0d] border-2 border-[#b91c1c] shadow-[0_0_50px_rgba(185,28,28,0.7)] my-8">
        {/* Header */}
        <div className="bg-[#1a0e0c] border-b border-[#4a2820] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#ef4444]" />
            <div>
              <span className="font-headline text-2xl text-[#f3efe6] uppercase tracking-wide block">
                ARQUITETURA & AS 3 BIBLIOTECAS UTILIZADAS
              </span>
              <span className="font-mono text-[10px] text-[#ef4444] uppercase tracking-widest font-bold">
                DOCUMENTAÇÃO TÉCNICA E PAPEL DE CADA PACOTE NO PROJETO
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#cfc8ba] hover:text-white p-1 hover:bg-[#3f1e1a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-8 max-h-[80vh] overflow-y-auto">
          {/* INTRO SUMMARY */}
          <div className="bg-[#0b0706] p-4 border border-[#4a2820] font-body text-xs text-[#cfc8ba] leading-relaxed">
            <p>
              Em substituição à biblioteca anterior, estruturamos o projeto com <strong className="text-[#f3efe6]">três bibliotecas essenciais, distintas e especializadas</strong>. Cada uma delas resolve um desafio específico de engenharia na plataforma:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#4a2820]/60 font-mono text-[11px]">
              <div className="text-[#ef4444] font-bold">1. qrcode.react (Autenticação)</div>
              <div className="text-[#f3efe6] font-bold">2. lucide-react (Interface & Ícones)</div>
              <div className="text-[#ffb4a8] font-bold">3. canvas-confetti (Feedback Tátil)</div>
            </div>
          </div>

          {/* ========================================================
              BIBLIOTECA 1: QRCODE.REACT
          ======================================================== */}
          <div className="bg-[#0b0706] border-2 border-[#b91c1c] p-6 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#4a2820] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#b91c1c] text-white font-mono text-xs px-2.5 py-0.5 font-bold uppercase">
                  BIBLIOTECA 01
                </span>
                <h3 className="font-headline text-3xl text-[#f3efe6]">QRCODE.REACT</h3>
              </div>
              <span className="font-mono text-xs text-[#ef4444] font-bold bg-[#1a0e0c] px-3 py-1 border border-[#b91c1c]/40">
                npm: qrcode.react
              </span>
            </div>

            <div className="flex flex-col gap-3 text-xs leading-relaxed text-[#cfc8ba] font-body">
              <p>
                <strong className="text-[#f3efe6] uppercase font-mono text-sm block mb-1">
                  1. O QUE É:
                </strong>
                É um componente React de alta precisão técnica para gerar e renderizar códigos bidimensionais (QR Codes) vetoriais nativos em <strong className="text-[#f3efe6]">SVG puro</strong> ou no elemento <strong className="text-[#f3efe6]">Canvas</strong>. Ela converte qualquer string de texto, URL ou hash criptográfico em uma matriz binária escaneável instantaneamente por qualquer câmera de smartphone ou leitor óptico de catraca.
              </p>

              <p>
                <strong className="text-[#ef4444] uppercase font-mono text-sm block mb-1">
                  2. O QUE FAZ NA NOSSA APLICAÇÃO:
                </strong>
                • <strong className="text-[#f3efe6]">Emissão do Bilhete Digital:</strong> Na tela de <em>&quot;Bilhete Digital&quot;</em> e no modal de checkout, quando o fã conclui a compra de ingressos (Pista, Premium ou Camarote), a biblioteca calcula e gera na hora o QR Code oficial contendo o ID do pedido, os dados nominais do titular (nome e CPF) e o token de acesso da portaria.
                <br />
                • <strong className="text-[#f3efe6]">Alta tolerância a erros (Level H):</strong> Utilizamos o nível de correção de erro de 30% (<code className="text-[#ef4444]">level=&quot;H&quot;</code>). Isso permite embutir o emblema da caveira oficial da Psikolera exatamente no centro do QR Code sem que o código perca sua legibilidade.
                <br />
                • <strong className="text-[#f3efe6]">Sem dependência de servidores externos:</strong> A renderização ocorre 100% no cliente (browser), sem fazer requisições a APIs de terceiros que poderiam cair ou violar a privacidade dos dados do comprador.
              </p>
            </div>

            {/* LIVE INTERACTIVE DEMO FOR QRCODE.REACT */}
            <div className="mt-5 bg-[#140e0d] p-4 border border-[#4a2820]">
              <span className="font-mono text-xs uppercase text-[#ef4444] font-bold block mb-2">
                ⚡ DEMONSTRAÇÃO AO VIVO (DIGITE E VEJA O QR-CODE MUDAR EM TEMPO REAL):
              </span>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="bg-white p-2.5 border-2 border-[#b91c1c] shadow-lg shrink-0">
                  <QRCodeSVG
                    value={customQrText || 'PSIKOLERA'}
                    size={120}
                    level="H"
                    includeMargin={false}
                    imageSettings={
                      includeBandLogo
                        ? {
                            src: BAND_ASSETS.iconSkull,
                            x: undefined,
                            y: undefined,
                            height: 24,
                            width: 24,
                            excavate: true,
                          }
                        : undefined
                    }
                  />
                </div>

                <div className="flex-1 w-full flex flex-col gap-2 font-mono text-xs">
                  <label className="text-[#cfc8ba] text-[11px]">
                    Payload do Ingresso (Texto/URL/Token):
                  </label>
                  <input
                    type="text"
                    value={customQrText}
                    onChange={(e) => setCustomQrText(e.target.value)}
                    className="w-full bg-[#0b0706] border border-[#4a2820] text-[#f3efe6] p-2 text-xs focus:border-[#ef4444] focus:outline-none"
                    placeholder="Digite algo para codificar..."
                  />

                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      id="toggle-logo"
                      checked={includeBandLogo}
                      onChange={(e) => setIncludeBandLogo(e.target.checked)}
                      className="accent-[#ef4444]"
                    />
                    <label htmlFor="toggle-logo" className="text-[11px] text-[#cfc8ba] cursor-pointer">
                      Embutir logo oficial da banda no centro (Recurso <code>imageSettings</code>)
                    </label>
                  </div>
                  <span className="text-[10px] text-[#ffb4a8]">
                    Aponte a câmera do seu celular para este código na tela para verificar a leitura real!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              BIBLIOTECA 2: LUCIDE-REACT
          ======================================================== */}
          <div className="bg-[#0b0706] border border-[#4a2820] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#4a2820] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#3f1e1a] text-[#ffb4a8] font-mono text-xs px-2.5 py-0.5 font-bold uppercase">
                  BIBLIOTECA 02
                </span>
                <h3 className="font-headline text-3xl text-[#f3efe6]">LUCIDE-REACT</h3>
              </div>
              <span className="font-mono text-xs text-[#ef4444] font-bold bg-[#1a0e0c] px-3 py-1 border border-[#4a2820]">
                npm: lucide-react
              </span>
            </div>

            <div className="flex flex-col gap-3 text-xs leading-relaxed text-[#cfc8ba] font-body">
              <p>
                <strong className="text-[#f3efe6] uppercase font-mono text-sm block mb-1">
                  1. O QUE É:
                </strong>
                É a biblioteca de ícones vetoriais em SVG moderno mais conceituada para React. Fornece componentes React limpos, otimizados para *tree-shaking* (apenas os ícones importados entram no bundle final), com suporte completo a TypeScript e propriedades dinâmicas como cor, tamanho e espessura do traço (*stroke width*).
              </p>

              <p>
                <strong className="text-[#ef4444] uppercase font-mono text-sm block mb-1">
                  2. O QUE FAZ NA NOSSA APLICAÇÃO:
                </strong>
                • <strong className="text-[#f3efe6]">Navegação e Categorias:</strong> Provê os símbolos nos botões da barra superior (<code className="text-[#ef4444]">Ticket</code>, <code className="text-[#ef4444]">QrCode</code>, <code className="text-[#ef4444]">ShoppingBag</code>).
                <br />
                • <strong className="text-[#f3efe6]">Guia do Local & Cronograma:</strong> Fornece o alfinete de geolocalização do The Monica Club (<code className="text-[#ef4444]">MapPin</code>), o marcador de horário da abertura dos portões (<code className="text-[#ef4444]">Clock</code>) e escudos de segurança (<code className="text-[#ef4444]">ShieldCheck</code>).
                <br />
                • <strong className="text-[#f3efe6]">Laboratório Sonoro dos Músicos:</strong> Alimenta os botões de execução de áudio dos instrumentos (<code className="text-[#ef4444]">Volume2</code>, <code className="text-[#ef4444]">Disc3</code>, <code className="text-[#ef4444]">Wrench</code>).
                <br />
                • <strong className="text-[#f3efe6]">Zero pixelização:</strong> Por serem vetores matemáticos SVG, os ícones mantêm 100% de nitidez cristalina em monitores Retina, celulares OLED e impressões de ingressos.
              </p>
            </div>

            {/* LIVE INTERACTIVE DEMO FOR LUCIDE-REACT */}
            <div className="mt-5 bg-[#140e0d] p-4 border border-[#4a2820]">
              <span className="font-mono text-xs uppercase text-[#ef4444] font-bold block mb-2">
                ⚡ DEMONSTRAÇÃO AO VIVO (CONTROLE DE TAMANHO E PALETA DOS ÍCONES):
              </span>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#cfc8ba]">Cor:</span>
                  <button
                    onClick={() => setIconColor('red')}
                    className={`px-2 py-1 text-[10px] uppercase font-bold ${iconColor === 'red' ? 'bg-[#b91c1c] text-white' : 'bg-[#0b0706] text-[#cfc8ba]'}`}
                  >
                    Vermelho Sangue
                  </button>
                  <button
                    onClick={() => setIconColor('white')}
                    className={`px-2 py-1 text-[10px] uppercase font-bold ${iconColor === 'white' ? 'bg-[#f3efe6] text-black' : 'bg-[#0b0706] text-[#cfc8ba]'}`}
                  >
                    Branco Osso
                  </button>
                  <button
                    onClick={() => setIconColor('crimson')}
                    className={`px-2 py-1 text-[10px] uppercase font-bold ${iconColor === 'crimson' ? 'bg-[#7f1d1d] text-white' : 'bg-[#0b0706] text-[#cfc8ba]'}`}
                  >
                    Carmesim Escuro
                  </button>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#cfc8ba]">Tamanho:</span>
                  {[18, 24, 32].map((s) => (
                    <button
                      key={s}
                      onClick={() => setIconSize(s)}
                      className={`px-2 py-1 text-[10px] font-bold ${iconSize === s ? 'bg-[#b91c1c] text-white' : 'bg-[#0b0706] text-[#cfc8ba]'}`}
                    >
                      {s}px
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#0b0706] p-3 border border-[#4a2820] flex items-center gap-2.5">
                  <Ticket style={{ color: getIconColorHex(), width: iconSize, height: iconSize }} />
                  <span className="font-mono text-[11px] text-[#cfc8ba]">Ticket (Ingressos)</span>
                </div>
                <div className="bg-[#0b0706] p-3 border border-[#4a2820] flex items-center gap-2.5">
                  <QrCode style={{ color: getIconColorHex(), width: iconSize, height: iconSize }} />
                  <span className="font-mono text-[11px] text-[#cfc8ba]">QrCode (Portaria)</span>
                </div>
                <div className="bg-[#0b0706] p-3 border border-[#4a2820] flex items-center gap-2.5">
                  <Volume2 style={{ color: getIconColorHex(), width: iconSize, height: iconSize }} />
                  <span className="font-mono text-[11px] text-[#cfc8ba]">Volume2 (Sampler)</span>
                </div>
                <div className="bg-[#0b0706] p-3 border border-[#4a2820] flex items-center gap-2.5">
                  <ShieldCheck style={{ color: getIconColorHex(), width: iconSize, height: iconSize }} />
                  <span className="font-mono text-[11px] text-[#cfc8ba]">ShieldCheck (Segurança)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              BIBLIOTECA 3: CANVAS-CONFETTI
          ======================================================== */}
          <div className="bg-[#0b0706] border border-[#4a2820] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#4a2820] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#7f1d1d] text-white font-mono text-xs px-2.5 py-0.5 font-bold uppercase">
                  BIBLIOTECA 03
                </span>
                <h3 className="font-headline text-3xl text-[#f3efe6]">CANVAS-CONFETTI</h3>
              </div>
              <span className="font-mono text-xs text-[#ef4444] font-bold bg-[#1a0e0c] px-3 py-1 border border-[#4a2820]">
                npm: canvas-confetti
              </span>
            </div>

            <div className="flex flex-col gap-3 text-xs leading-relaxed text-[#cfc8ba] font-body">
              <p>
                <strong className="text-[#f3efe6] uppercase font-mono text-sm block mb-1">
                  1. O QUE É:
                </strong>
                É uma biblioteca de física de partículas ultraleve focada em desempenho extremo. Em vez de criar centenas de elementos HTML no DOM (o que travaria a página e causaria perda de quadros em dispositivos móveis), ela desenha e calcula a trajetória, gravidade, arrasto e rotação de cada partícula diretamente em um elemento <code className="text-[#ef4444]">&lt;canvas&gt;</code> transparente acelerado pela GPU.
              </p>

              <p>
                <strong className="text-[#ef4444] uppercase font-mono text-sm block mb-1">
                  2. O QUE FAZ NA NOSSA APLICAÇÃO:
                </strong>
                • <strong className="text-[#f3efe6]">Feedback do Ritual de Compra:</strong> Quando o fã clica em &quot;Confirmar & Emitir Bilhete Digital&quot; no checkout, ela dispara uma chuva temática de partículas escarlates e brasa negra.
                <br />
                • <strong className="text-[#f3efe6]">Confirmação de Pedido na Merch Store:</strong> Ao finalizar a compra de moletons e camisetas, o usuário recebe a mesma celebração visual.
                <br />
                • <strong className="text-[#f3efe6]">Totalmente Customizável:</strong> Configuramos uma paleta de cores temática personalizada (<code className="text-[#ef4444]">[&#39;#ef4444&#39;, &#39;#b91c1c&#39;, &#39;#7f1d1d&#39;, &#39;#f3efe6&#39;]</code>) que traduz a estética brutal do Nu Metal.
              </p>
            </div>

            {/* LIVE INTERACTIVE DEMO FOR CANVAS-CONFETTI */}
            <div className="mt-5 bg-[#140e0d] p-4 border border-[#4a2820] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase text-[#ef4444] font-bold block">
                  ⚡ DEMONSTRAÇÃO AO VIVO:
                </span>
                <span className="text-xs text-[#cfc8ba] font-body">
                  Dispare os canhões de partículas nos botões ao lado para ver a física do Canvas em ação:
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleTestConfetti('subtle')}
                  className="bg-[#3f1e1a] hover:bg-[#b91c1c] text-[#f3efe6] px-4 py-2 font-mono text-xs uppercase font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Explosão Moderada (50 Partículas)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTestConfetti('burst')}
                  className="bg-[#b91c1c] hover:bg-[#ef4444] text-white px-4 py-2 font-mono text-xs uppercase font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Ritual Total (140 Partículas)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#1a0e0c] border-t border-[#4a2820] p-4 flex items-center justify-between">
          <span className="font-mono text-[11px] text-[#cfc8ba]">
            Todas as 3 bibliotecas estão ativas, integradas e verificadas no código.
          </span>
          <button
            onClick={onClose}
            className="bg-[#b91c1c] hover:bg-[#ef4444] text-white font-headline text-lg uppercase px-6 py-2 transition-colors cursor-pointer shadow-md"
          >
            Entendido // Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
