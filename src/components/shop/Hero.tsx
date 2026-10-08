"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 min-h-[85vh] flex items-center bg-[#E89218]"
    >
      {/* Desktop: Fondo de video con fusión horizontal (100% intacto) */}
      <div className="hidden md:block absolute inset-0 z-0 bg-[#E89218] overflow-hidden">
        <video
          src="/gadchips.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[75%_center] lg:object-[80%_center] scale-[1.25] origin-[15%_15%] transform-gpu contrast-[1.08] saturate-[1.06] brightness-[1.02]"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E89218] from-10% via-[#E89218]/90 via-30% to-transparent to-50% pointer-events-none"></div>
      </div>

      {/* Info Section */}
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8 z-10 flex">
        {/* Contenedor de texto */}
        <div className="flex flex-col w-full md:w-[48%] lg:w-[38%]">
          
          {/* Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 self-start rounded-full bg-white/20 border border-white/30 px-4 py-1.5 mb-5 md:mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#111]">
              Estilo 100% Artesanal
            </span>
          </motion.div>

          {/* Big Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black leading-[1.05] sm:text-4xl md:text-4xl lg:text-5xl text-[#111]"
          >
            Experimenta <br />
            <span className="text-white drop-shadow-sm">la Perfección.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-6 max-w-md text-sm md:text-base text-[#111]/90 font-medium leading-relaxed"
          >
            Descubre los snacks más crujientes y deliciosos. Elaborados con las mejores papas seleccionadas para brindarte un sabor incomparable.
          </motion.p>

          {/* Mobile Video Showcase: alejado, en formato natural, nítido y sin sombras superpuestas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="md:hidden relative my-6 w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 bg-[#111]"
          >
            <video
              src="/gadchips.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover scale-[1.12] origin-[15%_15%] transform-gpu contrast-[1.08] saturate-[1.06] brightness-[1.02]"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#f56d29] animate-pulse"></span>
              GAB Chips En Vivo
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <a
              href="#productos"
              className="group flex items-center justify-center gap-2 bg-[#111] text-white px-7 py-4 text-sm font-black hover:bg-black transition-all rounded-full shadow-xl shadow-black/20 text-center"
            >
              Ordenar Ahora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#productos"
              className="flex items-center justify-center gap-2 bg-white/20 border border-white/30 text-[#111] px-7 py-4 text-sm font-black hover:bg-white hover:text-[#111] transition-all rounded-full text-center"
            >
              Ver Menú
            </a>
          </motion.div>

          {/* Small Stats at the bottom */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="mt-10 sm:mt-12 flex items-center gap-8 sm:gap-10"
          >
            <div>
              <div className="text-2xl font-black text-[#111]">100%</div>
              <div className="text-[9px] font-extrabold uppercase tracking-widest text-[#111]/85 sm:text-white mt-1 drop-shadow-sm">Sabor Real</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#111]">24/7</div>
              <div className="text-[9px] font-extrabold uppercase tracking-widest text-[#111]/85 sm:text-white mt-1 drop-shadow-sm">Crujientes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
