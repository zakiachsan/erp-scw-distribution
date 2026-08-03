"use client"

/* Shared "Buat Baru" modal — slim create form for accounting sales/purchasing sub-pages.
 * Drop in <BuatBaruModal open={...} onOpenChange={...} title="..." fields={...} />
 * Each field has: key, label, type ("text"|"number"|"date"|"select"|"textarea"), options?, required?
 * For purchasing, accepts `fromRef` to show "Dari PO: PO-xxxx" badge.
 * Saves to local state only — shows toast on save.
 *
 * Uses `key` reset (recommended by React docs) to clear state when reopened —
 * avoids the "setState in effect" pitfall.
 */

import { useState, useMemo, useEffect } from "react"
import { Plus, X, Check } from "lucide-react"

export interface BuatBaruField {
  key: string
  label: string
  type: "text" | "number" | "date" | "select" | "textarea"
  options?: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
  defaultValue?: string | number
}

export interface BuatBaruModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  /** Subtitle shown under title (e.g. "Buat penawaran penjualan baru") */
  subtitle?: string
  fields: BuatBaruField[]
  /** Optional pre-fill from upstream document — shown as badge */
  fromRef?: string
  /** Item table mini-fields (for documents with item rows) */
  itemFields?: { key: string; label: string; type: "text" | "number"; defaultValue?: string | number }[]
  /** Submit handler — receives the full data object */
  onSave: (data: Record<string, string | number>) => void
}

const overlayStyle: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 50,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
}
const panelStyle: React.CSSProperties = {
  background: "#fff", borderRadius: 8, width: "100%", maxWidth: 720,
  maxHeight: "92vh", overflow: "auto", boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
}
const headerStyle: React.CSSProperties = {
  padding: "16px 22px", borderBottom: "1px solid #e0e0e0",
  display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
}
const inputStyle: React.CSSProperties = {
  height: 34, padding: "0 10px", fontSize: 13, border: "1px solid #d8d8d8",
  borderRadius: 6, outline: "none", width: "100%", boxSizing: "border-box", background: "#fff",
}
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const, backgroundPosition: "right 10px center",
  paddingRight: 28, cursor: "pointer",
}
const labelStyle: React.CSSProperties = { fontSize: 12, color: "#444746", fontWeight: 600, marginBottom: 4, display: "block" }
const fieldRow: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 0 }

function buildInitialData(fields: BuatBaruField[]): Record<string, string | number> {
  const init: Record<string, string | number> = {}
  fields.forEach((f) => {
    if (f.defaultValue !== undefined) init[f.key] = f.defaultValue
    else if (f.type === "number") init[f.key] = 0
    else init[f.key] = ""
  })
  return init
}

function buildInitialItems(itemFields?: BuatBaruModalProps["itemFields"]) {
  return itemFields ? [{ nama: "", qty: 1, harga: 0 }] : []
}

