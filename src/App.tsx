import React, { useState } from 'react';
import { TabType, Product, CartItem, Order, AddonOption, ProductCategory } from './types';
import { PRODUCTS } from './data/menuData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { LocationsScreen } from './components/LocationsScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProfileModal } from './components/ProfileModal';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('accueil');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('all');
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  // Default to fluid responsive so it naturally adapts to phone, tablet, laptop, ultra-wide screens!
  const [devicePreviewMode, setDevicePreviewMode] = useState<'fluid' | 'mobile'>('fluid');

  // Pre-seed cart with the 3 items from screenshot 13 for instant recognition
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const waffleProduct = PRODUCTS.find((p) => p.id === 'waffle-banana') || PRODUCTS[5];
    const burgerProduct = PRODUCTS.find((p) => p.id === 'deal-burger') || PRODUCTS[0];
    const bissapProduct = PRODUCTS.find((p) => p.id === 'boisson-bissap') || PRODUCTS[9];

    const chantillyAddon: AddonOption = {
      id: 'chantilly',
      name: 'Chantilly aérienne',
      description: 'Fouettée à la vanille',
      price: 500,
    };

    return [
      {
        cartItemId: 'init-1',
        product: waffleProduct,
        quantity: 1,
        selectedAddons: [chantillyAddon],
        kitchenNote: '',
        itemTotal: waffleProduct.price + chantillyAddon.price,
      },
      {
        cartItemId: 'init-2',
        product: burgerProduct,
        quantity: 1,
        selectedAddons: [],
        kitchenNote: 'Sauce Dakar Spicy',
        itemTotal: burgerProduct.price,
      },
      {
        cartItemId: 'init-3',
        product: bissapProduct,
        quantity: 1,
        selectedAddons: [],
        kitchenNote: 'Infusion menthe fraîche 33cl',
        itemTotal: bissapProduct.price,
      },
    ];
  });

  // Current active order for tracking
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    return {
      id: 'EG-8429',
      date: "Il y a 10 min",
      customerName: "Moussa Diop",
      customerPhone: "+221 77 123 45 67",
      fulfillmentMode: 'delivery',
      deliveryZone: 'Dakar Centre (Plateau)',
      deliveryAddress: 'Rue 10 x Corniche, Immeuble A, Apt 4',
      items: [],
      subtotal: 7000,
      deliveryFee: 1500,
      total: 8500,
      status: 'preparing',
      paymentMethod: 'Paiement à la livraison (Wave)',
      estimatedMinutes: 18,
    };
  });

  const [orderHistory, setOrderHistory] = useState<Order[]>(() => [
    {
      id: 'EG-7712',
      date: "Hier à 20:30",
      customerName: "Moussa Diop",
      customerPhone: "+221 77 123 45 67",
      fulfillmentMode: 'delivery',
      deliveryZone: 'Almadies',
      items: [],
      subtotal: 5500,
      deliveryFee: 1000,
      total: 6500,
      status: 'delivered',
      paymentMethod: 'Paiement à la livraison',
      estimatedMinutes: 0,
    },
  ]);

  // Cart operations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleQuickAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedAddons.length === 0);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === existing.cartItemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                itemTotal: (item.quantity + 1) * product.price,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId: `item-${Date.now()}-${Math.random()}`,
          product,
          quantity: 1,
          selectedAddons: [],
          itemTotal: product.price,
        },
      ];
    });
  };

  const handleAddCustomToCart = (
    product: Product,
    quantity: number,
    selectedAddons: AddonOption[],
    kitchenNote: string
  ) => {
    const addonsUnitSum = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const itemTotal = (product.price + addonsUnitSum) * quantity;

    setCartItems((prev) => [
      ...prev,
      {
        cartItemId: `item-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        selectedAddons,
        kitchenNote: kitchenNote.trim() || undefined,
        itemTotal,
      },
    ]);
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = item.itemTotal / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotal: newQty * unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setActiveOrder(newOrder);
    setOrderHistory((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };

  const handleSimulateDemoOrder = () => {
    const demo: Order = {
      id: `EG-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "À l'instant",
      customerName: "Client Eguette's",
      customerPhone: "+221 77 881 08 08",
      fulfillmentMode: 'delivery',
      deliveryZone: 'Almadies - Ngor',
      deliveryAddress: 'Rond-point Ngor Almadies',
      items: [],
      subtotal: 5500,
      deliveryFee: 1000,
      total: 6500,
      status: 'in_delivery',
      paymentMethod: 'Paiement à la livraison',
      estimatedMinutes: 14,
    };
    setActiveOrder(demo);
    setOrderHistory((prev) => [demo, ...prev]);
    setActiveTab('suivi');
  };

  const navigateToMenuWithCategory = (category?: ProductCategory) => {
    if (category) {
      setSelectedMenuCategory(category);
    }
    setActiveTab('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#f9f9ff] flex flex-col antialiased text-[#141b2b] ${
      devicePreviewMode === 'mobile' ? 'lg:bg-[#e4dfd7] lg:items-center lg:justify-start lg:py-6' : ''
    }`}>
      {/* Top Floating Viewport Device Switcher for Testing on Large Screens */}
      <div className="hidden xl:flex fixed bottom-5 right-5 z-50 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-black/[0.08] items-center gap-2.5 text-xs font-semibold">
        <span className="text-slate-500 font-medium">Affichage :</span>
        <button
          onClick={() => setDevicePreviewMode('fluid')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
            devicePreviewMode === 'fluid'
              ? 'bg-[#bb0112] text-white shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100/80'
          }`}
          title="Affichage 100% responsive et adapté à tous les écrans"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Adaptatif (Tous Écrans)</span>
        </button>
        <button
          onClick={() => setDevicePreviewMode('mobile')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
            devicePreviewMode === 'mobile'
              ? 'bg-[#bb0112] text-white shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100/80'
          }`}
          title="Simuler un écran smartphone 430px"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Format Mobile</span>
        </button>
      </div>

      {/* Main App Container: 100% fluid by default, or mobile simulation if selected */}
      <div
        className={`w-full min-h-screen bg-[#f9f9ff] flex flex-col relative transition-all duration-300 ${
          devicePreviewMode === 'mobile'
            ? 'max-w-[430px] rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.22)] border-[9px] border-slate-900 min-h-[920px] overflow-hidden'
            : 'w-full'
        }`}
      >
        {/* Top Header */}
        <Header
          currentTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
          onOpenCart={() => setIsCheckoutOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onGoHome={() => setActiveTab('accueil')}
        />

        {/* Tab Views */}
        <main className="flex-1 w-full pt-16 flex flex-col">
          {activeTab === 'accueil' && (
            <HomeScreen
              onNavigateToMenu={navigateToMenuWithCategory}
              onNavigateToLocations={() => setActiveTab('adresses')}
              onOpenProductDetail={(prod) => setActiveProductDetail(prod)}
              onQuickAddToCart={handleQuickAddToCart}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              cartCount={cartCount}
              cartSubtotal={cartSubtotal}
            />
          )}

          {activeTab === 'menu' && (
            <MenuScreen
              selectedCategory={selectedMenuCategory}
              onSelectCategory={setSelectedMenuCategory}
              onOpenProductDetail={(prod) => setActiveProductDetail(prod)}
              onQuickAddToCart={handleQuickAddToCart}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              cartCount={cartCount}
              cartSubtotal={cartSubtotal}
            />
          )}

          {activeTab === 'adresses' && (
            <LocationsScreen
              onSelectStoreForOrder={() => {
                setActiveTab('menu');
              }}
            />
          )}

          {activeTab === 'suivi' && (
            <TrackingScreen
              activeOrder={activeOrder}
              onNavigateToMenu={() => setActiveTab('menu')}
              onSimulateDemoOrder={handleSimulateDemoOrder}
            />
          )}
        </main>

        {/* Bottom Tab Bar (visible on mobile/tablet, desktop uses header navigation) */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          activeOrderCount={activeOrder ? 1 : 0}
        />

        {/* Modals & Overlays */}
        {activeProductDetail && (
          <ProductDetailModal
            product={activeProductDetail}
            onClose={() => setActiveProductDetail(null)}
            onAddToCart={handleAddCustomToCart}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {isCheckoutOpen && (
          <CheckoutScreen
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={() => setCartItems([])}
            onClose={() => setIsCheckoutOpen(false)}
            onNavigateToMenu={() => {
              setIsCheckoutOpen(false);
              setActiveTab('menu');
            }}
            onOrderPlaced={handleOrderPlaced}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {isOrderSuccessOpen && activeOrder && (
          <OrderSuccessModal
            order={activeOrder}
            onClose={() => setIsOrderSuccessOpen(false)}
            onViewTracking={() => {
              setIsOrderSuccessOpen(false);
              setActiveTab('suivi');
            }}
          />
        )}

        {isProfileOpen && (
          <ProfileModal
            onClose={() => setIsProfileOpen(false)}
            orderHistory={orderHistory}
            onSelectOrderToTrack={(ord) => {
              setActiveOrder(ord);
              setActiveTab('suivi');
            }}
          />
        )}
      </div>
    </div>
  );
}
