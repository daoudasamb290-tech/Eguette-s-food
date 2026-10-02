import React from 'react';
import { Store, UtensilsCrossed, MapPin, Bike } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  activeOrderCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  activeOrderCount = 0,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#f9f9ff]/90 backdrop-blur-xl border-t border-black/[0.05] shadow-[0_-4px_20px_rgba(20,27,43,0.06)]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {/* Tab 1: Accueil */}
        <button
          onClick={() => onTabChange('accueil')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] px-3 py-1 rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'accueil'
              ? 'text-[#855300] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Store className={`w-5 h-5 ${activeTab === 'accueil' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[11px] font-semibold tracking-tight">Accueil</span>
        </button>

        {/* Tab 2: Menu */}
        <button
          onClick={() => onTabChange('menu')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] px-3 py-1 rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'menu'
              ? 'text-[#855300] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <UtensilsCrossed className={`w-5 h-5 ${activeTab === 'menu' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[11px] font-semibold tracking-tight">Menu</span>
        </button>

        {/* Tab 3: Adresses */}
        <button
          onClick={() => onTabChange('adresses')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] px-3 py-1 rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'adresses'
              ? 'text-[#855300] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <MapPin className={`w-5 h-5 ${activeTab === 'adresses' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[11px] font-semibold tracking-tight">Adresses</span>
        </button>

        {/* Tab 4: Suivi */}
        <button
          onClick={() => onTabChange('suivi')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] px-3 py-1 rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'suivi'
              ? 'text-[#855300] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Bike className={`w-5 h-5 ${activeTab === 'suivi' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            {activeOrderCount > 0 && (
              <span className="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-[#bb0112] animate-ping" />
            )}
          </div>
          <span className="text-[11px] font-semibold tracking-tight">Suivi</span>
        </button>
      </div>
    </nav>
  );
};
