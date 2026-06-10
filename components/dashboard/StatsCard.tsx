import { TrendingUp, TrendingDown } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  change?: number; // ej: 18 = +18%, -5 = -5%
  prefix?: string; // ej: "$"
};

export default function StatsCard({
  title,
  value,
  change,
  prefix = "",
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
      <p className="text-slate-500 text-sm font-medium">{title}</p>

      <p className="text-3xl font-bold mt-2 text-slate-800">
        {prefix}{value}
      </p>

      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
          {isPositive ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
          <span>{isPositive ? "+" : ""}{change}% este mes</span>
        </div>
      )}
    </div>
  );
}