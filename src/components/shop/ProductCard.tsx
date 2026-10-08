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
      className="group flex flex-col bg-white rounded-3xl p-4 border border-[#ede8dd] shadow-sm hover:shadow-md hover:border-[#f56d29]/30 transition-all"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f5f5f5]">
        {product.weight && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-extrabold text-[#111] shadow-sm">
            {product.weight}
          </div>
        )}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10 rounded-full bg-[#111] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
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

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#f56d29]">
            {product.categoryLabel}
          </span>
          {product.tags?.[0] && (
            <span className="rounded-full bg-[#f2efe9] px-2.5 py-0.5 text-[9px] font-bold text-[#555]">
              {product.tags[0]}
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-black leading-tight text-[#111] mb-1.5">
          {product.name}
        </h3>
        <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Precios Detal y Mayor */}
        <div className="mb-4 rounded-2xl bg-[#faf8f4] border border-[#e8e4d8] p-3 flex items-center justify-between shadow-sm">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#777]">
              Al Detal
            </span>
            <span className="text-lg font-black text-[#111] leading-none">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="h-8 w-[1px] bg-[#e2ddd1]"></div>

          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#f56d29]">
              Al Mayor <span className="text-[9px] font-medium text-[#777]">(+{product.wholesaleMin} u)</span>
            </span>
            <span className="text-lg font-black text-[#f56d29] leading-none">
              ${product.wholesalePrice.toFixed(2)} <span className="text-[10px] font-semibold text-[#888]">c/u</span>
            </span>
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
            added 
              ? "bg-[#25D366] text-white" 
              : "bg-[#f56d29] hover:bg-[#e05819] text-white hover:shadow-lg hover:shadow-orange-500/25"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Añadido
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" strokeWidth={2} />
              Añadir al carrito
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}
