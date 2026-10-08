"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <section
      id="productos"
      className="bg-[#fdfbf7] w-full px-3 sm:px-6 md:px-8 pt-12 md:pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111] mb-6 sm:mb-10"
        >
          Nuestra Colección
        </motion.h2>

        <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
