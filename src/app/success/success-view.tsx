"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Clock, ArrowLeft, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { useCart } from "@/store/cart";

export function SuccessView() {
  const searchParams = useSearchParams();
  const bankRef = searchParams.get("ref");
  const amountUsd = searchParams.get("amount");
  const amountVes = searchParams.get("ves");

  const deliveryType = useCart((s) => s.deliveryType);
  const eta =
    deliveryType === "pickup"
      ? "15 min · listo para retirar en tienda"
      : "25–35 min a tu puerta";

  return (
    <ShopChrome>
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-24 pb-16 text-center md:pt-36 md:pb-28">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid h-24 w-24 place-items-center rounded-full bg-[#f56d29] text-white shadow-xl shadow-orange-500/25"
        >
          <Check className="h-12 w-12 text-white" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-4xl font-black uppercase text-[#111] md:text-5xl"
        >
          ¡Pago Aprobado y <span className="text-[#f56d29]">en camino!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 max-w-md text-sm text-[#666] font-medium leading-relaxed"
        >
          Tu pago fue procesado y validado en tiempo real. Ya estamos preparando tu orden con mucho cariño.
        </motion.p>

        {/* Voucher de Aprobación Bancaria BNC */}
        {bankRef && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 w-full max-w-md bg-white border border-[#e8e4d8] rounded-2xl p-5 shadow-sm text-left"
          >
            <div className="flex items-center justify-between border-b border-[#f0ece1] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-[#111]">
                  Pasarela BNC Aprobada
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Exitoso
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#888] font-bold">Referencia Bancaria:</span>
                <span className="font-mono font-bold text-[#111]">{bankRef}</span>
              </div>
              {amountVes && (
                <div className="flex justify-between items-center">
                  <span className="text-[#888] font-bold">Monto Debitado:</span>
                  <span className="font-bold text-[#111]">Bs. {amountVes}</span>
                </div>
              )}
              {amountUsd && (
                <div className="flex justify-between items-center">
                  <span className="text-[#888] font-bold">Equivalente USD:</span>
                  <span className="font-bold text-[#f56d29]">${amountUsd} USD</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0ece1] flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Puntos sumados a tu Ranking
              </span>
              <Link 
                href="/ranking"
                className="font-black text-[#111] hover:text-[#f56d29] underline transition-colors"
              >
                Ver Ranking →
              </Link>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-[#e8e4d8] bg-white px-6 py-4 shadow-sm"
        >
          <Clock className="h-5 w-5 text-[#f56d29]" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-[#888] tracking-widest">
              Tiempo estimado de entrega
            </div>
            <div className="font-extrabold text-sm text-[#111]">{eta}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#f56d29] hover:bg-[#e05819] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Seguir Comprando
          </Link>
          <Link
            href="/ranking"
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-gray-50 border border-[#e8e4d8] px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#111] shadow-sm transition-all"
          >
            <Trophy className="h-4 w-4 text-[#f56d29]" /> Ver mi Posición
          </Link>
        </motion.div>
      </div>
    </ShopChrome>
  );
}
