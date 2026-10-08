"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Trophy } from "lucide-react";
import { useCart } from "@/store/cart";
import { useUser } from "@/store/user";
import { supabase } from "@/lib/supabase";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Productos", href: "/#productos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<"quick" | "register">("quick");
  const [quickUsername, setQuickUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  
  const { isLoggedIn, name: userName, email: userEmail, login, setTotalComprado } = useUser();
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCart((s) => s.open);
  const pathname = usePathname();
  const isLightPage = pathname === '/checkout' || pathname === '/success';

  useEffect(() => {
    // Mantener transparente mientras estemos en la parte superior (Hero)
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mantener la sesión sincronizada con Supabase para usuarios ya registrados
  useEffect(() => {
    if (isLoggedIn && (userName || userEmail)) {
      const syncSession = async () => {
        try {
          let query = supabase.from('clientes').select('*');
          if (userEmail) {
            query = query.eq('correo', userEmail.toLowerCase());
          } else {
            query = query.ilike('nombre', userName);
          }
          const { data } = await query.maybeSingle();
          if (data && data.total_comprado !== undefined) {
            setTotalComprado(Number(data.total_comprado || 0));
          }
        } catch {
          // Fallback silencioso
        }
      };
      syncSession();
    }
  }, [isLoggedIn, userName, userEmail, setTotalComprado]);

  // Ingreso Rápido con solo Nombre de Usuario (para usuarios ya registrados)
  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = quickUsername.trim();
    if (!cleanUser) return;
    setLoadingAuth(true);
    setAuthMsg("");

    try {
      const { data: clients, error } = await supabase
        .from('clientes')
        .select('*')
        .or(`nombre.ilike.%${cleanUser}%,correo.ilike.%${cleanUser}%`)
        .order('total_comprado', { ascending: false })
        .limit(1);

      if (clients && clients.length > 0) {
        const client = clients[0];
        login(client.nombre || cleanUser, client.correo || "", Number(client.total_comprado || 0));
        setShowLogin(false);
        setLoadingAuth(false);
        router.push('/ranking');
      } else {
        setAuthMsg(`No encontramos a ningún usuario registrado como "${cleanUser}". Si aún no te has registrado, usa la opción "Nuevo (20% OFF)".`);
        setLoadingAuth(false);
      }
    } catch (err: any) {
      console.error("Error al buscar usuario:", err);
      login(cleanUser, "", 0);
      setShowLogin(false);
      setLoadingAuth(false);
      router.push('/ranking');
    }
  };

  // Registro de nuevo usuario (20% OFF)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAuth(true);
    setAuthMsg("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    try {
      const { data: existingClient } = await supabase
        .from('clientes')
        .select('*')
        .eq('correo', cleanEmail)
        .maybeSingle();

      let clientTotal = 0;
      let finalName = cleanName;

      if (existingClient) {
        clientTotal = Number(existingClient.total_comprado || 0);
        if (existingClient.nombre) {
          finalName = existingClient.nombre;
        }
      } else {
        const { error: insertError } = await supabase
          .from('clientes')
          .insert([{ 
            nombre: cleanName, 
            correo: cleanEmail, 
            total_comprado: 0 
          }]);

        if (insertError) {
          console.error("Error al registrar cliente en Supabase:", insertError);
        }
      }

      login(finalName, cleanEmail, clientTotal);
      setShowLogin(false);
      setLoadingAuth(false);
      router.push('/ranking');
    } catch (err: any) {
      console.error("Error en flujo de registro:", err);
      login(cleanName, cleanEmail, 0);
      setShowLogin(false);
      setLoadingAuth(false);
      router.push('/ranking');
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/5 shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2.5 md:gap-3 group"
        >
          <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-2xl overflow-hidden border border-white/20 hover:border-white/50 shadow-md group-hover:scale-105 transition-all bg-[#e05819] shrink-0">
            <img
              src="/images/logo-icon-square.jpg"
              alt="GAB Chips"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-black text-lg md:text-xl leading-none uppercase tracking-tight transition-colors ${
              isLightPage && !scrolled ? "text-[#111]" : "text-white drop-shadow-sm"
            }`}>
              GAB <span className="text-[#f56d29]">Chips</span>
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${
              isLightPage && !scrolled ? "text-[#666]" : "text-white/80"
            }`}>
              Snacks Artesanales
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-[13px] font-black uppercase tracking-wider transition-colors ${
                isLightPage && !scrolled
                  ? "text-black hover:text-[#f56d29]"
                  : scrolled 
                    ? "text-white/90 hover:text-[#f56d29]" 
                    : "text-white hover:text-white/80 drop-shadow-md"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Botón de Iniciar Sesión (Promocional) */}
          {isLoggedIn ? (
            <Link 
              href="/ranking"
              className="flex items-center gap-1.5 sm:gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] px-2.5 sm:px-4 py-2 md:py-2.5 rounded-full font-bold transition-all shrink-0"
            >
              <Trophy className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
                Hola, {userName.split(' ')[0]} <span className="hidden md:inline">(Ver Mi Ranking)</span>
              </span>
            </Link>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-2.5 sm:px-4 py-2 md:py-2.5 rounded-full font-bold transition-all shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 shrink-0"
            >
              <div className="bg-white/20 p-1 rounded-full hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
                Inicia sesión <span className="hidden sm:inline">por 20% OFF</span>
              </span>
            </button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className={`relative grid h-10 w-10 place-items-center rounded-xl transition-colors shrink-0 ${
              scrolled ? "bg-[#f56d29] text-[#111] hover:bg-white" : "bg-[#111] text-white hover:bg-[#f56d29]"
            }`}
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-4 w-4" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0, y: -6 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className={`absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-black ${
                    scrolled ? "bg-white text-[#111]" : "bg-[#f56d29] text-[#111]"
                  }`}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            type="button"
            className={`md:hidden grid h-10 w-10 place-items-center rounded-xl transition-colors shrink-0 ${
              scrolled ? "bg-white/10 text-white" : "bg-[#111] text-white hover:bg-black"
            }`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-[#0a0a0a]/98 backdrop-blur-2xl text-white shadow-2xl"
          >
            <nav className="flex flex-col p-5 gap-2">
              {navItems.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-black text-sm uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{n.label}</span>
                  <span className="text-[#f56d29] text-xs">→</span>
                </Link>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/ranking"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-black text-sm uppercase tracking-wider bg-white/10 hover:bg-[#f56d29] transition-colors flex items-center gap-2.5 text-white"
                >
                  <Trophy className="w-4 h-4 text-[#f56d29]" />
                  <span>Ranking de Embajadores</span>
                </Link>

                {!isLoggedIn && (
                  <button
                    onClick={() => { setMenuOpen(false); setShowLogin(true); }}
                    className="w-full text-center rounded-xl px-4 py-3 font-black text-xs uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#1ebd5a] transition-colors shadow-md"
                  >
                    Activar 20% OFF / Iniciar Sesión
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-[#111] border border-[#e8e4d8] max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => { setShowLogin(false); setAuthMsg(""); }} 
                className="absolute top-4 right-4 text-gray-400 hover:text-black p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#e05819] shadow-sm">
                  <img src="/images/logo-icon-square.jpg" alt="GAB Chips" className="w-full h-full object-cover" />
                </div>
                <span className="font-black text-lg text-[#111] uppercase tracking-tight">
                  Club <span className="text-[#f56d29]">GAB</span>
                </span>
              </div>

              {/* Selector de Modo: Ingreso Rápido vs Nuevo Registro */}
              <div className="flex rounded-xl bg-gray-100 p-1 mb-5 border border-gray-200">
                <button
                  type="button"
                  onClick={() => { setLoginMode("quick"); setAuthMsg(""); }}
                  className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                    loginMode === "quick" 
                      ? "bg-white text-[#111] shadow-sm" 
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  Ya Registrado
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginMode("register"); setAuthMsg(""); }}
                  className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                    loginMode === "register" 
                      ? "bg-[#f56d29] text-white shadow-sm" 
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  Nuevo (20% OFF)
                </button>
              </div>

              {loginMode === "quick" ? (
                <>
                  <h3 className="text-xl font-black text-center mb-1">Ingreso al Ranking</h3>
                  <p className="text-xs text-gray-500 text-center mb-5">
                    ¿Ya estás registrado? Ingresa con tu <strong>nombre de usuario</strong> para acceder de inmediato a tu sesión y posición.
                  </p>
                  
                  <form onSubmit={handleQuickLogin} className="flex flex-col gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Nombre de Usuario Registrado
                      </label>
                      <input 
                        type="text" 
                        required
                        autoFocus
                        placeholder="Ej: Juan Pérez"
                        value={quickUsername}
                        onChange={(e) => setQuickUsername(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold outline-none focus:border-[#f56d29] focus:ring-2 focus:ring-[#f56d29]/20"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loadingAuth}
                      className="w-full bg-[#111] hover:bg-[#f56d29] text-white font-black uppercase tracking-wider py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-md text-xs mt-1"
                    >
                      {loadingAuth ? "Verificando..." : "Ingresar a mi Cuenta"}
                    </button>
                    {authMsg && <p className="text-xs text-center font-bold text-red-500 mt-1">{authMsg}</p>}
                  </form>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-black text-center mb-1">Nuevo Registro</h3>
                  <p className="text-xs text-gray-500 text-center mb-5">
                    Activa tu <strong>20% OFF</strong> en toda la tienda y clasifica en el Ranking Oficial del Programa de Embajadores.
                  </p>
                  
                  <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Nombre y Apellido
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Tu Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#f56d29] focus:ring-2 focus:ring-[#f56d29]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Correo Electrónico
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#f56d29] focus:ring-2 focus:ring-[#f56d29]/20"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loadingAuth}
                      className="w-full bg-[#f56d29] hover:bg-[#e05819] text-white font-black uppercase tracking-wider py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-md text-xs mt-1"
                    >
                      {loadingAuth ? "Registrando..." : "Activar 20% OFF y Guardar"}
                    </button>
                    {authMsg && <p className="text-xs text-center font-bold text-red-500 mt-1">{authMsg}</p>}
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
