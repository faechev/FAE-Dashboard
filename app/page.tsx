import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatsCard from "../components/dashboard/StatsCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import ProjectsTable from "../components/dashboard/ProjectsTable";

export default function Home() {
  return (
    <main className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <section className="flex-1">
        <Header />

        <div className="p-8">

          {/* Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Ingresos del mes"
              value="2.450"
              prefix="$"
              change={18}
            />
            <StatsCard
              title="Clientes activos"
              value="12"
              change={8}
            />
            <StatsCard
              title="Proyectos activos"
              value="8"
              change={-5}
            />
          </div>

          {/* Gráfico */}
          <RevenueChart />

          {/* Tabla */}
          <ProjectsTable />

        </div>
      </section>
    </main>
  );
}