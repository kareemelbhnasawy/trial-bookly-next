import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice?: number;
  unit: string;
  quantity: number;
  minOrder: number;
  image: string;
  supplier: {
    name: string;
    location: string;
    verified: boolean;
  };
  specifications: {
    grade: string;
    standard: string;
    [key: string]: string;
  };
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (id: string) => number;

  // Cart UI
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        const existingItem = get().items.find((item) => item.id === product.id);

        if (existingItem) {
          // Update quantity if item exists
          const newQuantity = existingItem.quantity + quantity;
          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: Math.max(newQuantity, item.minOrder) }
                : item,
            ),
          }));
        } else {
          // Add new item
          const cartItem: CartItem = {
            ...product,
            quantity: Math.max(quantity, product.minOrder),
          };
          set((state) => ({
            items: [...state.items, cartItem],
          }));
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: Math.max(quantity, item.minOrder) };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      },

      getItemCount: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "rawasy-cart", // unique name for localStorage
      partialize: (state) => ({ items: state.items }), // only persist items
    },
  ),
);
