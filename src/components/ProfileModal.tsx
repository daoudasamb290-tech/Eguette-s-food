import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  HelpCircle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Order } from '../types';

interface ProfileModalProps {
  onClose: () => void;
  orderHistory: Order[];
  onSelectOrderToTrack: (order: Order) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  onClose,
  orderHistory,
  onSelectOrderToTrack,
}) => {
  const [userName, setUserName] = useState(() => localStorage.getItem('eguettes_username') || 'Gourmet Eguette');
  const [userPhone, setUserPhone] = useState(() => localStorage.getItem('eguettes_userphone') || '+221 77 000 00 00');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('eguettes_username', userName);
    localStorage.setItem('eguettes_userphone', userPhone);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
      <div className="bg-[#f9f9ff] rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#855300] text-white flex items-center justify-center font-bold">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#141b2b]">
                Mon Espace Eguette's
              </h3>
              <p className="text-[11px] text-slate-500">Profil &amp; Historique</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 flex flex-col gap-4">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#855300] uppercase tracking-wider">
                Mes Coordonnées
              </span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-[#f59e0b] hover:underline cursor-pointer"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Nom</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-[#f1f3ff] text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500">Téléphone WhatsApp</label>
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-[#f1f3ff] text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 py-2 px-4 bg-[#f59e0b] text-[#2a1700] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Enregistrer
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-[#141b2b]">{userName}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#855300]" /> {userPhone}
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit font-medium flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Compte Express sans mot de passe
                </span>
              </div>
            )}
          </div>

          {/* Loyalty & Rewards */}
          <div className="bg-gradient-to-br from-[#855300] to-[#2a1700] text-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#ffddb8] tracking-wider">
                Fidélité Street Food
              </span>
              <span className="font-display text-lg font-black mt-0.5">350 Pts Gourmands</span>
              <p className="text-[11px] text-slate-200 mt-0.5">
                Prochaine boisson Bissap offerte à 500 Pts
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#ffddb8]">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Past Orders History */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#141b2b] uppercase tracking-wider">
                Mes Dernières Commandes ({orderHistory.length})
              </h4>
            </div>

            {orderHistory.length > 0 ? (
              <div className="flex flex-col gap-2">
                {orderHistory.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => {
                      onSelectOrderToTrack(ord);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#f59e0b] transition-all"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs font-bold text-[#141b2b]">
                          #{ord.id}
                        </span>
                        <span className="text-[10px] text-slate-400">• {ord.date}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {ord.items.length} article{ord.items.length > 1 ? 's' : ''} •{' '}
                        {ord.total.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#855300] text-xs font-bold">
                      <span>Suivre</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-white rounded-xl text-center text-xs text-slate-400 border border-slate-100">
                Vous n'avez pas encore passé de commande.
              </div>
            )}
          </div>

          {/* Quick FAQ / Assistance */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2 text-xs">
            <span className="font-bold text-[#141b2b] flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-4 h-4 text-[#855300]" /> Questions fréquentes
            </span>
            <div className="flex flex-col gap-1.5 text-slate-600 text-[11px] leading-relaxed">
              <p>
                <strong>Quels sont les délais de livraison ?</strong><br />
                En moyenne 20 à 35 minutes sur Dakar centre, et 15 minutes sur Almadies &amp; Keur Gorgui.
              </p>
              <p className="pt-1">
                <strong>Comment payer ?</strong><br />
                En espèces, ou directement via Wave / Orange Money auprès du livreur à la réception.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
