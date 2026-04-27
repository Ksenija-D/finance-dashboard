// mock invoice data — in production this would come from an API (e.g. SAP, Oracle)

export const CLIENTS = [
  { id: "C001", name: "Axiom Technologies GmbH",    country: "DE", contact: "Klaus Bergmann",      email: "k.bergmann@axiom-tech.de",    phone: "+49 89 123 4567"   },
  { id: "C002", name: "Nordic Ventures AS",          country: "NO", contact: "Ingrid Halvorsen",    email: "i.halvorsen@nordicv.no",       phone: "+47 22 33 44 55"   },
  { id: "C003", name: "Meridian Capital SRL",        country: "IT", contact: "Marco Fontanella",    email: "m.fontanella@meridian.it",     phone: "+39 02 1234 5678"  },
  { id: "C004", name: "Vantage Analytics Ltd",       country: "GB", contact: "Sarah Whitfield",     email: "s.whitfield@vantage.co.uk",    phone: "+44 20 7946 0958"  },
  { id: "C005", name: "Luminos Consulting BV",       country: "NL", contact: "Pieter van den Berg", email: "p.vdberg@luminos.nl",          phone: "+31 20 555 0101"   },
  { id: "C006", name: "Apex Digital SA",             country: "FR", contact: "Claire Dubois",       email: "c.dubois@apexdigital.fr",      phone: "+33 1 42 86 24 10" },
  { id: "C007", name: "Stratos Partners Kft",        country: "HU", contact: "Balázs Kovács",       email: "b.kovacs@stratos.hu",          phone: "+36 1 234 5678"    },
  { id: "C008", name: "ClearPath Solutions AB",      country: "SE", contact: "Emma Lindström",      email: "e.lindstrom@clearpath.se",     phone: "+46 8 123 456 78"  },
  { id: "C009", name: "Helios Group S.A.",           country: "ES", contact: "Alejandro Ruiz",      email: "a.ruiz@heliosgroup.es",        phone: "+34 91 123 45 67"  },
  { id: "C010", name: "Fortis Partners AG",          country: "CH", contact: "Thomas Müller",       email: "t.mueller@fortispartners.ch",  phone: "+41 44 123 45 67"  },
  { id: "C011", name: "Delta Systems OÜ",            country: "EE", contact: "Siiri Tamm",          email: "s.tamm@deltasys.ee",           phone: "+372 6 123 456"    },
  { id: "C012", name: "Kronos Industries Sp.z.o.o.", country: "PL", contact: "Marek Wiśniewski",   email: "m.wisniewski@kronos.pl",       phone: "+48 22 123 45 67"  },
];

const SERVICES = [
  "Financial Consulting Services",
  "Data Analytics Report",
  "ERP Implementation — Phase",
  "Audit & Compliance Review",
  "Strategic Advisory Services",
  "Software License Renewal",
  "Cloud Infrastructure Setup",
  "Monthly Retainer — Finance",
  "Market Analysis Report",
  "Tax Advisory Services",
];

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// raw data rows — deterministic, no Math.random()
// schema: [clientIndex, amount€, issuedDaysAgo, paymentTermDays, status, serviceIndex, suffix]
const RAW = [
  [0,  4250, 175, 30, "Paid",    0, ""],
  [3,  1800, 168, 30, "Paid",    1, "Q1"],
  [5,  9200, 161, 45, "Paid",    2, "1"],
  [1,   650, 154, 30, "Paid",    3, ""],
  [9,  3400, 147, 30, "Paid",    4, ""],
  [2,  7800, 140, 45, "Overdue", 5, ""],
  [7,  2100, 133, 30, "Paid",    6, ""],
  [4,  5600, 126, 30, "Overdue", 7, ""],
  [6,  1250, 119, 30, "Paid",    8, ""],
  [11, 8900, 112, 45, "Paid",    9, ""],
  [0,  3300, 105, 30, "Paid",    0, ""],
  [8,  4700,  98, 30, "Overdue", 1, "Q2"],
  [3,  1100,  91, 14, "Paid",    2, "2"],
  [10, 6500,  84, 30, "Paid",    3, ""],
  [5,  2900,  77, 30, "Paid",    4, ""],
  [1,  4800,  70, 45, "Overdue", 5, ""],
  [9,  1600,  63, 30, "Paid",    6, ""],
  [7,  7200,  56, 30, "Paid",    7, ""],
  [2,  3800,  49, 30, "Paid",    8, ""],
  [4,   950,  42, 14, "Pending", 9, ""],
  [6,  5400,  35, 30, "Pending", 0, ""],
  [11, 2200,  28, 30, "Pending", 1, "Q3"],
  [0,  8100,  21, 45, "Pending", 2, "3"],
  [8,  1450,  14, 30, "Pending", 3, ""],
  [3,  6300,  10, 30, "Pending", 4, ""],
  [10, 3100,   7, 14, "Pending", 5, ""],
  [5,   770,   5, 14, "Pending", 6, ""],
  [1,  4100,   3, 30, "Pending", 7, ""],
  [9,  2700,   2, 30, "Pending", 8, ""],
  [7,  9500,   1, 45, "Pending", 9, ""],
  [2,  1900, 180, 30, "Paid",    0, ""],
  [4,  5200, 173, 30, "Paid",    1, "Q4"],
  [6,  3600, 166, 45, "Paid",    2, "4"],
  [11, 1300, 159, 30, "Paid",    3, ""],
  [0,  7100, 152, 30, "Paid",    4, ""],
  [8,  2500, 145, 30, "Overdue", 5, ""],
  [3,  4900, 138, 45, "Paid",    6, ""],
  [10,  850, 131, 14, "Paid",    7, ""],
  [5,  6800, 124, 30, "Overdue", 8, ""],
  [1,  2300, 117, 30, "Paid",    9, ""],
  [9,  5100, 110, 30, "Paid",    0, ""],
  [7,  1750, 103, 30, "Paid",    1, "Q1"],
  [2,  8400,  96, 45, "Overdue", 2, "5"],
  [4,  3200,  89, 30, "Paid",    3, ""],
  [6,  1050,  82, 14, "Paid",    4, ""],
  [11, 4600,  75, 30, "Paid",    5, ""],
  [0,  2800,  68, 30, "Overdue", 6, ""],
  [8,  7400,  61, 45, "Paid",    7, ""],
  [3,  1600,  54, 30, "Paid",    8, ""],
  [10, 5900,  47, 30, "Paid",    9, ""],
];

