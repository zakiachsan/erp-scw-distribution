"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Plus, SlidersHorizontal, Filter } from "lucide-react"

interface Adjustment {
  id: string
  number: string
  date: string
  keterangan: string
  totalItems: number
  status: "Selesai" | "Draft" | "Dibatalkan"
}

const adjustments: Adjustment[] = [
  {
    id: "ADJ-001",
    number: "IA.2026.06.00001",
    date: "2026-06-18",
    keterangan: "Penyesuaian stok SCW Nano Coating 9H - selisih fisik",
    totalItems: 12,
    status: "Selesai",
  },
  {
    id: "ADJ-002",
    number: "IA.2026.06.00002",
    date: "2026-06-17",
    keterangan: "Koreksi stok SCW Body Wash 5L - batch rusak",
    totalItems: 5,
    status: "Selesai",
  },
  {
    id: "ADJ-003",
    number: "IA.2026.06.00003",
    date: "2026-06-15",
    keterangan: "Penyesuaian stok SCW Tire Shine 500ml - exp date",
    totalItems: 8,
    status: "Draft",
  },
  {
    id: "ADJ-004",
    number: "IA.2026.06.00004",
    date: "2026-06-12",
    keterangan: "Adjustment SCW Glass Coating 250ml - sample product",
    totalItems: 3,
    status: "Selesai",
  },
  {
    id: "ADJ-005",
    number: "IA.2026.06.00005",
    date: "2026-06-10",
    keterangan: "Penyesuaian stok SCW Body Polish 500ml - warehouse audit",
    totalItems: 15,
    status: "Dibatalkan",
  },
  {
    id: "ADJ-006",
    number: "IA.2026.06.00006",
    date: "2026-06-08",
    keterangan: "Koreksi stok SCW Leather Treatment - kesalahan input",
    totalItems: 7,
    status: "Selesai",
  },
  {
    id: "ADJ-007",
    number: "IA.2026.06.00007",
    date: "2026-06-05",
    keterangan: "Penyesuaian stok SCW Wheel Shiner 1L - retur supplier",
    totalItems: 4,
    status: "Draft",
  },
  {
    id: "ADJ-008",
    number: "IA.2026.06.00008",
    date: "2026-06-03",
    keterangan: "Adjustment SCW APC 5L - bonus promosi",
    totalItems: 6,
    status: "Selesai",
  },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  Selesai: { label: "Selesai", color: "#2e844a", bg: "#e8f5ed" },
  Draft: { label: "Draft", color: "#9a6b00", bg: "#fef7e0" },
  Dibatalkan: { label: "Dibatalkan", color: "#ea001e", bg: "#fef1f0" },
}

const categoryFilterOptions = ["Semua", "Selesai", "Draft", "Dibatalkan"]

// ── SLDS style constants ──
const slds = {
  brand: "#0176d3",
  brandHover: "#014486",
  textPrimary: "#001526",
  textSecondary: "#444746",
  border: "#d8d8d8",
  borderLight: "#ecebea",
  success: "#2e844a",
  warning: "#fe9339",
  error: "#ea001e",
  bgLight: "#f4f6f9",
  bgWhite: "#ffffff",
  radius: 6,
  fontBase: "13px",
  fontSmall: "12px",
  fontXSmall: "11px",
}

const sldsCard = (styles: React.CSSProperties = {}) => ({
  background: slds.bgWhite,
  border: `1px solid ${slds.borderLight}`,
  borderRadius: slds.radius,
  ...styles,
})

const sldsInput = (styles: React.CSSProperties = {}) => ({
  height: 32,
  padding: "0 10px",
  fontSize: slds.fontBase,
  border: `1px solid ${slds.border}`,
  borderRadius: slds.radius,
  outline: "none",
  color: slds.textPrimary,
  background: slds.bgWhite,
  width: "100%",
  boxSizing: "border-box" as const,
  ...styles,
})

const sldsSelect = (styles: React.CSSProperties = {}) => ({
  height: 32,
  padding: "0 28px 0 10px",
  fontSize: slds.fontBase,
  border: `1px solid ${slds.border}`,
  borderRadius: slds.radius,
  outline: "none",
  color: slds.textPrimary,
  background: slds.bgWhite,
  width: "100%",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
  cursor: "pointer",
  ...styles,
})

const sldsLabel = (styles: React.CSSProperties = {}) => ({
  fontSize: slds.fontSmall,
  fontWeight: 600,
  color: slds.textSecondary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
  display: "block",
  marginBottom: 4,
  ...styles,
})

