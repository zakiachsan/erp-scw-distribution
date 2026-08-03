"use client"

import { useState } from "react"
import { Printer, Download } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }
function renderValue(val: number) {
  if (val < 0) return `(Rp ${Math.abs(val).toLocaleString("id-ID")})`
  return formatIDR(val)
}

const periods = ["Januari 2026", "Februari 2026", "Maret 2026", "April 2026", "Mei 2026", "Juni 2026"]

const aktivaLancar = [
  { label: "Kas & Cash Equivalent", value: 28500000 },
  { label: "Bank BCA", value: 45200000 },
  { label: "Bank Mandiri", value: 12800000 },
  { label: "Piutang Usaha", value: 38400000 },
  { label: "Persediaan Barang Dagang", value: 52000000 },
  { label: "Uang Muka Pembelian", value: 5500000 },
  { label: "Perlengkapan", value: 1200000 },
]
const totalAktivaLancar = aktivaLancar.reduce((s, r) => s + r.value, 0)

const aktivaTetap = [
  { label: "Peralatan Kantor", value: 18000000 },
  { label: "Kendaraan Operasional", value: 85000000 },
  { label: "Inventaris", value: 4500000 },
  { label: "Akumulasi Penyusutan", value: -22500000 },
]
const totalAktivaTetap = aktivaTetap.reduce((s, r) => s + r.value, 0)

const totalAktiva = totalAktivaLancar + totalAktivaTetap

const liabPendek = [
  { label: "Utang Usaha (Supplier)", value: 28500000 },
  { label: "Utang Pajak (PPN/PPH)", value: 8200000 },
  { label: "Utang Gaji", value: 3200000 },
  { label: "Uang Muka Customer", value: 4500000 },
]
const totalLiabPendek = liabPendek.reduce((s, r) => s + r.value, 0)

const liabPanjang = [
  { label: "Utang Bank", value: 35000000 },
]
const totalLiabPanjang = liabPanjang.reduce((s, r) => s + r.value, 0)

const modalRows = [
  { label: "Modal Disetor", value: 80000000 },
  { label: "Laba Ditahan Tahun Lalu", value: 54760000 },
  { label: "Laba Bersih Tahun Berjalan", value: 54440000 },
]
const totalModal = modalRows.reduce((s, r) => s + r.value, 0)

const totalPasiva = totalLiabPendek + totalLiabPanjang + totalModal

const thStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", padding: "10px 16px", borderBottom: "2px solid #ecebea", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { fontSize: 13, color: "#001526", padding: "10px 16px", borderBottom: "1px solid #f0f0f0" }

