"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  DollarSign,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Proyectos", href: "/proyectos", icon: FolderKanban },
  { label: "Finanzas", href: "/finanzas", icon: DollarSign },
  { label: "Configuración", href: "/configuracion", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col p-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-xl font-bold tracking-tight">FAE Dashboard</h1>
        <p className="text-slate-400 text-xs mt-1">Panel de gestión</p>
      </div>

      {/* Nav */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const activo = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    activo
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 pt-4 mt-4">
        <p className="text-slate-500 text-xs">v1.0.0 · FAE Dashboard</p>
      </div>
    </aside>
  );
}