const sldsButton = (variant: "primary" | "outline" | "ghost" = "primary", styles: React.CSSProperties = {}) => {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 32,
    padding: "0 14px",
    fontSize: slds.fontBase,
    fontWeight: 600,
    border: `1px solid ${slds.border}`,
    borderRadius: slds.radius,
    cursor: "pointer",
    transition: "all 100ms",
    whiteSpace: "nowrap",
    textDecoration: "none",
    ...styles,
  }
  if (variant === "primary") {
    return { ...base, background: slds.brand, color: "#fff", border: `1px solid ${slds.brand}` }
  }
  if (variant === "outline") {
    return { ...base, background: slds.bgWhite, color: slds.textPrimary, border: `1px solid ${slds.border}` }
  }
  return { ...base, background: "transparent", color: slds.textSecondary, border: "1px solid transparent", padding: "0 8px" }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function AdjustmentsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | "Selesai" | "Draft" | "Dibatalkan">("all")

  const filtered = useMemo(() => {
    return adjustments.filter((adj) => {
      const matchesSearch =
        adj.number.toLowerCase().includes(search.toLowerCase()) ||
        adj.keterangan.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "Semua" || adj.status === categoryFilter
      const matchesStatus =
        statusFilter === "all" || adj.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter])

  const totalCount = adjustments.length
  const selesaiCount = adjustments.filter((a) => a.status === "Selesai").length
  const draftCount = adjustments.filter((a) => a.status === "Draft").length
  const dibatalkanCount = adjustments.filter((a) => a.status === "Dibatalkan").length

  const summaryCards = [
    {
      key: "all",
      label: "Total",
      count: totalCount,
      color: slds.brand,
      bg: "#e0f0ff",
      filter: "all" as const,
    },
    {
      key: "Selesai",
      label: "Selesai",
      count: selesaiCount,
      color: slds.success,
      bg: "#e8f5ed",
      filter: "Selesai" as const,
    },
    {
      key: "Draft",
      label: "Draft",
      count: draftCount,
      color: slds.warning,
      bg: "#fef7e0",
      filter: "Draft" as const,
    },
    {
      key: "Dibatalkan",
      label: "Dibatalkan",
      count: dibatalkanCount,
      color: slds.error,
      bg: "#fef1f0",
      filter: "Dibatalkan" as const,
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: slds.textPrimary, lineHeight: 1.2 }}>
            Penyesuaian Persediaan
          </h1>
          <p style={{ fontSize: slds.fontBase, color: slds.textSecondary, marginTop: 2 }}>
            Daftar penyesuaian stok persediaan SCW Distribution
          </p>
        </div>
        <Link
          href="/accounting/inventory/adjustments/create"
          style={sldsButton("primary")}
          onMouseEnter={(e) => (e.currentTarget.style.background = slds.brandHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = slds.brand)}
        >
          <Plus size={16} />
          Buat Penyesuaian
        </Link>
      </div>

      {/* ── Summary cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        {summaryCards.map((card) => (
          <div
            key={card.key}
            onClick={() => setStatusFilter(card.filter)}
            style={{
              ...sldsCard({
                cursor: "pointer",
                transition: "box-shadow 100ms",
                ...(statusFilter === card.filter ? { boxShadow: `0 0 0 2px ${card.color}` } : {}),
              }),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = statusFilter === card.filter ? `0 0 0 2px ${card.color}` : "0 2px 8px rgba(0,0,0,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = statusFilter === card.filter ? `0 0 0 2px ${card.color}` : "none")}
          >
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: card.bg,
                  }}
                >
                  <SlidersHorizontal size={20} style={{ color: card.color }} />
                </div>
                <div>
                  <p style={{ fontSize: slds.fontSmall, color: slds.textSecondary }}>{card.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: card.color }}>{card.count}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div style={sldsCard({ overflow: "hidden" })}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${slds.borderLight}`,
          }}
        >
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: slds.textPrimary }}>
              Penyesuaian Persediaan
            </h2>
            <p style={{ fontSize: slds.fontSmall, color: slds.textSecondary, marginTop: 2 }}>
              {filtered.length} penyesuaian persediaan ditemukan
              {statusFilter !== "all" && (
                <span style={{ marginLeft: 4 }}>({statusFilter})</span>
              )}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {statusFilter !== "all" && (
              <button
                onClick={() => setStatusFilter("all")}
                style={sldsButton("outline", { height: 28, fontSize: slds.fontSmall, padding: "0 10px" })}
                onMouseEnter={(e) => (e.currentTarget.style.background = slds.bgLight)}
                onMouseLeave={(e) => (e.currentTarget.style.background = slds.bgWhite)}
              >
                Clear filter
              </button>
            )}
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: slds.textSecondary,
                  pointerEvents: "none",
                }}
              />
              <input
                placeholder="Cari nomor atau keterangan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={sldsInput({ width: 220, paddingLeft: 32 })}
                onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value ?? "Semua")}
              style={sldsSelect({ width: 140 })}
              onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
              onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
            >
              {categoryFilterOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: slds.fontBase }}>
            <thead>
              <tr style={{ background: slds.bgWhite }}>
                {["Nomor #", "Tanggal", "Keterangan", "Total Items", "Status"].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 12px",
                      fontSize: slds.fontXSmall,
                      fontWeight: 600,
                      color: slds.textSecondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      textAlign: col === "Total Items" ? "right" : "left",
                      borderBottom: `1px solid ${slds.borderLight}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((adj) => (
                <tr
                  key={adj.id}
                  style={{ borderBottom: `1px solid ${slds.borderLight}`, transition: "background 100ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "10px 12px" }}>
                    <Link
                      href={`/accounting/inventory/adjustments/${adj.id}`}
                      style={{ fontSize: slds.fontSmall, color: slds.brand, textDecoration: "none", fontFamily: "monospace" }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
                      {adj.number}
                    </Link>
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: slds.fontSmall, color: slds.textSecondary }}>
                    {formatDate(adj.date)}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span
                      style={{
                        fontSize: slds.fontBase,
                        color: slds.textSecondary,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                        maxWidth: 320,
                      }}
                    >
                      {adj.keterangan}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontSize: slds.fontSmall, fontFamily: "monospace" }}>
                    {adj.totalItems} item
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "2px 10px",
                        borderRadius: 12,
                        fontSize: slds.fontXSmall,
                        fontWeight: 600,
                        color: statusConfig[adj.status]?.color || slds.textPrimary,
                        background: statusConfig[adj.status]?.bg || "transparent",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {statusConfig[adj.status]?.label || adj.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
