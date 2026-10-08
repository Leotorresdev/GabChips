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
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
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
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, quantity: 1 }] };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      increment: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),
      decrement: (id) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
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
