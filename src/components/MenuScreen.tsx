import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Zap,
  Timer,
  Plus,
  ShoppingBag,
  Check,
  Flame,
  Utensils,
  Sparkles,
  ChefHat,
  Coffee,
  Cookie
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES_LIST, PRODUCTS } from '../data/menuData';

interface MenuScreenProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenProductDetail: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onOpenCheckout: () => void;
  cartCount: number;
  cartSubtotal: number;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenProductDetail,
  onQuickAddToCart,
  onOpenCheckout,
  cartCount,
  cartSubtotal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group products by category when 'all' is selected
  const groupedCategories = useMemo(() => {
    if (selectedCategory !== 'all') {
      return [
        {
          id: selectedCategory,
          label:
            CATEGORIES_LIST.find((c) => c.id === selectedCategory)?.label ||
            'Produits',
          products: filteredProducts,
        },
      ];
    }

    const groups: { id: string; label: string; products: Product[] }[] = [];
    CATEGORIES_LIST.forEach((cat) => {
      const prods = filteredProducts.filter((p) => p.category === cat.id);
      if (prods.length > 0) {
        groups.push({
          id: cat.id,
          label: cat.label,
          products: prods,
        });
      }
    });
    return groups;
  }, [selectedCategory, filteredProducts]);

  const getCategoryHeaderMeta = (catId: string) => {
    switch (catId) {
      case 'deals':
        return {
          icon: <Flame className="w-4 h-4 text-[#bb0112]" />,
          tag: 'Top Ventes',
          tagClass: 'bg-[#bb0112] text-white',
        };
      case 'crepes-salees':
        return {
          icon: <Utensils className="w-4 h-4 text-[#855300]" />,
          tag: 'Taille XL',
          tagClass: 'bg-slate-100 text-slate-700',
        };
      case 'waffle':
        return {
          icon: <Sparkles className="w-4 h-4 text-[#855300]" />,
          tag: 'Signature',
          tagClass: 'bg-[#ffddb8] text-[#855300]',
        };
      case 'egg-toast':
        return {
          icon: <ChefHat className="w-4 h-4 text-[#855300]" />,
          tag: 'Brioché',
          tagClass: 'bg-slate-100 text-slate-700',
        };
      case 'boissons':
        return {
          icon: <Coffee className="w-4 h-4 text-[#bb0112]" />,
          tag: 'Locales & Fraîches',
          tagClass: 'bg-[#ffdad6] text-[#bb0112]',
        };
      default:
        return {
          icon: <Utensils className="w-4 h-4 text-[#855300]" />,
          tag: 'Fait Maison',
          tagClass: 'bg-slate-100 text-slate-700',
        };
    }
  };

  return (
    <div className="flex flex-col w-full pb-32">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* 1. Search & Live Feedback Header */}
        <div className="pt-4 pb-3 flex flex-col gap-3">
          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#855300] w-5 h-5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher Bubble Waffle, Eggetta Burger, Crêpe, Bissap..."
              className="w-full bg-white text-[#141b2b] text-sm pl-12 pr-10 py-3.5 sm:py-4 rounded-full shadow-[0_2px_12px_rgba(20,27,43,0.06)] border border-slate-200 focus:outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 placeholder:text-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Effacer la recherche"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 active:scale-90 transition-transform cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-2 max-w-2xl mx-auto w-full">
            <span className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              <strong className="text-[#141b2b] font-bold">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
              </strong>{' '}
              {searchQuery ? 'trouvé' + (filteredProducts.length > 1 ? 's' : '') : "disponibles aujourd'hui"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#855300] flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-[#855300]" /> Dakar Express
            </span>
          </div>
        </div>

        {/* 2. Responsive Category Filter Chips */}
        <div className="w-full py-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:justify-center pb-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#f59e0b] text-[#2a1700] shadow-[0_4px_12px_rgba(245,158,11,0.25)]'
                  : 'bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200'
              }`}
            >
              <span>Tous</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedCategory === 'all'
                    ? 'bg-white/40 text-[#2a1700]'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {PRODUCTS.length}
              </span>
            </button>

            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-[#f59e0b] text-[#2a1700] font-bold shadow-[0_4px_12px_rgba(245,158,11,0.25)]'
                      : 'bg-white hover:bg-slate-50 text-[#141b2b] border border-slate-200 font-medium'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/40 text-[#2a1700]'
                        : cat.id === 'deals'
                        ? 'bg-[#ffdad6] text-[#bb0112]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Products List in Responsive Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="flex flex-col gap-10 mt-4">
          {groupedCategories.map((group) => {
            const meta = getCategoryHeaderMeta(group.id);
            return (
              <section key={group.id} className="flex flex-col gap-4">
                {/* Category Section Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-2xl bg-[#ffddb8] text-[#855300]">
                      {meta.icon}
                    </span>
                    <h2 className="font-display text-[20px] sm:text-[24px] text-[#141b2b] font-bold tracking-tight">
                      {group.label}
                    </h2>
                  </div>
                  {meta.tag && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${meta.tagClass}`}
                    >
                      {meta.tag}
                    </span>
                  )}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {group.products.map((product) => {
                    const isAdded = !!addedIds[product.id];
                    return (
                      <article
                        key={product.id}
                        onClick={() => onOpenProductDetail(product)}
                        className="bg-white rounded-3xl p-4 flex flex-col justify-between gap-3 shadow-[0_2px_12px_rgba(20,27,43,0.05)] border border-slate-100 hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-100">
                            <img
                              src={product.image}
                              alt={product.altText}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                              loading="lazy"
                            />
                            {product.badge && (
                              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/75 text-white text-[10px] font-semibold backdrop-blur-xs">
                                {product.badge}
                              </span>
                            )}
                          </div>

                          {/* Text */}
                          <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div>
                              <h3 className="font-display text-[16px] sm:text-[18px] text-[#141b2b] font-bold truncate">
                                {product.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                                {product.description}
                              </p>
                            </div>

                            <div className="flex items-baseline gap-1 mt-2">
                              <span className="font-display text-[20px] sm:text-[22px] text-[#bb0112] font-black tabular-nums">
                                {product.price.toLocaleString('fr-FR')}
                              </span>
                              <span className="text-xs font-bold text-[#bb0112]">
                                FCFA
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom action row with prep time & add buttons */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                            <Timer className="w-4 h-4 text-[#855300]" />{' '}
                            {product.prepTime}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleAdd(e, product)}
                              aria-label={`Ajouter 1 ${product.name}`}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ffddb8] hover:bg-[#ffc98a] text-[#855300] flex items-center justify-center active:scale-90 transition-transform shadow-xs cursor-pointer"
                            >
                              <Plus className="w-5 h-5 stroke-[2.5px]" />
                            </button>

                            <button
                              onClick={(e) => handleAdd(e, product)}
                              className={`px-4 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#f59e0b] hover:bg-[#d97706] text-[#2a1700] shadow-[0_2px_8px_rgba(245,158,11,0.25)]'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-4 h-4 stroke-[3px]" />
                                  <span>Ajouté</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-4 h-4" />
                                  <span>Ajouter</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Empty Search State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-20 h-20 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#855300] mb-4">
                <Cookie className="w-10 h-10" />
              </div>
              <h3 className="font-display text-xl text-[#141b2b] font-bold">
                Aucune gâterie trouvée
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm leading-relaxed">
                Essayez un autre mot-clé comme "Burger", "Nutella", "Bissap" ou sélectionnez une catégorie ci-dessus.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory('all');
                }}
                className="mt-5 px-6 py-3 rounded-full bg-[#f59e0b] text-[#2a1700] text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer shadow-md"
              >
                Afficher tout le menu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Floating Sticky Cart Bar for Mobile & Quick Desktop Trigger */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-0 w-full px-4 z-30 pointer-events-none">
          <div className="max-w-xl mx-auto pointer-events-auto">
            <button
              onClick={onOpenCheckout}
              className="w-full bg-[#bb0112] hover:bg-[#99010e] text-white px-6 py-4 rounded-full shadow-[0_8px_24px_rgba(187,1,18,0.35)] flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="text-sm sm:text-base font-bold">Voir mon panier</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/25 text-white text-xs font-bold">
                  {cartCount}
                </span>
              </div>
              <span className="font-display text-base font-bold tabular-nums">
                {cartSubtotal.toLocaleString('fr-FR')} FCFA
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
