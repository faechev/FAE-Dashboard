"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign, X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Tipo = "ingreso" | "gasto";

type Transaccion = {
  id: string;
  descripcion: string;
  monto: number;
  tipo: Tipo;
  categoria: string;
  fecha: string;
};

const transaccionesIniciales: Transaccion[] = [
  { id: "1", descripcion: "Landing Tatuadora", monto: 800, tipo: "ingreso", categoria: "Proyecto web", fecha: "2026-06-01" },
  { id: "2", descripcion: "Portfolio FAE Stills", monto: 1200, tipo: "ingreso", categoria: "Proyecto web", fecha: "2026-06-05" },
  { id: "3", descripcion: "Dominio anual", monto: 150, tipo: "gasto", categoria: "Herramientas", fecha: "2026-06-03" },
  { id: "4", descripcion: "Suscripción Figma", monto: 180, tipo: "gasto", categoria: "Herramientas", fecha: "2026-06-10" },
  { id: "5", descripcion: "Dashboard Freelancer", monto: 950, tipo: "ingreso", categoria: "Proyecto web", fecha: "2026-06-15" },
];

const datosGrafico = [
  { mes: "Ene", ingresos: 400, gastos: 120 },
  { mes: "Feb", ingresos: 800, gastos: 200 },
  { mes: "Mar", ingresos: 1200, gastos: 350 },
  { mes: "Abr", ingresos: 950, gastos: 280 },
  { mes: "May", ingresos: 1800, gastos: 420 },
  { mes: "Jun", ingresos: 2450, gastos: 330 },
];

export default function FinanzasPage() {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    tipo: "ingreso" as Tipo,
    categoria: "",
    fecha: "",
  });

  useEffect(() => {
    const guardadas = localStorage.getItem("transacciones");
    if (guardadas) {
      setTransacciones(JSON.parse(guardadas));
    } else {
      setTransacciones(transaccionesIniciales);
      localStorage.setItem("transacciones", JSON.stringify(transaccionesIniciales));
    }
  }, []);

  const guardarEnStorage = (lista: Transaccion[]) => {
    localStorage.setItem("transacciones", JSON.stringify(lista));
  };

  const totalIngresos = transacciones
    .filter((t) => t.tipo === "ingreso")
    .reduce((acc, t) => acc + t.monto, 0);

  const totalGastos = transacciones
    .filter((t) => t.tipo === "gasto")
    .reduce((acc, t) => acc + t.monto, 0);

  const balance = totalIngresos - totalGastos;

  const guardarTransaccion = () => {
    if (!form.descripcion.trim() || !form.monto) return;

    const nueva: Transaccion = {
      id: Date.now().toString(),
      descripcion: form.descripcion,
      monto: parseFloat(form.monto),
      tipo: form.tipo,
      categoria: form.categoria,
      fecha: form.fecha,
    };

    const actualizada = [...transacciones, nueva];
    setTransacciones(actualizada);
    guardarEnStorage(actualizada);
    setModalAbierto(false);
    setForm({ descripcion: "", monto: "", tipo: "ingreso", categoria: "", fecha: "" });
  };

  const eliminarTransaccion = (id: string) => {
    const actualizada = transacciones.filter((t) => t.id !== id);
    setTransacciones(actualizada);
    guardarEnStorage(actualizada);
  };

  return (
    <main className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <section className="flex-1">
        <Header />

        <div className="p-8">

          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <p className="text-slate-500 text-sm font-medium">Total ingresos</p>
              <p className="text-3xl font-bold mt-2 text-slate-800">${totalIngresos.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-3 text-sm font-medium text-emerald-600">
                <TrendingUp size={15} />
                <span>Este mes</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <p className="text-slate-500 text-sm font-medium">Total gastos</p>
              <p className="text-3xl font-bold mt-2 text-slate-800">${totalGastos.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-3 text-sm font-medium text-red-500">
                <TrendingDown size={15} />
                <span>Este mes</span>
              </div>
            </div>

            <div className={`rounded-xl shadow-sm border p-6 ${balance >= 0 ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"}`}>
              <p className="text-slate-500 text-sm font-medium">Balance</p>
              <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                ${balance.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-3 text-sm font-medium text-slate-500">
                <DollarSign size={15} />
                <span>Ingresos - Gastos</span>
              </div>
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Ingresos vs Gastos</h2>
            <p className="text-slate-400 text-sm mb-6">Comparativa mensual</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={datosGrafico} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fontSize: 13, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 13, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value) => [`$${value}`, ""]} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                <Legend />
                <Bar dataKey="ingresos" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gastos" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla de transacciones */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Transacciones</h2>
                <p className="text-slate-400 text-sm mt-1">{transacciones.length} registradas</p>
              </div>
              <button
                onClick={() => setModalAbierto(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Nueva transacción
              </button>
            </div>

            {transacciones.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p>No hay transacciones todavía</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Descripción</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Categoría</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Fecha</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Monto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {transacciones.map((t) => (
                    <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-800">{t.descripcion}</td>
                      <td className="py-3 px-4 text-slate-500">{t.categoria}</td>
                      <td className="py-3 px-4 text-slate-500">{t.fecha}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${t.tipo === "ingreso" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                          {t.tipo === "ingreso" ? "Ingreso" : "Gasto"}
                        </span>
                      </td>
                      <td className={`py-3 px-4 font-bold ${t.tipo === "ingreso" ? "text-emerald-600" : "text-red-500"}`}>
                        {t.tipo === "ingreso" ? "+" : "-"}${t.monto.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => eliminarTransaccion(t.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Nueva transacción</h3>
              <button onClick={() => setModalAbierto(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Descripción *</label>
                <input
                  type="text"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: Landing page cliente"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Monto *</label>
                <input
                  type="number"
                  value={form.monto}
                  onChange={(e) => setForm({ ...form, monto: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: 500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Tipo</label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value as Tipo })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Categoría</label>
                <input
                  type="text"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: Proyecto web, Herramientas"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Fecha</label>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalAbierto(false)}
                className="flex-1 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarTransaccion}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}