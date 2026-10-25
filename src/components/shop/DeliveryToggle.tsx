"use client";

import { Bike, PackageCheck, MapPin, Building2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { ESTADOS_VENEZUELA, AGENCIAS_ENCOMIENDA } from "@/lib/venezuela";

export function DeliveryToggle() {
  const deliveryType = useCart((s) => s.deliveryType);
  const setDelivery = useCart((s) => s.setDelivery);
  const deliveryInfo = useCart((s) => s.deliveryInfo);
  const setDeliveryInfo = useCart((s) => s.setDeliveryInfo);

  const isLocalBocono = deliveryType === "delivery";

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e8e2d9]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-black uppercase tracking-tight text-[#111]">
          1. Método de Entrega
        </h3>
        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#f56d29] bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
          {isLocalBocono ? "🛵 Delivery Boconó" : "📦 Envío Nacional"}
        </span>
      </div>

      <p className="text-xs text-[#666] font-medium mb-4">
        Selecciona si te encuentras en <strong>Boconó</strong> para recibir delivery gratis o si deseas envío nacional a otro estado del país.
      </p>

      {/* Selector de Modo: Delivery Local en Boconó vs Envíos Nacionales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-1.5 bg-[#f5f2eb] rounded-2xl border border-[#e6dfd1] mb-5">
        <button
          type="button"
          onClick={() => {
            setDelivery("delivery");
            setDeliveryInfo({ state: "Trujillo", city: "Boconó" });
          }}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left cursor-pointer ${
            isLocalBocono
              ? "bg-white shadow-sm border border-emerald-500/40 text-[#111]"
              : "text-[#666] hover:text-[#111] hover:bg-white/50"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 transition-colors ${
              isLocalBocono
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-white text-[#777] border border-[#e0dbcd]"
            }`}
          >
            <Bike className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-tight block truncate">
                Delivery en Boconó
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-1.5 py-0.2 rounded shrink-0">
                ¡Gratis!
              </span>
            </div>
            <span className="text-[10px] text-[#777] font-semibold block truncate">
              Entregas directas en todo Boconó
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setDelivery("nacional")}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left cursor-pointer ${
            !isLocalBocono
              ? "bg-white shadow-sm border border-[#f56d29]/40 text-[#111]"
              : "text-[#666] hover:text-[#111] hover:bg-white/50"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 transition-colors ${
              !isLocalBocono
                ? "bg-[#f56d29] text-white shadow-xs"
                : "bg-white text-[#777] border border-[#e0dbcd]"
            }`}
          >
            <PackageCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-black uppercase tracking-tight block truncate">
              Envíos Nacionales
            </span>
            <span className="text-[10px] text-[#777] font-semibold block truncate">
              MRW y ZOOM a todo el país
            </span>
          </div>
        </button>
      </div>

      {/* Formulario según la opción seleccionada */}
      {isLocalBocono ? (
        /* Formulario 1: Delivery Local en Boconó (GRATIS) */
        <div className="space-y-4">
          <div className="bg-emerald-50/90 border border-emerald-200/90 p-3.5 rounded-xl flex items-start gap-2.5">
            <span className="text-xl">🛵</span>
            <div>
              <p className="text-[11px] font-black text-emerald-800 uppercase tracking-wider">
                Delivery local gratuito en Boconó, Trujillo
              </p>
              <p className="text-xs text-emerald-700 font-medium mt-0.5 leading-snug">
                Llevamos tus papas y snacks directamente hasta tu puerta o lugar de trabajo en Boconó sin costo adicional de envío.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Sector o Zona de Boconó */}
              <Field
                label="Sector / Zona de Boconó"
                name="street"
                placeholder="Ej: El Barzalito / Centro / La Sabanita"
                value={deliveryInfo.street || ""}
                onChange={(val) => setDeliveryInfo({ street: val, city: "Boconó", state: "Trujillo" })}
                required
              />

              {/* Casa, Edificio o Local */}
              <Field
                label="Calle, Casa o Local Comercial"
                name="number"
                placeholder="Ej: Calle Bolívar, Casa #24 frente al abasto"
                value={deliveryInfo.number || ""}
                onChange={(val) => setDeliveryInfo({ number: val })}
                required
              />
            </div>

            {/* Punto de referencia */}
            <Field
              label="Punto de Referencia Exacto"
              name="reference"
              placeholder="Ej: A media cuadra de la plaza / diagonal a la farmacia"
              value={deliveryInfo.reference || ""}
              onChange={(val) => setDeliveryInfo({ reference: val })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Nombre de la persona que recibe */}
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
                label="Teléfono de Contacto (WhatsApp)"
                name="phone"
                type="tel"
                placeholder="04241234567"
                value={deliveryInfo.phone || ""}
                onChange={(val) => setDeliveryInfo({ phone: val })}
                required
              />
            </div>
          </div>
        </div>
      ) : (
        /* Formulario 2: Envíos Nacionales (MRW / ZOOM) */
        <div className="space-y-4">
          <div className="bg-orange-50/90 border border-orange-200/80 p-3.5 rounded-xl flex items-start gap-2.5">
            <span className="text-xl">🇻🇪</span>
            <div>
              <p className="text-[11px] font-extrabold text-[#f56d29] uppercase tracking-wider">
                Envíos a todos los estados de Venezuela
              </p>
              <p className="text-xs text-[#555] font-medium mt-0.5 leading-snug">
                Despachamos tus snacks por agencias MRW o ZOOM (Cobro en Destino).
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Selector de Estado */}
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">
                  Estado de Destino
                </span>
                <select
                  required
                  value={deliveryInfo.state || "Trujillo"}
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
                placeholder="Ej: Valera / Barquisimeto / Caracas"
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
              placeholder="Ej: MRW Av. Principal / Domicilio Calle Bolívar Casa #10"
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
                value={deliveryInfo.phone || ""}
                onChange={(val) => setDeliveryInfo({ phone: val })}
                required
              />
            </div>
          </div>
        </div>
      )}
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
        className="mt-1.5 w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10 font-bold text-[#111]"
      />
    </label>
  );
}
