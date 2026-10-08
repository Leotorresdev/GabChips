"use client";

import { motion } from "framer-motion";

export function OurStory() {
  return (
    <section id="nosotros" className="w-full bg-[#fdfbf7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left: Official GAB Chips poster image with floating badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-3xl overflow-hidden aspect-[4/5] max-h-[620px] bg-[#1a1a1a] shadow-xl border border-[#ede8dd]"
        >
          <img
            src="/images/sobre-nosotros.jpg"
            alt="GAB Chips - Las mejores papas crunch con sal"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border border-white/50 sm:max-w-[240px]">
            <h4 className="text-[10px] font-black text-[#f56d29] uppercase tracking-widest mb-1">
              100% ARTESANAL · GAB CHIPS
            </h4>
            <p className="text-xs text-[#222] font-semibold leading-snug">
              Papas crujientes con el toque perfecto de sal marina tradicional.
            </p>
          </div>
        </motion.div>
        
        {/* Right: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <span className="text-[10px] font-bold text-[#f56d29] uppercase tracking-widest mb-3">
            EL SECRETO DE GAB
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111] leading-[1.1] mb-6">
            Tres ingredientes.<br/>
            Sin atajos industriales.
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            Nacimos con una convicción clara: las papas fritas merecen el mismo cuidado gastronómico que un buen vino o un café de origen.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-10">
            Cocinamos en pequeños lotes (<span className="font-bold">small-batch</span>) dentro de calderos de cobre tradicionales. El corte grueso garantiza una mordida sonora, densa y sin exceso de grasa residual.
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2">
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-[#111] mb-1">100%</span>
              <span className="text-[9px] sm:text-[10px] text-[#888] font-semibold leading-tight block">Aceite Virgen Extra</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-[#111] mb-1">1.8mm</span>
              <span className="text-[9px] sm:text-[10px] text-[#888] font-semibold leading-tight block">Grosor de Corte</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-[#111] mb-1">0%</span>
              <span className="text-[9px] sm:text-[10px] text-[#888] font-semibold leading-tight block">Cero Aditivos</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
