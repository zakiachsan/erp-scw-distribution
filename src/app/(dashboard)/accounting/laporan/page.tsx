"use client"

import Link from "next/link"
import { TrendingUp, Scale, Banknote, ShoppingCart, Package, Receipt } from "lucide-react"

const reports = [
  { name: "Laba Rugi", desc: "Laporan rugi laba (Income Statement) periode bulanan", icon: TrendingUp, color: "#059669", bg: "#ecfdf5", href: "/accounting/laporan/laba-rugi" },
  { name: "Neraca", desc: "Laporan posisi keuangan (Balance Sheet) per periode", icon: Scale, color: "#0176d3", bg: "#eef4ff", href: "/accounting/laporan/neraca" },
  { name: "Arus Kas", desc: "Laporan arus kas (Cash Flow Statement) bulanan", icon: Banknote, color: "#d97706", bg: "#fffbeb", href: "/accounting/laporan/arus-kas" },
  { name: "Laporan Penjualan", desc: "Ringkasan penjualan bulanan dan produk terlaris", icon: ShoppingCart, color: "#7c3aed", bg: "#f5f3ff", href: "/accounting/laporan/penjualan" },
  { name: "Laporan Pembelian", desc: "Ringkasan pembelian bulanan dan pemasok", icon: Package, color: "#ea580c", bg: "#fff7ed", href: "/accounting/laporan/pembelian" },
  { name: "Laporan Hutang Piutang", desc: "Ringkasan piutang dan hutang per pelanggan/pemasok", icon: Receipt, color: "#0891b2", bg: "#ecfeff", href: "/accounting/laporan/hutang-piutang" },
]

export default function LaporanKeuanganPage() {
  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Laporan Keuangan</h1>
        <p style={{ fontSize: 14, color: "#444746", marginTop: 4 }}>Pilih laporan keuangan untuk periode Juni 2026</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {reports.map(r => (
          <Link key={r.name} href={r.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#fff", border: "1px solid #ecebea", borderRadius: 8,
                padding: "24px 24px", transition: "all 150ms", cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <r.icon size={24} style={{ color: r.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#001526", marginBottom: 4 }}>{r.name}</h3>
                  <p style={{ fontSize: 13, color: "#444746", lineHeight: 1.5 }}>{r.desc}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
