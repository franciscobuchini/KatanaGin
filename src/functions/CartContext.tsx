import { createContext } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  detail?: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  totalItems: number;
  isRecentlyAdded: boolean;
}

export const CartContext = createContext<CartContextType | null>(null);
