"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Trophy,
  Medal, 
  TrendingUp, 
  AlertCircle, 
  Wallet, 
  Gift, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  ShoppingBag, 
  Sparkles, 
  UserCheck 
} from "lucide-react";
import { useUser } from "@/store/user";
import { supabase } from "@/lib/supabase";

type ClienteDB = {
  id?: string;
  nombre: string;
  correo: string;
  total_comprado: number | string;
  ordenes_count?: number;
  created_at?: string;
};

export default function RankingPage() {
  const { isLoggedIn, name: userName, email: userEmail, totalComprado, login } = useUser();
  const [clientes, setClientes] = useState<ClienteDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"clasificados" | "todos">("clasificados");
  const [rankingUserInput, setRankingUserInput] = useState("");
  const [rankingAuthMsg, setRankingAuthMsg] = useState("");
  const [rankingLoading, setRankingLoading] = useState(false);

  // Consultar clientes reales desde Supabase
  const fetchRanking = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("total_comprado", { ascending: false });

      if (error) {
        console.error("Error al obtener clientes de Supabase:", error);
      } else if (data) {
        setClientes(data);
      }
    } catch (err) {
      console.error("Error de conexión:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  // Ingreso directo por nombre de usuario para usuarios ya registrados
  const handleRankingQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = rankingUserInput.trim();
    if (!clean) return;
    setRankingLoading(true);
    setRankingAuthMsg("");

    try {
      const { data: found } = await supabase
        .from("clientes")
        .select("*")
        .or(`nombre.ilike.%${clean}%,correo.ilike.%${clean}%`)
        .order("total_comprado", { ascending: false })
        .limit(1);

      if (found && found.length > 0) {
        const c = found[0];
        login(c.nombre || clean, c.correo || "", Number(c.total_comprado || 0));
        setRankingUserInput("");
      } else {
        setRankingAuthMsg(`No se encontró registro para "${clean}". Regístrate para clasificar.`);
      }
    } catch (err) {
      console.error(err);
      login(clean, "", 0);
    } finally {
      setRankingLoading(false);
    }
  };

  // Filtrado de la lógica de negocio:
  // Clientes con compras > $20 -> CLASIFICADOS EN EL RANKING
  const clasificados = clientes.filter(
    (c) => Number(c.total_comprado || 0) > 20
  );

  // Clientes que sólo se registraron por el descuento (total <= $20)
  const soloDescuento = clientes.filter(
    (c) => Number(c.total_comprado || 0) <= 20
  );

  // Datos del usuario logueado en la base de datos
  const myRecord = userEmail 
    ? clientes.find((c) => c.correo?.toLowerCase() === userEmail.toLowerCase()) 
    : null;

  // Priorizamos el total de la base de datos real, o el del store local si acaba de registrarse
  const myTotal = myRecord ? Number(myRecord.total_comprado || 0) : totalComprado;
  const isOver20 = myTotal > 20;

  // Posición del usuario en el ranking (si está clasificado)
  const myRankIndex = userEmail 
    ? clasificados.findIndex((c) => c.correo?.toLowerCase() === userEmail.toLowerCase()) 
    : -1;
  const myRank = myRankIndex !== -1 ? myRankIndex + 1 : null;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">
      
      {/* Hero Banner Dinámico */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-[#f56d29] via-[#ea6320] to-[#e05819] rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 overflow-hidden shadow-xl shadow-orange-500/20"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-bold uppercase tracking-wider mb-4 border border-white/20 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Programa Oficial de Embajadores GAB</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.15] mb-4 drop-shadow-sm tracking-tight">
              Ranking Nacional de<br/>Embajadores GAB
            </h1>
            <p className="text-white/95 text-sm md:text-base font-medium leading-relaxed max-w-lg">
              Acumula tus compras y asciende en la tabla oficial. Compras mayores a <strong className="font-bold text-white">$20.00 USD</strong> clasifican automáticamente en el Ranking Nacional.
            </p>
          </div>
          
          <div className="shrink-0 w-full lg:w-auto">
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-5 md:p-6 flex items-center gap-4 shadow-lg shadow-black/5">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/30">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col text-white">
                <span className="text-[11px] font-black uppercase tracking-widest text-white/80 mb-0.5">
                  Tabla de Posiciones
                </span>
                <span className="font-extrabold text-base md:text-lg leading-tight text-white drop-shadow-sm">
                  Clasificación Oficial
                </span>
                <span className="text-xs font-semibold text-white/90">
                  Actualización en Tiempo Real
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADO DEL CLIENTE EN TIEMPO REAL (LÓGICA DE REGISTRO VS COMPRA > $20) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {isLoggedIn ? (
          isOver20 ? (
            // Caso 1: Cliente con compra > $20 -> CLASIFICADO OFICIALMENTE
            <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-md shrink-0">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-1">
                    <Sparkles className="w-3 h-3" /> Clasificado Oficialmente
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-[#111]">
                    ¡Felicidades, {userName}!
                  </h2>
                  <p className="text-xs md:text-sm text-[#555] font-medium mt-0.5">
                    Tus compras acumuladas superan los $20.00 USD. Actualmente tienes <strong className="text-emerald-600 font-bold">${myTotal.toFixed(2)} USD</strong> ({Math.round(myTotal * 10)} pts) y estás en la <strong className="text-[#111]">Posición #{myRank || 1}</strong> del Ranking.
                  </p>
                </div>
              </div>
              <Link 
                href="/#productos"
                className="bg-[#111] hover:bg-[#f56d29] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
              >
                Seguir Comprando (+ Puntos)
              </Link>
            </div>
          ) : (
            // Caso 2: Cliente registrado por el descuento (total <= $20)
            <div className="bg-[#fdfbf7] border-2 border-[#f56d29]/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#f56d29]"></div>
              <div className="flex items-center gap-4 pl-2">
                <div className="w-14 h-14 rounded-2xl bg-[#f56d29]/15 border border-[#f56d29]/30 flex items-center justify-center text-[#f56d29] shadow-sm shrink-0">
                  <UserCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-[#f56d29]/15 text-[#f56d29] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-1">
                    🎟️ 20% OFF Activo en tu Cuenta
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-[#111]">
                    Hola, {userName}
                  </h2>
                  <p className="text-xs md:text-sm text-[#555] font-medium mt-0.5 max-w-xl leading-relaxed">
                    Tu registro está confirmado en el sistema. Tienes un acumulado de <strong className="text-[#111] font-bold">${myTotal.toFixed(2)} USD</strong>. Para clasificar en la Tabla Oficial de Posiciones, realiza compras mayores a $20.00 USD (Te faltan <strong className="text-[#f56d29] font-bold">${Math.max(0, 20.01 - myTotal).toFixed(2)} USD</strong>).
                  </p>
                </div>
              </div>
              <Link 
                href="/#productos"
                className="bg-[#f56d29] hover:bg-[#e05819] text-white text-xs font-black uppercase tracking-widest px-6 py-4 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2 ml-2 md:ml-0"
              >
                <ShoppingBag className="w-4 h-4" /> Comprar con 20% OFF
              </Link>
            </div>
          )
        ) : (
          // Caso 3: Usuario anónimo / no ha iniciado sesión
          <div className="bg-white border border-[#e8e4d8] rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f56d29]/10 text-[#f56d29] flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#111]">Consulta tu posición en el Ranking</h3>
                <p className="text-xs text-[#666] font-medium mt-0.5">
                  Si ya te has registrado, ingresa con tu <strong>nombre de usuario</strong> para abrir tu sesión y ver tus compras acumuladas.
                </p>
                {rankingAuthMsg && (
                  <p className="text-xs text-red-500 font-bold mt-1.5">{rankingAuthMsg}</p>
                )}
              </div>
            </div>
            
            <form onSubmit={handleRankingQuickLogin} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
              <input
                type="text"
                required
                placeholder="Nombre de Usuario"
                value={rankingUserInput}
                onChange={(e) => setRankingUserInput(e.target.value)}
                className="w-full sm:w-56 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold outline-none focus:border-[#f56d29] focus:ring-2 focus:ring-[#f56d29]/20 text-[#111]"
              />
              <button
                type="submit"
                disabled={rankingLoading}
                className="bg-[#111] hover:bg-[#f56d29] text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm shrink-0 whitespace-nowrap disabled:opacity-50"
              >
                {rankingLoading ? "Buscando..." : "Ingresar"}
              </button>
              <Link 
                href="/#productos"
                className="bg-[#f56d29] hover:bg-[#e05819] text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all shadow-sm shrink-0 text-center"
              >
                Comprar
              </Link>
            </form>
          </div>
        )}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
        
        {/* Left Column - Ranking Table (100% Real Supabase Data) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-sm border border-[#e8e4d8] flex flex-col h-full"
        >
          {/* Header de la Tabla */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#f56d29] border border-[#e8e4d8]">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#111]">Tabla de Posiciones</h2>
                <p className="text-xs text-[#666]">
                  Datos en vivo de Supabase • {activeTab === "clasificados" ? "Solo compras > $20.00 USD" : "Todos los registros con descuento"}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-[#fdfbf7] p-1 rounded-full border border-[#e8e4d8]">
                <button 
                  onClick={() => setActiveTab("clasificados")}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                    activeTab === "clasificados"
                      ? "bg-[#f56d29] text-white shadow-sm"
                      : "text-[#666] hover:text-[#111]"
                  }`}
                >
                  🏆 Clasificados ({clasificados.length})
                </button>
                <button 
                  onClick={() => setActiveTab("todos")}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                    activeTab === "todos"
                      ? "bg-[#111] text-white shadow-sm"
                      : "text-[#666] hover:text-[#111]"
                  }`}
                >
                  🎟️ Todos ({clientes.length})
                </button>
              </div>

              {/* Botón de Refrescar Datos en tiempo real */}
              <button 
                onClick={fetchRanking}
                disabled={loading}
                title="Recargar datos de la base de datos"
                className="grid h-8 w-8 place-items-center rounded-full bg-[#fdfbf7] border border-[#e8e4d8] text-[#555] hover:text-[#f56d29] hover:border-[#f56d29] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#f56d29]" : ""}`} />
              </button>
            </div>
          </div>

          {/* Lista de Registros */}
          <div className="flex-1 flex flex-col gap-3">
            {loading ? (
              // Skeleton Loader
              <div className="flex flex-col gap-3 py-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 rounded-2xl bg-gray-100 animate-pulse"></div>
                ))}
              </div>
            ) : activeTab === "clasificados" ? (
              clasificados.length === 0 ? (
                // Estado vacío: Aún no hay nadie con > $20
                <div className="text-center py-12 px-4 bg-[#fdfbf7] rounded-2xl border border-dashed border-[#e8e4d8] my-2">
                  <div className="w-12 h-12 rounded-full bg-[#f56d29]/10 text-[#f56d29] flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-[#111] text-base mb-1">
                    Aún no hay clientes con compras mayores a $20.00
                  </h3>
                  <p className="text-xs text-[#666] max-w-md mx-auto mb-5 leading-relaxed">
                    Los clientes que completen compras superiores a $20.00 USD aparecerán clasificados aquí automáticamente.
                  </p>
                  <Link
                    href="/#productos"
                    className="inline-flex items-center gap-2 bg-[#f56d29] hover:bg-[#e05819] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" /> Comprar para liderar el Ranking
                  </Link>
                </div>
              ) : (
                // Listado de clientes clasificados
                clasificados.map((client, idx) => {
                  const rank = idx + 1;
                  const total = Number(client.total_comprado || 0);
                  const pts = Math.round(total * 10);
                  const isMe = userEmail && client.correo?.toLowerCase() === userEmail.toLowerCase();

                  return (
                    <div 
                      key={client.id || client.correo} 
                      className={`flex items-center gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-all ${
                        isMe 
                          ? "bg-[#fdfbf7] border-2 border-[#f56d29] shadow-sm" 
                          : "bg-white border border-[#e8e4d8] hover:border-[#d9d9d9]"
                      }`}
                    >
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 ${
                        rank === 1 ? "bg-[#ffd700] text-[#8c6731] shadow-sm" :
                        rank === 2 ? "bg-[#e3e3e3] text-[#555] shadow-sm" :
                        rank === 3 ? "bg-[#cd7f32] text-white shadow-sm" :
                        "bg-[#f5f3ec] text-[#888]"
                      }`}>
                        {rank}
                      </div>
                      
                      <div className="relative shrink-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f56d29]/10 text-[#f56d29] font-black text-xs sm:text-sm flex items-center justify-center border border-[#e8e4d8] uppercase">
                          {client.nombre?.charAt(0) || "C"}
                        </div>
                        {rank <= 3 && (
                          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#f56d29] flex items-center justify-center border-2 border-white text-white">
                            <Medal className="w-2 h-2" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <h3 className="font-extrabold text-xs sm:text-sm text-[#111] truncate">{client.nombre}</h3>
                          {isMe && <span className="bg-[#f56d29] text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0">Tú</span>}
                          {rank === 1 && <span className="bg-[#ffd700]/20 text-[#8c6731] text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0">Líder</span>}
                        </div>
                        <p className="text-[10px] text-[#666] truncate font-medium">
                          {client.correo ? `${client.correo.slice(0, 3)}***@${client.correo.split('@')[1] || 'mail.com'}` : 'Cliente verificado'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-5 text-right shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="font-extrabold text-xs sm:text-sm text-[#111]">{pts.toLocaleString()} <span className="text-[9px] text-[#888] font-bold">pts</span></span>
                          <span className="text-[8px] sm:text-[9px] text-[#888] uppercase tracking-wider">Puntos</span>
                        </div>
                        <div className="flex flex-col items-end w-14 sm:w-20">
                          <span className="font-extrabold text-xs sm:text-sm text-[#f56d29]">${total.toFixed(2)}</span>
                          <span className="text-[8px] sm:text-[9px] text-[#888] uppercase tracking-wider">Total</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              // Pestaña "Todos los registrados": Permite comprobar que los registros por descuento existen
              clientes.length === 0 ? (
                <div className="text-center py-10 text-xs text-[#666]">
                  Aún no hay clientes registrados en la base de datos.
                </div>
              ) : (
                clientes.map((client, idx) => {
                  const total = Number(client.total_comprado || 0);
                  const isMe = userEmail && client.correo?.toLowerCase() === userEmail.toLowerCase();
                  const qualifies = total > 20;

                  return (
                    <div 
                      key={client.id || client.correo} 
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isMe 
                          ? "bg-[#fdfbf7] border-2 border-[#f56d29]" 
                          : "bg-white border border-[#e8e4d8]"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#f5f3ec] text-[#888] flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>

                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700 uppercase shrink-0">
                        {client.nombre?.charAt(0) || "U"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#111] truncate">{client.nombre}</h4>
                          {isMe && <span className="bg-[#f56d29] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full">Tú</span>}
                          {qualifies ? (
                            <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase px-2 py-0.5 rounded-full">Clasificado (&gt; $20)</span>
                          ) : (
                            <span className="bg-orange-100 text-[#f56d29] text-[8px] font-black uppercase px-2 py-0.5 rounded-full">20% OFF Activo</span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#888] truncate">{client.correo}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-sm text-[#111]">${total.toFixed(2)}</span>
                        <span className="block text-[8px] font-bold text-[#888] uppercase tracking-wider">
                          {qualifies ? "En Ranking" : "Sin compras > $20"}
                        </span>
                      </div>
                    </div>
                  );
                })
              )
            )}
          </div>

          {/* Barra de progreso personal */}
          <div className="mt-8 bg-[#fdfbf7] border border-[#e8e4d8] rounded-2xl p-5">
            <div className="flex justify-between items-end mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#f56d29]" />
                <span className="text-xs font-bold text-[#111]">
                  {isOver20 ? "Tu estado actual en el Ranking" : "Tu progreso hacia la Clasificación Oficial"}
                </span>
              </div>
              <span className="text-sm font-extrabold text-[#f56d29]">
                {isOver20 ? "100% Clasificado" : `${Math.min(100, Math.round((myTotal / 20) * 100))}%`}
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#e8e4d8] rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-[#f56d29] to-[#e05819] rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, Math.max(10, (myTotal / 20) * 100))}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-[#888] uppercase tracking-widest">
              <span>{isLoggedIn ? `Compras: $${myTotal.toFixed(2)} USD` : "No registrado"}</span>
              <span>Meta de Clasificación: &gt; $20.00 USD</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Widgets Dinámicos (Sin enlace de referido) */}
        <div className="flex flex-col gap-6">
          
          {/* Card 1: Balance / Comisión */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8e4d8]"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#f56d29] border border-[#e8e4d8]">
                  <Wallet className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#111]">Mi Comisión<br/>Estimada</h3>
              </div>
              <span className="bg-[#f5f3ec] text-[#555] text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded">USD</span>
            </div>
            
            <div className="mt-4 mb-2">
              <span className="text-3xl font-extrabold text-[#111] tracking-tight">
                ${(myTotal * 0.15).toFixed(2)}
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-[#666] font-medium">
                <Clock className="w-3.5 h-3.5 text-[#f56d29]" />
                15% sobre tus compras acumuladas
              </div>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-[#fdfbf7] border border-[#f56d29]/30 text-[#f56d29] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f56d29] animate-pulse"></span>
              {isOver20 ? "Comisión de Embajador Activa" : "Requiere compras > $20"}
            </div>
            
            <Link 
              href="/#productos"
              className="w-full bg-[#f56d29] hover:bg-[#e05819] text-white font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_14px_rgba(250,87,6,0.25)] transition-all flex justify-center items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Comprar Productos
            </Link>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#fdfbf7] rounded-xl p-3 border border-[#e8e4d8]">
                <span className="text-[9px] text-[#888] font-bold uppercase tracking-widest block mb-1">Mis Compras</span>
                <span className="font-extrabold text-[#111]">${myTotal.toFixed(2)}</span>
              </div>
              <div className="bg-[#fdfbf7] rounded-xl p-3 border border-[#e8e4d8]">
                <span className="text-[9px] text-[#888] font-bold uppercase tracking-widest block mb-1">Descuento</span>
                <span className="font-extrabold text-[#25D366]">20% OFF</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Requisitos de Clasificación Oficial (Premios en pausa temporal) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8e4d8]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#fdfbf7] flex items-center justify-center text-[#f56d29] border border-[#e8e4d8]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#111] leading-tight">Requisitos de<br/>Clasificación</h3>
              </div>
              <span className="text-[10px] font-black text-[#f56d29] uppercase tracking-widest">Oficial</span>
            </div>
            
            <div className="flex flex-col gap-2.5 mb-4 text-xs text-[#555]">
              <div className="flex items-start gap-2.5 bg-[#fdfbf7] p-3 rounded-xl border border-[#e8e4d8]">
                <span className="font-black text-[#f56d29] text-xs shrink-0">1.</span>
                <span className="font-medium">Regístrate en Club GAB para activar tu 20% OFF en compras.</span>
              </div>
              <div className="flex items-start gap-2.5 bg-[#fdfbf7] p-3 rounded-xl border border-[#e8e4d8]">
                <span className="font-black text-[#f56d29] text-xs shrink-0">2.</span>
                <span className="font-medium">Acumula más de $20.00 USD para ingresar a la tabla oficial.</span>
              </div>
              <div className="flex items-start gap-2.5 bg-[#fdfbf7] p-3 rounded-xl border border-[#e8e4d8]">
                <span className="font-black text-[#f56d29] text-xs shrink-0">3.</span>
                <span className="font-medium">Cada $1 USD sumado genera 10 puntos para ascender de posición.</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#fdfbf7] p-3 rounded-xl border border-[#e8e4d8]">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#f56d29]" />
                <span className="text-[10px] font-bold text-[#555] uppercase tracking-wider">Mínimo para clasificar:</span>
              </div>
              <span className="font-extrabold text-xs text-[#111]">&gt; $20.00 USD</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Stats inferiores conectadas a Supabase */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8e4d8] flex flex-col">
          <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest mb-1">TOTAL REGISTRADOS (20% OFF)</span>
          <span className="text-3xl font-extrabold text-[#111] mb-2">{clientes.length}</span>
          <span className="text-[10px] font-bold text-[#f56d29] flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Registros activos en Supabase
          </span>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8e4d8] flex flex-col">
          <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest mb-1">CLASIFICADOS EN RANKING (&gt; $20)</span>
          <span className="text-3xl font-extrabold text-[#111] mb-2">{clasificados.length}</span>
          <span className="text-[10px] font-bold text-emerald-600">Embajadores oficiales clasificados</span>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8e4d8] flex flex-col">
          <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest mb-1">VOLUMEN TOTAL ACUMULADO</span>
          <span className="text-3xl font-extrabold text-[#111] mb-2">
            ${clientes.reduce((acc, c) => acc + Number(c.total_comprado || 0), 0).toFixed(2)}
          </span>
          <span className="text-[10px] font-bold text-[#f56d29]">Compras registradas en tiempo real</span>
        </div>
      </motion.div>

    </div>
  );
}
