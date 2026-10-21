"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product, ProductPresentation } from "@/data/products";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const add = useCart((s) => s.add);
  const [orderMode, setOrderMode] = useState<"unit" | "dozen">("unit");
  const [dozens, setDozens] = useState(1);
  const [added, setAdded] = useState(false);
  const controls = useAnimation();

  // Selector interactivo de presentación (60g / 100g)
  const [selectedPresentation, setSelectedPresentation] = useState<ProductPresentation | null>(
    product.presentations && product.presentations.length > 0
      ? product.presentations[0]
      : null,
  );

  const activeWeight = selectedPresentation?.weight || product.weight;
  const activeUnitPrice = selectedPresentation?.price ?? product.price;
  const activeDozenPrice =
    selectedPresentation?.dozenPrice ?? product.wholesalePrice * 12;
  const activeWholesaleUnitPrice =
    selectedPresentation?.wholesalePrice ?? product.wholesalePrice;

  const isDozen = !product.retailOnly && orderMode === "dozen";
  const quantityToAdd = isDozen ? dozens * 12 : 1;

  const handleAdd = () => {
    const itemId = selectedPresentation
      ? `${product.id}-${selectedPresentation.id}`
      : product.id;

    const variantLabel = isDozen
      ? `${dozens} ${dozens === 1 ? "Docena" : "Docenas"} (${activeWeight})`
      : activeWeight || "1 Unidad";

    add(
      {
        id: itemId,
        name: selectedPresentation ? `${product.name} (${activeWeight})` : product.name,
        variant: variantLabel,
        price: activeUnitPrice,
        wholesalePrice: activeWholesaleUnitPrice,
        wholesaleMin: product.wholesaleMin,
        image: product.image,
      },
      quantityToAdd,
    );
    setAdded(true);
    controls.start({ scale: [1, 1.15, 1], transition: { duration: 0.4 } });
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border border-[#ede8dd] shadow-sm hover:shadow-md hover:border-[#f56d29]/30 transition-all"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#f5f5f5]">
        {activeWeight && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 rounded-full bg-white/95 backdrop-blur-sm px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-[10px] font-extrabold text-[#111] shadow-sm">
            {activeWeight}
          </div>
        )}
        {product.badge && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 rounded-full bg-[#111] px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-[10px] font-bold text-white shadow-sm">
            {product.badge}
          </div>
        )}
        <motion.img
          src={product.image}
          alt={product.name}
          animate={controls}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col pt-2 sm:pt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#f56d29] truncate">
            {product.categoryLabel}
          </span>
          {product.tags?.[0] && (
            <span className="hidden sm:inline-block rounded-full bg-[#f2efe9] px-2 py-0.5 text-[8px] sm:text-[9px] font-bold text-[#555]">
              {product.tags[0]}
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-black leading-tight text-[#111] mb-2 line-clamp-1 sm:line-clamp-none">
          {product.name}
        </h3>

        {product.description ? (
          <p className="text-[10px] sm:text-xs text-[#666] line-clamp-2 leading-relaxed mb-2 sm:mb-3 flex-1">
            {product.description}
          </p>
        ) : null}

        {/* Selector interactivo de presentación (60g / 100g) */}
        {product.presentations && product.presentations.length > 1 && (
          <div className="mb-2 sm:mb-2.5">
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#777] mb-1 block">
              Presentación:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {product.presentations.map((p) => {
                const isSelected = selectedPresentation?.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPresentation(p)}
                    className={`py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#111] text-white border-[#111] shadow-xs"
                        : "bg-[#faf8f4] text-[#555] border-[#ede8dd] hover:border-[#f56d29]/40 hover:text-[#111]"
                    }`}
                  >
                    <span className="block text-[11px] sm:text-xs font-black">
                      {p.weight}
                    </span>
                    <span
                      className={`block text-[8px] sm:text-[9px] font-bold ${
                        isSelected ? "text-orange-300" : "text-[#888]"
                      }`}
                    >
                      Docena ${p.dozenPrice.toFixed(0)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selector de Modo: Por Unidad vs Por Docena (oculto si es retailOnly) */}
        {!product.retailOnly ? (
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#f4f1ea] rounded-xl mb-2 sm:mb-2.5 border border-[#ebe5d8]">
            <button
              type="button"
              onClick={() => setOrderMode("unit")}
              className={`py-1 rounded-lg text-[9px] sm:text-[11px] font-extrabold transition-all cursor-pointer ${
                !isDozen
                  ? "bg-white text-[#111] shadow-xs"
                  : "text-[#777] hover:text-[#111]"
              }`}
            >
              Unidad
            </button>
            <button
              type="button"
              onClick={() => setOrderMode("dozen")}
              className={`py-1 rounded-lg text-[9px] sm:text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isDozen
                  ? "bg-[#f56d29] text-white shadow-xs"
                  : "text-[#777] hover:text-[#111]"
              }`}
            >
              <span>Docena</span>
              <span className="text-[7px] sm:text-[9px] opacity-85 font-black">12u</span>
            </button>
          </div>
        ) : (
          <div className="mb-2 sm:mb-2.5 py-1.5 px-3 rounded-xl bg-[#faf8f4] border border-[#ede8dd] text-center flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f56d29]" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#777]">
              Venta exclusiva al detal
            </span>
          </div>
        )}

        {/* Panel de Precio y Cantidad según Modo */}
        {!isDozen ? (
          <div className="mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-[#faf8f4] border border-[#e8e4d8] p-2 sm:p-2.5 flex items-center justify-between shadow-2xs">
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#777]">
                Precio Detal
              </span>
              <span className="text-sm sm:text-base font-black text-[#111] leading-none">
                ${activeUnitPrice.toFixed(2)}
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] font-bold text-[#888] bg-white px-2 py-0.5 rounded-full border border-[#ede8dd]">
              1 bolsa ({activeWeight})
            </span>
          </div>
        ) : (
          <div className="mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-orange-50/70 border border-orange-200/70 p-2 sm:p-2.5 flex items-center justify-between shadow-2xs">
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#f56d29] flex items-center gap-1">
                Mayorista{" "}
                <span className="text-[7px] sm:text-[8px] font-bold text-[#777]">
                  (${activeWholesaleUnitPrice.toFixed(2)} c/u)
                </span>
              </span>
              <span className="text-sm sm:text-base font-black text-[#111] leading-none">
                ${(dozens * activeDozenPrice).toFixed(2)}
              </span>
            </div>

            {/* Stepper de Docenas */}
            <div className="flex items-center gap-1 bg-white border border-orange-200 rounded-lg p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setDozens((d) => Math.max(1, d - 1))}
                className="w-5 h-5 sm:w-6 sm:h-6 grid place-items-center rounded bg-[#faf8f4] hover:bg-[#f56d29] hover:text-white transition-colors text-xs font-black cursor-pointer text-[#555]"
                title="Menos docenas"
              >
                -
              </button>
              <span className="px-1 text-[10px] sm:text-xs font-black text-[#111] min-w-[20px] text-center">
                {dozens}d
              </span>
              <button
                type="button"
                onClick={() => setDozens((d) => d + 1)}
                className="w-5 h-5 sm:w-6 sm:h-6 grid place-items-center rounded bg-[#faf8f4] hover:bg-[#f56d29] hover:text-white transition-colors text-xs font-black cursor-pointer text-[#555]"
                title="Más docenas"
              >
                +
              </button>
            </div>
          </div>
        )}

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className={`flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-full py-2 sm:py-2.5 px-2 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
            added
              ? "bg-[#25D366] text-white"
              : isDozen
              ? "bg-[#f56d29] hover:bg-[#e05819] text-white hover:shadow-md hover:shadow-orange-500/25"
              : "bg-[#111] hover:bg-[#f56d29] text-white hover:shadow-md"
          }`}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
              <span>
                {isDozen
                  ? `+${dozens * 12}u (${activeWeight})`
                  : `+1u (${activeWeight})`}
              </span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
              {isDozen ? (
                <span>
                  Añadir {dozens} {dozens === 1 ? "Docena" : "Docenas"} ({activeWeight})
                </span>
              ) : (
                <>
                  <span className="sm:hidden">Añadir 1u ({activeWeight})</span>
                  <span className="hidden sm:inline">
                    Añadir al carrito ({activeWeight})
                  </span>
                </>
              )}
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}
