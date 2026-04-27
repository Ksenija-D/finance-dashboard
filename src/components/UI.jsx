// shared UI components used across all views

import {
  TrendingUp, LayoutDashboard, Receipt, BarChart2,
  User, Bell, ArrowUpRight,
} from "lucide-react";
import { STATUS_COLORS, formatEur } from "../utils.js";

// small coloured pill showing invoice status
export function StatusBadge({ status }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 10px", borderRadius: 20,
        backgroundColor: c.bg, color: c.text,
        fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: c.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

// metric summary card used in overview and analytics
export function KPICard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12,
      padding: "20px 24px", flex: 1, minWidth: 180,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      border: "1px solid #e2e8f0",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{
            fontSize: 11, color: "#64748b", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6,
          }}>
            {label}
          </p>
          <p style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
            {value}
          </p>
          {sub && <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{sub}</p>}
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          backgroundColor: color + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      {trend && (
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
          <ArrowUpRight size={13} color="#10b981" />
          <span style={{ color: "#10b981", fontWeight: 600 }}>{trend}</span>
          <span style={{ color: "#94a3b8" }}>vs last month</span>
        </div>
      )}
    </div>
  );
}

// nav links for the sidebar
const NAV_ITEMS = [
  { id: "overview",  icon: LayoutDashboard, label: "Overview"  },
  { id: "invoices",  icon: Receipt,         label: "Invoices"  },
  { id: "analytics", icon: BarChart2,       label: "Analytics" },
];

// left sidebar — collapses to icon-only when closed
export function Sidebar({ active, onNavigate, open }) {
  return (
    <aside style={{
      width: open ? 220 : 64, minWidth: open ? 220 : 64,
      background: "#0f172a", display: "flex", flexDirection: "column",
      transition: "width 0.2s ease", overflow: "hidden", flexShrink: 0,
    }}>
      {/* logo */}
      <div style={{
        padding: "18px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: "#2563eb",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <TrendingUp size={16} color="#fff" />
        </div>
        {open && (
          <div>
            <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>FinanceOS</p>
            <p style={{ color: "#475569", fontSize: 10, marginTop: 2 }}>Analytics Platform</p>
          </div>
        )}
      </div>

      {/* nav links */}
      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {open && (
          <p style={{
            color: "#334155", fontSize: 10, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "8px 8px 4px",
          }}>
            Main Menu
          </p>
        )}
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 10px", borderRadius: 8, marginBottom: 2,
                background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
                color: isActive ? "#60a5fa" : "#94a3b8",
                border: "none", cursor: "pointer", width: "100%",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <item.icon size={17} style={{ flexShrink: 0 }} />
              {open && (
                <>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                  {isActive && (
                    <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#3b82f6" }} />
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* current user */}
      <div style={{
        padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%", background: "#1e3a5f",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <User size={14} color="#60a5fa" />
        </div>
        {open && (
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 500 }}>Ksenia Demchenko</p>
            <p style={{ color: "#475569", fontSize: 10 }}>Finance Analyst</p>
          </div>
        )}
      </div>
    </aside>
  );
}

// top header with page title, notification bell, avatar
export function AppHeader({ title, subtitle, onToggleSidebar }) {
  return (
    <header style={{
      background: "#fff", borderBottom: "1px solid #e2e8f0",
      padding: "0 24px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={onToggleSidebar}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", padding: 4 }}
        >
          <LayoutDashboard size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{title}</h1>
          <p style={{ fontSize: 11, color: "#94a3b8" }}>{subtitle}</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <Bell size={18} color="#94a3b8" />
          <span style={{
            position: "absolute", top: -4, right: -4,
            width: 8, height: 8, borderRadius: "50%",
            background: "#ef4444", border: "2px solid #fff",
          }} />
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <User size={15} color="#3b82f6" />
        </div>
      </div>
    </header>
  );
}

// dark tooltip for recharts
export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: "#0f172a", border: "1px solid #1e293b",
      borderRadius: 8, padding: "10px 14px", color: "#fff",
      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    }}>
      {label && <p style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: 13, fontWeight: 600, color: p.color || "#60a5fa" }}>
          {["revenue", "total", "collected", "invoiced"].includes(p.name)
            ? formatEur(p.value)
            : p.value}
          {" "}
          <span style={{ color: "#475569", fontWeight: 400, fontSize: 11 }}>{p.name}</span>
        </p>
      ))}
    </div>
  );
}

// card container for chart sections — shared between Overview and Analytics
export function Panel({ title, subtitle, children, style = {} }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12,
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      padding: 20,
      ...style,
    }}>
      <div style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
