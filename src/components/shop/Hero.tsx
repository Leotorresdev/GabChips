"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 min-h-[90vh] md:min-h-[85vh] flex items-center bg-[#E89218]"
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

      {/* Mobile: Fondo oficial vertical con la foto del producto */}
      <div className="md:hidden absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero-mobile.jpg"
          alt="GAB Chips Papas Artesanales"
          className="w-full h-full object-cover object-[center_35%]"
        />
        {/* Scrim profesional para contraste: Oscuro suave arriba para los títulos, transparente en el centro para lucir el producto, y oscuro suave abajo para los botones */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 via-40% to-black/80 pointer-events-none" />
      </div>

      {/* Info Section */}
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8 z-10 flex">
        {/* Contenedor de texto */}
        <div className="flex flex-col w-full md:w-[48%] lg:w-[38%]">
          
          {/* Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 self-start rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 mb-5 md:mb-6 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white md:text-[#111]">
              Estilo 100% Artesanal
            </span>
          </motion.div>

          {/* Big Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black leading-[1.05] sm:text-4xl md:text-4xl lg:text-5xl text-white md:text-[#111] drop-shadow-md md:drop-shadow-none"
          >
            Experimenta <br />
            <span className="text-[#f56d29] md:text-white drop-shadow-sm">la Perfección.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-6 max-w-md text-sm md:text-base text-white/95 md:text-[#111]/90 font-medium leading-relaxed drop-shadow-sm md:drop-shadow-none"
          >
            Descubre los snacks más crujientes y deliciosos. Elaborados con las mejores papas seleccionadas para brindarte un sabor incomparable.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <a
              href="#productos"
              className="group flex items-center justify-center gap-2 bg-[#f56d29] md:bg-[#111] text-white px-7 py-4 text-sm font-black hover:bg-black transition-all rounded-full shadow-xl shadow-black/25 text-center"
            >
              Ordenar Ahora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#productos"
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white md:text-[#111] px-7 py-4 text-sm font-black hover:bg-white hover:text-[#111] transition-all rounded-full text-center"
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
              <div className="text-2xl font-black text-white md:text-[#111] drop-shadow-sm md:drop-shadow-none">100%</div>
              <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/90 md:text-[#111]/85 mt-1 drop-shadow-sm">Sabor Real</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white md:text-[#111] drop-shadow-sm md:drop-shadow-none">24/7</div>
              <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/90 md:text-[#111]/85 mt-1 drop-shadow-sm">Crujientes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
