"use client"

import { useState } from "react"
import { RefreshCw, Search, Printer, Building, MapPin } from "lucide-react"
import { dummyFixedAssets } from "@/lib/accounting-dummy-data"

function formatIDR(n: number) { return `Rp ${n.toLocaleString('id-ID')}` }

const thStyle: React.CSSProperties = { padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const tdRight: React.CSSProperties = { ...tdStyle, textAlign: "right", fontFamily: "monospace", fontSize: 12 }
const rowStyle: React.CSSProperties = { borderBottom: "1px solid #f0f0f0" }
const btnIconOutline: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "#fff", color: "#0176d3", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }

// Hard-coded dummy 5 locations grouped from FixedAsset data
const locationGroups: { lokasi: string; assetIds: string[] }[] = [
  { lokasi: "Kantor Pusat", assetIds: ["fa-3", "fa-4", "fa-5", "fa-6", "fa-9", "fa-10"] },
  { lokasi: "Gudang Pusat", assetIds: ["fa-1"] },
  { lokasi: "Workshop Bandung", assetIds: ["fa-2"] },
  { lokasi: "Gudang Surabaya", assetIds: ["fa-7"] },
  { lokasi: "Surabaya", assetIds: ["fa-8"] },
]

export default function AsetPerLokasiPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"group" | "flat">("group")

  const allLocations = locationGroups.map(g => {
    const assets = g.assetIds.map(id => dummyFixedAssets.find(a => a.id === id)).filter(Boolean) as typeof dummyFixedAssets
    const totalAset = assets.length
    const totalNilai = assets.reduce((s, a) => s + a.totalNilai, 0)
    const totalAkumulasi = assets.reduce((s, a) => s + (a.totalNilai - a.nilaiBuku), 0)
    const totalNilaiBuku = assets.reduce((s, a) => s + a.nilaiBuku, 0)
    return { lokasi: g.lokasi, assets, totalAset, totalNilai, totalAkumulasi, totalNilaiBuku }
  })

  const filteredLocations = allLocations.filter(l =>
    !search || l.lokasi.toLowerCase().includes(search.toLowerCase()) || l.assets.some(a => a.nama.toLowerCase().includes(search.toLowerCase()))
  )

  const grandTotalNilai = allLocations.reduce((s, l) => s + l.totalNilai, 0)
  const grandTotalNilaiBuku = allLocations.reduce((s, l) => s + l.totalNilaiBuku, 0)
  const grandTotalAset = allLocations.reduce((s, l) => s + l.totalAset, 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>Aset per Lokasi</h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Rekapitulasi nilai aset tetap dikelompokkan berdasarkan lokasi penempatan</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16, marginBottom: 12 }}>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Jumlah Lokasi</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0176d3" }}>{allLocations.length}</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Aset</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#001526" }}>{grandTotalAset}</p>
            <p style={{ fontSize: 11, color: "#888", marginTop: 2 }}>unit</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Nilai Perolehan</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#001526" }}>{formatIDR(grandTotalNilai)}</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "14px 16px" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", marginBottom: 4 }}>Total Nilai Buku</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>{formatIDR(grandTotalNilaiBuku)}</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>
          <div style={{ display: "inline-flex", borderRadius: 6, overflow: "hidden", border: "1px solid #d8d8d8" }}>
            <button onClick={() => setView("group")} style={{ padding: "0 14px", height: 32, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: view === "group" ? "#0176d3" : "#fff", color: view === "group" ? "#fff" : "#444746" }}>Per Lokasi</button>
            <button onClick={() => setView("flat")} style={{ padding: "0 14px", height: 32, fontSize: 12, fontWeight: 600, border: "none", borderLeft: "1px solid #d8d8d8", cursor: "pointer", background: view === "flat" ? "#0176d3" : "#fff", color: view === "flat" ? "#fff" : "#444746" }}>Detail Semua</button>
          </div>
          <div style={{ flex: 1 }} />
          <button style={btnIconOutline}><RefreshCw size={14} /></button>
          <button style={btnIconOutline}><Printer size={14} /></button>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input type="text" placeholder="Cari lokasi / aset..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: "#fff", padding: "0 20px 20px" }}>
        {view === "group" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredLocations.map(loc => (
              <div key={loc.lokasi} style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "12px 16px", background: "linear-gradient(to right, #f8f9fa, #fff)", borderBottom: "1px solid #ecebea", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#e8f1fb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Building size={18} style={{ color: "#0176d3" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#001526", margin: 0 }}>{loc.lokasi}</h3>
                    <p style={{ fontSize: 11, color: "#666", margin: "2px 0 0 0" }}>{loc.totalAset} aset terdaftar</p>
                  </div>
                  <div style={{ display: "flex", gap: 24, fontSize: 11 }}>
                    <div>
                      <p style={{ color: "#666", margin: 0 }}>Nilai Perolehan</p>
                      <p style={{ fontFamily: "monospace", fontWeight: 700, color: "#001526", margin: "2px 0 0 0" }}>{formatIDR(loc.totalNilai)}</p>
                    </div>
                    <div>
                      <p style={{ color: "#666", margin: 0 }}>Akumulasi Penyusutan</p>
                      <p style={{ fontFamily: "monospace", fontWeight: 700, color: "#ea001e", margin: "2px 0 0 0" }}>({formatIDR(loc.totalAkumulasi)})</p>
                    </div>
                    <div>
                      <p style={{ color: "#666", margin: 0 }}>Nilai Buku</p>
                      <p style={{ fontFamily: "monospace", fontWeight: 700, color: "#059669", margin: "2px 0 0 0" }}>{formatIDR(loc.totalNilaiBuku)}</p>
                    </div>
                  </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>
                    {[
                      { l: "Kode Aset", w: "12%" }, { l: "Nama Aset", w: "30%" },
                      { l: "Kategori", w: "15%" }, { l: "Tgl Beli", w: "13%" },
                      { l: "Qty", w: "5%" }, { l: "Nilai Perolehan", w: "15%" }, { l: "Nilai Buku", w: "10%" },
                    ].map(c => <th key={c.l} style={{ ...thStyle, width: c.w, textAlign: c.l.includes("Nilai") || c.l === "Qty" ? "right" : "left" }}>{c.l}</th>)}
                  </tr></thead>
                  <tbody>
                    {loc.assets.map((a) => (
                      <tr key={a.id} style={rowStyle}>
                        <td style={{ ...tdStyle, fontFamily: "monospace", color: "#0176d3", fontWeight: 600 }}>{a.nomor}</td>
                        <td style={{ ...tdStyle, fontWeight: 500 }}>{a.nama}</td>
                        <td style={{ ...tdStyle, color: "#444746", fontSize: 12 }}>{a.kategori}</td>
                        <td style={{ ...tdStyle, fontSize: 12 }}>{a.tanggalBeli}</td>
                        <td style={{ ...tdStyle, textAlign: "right" }}>{a.kuantitas}</td>
                        <td style={tdRight}>{formatIDR(a.totalNilai)}</td>
                        <td style={{ ...tdRight, color: a.status === "Disposed" ? "#999" : "#059669" }}>{formatIDR(a.nilaiBuku)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #ecebea", borderRadius: 8, overflow: "hidden" }}>
            <thead><tr>
              {([
                { l: "#" }, { l: "Lokasi" }, { l: "Kode Aset" }, { l: "Nama Aset" },
                { l: "Kategori" }, { l: "Nilai Perolehan", align: "right" as const }, { l: "Nilai Buku", align: "right" as const },
              ] as { l: string; align?: "left" | "right" }[]).map(c => <th key={c.l} style={{ ...thStyle, textAlign: c.align ?? "left" }}>{c.l}</th>)}
            </tr></thead>
            <tbody>
              {filteredLocations.flatMap((l) => l.assets.map((a) => (
                <tr key={a.id} style={rowStyle}>
                  <td style={{ ...tdStyle, color: "#444746" }}>•</td>
                  <td style={{ ...tdStyle, color: "#0176d3", fontWeight: 500 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} style={{ color: "#888" }} /> {l.lokasi}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, fontFamily: "monospace" }}>{a.nomor}</td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{a.nama}</td>
                  <td style={{ ...tdStyle, color: "#444746", fontSize: 12 }}>{a.kategori}</td>
                  <td style={tdRight}>{formatIDR(a.totalNilai)}</td>
                  <td style={{ ...tdRight, color: a.status === "Disposed" ? "#999" : "#059669" }}>{formatIDR(a.nilaiBuku)}</td>
                </tr>
              )))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
