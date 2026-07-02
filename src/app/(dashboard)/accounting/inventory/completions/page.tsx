"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Plus, CheckCircle2, Filter } from "lucide-react"

interface Completion {
  id: string
  number: string
  date: string
  workOrder: string
  tipePenyelesaian: string
  keterangan: string
}

const completions: Completion[] = [
  {
    id: "CMP-001",
    number: "CMP.2026.06.00001",
    date: "2026-06-18",
    workOrder: "JC.2026.06.00003",
    tipePenyelesaian: "Barang",
    keterangan: "SCW Tire Shine 100 botol selesai diproduksi",
  },
  {
    id: "CMP-002",
    number: "CMP.2026.06.00002",
    date: "2026-06-17",
    workOrder: "JC.2026.06.00004",
    tipePenyelesaian: "Jasa",
    keterangan: "Coating interior leather treatment selesai",
  },
  {
    id: "CMP-003",
    number: "CMP.2026.06.00003",
    date: "2026-06-16",
    workOrder: "JC.2026.06.00006",
    tipePenyelesaian: "Barang",
    keterangan: "Batch SCW Glass Coating selesai diproduksi",
  },
  {
    id: "CMP-004",
    number: "CMP.2026.06.00004",
    date: "2026-06-15",
    workOrder: "JC.2026.06.00008",
    tipePenyelesaian: "Jasa",
    keterangan: "Detailing harian 5 unit selesai",
  },
  {
    id: "CMP-005",
    number: "CMP.2026.06.00005",
    date: "2026-06-14",
    workOrder: "JC.2026.06.00002",
    tipePenyelesaian: "Barang",
    keterangan: "SCW Body Wash 50L batch selesai",
  },
  {
    id: "CMP-006",
    number: "CMP.2026.06.00006",
    date: "2026-06-12",
    workOrder: "JC.2026.06.00001",
    tipePenyelesaian: "Barang",
    keterangan: "Coating SCW Nano Coating 9H selesai diproses",
  },
]

const tipeBadgeConfig: Record<string, { color: string; bg: string }> = {
  Barang: { color: "#0176d3", bg: "#e0f0ff" },
  Jasa: { color: "#9a6b00", bg: "#fef7e0" },
}

const categoryFilterOptions = ["Semua", "Barang", "Jasa"]

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

export default function CompletionsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState<"all" | "Selesai" | "Draft" | "Dibatalkan">("all")

  const filtered = useMemo(() => {
    return completions.filter((comp) => {
      const matchesSearch =
        comp.workOrder.toLowerCase().includes(search.toLowerCase()) ||
        comp.number.toLowerCase().includes(search.toLowerCase()) ||
        comp.keterangan.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === "Semua" || comp.tipePenyelesaian === categoryFilter
      const matchesStatus =
        statusFilter === "all"
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [search, categoryFilter, statusFilter])

  const totalCount = completions.length
  const selesaiCount = completions.length
  const draftCount = 0
  const dibatalkanCount = 0

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
            Penyelesaian Pesanan
          </h1>
          <p style={{ fontSize: slds.fontBase, color: slds.textSecondary, marginTop: 2 }}>
            Daftar penyelesaian pekerjaan pesanan SCW Distribution
          </p>
        </div>
        <Link
          href="/accounting/inventory/completions/create"
          style={sldsButton("primary")}
          onMouseEnter={(e) => (e.currentTarget.style.background = slds.brandHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = slds.brand)}
        >
          <Plus size={16} />
          Buat Penyelesaian
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
                  <CheckCircle2 size={20} style={{ color: card.color }} />
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
              Penyelesaian Pesanan
            </h2>
            <p style={{ fontSize: slds.fontSmall, color: slds.textSecondary, marginTop: 2 }}>
              {filtered.length} penyelesaian pesanan ditemukan
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
                placeholder="Cari nomor, pekerjaan, atau keterangan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={sldsInput({ width: 240, paddingLeft: 32 })}
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
                {["Nomor #", "Tanggal", "Pekerjaan Pesanan", "Tipe", "Keterangan"].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 12px",
                      fontSize: slds.fontXSmall,
                      fontWeight: 600,
                      color: slds.textSecondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      textAlign: "left",
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
              {filtered.map((comp) => (
                <tr
                  key={comp.id}
                  style={{ borderBottom: `1px solid ${slds.borderLight}`, transition: "background 100ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "10px 12px" }}>
                    <Link
                      href={`/accounting/inventory/completions/${comp.id}`}
                      style={{ fontSize: slds.fontSmall, color: slds.brand, textDecoration: "none", fontFamily: "monospace" }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
                      {comp.number}
                    </Link>
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: slds.fontSmall, color: slds.textSecondary }}>
                    {formatDate(comp.date)}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <Link
                      href={`/accounting/inventory/work-orders/${comp.workOrder}`}
                      style={{ fontSize: slds.fontSmall, color: slds.brand, textDecoration: "none", fontFamily: "monospace" }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
                      {comp.workOrder}
                    </Link>
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
                        color: tipeBadgeConfig[comp.tipePenyelesaian]?.color || slds.textPrimary,
                        background: tipeBadgeConfig[comp.tipePenyelesaian]?.bg || "transparent",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {comp.tipePenyelesaian}
                    </span>
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
                      {comp.keterangan}
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
