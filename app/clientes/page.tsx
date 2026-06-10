"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { UserPlus, Pencil, Trash2, X } from "lucide-react";

type Cliente = {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  // Cargar desde LocalStorage
  useEffect(() => {
    const guardados = localStorage.getItem("clientes");
    if (guardados) setClientes(JSON.parse(guardados));
  }, []);

  // Guardar en LocalStorage
  const guardarEnStorage = (lista: Cliente[]) => {
    localStorage.setItem("clientes", JSON.stringify(lista));
  };

  const abrirModalNuevo = () => {
    setClienteEditando(null);
    setForm({ nombre: "", empresa: "", email: "", telefono: "" });
    setModalAbierto(true);
  };

  const abrirModalEditar = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setForm({
      nombre: cliente.nombre,
      empresa: cliente.empresa,
      email: cliente.email,
      telefono: cliente.telefono,
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setClienteEditando(null);
  };

  const guardarCliente = () => {
    if (!form.nombre.trim()) return;

    if (clienteEditando) {
      // Editar
      const actualizada = clientes.map((c) =>
        c.id === clienteEditando.id ? { ...c, ...form } : c
      );
      setClientes(actualizada);
      guardarEnStorage(actualizada);
    } else {
      // Crear
      const nuevo: Cliente = {
        id: Date.now().toString(),
        ...form,
      };
      const actualizada = [...clientes, nuevo];
      setClientes(actualizada);
      guardarEnStorage(actualizada);
    }

    cerrarModal();
  };

  const eliminarCliente = (id: string) => {
    const actualizada = clientes.filter((c) => c.id !== id);
    setClientes(actualizada);
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
              <h2 className="text-2xl font-bold text-slate-800">Clientes</h2>
              <p className="text-slate-400 text-sm mt-1">
                {clientes.length} cliente{clientes.length !== 1 ? "s" : ""} registrado{clientes.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={abrirModalNuevo}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <UserPlus size={16} />
              Nuevo cliente
            </button>
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            {clientes.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-medium">No hay clientes todavía</p>
                <p className="text-sm mt-1">Hacé clic en "Nuevo cliente" para agregar uno</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Nombre</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Empresa</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Teléfono</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-800">{cliente.nombre}</td>
                      <td className="py-4 px-6 text-slate-500">{cliente.empresa}</td>
                      <td className="py-4 px-6 text-slate-500">{cliente.email}</td>
                      <td className="py-4 px-6 text-slate-500">{cliente.telefono}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => abrirModalEditar(cliente)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => eliminarCliente(cliente.id)}
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
                {clienteEditando ? "Editar cliente" : "Nuevo cliente"}
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
                  placeholder="Ej: María López"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Empresa</label>
                <input
                  type="text"
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: FAE Stills"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: maria@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Teléfono</label>
                <input
                  type="text"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: +54 9 11 1234 5678"
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
                onClick={guardarCliente}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {clienteEditando ? "Guardar cambios" : "Crear cliente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}