export function BuatBaruModal({
  open, onOpenChange, title, subtitle, fields, fromRef, itemFields, onSave,
}: BuatBaruModalProps) {
  /* Initial values via lazy initializer. The parent should pass a fresh `key` to reset
   * state between opens (recommended React pattern — see https://react.dev/learn/you-might-not-need-an-effect).
   * For simplicity here we keep stale state across re-opens; the form fields overwrite on edit. */
  const [data, setData] = useState<Record<string, string | number>>(() => buildInitialData(fields))
  const [items, setItems] = useState(() => buildInitialItems(itemFields))
  const [toast, setToast] = useState<string | null>(null)

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const total = useMemo(
    () => items.reduce((s, it) => s + (it.qty || 0) * (it.harga || 0), 0),
    [items]
  )

  if (!open) return null

  const handleSubmit = () => {
    onSave({ ...data, __items: items.length, __total: total } as unknown as Record<string, string | number>)
    setToast("Data tersimpan (dummy)")
  }

  return (
    <div>
      <div style={overlayStyle} onClick={() => onOpenChange(false)}>
        <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div style={headerStyle}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#001526", margin: 0 }}>{title}</h2>
                {fromRef && (
                  <span style={{
                    padding: "3px 10px", fontSize: 11, fontWeight: 600,
                    background: "#eef4ff", color: "#0176d3",
                    border: "1px solid #c2dbf5", borderRadius: 4,
                  }}>
                    Dari PO: {fromRef}
                  </span>
                )}
              </div>
              {subtitle && <p style={{ fontSize: 12, color: "#666", margin: "4px 0 0" }}>{subtitle}</p>}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                padding: 4, color: "#666", borderRadius: 4,
              }}
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form fields */}
          <div style={{ padding: "16px 22px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 16px" }}>
              {fields.map((f) => (
                <div key={f.key} style={fieldRow}>
                  <label style={labelStyle}>
                    {f.label}{f.required && <span style={{ color: "#ea001e" }}> *</span>}
                  </label>
                  {f.type === "select" ? (
                    <select
                      style={selectStyle}
                      value={String(data[f.key] ?? "")}
                      onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
                    >
                      <option value="">Pilih...</option>
                      {(f.options || []).map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      style={{ ...inputStyle, height: "auto", padding: "8px 10px", resize: "vertical", minHeight: 60 }}
                      value={String(data[f.key] ?? "")}
                      placeholder={f.placeholder}
                      onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      style={inputStyle}
                      value={String(data[f.key] ?? "")}
                      placeholder={f.placeholder}
                      onChange={(e) => setData({
                        ...data,
                        [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                      })}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Items mini-table */}
            {itemFields && (
              <div style={{ marginTop: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#001526" }}>Rincian Item</span>
                  <button
                    onClick={() => setItems([...items, { nama: "", qty: 1, harga: 0 }])}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      padding: "4px 10px", fontSize: 11, fontWeight: 600,
                      background: "#eef4ff", color: "#0176d3",
                      border: "1px solid #c2dbf5", borderRadius: 4, cursor: "pointer",
                    }}
                  >
                    <Plus size={11} /> Tambah Baris
                  </button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th style={labelStyle}>Item</th>
                      <th style={{ ...labelStyle, width: 80, textAlign: "right" }}>Qty</th>
                      <th style={{ ...labelStyle, width: 120, textAlign: "right" }}>Harga</th>
                      <th style={{ ...labelStyle, width: 120, textAlign: "right" }}>Total</th>
                      <th style={{ width: 30 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: "4px 4px 4px 0" }}>
                          <input
                            type="text"
                            style={inputStyle}
                            placeholder="Nama barang..."
                            value={it.nama}
                            onChange={(e) => {
                              const next = [...items]; next[idx] = { ...next[idx], nama: e.target.value }; setItems(next)
                            }}
                          />
                        </td>
                        <td style={{ padding: "4px 4px" }}>
                          <input
                            type="number"
                            style={{ ...inputStyle, textAlign: "right" }}
                            value={it.qty}
                            onChange={(e) => {
                              const next = [...items]; next[idx] = { ...next[idx], qty: Number(e.target.value) }; setItems(next)
                            }}
                          />
                        </td>
                        <td style={{ padding: "4px 4px" }}>
                          <input
                            type="number"
                            style={{ ...inputStyle, textAlign: "right" }}
                            value={it.harga}
                            onChange={(e) => {
                              const next = [...items]; next[idx] = { ...next[idx], harga: Number(e.target.value) }; setItems(next)
                            }}
                          />
                        </td>
                        <td style={{ padding: "4px 4px", textAlign: "right", fontFamily: "monospace", fontWeight: 600 }}>
                          Rp {(it.qty * it.harga).toLocaleString("id-ID")}
                        </td>
                        <td style={{ padding: "4px 0 4px 4px" }}>
                          <button
                            onClick={() => setItems(items.filter((_, i) => i !== idx))}
                            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ea001e", padding: 2 }}
                            aria-label="Hapus baris"
                          >
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 20, marginTop: 10, paddingTop: 8, borderTop: "1px solid #e0e0e0", fontSize: 13 }}>
                  <span>Sub Total: <b>Rp {total.toLocaleString("id-ID")}</b></span>
                  <span style={{ color: "#0176d3", fontWeight: 700 }}>Total: Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: "12px 22px", borderTop: "1px solid #e0e0e0",
            display: "flex", justifyContent: "flex-end", gap: 10,
          }}>
            <button
              onClick={() => onOpenChange(false)}
              style={{
                padding: "8px 16px", fontSize: 13, fontWeight: 600,
                background: "#fff", color: "#444746",
                border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer",
              }}
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 16px", fontSize: 13, fontWeight: 600,
                background: "#0176d3", color: "#fff",
                border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer",
              }}
            >
              <Check size={14} /> Simpan
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 60,
          padding: "12px 18px", background: "#059669", color: "#fff",
          borderRadius: 8, fontSize: 13, fontWeight: 600,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  )
}
