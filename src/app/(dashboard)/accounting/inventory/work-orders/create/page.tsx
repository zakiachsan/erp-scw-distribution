"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Save, Send, ClipboardList } from "lucide-react"

interface WorkOrderLine {
  id: number
  itemName: string
  code: string
  quantity: number
  unit: string
}

const inventoryItems = [
  { code: "SCW-NCH-9H", name: "SCW Nano Coating 9H", unit: "Botol" },
  { code: "SCW-BW-5L", name: "SCW Body Wash 5L", unit: "Liter" },
  { code: "SCW-TS-500", name: "SCW Tire Shine 500ml", unit: "Botol" },
  { code: "SCW-GC-250", name: "SCW Glass Coating 250ml", unit: "Botol" },
  { code: "SCW-BP-500", name: "SCW Body Polish 500ml", unit: "Botol" },
  { code: "SCW-LT-INT", name: "SCW Leather Treatment Interior", unit: "Botol" },
  { code: "SCW-WS-1L", name: "SCW Wheel Shiner 1L", unit: "Liter" },
  { code: "SCW-APC-5L", name: "SCW All Purpose Cleaner 5L", unit: "Liter" },
]

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

function generateWorkOrderNumber(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `JC.${year}.${month}.${seq}`
}

export default function CreateWorkOrderPage() {
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [workOrderNumber, setWorkOrderNumber] = useState(generateWorkOrderNumber())
  const [batchNo, setBatchNo] = useState("")
  const [keterangan, setKeterangan] = useState("")
  const [lines, setLines] = useState<WorkOrderLine[]>([
    { id: 1, itemName: "", code: "", quantity: 0, unit: "" },
  ])
  const [nextId, setNextId] = useState(2)

  const addLine = () => {
    setLines([
      ...lines,
      { id: nextId, itemName: "", code: "", quantity: 0, unit: "" },
    ])
    setNextId(nextId + 1)
  }

  const removeLine = (id: number) => {
    if (lines.length <= 1) return
    setLines(lines.filter((line) => line.id !== id))
  }

  const updateLine = (
    id: number,
    field: keyof WorkOrderLine,
    value: string | number
  ) => {
    setLines(
      lines.map((line) => {
        if (line.id === id) {
          const updated = { ...line, [field]: value }
          if (field === "code") {
            const item = inventoryItems.find((i) => i.code === value)
            updated.itemName = item?.name || ""
            updated.unit = item?.unit || ""
          }
          return updated
        }
        return line
      })
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/accounting/inventory/work-orders"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: slds.radius,
              color: slds.textSecondary,
              textDecoration: "none",
              transition: "background 100ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = slds.bgLight)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: slds.textPrimary, lineHeight: 1.2 }}>
              Buat Pekerjaan Pesanan
            </h1>
            <p style={{ fontSize: slds.fontBase, color: slds.textSecondary, marginTop: 2 }}>
              Buat pekerjaan pesanan baru untuk proses produksi
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={sldsButton("outline")}
            onMouseEnter={(e) => (e.currentTarget.style.background = slds.bgLight)}
            onMouseLeave={(e) => (e.currentTarget.style.background = slds.bgWhite)}
          >
            <Save size={14} />
            Simpan Draft
          </button>
          <button
            style={sldsButton("primary")}
            onMouseEnter={(e) => (e.currentTarget.style.background = slds.brandHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = slds.brand)}
          >
            <Send size={14} />
            Terbitkan Pekerjaan
          </button>
        </div>
      </div>

      {/* ── Header Info Card ── */}
      <div style={sldsCard()}>
        <div style={{ padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {/* Date */}
            <div>
              <label htmlFor="date" style={sldsLabel()}>Tanggal *</label>
              <input
                id="date"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                style={sldsInput()}
                onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
              />
            </div>
            {/* Number */}
            <div>
              <label htmlFor="number" style={sldsLabel()}>Nomor Pekerjaan *</label>
              <input
                id="number"
                placeholder="JC.YYYY.MM.00001"
                value={workOrderNumber}
                onChange={(e) => setWorkOrderNumber(e.target.value)}
                style={sldsInput({ background: slds.bgLight })}
                onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
              />
            </div>
            {/* Batch No */}
            <div>
              <label htmlFor="batch" style={sldsLabel()}>Batch No (Job Costing)</label>
              <input
                id="batch"
                placeholder="Masukkan nomor batch..."
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                style={sldsInput()}
                onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
              />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label htmlFor="keterangan" style={sldsLabel()}>Keterangan</label>
            <input
              id="keterangan"
              placeholder="Deskripsi pekerjaan pesanan..."
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              style={sldsInput()}
              onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
              onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
            />
          </div>
        </div>
      </div>

      {/* ── Item Lines Table Card ── */}
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
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ClipboardList size={16} style={{ color: slds.brand }} />
              <h2 style={{ fontSize: 15, fontWeight: 600, color: slds.textPrimary }}>Detail Item Pekerjaan</h2>
            </div>
            <p style={{ fontSize: slds.fontSmall, color: slds.textSecondary, marginTop: 2 }}>
              Daftar item yang akan dikerjakan dalam pesanan ini
            </p>
          </div>
          <button
            onClick={addLine}
            style={sldsButton("outline", { height: 28, fontSize: slds.fontSmall, padding: "0 10px" })}
            onMouseEnter={(e) => (e.currentTarget.style.background = slds.bgLight)}
            onMouseLeave={(e) => (e.currentTarget.style.background = slds.bgWhite)}
          >
            <Plus size={13} />
            Tambah Item
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: slds.fontBase }}>
            <thead>
              <tr style={{ background: slds.bgLight }}>
                {["No.", "Nama Item", "Kode #", "Jumlah", "Satuan", ""].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 12px",
                      fontSize: slds.fontXSmall,
                      fontWeight: 600,
                      color: slds.textSecondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      textAlign: col === "Jumlah" ? "right" : "left",
                      borderBottom: `1px solid ${slds.borderLight}`,
                      whiteSpace: "nowrap",
                      ...(col === "No." ? { width: 50 } : {}),
                      ...(col === "Kode #" ? { width: 140 } : {}),
                      ...(col === "Jumlah" ? { width: 120 } : {}),
                      ...(col === "Satuan" ? { width: 100 } : {}),
                      ...(col === "" ? { width: 60 } : {}),
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lines.map((line, idx) => (
                <tr
                  key={line.id}
                  style={{ borderBottom: `1px solid ${slds.borderLight}`, transition: "background 100ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ fontSize: slds.fontSmall, color: slds.textSecondary }}>{idx + 1}</span>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ fontSize: slds.fontBase, color: line.itemName ? slds.textPrimary : slds.border, fontStyle: line.itemName ? "normal" : "italic" }}>
                      {line.itemName || "Pilih kode item"}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <input
                      placeholder="Pilih kode"
                      value={line.code}
                      onChange={(e) => updateLine(line.id, "code", e.target.value)}
                      list="item-codes"
                      style={sldsInput({ height: 30, fontSize: slds.fontSmall })}
                      onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
                    />
                    <datalist id="item-codes">
                      {inventoryItems.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </datalist>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <input
                      type="number"
                      placeholder="0"
                      value={line.quantity || ""}
                      onChange={(e) => updateLine(line.id, "quantity", parseInt(e.target.value) || 0)}
                      min={0}
                      style={sldsInput({ height: 30, fontSize: slds.fontSmall, textAlign: "right", fontFamily: "monospace" })}
                      onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
                    />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ fontSize: slds.fontSmall, color: slds.textSecondary }}>
                      {line.unit || "-"}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                    <button
                      onClick={() => removeLine(line.id)}
                      disabled={lines.length <= 1}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        border: "none",
                        background: "transparent",
                        color: lines.length <= 1 ? slds.border : slds.textSecondary,
                        cursor: lines.length <= 1 ? "not-allowed" : "pointer",
                        transition: "all 100ms",
                      }}
                      onMouseEnter={(e) => {
                        if (lines.length > 1) {
                          e.currentTarget.style.background = "#fef1f0"
                          e.currentTarget.style.color = slds.error
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = lines.length <= 1 ? slds.border : slds.textSecondary
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div
          style={{
            borderTop: `1px solid ${slds.borderLight}`,
            background: slds.bgLight,
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: slds.fontSmall, color: slds.textSecondary }}>
            Total {lines.filter((l) => l.code).length} item
          </span>
          <span style={{ fontSize: slds.fontSmall, color: slds.textSecondary }}>
            Total Jumlah:{" "}
            <strong style={{ color: slds.textPrimary, fontFamily: "monospace" }}>
              {lines.reduce((sum, l) => sum + l.quantity, 0)}
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}
