"use client";

import { motion } from "framer-motion";
import { Trophy, CheckCircle2, ChevronRight, Award } from "lucide-react";
import Link from "next/link";

export function MarketingInfo() {
  return (
    <section className="bg-[#f5f3ec] py-20 px-4 md:px-8 border-t border-[#e8e4d8]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-[#f56d29] uppercase tracking-widest mb-3 block">
            PROGRAMA DE BENEFICIOS & RECOMPENSAS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111] mb-4">
            Únete al Club de Compradores
          </h2>
          <p className="text-[15px] text-[#666] leading-relaxed">
            Forma parte de nuestra comunidad exclusiva, acumula tus compras de GAB Chips y accede a recompensas únicas compitiendo en nuestro ranking oficial.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Tarjeta Única: Club de Compradores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-orange-500/5 border border-[#f56d29]/30 flex flex-col relative overflow-hidden group hover:border-[#f56d29] transition-all"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-[#f56d29]"></div>

            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-[#f56d29] rounded-2xl flex items-center justify-center text-white shadow-md">
                <Trophy className="w-7 h-7" />
              </div>
              <span className="bg-[#f56d29] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-2xs">
                <Award className="w-3.5 h-3.5" /> Comunidad Exclusiva
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111] mb-3">
              Club de Compradores
            </h3>
            <p className="text-[#666] text-sm leading-relaxed mb-8">
              Diseñado para nuestros clientes más fieles y apasionados por el mejor sabor crujiente. Cada orden confirmada suma puntos y te posiciona en el ranking oficial de GAB Chips.
            </p>

            <ul className="flex flex-col gap-3.5 mb-8">
              <li className="flex items-start gap-2.5 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#f56d29] shrink-0 mt-0.5" />
                <span className="leading-tight">
                  Desbloquéalo haciendo una <strong className="text-[#f56d29]">compra mínima acumulada de $20</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#f56d29] shrink-0 mt-0.5" />
                <span className="leading-tight">
                  Gana puntos acumulados por cada orden confirmada y accede a beneficios especiales.
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#f56d29] shrink-0 mt-0.5" />
                <span className="leading-tight">
                  Compite en el <strong>Ranking Nacional</strong> y destaca entre los mejores compradores del país.
                </span>
              </li>
            </ul>

            <Link
              href="/ranking"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#f56d29] hover:bg-[#e05819] text-white font-black py-4 rounded-xl shadow-[0_4px_14px_rgba(245,109,41,0.3)] transition-all hover:scale-[1.01] active:scale-[0.99] text-sm uppercase tracking-wider cursor-pointer"
            >
              Ver Ranking de Compradores <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
