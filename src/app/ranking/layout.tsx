"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Trophy, 
  ShoppingBag, 
  LogOut,
  ArrowLeft
} from "lucide-react";
import { useUser } from "@/store/user";

export default function RankingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, name: userName, totalComprado, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { name: "Ranking", icon: Trophy, path: "/ranking" },
    { name: "Tienda / Productos", icon: ShoppingBag, path: "/#productos" },
  ];

  const hasPurchasedOver20 = totalComprado > 20;

  return (
    <div className="flex h-screen w-full bg-[#f4f2ec] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#fdfbf7] border-r border-[#e8e4d8] flex flex-col justify-between hidden md:flex shrink-0 h-full">
        <div>
          {/* Logo */}
          <div className="p-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl overflow-hidden border border-[#e8e4d8] shadow-sm group-hover:scale-105 transition-transform bg-[#f56d29] shrink-0">
                <img
                  src="/images/logo-icon-square.jpg"
                  alt="GAB Chips"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#111] text-lg leading-tight">Club GAB</span>
                <span className="text-[9px] font-bold tracking-widest text-[#f56d29] uppercase">Embajadores & Ranking</span>
              </div>
            </Link>
          </div>

          {/* Active Season */}
          <div className="px-6 mb-8">
            <div className="flex items-center justify-between bg-[#f5f3ec] rounded-full px-4 py-2 border border-[#e8e4d8]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f56d29] animate-pulse"></div>
                <span className="text-[10px] font-bold text-[#555] uppercase tracking-wider">Temporada Activa</span>
              </div>
              <span className="text-xs font-black text-[#111]">2025</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive 
                      ? "bg-[#f56d29] text-white shadow-md shadow-orange-500/20" 
                      : "text-[#555] hover:bg-[#f5f3ec] hover:text-[#111]"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Progress & Logout */}
        <div className="p-6">
          <div className="bg-white border border-[#e8e4d8] rounded-2xl p-4 mb-4 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-[#f56d29] uppercase tracking-widest">
                {hasPurchasedOver20 ? "Clasificado" : isLoggedIn ? "20% OFF Activo" : "Visitante"}
              </span>
              <span className="text-sm font-extrabold text-[#111]">
                ${totalComprado.toFixed(2)} USD
              </span>
            </div>
            <div className="w-full bg-[#f5f3ec] h-2 rounded-full mb-2 overflow-hidden border border-[#e8e4d8]">
              <div 
                className="bg-[#f56d29] h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, Math.max(10, (totalComprado / 20) * 100))}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-[#888] font-bold block">
              {hasPurchasedOver20 
                ? "¡Clasificado Oficialmente en el Top!" 
                : isLoggedIn 
                  ? `Faltan $${Math.max(0, 20.01 - totalComprado).toFixed(2)} para clasificar (> $20)`
                  : "Inicia sesión para participar"}
            </span>
          </div>
          
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="flex items-center justify-between w-full px-4 py-3 text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-200"
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </div>
              <span className="text-[10px] text-[#888]">{userName.split(' ')[0]}</span>
            </button>
          ) : (
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs font-bold bg-[#f56d29] text-white hover:bg-[#e05819] rounded-xl transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a la Tienda
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 sm:h-20 bg-[#f4f2ec] border-b border-[#e8e4d8] flex items-center justify-between px-3.5 sm:px-6 md:px-8 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 group md:hidden shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-[#e8e4d8] shadow-sm bg-[#f56d29]">
                <img
                  src="/images/logo-icon-square.jpg"
                  alt="GAB Chips"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#555] hover:text-[#111] bg-white border border-[#e8e4d8] px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm md:hidden shrink-0"
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Tienda
            </Link>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#111] hidden sm:inline">
              Panel Oficial de Clasificación
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3 bg-white pl-3 sm:pl-4 pr-1.5 py-1 sm:py-1.5 rounded-full shadow-sm border border-[#e8e4d8]">
                <div className="flex flex-col items-end min-w-0">
                  <span className="text-[11px] sm:text-xs font-black text-[#111] truncate max-w-[85px] sm:max-w-none">{userName}</span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-[#f56d29] uppercase tracking-wider truncate max-w-[85px] sm:max-w-none">
                    {hasPurchasedOver20 ? "Clasificado" : "20% OFF"}
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#111] rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-xs uppercase shadow-sm shrink-0">
                  {userName.charAt(0)}
                </div>
              </div>
            ) : (
              <Link 
                href="/"
                className="bg-[#f56d29] hover:bg-[#e05819] text-white font-bold text-[10px] sm:text-xs px-3 sm:px-4 py-2 rounded-full transition-all shadow-sm"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pb-12 pt-4">
          {children}
        </main>
      </div>
    </div>
  );
}
