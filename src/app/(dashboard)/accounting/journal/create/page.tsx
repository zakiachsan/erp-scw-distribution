"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, BookOpen, AlertCircle, CheckCircle2, Save, Send } from "lucide-react"

// ── Types ──
interface JournalLine {
  id: number
  accountCode: string
  accountName: string
  debit: number
  credit: number
}

// ── Static data ──
const chartOfAccounts = [
  { code: "1101", name: "Kas" },
  { code: "1102", name: "Bank BCA" },
  { code: "1103", name: "Bank Mandiri" },
  { code: "1201", name: "Persediaan Barang" },
  { code: "1202", name: "Piutang Usaha" },
  { code: "1301", name: "Perlengkapan Kantor" },
  { code: "1401", name: "Tanah" },
  { code: "1402", name: "Gedung" },
  { code: "1403", name: "Peralatan Produksi" },
  { code: "1404", name: "Kendaraan" },
  { code: "2101", name: "Utang Usaha" },
  { code: "2102", name: "Utang Bank" },
  { code: "2201", name: "PPh Terutang" },
  { code: "3101", name: "Modal Disetor" },
  { code: "3201", name: "Laba Ditahan" },
  { code: "4101", name: "Penjualan Produk" },
  { code: "4102", name: "Pendapatan Jasa" },
  { code: "5101", name: "Harga Pokok Penjualan" },
  { code: "6101", name: "Gaji Karyawan" },
  { code: "6102", name: "Sewa Gudang" },
  { code: "6103", name: "Listrik & Air" },
  { code: "6104", name: "Marketing & Promosi" },
  { code: "6105", name: "Transport & Pengiriman" },
  { code: "6106", name: "Perlengkapan Kantor" },
]

const transactionTypes = [
  "Penjualan",
  "Pembelian",
  "Pembayaran",
  "Penerimaan",
  "Biaya Operasional",
  "Penyesuaian",
  "Transfer",
  "Jurnal Umum",
]

// ── Helpers ──
const formatIDR = (amount: number): string =>
  amount === 0 ? "Rp 0" : `Rp ${amount.toLocaleString("id-ID")}`

const generateJournalNumber = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `JV.${year}.${month}.${seq}`
}

// ── Inline style constants (SLDS) ──
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

// ── SLDS-style components ──
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
    return {
      ...base,
      background: slds.brand,
      color: "#fff",
      border: `1px solid ${slds.brand}`,
    }
  }
  if (variant === "outline") {
    return {
      ...base,
      background: slds.bgWhite,
      color: slds.textPrimary,
      border: `1px solid ${slds.border}`,
    }
  }
  // ghost
  return {
    ...base,
    background: "transparent",
    color: slds.textSecondary,
    border: "1px solid transparent",
    padding: "0 8px",
  }
}

