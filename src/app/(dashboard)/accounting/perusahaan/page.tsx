"use client"

import Link from "next/link"
import {
  CreditCard,
  Truck,
  MapPin,
  DollarSign,
  UserCheck,
  Repeat,
  CalendarClock,
  Users,
  Star,
  Calendar,
  ClipboardList,
} from "lucide-react"

const subMenus = [
  { label: "Syarat Pembayaran", href: "/accounting/perusahaan/syarat-pembayaran", icon: CreditCard, desc: "Termin & syarat bayar" },
  { label: "Pengiriman", href: "/accounting/perusahaan/pengiriman", icon: Truck, desc: "Metode pengiriman" },
  { label: "FOB", href: "/accounting/perusahaan/fob", icon: MapPin, desc: "Free On Board" },
  { label: "Gaji & Tunjangan", href: "/accounting/perusahaan/gaji-tunjangan", icon: DollarSign, desc: "Gaji & tunjangan" },
  { label: "Karyawan", href: "/accounting/perusahaan/karyawan", icon: UserCheck, desc: "Data karyawan" },
  { label: "Transaksi Berulang", href: "/accounting/perusahaan/transaksi-berulang", icon: Repeat, desc: "Transaksi otomatis" },
  { label: "Proses Akhir Bulan", href: "/accounting/perusahaan/proses-akhir-bulan", icon: CalendarClock, desc: "Penutupan buku" },
  { label: "Kontak", href: "/accounting/perusahaan/kontak", icon: Users, desc: "Pelanggan & supplier" },
  { label: "Transaksi Favorit", href: "/accounting/perusahaan/transaksi-favorit", icon: Star, desc: "Template transaksi" },
  { label: "Kalender", href: "/accounting/perusahaan/kalender", icon: Calendar, desc: "Jadwal keuangan" },
  { label: "Log Aktifitas", href: "/accounting/perusahaan/log-aktifitas", icon: ClipboardList, desc: "Audit trail" },
]

export default function PerusahaanPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
          Perusahaan
        </h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
          Pengaturan data perusahaan dan master data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subMenus.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", border: "1px solid #ecebea", borderRadius: 8,
                cursor: "pointer", transition: "all 100ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7ff"; e.currentTarget.style.borderColor = "#0176d3" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#ecebea" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#f0f0ff" }}>
                <item.icon size={20} style={{ color: "#6b21a8" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#001526" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#444746", marginTop: 1 }}>{item.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
