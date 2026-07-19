"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Printer, Download, TrendingDown, Calendar, Building, DollarSign } from "lucide-react"

function formatIDR(n: number) { return `Rp ${n.toLocaleString("id-ID")}` }

const thStyle: React.CSSProperties = { padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", borderBottom: "1px solid #e0e0e0" }
const thRight: React.CSSProperties = { ...thStyle, textAlign: "right" }
const tdStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 13, color: "#001526" }
const tdMono: React.CSSProperties = { ...tdStyle, fontFamily: "monospace", fontSize: 12 }
const labelStyle: React.CSSProperties = { fontSize: 13, color: "#444746", minWidth: 180 }

interface AssetDetail {
  id: string
  nomor: string
  nama: string
  kategori: string
  tanggalBeli: string
  tanggalPakai: string
  hargaPerolehan: number
  nilaiBuku: number
  umurTahun: number
  umurBulan: number
  rasio: number
  metodePenyusutan: string
  akunAset: string
  akunAkumulasi: string
  akunBeban: string
  kuantitas: number
  asetTidakBerwujud: boolean
  nilaiSisa: number
  penyusutanPerTahun: { tahun: number; penyusutan: number; akumulasi: number; nilaiBuku: number }[]
}

const assetData: Record<string, AssetDetail> = {
  "FA-001": {
    id: "FA-001", nomor: "FA-001", nama: "Laptop Dell Latitude 5520", kategori: "Peralatan Kantor",
    tanggalBeli: "15/01/2025", tanggalPakai: "15/01/2025", hargaPerolehan: 18500000, nilaiBuku: 12800000,
    umurTahun: 4, umurBulan: 0, rasio: 25, metodePenyusutan: "Metode Garis Lurus",
    akunAset: "1501 - Peralatan Kantor", akunAkumulasi: "1601 - Akum. Penyusutan Peralatan", akunBeban: "6101 - Beban Penyusutan Peralatan",
    kuantitas: 5, asetTidakBerwujud: false, nilaiSisa: 500000,
    penyusutanPerTahun: [
      { tahun: 1, penyusutan: 4500000, akumulasi: 4500000, nilaiBuku: 14000000 },
      { tahun: 2, penyusutan: 4500000, akumulasi: 9000000, nilaiBuku: 9500000 },
      { tahun: 3, penyusutan: 4500000, akumulasi: 13500000, nilaiBuku: 5000000 },
      { tahun: 4, penyusutan: 4500000, akumulasi: 18000000, nilaiBuku: 500000 },
    ],
  },
  "FA-002": {
    id: "FA-002", nomor: "FA-002", nama: "Mobil Operasional Toyota Avanza", kategori: "Kendaraan",
    tanggalBeli: "01/06/2024", tanggalPakai: "01/06/2024", hargaPerolehan: 250000000, nilaiBuku: 180000000,
    umurTahun: 5, umurBulan: 0, rasio: 20, metodePenyusutan: "Metode Garis Lurus",
    akunAset: "1502 - Kendaraan", akunAkumulasi: "1602 - Akum. Penyusutan Kendaraan", akunBeban: "6102 - Beban Penyusutan Kendaraan",
    kuantitas: 2, asetTidakBerwujud: false, nilaiSisa: 25000000,
    penyusutanPerTahun: [
      { tahun: 1, penyusutan: 45000000, akumulasi: 45000000, nilaiBuku: 205000000 },
      { tahun: 2, penyusutan: 45000000, akumulasi: 90000000, nilaiBuku: 160000000 },
      { tahun: 3, penyusutan: 45000000, akumulasi: 135000000, nilaiBuku: 115000000 },
      { tahun: 4, penyusutan: 45000000, akumulasi: 180000000, nilaiBuku: 70000000 },
      { tahun: 5, penyusutan: 45000000, akumulasi: 225000000, nilaiBuku: 25000000 },
    ],
  },
  "FA-003": {
    id: "FA-003", nomor: "FA-003", nama: "Printer Canon imageRUNNER", kategori: "Peralatan Kantor",
    tanggalBeli: "10/03/2025", tanggalPakai: "10/03/2025", hargaPerolehan: 8500000, nilaiBuku: 7200000,
    umurTahun: 5, umurBulan: 0, rasio: 20, metodePenyusutan: "Metode Garis Lurus",
    akunAset: "1501 - Peralatan Kantor", akunAkumulasi: "1601 - Akum. Penyusutan Peralatan", akunBeban: "6101 - Beban Penyusutan Peralatan",
    kuantitas: 2, asetTidakBerwujud: false, nilaiSisa: 500000,
    penyusutanPerTahun: [
      { tahun: 1, penyusutan: 1600000, akumulasi: 1600000, nilaiBuku: 6900000 },
      { tahun: 2, penyusutan: 1600000, akumulasi: 3200000, nilaiBuku: 5300000 },
      { tahun: 3, penyusutan: 1600000, akumulasi: 4800000, nilaiBuku: 3700000 },
      { tahun: 4, penyusutan: 1600000, akumulasi: 6400000, nilaiBuku: 2100000 },
      { tahun: 5, penyusutan: 1600000, akumulasi: 8000000, nilaiBuku: 500000 },
    ],
  },
}

