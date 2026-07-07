"use client"

import Link from "next/link"
import {
  CreditCard, Truck, MapPin, DollarSign, UserCheck, Repeat,
  CalendarClock, Users, Star, Calendar, ClipboardList,
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
        <h1 className="text-xl font-bold tracking-tight text-slds-text-primary">Perusahaan</h1>
        <p className="text-sm text-slds-text-secondary mt-0.5">Pengaturan data perusahaan dan master data</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subMenus.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-3.5 px-4 py-3.5 border border-slds-text-secondary/10 rounded-lg cursor-pointer transition-colors hover:bg-brand-light hover:border-brand">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-light">
                <item.icon className="h-5 w-5 text-brand" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slds-text-primary">{item.label}</div>
                <div className="text-xs text-slds-text-secondary mt-0.5">{item.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
