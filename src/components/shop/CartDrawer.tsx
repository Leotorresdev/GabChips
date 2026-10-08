"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { useUser } from "@/store/user";

export function CartDrawer() {
  const {
    isOpen,
    close,
    items,
    increment,
    decrement,
    remove,
    subtotal,
  } = useCart();
  const { isLoggedIn } = useUser();
  const router = useRouter();

  const goCheckout = () => {
    close();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-[#fdfbf7] shadow-2xl"
            aria-label="Carrito"
          >
            <header className="flex items-center justify-between border-b border-[#e8e2d9] bg-white px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f56d29] shadow-md shadow-orange-500/20">
                  <ShoppingBag className="h-5 w-5 text-[#111]" />
                </span>
                <h2 className="text-xl font-black uppercase tracking-tight text-[#111]">Tu Carrito</h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 text-[#555]"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#fdfbf7]">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-sm border border-[#e8e2d9] text-5xl mb-6">
                    🥔
                  </div>
                  <p className="font-black text-2xl text-[#111] uppercase">Está vacío</p>
                  <p className="mt-2 text-sm text-[#666] font-medium max-w-[250px]">
                    Añade nuestras deliciosas papas artesanales y prepárate para el mejor crunch.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 rounded-full bg-[#111] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-[#f56d29] transition-colors shadow-lg hover:shadow-orange-500/30"
                  >
                    Ver Productos
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const isWholesale = item.quantity >= item.wholesaleMin;
                      const activePrice = isWholesale ? item.wholesalePrice : item.price;
                      const lineTotal = activePrice * item.quantity;
                      const savedTotal = isWholesale ? (item.price - item.wholesalePrice) * item.quantity : 0;

                      return (
                        <motion.li
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm border border-[#e8e2d9] relative overflow-hidden"
                        >
                          {isWholesale && (
                            <div className="absolute top-0 right-0 bg-[#4CAF50] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Precio Mayorista
                            </div>
                          )}
                          <div className="h-24 w-24 shrink-0 rounded-xl bg-[#fdfbf7] p-1 border border-[#e8e2d9]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-sm font-black uppercase text-[#111] leading-tight">
                                  {item.name}
                                </h3>
                                {isWholesale ? (
                                  <p className="mt-1 text-[10px] font-bold text-[#4CAF50]">
                                    Ahorrando ${(item.price - item.wholesalePrice).toFixed(2)} c/u
                                  </p>
                                ) : (
                                  <p className="mt-1 text-[10px] font-bold text-[#888]">
                                    Faltan {item.wholesaleMin - item.quantity} para precio mayorista
                                  </p>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(item.id)}
                                className="text-[#888] hover:text-red-500 transition-colors p-1"
                                aria-label="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="mt-auto flex items-end justify-between">
                              <div className="flex items-center gap-1 rounded-lg bg-[#fdfbf7] border border-[#e8e2d9] p-1 shadow-inner">
                                <button
                                  type="button"
                                  onClick={() => decrement(item.id)}
                                  className="grid h-7 w-7 place-items-center rounded-md bg-white shadow-sm hover:bg-[#f56d29] hover:text-white transition-colors"
                                >
                                  <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                                </button>
                                <span className="w-8 text-center text-sm font-black text-[#111]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => increment(item.id)}
                                  className="grid h-7 w-7 place-items-center rounded-md bg-white shadow-sm hover:bg-[#f56d29] hover:text-white transition-colors"
                                >
                                  <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                                </button>
                              </div>
                              <div className="text-right">
                                {isWholesale && (
                                  <span className="block text-[10px] line-through text-[#888] font-bold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                )}
                                <span className="text-lg font-black text-[#111]">
                                  ${lineTotal.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-[#e8e2d9] bg-white px-6 py-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-black uppercase tracking-widest text-[#555]">
                    Total Estimado {isLoggedIn && <span className="text-[#25D366]">(20% OFF)</span>}
                  </span>
                  <div className="text-right">
                    {isLoggedIn && <span className="block text-[10px] line-through text-[#888] font-bold">${subtotal().toFixed(2)}</span>}
                    <span className="text-3xl font-black text-[#f56d29]">
                      ${(isLoggedIn ? subtotal() * 0.8 : subtotal()).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={goCheckout}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#111] px-6 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-black/10 transition-all hover:-translate-y-1 hover:shadow-2xl hover:bg-[#f56d29]"
                >
                  Continuar Compra
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                </button>
                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#888]">
                  Opciones de delivery disponibles en el pago
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
