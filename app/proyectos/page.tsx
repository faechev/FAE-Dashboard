"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { FolderPlus, Pencil, Trash2, X } from "lucide-react";

type Estado = "Pendiente" | "En progreso" | "Finalizado";

type Proyecto = {
  id: string;
  nombre: string;
  cliente: string;
  estado: Estado;
  fecha: string;
};

const estadoStyles: Record<Estado, string> = {
  Pendiente: "bg-slate-100 text-slate-600",
  "En progreso": "bg-yellow-100 text-yellow-700",
  Finalizado: "bg-green-100 text-green-700",
};

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState<Proyecto | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    cliente: "",
    estado: "Pendiente" as Estado,
    fecha: "",
  });

  useEffect(() => {
    const guardados = localStorage.getItem("proyectos");
    if (guardados) setProyectos(JSON.parse(guardados));
  }, []);

  const guardarEnStorage = (lista: Proyecto[]) => {
    localStorage.setItem("proyectos", JSON.stringify(lista));
  };

  const abrirModalNuevo = () => {
    setProyectoEditando(null);
    setForm({ nombre: "", cliente: "", estado: "Pendiente", fecha: "" });
    setModalAbierto(true);
  };

  const abrirModalEditar = (proyecto: Proyecto) => {
    setProyectoEditando(proyecto);
    setForm({
      nombre: proyecto.nombre,
      cliente: proyecto.cliente,
      estado: proyecto.estado,
      fecha: proyecto.fecha,
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProyectoEditando(null);
  };

  const guardarProyecto = () => {
    if (!form.nombre.trim()) return;

    if (proyectoEditando) {
      const actualizada = proyectos.map((p) =>
        p.id === proyectoEditando.id ? { ...p, ...form } : p
      );
      setProyectos(actualizada);
      guardarEnStorage(actualizada);
    } else {
      const nuevo: Proyecto = {
        id: Date.now().toString(),
        ...form,
      };
      const actualizada = [...proyectos, nuevo];
      setProyectos(actualizada);
      guardarEnStorage(actualizada);
    }

    cerrarModal();
  };

  const eliminarProyecto = (id: string) => {
    const actualizada = proyectos.filter((p) => p.id !== id);
    setProyectos(actualizada);
    guardarEnStorage(actualizada);
  };

  return (
    <main className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <section className="flex-1">
        <Header />

        <div className="p-8">
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Proyectos</h2>
              <p className="text-slate-400 text-sm mt-1">
                {proyectos.length} proyecto{proyectos.length !== 1 ? "s" : ""} registrado{proyectos.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={abrirModalNuevo}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <FolderPlus size={16} />
              Nuevo proyecto
            </button>
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            {proyectos.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-medium">No hay proyectos todavía</p>
                <p className="text-sm mt-1">Hacé clic en "Nuevo proyecto" para agregar uno</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Proyecto</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Cliente</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Estado</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Fecha</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((proyecto) => (
                    <tr key={proyecto.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-800">{proyecto.nombre}</td>
                      <td className="py-4 px-6 text-slate-500">{proyecto.cliente}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${estadoStyles[proyecto.estado]}`}>
                          {proyecto.estado}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">{proyecto.fecha}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => abrirModalEditar(proyecto)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => eliminarProyecto(proyecto.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
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
              <h3 className="text-lg font-bold text-slate-800">
                {proyectoEditando ? "Editar proyecto" : "Nuevo proyecto"}
              </h3>
              <button onClick={cerrarModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Nombre *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: Landing Tatuadora"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Cliente</label>
                <input
                  type="text"
                  value={form.cliente}
                  onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: María López"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Estado</label>
                <select
                  value={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.value as Estado })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Pendiente</option>
                  <option>En progreso</option>
                  <option>Finalizado</option>
                </select>
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
                onClick={cerrarModal}
                className="flex-1 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarProyecto}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {proyectoEditando ? "Guardar cambios" : "Crear proyecto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}