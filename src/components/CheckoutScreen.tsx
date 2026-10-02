import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Zap,
  Bike,
  Store,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CreditCard,
  Banknote,
  Receipt,
  User,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CartItem, DeliveryZone, Order } from '../types';
import { DELIVERY_ZONES, RESTAURANT_PHONE, RESTAURANT_WHATSAPP } from '../data/menuData';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart?: () => void;
  onClose: () => void;
  onNavigateToMenu?: () => void;
  onOrderPlaced: (order: Order) => void;
  onOpenProfile?: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onClose,
  onNavigateToMenu,
  onOrderPlaced,
  onOpenProfile,
}) => {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(DELIVERY_ZONES[0]);
  const [detailedAddress, setDetailedAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Wave' | 'Orange Money' | 'Espèces à la livraison'>('Wave');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  const itemsTotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryFee = deliveryMode === 'delivery' ? selectedZone.fee : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const validateForm = () => {
    const errors: { name?: string; phone?: string; address?: string } = {};
    if (!customerName.trim()) {
      errors.name = 'Veuillez saisir votre prénom ou nom';
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Numéro de téléphone requis (ex: 77 123 45 67)';
    }
    if (deliveryMode === 'delivery' && !detailedAddress.trim()) {
      errors.address = 'Veuillez préciser votre adresse ou quartier à Dakar';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newOrder: Order = {
      id: `EG-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "À l'instant",
      items: [...cartItems],
      subtotal: itemsTotal,
      deliveryFee,
      total: grandTotal,
      fulfillmentMode: deliveryMode,
      customerName,
      customerPhone,
      deliveryZone: deliveryMode === 'delivery' ? selectedZone.name : undefined,
      deliveryAddress: deliveryMode === 'delivery' ? `${selectedZone.name}, ${detailedAddress}` : undefined,
      deliveryInstructions: orderNotes.trim() ? orderNotes : undefined,
      pickupStore: deliveryMode === 'pickup' ? "Eguette's Almadies (Rond-point Ngor)" : undefined,
      status: 'received',
      estimatedMinutes: deliveryMode === 'delivery' ? 30 : 15,
      paymentMethod,
    };

    onOrderPlaced(newOrder);
  };

  const handleWhatsAppDirectOrder = () => {
    if (cartItems.length === 0) return;

    let message = `*COMMANDE EGUETTE'S STREET FOOD DAKAR*\n`;
    message += `───────────────────\n`;
    message += `👤 *Client:* ${customerName || 'Client'}\n`;
    message += `📞 *Téléphone:* ${customerPhone || 'Non renseigné'}\n`;
    message += `🛵 *Mode:* ${deliveryMode === 'delivery' ? `Livraison (${selectedZone.name})` : 'À emporter (Pick-up)'}\n`;
    if (deliveryMode === 'delivery' && detailedAddress) {
      message += `📍 *Adresse:* ${detailedAddress}\n`;
    }
    message += `───────────────────\n`;
    message += `*DÉTAIL DU PANIER :*\n`;
    cartItems.forEach((item) => {
      message += `• *${item.quantity}x ${item.product.name}* (${item.itemTotal.toLocaleString('fr-FR')} FCFA)\n`;
      if (item.selectedAddons.length > 0) {
        message += `  └ _Suppléments:_ ${item.selectedAddons.map((a) => a.name).join(', ')}\n`;
      }
      if (item.kitchenNote) {
        message += `  └ _Note:_ ${item.kitchenNote}\n`;
      }
    });
    message += `───────────────────\n`;
    message += `Sous-total: ${itemsTotal.toLocaleString('fr-FR')} FCFA\n`;
    if (deliveryMode === 'delivery') {
      message += `Frais de livraison: ${deliveryFee.toLocaleString('fr-FR')} FCFA\n`;
    }
    message += `*TOTAL COMMANDE: ${grandTotal.toLocaleString('fr-FR')} FCFA*\n`;
    message += `Paiement: ${paymentMethod}\n`;
    if (orderNotes) {
      message += `Instructions: ${orderNotes}\n`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f9f9ff] overflow-y-auto antialiased text-[#141b2b]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#f9f9ff]/95 backdrop-blur-md border-b border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#141b2b] hover:text-[#bb0112] font-semibold text-sm transition-colors py-2 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Continuer mes achats</span>
            <span className="sm:hidden">Retour</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#ffdc8c] flex items-center justify-center text-[#855300] font-black text-sm">
              E's
            </span>
            <h1 className="font-extrabold text-base sm:text-lg text-[#141b2b]">
              Mon Panier & Caisse
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#feedec] text-[#bb0112] text-xs font-bold uppercase tracking-wider">
              {totalQuantity} {totalQuantity > 1 ? 'articles' : 'article'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content: Adaptive layout for all screens */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-black/[0.04] shadow-sm max-w-md mx-auto my-12">
            <div className="w-20 h-20 rounded-full bg-[#f3f3fa] text-slate-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-[#141b2b] mb-2">Votre panier est vide</h2>
            <p className="text-sm text-slate-500 mb-6">
              Découvrez nos crêpes salées fondantes, nos bubble waffles et burgers gourmands !
            </p>
            <button
              onClick={() => {
                onClose();
                if (onNavigateToMenu) onNavigateToMenu();
              }}
              className="px-6 py-3 bg-[#bb0112] hover:bg-[#90000a] text-white font-bold rounded-2xl shadow-lg shadow-red-900/20 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Consulter la carte
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart items recap (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#141b2b] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#bb0112]" />
                  Articles sélectionnés ({totalQuantity})
                </h2>
                {onClearCart && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-slate-400 hover:text-[#bb0112] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Vider le panier
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-white rounded-2xl p-4 border border-black/[0.04] shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0 bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-[#141b2b] truncate">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-slate-300 hover:text-[#bb0112] p-1 transition-colors cursor-pointer"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#bb0112] font-semibold mt-0.5">
                          {item.product.price.toLocaleString('fr-FR')} FCFA unitaire
                        </p>

                        {/* Addons badges */}
                        {item.selectedAddons.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.selectedAddons.map((addon) => (
                              <span
                                key={addon.id}
                                className="text-[10px] px-2 py-0.5 bg-[#f3f3fa] rounded-full text-slate-600 font-medium"
                              >
                                + {addon.name} ({addon.price} F)
                              </span>
                            ))}
                          </div>
                        )}

                        {item.kitchenNote && (
                          <p className="text-[11px] text-slate-500 italic mt-1 bg-amber-50/70 px-2 py-0.5 rounded border border-amber-200/50">
                            Note : {item.kitchenNote}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper & Item Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center bg-[#f3f3fa] rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#141b2b]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="w-7 h-7 rounded-lg bg-[#bb0112] flex items-center justify-center text-white hover:bg-[#90000a] transition-colors shadow-sm cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[85px]">
                        <span className="font-black text-sm sm:text-base text-[#141b2b]">
                          {item.itemTotal.toLocaleString('fr-FR')}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-semibold">FCFA</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                <div className="bg-white/80 p-3 rounded-2xl border border-black/[0.03] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-[#bb0112] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#141b2b]">Chaud & Frais</p>
                    <p className="text-[10px] text-slate-500">Cuit à la minute</p>
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-2xl border border-black/[0.03] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#855300] flex items-center justify-center flex-shrink-0">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#141b2b]">Coursiers Pros</p>
                    <p className="text-[10px] text-slate-500">Dakar & Banlieue</p>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-white/80 p-3 rounded-2xl border border-black/[0.03] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#141b2b]">Paiement Sûr</p>
                    <p className="text-[10px] text-slate-500">Wave, OM ou Espèces</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Checkout Form & Pricing Summary (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sticky top-20">
                {/* Delivery Mode Selector */}
                <div className="bg-white rounded-2xl p-4 border border-black/[0.04] shadow-sm">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Mode de récupération
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-[#f3f3fa] p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('delivery')}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        deliveryMode === 'delivery'
                          ? 'bg-white text-[#bb0112] shadow-sm'
                          : 'text-slate-600 hover:text-[#141b2b]'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      Livraison Express
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('pickup')}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        deliveryMode === 'pickup'
                          ? 'bg-white text-[#bb0112] shadow-sm'
                          : 'text-slate-600 hover:text-[#141b2b]'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      À Emporter (Pick-up)
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="bg-white rounded-2xl p-5 border border-black/[0.04] shadow-sm flex flex-col gap-4">
                  <h3 className="font-bold text-sm text-[#141b2b] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#bb0112]" />
                    Vos Coordonnées
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Aminata Diop"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                        }}
                        className={`w-full px-3.5 py-2.5 bg-[#f8f8fc] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0112]/30 transition-all ${
                          formErrors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Téléphone (WhatsApp de préférence) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          +221
                        </span>
                        <input
                          type="tel"
                          placeholder="77 123 45 67"
                          value={customerPhone}
                          onChange={(e) => {
                            setCustomerPhone(e.target.value);
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                          }}
                          className={`w-full pl-12 pr-3.5 py-2.5 bg-[#f8f8fc] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0112]/30 transition-all ${
                            formErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Location / Pickup info */}
                  {deliveryMode === 'delivery' ? (
                    <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Zone de livraison (Dakar & Environs) *
                        </label>
                        <select
                          value={selectedZone.id}
                          onChange={(e) => {
                            const found = DELIVERY_ZONES.find((z) => z.id === e.target.value);
                            if (found) setSelectedZone(found);
                          }}
                          className="w-full px-3.5 py-2.5 bg-[#f8f8fc] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0112]/30 text-slate-800"
                        >
                          {DELIVERY_ZONES.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.name} — {zone.fee.toLocaleString('fr-FR')} FCFA ({zone.description})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Adresse précise ou repère *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Près de la Brioche Dorée, Immeuble Rose 2e étage"
                          value={detailedAddress}
                          onChange={(e) => {
                            setDetailedAddress(e.target.value);
                            if (formErrors.address) setFormErrors({ ...formErrors, address: undefined });
                          }}
                          className={`w-full px-3.5 py-2.5 bg-[#f8f8fc] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0112]/30 transition-all ${
                            formErrors.address ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                          }`}
                        />
                        {formErrors.address && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.address}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                      <Store className="w-4 h-4 text-[#855300] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-950">Point de retrait :</p>
                        <p className="mt-0.5 text-slate-700">
                          <strong>Eguette's Almadies</strong>, Rond-point Ngor (ou Keur Gorgui selon votre préférence).
                        </p>
                        <p className="text-[11px] text-[#855300] font-semibold mt-1">
                          Prêt en 15-20 min. Sans frais supplémentaires.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Payment Method Selector */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-600 mb-2">
                      Mode de paiement à la réception
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Wave')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          paymentMethod === 'Wave'
                            ? 'border-sky-500 bg-sky-50/80 text-sky-700 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-black">
                          W
                        </span>
                        Wave
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Orange Money')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          paymentMethod === 'Orange Money'
                            ? 'border-orange-500 bg-orange-50/80 text-orange-700 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-black">
                          OM
                        </span>
                        Orange Money
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Espèces à la livraison')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          paymentMethod === 'Espèces à la livraison'
                            ? 'border-emerald-500 bg-emerald-50/80 text-emerald-700 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Banknote className="w-6 h-6 text-emerald-600" />
                        Espèces
                      </button>
                    </div>
                  </div>

                  {/* Order notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Instructions pour le livreur ou la cuisine (optionnel)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: sonnez à l'interphone, sauce piquante à part..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#f8f8fc] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#bb0112]/30"
                    />
                  </div>
                </div>

                {/* Cost Breakdown & Submit */}
                <div className="bg-white rounded-2xl p-5 border border-black/[0.04] shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Sous-total articles ({totalQuantity})</span>
                    <span className="font-semibold text-slate-800">
                      {itemsTotal.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Livraison {deliveryMode === 'delivery' ? `(${selectedZone.name})` : ''}</span>
                    <span className="font-semibold text-slate-800">
                      {deliveryMode === 'delivery'
                        ? `${deliveryFee.toLocaleString('fr-FR')} FCFA`
                        : 'Gratuit (Pick-up)'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#141b2b]">Total Commande</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-[#bb0112]">
                        {grandTotal.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-xs font-bold text-slate-500 ml-1">FCFA</span>
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#bb0112] hover:bg-[#90000a] text-white font-extrabold rounded-2xl shadow-lg shadow-red-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
                  >
                    <span>Valider & Lancer ma commande</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs font-bold">
                      {grandTotal.toLocaleString('fr-FR')} F
                    </span>
                  </button>

                  {/* WhatsApp Express Button */}
                  <button
                    type="button"
                    onClick={handleWhatsAppDirectOrder}
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-2xl shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    Commander directement via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
