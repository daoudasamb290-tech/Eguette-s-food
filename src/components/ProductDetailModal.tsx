import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Heart,
  Clock,
  Flame,
  Sparkles,
  Minus,
  Plus,
  Check,
  ShoppingBag,
  ChefHat,
  User,
  X
} from 'lucide-react';
import { Product, AddonOption } from '../types';
import { LOGO_URL } from '../data/menuData';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedAddons: AddonOption[],
    kitchenNote: string
  ) => void;
  onOpenProfile: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenProfile,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [kitchenNote, setKitchenNote] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Initialize selected addons with defaults
  const availableAddons = product.availableAddons || [];
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(() => {
    return availableAddons
      .filter((a) => a.defaultSelected)
      .map((a) => a.id);
  });

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Calculations
  const addonsTotalPerUnit = availableAddons
    .filter((a) => selectedAddonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const basePriceTotal = product.price * quantity;
  const addonsPriceTotal = addonsTotalPerUnit * quantity;
  const grandTotal = basePriceTotal + addonsPriceTotal;

  const handleConfirmAdd = () => {
    const selectedAddonObjects = availableAddons.filter((a) =>
      selectedAddonIds.includes(a.id)
    );
    onAddToCart(product, quantity, selectedAddonObjects, kitchenNote);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 md:backdrop-blur-sm overflow-y-auto flex flex-col md:items-center md:justify-center md:p-6 antialiased animate-in fade-in-0 duration-200">
      {/* Container: Full Screen on Mobile, Elegant Modal Box on Tablet/Desktop */}
      <div className="w-full md:max-w-4xl bg-[#f9f9ff] md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col md:max-h-[90vh] relative min-h-screen md:min-h-0">
        {/* Top Header */}
        <header className="sticky top-0 w-full z-40 bg-[#f9f9ff]/95 backdrop-blur-xl border-b border-black/[0.04] pt-safe shadow-xs">
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                aria-label="Retour"
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center text-[#141b2b] hover:bg-slate-100 active:scale-95 transition-all -ml-1 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-[#141b2b]" />
              </button>
              <img
                src={LOGO_URL}
                alt="Logo Eguette's"
                className="h-8 w-auto object-contain flex-shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <h1 className="font-display text-[17px] font-bold text-[#141b2b] truncate max-w-[200px] text-center">
              Détail Produit
            </h1>

            <button
              onClick={onClose}
              aria-label="Fermer"
              className="hidden md:flex w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenProfile}
              aria-label="Mon compte"
              className="md:hidden w-8 h-8 rounded-full bg-[#855300] text-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_6px_rgba(133,83,0,0.2)] active:scale-95 transition-transform cursor-pointer"
            >
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </header>

        {/* 2-Column Responsive Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:grid md:grid-cols-12 pb-32 md:pb-0">
          {/* Left Column: Media Showcase (5 cols on desktop) */}
          <div className="md:col-span-5 relative bg-slate-950 flex flex-col justify-center overflow-hidden min-h-[280px] md:min-h-full">
            <img
              src={product.image}
              alt={product.altText}
              className="w-full h-full object-cover object-center max-h-[380px] md:max-h-full md:absolute md:inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f59e0b] text-[#2a1700] text-xs font-bold shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Incontournable
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#141b2b] text-xs font-semibold shadow-xs">
                  {product.categoryLabel}
                </span>
              </div>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="Favori"
                className="pointer-events-auto min-w-[38px] min-h-[38px] w-9 h-9 rounded-full bg-white/95 text-[#bb0112] flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFavorite ? 'fill-[#bb0112] text-[#bb0112]' : 'text-slate-600'
                  }`}
                />
              </button>
            </div>

            {/* Preparation Time */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#141b2b] text-xs font-semibold shadow-sm backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-[#855300]" />
              <span>Préparé minute (10–15 min)</span>
            </div>
          </div>

          {/* Right Column: Customization & Add to Cart (7 cols on desktop) */}
          <div className="md:col-span-7 flex flex-col p-4 sm:p-6 gap-4 md:overflow-y-auto">
            {/* Title & Price Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-[22px] sm:text-[24px] leading-tight text-[#141b2b] font-bold">
                    {product.name}
                  </h2>
                  <span className="text-[11px] font-bold text-[#855300] tracking-wider uppercase">
                    Signature Dakar Street Food
                  </span>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="font-display text-[20px] sm:text-[24px] text-[#bb0112] font-black tabular-nums">
                    {product.price.toLocaleString('fr-FR')}{' '}
                    <span className="text-xs font-normal text-slate-700">FCFA</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                {product.description}
              </p>

              {/* Sensory Tags */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f1f3ff] text-slate-700 text-xs font-medium">
                  <Flame className="w-3.5 h-3.5 text-[#bb0112]" />
                  Chaud &amp; Froid
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f1f3ff] text-slate-700 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                  Pâte dorée croustillante
                </div>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-display text-[15px] sm:text-[16px] text-[#141b2b] font-bold">
                  Quantité
                </span>
                <span className="text-xs text-slate-500">
                  Portions à confectionner
                </span>
              </div>

              <div className="inline-flex items-center bg-[#ede3b8] rounded-full p-1 shadow-inner gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuer"
                  className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center active:scale-95 transition-transform shadow-xs cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display text-[16px] font-bold text-[#201c02] w-6 text-center select-none tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Augmenter"
                  className="w-8 h-8 rounded-full bg-[#855300] text-white flex items-center justify-center active:scale-95 transition-transform shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Addons Section */}
            {availableAddons.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-[15px] sm:text-[16px] text-[#141b2b] font-bold">
                      Ajoutez vos suppléments gourmands
                    </h3>
                    <p className="text-xs text-slate-500">
                      Personnalisez selon vos envies
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#f1f3ff] text-slate-600 text-xs font-semibold">
                    Optionnel
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-1">
                  {availableAddons.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all select-none border ${
                          isChecked
                            ? 'bg-[#ffddb8]/20 border-[#f59e0b]/50'
                            : 'bg-[#f1f3ff]/60 border-transparent hover:bg-[#f1f3ff]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all shadow-xs ${
                              isChecked
                                ? 'bg-[#855300] text-white'
                                : 'bg-slate-200 text-transparent'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3px]" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#141b2b]">
                              {addon.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {addon.description}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-xs font-bold tabular-nums ${
                            isChecked ? 'text-[#855300]' : 'text-slate-500'
                          }`}
                        >
                          +{addon.price.toLocaleString('fr-FR')} FCFA
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Notes for Kitchen */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#141b2b]">
                <ChefHat className="w-4 h-4 text-[#855300]" />
                <label
                  htmlFor="kitchen-note"
                  className="font-display text-[15px] font-bold"
                >
                  Note spéciale pour le chef
                </label>
              </div>
              <p className="text-xs text-slate-500">
                Une demande particulière pour la cuisson ou le service ?
              </p>
              <div className="relative mt-1">
                <textarea
                  id="kitchen-note"
                  maxLength={140}
                  rows={2}
                  value={kitchenNote}
                  onChange={(e) => setKitchenNote(e.target.value)}
                  placeholder="Ex : bien croustillante, sauce Nutella servie séparée, sans Schoko-Bons..."
                  className="w-full bg-[#f1f3ff]/80 rounded-xl p-3 text-xs text-[#141b2b] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30 transition-all resize-none border border-slate-200/50"
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] font-semibold text-slate-400 select-none">
                  {kitchenNote.length}/140
                </span>
              </div>
            </div>

            {/* Composition Recap */}
            <div className="bg-[#f1f3ff] rounded-2xl p-4 flex flex-col gap-2 border border-slate-200/60">
              <span className="text-xs font-bold text-[#141b2b]">
                Récapitulatif de la composition
              </span>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Produit de base ({quantity}x)</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {basePriceTotal.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              {addonsPriceTotal > 0 && (
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Suppléments sélectionnés</span>
                  <span className="font-semibold text-[#855300] tabular-nums">
                    +{addonsPriceTotal.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              )}
              <div className="pt-2 mt-1 border-t border-slate-200/80 flex items-center justify-between font-display text-[15px] sm:text-[16px] text-[#141b2b] font-bold">
                <span>Sous-total</span>
                <span className="text-[#855300] text-[18px] sm:text-[20px] font-extrabold tabular-nums">
                  {grandTotal.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>

            {/* Desktop Add-to-cart Bar (Embedded on desktop) */}
            <div className="hidden md:flex items-center justify-between gap-4 pt-3 border-t border-slate-200 mt-2">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Total sélection
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[24px] text-[#bb0112] font-black tabular-nums">
                    {grandTotal.toLocaleString('fr-FR')}
                  </span>
                  <span className="text-xs font-bold text-[#bb0112]">FCFA</span>
                </div>
              </div>

              <button
                onClick={handleConfirmAdd}
                className="flex-1 min-h-[48px] h-12 bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-2 px-6 shadow-[0_4px_16px_rgba(245,158,11,0.35)] font-bold text-sm cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 fill-current" />
                <span>Ajouter au panier</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Checkout Bar (Hidden on desktop) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_24px_rgba(17,24,39,0.12)] px-4 pt-3 pb-safe">
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto pb-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Total commande
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[22px] text-[#bb0112] font-black tabular-nums">
                  {grandTotal.toLocaleString('fr-FR')}
                </span>
                <span className="text-xs font-bold text-[#bb0112]">FCFA</span>
              </div>
            </div>

            <button
              onClick={handleConfirmAdd}
              className="flex-1 min-h-[48px] h-12 bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] active:scale-[0.98] transition-all rounded-full flex items-center justify-center gap-2 px-5 shadow-[0_4px_16px_rgba(245,158,11,0.35)] font-bold text-sm select-none cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 fill-current" />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#141b2b] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in-0 zoom-in-95 duration-200">
          <Check className="w-5 h-5 text-emerald-400 stroke-[3px]" />
          <span className="text-xs font-semibold">
            Ajouté avec délice à votre panier !
          </span>
        </div>
      )}
    </div>
  );
};
