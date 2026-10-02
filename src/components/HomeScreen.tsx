import React, { useState } from 'react';
import {
  Flame,
  Utensils,
  BookOpen,
  Clock,
  Zap,
  ShoppingBag,
  ArrowRight,
  Plus,
  Check,
  MapPin,
  MessageCircle,
  Instagram,
  PhoneCall,
  Sparkles,
  ChefHat,
  Smartphone,
  Bike,
  Store,
  ExternalLink
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { HERO_IMAGE, PRODUCTS } from '../data/menuData';

interface HomeScreenProps {
  onNavigateToMenu: (category?: ProductCategory) => void;
  onNavigateToLocations: () => void;
  onOpenProductDetail: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onOpenCheckout: () => void;
  cartCount: number;
  cartSubtotal: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToMenu,
  onNavigateToLocations,
  onOpenProductDetail,
  onQuickAddToCart,
  onOpenCheckout,
  cartCount,
  cartSubtotal,
}) => {
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddWithFeedback = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // 3 featured top items matching screenshot
  const featuredProducts = [
    PRODUCTS.find((p) => p.id === 'waffle-banana') || PRODUCTS[5],
    PRODUCTS.find((p) => p.id === 'deal-burger') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'crepe-momo') || PRODUCTS[4],
  ];

  return (
    <div className="flex flex-col w-full pb-28">
      <div className="max-w-7xl mx-auto w-full px-0 sm:px-6 lg:px-8 flex flex-col">
        {/* 1. Hero Showcase Banner */}
        <section className="relative w-full overflow-hidden bg-slate-900 sm:rounded-3xl sm:mt-4 shadow-xl border border-slate-200/40">
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Street food Eguette's Dakar gourmandise"
              className="w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.5';
              }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141b2b] via-[#141b2b]/55 to-black/20" />

            {/* Floating Pill Tag */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#bb0112] text-white text-xs sm:text-sm font-bold shadow-lg tracking-wide">
                <Flame className="w-4 h-4 fill-white" />
                <span>Street Food Dakar 100% Frais</span>
              </span>
            </div>

            {/* Bottom Title & Tagline */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white max-w-3xl">
              <h1 className="font-display text-[26px] sm:text-[38px] md:text-[48px] leading-[1.15] font-extrabold text-white tracking-tight drop-shadow-md">
                Bienvenue chez Eguette's
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium text-slate-200 mt-1.5 sm:mt-2 drop-shadow-md">
                Des saveurs artisanales, généreuses et croustillantes qui font la différence à Dakar.
              </p>
            </div>
          </div>

          {/* Hero Quick Action Bar */}
          <div className="px-4 sm:px-8 pt-4 pb-5 flex flex-col gap-3.5 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigateToMenu()}
                className="flex-1 min-h-[48px] sm:min-h-[52px] px-6 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5px]" />
                <span>Commander maintenant</span>
              </button>
              <button
                onClick={() => onNavigateToMenu()}
                className="min-h-[48px] sm:min-h-[52px] px-6 rounded-2xl bg-[#e9edff] hover:bg-[#dce2f7] text-[#141b2b] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Consulter la carte complète</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-1 text-slate-600 text-xs sm:text-sm font-semibold gap-2">
              <span className="flex items-center gap-1.5 text-[#855300]">
                <Clock className="w-4 h-4" /> 11h - 00h non-stop 7j/7
              </span>
              <span className="flex items-center gap-1.5 text-[#bb0112]">
                <Zap className="w-4 h-4 fill-current" /> Préparé minute à la commande
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-emerald-700">
                <Check className="w-4 h-4 stroke-[3px]" /> 3 Comptoirs à Dakar &amp; Saly
              </span>
            </div>
          </div>
        </section>

        {/* 2. Catégories Gourmandes Scroller / Responsive Grid */}
        <section className="mt-8 px-4 sm:px-0 flex flex-col">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-[#f59e0b] rounded-full" />
              <h2 className="font-display text-[18px] sm:text-[22px] text-[#141b2b] font-bold tracking-tight">
                Catégories gourmandes
              </h2>
            </div>
            <button
              onClick={() => onNavigateToMenu()}
              className="text-xs sm:text-sm font-bold text-[#855300] hover:underline cursor-pointer"
            >
              Tout voir ({PRODUCTS.length})
            </button>
          </div>

          {/* Categories Chips */}
          <div className="flex md:grid md:grid-cols-4 lg:grid-cols-8 gap-2.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => onNavigateToMenu('deals')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#f59e0b] text-[#2a1700] shadow-sm font-bold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#2a1700]" />
              <span>Good Deals</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('crepes-salees')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200/80 shadow-xs font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-[#855300]" />
              <span>Crêpes salées</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('waffle')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200/80 shadow-xs font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#855300]" />
              <span>Bubble Waffle</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('crepes-sucrees')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200/80 shadow-xs font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-[#855300]" />
              <span>Crêpes sucrées</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('milkshake')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200/80 shadow-xs font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#855300]" />
              <span>Milkshake</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('egg-toast')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200/80 shadow-xs font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <ChefHat className="w-4 h-4 text-[#855300]" />
              <span>Egg'Toast</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('boissons')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200/80 shadow-xs font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#855300]" />
              <span>Boissons</span>
            </button>

            <button
              onClick={() => onNavigateToMenu('bubble-tea')}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200/80 shadow-xs font-semibold text-xs active:scale-95 transition-transform cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#855300]" />
              <span>Bubble Tea</span>
            </button>
          </div>
        </section>

        {/* 3. Nos Incontournables (Responsive 1/2/3 Columns) */}
        <section className="mt-10 px-4 sm:px-0 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-[#bb0112] rounded-full" />
              <h2 className="font-display text-[18px] sm:text-[22px] text-[#141b2b] font-bold tracking-tight">
                Nos incontournables
              </h2>
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Top ventes Dakar &amp; Saly
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProducts.map((product) => {
              const isAdded = !!addedIds[product.id];
              return (
                <article
                  key={product.id}
                  onClick={() => onOpenProductDetail(product)}
                  className="bg-white rounded-3xl p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(20,27,43,0.05)] border border-slate-100 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 group"
                >
                  <div className="flex gap-3.5 sm:gap-4">
                    {/* Product Thumbnail */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.altText}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.badge && (
                        <span
                          className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                            product.badgeType === 'deal'
                              ? 'bg-[#bb0112] text-white'
                              : 'bg-[#f59e0b] text-[#2a1700]'
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-display text-[16px] sm:text-[18px] text-[#141b2b] font-bold truncate">
                            {product.name}
                          </h3>
                          {product.category === 'crepes-salees' && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                              Salée
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="font-display text-[20px] sm:text-[22px] text-[#bb0112] font-black tabular-nums">
                          {product.price.toLocaleString('fr-FR')}
                        </span>
                        <span className="text-xs font-bold text-slate-700">FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#855300]" /> {product.prepTime}
                    </span>

                    <button
                      onClick={(e) => handleAddWithFeedback(e, product)}
                      className={`min-h-[38px] px-4 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-90 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3px]" />
                          <span>Ajouté</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[3px]" />
                          <span>Ajouter au panier</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. L'expérience Eguette's: Pourquoi commander chez nous ? */}
        <section className="mt-12 px-4 sm:px-0">
          <div className="rounded-3xl bg-[#f1f3ff] p-6 sm:p-8 flex flex-col gap-5 border border-slate-200/50">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#855300] tracking-wider uppercase">
                L'expérience Eguette's Dakar
              </span>
              <h2 className="font-display text-[20px] sm:text-[26px] text-[#141b2b] font-bold mt-1">
                Pourquoi commander chez nous ?
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-4 rounded-2xl bg-white shadow-xs flex flex-col gap-2.5 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#ffddb8] flex items-center justify-center text-[#855300]">
                  <ChefHat className="w-5 h-5 text-[#855300]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#141b2b] leading-tight">Faits minute</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    Gourmandise chaude et croustillante préparée à votre commande.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-xs flex flex-col gap-2.5 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#dce2f7] flex items-center justify-center text-[#141b2b]">
                  <Smartphone className="w-5 h-5 text-slate-800" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#141b2b] leading-tight">Commande simple</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    Sans inscription contraignante ni mot de passe.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-xs flex flex-col gap-2.5 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#bb0112]">
                  <Bike className="w-5 h-5 text-[#bb0112]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#141b2b] leading-tight">Livraison rapide</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    À Dakar &amp; Saly en un clin d'œil avec nos coursiers dédiés.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-xs flex flex-col gap-2.5 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#ede3b8] flex items-center justify-center text-[#665f3d]">
                  <Store className="w-5 h-5 text-[#665f3d]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#141b2b] leading-tight">3 Adresses</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    Des spots gourmands proches, chaleureux et conviviaux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Retrouvez-nous (Responsive 1/3 Columns) */}
        <section className="mt-12 px-4 sm:px-0 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-[#665f3d] rounded-full" />
              <h2 className="font-display text-[18px] sm:text-[22px] text-[#141b2b] font-bold tracking-tight">
                Retrouvez-nous
              </h2>
            </div>
            <button
              onClick={onNavigateToLocations}
              className="text-xs sm:text-sm font-bold text-[#855300] hover:underline cursor-pointer"
            >
              Voir les 3 comptoirs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div
              onClick={onNavigateToLocations}
              className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#f59e0b] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#855300] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base font-bold text-[#141b2b]">Cité Keur Gorgui</h3>
                  <span className="text-xs text-slate-500">Dakar centre • Emporter &amp; Livraison</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Ouvert
              </span>
            </div>

            <div
              onClick={onNavigateToLocations}
              className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#f59e0b] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#855300] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base font-bold text-[#141b2b]">Rond-point Ngor / Almadies</h3>
                  <span className="text-xs text-slate-500">Zone animée • 7j/7</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Ouvert
              </span>
            </div>

            <div
              onClick={onNavigateToLocations}
              className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#f59e0b] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#855300] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base font-bold text-[#141b2b]">Saly / Station Sokoo</h3>
                  <span className="text-xs text-slate-500">Petite Côte • Ambiance vacances</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Ouvert
              </span>
            </div>
          </div>
        </section>

        {/* 6. WhatsApp Direct Order Banner */}
        <section className="mt-8 px-4 sm:px-0">
          <a
            href="https://wa.me/221778810808?text=Bonjour%20Eguette's%20Dakar%20!%20Je%20souhaite%20commander%20chez%20vous."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-5 rounded-3xl bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 text-[#141b2b] flex items-center justify-between shadow-xs active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-[#141b2b]">
                  Commander directement sur WhatsApp
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-600">
                  +221 77 881 08 08 (Réponse immédiate)
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#855300]" />
          </a>
        </section>

        {/* 7. Sticky Bottom Cart Bar (if items in cart) */}
        {cartCount > 0 && (
          <div className="sticky bottom-20 md:bottom-6 z-30 px-4 sm:px-0 mt-8 animate-in slide-in-from-bottom-3 duration-300">
            <div className="max-w-2xl mx-auto w-full bg-[#141b2b] text-white p-3.5 rounded-3xl shadow-2xl flex items-center justify-between gap-4 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f59e0b] text-[#2a1700] flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5 text-[#2a1700]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-300">
                    {cartCount} article{cartCount > 1 ? 's' : ''} au panier
                  </span>
                  <span className="font-display text-base font-bold text-[#ffb95f] tabular-nums">
                    {cartSubtotal.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenCheckout}
                className="min-h-[44px] px-6 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] font-bold text-xs sm:text-sm flex items-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>Finaliser la commande</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 8. Footer */}
        <footer className="mt-16 pt-10 pb-8 px-6 bg-[#f1f3ff] flex flex-col gap-8 rounded-3xl border border-slate-200/60">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2 md:col-span-2">
              <h3 className="font-display text-[20px] font-bold text-[#141b2b]">
                Eguette's Street Food Dakar
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                La street food artisanale, gourmande et généreuse au cœur du Sénégal. Bubble waffles, crêpes gourmandes, burgers et saveurs locales.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#855300] uppercase tracking-wider">
                Service Client &amp; Livraison
              </span>
              <a
                href="tel:+221778810808"
                className="text-xs sm:text-sm text-slate-700 hover:text-[#855300] font-semibold flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#855300]" /> +221 77 881 08 08
              </a>
              <a
                href="tel:+221776867676"
                className="text-xs sm:text-sm text-slate-700 hover:text-[#855300] font-semibold flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#855300]" /> +221 77 686 76 76
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#855300] uppercase tracking-wider">
                Horaires d'ouverture
              </span>
              <span className="text-xs sm:text-sm text-slate-600">Tous les jours de la semaine</span>
              <span className="text-xs sm:text-sm font-bold text-[#141b2b]">11h00 - 00h00 Non-Stop</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 p-4 rounded-2xl border border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#bb0112]">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#141b2b]">Suivez-nous sur Instagram</span>
                <span className="text-[11px] text-slate-500">@eguette_sdakar</span>
              </div>
            </div>
            <a
              href="https://instagram.com/eguette_sdakar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#855300] flex items-center gap-1.5 hover:underline"
            >
              <span>Découvrir la communauté</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200/60">
            © 2026 Eguette's Dakar. Tous droits réservés.
          </div>
        </footer>
      </div>
    </div>
  );
};