const TODAY = "2026-04-26";

export const INVOICES = RAW.map((row, i) => {
  const [clientIdx, amount, issuedAgo, terms, status, serviceIdx, suffix] = row;
  const client    = CLIENTS[clientIdx];
  const issueDate = addDays(TODAY, -issuedAgo);
  const dueDate   = addDays(issueDate, terms);
  const paidDate  = status === "Paid" ? addDays(dueDate, -5) : null;
  const service   = SERVICES[serviceIdx] + (suffix ? ` ${suffix}` : "");

  const NOTES = {
    Paid:    "Payment received and reconciled.",
    Pending: "Awaiting client confirmation. Follow-up scheduled.",
    Overdue: "Payment reminder sent. Escalated to account manager.",
  };

  return {
    id: `INV-2026-${String(i + 1).padStart(3, "0")}`,
    client,
    service,
    issueDate,
    dueDate,
    amount,
    status,
    paidDate,
    terms: `Net ${terms}`,
    notes: NOTES[status],
  };
});

// --- data helpers used by chart components ---

export function getKPIs() {
  const paid    = INVOICES.filter(i => i.status === "Paid");
  const pending = INVOICES.filter(i => i.status === "Pending");
  const overdue = INVOICES.filter(i => i.status === "Overdue");
  const sum     = (arr) => arr.reduce((s, i) => s + i.amount, 0);

  return {
    totalRevenue:  sum(paid),
    pendingAmount: sum(pending),
    overdueAmount: sum(overdue),
    totalInvoiced: sum(INVOICES),
    paidCount:     paid.length,
    pendingCount:  pending.length,
    overdueCount:  overdue.length,
    totalCount:    INVOICES.length,
  };
}

export function getMonthlyRevenue() {
  const MONTHS = [
    { label: "Nov", year: 2025, month: 10 },
    { label: "Dec", year: 2025, month: 11 },
    { label: "Jan", year: 2026, month: 0  },
    { label: "Feb", year: 2026, month: 1  },
    { label: "Mar", year: 2026, month: 2  },
    { label: "Apr", year: 2026, month: 3  },
  ];

  return MONTHS.map(({ label, year, month }) => {
    const revenue = INVOICES
      .filter(inv => {
        if (inv.status !== "Paid" || !inv.paidDate) return false;
        const d = new Date(inv.paidDate);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((s, inv) => s + inv.amount, 0);

    return { month: label, revenue };
  });
}

export function getStatusDistribution() {
  return [
    { name: "Paid",    value: INVOICES.filter(i => i.status === "Paid").length,    color: "#10b981" },
    { name: "Pending", value: INVOICES.filter(i => i.status === "Pending").length, color: "#f59e0b" },
    { name: "Overdue", value: INVOICES.filter(i => i.status === "Overdue").length, color: "#ef4444" },
  ];
}

export function getTopClients() {
  const map = {};
  INVOICES.forEach(inv => {
    const key = inv.client.id;
    if (!map[key]) map[key] = { name: inv.client.name.split(" ")[0], total: 0 };
    map[key].total += inv.amount;
  });
  return Object.values(map).sort((a, b) => b.total - a.total).slice(0, 7);
}

// monthly invoiced vs collected — used in analytics
export function getMonthlyComparison() {
  const MONTHS = [
    { label: "Nov", year: 2025, month: 10 },
    { label: "Dec", year: 2025, month: 11 },
    { label: "Jan", year: 2026, month: 0  },
    { label: "Feb", year: 2026, month: 1  },
    { label: "Mar", year: 2026, month: 2  },
    { label: "Apr", year: 2026, month: 3  },
  ];

  return MONTHS.map(({ label, year, month }) => {
    const invoiced = INVOICES
      .filter(inv => {
        const d = new Date(inv.issueDate);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((s, inv) => s + inv.amount, 0);

    const collected = INVOICES
      .filter(inv => {
        if (!inv.paidDate) return false;
        const d = new Date(inv.paidDate);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .reduce((s, inv) => s + inv.amount, 0);

    return { month: label, invoiced, collected };
  });
}

// revenue split by service category — used in analytics
export function getRevenueByService() {
  const CATEGORY_MAP = {
    "Financial Consulting Services": "Consulting",
    "Data Analytics Report":         "Analytics",
    "ERP Implementation — Phase":    "ERP",
    "Audit & Compliance Review":     "Audit",
    "Strategic Advisory Services":   "Advisory",
    "Software License Renewal":      "Software",
    "Cloud Infrastructure Setup":    "Cloud",
    "Monthly Retainer — Finance":    "Retainer",
    "Market Analysis Report":        "Research",
    "Tax Advisory Services":         "Tax",
  };

  const map = {};
  INVOICES.forEach(inv => {
    // match the service string to one of the base categories
    const baseKey = Object.keys(CATEGORY_MAP).find(k => inv.service.startsWith(k));
    const label   = baseKey ? CATEGORY_MAP[baseKey] : "Other";
    if (!map[label]) map[label] = 0;
    map[label] += inv.amount;
  });

  return Object.entries(map)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);
}
