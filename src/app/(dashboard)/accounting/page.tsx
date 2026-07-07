"use client"

import Link from "next/link"
import { BookOpen, Landmark, TrendingUp, ShoppingCart, Package, Building, Store, Users, Truck } from "lucide-react"
import { dummyAccounts, dummyCustomers, dummySuppliers, dummyProducts, dummyPurchaseOrders, dummySalesOrders, dummyPayments, dummyJournalEntries, dummyExpenseRecords } from "@/lib/accounting-dummy-data"

function formatIDR(n: number): string {
  if (n === 0) return "Rp 0"
  return `Rp ${n.toLocaleString("id-ID")}`
}

export default function AccountingDashboardPage() {
  // ── Computed metrics ──
  const totalKasBank = dummyAccounts.filter(a => a.tipeAkun === "Kas & Bank").reduce((s, a) => s + a.saldo, 0)
  const totalPiutang = dummyCustomers.reduce((s, c) => s + c.saldo, 0)
  const totalHutang = dummySuppliers.reduce((s, s2) => s2.saldo + s, 0)
  const totalPersediaan = dummyAccounts.filter(a => a.tipeAkun === "Persediaan").reduce((s, a) => s + a.saldo, 0)
  const totalAset = dummyAccounts.filter(a => ["Kas & Bank","Piutang","Persediaan","Aset Lancar Lainnya","Aset Tetap"].includes(a.tipeAkun)).reduce((s, a) => s + a.saldo, 0)
  const totalKewajiban = dummyAccounts.filter(a => a.tipeAkun === "Kewajiban").reduce((s, a) => s + a.saldo, 0)
  const totalPenjualan = dummySalesOrders.reduce((s, o) => s + o.total, 0)
  const totalPembelian = dummyPurchaseOrders.reduce((s, o) => s + o.total, 0)
  const transaksiCount = dummyJournalEntries.length + dummyPayments.length + dummySalesOrders.length + dummyPurchaseOrders.length
  const pendingOrders = dummyPurchaseOrders.filter(o => o.status === "Draft").length
  const expenseTotal = dummyExpenseRecords.reduce((s, e) => s + e.total, 0)

  const summaryCards = [
    { title: "Total Aset", value: formatIDR(totalAset), desc: `${dummyAccounts.length} akun perkiraan`, icon: Building, color: "#0176d3", bg: "#eef4ff" },
    { title: "Kas & Bank", value: formatIDR(totalKasBank), desc: `${dummyAccounts.filter(a => a.tipeAkun === "Kas & Bank").length} rekening`, icon: Landmark, color: "#0176d3", bg: "#eef4ff" },
    { title: "Total Piutang", value: formatIDR(totalPiutang), desc: `${dummyCustomers.length} pelanggan`, icon: Users, color: "#fe9339", bg: "#fff3e0" },
    { title: "Total Kewajiban", value: formatIDR(totalKewajiban), desc: `${dummySuppliers.length} pemasok`, icon: Truck, color: "#2e844a", bg: "#e8f5e9" },
  ]

  const quickStats = [
    { label: "Akun Perkiraan", value: dummyAccounts.length.toString(), icon: BookOpen, href: "/accounting/buku-besar/akun-perkiraan" },
    { label: "Pelanggan", value: dummyCustomers.length.toString(), icon: Users, href: "/accounting/penjualan/pelanggan" },
    { label: "Pemasok", value: dummySuppliers.length.toString(), icon: Truck, href: "/accounting/pembelian/pemasok" },
    { label: "Barang & Jasa", value: dummyProducts.length.toString(), icon: Package, href: "/accounting/persediaan/barang-jasa" },
    { label: "Jurnal Bulan Ini", value: dummyJournalEntries.length.toString(), icon: BookOpen, href: "/accounting/buku-besar/jurnal-umum" },
    { label: "Transaksi", value: transaksiCount.toString(), icon: TrendingUp, href: "#" },
  ]

  const modules = [
    { label: "Buku Besar", desc: `${dummyAccounts.length} akun · ${dummyJournalEntries.length} jurnal`, icon: BookOpen, href: "/accounting/buku-besar/akun-perkiraan", color: "#0176d3", bg: "#eef4ff" },
    { label: "Kas & Bank", desc: `${dummyPayments.length} transaksi · ${dummyAccounts.filter(a => a.tipeAkun === "Kas & Bank").length} rekening`, icon: Landmark, href: "/accounting/kas-bank/pembayaran", color: "#0176d3", bg: "#eef4ff" },
    { label: "Penjualan", desc: `${dummySalesOrders.length} pesanan · ${formatIDR(totalPenjualan)}`, icon: TrendingUp, href: "/accounting/penjualan/penawaran-penjualan", color: "#2e844a", bg: "#e8f5e9" },
    { label: "Persediaan", desc: `${dummyProducts.length} barang · ${formatIDR(totalPersediaan)}`, icon: Package, href: "/accounting/persediaan/barang-jasa", color: "#fe9339", bg: "#fff3e0" },
    { label: "Pembelian", desc: `${dummyPurchaseOrders.length} PO · ${pendingOrders} pending`, icon: ShoppingCart, href: "/accounting/pembelian/pesanan-pembelian", color: "#7b4c9e", bg: "#f3e5f5" },
    { label: "Perusahaan", desc: `11 sub-menu · konfigurasi`, icon: Store, href: "/accounting/perusahaan", color: "#444746", bg: "#f5f5f5" },
  ]

  const recentSO = dummyJournalEntries.slice(0, 4)
  const recentPO = dummyPurchaseOrders.slice(0, 3)

  // Shared inline styles
  const th = (align: "left" | "right" = "left"): React.CSSProperties => ({
    padding: "8px 12px", textAlign: align, fontSize: 11, fontWeight: 600, color: "#444746",
    textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff",
    borderBottom: "2px solid #ecebea", whiteSpace: "nowrap",
  })

  const cardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(-2px)"
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
  }
  const cardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(0)"
    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"
  }

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1400, margin: "0 auto" }}>
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>Dashboard Akuntansi</h1>
          <p style={{ fontSize: 14, color: "#444746", marginTop: 4 }}>Ringkasan keuangan SCW Distribution — Juli 2026</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/accounting/buku-besar/jurnal-umum">
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px",
              fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff",
              border: "none", borderRadius: 6, cursor: "pointer",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#014486"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#0176d3"}
            >+ Jurnal Baru</button>
          </Link>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {summaryCards.map(card => (
          <div key={card.title} style={{
            background: "#fff", border: "1px solid #ecebea", borderRadius: 8,
            padding: "20px 24px", transition: "all 150ms", cursor: "default",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
            onMouseEnter={cardHover} onMouseLeave={cardLeave}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>{card.title}</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", lineHeight: 1.3 }}>{card.value}</p>
                <p style={{ fontSize: 12, color: "#444746", marginTop: 4 }}>{card.desc}</p>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <card.icon size={20} style={{ color: card.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK STATS + MODULE NAV */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Quick Stats */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Statistik Cepat</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {quickStats.map(stat => (
              <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                  border: "1px solid #ecebea", borderRadius: 6, transition: "all 100ms",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7ff"; e.currentTarget.style.borderColor = "#0176d3" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#ecebea" }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#eef4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <stat.icon size={16} style={{ color: "#0176d3" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "#444746", textTransform: "uppercase", letterSpacing: "0.03em" }}>{stat.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#001526" }}>{stat.value}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Module Navigation */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginBottom: 16 }}>Menu Modul</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {modules.map(mod => (
              <Link key={mod.label} href={mod.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "8px 14px",
                  border: "1px solid #ecebea", borderRadius: 6, transition: "all 100ms",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7ff"; e.currentTarget.style.borderColor = "#0176d3" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#ecebea" }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: mod.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <mod.icon size={15} style={{ color: mod.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#001526" }}>{mod.label}</p>
                    <p style={{ fontSize: 11, color: "#444746" }}>{mod.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT TABLES: Jurnal + Pembelian */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Recent Jurnal */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #ecebea", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526" }}>Jurnal Terbaru</h3>
              <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>{dummyJournalEntries.length} entri bulan ini</p>
            </div>
            <Link href="/accounting/buku-besar/jurnal-umum" style={{ fontSize: 12, fontWeight: 500, color: "#0176d3", textDecoration: "none" }}>Lihat Semua →</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th()}>Nomor</th>
                <th style={th()}>Tanggal</th>
                <th style={th()}>Keterangan</th>
                <th style={th("right")}>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentSO.map(entry => (
                <tr key={entry.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", fontWeight: 500, color: "#001526" }}>{entry.nomor}</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "#444746" }}>{entry.tanggal}</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "#444746", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.keterangan}</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(entry.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent PO + Summary */}
        <div style={{ background: "#fff", border: "1px solid #ecebea", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #ecebea", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526" }}>Pesanan Pembelian</h3>
              <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>{dummyPurchaseOrders.length} PO · {pendingOrders} draft</p>
            </div>
            <Link href="/accounting/pembelian/pesanan-pembelian" style={{ fontSize: 12, fontWeight: 500, color: "#0176d3", textDecoration: "none" }}>Lihat Semua →</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th()}>Nomor</th>
                <th style={th()}>Pemasok</th>
                <th style={th()}>Status</th>
                <th style={th("right")}>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentPO.map(po => (
                <tr key={po.id} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", fontWeight: 500, color: "#001526" }}>{po.nomor}</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "#444746" }}>{po.pemasok}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: po.status === "Received" ? "#e8f5e9" : po.status === "Approved" ? "#eef4ff" : "#fff3e0",
                      color: po.status === "Received" ? "#2e7d32" : po.status === "Approved" ? "#0176d3" : "#e65100",
                    }}>{po.status}</span>
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(po.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Financial Summary Box */}
          <div style={{ padding: "14px 24px", borderTop: "1px solid #ecebea", background: "#fafafa" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Penjualan Bulan Ini</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#0176d3" }}>{formatIDR(totalPenjualan)}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Pembelian Bulan Ini</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#7b4c9e" }}>{formatIDR(totalPembelian)}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Beban Bulan Ini</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#ea001e" }}>{formatIDR(expenseTotal)}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Piutang Tertunda</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#fe9339" }}>{formatIDR(totalPiutang)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
