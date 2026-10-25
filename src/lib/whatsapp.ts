// Teléfono oficial registrado para pedidos y atención al cliente por WhatsApp
export const OFFICIAL_WHATSAPP_NUMBER = 
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "584244493286";

export type OrderWhatsAppDetails = {
  orderRef?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryType?: "delivery" | "nacional" | "pickup";
  deliveryInfo: {
    street?: string;
    number?: string;
    reference?: string;
    phone?: string;
    state?: string;
    city?: string;
    agency?: string;
    agencyAddress?: string;
    idNumber?: string;
    receiverName?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    variant?: string;
  }>;
  totalUsd: number;
  totalVes: number;
  rateBcv?: number;
  paymentMethod?: string;
  paymentRef?: string;
  payerPhone?: string;
  hasReceipt?: boolean;
};

/**
 * Genera el mensaje formateado en plantilla ordenada y el enlace directo hacia WhatsApp
 */
export function buildOrderWhatsAppUrl(details: OrderWhatsAppDetails): string {
  const {
    orderRef,
    customerName,
    customerPhone,
    customerEmail,
    deliveryType = "nacional",
    deliveryInfo,
    items,
    totalUsd,
    totalVes,
    rateBcv,
    paymentRef,
    hasReceipt,
  } = details;

  const receiverPhone = deliveryInfo.phone || customerPhone || "No especificado";

  let deliverySection = "";
  if (deliveryType === "nacional" || !deliveryType) {
    deliverySection = [
      `📦 *DATOS DE ENVÍO NACIONAL:*`,
      `• *Estado:* ${deliveryInfo.state || "Trujillo"}`,
      `• *Ciudad / Municipio:* ${deliveryInfo.city || "No especificado"}`,
      `• *Agencia de Envío:* ${deliveryInfo.agency || "MRW / ZOOM (Cobro en Destino)"}`,
      `• *Cédula / RIF (Quien retira):* ${deliveryInfo.idNumber || "No especificado"}`,
      `• *Nombre de quien recibe:* ${deliveryInfo.receiverName || customerName}`,
      `• *Dirección de Sede / Domicilio:* ${deliveryInfo.agencyAddress || "No especificado"}`,
      `• *Teléfono Destino (WhatsApp):* ${receiverPhone}`,
    ].join("\n");
  } else if (deliveryType === "delivery") {
    deliverySection = [
      `🛵 *DATOS DE DELIVERY LOCAL (BOCONÓ - GRATIS):*`,
      `• *Zona / Sector:* ${deliveryInfo.street || "Boconó"}`,
      deliveryInfo.number ? `• *Calle / Casa / Local:* ${deliveryInfo.number}` : null,
      deliveryInfo.reference ? `• *Punto de Referencia:* ${deliveryInfo.reference}` : null,
      `• *Nombre de quien recibe:* ${deliveryInfo.receiverName || customerName}`,
      `• *Teléfono Destino (WhatsApp):* ${receiverPhone}`,
    ]
      .filter(Boolean)
      .join("\n");
  } else {
    deliverySection = [
      `🏬 *RETIRO EN TIENDA:*`,
      `• Retiro presencial por el cliente`,
    ].join("\n");
  }

  const itemsList = items && items.length > 0
    ? items
        .map(
          (item) =>
            `• ${item.quantity}x ${item.name}${item.variant ? ` (${item.variant})` : ""} — $${(item.price * item.quantity).toFixed(2)} USD`
        )
        .join("\n")
    : "• Sin productos";

  const divider = "----------------------------------------";

  const lines = [
    `🍟 *ORDEN DE PEDIDO · GAB CHIPS* 🍟`,
    orderRef ? `🧾 *Pedido:* #${orderRef}` : `🧾 *Pedido Web*`,
    divider,
    `👤 *DATOS DEL CLIENTE:*`,
    `• *Nombre:* ${customerName}`,
    customerEmail ? `• *Correo:* ${customerEmail}` : null,
    customerPhone ? `• *Teléfono:* ${customerPhone}` : null,
    divider,
    deliverySection,
    divider,
    `🛍️ *DETALLE DE PRODUCTOS:*`,
    itemsList,
    divider,
    `💰 *TOTAL A PAGAR:*`,
    `💵 *$${totalUsd.toFixed(2)} USD*`,
    `🇻🇪 *Bs. ${totalVes.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*`,
    rateBcv ? `📊 *Tasa BCV:* Bs. ${rateBcv.toFixed(2)}` : null,
    divider,
    `🏦 *DATOS DEL PAGO (BNC):*`,
    paymentRef ? `• *Ref. Bancaria:* #${paymentRef}` : null,
    hasReceipt ? `• *Comprobante:* 📸 Adjunto captura a este chat` : `• *Comprobante:* Adjunto captura a continuación`,
    divider,
    `_Hola GAB Chips, les comparto los datos de mi pedido, envío nacional y comprobante para coordinar el despacho. ¡Muchas gracias!_`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
}
