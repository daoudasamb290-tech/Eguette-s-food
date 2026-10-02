import React, { useState } from 'react';
import {
  Bike,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Flame,
  Search,
  Receipt,
  Store,
  MessageCircle,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Order } from '../types';

interface TrackingScreenProps {
  activeOrder: Order | null;
  onNavigateToMenu: () => void;
  onSimulateDemoOrder: () => void;
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({
  activeOrder,
  onNavigateToMenu,
  onSimulateDemoOrder,
}) => {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);

  const displayOrder = searchedOrder || activeOrder;

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    if (activeOrder && activeOrder.id.toLowerCase().includes(searchOrderId.trim().toLowerCase())) {
      setSearchedOrder(activeOrder);
    } else {
      // Mock lookup
      setSearchedOrder({
        id: searchOrderId.toUpperCase().startsWith('EG-') ? searchOrderId.toUpperCase() : `EG-${searchOrderId.toUpperCase()}`,
        date: "Il y a 15 min",
        customerName: "Ami Diop",
        customerPhone: "+221 77 123 45 67",
        fulfillmentMode: 'delivery',
        deliveryZone: 'Dakar Centre (Plateau)',
        deliveryAddress: 'Avenue Pompidou, Résidence Les Almadies',
        items: [],
        subtotal: 6500,
        deliveryFee: 1500,
        total: 8000,
        status: 'in_delivery',
        paymentMethod: 'Paiement à la livraison',
        estimatedMinutes: 12,
      });
    }
  };

  const getStepStatus = (stepIndex: number, currentStatus?: string) => {
    const statuses = ['received', 'preparing', 'in_delivery', 'delivered'];
    const currentIndex = currentStatus ? statuses.indexOf(currentStatus) : 1;
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="flex flex-col w-full pb-28">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        {/* Top Header */}
        <div className="pt-4 pb-2 flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-[#bb0112] rounded-full" />
            <h2 className="font-display text-[22px] sm:text-[28px] text-[#141b2b] font-bold tracking-tight">
              Suivi de Commande en Direct
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Suivez la confection et la livraison de vos street foods en temps réel à Dakar et Saly.
          </p>
        </div>

        {/* Search Order Bar */}
        <div className="w-full">
          <form onSubmit={handleSearchOrder} className="relative w-full max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="Numéro de commande (ex: EG-8429)..."
              className="w-full bg-white text-[#141b2b] text-xs sm:text-sm pl-10 pr-28 py-3.5 rounded-2xl border border-slate-200 shadow-xs focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] text-xs font-bold active:scale-95 transition-transform cursor-pointer"
            >
              Vérifier
            </button>
          </form>
        </div>

      {/* Active Order Card or Demo Prompt */}
      {displayOrder ? (
        <div className="px-4 flex flex-col gap-4 mt-4">
          {/* Order Status Hero Card */}
          <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#855300] uppercase tracking-wider">
                  Commande {displayOrder.id}
                </span>
                <span className="font-display text-base font-bold text-[#141b2b]">
                  {displayOrder.fulfillmentMode === 'delivery'
                    ? 'Livraison Express en cours'
                    : 'Préparation pour retrait'}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ffddb8] text-[#855300] text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
                ~{displayOrder.estimatedMinutes} min
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 flex flex-col gap-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Step 1: Reçue */}
              {(() => {
                const s = getStepStatus(0, displayOrder.status);
                return (
                  <div className="relative flex flex-col gap-0.5">
                    <span
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        s === 'completed' || s === 'active'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <h4 className="text-xs font-bold text-[#141b2b]">Commande reçue &amp; validée</h4>
                    <p className="text-[11px] text-slate-500">
                      Enregistrée avec succès • {displayOrder.date}
                    </p>
                  </div>
                );
              })()}

              {/* Step 2: En préparation */}
              {(() => {
                const s = getStepStatus(1, displayOrder.status);
                return (
                  <div className="relative flex flex-col gap-0.5">
                    <span
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        s === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : s === 'active'
                          ? 'bg-[#f59e0b] text-[#2a1700] ring-4 ring-[#f59e0b]/20'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                    </span>
                    <h4 className="text-xs font-bold text-[#141b2b]">En préparation en cuisine</h4>
                    <p className="text-[11px] text-slate-500">
                      Gaufre alvéolée minute &amp; steaks grillés sur la plancha.
                    </p>
                  </div>
                );
              })()}

              {/* Step 3: En route */}
              {(() => {
                const s = getStepStatus(2, displayOrder.status);
                return (
                  <div className="relative flex flex-col gap-0.5">
                    <span
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        s === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : s === 'active'
                          ? 'bg-[#bb0112] text-white ring-4 ring-[#bb0112]/20'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Bike className="w-3.5 h-3.5" />
                    </span>
                    <h4 className="text-xs font-bold text-[#141b2b]">
                      {displayOrder.fulfillmentMode === 'delivery'
                        ? 'En route avec le coursier'
                        : 'Prête au comptoir'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {displayOrder.fulfillmentMode === 'delivery'
                        ? 'Le coursier est en chemin avec le sac isotherme.'
                        : 'Votre sac est prêt à être récupéré.'}
                    </p>
                  </div>
                );
              })()}

              {/* Step 4: Livrée */}
              {(() => {
                const s = getStepStatus(3, displayOrder.status);
                return (
                  <div className="relative flex flex-col gap-0.5">
                    <span
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        s === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <h4 className="text-xs font-bold text-slate-500">Livrée &amp; Dégustée</h4>
                    <p className="text-[11px] text-slate-400">
                      Bon appétit et à très bientôt chez Eguette's !
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Courier Card (if delivery) */}
            {displayOrder.fulfillmentMode === 'delivery' && (
              <div className="p-3 rounded-xl bg-[#f1f3ff] flex items-center justify-between border border-slate-200/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#f59e0b] text-[#2a1700] flex items-center justify-center font-bold text-xs">
                    MD
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#141b2b]">Mamadou Diallo</span>
                    <span className="text-[11px] text-slate-500">Livreur Express Dakar</span>
                  </div>
                </div>

                <a
                  href="tel:+221778810808"
                  className="w-8 h-8 rounded-full bg-white text-[#855300] flex items-center justify-center shadow-xs hover:bg-[#ffddb8] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Destination Info */}
            <div className="flex flex-col gap-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="font-bold text-[#141b2b]">
                {displayOrder.fulfillmentMode === 'delivery'
                  ? 'Adresse de livraison :'
                  : 'Point de retrait :'}
              </span>
              <p className="text-slate-600">
                {displayOrder.fulfillmentMode === 'delivery'
                  ? `${displayOrder.deliveryAddress || 'Dakar Centre'} (${displayOrder.deliveryZone || 'Dakar'})`
                  : displayOrder.pickupStore || 'Cité Keur Gorgui'}
              </p>
            </div>
          </div>

          {/* WhatsApp Assistance button */}
          <a
            href={`https://wa.me/221778810808?text=Bonjour%20Eguette's%20!%20Je%20souhaite%20des%20nouvelles%20de%20ma%20commande%20${displayOrder.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/20 text-[#141b2b] text-xs font-bold flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>Contacter le support pour cette commande</span>
          </a>
        </div>
      ) : (
        <div className="px-4 mt-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#855300] mb-3">
            <Bike className="w-8 h-8" />
          </div>
          <h3 className="font-display text-base font-bold text-[#141b2b]">
            Aucune commande en cours
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
            Passez commande dès maintenant pour suivre son trajet en direct jusqu'à chez vous !
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={onNavigateToMenu}
              className="px-5 py-2.5 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] text-xs font-bold active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              Commander maintenant
            </button>
            <button
              onClick={onSimulateDemoOrder}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
            >
              Simuler un suivi test
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
