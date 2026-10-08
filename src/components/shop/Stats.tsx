"use client";

import { motion } from "framer-motion";

export function Stats() {
  return (
    <section className="w-full bg-[#fdfbf7] px-4 md:px-8 pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl bg-[#2a2825] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex-1">
          <span className="text-[10px] font-bold text-[#f56d29] uppercase tracking-widest mb-2 block">
            SERVICIO DIRECTO • GAB CONCIERGE
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            ¿Dudas con tu pedido o compras por volumen?
          </h2>
          <p className="text-sm text-white/70">
            Haz tu encargo en un solo clic por WhatsApp o recibe la carta de lotes limitados cada mes.
          </p>
        </div>
        
        <div className="flex items-center w-full md:w-auto shrink-0">
          <a 
            href="https://wa.me/584125589074?text=Hola%20GAB%20Chips,%20quisiera%20hacer%20un%20pedido%20o%20consultar%20por%20volumen" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-8 py-4 rounded-2xl font-black text-sm text-center uppercase tracking-wider transition-all shadow-xl shadow-green-500/25 hover:scale-105 active:scale-95"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
