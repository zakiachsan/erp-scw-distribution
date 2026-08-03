"use client"

/* Accurate-style Filter Dialog — per Revisi 30Jul26.
 * Reference: image17/24/29 — kolom + operator + nilai + simpan + multi-row stack.
 * Used by Laporan Penjualan, Laporan Pembelian, Laporan Hutang Piutang.
 */

import { useState } from "react"
import { X, Plus, Trash2, Check } from "lucide-react"

export interface FilterRule {
  id: string
  column: string
  operator: string
  value: string
}

export interface ReportFilterColumn {
  value: string
  label: string
}

export interface ReportFilterBuilderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  columns: ReportFilterColumn[]
  /** Controlled rules — pass in current + a setter to persist */
  rules: FilterRule[]
  onApply: (rules: FilterRule[]) => void
}

const OPERATORS: { value: string; label: string }[] = [
  { value: "Adalah",                 label: "Adalah" },
  { value: "Tidak mencakup",         label: "Tidak mencakup" },
  { value: "Berisi kata",            label: "Berisi kata" },
  { value: "Tidak berisi kata",      label: "Tidak berisi kata" },
  { value: "Dimulai dengan",         label: "Dimulai dengan" },
  { value: "Tidak dimulai dengan",   label: "Tidak dimulai dengan" },
  { value: "Diakhiri dengan",        label: "Diakhiri dengan" },
  { value: "Tidak diakhiri dengan",  label: "Tidak diakhiri dengan" },
  { value: "Kosong",                 label: "Kosong" },
  { value: "Tidak kosong",           label: "Tidak kosong" },
]

const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }
const panelStyle: React.CSSProperties = { background: "#fff", borderRadius: 8, width: "100%", maxWidth: 640, maxHeight: "92vh", overflow: "auto", boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }
const headerStyle: React.CSSProperties = { padding: "14px 20px", borderBottom: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "space-between" }
const selectStyle: React.CSSProperties = { height: 32, padding: "0 26px 0 8px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, background: "#fff", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 8px center" }
const inputStyle: React.CSSProperties = { height: 32, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box" as const }

function newRule(columns: ReportFilterColumn[]): FilterRule {
  return {
    id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    column: columns[0]?.value ?? "",
    operator: "Adalah",
    value: "",
  }
}

export function ReportFilterBuilder({ open, onOpenChange, columns, rules, onApply }: ReportFilterBuilderProps) {
  const [draft, setDraft] = useState<FilterRule[]>(rules.length ? rules : [])

  if (!open) return null

  const addRow = () => setDraft([...draft, newRule(columns)])
  const updateRow = (id: string, patch: Partial<FilterRule>) => setDraft(draft.map((r) => r.id === id ? { ...r, ...patch } : r))
  const removeRow = (id: string) => setDraft(draft.filter((r) => r.id !== id))
  const apply = () => { onApply(draft); onOpenChange(false) }
  const reset = () => setDraft([])

  return (
    <div style={overlayStyle} onClick={() => onOpenChange(false)}>
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#001526", margin: 0 }}>Penyaringan Data</h2>
            <p style={{ fontSize: 12, color: "#666", margin: "2px 0 0" }}>Atur filter untuk mempersempit tampilan laporan</p>
          </div>
          <button onClick={() => onOpenChange(false)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "#666", borderRadius: 4 }} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        {/* Filter rows */}
        <div style={{ padding: "16px 20px" }}>
          {draft.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#888", fontSize: 13, border: "1px dashed #d0d0d0", borderRadius: 6 }}>
              Belum ada filter. Klik &ldquo;Tambah Baris&rdquo; untuk membuat aturan baru.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {draft.map((r, idx) => (
                <div key={r.id} style={{ display: "grid", gridTemplateColumns: "32px 1.2fr 1.2fr 1.5fr 32px", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#666", textAlign: "center" }}>{idx + 1}</span>
                  <select style={selectStyle} value={r.column} onChange={(e) => updateRow(r.id, { column: e.target.value })}>
                    {columns.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <select style={selectStyle} value={r.operator} onChange={(e) => updateRow(r.id, { operator: e.target.value })}>
                    {OPERATORS.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
                  </select>
                  <input
                    style={inputStyle}
                    placeholder="Nilai..."
                    value={r.value}
                    onChange={(e) => updateRow(r.id, { value: e.target.value })}
                    disabled={r.operator === "Kosong" || r.operator === "Tidak kosong"}
                  />
                  <button onClick={() => removeRow(r.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ea001e", padding: 4, borderRadius: 4 }} aria-label="Hapus aturan">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={addRow}
            style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 12px", fontSize: 12, fontWeight: 600, background: "#eef4ff", color: "#0176d3", border: "1px solid #c2dbf5", borderRadius: 4, cursor: "pointer" }}
          >
            <Plus size={12} /> Tambah Baris
          </button>
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #e0e0e0", display: "flex", justifyContent: "space-between", gap: 10 }}>
          <button onClick={reset} style={{ padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#c1342b", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>Reset</button>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => onOpenChange(false)} style={{ padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>Batal</button>
            <button onClick={apply} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
              <Check size={14} /> Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Helper: apply a FilterRule[] to a row using substring matching for the common operators.
 * Other operators return true (UI-only / no narrowing). */
export function applyFilters<T extends Record<string, unknown>>(rows: T[], rules: FilterRule[]): T[] {
  if (!rules.length) return rows
  return rows.filter((row) => rules.every((rule) => {
    if (!rule.column) return true
    const cell = String(row[rule.column] ?? "").toLowerCase()
    const val = rule.value.toLowerCase().trim()
    switch (rule.operator) {
      case "Adalah":               return cell === val
      case "Tidak mencakup":       return !cell.includes(val)
      case "Berisi kata":          return cell.includes(val)
      case "Tidak berisi kata":    return !cell.includes(val)
      case "Dimulai dengan":       return cell.startsWith(val)
      case "Tidak dimulai dengan": return !cell.startsWith(val)
      case "Diakhiri dengan":      return cell.endsWith(val)
      case "Tidak diakhiri dengan":return !cell.endsWith(val)
      case "Kosong":               return cell.trim() === ""
      case "Tidak kosong":         return cell.trim() !== ""
      default:                     return true
    }
  }))
}
