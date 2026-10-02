import React from 'react';
import {
  CheckCircle,
  Bike,
  Store,
  Clock,
  MessageCircle,
  ArrowRight,
  X
} from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order;
  onClose: () => void;
  onViewTracking: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewTracking,
}) => {
  const openWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `Bonjour Eguette's Dakar ! J'ai bien validé ma commande ${order.id} d'un montant de ${order.total.toLocaleString(
        'fr-FR'
      )} FCFA. Pouvez-vous me confirmer sa bonne prise en compte ? Merci !`
    );
    window.open(`https://wa.me/221778810808?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full flex flex-col items-center text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Big Check Animation Ring */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
          <CheckCircle className="w-9 h-9 stroke-[2.5px]" />
        </div>

        <span className="text-[11px] font-bold text-[#855300] uppercase tracking-wider">
          Commande Validée avec succès
        </span>
        <h2 className="font-display text-xl font-bold text-[#141b2b] mt-0.5">
          Merci {order.customerName} !
        </h2>

        <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
          Votre commande{' '}
          <strong className="text-[#141b2b] font-bold">#{order.id}</strong> a été transmise
          à la brigade en cuisine.
        </p>

        {/* Summary Info Pill */}
        <div className="w-full my-4 p-3 bg-[#f1f3ff] rounded-2xl flex items-center justify-around border border-slate-200/60 text-xs">
          <div className="flex flex-col items-center">
            <span className="text-slate-500 text-[10px]">Temps estimé</span>
            <span className="font-display font-bold text-[#141b2b] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#855300]" /> ~{order.estimatedMinutes} min
            </span>
          </div>

          <div className="w-px h-8 bg-slate-200" />

          <div className="flex flex-col items-center">
            <span className="text-slate-500 text-[10px]">Mode</span>
            <span className="font-display font-bold text-[#141b2b] flex items-center gap-1">
              {order.fulfillmentMode === 'delivery' ? (
                <>
                  <Bike className="w-3.5 h-3.5 text-[#bb0112]" /> Livraison
                </>
              ) : (
                <>
                  <Store className="w-3.5 h-3.5 text-[#855300]" /> Retrait
                </>
              )}
            </span>
          </div>

          <div className="w-px h-8 bg-slate-200" />

          <div className="flex flex-col items-center">
            <span className="text-slate-500 text-[10px]">Total</span>
            <span className="font-display font-bold text-[#bb0112] tabular-nums">
              {order.total.toLocaleString('fr-FR')} F
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={onViewTracking}
            className="w-full py-3 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>Suivre ma commande en direct</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={openWhatsAppConfirmation}
            className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/20 text-[#141b2b] text-xs font-bold flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>Confirmer sur WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
