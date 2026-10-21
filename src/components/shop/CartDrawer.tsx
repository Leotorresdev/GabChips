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
    setQuantity,
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
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 text-[#555] cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#fdfbf7]">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-sm border border-[#e8e2d9] text-5xl mb-6">
                    ðŸ¥”
                  </div>
                  <p className="font-black text-2xl text-[#111] uppercase">EstÃ¡ vacÃ­o</p>
                  <p className="mt-2 text-sm text-[#666] font-medium max-w-[250px]">
                    AÃ±ade nuestras deliciosas papas artesanales y prepÃ¡rate para el mejor crunch.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 rounded-full bg-[#111] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-[#f56d29] transition-colors shadow-lg hover:shadow-orange-500/30 cursor-pointer"
                  >
                    Ver Productos
                  </button>
                </div>
              ) : (
                <div>
                  {/* Banner de compra por docenas y precio mayorista */}
                  <div className="mb-4 rounded-xl bg-orange-50/80 border border-orange-200/80 p-3 flex items-center gap-2.5">
                    <span className="text-xl">ðŸ“¦</span>
                    <p className="text-[11px] text-[#444] font-medium leading-tight">
                      <strong className="text-[#f56d29] font-black">Â¡Pide por docenas!</strong> Disfruta de precios mayoristas especiales a partir de 12 unidades.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <AnimatePresence initial={false}>
                      {items.map((item) => {
                        const isWholesale = item.quantity >= item.wholesaleMin;
                        const activePrice = isWholesale ? item.wholesalePrice : item.price;
                        const lineTotal = activePrice * item.quantity;
                        const currentDozens = Math.floor(item.quantity / 12);
                        const extraUnits = item.quantity % 12;

                        return (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm border border-[#e8e2d9] relative overflow-hidden"
                          >
                            {isWholesale && (
                              <div className="absolute top-0 right-0 bg-[#4CAF50] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-bl-lg z-10 flex items-center gap-1 shadow-2xs">
                                <Sparkles className="w-3 h-3" /> Precio Mayorista
                              </div>
                            )}

                            <div className="flex gap-3.5 items-start">
                              <div className="h-20 w-20 shrink-0 rounded-xl bg-[#fdfbf7] p-1 border border-[#e8e2d9]">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover rounded-lg"
                                />
                              </div>

                              <div className="flex flex-1 flex-col min-w-0 pr-6">
                                <h3 className="text-sm font-black uppercase text-[#111] leading-tight truncate">
                                  {item.name}
                                </h3>
                                {item.variant && (
                                  <span className="text-[10px] font-bold text-[#777] bg-[#f5f2eb] px-1.5 py-0.5 rounded-md inline-block w-fit mt-1">
                                    {item.variant}
                                  </span>
                                )}

                                {isWholesale ? (
                                  <p className="mt-1 text-[10px] font-bold text-[#4CAF50] flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" /> Ahorras ${(item.price - item.wholesalePrice).toFixed(2)} c/u (${item.wholesalePrice.toFixed(2)} c/u)
                                  </p>
                                ) : (
                                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                    <span className="text-[10px] font-bold text-[#888]">
                                      Faltan {item.wholesaleMin - item.quantity}u para mayorista
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setQuantity(item.id, 12)}
                                      className="text-[9px] font-black text-[#f56d29] underline hover:text-[#d45618] cursor-pointer"
                                    >
                                      Llevar a 1 docena
                                    </button>
                                  </div>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => remove(item.id)}
                                className="text-[#888] hover:text-red-500 transition-colors p-1 absolute top-3 right-3 cursor-pointer"
                                aria-label="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Acceso RÃ¡pido por Docenas */}
                            <div className="pt-2.5 border-t border-[#f0ede6] flex flex-wrap items-center justify-between gap-1.5">
                              <span className="text-[9px] font-black uppercase tracking-wider text-[#777] flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5 text-[#f56d29]" /> Docenas:
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => setQuantity(item.id, 12)}
                                  className={`px-2 py-0.5 rounded-md font-bold text-[9px] transition-all cursor-pointer ${
                                    item.quantity === 12
                                      ? "bg-[#f56d29] text-white shadow-2xs font-black"
                                      : "bg-[#f5f2eb] text-[#555] hover:bg-[#ede8dd] hover:text-[#111]"
                                  }`}
                                  title="Fijar en 1 docena (12 unidades)"
                                >
                                  1 Docena (12)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setQuantity(item.id, 24)}
                                  className={`px-2 py-0.5 rounded-md font-bold text-[9px] transition-all cursor-pointer ${
                                    item.quantity === 24
                                      ? "bg-[#f56d29] text-white shadow-2xs font-black"
                                      : "bg-[#f5f2eb] text-[#555] hover:bg-[#ede8dd] hover:text-[#111]"
                                  }`}
                                  title="Fijar en 2 docenas (24 unidades)"
                                >
                                  2 Docenas (24)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => increment(item.id, 12)}
                                  className="px-2 py-0.5 rounded-md font-black text-[9px] bg-orange-100 text-[#f56d29] hover:bg-orange-200 transition-all cursor-pointer"
                                  title="Sumar +12 unidades"
                                >
                                  +1 Doc.
                                </button>
                                {item.quantity >= 12 && (
                                  <button
                                    type="button"
                                    onClick={() => decrement(item.id, 12)}
                                    className="px-1.5 py-0.5 rounded-md font-bold text-[9px] bg-gray-100 text-[#666] hover:bg-gray-200 transition-all cursor-pointer"
                                    title="Restar 12 unidades"
                                  >
                                    -1 Doc.
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Stepper de Unidades y Monto Total */}
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 rounded-lg bg-[#fdfbf7] border border-[#e8e2d9] p-1 shadow-inner">
                                  <button
                                    type="button"
                                    onClick={() => decrement(item.id, 1)}
                                    className="grid h-7 w-7 place-items-center rounded-md bg-white shadow-xs hover:bg-[#f56d29] hover:text-white transition-colors cursor-pointer text-[#555]"
                                    title="Restar 1 unidad"
                                  >
                                    <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                                  </button>
                                  <span className="w-8 text-center text-sm font-black text-[#111]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => increment(item.id, 1)}
                                    className="grid h-7 w-7 place-items-center rounded-md bg-white shadow-xs hover:bg-[#f56d29] hover:text-white transition-colors cursor-pointer text-[#555]"
                                    title="Sumar 1 unidad"
                                  >
                                    <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                                  </button>
                                </div>

                                {item.quantity >= 12 && (
                                  <span className="text-[10px] font-black text-[#f56d29] bg-orange-50 px-2 py-1 rounded-lg border border-orange-200/80">
                                    {currentDozens} {currentDozens === 1 ? "docena" : "docenas"}
                                    {extraUnits > 0 ? ` + ${extraUnits}u` : ""}
                                  </span>
                                )}
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
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </div>
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
