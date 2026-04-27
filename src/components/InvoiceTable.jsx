// invoice list with search, status filter, and sortable columns

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronRight, FileText, Building2, Calendar, Clock } from "lucide-react";
import { INVOICES } from "../data/invoices.js";
import { formatEur } from "../utils.js";
import { StatusBadge } from "./UI.jsx";

const COLUMNS = [
  { key: "id",        label: "Invoice ID" },
  { key: "client",    label: "Client"     },
  { key: "issueDate", label: "Issue Date" },
  { key: "dueDate",   label: "Due Date"   },
  { key: "amount",    label: "Amount"     },
  { key: "status",    label: "Status"     },
];

const FILTER_OPTIONS = ["All", "Paid", "Pending", "Overdue"];

export default function InvoiceTable({ onSelectInvoice }) {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("All");
  const [sort, setSort]           = useState({ key: "issueDate", dir: "desc" });

  function handleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  const invoices = useMemo(() => {
    let data = [...INVOICES];

    if (statusFilter !== "All") {
      data = data.filter((inv) => inv.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (inv) =>
          inv.id.toLowerCase().includes(q) ||
          inv.client.name.toLowerCase().includes(q) ||
          inv.service.toLowerCase().includes(q)
      );
    }

    data.sort((a, b) => {
      const aVal = sort.key === "client" ? a.client.name : a[sort.key];
      const bVal = sort.key === "client" ? b.client.name : b[sort.key];

      if (sort.key === "amount") {
        return sort.dir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sort.dir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return data;
  }, [search, statusFilter, sort]);

  function SortIcon({ col }) {
    if (sort.key !== col) return <ChevronUp size={13} color="#d1d5db" />;
    return sort.dir === "asc"
      ? <ChevronUp size={13} color="#2563eb" />
      : <ChevronDown size={13} color="#2563eb" />;
  }

  const counts = useMemo(() => ({
    All:     INVOICES.length,
    Paid:    INVOICES.filter((i) => i.status === "Paid").length,
    Pending: INVOICES.filter((i) => i.status === "Pending").length,
    Overdue: INVOICES.filter((i) => i.status === "Overdue").length,
  }), []);

  return (
    <div>
      {/* toolbar: search + filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 240px", minWidth: 180 }}>
          <Search
            size={14} color="#94a3b8"
            style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          />
          <input
            type="text"
            placeholder="Search invoice ID, client, service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
              border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13,
              color: "#0f172a", background: "#fff", outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e)  => (e.target.style.borderColor = "#e2e8f0")}
          />
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {FILTER_OPTIONS.map((opt) => {
            const active = statusFilter === opt;
            return (
              <button
                key={opt}
                onClick={() => setStatus(opt)}
                style={{
                  padding: "7px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${active ? "#3b82f6" : "#e2e8f0"}`,
                  background: active ? "#eff6ff" : "#fff",
                  color: active ? "#1d4ed8" : "#64748b",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {opt}
                <span style={{
                  marginLeft: 6,
                  background: active ? "#dbeafe" : "#f1f5f9",
                  borderRadius: 10, padding: "1px 6px", fontSize: 10,
                  color: active ? "#1d4ed8" : "#94a3b8",
                }}>
                  {counts[opt]}
                </span>
              </button>
            );
          })}
        </div>

        <p style={{ color: "#94a3b8", fontSize: 12, marginLeft: "auto" }}>
          {invoices.length} result{invoices.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* table */}
      <div style={{
        background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "auto",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding: "11px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 600, color: "#64748b",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
              <th style={{ width: 32 }} />
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv, i) => (
              <tr
                key={inv.id}
                onClick={() => onSelectInvoice(inv)}
                style={{
                  borderTop: i > 0 ? "1px solid #f1f5f9" : "none",
                  cursor: "pointer", transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
                    fontSize: 12, color: "#2563eb", fontWeight: 500,
                  }}>
                    {inv.id}
                  </span>
                </td>

                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 6, background: "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Building2 size={13} color="#94a3b8" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 500, color: "#0f172a", fontSize: 13 }}>{inv.client.name}</p>
                      <p style={{ fontSize: 11, color: "#94a3b8" }}>{inv.client.country}</p>
                    </div>
                  </div>
                </td>

                <td style={{ padding: "12px 16px", color: "#475569", fontSize: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Calendar size={12} color="#cbd5e1" />
                    {inv.issueDate}
                  </div>
                </td>

                <td style={{ padding: "12px 16px", fontSize: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={12} color={inv.status === "Overdue" ? "#ef4444" : "#cbd5e1"} />
                    <span style={{ color: inv.status === "Overdue" ? "#ef4444" : "#475569" }}>
                      {inv.dueDate}
                    </span>
                  </div>
                </td>

                <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a", fontSize: 13 }}>
                  {formatEur(inv.amount)}
                </td>

                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge status={inv.status} />
                </td>

                <td style={{ padding: "12px 16px" }}>
                  <ChevronRight size={14} color="#cbd5e1" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <div style={{ padding: "48px 0", textAlign: "center", color: "#94a3b8" }}>
            <FileText size={32} style={{ marginBottom: 12, opacity: 0.3, display: "block", margin: "0 auto 12px" }} />
            <p style={{ fontWeight: 500 }}>No invoices found</p>
            <p style={{ fontSize: 12 }}>Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
