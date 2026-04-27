// overview dashboard — KPI cards, charts, recent invoices

import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { CheckCircle, CreditCard, AlertCircle, FileText, ChevronRight } from "lucide-react";

import { INVOICES, getKPIs, getMonthlyRevenue, getStatusDistribution, getTopClients } from "../data/invoices.js";
import { formatEur, formatEurShort } from "../utils.js";
import { KPICard, StatusBadge, ChartTooltip, Panel } from "./UI.jsx";

export default function Overview({ onViewAll, onSelectInvoice }) {
  const kpis       = getKPIs();
  const monthly    = getMonthlyRevenue();
  const pieData    = getStatusDistribution();
  const clientData = getTopClients();

  const eurAxis = (v) => `€${(v / 1000).toFixed(0)}k`;

  return (
    <div>
      {/* kpi row */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <KPICard
          icon={CheckCircle} color="#10b981"
          label="Revenue Collected"
          value={formatEurShort(kpis.totalRevenue)}
          sub={`${kpis.paidCount} invoices settled`}
          trend="+12.4%"
        />
        <KPICard
          icon={CreditCard} color="#f59e0b"
          label="Pending Payments"
          value={formatEurShort(kpis.pendingAmount)}
          sub={`${kpis.pendingCount} invoices pending`}
        />
        <KPICard
          icon={AlertCircle} color="#ef4444"
          label="Overdue Balance"
          value={formatEurShort(kpis.overdueAmount)}
          sub={`${kpis.overdueCount} invoices overdue`}
        />
        <KPICard
          icon={FileText} color="#3b82f6"
          label="Total Invoiced"
          value={formatEurShort(kpis.totalInvoiced)}
          sub={`${kpis.totalCount} invoices total`}
        />
      </div>

      {/* revenue line + status pie */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel title="Monthly Revenue" subtitle="Payments collected · Nov 2025 – Apr 2026">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5}
                dot={{ fill: "#2563eb", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#2563eb" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Invoice Status" subtitle="Distribution by count">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData} cx="50%" cy="50%"
                innerRadius={48} outerRadius={72}
                paddingAngle={3} dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 6 }}>
            {pieData.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
                <span style={{ fontSize: 11, color: "#64748b" }}>{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* top clients bar chart */}
      <Panel
        title="Top Clients by Invoice Volume"
        subtitle="Cumulative invoice value across all statuses"
        style={{ marginBottom: 14 }}
      >
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={clientData} barSize={26}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={eurAxis} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="total" name="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      {/* recent invoices list */}
      <Panel title="Recent Invoices" subtitle="Latest 5 transactions">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <button
            onClick={onViewAll}
            style={{
              fontSize: 12, color: "#2563eb", background: "none",
              border: "none", cursor: "pointer", fontWeight: 500,
              display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}
          >
            View all invoices <ChevronRight size={13} />
          </button>
        </div>

        {INVOICES.slice(0, 5).map((inv, i) => (
          <div
            key={inv.id}
            onClick={() => onSelectInvoice(inv)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 0",
              borderTop: i > 0 ? "1px solid #f1f5f9" : "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: "#eff6ff",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <FileText size={15} color="#3b82f6" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 500, color: "#0f172a", fontSize: 13 }}>{inv.client.name}</p>
              <p style={{ color: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}>{inv.id}</p>
            </div>
            <StatusBadge status={inv.status} />
            <p style={{ fontWeight: 600, color: "#0f172a", fontSize: 13, minWidth: 88, textAlign: "right" }}>
              {formatEur(inv.amount)}
            </p>
          </div>
        ))}
      </Panel>
    </div>
  );
}
