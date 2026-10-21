"use client";

import { useEffect } from "react";
import { PackageCheck } from "lucide-react";
import { useCart } from "@/store/cart";
import { ESTADOS_VENEZUELA, AGENCIAS_ENCOMIENDA } from "@/lib/venezuela";

export function DeliveryToggle() {
  const setDelivery = useCart((s) => s.setDelivery);
  const deliveryInfo = useCart((s) => s.deliveryInfo);
  const setDeliveryInfo = useCart((s) => s.setDeliveryInfo);

  useEffect(() => {
    setDelivery("nacional");
  }, [setDelivery]);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e8e2d9]">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xl font-black uppercase tracking-tight text-[#111]">
          1. Datos de Envío Nacional
        </h3>
        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#f56d29] bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
          <PackageCheck className="w-3.5 h-3.5" /> Todo el País
        </span>
      </div>

      <div className="mt-4 bg-orange-50/90 border border-orange-200/80 p-3.5 rounded-xl flex items-start gap-2.5">
        <span className="text-xl">🇻🇪</span>
        <div>
          <p className="text-[11px] font-extrabold text-[#f56d29] uppercase tracking-wider">
            Envíos a todos los estados de Venezuela
          </p>
          <p className="text-xs text-[#555] font-medium mt-0.5 leading-snug">
            Enviamos tus snacks por MRW o ZOOM (Cobro en Destino).
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
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
            placeholder="Ej: Boconó / Valera / Barquisimeto"
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
            value={deliveryInfo.phone}
            onChange={(val) => setDeliveryInfo({ phone: val })}
            required
          />
        </div>
      </div>
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
