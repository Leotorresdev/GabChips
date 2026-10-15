"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Línea de carrito: cada producto es único. */
export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  wholesalePrice: number;
  wholesaleMin: number;
  image: string;
  quantity: number;
};

export type DeliveryType = "delivery" | "pickup";

export type DeliveryInfo = {
  street: string;
  number: string;
  reference: string;
  phone: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  deliveryType: DeliveryType;
  deliveryInfo: DeliveryInfo;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  increment: (id: string, amount?: number) => void;
  decrement: (id: string, amount?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setDelivery: (t: DeliveryType) => void;
  setDeliveryInfo: (info: Partial<DeliveryInfo>) => void;
  totalCount: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      deliveryType: "delivery",
      deliveryInfo: {
        street: "",
        number: "",
        reference: "",
        phone: "",
      },
      add: (item, quantity = 1) =>
        set((s) => {
          const qty = Math.max(1, quantity);
          const existing = s.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, quantity: qty }] };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      increment: (id, amount = 1) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + amount } : i,
          ),
        })),
      decrement: (id, amount = 1) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - amount } : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      setQuantity: (id, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setDelivery: (t) => set({ deliveryType: t }),
      setDeliveryInfo: (info) =>
        set((s) => ({ deliveryInfo: { ...s.deliveryInfo, ...info } })),
      totalCount: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((s, i) => {
          const applicablePrice = i.quantity >= i.wholesaleMin ? i.wholesalePrice : i.price;
          return s + applicablePrice * i.quantity;
        }, 0),
    }),
    {
      name: "gabchips-cart",
      version: 2,
    },
  ),
);
