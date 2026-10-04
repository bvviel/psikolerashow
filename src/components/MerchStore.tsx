import { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShoppingBag, ArrowLeft, Check, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { MERCH_ITEMS } from '../data/bandData';
import { CartItem, MerchItem } from '../types';

interface MerchStoreProps {
  cart: CartItem[];
  onAddToCart: (item: MerchItem, size?: string) => void;
  onUpdateCartQty: (itemId: string, delta: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onBackToTour: () => void;
}

export default function MerchStore({
  cart,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onBackToTour,
}: MerchStoreProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'tee-tour': 'G',
    'hoodie-portal': 'GG',
  });
  const [addedNotice, setAddedNotice] = useState<string | null>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const cartTotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleAdd = (item: MerchItem) => {
    const size = item.sizes ? selectedSizes[item.id] || item.sizes[0] : undefined;
    onAddToCart(item, size);
    setAddedNotice(`"${item.name}" adicionado ao carrinho!`);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  const handleCheckoutMerch = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#b91c1c', '#cfc8ba', '#140e0d'],
      });
    } catch (err) {
      console.error(err);
    }
    setOrderCompleted(true);
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToTour}
          className="inline-flex items-center gap-2 bg-[#140e0d] hover:bg-[#3f1e1a] border border-[#4a2820] text-[#f3efe6] px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#ef4444]" />
          <span>Voltar para Turnê & Ingressos</span>
        </button>

        <div className="bg-[#291512] border border-[#b91c1c]/40 px-3 py-1 font-mono text-xs text-[#ef4444] uppercase tracking-widest font-bold flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          <span>BOUTIQUE OFICIAL // MERCHANDISE</span>
        </div>
      </div>

      <div className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ef4444] font-bold">
          ITENS EXCLUSIVOS DE TURNÊ
        </span>
        <h1 className="font-headline text-4xl sm:text-6xl uppercase tracking-tight text-[#f3efe6] mt-1">
          MERCH STORE <span className="text-[#ef4444]">OFICIAL</span>
        </h1>
        <p className="font-body text-sm text-[#cfc8ba] max-w-2xl mx-auto mt-2">
          Adquira as peças oficiais da turnê Pegadas de Sangue com envio para todo o território nacional ou com opção de retirada gratuita na tenda oficial do The Monica Club no dia do evento.
        </p>
      </div>

      {addedNotice && (
        <div className="mb-6 p-3 bg-[#1a0e0c] border border-[#ef4444] text-center font-mono text-xs text-[#ef4444] uppercase flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>{addedNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* PRODUCTS CATALOG */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {MERCH_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[#140e0d] border border-[#4a2820] p-5 flex flex-col justify-between hover:border-[#ef4444]/60 transition-all group"
            >
              <div>
                <div className="relative aspect-square bg-[#0b0706] border border-[#4a2820] overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.tag && (
                    <span className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                      {item.tag}
                    </span>
                  )}
                </div>

                <span className="font-mono text-[10px] text-[#ef4444] uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="font-headline text-2xl text-[#f3efe6] uppercase mt-0.5">{item.name}</h3>
                <p className="font-body text-xs text-[#cfc8ba] mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Size Selector */}
                {item.sizes && (
                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-[#cfc8ba] uppercase block mb-1">
                      SELECIONE O TAMANHO:
                    </span>
                    <div className="flex gap-1.5">
                      {item.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSizes((prev) => ({ ...prev, [item.id]: s }))}
                          className={`w-8 h-8 font-mono text-xs uppercase font-bold border transition-colors cursor-pointer ${
                            selectedSizes[item.id] === s
                              ? 'bg-[#b91c1c] border-[#ef4444] text-white'
                              : 'bg-[#0b0706] border-[#4a2820] text-[#cfc8ba] hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#4a2820] flex items-center justify-between">
                <div>
                  <span className="font-headline text-2xl text-[#ef4444]">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="font-mono text-[10px] text-[#cfc8ba] block">ou 3x sem juros</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(item)}
                  className="bg-[#b91c1c] hover:bg-[#ef4444] text-white px-4 py-2.5 font-headline text-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CART SUMMARY SIDEBAR */}
        <div className="lg:col-span-4 bg-[#140e0d] border-2 border-[#b91c1c] p-6 shadow-xl sticky top-24">
          <div className="flex items-center gap-2 border-b border-[#4a2820] pb-3 mb-4">
            <ShoppingBag className="w-5 h-5 text-[#ef4444]" />
            <h3 className="font-headline text-2xl text-[#f3efe6] uppercase">SEU CARRINHO DE MERCH</h3>
          </div>

          {orderCompleted ? (
            <div className="p-6 bg-[#1a0e0c] border border-[#ef4444] text-center font-mono text-xs">
              <span className="text-[#ef4444] text-lg font-headline block mb-2">PEDIDO CONFIRMADO!</span>
              <p className="text-[#cfc8ba] mb-4">
                Seus itens de merchandise oficial foram reservados com sucesso. Você receberá o código de rastreamento por e-mail.
              </p>
              <button
                onClick={() => setOrderCompleted(false)}
                className="bg-[#b91c1c] text-white px-4 py-2 uppercase font-bold text-xs"
              >
                Comprar mais itens
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#cfc8ba]">
              <span>Seu carrinho de merchandise está vazio.</span>
              <p className="text-[11px] text-[#cfc8ba]/70 mt-1">
                Adicione camisetas, moletons ou acessórios oficiais ao lado.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((cartItem) => (
                  <div
                    key={`${cartItem.id}-${cartItem.size || 'default'}`}
                    className="bg-[#0b0706] p-3 border border-[#4a2820] flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="text-[#f3efe6] font-bold block">{cartItem.name}</span>
                      {cartItem.size && (
                        <span className="text-[#ef4444] text-[10px] block">Tamanho: {cartItem.size}</span>
                      )}
                      <span className="text-[#cfc8ba]">
                        R$ {cartItem.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#4a2820]">
                        <button
                          type="button"
                          onClick={() => onUpdateCartQty(cartItem.id, -1)}
                          className="px-2 py-1 text-[#cfc8ba] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-[#f3efe6]">{cartItem.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateCartQty(cartItem.id, 1)}
                          className="px-2 py-1 text-[#cfc8ba] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(cartItem.id)}
                        className="text-[#cfc8ba] hover:text-[#ef4444] p-1 transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#4a2820] font-mono">
                <div className="flex items-center justify-between text-xs text-[#cfc8ba] mb-1">
                  <span>Subtotal Merch:</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#cfc8ba] mb-2">
                  <span>Frete para o Brasil:</span>
                  <span className="text-green-400 font-bold">GRÁTIS NESTA COMPRA</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#4a2820] font-headline text-2xl text-[#ef4444]">
                  <span>TOTAL:</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckoutMerch}
                className="w-full bg-[#b91c1c] hover:bg-[#ef4444] text-white py-3.5 font-headline text-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>FINALIZAR PEDIDO DE MERCH</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
