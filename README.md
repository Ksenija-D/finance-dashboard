# FinanceOS — Financial Operations Dashboard

> A professional ERP-style financial analytics web application built with React.
> Designed as a portfolio project for a junior finance/data analyst internship application.

---

## 🖥️ Live Preview

After running locally (see below), the dashboard opens at **http://localhost:3000**.

---

## 📁 File Structure

```
finance-dashboard/
├── index.html                  # HTML entry point (loads fonts, mounts React)
├── vite.config.js              # Vite build tool configuration
├── package.json                # Dependencies and scripts
│
└── src/
    ├── main.jsx                # React app entry point (renders <App />)
    ├── App.jsx                 # Root component — layout, routing, state
    ├── utils.js                # Shared helpers: currency formatting, color constants
    │
    ├── data/
    │   └── invoices.js         # Mock data: 50 invoices, 12 clients, KPI/chart helpers
    │
    └── components/
        ├── UI.jsx              # Reusable components: StatusBadge, KPICard, Sidebar, Header
        ├── Overview.jsx        # Dashboard view: KPIs + 3 charts + recent invoices
        ├── InvoiceTable.jsx    # Invoice list with search, filter, sort
        └── InvoiceDetail.jsx   # Slide-over panel: full invoice info + timeline
```

---

## 🚀 Running Locally

### Prerequisites
- **Node.js 18+** (check with `node -v`)
- **npm** (included with Node.js)

### Steps

```bash
# 1. Navigate into the project folder
cd finance-dashboard

# 2. Install dependencies (~30 seconds)
npm install

# 3. Start the development server
npm run dev
```

The browser will open automatically at **http://localhost:3000**.

### Build for Production

```bash
npm run build     # Creates optimised output in /dist
npm run preview   # Serve the production build locally
```

---

## ✨ Features

### 📊 Overview Dashboard
- **4 KPI cards**: Revenue collected, pending payments, overdue balance, total invoiced
- **Monthly Revenue** line chart (Nov 2025 – Apr 2026)
- **Invoice Status** donut/pie chart (Paid / Pending / Overdue distribution)
- **Top Clients by Revenue** horizontal bar chart
- **Recent Invoices** preview table with click-through

### 📋 Invoice Management Table
- **50 mock invoices** with realistic European companies, amounts (€100–€10,000), and 6-month date range
- **Full-text search** across invoice ID, client name, and service description
- **Status filter** pills (All / Paid / Pending / Overdue) with live counts
- **Multi-column sort** (click any header: ID, client, issue date, due date, amount, status)
- Overdue due dates highlighted in red

### 🔍 Invoice Detail Panel
- Slide-over panel with a darkened backdrop
- Full invoice metadata (service, dates, payment terms, notes)
- Client contact information (name, email, phone)
- Step-by-step **payment timeline** (Created → Sent → Due → Received)

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI components and state management |
| **Vite** | Fast development server and bundler |
| **Recharts** | Line chart, pie chart, bar chart |
| **Lucide React** | Clean SVG icon set |
| **IBM Plex Sans** | Professional corporate typography (Google Fonts) |

No CSS framework is used — all styling is done with inline styles and JavaScript objects,
which makes every component fully self-contained and easy to understand.

---

## 🧠 Data Model

Each invoice object has the following shape:

```js
{
  id:        "INV-2026-001",          // Unique invoice identifier
  client: {
    id:      "C001",
    name:    "Axiom Technologies GmbH",
    country: "DE",
    contact: "Klaus Bergmann",
    email:   "k.bergmann@axiom-tech.de",
    phone:   "+49 89 123 4567",
  },
  service:   "Financial Consulting Services",
  issueDate: "2025-11-02",            // ISO 8601 date string
  dueDate:   "2025-12-02",
  amount:    4250,                    // Numeric, in EUR
  status:    "Paid",                  // "Paid" | "Pending" | "Overdue"
  paidDate:  "2025-11-27",            // null if not yet paid
  terms:     "Net 30",
  notes:     "Payment received and reconciled.",
}
```

---

## 📌 Portfolio Notes

This project demonstrates:
- **Component-based architecture** (separation of concerns across 6 files)
- **Data-driven UI** (charts and tables driven by a structured mock dataset)
- **State management** with React hooks (`useState`, `useMemo`)
- **Performance optimisation** (derived data memoised with `useMemo`)
- **Professional UX patterns** (slide-over panels, filter pills, sortable tables)
- **Corporate design system** (consistent spacing, typography, and colour tokens)

---

## 📄 License

MIT — free to use, modify, and include in your portfolio.