export default function NeracaPage() {
  const [period, setPeriod] = useState("Juni 2026")
  const [view, setView] = useState<"standar" | "perbandingan" | "skontro">("standar")

  /* B6 — Perbandingan periode: Jun 2026 vs Jun 2025 side-by-side */
  const comparison = {
    current: { label: "30 Jun 2026", aktiva: totalAktiva, liab: totalLiabPendek + totalLiabPanjang, modal: totalModal },
    prior:   { label: "30 Jun 2025", aktiva: 235400000,   liab: 62100000,                      modal: 173300000 },
  }

  const renderSection = (title: string, color: string, rows: { label: string; value: number }[], totalLabel: string, totalValue: number) => (
    <>
      <tr>
        <td style={{ ...tdStyle, fontWeight: 700, color, background: "#f8f9fa" }} colSpan={2}>{title}</td>
      </tr>
      {rows.map(row => (
        <tr key={row.label}>
          <td style={{ ...tdStyle, paddingLeft: 32 }}>{row.label}</td>
          <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: row.value < 0 ? "#ea001e" : "#001526" }}>{renderValue(row.value)}</td>
        </tr>
      ))}
      <tr>
        <td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{totalLabel}</td>
        <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8", background: "#f8f9fa" }}>{formatIDR(totalValue)}</td>
      </tr>
    </>
  )

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526" }}>Neraca</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 4 }}>Balance Sheet — {view === "standar" ? "Per 30 Juni 2026" : view === "perbandingan" ? "Perbandingan Jun 2026 vs Jun 2025" : "Skontro (Horizontal)"}</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {view === "standar" && (
            <select value={period} onChange={e => setPeriod(e.target.value)} style={{ height: 34, padding: "0 12px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, outline: "none", background: "#fff" }}>
              {periods.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          )}
          <button onClick={() => alert("Download PDF placeholder")} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#001526", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Download size={14} /> PDF
          </button>
          <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}>
            <Printer size={14} /> Cetak
          </button>
        </div>
      </div>

      {/* B6 — Variant tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0", marginBottom: 16 }}>
        <TabBtn active={view === "standar"} onClick={() => setView("standar")}>Standar</TabBtn>
        <TabBtn active={view === "perbandingan"} onClick={() => setView("perbandingan")}>Perbandingan Periode</TabBtn>
        <TabBtn active={view === "skontro"} onClick={() => setView("skontro")}>Skontro</TabBtn>
      </div>

      {/* Perbandingan: side-by-side period comparison */}
      {view === "perbandingan" && (
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: "left" }}>KETERANGAN</th>
                <th style={{ ...thStyle, textAlign: "right" }}>{comparison.current.label}</th>
                <th style={{ ...thStyle, textAlign: "right" }}>{comparison.prior.label}</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Δ</th>
                <th style={{ ...thStyle, textAlign: "right" }}>% Δ</th>
              </tr>
            </thead>
            <tbody>
              <Row label="Total Aktiva" cur={comparison.current.aktiva} prior={comparison.prior.aktiva} />
              <Row label="Total Kewajiban" cur={comparison.current.liab} prior={comparison.prior.liab} />
              <Row label="Total Modal" cur={comparison.current.modal} prior={comparison.prior.modal} />
              <Row label="TOTAL PASIVA" cur={comparison.current.liab + comparison.current.modal} prior={comparison.prior.liab + comparison.prior.modal} bold />
            </tbody>
          </table>
        </div>
      )}

      {/* Skontro: side-by-side DEBIT (Aktiva) and KREDIT (Kewajiban+Modal) */}
      {view === "skontro" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: "#0176d3", color: "#fff", fontWeight: 700, fontSize: 14 }}>DEBIT — AKTIVA</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: "left" }}>AKUN</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>NOMINAL</th>
                </tr>
              </thead>
              <tbody>
                {aktivaLancar.map((r, i) => <tr key={r.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc" }}><td style={tdStyle}>{r.label}</td><td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{renderValue(r.value)}</td></tr>)}
                <tr><td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8" }}>Sub Total Aktiva Lancar</td><td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8" }}>{formatIDR(totalAktivaLancar)}</td></tr>
                {aktivaTetap.map((r, i) => <tr key={r.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc" }}><td style={tdStyle}>{r.label}</td><td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{renderValue(r.value)}</td></tr>)}
                <tr><td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8" }}>Sub Total Aktiva Tetap</td><td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8" }}>{formatIDR(totalAktivaTetap)}</td></tr>
                <tr><td style={{ ...tdStyle, fontWeight: 700, fontSize: 14, background: "#eef4ff" }}>TOTAL DEBIT</td><td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 14, fontFamily: "monospace", background: "#eef4ff", color: "#0176d3" }}>{formatIDR(totalAktiva)}</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: "#7b4c9e", color: "#fff", fontWeight: 700, fontSize: 14 }}>KREDIT — KEWAJIBAN + MODAL</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: "left" }}>AKUN</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>NOMINAL</th>
                </tr>
              </thead>
              <tbody>
                {liabPendek.map((r, i) => <tr key={r.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc" }}><td style={tdStyle}>{r.label}</td><td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{renderValue(r.value)}</td></tr>)}
                <tr><td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8" }}>Sub Total Kewajiban Pendek</td><td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8" }}>{formatIDR(totalLiabPendek)}</td></tr>
                {liabPanjang.map((r, i) => <tr key={r.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc" }}><td style={tdStyle}>{r.label}</td><td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{renderValue(r.value)}</td></tr>)}
                <tr><td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8" }}>Sub Total Kewajiban Panjang</td><td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8" }}>{formatIDR(totalLiabPanjang)}</td></tr>
                {modalRows.map((r, i) => <tr key={r.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc" }}><td style={tdStyle}>{r.label}</td><td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{renderValue(r.value)}</td></tr>)}
                <tr><td style={{ ...tdStyle, fontWeight: 700, borderTop: "1px solid #d8d8d8" }}>Sub Total Modal</td><td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontFamily: "monospace", borderTop: "1px solid #d8d8d8" }}>{formatIDR(totalModal)}</td></tr>
                <tr><td style={{ ...tdStyle, fontWeight: 700, fontSize: 14, background: "#e8f5e9" }}>TOTAL KREDIT</td><td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 14, fontFamily: "monospace", background: "#e8f5e9", color: "#059669" }}>{formatIDR(totalPasiva)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Standar: original vertical balance sheet */}
      {view === "standar" && (
      <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "60%" }}>KETERANGAN</th>
              <th style={{ ...thStyle, textAlign: "right", width: "40%" }}>NOMINAL</th>
            </tr>
          </thead>
          <tbody>
            {/* AKTIVA */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#0176d3", color: "#fff" }} colSpan={2}>AKTIVA</td>
            </tr>
            {renderSection("Aktiva Lancar", "#0176d3", aktivaLancar, "Total Aktiva Lancar", totalAktivaLancar)}
            {renderSection("Aktiva Tetap", "#0176d3", aktivaTetap, "Total Aktiva Tetap", totalAktivaTetap)}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#eef4ff" }}>TOTAL AKTIVA</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 15, fontFamily: "monospace", background: "#eef4ff", color: "#0176d3" }}>{formatIDR(totalAktiva)}</td>
            </tr>

            {/* PASIVA */}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#7b4c9e", color: "#fff" }} colSpan={2}>PASIVA</td>
            </tr>
            {renderSection("Liabilitas Jangka Pendek", "#7b4c9e", liabPendek, "Total Liabilitas Jangka Pendek", totalLiabPendek)}
            {renderSection("Liabilitas Jangka Panjang", "#7b4c9e", liabPanjang, "Total Liabilitas Jangka Panjang", totalLiabPanjang)}
            {renderSection("Modal", "#059669", modalRows, "Total Modal", totalModal)}
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700, fontSize: 15, background: "#e8f5e9" }}>TOTAL PASIVA</td>
              <td style={{ ...tdStyle, textAlign: "right", fontWeight: 700, fontSize: 15, fontFamily: "monospace", background: "#e8f5e9", color: "#059669" }}>{formatIDR(totalPasiva)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )}
    </div>
  )
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 18px", fontSize: 13, fontWeight: active ? 600 : 400,
        background: "transparent", color: active ? "#0176d3" : "#666",
        border: "none", borderBottom: active ? "2px solid #0176d3" : "2px solid transparent",
        marginBottom: -1, cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}

function Row({ label, cur, prior, bold }: { label: string; cur: number; prior: number; bold?: boolean }) {
  const delta = cur - prior
  const pct = (delta / prior) * 100
  return (
    <tr style={{ background: bold ? "#eef4ff" : undefined }}>
      <td style={{ ...tdStyle, fontWeight: bold ? 700 : 500, color: bold ? "#0176d3" : "#001526" }}>{label}</td>
      <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: bold ? 700 : 400 }}>{formatIDR(cur)}</td>
      <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: "#666" }}>{formatIDR(prior)}</td>
      <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: delta >= 0 ? "#0d7a3d" : "#c1342b" }}>{delta >= 0 ? "+" : ""}{formatIDR(delta)}</td>
      <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: delta >= 0 ? "#0d7a3d" : "#c1342b", fontWeight: bold ? 700 : 400 }}>{pct >= 0 ? "+" : ""}{pct.toFixed(1)}%</td>
    </tr>
  )
}
