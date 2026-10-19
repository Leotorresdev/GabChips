"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Store, PackageCheck } from "lucide-react";
import { useCart } from "@/store/cart";
import { ESTADOS_VENEZUELA, AGENCIAS_ENCOMIENDA } from "@/lib/venezuela";

export function DeliveryToggle() {
  const deliveryType = useCart((s) => s.deliveryType);
  const setDelivery = useCart((s) => s.setDelivery);
  const deliveryInfo = useCart((s) => s.deliveryInfo);
  const setDeliveryInfo = useCart((s) => s.setDeliveryInfo);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e8e2d9]">
      <h3 className="text-xl font-black uppercase tracking-tight text-[#111]">
        1. ¿Cómo lo quieres recibir?
      </h3>

      {/* Selector de 3 Opciones de Entrega */}
      <div className="mt-5 grid grid-cols-3 gap-1.5 sm:gap-2 rounded-2xl bg-[#fdfbf7] p-1.5 border border-[#e8e2d9]">
        <button
          type="button"
          onClick={() => setDelivery("delivery")}
          className={`relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-xl py-3 px-1 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors cursor-pointer text-center ${
            deliveryType === "delivery"
              ? "text-white"
              : "text-[#777] hover:text-[#111]"
          }`}
        >
          {deliveryType === "delivery" && (
            <motion.span
              layoutId="delivery-pill"
              className="absolute inset-0 rounded-xl bg-[#111] shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="truncate">Caracas</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDelivery("nacional")}
          className={`relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-xl py-3 px-1 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors cursor-pointer text-center ${
            deliveryType === "nacional"
              ? "text-white"
              : "text-[#777] hover:text-[#111]"
          }`}
        >
          {deliveryType === "nacional" && (
            <motion.span
              layoutId="delivery-pill"
              className="absolute inset-0 rounded-xl bg-[#f56d29] shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            <PackageCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="truncate">Nacional</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDelivery("pickup")}
          className={`relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-xl py-3 px-1 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors cursor-pointer text-center ${
            deliveryType === "pickup"
              ? "text-white"
              : "text-[#777] hover:text-[#111]"
          }`}
        >
          {deliveryType === "pickup" && (
            <motion.span
              layoutId="delivery-pill"
              className="absolute inset-0 rounded-xl bg-[#111] shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            <Store className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="truncate">Tienda</span>
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {deliveryType === "nacional" ? (
          // Opción 2: Envíos Nacionales a otros estados de Venezuela
          <motion.div
            key="nacional-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 grid gap-4"
          >
            <div className="bg-orange-50/90 border border-orange-200/80 p-3.5 rounded-xl flex items-start gap-2.5">
              <span className="text-xl">🇻🇪</span>
              <div>
                <p className="text-[11px] font-extrabold text-[#f56d29] uppercase tracking-wider">
                  Envíos a todos los estados de Venezuela
                </p>
                <p className="text-xs text-[#555] font-medium mt-0.5 leading-snug">
                  Enviamos tus papas y plátanos por MRW, Zoom, Tealca o Domesa (Cobro en Destino).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Selector de Estado */}
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">
                  Estado de Destino
                </span>
                <select
                  required
                  value={deliveryInfo.state || "Carabobo"}
                  onChange={(e) => setDeliveryInfo({ state: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#e8e2d9] bg-white px-3.5 py-3 text-sm font-bold outline-none transition-colors focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10 text-[#111]"
                >
                  {ESTADOS_VENEZUELA.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </label>

              {/* Ciudad o Municipio */}
              <Field
                label="Ciudad / Municipio"
                name="city"
                placeholder="Ej: Valencia / Barquisimeto"
                value={deliveryInfo.city || ""}
                onChange={(val) => setDeliveryInfo({ city: val })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Agencia de Encomienda */}
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">
                  Empresa / Agencia de Envío
                </span>
                <select
                  required
                  value={deliveryInfo.agency || "MRW (Cobro a Destino)"}
                  onChange={(e) => setDeliveryInfo({ agency: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#e8e2d9] bg-white px-3.5 py-3 text-sm font-bold outline-none transition-colors focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10 text-[#111]"
                >
                  {AGENCIAS_ENCOMIENDA.map((ag) => (
                    <option key={ag} value={ag}>
                      {ag}
                    </option>
                  ))}
                </select>
              </label>

              {/* Cédula o RIF para retirar */}
              <Field
                label="Cédula / RIF (quien retira)"
                name="idNumber"
                placeholder="V-12345678"
                value={deliveryInfo.idNumber || ""}
                onChange={(val) => setDeliveryInfo({ idNumber: val })}
                required
              />
            </div>

            {/* Dirección de la agencia o del domicilio */}
            <Field
              label="Dirección de la Agencia o Domicilio Exacto"
              name="agencyAddress"
              placeholder="Ej: MRW Av. Bolívar Norte / Domicilio Urb. El Parral Casa #14"
              value={deliveryInfo.agencyAddress || ""}
              onChange={(val) => setDeliveryInfo({ agencyAddress: val })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Nombre de la persona que retira */}
              <Field
                label="Nombre de quien recibe"
                name="receiverName"
                placeholder="Nombre y Apellido"
                value={deliveryInfo.receiverName || ""}
                onChange={(val) => setDeliveryInfo({ receiverName: val })}
                required
              />

              {/* Teléfono de contacto destino */}
              <Field
                label="Teléfono Destino (WhatsApp)"
                name="phone"
                type="tel"
                placeholder="04241234567"
                value={deliveryInfo.phone}
                onChange={(val) => setDeliveryInfo({ phone: val })}
                required
              />
            </div>
          </motion.div>
        ) : deliveryType === "delivery" ? (
          // Opción 1: Delivery Local Caracas
          <motion.div
            key="delivery-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 grid gap-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#f56d29] bg-orange-50 px-3 py-2 rounded-lg border border-orange-100">
              🛵 Delivery motorizado en toda Caracas (Costo a convenir según zona)
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Field
                className="col-span-2"
                label="Calle / Avenida"
                name="street"
                placeholder="Ej: Av. Francisco de Miranda"
                value={deliveryInfo.street}
                onChange={(val) => setDeliveryInfo({ street: val })}
                required
              />
              <Field 
                label="Edif/Casa" 
                name="number" 
                placeholder="Piso / Casa #"
                value={deliveryInfo.number}
                onChange={(val) => setDeliveryInfo({ number: val })}
                required 
              />
            </div>
            <Field 
              label="Punto de Referencia (opcional)" 
              name="reference" 
              placeholder="Frente a la panadería / Portón negro"
              value={deliveryInfo.reference}
              onChange={(val) => setDeliveryInfo({ reference: val })}
            />
            <Field 
              label="Teléfono de Contacto" 
              name="phone" 
              type="tel" 
              placeholder="04121234567"
              value={deliveryInfo.phone}
              onChange={(val) => setDeliveryInfo({ phone: val })}
              required 
            />
          </motion.div>
        ) : (
          // Opción 3: Retiro en tienda
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
                <p className="font-black text-[#111] uppercase tracking-wide">Punto de Retiro en Tienda</p>
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10 font-medium text-[#111]"
      />
    </label>
  );
}
