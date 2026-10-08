"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const controls = useAnimation();

  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      variant: product.weight || "1 Unidad",
      price: product.price,
      wholesalePrice: product.wholesalePrice,
      wholesaleMin: product.wholesaleMin,
      image: product.image,
    });
    setAdded(true);
    controls.start({ scale: [1, 1.15, 1], transition: { duration: 0.4 } });
    setTimeout(() => setAdded(false), 1500);
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
        {product.weight && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 rounded-full bg-white/95 backdrop-blur-sm px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-[10px] font-extrabold text-[#111] shadow-sm">
            {product.weight}
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

        <h3 className="text-xs sm:text-[15px] font-black leading-tight text-[#111] mb-1 line-clamp-1 sm:line-clamp-none">
          {product.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-[#666] line-clamp-2 leading-relaxed mb-2.5 sm:mb-4 flex-1">
          {product.description}
        </p>

        {/* Precios Detal y Mayor Adaptados a 2 Columnas */}
        <div className="mb-2.5 sm:mb-4 rounded-xl sm:rounded-2xl bg-[#faf8f4] border border-[#e8e4d8] p-2 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 shadow-sm">
          <div className="flex sm:flex-col items-baseline justify-between sm:justify-start">
            <span className="block text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#777]">
              Detal
            </span>
            <span className="text-sm sm:text-lg font-black text-[#111] leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="h-[1px] sm:h-8 w-full sm:w-[1px] bg-[#e2ddd1]"></div>

          <div className="flex sm:flex-col items-baseline justify-between sm:justify-start text-left sm:text-right">
            <span className="block text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#f56d29]">
              Mayor <span className="text-[8px] sm:text-[9px] font-medium text-[#777]">(+{product.wholesaleMin}u)</span>
            </span>
            <span className="text-sm sm:text-lg font-black text-[#f56d29] leading-none">
              ${product.wholesalePrice.toFixed(2)}
            </span>
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className={`flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-full py-2 sm:py-3 px-2 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
            added 
              ? "bg-[#25D366] text-white" 
              : "bg-[#f56d29] hover:bg-[#e05819] text-white hover:shadow-lg hover:shadow-orange-500/25"
          }`}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
              <span>Añadido</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
              <span className="sm:hidden">Añadir</span>
              <span className="hidden sm:inline">Añadir al carrito</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}
