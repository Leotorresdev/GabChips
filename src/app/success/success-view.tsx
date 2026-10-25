"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Check,
  ArrowLeft,
  ShieldCheck,
  Trophy,
  Sparkles,
  MessageCircle,
  PackageCheck,
  MapPin,
} from "lucide-react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { buildOrderWhatsAppUrl, OFFICIAL_WHATSAPP_NUMBER } from "@/lib/whatsapp";

type StoredOrderData = {
  orderRef?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryType?: string;
  deliveryInfo?: {
    state?: string;
    city?: string;
    agency?: string;
    agencyAddress?: string;
    idNumber?: string;
    receiverName?: string;
    phone?: string;
  };
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
    variant?: string;
  }>;
  totalUsd?: number;
  totalVes?: number;
  rateBcv?: number;
  paymentRef?: string;
};

export function SuccessView() {
  const searchParams = useSearchParams();
  const bankRef = searchParams.get("ref");
  const amountUsd = searchParams.get("amount");
  const amountVes = searchParams.get("ves");

  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const [orderData, setOrderData] = useState<StoredOrderData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("gab_last_order");
        if (stored) {
          const parsed: StoredOrderData = JSON.parse(stored);
          setOrderData(parsed);
          const url = buildOrderWhatsAppUrl(parsed as any);
          setWhatsappUrl(url);
          return;
        }
      } catch {
        // fallback
      }
    }

    // Fallback con parámetros de URL si no hay localStorage
    const fallbackText = `🍟 *NUEVO PEDIDO · GAB CHIPS*\n🧾 Ref Bancaria: #${bankRef || "PAGO-WEB"}\n💰 Total: $${amountUsd || "0.00"} USD (Bs. ${amountVes || "0.00"})\n_Hola, les comparto los datos de mi pedido para coordinar el despacho._`;
    setWhatsappUrl(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(fallbackText)}`);
  }, [bankRef, amountUsd, amountVes]);

  const displayRef = orderData?.paymentRef || bankRef || orderData?.orderRef || "PAGO-CONFIRMADO";
  const displayUsd = orderData?.totalUsd?.toFixed(2) || amountUsd || "0.00";
  const displayVes = orderData?.totalVes
    ? orderData.totalVes.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : amountVes || "0,00";

  return (
    <ShopChrome>
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-24 pb-16 text-center md:pt-36 md:pb-28">
        
        {/* Ícono animado de éxito */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid h-24 w-24 place-items-center rounded-full bg-[#f56d29] text-white shadow-xl shadow-orange-500/25"
        >
          <Check className="h-12 w-12 text-white" strokeWidth={3} />
        </motion.div>

        {/* Título de agradecimiento */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-3xl font-black uppercase text-[#111] md:text-5xl tracking-tight"
        >
          ¡Muchas gracias por <span className="text-[#f56d29]">tu compra!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 max-w-md text-sm text-[#666] font-medium leading-relaxed"
        >
          Tu pago fue procesado y validado con éxito. A continuación tienes los datos de tu orden confirmada:
        </motion.p>

        {/* Voucher oficial de Aprobación Bancaria y Detalles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 w-full max-w-md bg-white border border-[#e8e4d8] rounded-2xl p-5 sm:p-6 shadow-sm text-left"
        >
          <div className="flex items-center justify-between border-b border-[#f0ece1] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#111]">
                Pago Verificado BNC
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Aprobado
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-[#888] font-bold">Referencia Bancaria:</span>
              <span className="font-mono font-black text-[#111] text-sm">#{displayRef}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-[#888] font-bold">Monto en Bolívares:</span>
              <span className="font-black text-[#111]">Bs. {displayVes}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-[#888] font-bold">Equivalente USD:</span>
              <span className="font-black text-[#f56d29]">${displayUsd} USD</span>
            </div>

            {orderData?.customerName && (
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-[#888] font-bold">Cliente:</span>
                <span className="font-bold text-[#111]">{orderData.customerName}</span>
              </div>
            )}

            {orderData?.deliveryInfo?.city && (
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-[#888] font-bold">Destino:</span>
                <span className="font-bold text-[#111]">
                  {orderData.deliveryInfo.city}, {orderData.deliveryInfo.state || "Venezuela"}
                </span>
              </div>
            )}

            {orderData?.deliveryInfo?.agency && (
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <span className="text-[#888] font-bold">Agencia de Envío:</span>
                <span className="font-bold text-[#111]">{orderData.deliveryInfo.agency}</span>
              </div>
            )}

            {orderData?.items && orderData.items.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-[#888] tracking-wider block mb-1.5">
                  Productos Ordenados:
                </span>
                <div className="space-y-1">
                  {orderData.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] text-[#444] font-medium">
                      <span>• {item.quantity}x {item.name} {item.variant ? `(${item.variant})` : ""}</span>
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
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

        {/* Tarjeta de Información de Envío */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-[#e8e4d8] bg-white px-5 py-4 shadow-sm max-w-md w-full text-left"
        >
          <PackageCheck className="h-5 w-5 text-[#f56d29] shrink-0" />
          <div className="text-xs">
            <div className="text-[10px] uppercase font-bold text-[#888] tracking-widest">
              Envío Nacional
            </div>
            <div className="font-extrabold text-[#111] mt-0.5">
              Se despacha en 24h y te notificamos la guía de encomienda.
            </div>
          </div>
        </motion.div>

        {/* Botón de Comunicarse al WhatsApp (Solo abre cuando el usuario lo toca) */}
        {whatsappUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 w-full max-w-md"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebd5a] px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Comunicarse al WhatsApp</span>
            </a>
            <p className="text-[11px] text-[#777] font-medium mt-2">
              Toca el botón si deseas comunicarte directamente con nosotros por WhatsApp (0424-4493286).
            </p>
          </motion.div>
        )}

        {/* Botones de Navegación Inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#111] hover:bg-[#f56d29] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Seguir Comprando
          </Link>
          <Link
            href="/ranking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-gray-50 border border-[#e8e4d8] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111] shadow-sm transition-all cursor-pointer"
          >
            <Trophy className="h-4 w-4 text-[#f56d29]" /> Ver mi Ranking
          </Link>
        </motion.div>

      </div>
    </ShopChrome>
  );
}
