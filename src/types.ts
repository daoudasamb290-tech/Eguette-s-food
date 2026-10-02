export type ProductCategory = 
  | 'deals' 
  | 'crepes-salees' 
  | 'waffle' 
  | 'egg-toast' 
  | 'boissons' 
  | 'crepes-sucrees' 
  | 'milkshake' 
  | 'bubble-tea';

export interface AddonOption {
  id: string;
  name: string;
  description: string;
  price: number;
  defaultSelected?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  price: number;
  prepTime: string;
  badge?: string;
  badgeType?: 'deal' | 'popular' | 'signature' | 'homemade' | 'traditional' | 'brioche' | 'size_xl';
  image: string;
  altText: string;
  sensoryTags?: string[];
  availableAddons?: AddonOption[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedAddons: AddonOption[];
  kitchenNote?: string;
  itemTotal: number;
}

export type TabType = 'accueil' | 'menu' | 'adresses' | 'suivi';

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  description: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  shortDesc: string;
  district: string;
  address: string;
  hours: string;
  phone: string;
  whatsapp: string;
  features: string[];
  status: 'Ouvert' | 'Fermé';
  image: string;
  mapQuery: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  fulfillmentMode: 'delivery' | 'pickup';
  deliveryZone?: string;
  deliveryAddress?: string;
  deliveryInstructions?: string;
  pickupStore?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'preparing' | 'in_delivery' | 'delivered';
  paymentMethod: string;
  estimatedMinutes: number;
}
