"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "Ene", ingresos: 400 },
  { mes: "Feb", ingresos: 800 },
  { mes: "Mar", ingresos: 1200 },
  { mes: "Abr", ingresos: 950 },
  { mes: "May", ingresos: 1800 },
  { mes: "Jun", ingresos: 2450 },
];

export default function RevenueChart() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Ingresos del año</h2>
        <p className="text-slate-400 text-sm mt-1">Evolución mensual de ingresos</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 13, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 13, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Ingresos"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="ingresos"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ fill: "#6366f1", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}