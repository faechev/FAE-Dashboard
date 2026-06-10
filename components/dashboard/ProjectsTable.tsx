type Estado = "En progreso" | "Finalizado" | "Desarrollo" | "Pendiente";

type Proyecto = {
  nombre: string;
  cliente: string;
  estado: Estado;
};

const estadoStyles: Record<Estado, string> = {
  "En progreso": "bg-yellow-100 text-yellow-700",
  Finalizado: "bg-green-100 text-green-700",
  Desarrollo: "bg-blue-100 text-blue-700",
  Pendiente: "bg-slate-100 text-slate-600",
};

const proyectos: Proyecto[] = [
  { nombre: "Landing Tatuadora", cliente: "María López", estado: "En progreso" },
  { nombre: "Portfolio FAE Stills", cliente: "FAE Stills", estado: "Finalizado" },
  { nombre: "Dashboard Freelancer", cliente: "Interno", estado: "Desarrollo" },
];

export default function ProjectsTable() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Proyectos Activos</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-3 text-sm font-medium text-slate-500">Proyecto</th>
            <th className="text-left py-3 text-sm font-medium text-slate-500">Cliente</th>
            <th className="text-left py-3 text-sm font-medium text-slate-500">Estado</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((p) => (
            <tr key={p.nombre} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-3 font-medium text-slate-800">{p.nombre}</td>
              <td className="py-3 text-slate-500">{p.cliente}</td>
              <td className="py-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${estadoStyles[p.estado]}`}>
                  {p.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}