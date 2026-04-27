A financial analytics dashboard built with React, designed to simulate an internal ERP tool used by a company's finance department. 

Tech Stack

React 18 + Vite
Recharts - charts and data visualisation
Lucide React — icons
IBM Plex Sans — typography (Google Fonts)
No CSS framework 

Getting Started

Requirements: Node.js 18+
bashcd finance-dashboard
npm install
npm run dev
Opens at http://localhost:3000.

Features

Overview — KPI cards (revenue, pending, overdue, total), monthly revenue line chart, invoice status donut chart, top clients bar chart, recent invoices list.
Invoices — full table with search, status filter, and sortable columns. Click any row to open the detail panel with client info and payment timeline.
Analytics — separate view with invoiced vs collected comparison, revenue by service category, and monthly collection rate trend.


Project Structure

src/
├── App.jsx                  # layout and routing
├── utils.js                 # currency formatters, colour tokens
├── data/
│   └── invoices.js          # 50 mock invoices + data helpers
└── components/
    ├── UI.jsx               # shared components (KPICard, Sidebar, etc.)
    ├── Overview.jsx
    ├── InvoiceTable.jsx
    ├── InvoiceDetail.jsx
    └── Analytics.jsx

