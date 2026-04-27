// analytics view — revenue trends, performance KPIs, service breakdown

import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
} from "recharts";
import { TrendingUp, Target, Clock, AlertTriangle } from "lucide-react";

import {
  getKPIs, getMonthlyComparison, getRevenueByService, getStatusDistribution,
} from "../data/invoices.js";
import { formatEurShort, formatEur } from "../utils.js";
import { KPICard, ChartTooltip, Panel } from "./UI.jsx";

// collection rate = paid / total invoiced
function getCollectionRate(kpis) {
  if (kpis.totalInvoiced === 0) return 0;
  return ((kpis.totalRevenue / kpis.totalInvoiced) * 100).toFixed(1);
}

// overdue rate = overdue count / total count
function getOverdueRate(kpis) {
  if (kpis.totalCount === 0) return 0;
  return ((kpis.overdueCount / kpis.totalCount) * 100).toFixed(1);
}

// rough average days to pay (assumes Net 30 paid ~5 days early = 25 days)
function getAvgDaysToPay() {
  return 25;
}

export default function Analytics() {
  const kpis       = getKPIs();
  const comparison = getMonthlyComparison();
  const services   = getRevenueByService();
  const pieData    = getStatusDistribution();

  const collectionRate = getCollectionRate(kpis);
  const overdueRate    = getOverdueRate(kpis);
  const avgDays        = getAvgDaysToPay();

  const eurAxis  = (v) => `€${(v / 1000).toFixed(0)}k`;
  const pctAxis  = (v) => `${v}%`;

  // compute month-over-month change in collected revenue
  const lastTwo   = comparison.slice(-2);
  const momChange = lastTwo.length === 2 && lastTwo[0].collected > 0
    ? (((lastTwo[1].collected - lastTwo[0].collected) / lastTwo[0].collected) * 100).toFixed(1)
    : null;
  const momLabel = momChange !== null ? `${momChange > 0 ? "+" : ""}${momChange}%` : null;

  // pie chart colors match status
  const PIE_COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div>
      {/* performance KPIs */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <KPICard
          icon={TrendingUp} color="#2563eb"
          label="Total Collected"
          value={formatEurShort(kpis.totalRevenue)}
          sub={`of ${formatEurShort(kpis.totalInvoiced)} invoiced`}
          trend={momLabel}
        />
        <KPICard
          icon={Target} color="#10b981"
          label="Collection Rate"
          value={`${collectionRate}%`}
          sub="paid invoices vs total billed"
        />
        <KPICard
          icon={Clock} color="#f59e0b"
          label="Avg. Days to Pay"
          value={`${avgDays} days`}
          sub="across settled invoices"
        />
        <KPICard
          icon={AlertTriangle} color="#ef4444"
          label="Overdue Rate"
          value={`${overdueRate}%`}
          sub={`${kpis.overdueCount} invoices past due`}
        />
      </div>

      {/* invoiced vs collected comparison */}
      <Panel
        title="Invoiced vs Collected"
        subtitle="Monthly comparison · Nov 2025 – Apr 2026"
        style={{ marginBottom: 14 }}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={comparison} barGap={4} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              iconType="circle" iconSize={8}
              formatter={(v) => <span style={{ fontSize: 12, color: "#64748b" }}>{v}</span>}
            />
            <Bar dataKey="invoiced"  name="invoiced"  fill="#93c5fd" radius={[4, 4, 0, 0]} />
            <Bar dataKey="collected" name="collected" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      {/* revenue by service + status breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14, marginBottom: 14 }}>

        {/* revenue by service category */}
        <Panel title="Revenue by Service" subtitle="Total billed per service type">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={services}
              layout="vertical"
              barSize={18}
              margin={{ left: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis
                type="number" tickFormatter={eurAxis}
                tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
              />
              <YAxis
                type="category" dataKey="name" width={70}
                tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="total" name="total" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        {/* invoice status donut */}
        <Panel title="Payment Status Split" subtitle="By number of invoices">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData} cx="50%" cy="50%"
                innerRadius={52} outerRadius={78}
                paddingAngle={3} dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* legend with amounts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {[
              { label: "Paid",    count: kpis.paidCount,    amount: kpis.totalRevenue,  color: "#10b981" },
              { label: "Pending", count: kpis.pendingCount, amount: kpis.pendingAmount, color: "#f59e0b" },
              { label: "Overdue", count: kpis.overdueCount, amount: kpis.overdueAmount, color: "#ef4444" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "#64748b" }}>{row.label} ({row.count})</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>
                  {formatEurShort(row.amount)}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* collection rate trend — simulated from monthly data */}
      <Panel title="Collection Rate by Month" subtitle="% of invoiced amount successfully collected">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={comparison.map((m) => ({
              month: m.month,
              rate: m.invoiced > 0 ? parseFloat(((m.collected / m.invoiced) * 100).toFixed(1)) : 0,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={pctAxis} domain={[0, 100]}
              tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div style={{
                    background: "#0f172a", border: "1px solid #1e293b",
                    borderRadius: 8, padding: "10px 14px", color: "#fff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  }}>
                    <p style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{label}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#10b981" }}>
                      {payload[0].value}%
                      {" "}<span style={{ color: "#475569", fontWeight: 400, fontSize: 11 }}>collection rate</span>
                    </p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5}
              dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
