import React from 'react';
import { ShoppingBag, User, ArrowLeft, Store, UtensilsCrossed, MapPin, Bike } from 'lucide-react';
import { TabType } from '../types';
import { LOGO_URL } from '../data/menuData';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
  cartSubtotal?: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  cartCount,
  cartSubtotal = 0,
  onOpenCart,
  onOpenProfile,
  onBack,
  title = "Eguette's",
  subtitle,
  showBack = false,
  onGoHome,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'accueil', label: 'Accueil', icon: <Store className="w-4 h-4" /> },
    { id: 'menu', label: 'Menu & Carte', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'adresses', label: 'Nos 3 Comptoirs', icon: <MapPin className="w-4 h-4" /> },
    { id: 'suivi', label: 'Suivi Commande', icon: <Bike className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-[#f9f9ff]/90 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Section: Back button or Brand Logo + Status */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack ? (
            <button
              onClick={onBack}
              aria-label="Retour"
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center text-[#141b2b] hover:bg-slate-100 active:scale-95 transition-all -ml-1 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-[#141b2b]" />
            </button>
          ) : null}

          {/* Logo with image & fallback */}
          <div 
            onClick={onGoHome || (() => onTabChange('accueil'))}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative h-8 sm:h-9 w-auto flex-shrink-0 flex items-center">
              <img
                src={LOGO_URL}
                alt="Logo Eguette's Street Food Dakar"
                className="h-8 sm:h-9 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="logo-fallback hidden w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-[#f59e0b] items-center justify-center text-white font-bold text-sm shadow-sm">
                EG
              </div>
            </div>

            <div className="flex flex-col truncate">
              <div className="flex items-center gap-2 truncate">
                <span className="font-display text-[17px] sm:text-[19px] leading-tight font-extrabold text-[#141b2b] truncate tracking-tight">
                  {title}
                </span>
                <span className="hidden xl:inline-block px-2 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#855300] text-[10px] font-bold">
                  Street Food Dakar
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="text-[11px] font-semibold text-[#855300] truncate">
                  Ouvert • Dakar &amp; Saly 7j/7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Links (hidden on mobile, visible on tablet & desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#855300] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Shopping Cart & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Desktop & Mobile Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Panier"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs text-slate-800 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-slate-800 group-hover:text-[#bb0112] transition-colors" />
              {cartCount > 0 && (
                <span className="sm:hidden absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#bb0112] text-white text-[10px] flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold">
              <span>Panier</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#bb0112] text-white text-[10px]">
                  {cartCount}
                </span>
              )}
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline text-slate-400 font-normal">•</span>
              )}
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline font-display text-[#bb0112] tabular-nums font-bold">
                  {cartSubtotal.toLocaleString('fr-FR')} F
                </span>
              )}
            </div>
          </button>

          {/* User Profile Button */}
          <button
            onClick={onOpenProfile}
            aria-label="Mon Profil et Commandes"
            className="flex items-center gap-2 p-1 sm:px-3 sm:py-2 rounded-full bg-[#855300] hover:bg-[#653e00] text-white shadow-[0_2px_6px_rgba(133,83,0,0.2)] active:scale-95 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline text-xs font-bold pr-1">Mon Espace</span>
          </button>
        </div>
      </div>
    </header>
  );
};