// ── Page component ──
export default function CreateJournalEntryPage() {
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split("T")[0])
  const [journalNumber, setJournalNumber] = useState(generateJournalNumber())
  const [isAutoNumber, setIsAutoNumber] = useState(true)
  const [transactionType, setTransactionType] = useState("")
  const [lines, setLines] = useState<JournalLine[]>([
    { id: 1, accountCode: "", accountName: "", debit: 0, credit: 0 },
    { id: 2, accountCode: "", accountName: "", debit: 0, credit: 0 },
  ])
  const [nextId, setNextId] = useState(3)

  const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0)
  const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0)
  const isBalanced = totalDebit === totalCredit && totalDebit > 0
  const difference = totalDebit - totalCredit

  const addLine = () => {
    setLines([...lines, { id: nextId, accountCode: "", accountName: "", debit: 0, credit: 0 }])
    setNextId(nextId + 1)
  }

  const removeLine = (id: number) => {
    if (lines.length <= 2) return
    setLines(lines.filter((line) => line.id !== id))
  }

  const updateLine = (id: number, field: keyof JournalLine, value: string | number) => {
    setLines(
      lines.map((line) => {
        if (line.id === id) {
          const updated = { ...line, [field]: value }
          if (field === "accountCode") {
            const account = chartOfAccounts.find((a) => a.code === value)
            updated.accountName = account?.name || ""
          }
          return updated
        }
        return line
      })
    )
  }

  const toggleAutoNumber = () => {
    if (isAutoNumber) {
      setIsAutoNumber(false)
    } else {
      setIsAutoNumber(true)
      setJournalNumber(generateJournalNumber())
    }
  }

  return (
    <div className="space-y-4">

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/accounting/journal"
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
              Buat Jurnal Baru
            </h1>
            <p style={{ fontSize: slds.fontBase, color: slds.textSecondary, marginTop: 2 }}>
              Tambah jurnal umum untuk pencatatan transaksi
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
            Terbitkan Jurnal
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

            {/* Journal Number */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <label htmlFor="number" style={sldsLabel({ marginBottom: 0 })}>Nomor Jurnal *</label>
                <button
                  type="button"
                  onClick={toggleAutoNumber}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: slds.fontXSmall,
                    fontWeight: 600,
                    color: slds.brand,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <span style={{ fontSize: 14, lineHeight: 1 }}>{isAutoNumber ? "✓" : "✎"}</span>
                  {isAutoNumber ? "Otomatis" : "Manual"}
                </button>
              </div>
              <input
                id="number"
                placeholder="JV.YYYY.MM.00001"
                value={journalNumber}
                onChange={(e) => setJournalNumber(e.target.value)}
                disabled={isAutoNumber}
                style={sldsInput({
                  background: isAutoNumber ? slds.bgLight : slds.bgWhite,
                  cursor: isAutoNumber ? "not-allowed" : "text",
                })}
                onFocus={(e) => {
                  if (!isAutoNumber) e.currentTarget.style.borderColor = slds.brand
                }}
                onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label style={sldsLabel()}>Tipe Transaksi *</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                style={sldsSelect()}
                onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
              >
                <option value="" disabled>Pilih tipe transaksi</option>
                {transactionTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Balance Alert ── */}
      {!isBalanced && (totalDebit > 0 || totalCredit > 0) && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: 14,
            background: "#fef7e0",
            border: "1px solid #f9e0a0",
            borderRadius: slds.radius,
          }}
        >
          <AlertCircle size={18} style={{ color: slds.warning, flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontWeight: 600, fontSize: slds.fontBase, color: "#9a6b00" }}>
              Jurnal tidak seimbang
            </p>
            <p style={{ fontSize: slds.fontSmall, color: "#9a6b00", marginTop: 2 }}>
              Selisih: {difference > 0 ? "+" : ""}
              {formatIDR(Math.abs(difference))}{" "}
              {difference > 0 ? "(Debit lebih besar)" : "(Kredit lebih besar)"}
            </p>
          </div>
        </div>
      )}

      {/* ── Balanced Success ── */}
      {isBalanced && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: 14,
            background: "#e8f5ed",
            border: "1px solid #a8d4b5",
            borderRadius: slds.radius,
          }}
        >
          <CheckCircle2 size={18} style={{ color: slds.success, flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontWeight: 600, fontSize: slds.fontBase, color: slds.success }}>
              Jurnal seimbang
            </p>
            <p style={{ fontSize: slds.fontSmall, color: slds.success, marginTop: 2 }}>
              Total Debit = Total Kredit = {formatIDR(totalDebit)}
            </p>
          </div>
        </div>
      )}

      {/* ── Journal Lines Table Card ── */}
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
              <BookOpen size={16} style={{ color: slds.brand }} />
              <h2 style={{ fontSize: 15, fontWeight: 600, color: slds.textPrimary }}>Detail Jurnal</h2>
            </div>
            <p style={{ fontSize: slds.fontSmall, color: slds.textSecondary, marginTop: 2 }}>
              Minimal 2 baris. Pastikan total debit = total kredit.
            </p>
          </div>
          <button
            onClick={addLine}
            style={sldsButton("outline", { height: 28, fontSize: slds.fontSmall, padding: "0 10px" })}
            onMouseEnter={(e) => (e.currentTarget.style.background = slds.bgLight)}
            onMouseLeave={(e) => (e.currentTarget.style.background = slds.bgWhite)}
          >
            <Plus size={13} />
            Tambah Baris
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: slds.fontBase }}>
            <thead>
              <tr style={{ background: slds.bgWhite }}>
                <th
                  style={{
                    padding: "10px 12px",
                    fontSize: slds.fontXSmall,
                    fontWeight: 600,
                    color: slds.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    textAlign: "left",
                    borderBottom: `1px solid ${slds.borderLight}`,
                    minWidth: 130,
                  }}
                >
                  No. Akun
                </th>
                <th
                  style={{
                    padding: "10px 12px",
                    fontSize: slds.fontXSmall,
                    fontWeight: 600,
                    color: slds.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    textAlign: "left",
                    borderBottom: `1px solid ${slds.borderLight}`,
                  }}
                >
                  Nama Akun
                </th>
                <th
                  style={{
                    padding: "10px 12px",
                    fontSize: slds.fontXSmall,
                    fontWeight: 600,
                    color: slds.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    textAlign: "right",
                    borderBottom: `1px solid ${slds.borderLight}`,
                    minWidth: 160,
                  }}
                >
                  Debit (Rp)
                </th>
                <th
                  style={{
                    padding: "10px 12px",
                    fontSize: slds.fontXSmall,
                    fontWeight: 600,
                    color: slds.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    textAlign: "right",
                    borderBottom: `1px solid ${slds.borderLight}`,
                    minWidth: 160,
                  }}
                >
                  Kredit (Rp)
                </th>
                <th
                  style={{
                    padding: "10px 12px",
                    borderBottom: `1px solid ${slds.borderLight}`,
                    width: 50,
                  }}
                />
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr
                  key={line.id}
                  style={{
                    borderBottom: `1px solid ${slds.borderLight}`,
                    transition: "background 100ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "8px 12px" }}>
                    <select
                      value={line.accountCode}
                      onChange={(e) => updateLine(line.id, "accountCode", e.target.value)}
                      style={sldsSelect({ height: 30, fontSize: slds.fontSmall })}
                      onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
                    >
                      <option value="" disabled>Pilih akun</option>
                      {chartOfAccounts.map((acc) => (
                        <option key={acc.code} value={acc.code}>
                          {acc.code}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <span
                      style={{
                        fontSize: slds.fontBase,
                        color: line.accountName ? slds.textPrimary : slds.border,
                        fontStyle: line.accountName ? "normal" : "italic",
                      }}
                    >
                      {line.accountName || "Pilih akun terlebih dahulu"}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <input
                      type="number"
                      placeholder="0"
                      value={line.debit || ""}
                      onChange={(e) => updateLine(line.id, "debit", parseInt(e.target.value) || 0)}
                      min={0}
                      style={sldsInput({
                        height: 30,
                        fontSize: slds.fontSmall,
                        textAlign: "right",
                        fontFamily: "monospace",
                      })}
                      onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
                    />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <input
                      type="number"
                      placeholder="0"
                      value={line.credit || ""}
                      onChange={(e) => updateLine(line.id, "credit", parseInt(e.target.value) || 0)}
                      min={0}
                      style={sldsInput({
                        height: 30,
                        fontSize: slds.fontSmall,
                        textAlign: "right",
                        fontFamily: "monospace",
                      })}
                      onFocus={(e) => (e.currentTarget.style.borderColor = slds.brand)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = slds.border)}
                    />
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                    <button
                      onClick={() => removeLine(line.id)}
                      disabled={lines.length <= 2}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        border: "none",
                        background: "transparent",
                        color: lines.length <= 2 ? slds.border : slds.textSecondary,
                        cursor: lines.length <= 2 ? "not-allowed" : "pointer",
                        transition: "all 100ms",
                      }}
                      onMouseEnter={(e) => {
                        if (lines.length > 2) {
                          e.currentTarget.style.background = "#fef1f0"
                          e.currentTarget.style.color = slds.error
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                        e.currentTarget.style.color = lines.length <= 2 ? slds.border : slds.textSecondary
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

        {/* Totals Summary */}
        <div
          style={{
            borderTop: `1px solid ${slds.borderLight}`,
            background: slds.bgLight,
            padding: "12px 20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 340,
              background: slds.bgWhite,
              border: `1px solid ${slds.borderLight}`,
              borderRadius: slds.radius,
              padding: 14,
            }}
          >
            {/* Total Debit */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span style={{ fontSize: slds.fontSmall, fontWeight: 600, color: slds.textSecondary }}>
                Total Debit:
              </span>
              <span style={{ fontSize: slds.fontBase, fontWeight: 700, color: slds.textPrimary, fontFamily: "monospace" }}>
                {formatIDR(totalDebit)}
              </span>
            </div>
            {/* Total Kredit */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span style={{ fontSize: slds.fontSmall, fontWeight: 600, color: slds.textSecondary }}>
                Total Kredit:
              </span>
              <span style={{ fontSize: slds.fontBase, fontWeight: 700, color: slds.textPrimary, fontFamily: "monospace" }}>
                {formatIDR(totalCredit)}
              </span>
            </div>
            {/* Selisih */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderTop: `1px solid ${slds.borderLight}`,
                marginTop: 4,
              }}
            >
              <span style={{ fontSize: slds.fontSmall, fontWeight: 600, color: slds.textSecondary }}>
                Selisih:
              </span>
              <span
                style={{
                  fontSize: slds.fontBase,
                  fontWeight: 700,
                  color: isBalanced ? slds.success : slds.error,
                  fontFamily: "monospace",
                }}
              >
                {isBalanced ? "Seimbang ✓" : formatIDR(Math.abs(difference))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
