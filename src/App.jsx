// FinanceOS — main app shell
// handles routing between views and invoice detail state

import { useState } from "react";
import { Sidebar, AppHeader } from "./components/UI.jsx";
import Overview      from "./components/Overview.jsx";
import InvoiceTable  from "./components/InvoiceTable.jsx";
import Analytics     from "./components/Analytics.jsx";
import InvoiceDetail from "./components/InvoiceDetail.jsx";

const VIEW_META = {
  overview:  { title: "Financial Overview",  subtitle: "Revenue, payments & key metrics at a glance" },
  invoices:  { title: "Invoice Management",  subtitle: "Browse, search and manage all invoices"      },
  analytics: { title: "Analytics",           subtitle: "Revenue trends and payment performance"      },
};

export default function App() {
  const [view,    setView]    = useState("overview");
  const [invoice, setInvoice] = useState(null);
  const [sidebar, setSidebar] = useState(true);

  const meta = VIEW_META[view] ?? VIEW_META.overview;

  const dateStr = new Date("2026-04-26").toLocaleDateString("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  function renderView() {
    if (view === "overview") {
      return (
        <Overview
          onViewAll={() => setView("invoices")}
          onSelectInvoice={setInvoice}
        />
      );
    }
    if (view === "invoices") {
      return <InvoiceTable onSelectInvoice={setInvoice} />;
    }
    if (view === "analytics") {
      return <Analytics />;
    }
    return null;
  }

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      fontFamily: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
      backgroundColor: "#f1f5f9", fontSize: 14,
    }}>
      {/* sidebar */}
      <Sidebar active={view} onNavigate={setView} open={sidebar} />

      {/* main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AppHeader
          title={meta.title}
          subtitle={dateStr}
          onToggleSidebar={() => setSidebar((p) => !p)}
        />
        <main style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {renderView()}
        </main>
      </div>

      {/* invoice detail slide-over */}
      {invoice && (
        <InvoiceDetail invoice={invoice} onClose={() => setInvoice(null)} />
      )}
    </div>
  );
}
