"use client";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { User, Lock, Bell, Palette } from "lucide-react";

export default function ConfiguracionPage() {
  return (
    <main className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <section className="flex-1">
        <Header />

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Configuración</h2>
            <p className="text-slate-400 text-sm mt-1">Administrá tu cuenta y preferencias</p>
          </div>

          <div className="grid grid-cols-1 gap-6">

            {/* Perfil */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <User size={18} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Perfil</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Nombre</label>
                  <input
                    type="text"
                    defaultValue="Florencia"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="flor@faedashboard.com"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Profesión</label>
                  <input
                    type="text"
                    defaultValue="Desarrolladora Web Freelance"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Ubicación</label>
                  <input
                    type="text"
                    defaultValue="Argentina"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Guardar cambios
              </button>
            </div>

            {/* Seguridad */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Lock size={18} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Seguridad</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Contraseña actual</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Nueva contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Cambiar contraseña
              </button>
            </div>

            {/* Notificaciones */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Bell size={18} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Notificaciones</h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Nuevos clientes", desc: "Recibir notificación cuando se agregue un cliente" },
                  { label: "Proyectos finalizados", desc: "Recibir notificación cuando un proyecto cambie a finalizado" },
                  { label: "Resumen mensual", desc: "Recibir resumen de ingresos al fin de cada mes" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Apariencia */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Palette size={18} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Apariencia</h3>
              </div>

              <p className="text-sm text-slate-500 mb-4">Tema del dashboard</p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-indigo-600 text-sm font-medium text-indigo-600">
                  ☀️ Claro
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-slate-200 text-sm font-medium text-slate-500 hover:border-slate-300 transition-colors">
                  🌙 Oscuro
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}