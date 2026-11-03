"use client";

import { motion } from "framer-motion";

export function OurStory() {
  return (
    <section id="nosotros" className="w-full bg-[#fdfbf7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left: Official GAB Chips video without sound with floating badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-3xl overflow-hidden aspect-[4/5] max-h-[620px] bg-[#1a1a1a] shadow-xl border border-[#ede8dd]"
        >
          <video
            src="/sobre-nosotros.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
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
          <p className="text-[15px] text-[#555] leading-relaxed mb-5">
            Cocinamos en pequeños lotes de producción artesanal dentro de freidoras de acero inoxidable. El corte grueso garantiza una mordida sonora, densa y sin exceso de grasa residual.
          </p>

          {/* Bloque nutricional: Fritura saludable y categoría keto */}
          <div className="bg-[#f56d29]/10 border-l-4 border-[#f56d29] p-4 rounded-r-2xl mb-8">
            <p className="text-[14px] text-[#222] font-medium leading-relaxed">
              <strong className="text-[#111] font-bold">Gab Chips:</strong> Fritura 100% en manteca de cerdo pura. Es un perfil lipídico estable, de categoría keto, que aporta una densidad nutricional real y cero aceites hidrogenados de baja calidad.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 items-center">
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-[#ede8dd] shadow-2xs">
              <span className="block text-xl sm:text-2xl font-extrabold text-[#111] mb-0.5">100%</span>
              <span className="text-[9px] sm:text-[10px] text-[#777] font-semibold leading-tight block">Manteca de cerdo</span>
            </div>
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-[#ede8dd] shadow-2xs">
              <span className="block text-xl sm:text-2xl font-extrabold text-[#111] mb-0.5">1.8mm</span>
              <span className="text-[9px] sm:text-[10px] text-[#777] font-semibold leading-tight block">Grosor de Corte</span>
            </div>
            {/* Destacado 0% Cero Aditivos */}
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-orange-500/10 border-2 border-[#f56d29] shadow-sm relative overflow-hidden ring-2 ring-[#f56d29]/20">
              <span className="block text-xl sm:text-2xl font-black text-[#e05819] mb-0.5">0%</span>
              <span className="text-[9px] sm:text-[10px] text-[#e05819] font-black leading-tight block uppercase tracking-wider">
                Cero Aditivos
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
