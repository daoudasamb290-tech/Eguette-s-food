import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Check,
  Store,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { STORE_LOCATIONS } from '../data/menuData';

interface LocationsScreenProps {
  onSelectStoreForOrder: (storeId: string) => void;
}

export const LocationsScreen: React.FC<LocationsScreenProps> = ({
  onSelectStoreForOrder,
}) => {
  return (
    <div className="flex flex-col w-full pb-28">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Top Header Section */}
        <div className="pt-4 pb-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-[#665f3d] rounded-full" />
            <h2 className="font-display text-[22px] sm:text-[28px] text-[#141b2b] font-bold tracking-tight">
              Nos 3 Comptoirs à Dakar &amp; Saly
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Venez déguster vos gaufres et burgers sur place ou commandez à emporter dans nos spots conviviaux ouverts 7 jours sur 7.
          </p>
        </div>

        {/* Locations List Grid (1 col on mobile, 3 cols on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {STORE_LOCATIONS.map((store) => (
            <article
              key={store.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Store Cover Image */}
              <div className="relative w-full h-48 sm:h-52 bg-slate-900 overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    {store.status} • 7j/7
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="text-[11px] font-semibold text-[#f59e0b] uppercase tracking-wider">
                    {store.district}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white drop-shadow-sm">
                    {store.name}
                  </h3>
                </div>
              </div>

              {/* Store Details Body */}
              <div className="p-5 flex flex-col gap-3.5 flex-1 justify-between">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-[#855300] flex-shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-[#855300] flex-shrink-0" />
                    <span className="font-semibold text-[#141b2b]">{store.hours}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {store.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#f1f3ff] text-slate-700 text-[11px] font-medium flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-[#855300]" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                  {/* Quick Actions Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, '')}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#f1f3ff] hover:bg-[#dce2f7] text-[#141b2b] text-xs font-bold active:scale-95 transition-all text-center"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#855300]" />
                      <span>Appeler</span>
                    </a>

                    <a
                      href={`https://wa.me/${store.whatsapp}?text=Bonjour%20Eguette's%20${encodeURIComponent(store.name)}%20!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#141b2b] text-xs font-bold active:scale-95 transition-all text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#ede3b8] hover:bg-[#ded19a] text-[#201c02] text-xs font-bold active:scale-95 transition-all text-center"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#855300]" />
                      <span>Itinéraire</span>
                    </a>
                  </div>

                  {/* Order Pickup button */}
                  <button
                    onClick={() => onSelectStoreForOrder(store.id)}
                    className="w-full py-3 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                  >
                    <Store className="w-4 h-4" />
                    <span>Commander à emporter ici</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
