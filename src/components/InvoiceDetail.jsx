// invoice detail slide-over panel — shows full info, client contact, payment timeline

import { X, Building2, Mail, Phone, FileText } from "lucide-react";
import { formatEur } from "../utils.js";
import { StatusBadge } from "./UI.jsx";

// builds ordered timeline events for this invoice
function buildTimeline(inv) {
  return [
    { label: "Invoice Created",   date: inv.issueDate, done: true,                       color: "#2563eb" },
    { label: "Sent to Client",    date: inv.issueDate, done: true,                       color: "#2563eb" },
    { label: "Payment Due",       date: inv.dueDate,   done: inv.status !== "Pending",   color: inv.status === "Overdue" ? "#ef4444" : "#10b981" },
    { label: "Payment Received",  date: inv.paidDate ?? "—", done: inv.status === "Paid", color: "#10b981" },
  ];
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 11 }}>
      <span style={{ fontSize: 13, color: "#64748b", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: "#0f172a", textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function InvoiceDetail({ invoice, onClose }) {
  if (!invoice) return null;

  const timeline = buildTimeline(invoice);

  return (
    // backdrop — click outside to close
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15,23,42,0.45)" }}
    >
      {/* panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: 420, background: "#fff",
          boxShadow: "-6px 0 30px rgba(0,0,0,0.12)",
          overflowY: "auto", display: "flex", flexDirection: "column",
        }}
      >
        {/* header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: 12, color: "#2563eb", fontWeight: 600, marginBottom: 4 }}>
              {invoice.id}
            </p>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
              {invoice.client.name}
            </h2>
            <StatusBadge status={invoice.status} />
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9", border: "none", borderRadius: 8,
              width: 32, height: 32, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X size={15} color="#64748b" />
          </button>
        </div>

        {/* amount hero */}
        <div style={{
          padding: "18px 24px", background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0", flexShrink: 0,
        }}>
          <p style={{
            fontSize: 11, color: "#64748b", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4,
          }}>
            Invoice Amount
          </p>
          <p style={{ fontSize: 30, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
            {formatEur(invoice.amount)}
          </p>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{invoice.service}</p>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* invoice details */}
          <section style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
            <h3 style={{
              fontSize: 11, fontWeight: 600, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14,
            }}>
              Invoice Details
            </h3>
            <DetailRow label="Issue Date"    value={invoice.issueDate} />
            <DetailRow label="Due Date"      value={invoice.dueDate} />
            <DetailRow label="Payment Terms" value={invoice.terms} />
            {invoice.paidDate && <DetailRow label="Date Paid" value={invoice.paidDate} />}
            <DetailRow label="Notes"         value={invoice.notes} />
          </section>

          {/* client info */}
          <section style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
            <h3 style={{
              fontSize: 11, fontWeight: 600, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14,
            }}>
              Client Information
            </h3>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: "#eff6ff",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Building2 size={18} color="#3b82f6" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{invoice.client.name}</p>
                <p style={{ color: "#64748b", fontSize: 12 }}>{invoice.client.country}</p>
              </div>
            </div>

            {[
              { Icon: FileText, label: "Contact",  value: invoice.client.contact },
              { Icon: Mail,     label: "Email",    value: invoice.client.email   },
              { Icon: Phone,    label: "Phone",    value: invoice.client.phone   },
            ].map(({ Icon, label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Icon size={13} color="#94a3b8" style={{ flexShrink: 0 }} />
                <div style={{ display: "flex", justifyContent: "space-between", flex: 1, gap: 12 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#0f172a" }}>{value}</span>
                </div>
              </div>
            ))}
          </section>

          {/* payment timeline */}
          <section style={{ padding: "20px 24px" }}>
            <h3 style={{
              fontSize: 11, fontWeight: 600, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14,
            }}>
              Payment Timeline
            </h3>

            {timeline.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: `2px solid ${step.done ? step.color : "#e2e8f0"}`,
                    background: step.done ? step.color : "#fff",
                    flexShrink: 0, marginTop: 2,
                  }} />
                  {i < timeline.length - 1 && (
                    <div style={{
                      width: 2, flex: 1, minHeight: 24,
                      background: step.done ? "#e2e8f0" : "#f1f5f9",
                      margin: "3px 0",
                    }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < timeline.length - 1 ? 20 : 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: step.done ? "#0f172a" : "#94a3b8" }}>
                    {step.label}
                  </p>
                  <p style={{ fontSize: 11, color: "#94a3b8" }}>{step.date}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
