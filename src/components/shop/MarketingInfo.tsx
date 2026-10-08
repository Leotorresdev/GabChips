"use client";

import { motion } from "framer-motion";
import { Trophy, CheckCircle2, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function MarketingInfo() {
  return (
    <section className="bg-[#f5f3ec] py-20 px-4 md:px-8 border-t border-[#e8e4d8]">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold text-[#f56d29] uppercase tracking-widest mb-3 block">
            NUEVO PROGRAMA DE BENEFICIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111] mb-4">
            Tú eliges cómo disfrutar GAB Chips
          </h2>
          <p className="text-[15px] text-[#666] leading-relaxed">
            Hemos diseñado dos formas increíbles de ser parte de nuestra comunidad. Regístrate gratis y elige el camino que más se adapte a ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Path 1: Consumo Familiar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#e8e4d8] flex flex-col h-full relative overflow-hidden group hover:border-[#25D366]/50 transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#25D366]"></div>
            
            <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] mb-6">
              <ShoppingBag className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-extrabold text-[#111] mb-3">Consumo Familiar</h3>
            <p className="text-[#666] text-sm leading-relaxed mb-8 flex-1">
              Ideal para amantes de los snacks gourmet que buscan abastecer su hogar con el crunch artesanal perfecto y al mejor precio del mercado.
            </p>
            
            <ul className="flex flex-col gap-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                <span className="leading-tight">Obtén <strong>20% de descuento inmediato</strong> en tu primera compra con solo registrar tu correo.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                <span className="leading-tight">Acceso a precios mayoristas comprando desde 6 o 12 paquetes surtidos.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                <span className="leading-tight">Envíos rápidos directamente a tu puerta o retiro en tienda.</span>
              </li>
            </ul>

            <a href="#productos" className="inline-flex items-center justify-center gap-2 w-full bg-[#111] hover:bg-[#25D366] text-white font-bold py-3.5 rounded-xl transition-all shadow-sm">
              Comprar para mi Hogar <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Path 2: Club Embajadores */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-orange-500/5 border border-[#f56d29]/30 flex flex-col h-full relative overflow-hidden group hover:border-[#f56d29] transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#f56d29]"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-[#f56d29] rounded-2xl flex items-center justify-center text-white shadow-md">
                <Trophy className="w-7 h-7" />
              </div>
              <span className="bg-[#f56d29] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                Oportunidad de Negocio
              </span>
            </div>
            
            <h3 className="text-2xl font-extrabold text-[#111] mb-3">Club Embajadores</h3>
            <p className="text-[#666] text-sm leading-relaxed mb-8 flex-1">
              Diseñado para emprendedores y clientes destacados. Transforma tu fidelidad por GAB Chips en recompensas reales y compite en el ranking oficial.
            </p>
            
            <ul className="flex flex-col gap-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#f56d29] shrink-0" />
                <span className="leading-tight">Desbloquéalo haciendo una <strong className="text-[#f56d29]">compra mínima acumulada de $20</strong>.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#f56d29] shrink-0" />
                <span className="leading-tight">Gana puntos y comisiones acumuladas por cada orden confirmada.</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#111] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#f56d29] shrink-0" />
                <span className="leading-tight">Compite en el <strong>Ranking Nacional</strong> y destaca entre los mejores embajadores del país.</span>
              </li>
            </ul>

            <Link href="/ranking" className="inline-flex items-center justify-center gap-2 w-full bg-[#f56d29] hover:bg-[#e05819] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(245,109,41,0.3)] transition-all">
              Ver Ranking de Embajadores <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