export default function AsetTetapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const data = assetData[id] || assetData["FA-001"]

  return (
    <div style={{ padding: "12px 20px", background: "#f5f5f5", minHeight: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <Link href="/accounting/aset-tetap/aset-tetap" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 6, border: "1px solid #d8d8d8", background: "#fff", color: "#444746", textDecoration: "none" }}>
          <ArrowLeft size={16} />
        </Link>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>{data.nama}</h1>
          <p style={{ fontSize: 13, color: "#444746" }}>Nomor: {data.nomor} | Kategori: {data.kategori}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", fontSize: 12, fontWeight: 600, border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", background: "#fff" }}>
            <Printer size={14} /> Print
          </button>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", fontSize: 12, fontWeight: 600, border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer", background: "#fff" }}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Info Aset */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e0e0e0", padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Building size={16} color="#0176d3" /> Informasi Aset
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Nama Aset", value: data.nama },
              { label: "Kategori", value: data.kategori },
              { label: "Kuantitas", value: `${data.kuantitas} unit` },
              { label: "Tanggal Beli", value: data.tanggalBeli },
              { label: "Tanggal Pakai", value: data.tanggalPakai },
              { label: "Aset Tidak Berwujud", value: data.asetTidakBerwujud ? "Ya" : "Tidak" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0", paddingBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#666" }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Penyusutan */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e0e0e0", padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingDown size={16} color="#0176d3" /> Informasi Penyusutan
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Metode Penyusutan", value: data.metodePenyusutan },
              { label: "Umur Aset", value: `${data.umurTahun} Tahun ${data.umurBulan} Bulan` },
              { label: "Rasio Penyusutan", value: `${data.rasio}% / tahun` },
              { label: "Akun Aset", value: data.akunAset },
              { label: "Akun Akumulasi Penyusutan", value: data.akunAkumulasi },
              { label: "Akun Beban Penyusutan", value: data.akunBeban },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0", paddingBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#666" }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#001526", textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nilai Aset */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e0e0e0", padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <DollarSign size={16} color="#0176d3" /> Nilai Aset
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#f0f7ff", borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Harga Perolehan</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0176d3", fontFamily: "monospace", marginTop: 4 }}>{formatIDR(data.hargaPerolehan)}</div>
            </div>
            <div style={{ background: "#f0fff4", borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Nilai Buku</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#2e844a", fontFamily: "monospace", marginTop: 4 }}>{formatIDR(data.nilaiBuku)}</div>
            </div>
            <div style={{ background: "#fff8e1", borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Akumulasi Penyusutan</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#b07e00", fontFamily: "monospace", marginTop: 4 }}>{formatIDR(data.hargaPerolehan - data.nilaiBuku)}</div>
            </div>
            <div style={{ background: "#f5f5f5", borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Nilai Sisa</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#666", fontFamily: "monospace", marginTop: 4 }}>{formatIDR(data.nilaiSisa)}</div>
            </div>
          </div>
        </div>

        {/* Jadwal Penyusutan */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e0e0e0", padding: 20, gridColumn: "span 2" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={16} color="#0176d3" /> Jadwal Penyusutan per Tahun
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Tahun ke-</th>
                <th style={thRight}>Penyusutan/Tahun</th>
                <th style={thRight}>Akumulasi Penyusutan</th>
                <th style={thRight}>Nilai Buku</th>
              </tr>
            </thead>
            <tbody>
              {data.penyusutanPerTahun.map((row) => (
                <tr key={row.tahun} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>Tahun {row.tahun}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", color: "#0176d3" }}>{formatIDR(row.penyusutan)}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace" }}>{formatIDR(row.akumulasi)}</td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "monospace", fontWeight: 600 }}>{formatIDR(row.nilaiBuku)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
