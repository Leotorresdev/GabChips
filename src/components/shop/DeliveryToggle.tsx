"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Store } from "lucide-react";
import { useCart } from "@/store/cart";

export function DeliveryToggle() {
  const deliveryType = useCart((s) => s.deliveryType);
  const setDelivery = useCart((s) => s.setDelivery);
  const deliveryInfo = useCart((s) => s.deliveryInfo);
  const setDeliveryInfo = useCart((s) => s.setDeliveryInfo);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e2d9]">
      <h3 className="text-xl font-black uppercase tracking-tight text-[#111]">1. ¿Cómo lo quieres recibir?</h3>
      <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-[#fdfbf7] p-1.5 border border-[#e8e2d9]">
        <button
          type="button"
          onClick={() => setDelivery("delivery")}
          className={`relative flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-black uppercase tracking-widest transition-colors ${
            deliveryType === "delivery"
              ? "text-white"
              : "text-[#888] hover:text-[#111]"
          }`}
        >
          {deliveryType === "delivery" && (
            <motion.span
              layoutId="delivery-pill"
              className="absolute inset-0 rounded-xl bg-[#111] shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            <Truck className="h-4 w-4" /> Delivery
          </span>
        </button>
        <button
          type="button"
          onClick={() => setDelivery("pickup")}
          className={`relative flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-black uppercase tracking-widest transition-colors ${
            deliveryType === "pickup"
              ? "text-white"
              : "text-[#888] hover:text-[#111]"
          }`}
        >
          {deliveryType === "pickup" && (
            <motion.span
              layoutId="delivery-pill"
              className="absolute inset-0 rounded-xl bg-[#111] shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            <Store className="h-4 w-4" /> En Tienda
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {deliveryType === "delivery" ? (
          <motion.div
            key="delivery-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 grid gap-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#f56d29] bg-orange-50 px-3 py-2 rounded-lg border border-orange-100">
              Costo de delivery a convenir según tu zona (Caracas)
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Field
                className="col-span-2"
                label="Calle / Avenida"
                name="street"
                value={deliveryInfo.street}
                onChange={(val) => setDeliveryInfo({ street: val })}
                required
              />
              <Field 
                label="Edif/Casa" 
                name="number" 
                value={deliveryInfo.number}
                onChange={(val) => setDeliveryInfo({ number: val })}
                required 
              />
            </div>
            <Field 
              label="Punto de Referencia (opcional)" 
              name="reference" 
              value={deliveryInfo.reference}
              onChange={(val) => setDeliveryInfo({ reference: val })}
            />
            <Field 
              label="Teléfono de Contacto" 
              name="phone" 
              type="tel" 
              value={deliveryInfo.phone}
              onChange={(val) => setDeliveryInfo({ phone: val })}
              required 
            />
          </motion.div>
        ) : (
          <motion.div
            key="pickup-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 rounded-2xl border border-[#e8e2d9] bg-[#fdfbf7] p-5"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f56d29] text-[#111]">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black text-[#111] uppercase tracking-wide">Punto de Retiro</p>
                <p className="mt-1 text-sm font-medium text-[#555]">
                  Caracas, Venezuela (Zona céntrica)
                </p>
                <p className="mt-2 text-[11px] font-bold text-[#f56d29] uppercase tracking-wider">
                  Te avisaremos al WhatsApp cuando tu pedido esté listo para retirar.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10 font-medium text-[#111]"
      />
    </label>
  );
}
