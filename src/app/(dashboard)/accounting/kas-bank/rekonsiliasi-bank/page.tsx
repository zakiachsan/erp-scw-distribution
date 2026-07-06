"use client"

import { useState } from "react"
import { RefreshCw, Search, Mic } from "lucide-react"

export default function RekonsiliasiBankPage() {
  const [akunDipilih, setAkunDipilih] = useState("")
  const [tanggalAwal, setTanggalAwal] = useState("29/06/2026")
  const [tanggalAkhir, setTanggalAkhir] = useState("06/07/2026")
  const [showData, setShowData] = useState(false)
  const dateInputStyle = { padding: "5px 8px", fontSize: 11, border: "1px solid #d8d8d8", borderRadius: 4, outline: "none", width: 110, background: "#fff" }

  const handleRefresh = () => {
    if (akunDipilih) setShowData(true)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div><h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Rekonsiliasi Bank</h1><p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Rekonsiliasi saldo bank dengan buku besar</p></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12 }}>
          <div style={{ position: "relative", width: 220 }}><Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#999" }} /><input type="text" placeholder="Cari/Pilih Bank..." value={akunDipilih} onChange={(e) => setAkunDipilih(e.target.value)} style={{ padding: "6px 8px 6px 28px", fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 4, width: "100%", outline: "none", boxSizing: "border-box" }} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input type="text" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} style={dateInputStyle} />
            <span style={{ fontSize: 11, color: "#666" }}>s/d</span>
            <input type="text" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} style={dateInputStyle} />
          </div>
          <button onClick={handleRefresh} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 4, cursor: "pointer" }}><RefreshCw size={13} /></button>
          <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "#ffc107", color: "#fff", border: "1px solid #ffc107", borderRadius: 4, cursor: "pointer" }}><Mic size={13} /></button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#f5f5f5", padding: "16px 20px" }}>
        {!showData ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            </div>
            <p style={{ fontSize: 13, color: "#666", textAlign: "center", maxWidth: 400, lineHeight: 1.5 }}>
              Pilih Bank yang akan direkonsiliasi kemudian, klik button &apos;Refresh&apos; untuk memperbaharui data
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, height: "100%" }}>
            {/* Left: Rekening Bank */}
            <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #d8d8d8", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "3px solid #0176d3" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, background: "#0176d3", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" /></svg>
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>REKENING BANK</h3>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead><tr style={{ background: "#f5f5f5" }}>
                    <th style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, fontSize: 10 }}>Tanggal</th>
                    <th style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, fontSize: 10 }}>Keterangan</th>
                    <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: 600, fontSize: 10 }}>Mutasi</th>
                    <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: 600, fontSize: 10 }}>Saldo</th>
                  </tr></thead>
                  <tbody><tr><td colSpan={4} style={{ padding: 30, textAlign: "center", color: "#888", fontSize: 12 }}>Belum ada data</td></tr></tbody>
                </table>
              </div>
            </div>

            {/* Right: Jurnal Accurate */}
            <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #d8d8d8", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "3px solid #e53935" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, background: "#e53935", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>A</span>
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#001526" }}>JURNAL ACCURATE</h3>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead><tr style={{ background: "#f5f5f5" }}>
                    <th style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, fontSize: 10 }}>Tanggal</th>
                    <th style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, fontSize: 10 }}>Keterangan</th>
                    <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: 600, fontSize: 10 }}>Mutasi</th>
                    <th style={{ padding: "6px 8px", textAlign: "right", fontWeight: 600, fontSize: 10 }}>Saldo</th>
                  </tr></thead>
                  <tbody><tr><td colSpan={4} style={{ padding: 30, textAlign: "center", color: "#888", fontSize: 12 }}>Belum ada data</td></tr></tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
