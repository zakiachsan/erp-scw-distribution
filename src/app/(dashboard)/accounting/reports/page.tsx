"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  FileSpreadsheet,
  FileBarChart,
  PieChart,
  DollarSign,
  TrendingUp,
  Calculator,
  Landmark,
  Receipt,
  Package,
  ClipboardList,
} from "lucide-react"

type CategoryId =
  | "keuangan"
  | "buku_besar"
  | "kas_bank"
  | "piutang"
  | "penjualan"
  | "pembelian"
  | "persediaan"

interface ReportItem {
  id: string
  name: string
  description: string
  icon: typeof BarChart3
  color: string
}

const categories: { id: CategoryId; label: string; icon: typeof BarChart3; count: number }[] = [
  { id: "keuangan", label: "Keuangan", icon: DollarSign, count: 10 },
  { id: "buku_besar", label: "Buku Besar", icon: BookOpen, count: 4 },
  { id: "kas_bank", label: "Kas & Bank", icon: CreditCard, count: 3 },
  { id: "piutang", label: "Piutang", icon: Receipt, count: 4 },
  { id: "penjualan", label: "Penjualan", icon: TrendingUp, count: 5 },
  { id: "pembelian", label: "Pembelian", icon: ClipboardList, count: 4 },
  { id: "persediaan", label: "Persediaan", icon: Package, count: 4 },
]

const reportsByCategory: Record<CategoryId, ReportItem[]> = {
  keuangan: [
    { id: "neraca-standar", name: "Neraca (Standar)", description: "Laporan posisi keuangan per periode", icon: Landmark, color: "text-blue-600 bg-blue-50" },
    { id: "neraca-multi-periode", name: "Neraca (Multi Periode)", description: "Perbandingan neraca beberapa periode", icon: Landmark, color: "text-blue-600 bg-blue-50" },
    { id: "neraca-multi-year", name: "Neraca (Multi Year)", description: "Perbandingan neraca beberapa tahun", icon: Landmark, color: "text-blue-600 bg-blue-50" },
    { id: "laba-rugi-standar", name: "Laba/Rugi (Standar)", description: "Laporan laba rugi per periode", icon: FileBarChart, color: "text-green-600 bg-green-50" },
    { id: "laba-rugi-multi-periode", name: "Laba/Rugi (Multi Periode)", description: "Perbandingan laba rugi beberapa periode", icon: FileBarChart, color: "text-green-600 bg-green-50" },
    { id: "laba-rugi-multi-year", name: "Laba/Rugi (Multi Year)", description: "Perbandingan laba rugi beberapa tahun", icon: FileBarChart, color: "text-green-600 bg-green-50" },
    { id: "laba-rugi-kuartal", name: "Laba/Rugi (Kuartal)", description: "Laporan laba rugi per kuartal", icon: FileBarChart, color: "text-green-600 bg-green-50" },
    { id: "arus-kas", name: "Arus Kas", description: "Laporan arus kas masuk dan keluar", icon: CreditCard, color: "text-indigo-600 bg-indigo-50" },
    { id: "rasio-keuangan", name: "Rasio Keuangan", description: "Analisis rasio keuangan perusahaan", icon: Calculator, color: "text-amber-600 bg-amber-50" },
    { id: "grafik", name: "Grafik Keuangan", description: "Visualisasi grafik laporan keuangan", icon: PieChart, color: "text-rose-600 bg-rose-50" },
  ],
  buku_besar: [
    { id: "jurnal-umum", name: "Jurnal Umum", description: "Daftar seluruh transaksi jurnal", icon: BookOpen, color: "text-slate-600 bg-slate-50" },
    { id: "buku-besar", name: "Buku Besar", description: "Rincian transaksi per akun", icon: BookOpen, color: "text-slate-600 bg-slate-50" },
    { id: "trial-balance", name: "Trial Balance", description: "Daftar saldo seluruh akun", icon: FileSpreadsheet, color: "text-slate-600 bg-slate-50" },
    { id: "jurnal-kliring", name: "Jurnal Kliring", description: "Jurnal kliring akun kas", icon: BookOpen, color: "text-slate-600 bg-slate-50" },
  ],
  kas_bank: [
    { id: "laporan-kas", name: "Laporan Kas", description: "Rincian transaksi kas tunai", icon: CreditCard, color: "text-emerald-600 bg-emerald-50" },
    { id: "laporan-bank", name: "Laporan Bank", description: "Rincian transaksi rekening bank", icon: CreditCard, color: "text-emerald-600 bg-emerald-50" },
    { id: "rekonsiliasi-bank", name: "Rekonsiliasi Bank", description: "Pencocokan saldo bank dengan buku", icon: CreditCard, color: "text-emerald-600 bg-emerald-50" },
  ],
  piutang: [
    { id: "piutang-usaha", name: "Piutang Usaha", description: "Daftar piutang dari pelanggan", icon: Receipt, color: "text-cyan-600 bg-cyan-50" },
    { id: "aging-piutang", name: "Aging Piutang", description: "Analisis usia piutang berdasarkan jatuh tempo", icon: Receipt, color: "text-cyan-600 bg-cyan-50" },
    { id: "tagihan-piutang", name: "Tagihan Piutang", description: "Daftar tagihan yang belum dibayar", icon: Receipt, color: "text-cyan-600 bg-cyan-50" },
    { id: "piutang-tak-tertagih", name: "Piutang Tak Tertagih", description: "Laporan piutang macet", icon: Receipt, color: "text-cyan-600 bg-cyan-50" },
  ],
  penjualan: [
    { id: "laporan-penjualan", name: "Laporan Penjualan", description: "Rekapitulasi penjualan per periode", icon: TrendingUp, color: "text-violet-600 bg-violet-50" },
    { id: "penjualan-per-item", name: "Penjualan per Item", description: "Breakdown penjualan per produk", icon: TrendingUp, color: "text-violet-600 bg-violet-50" },
    { id: "penjualan-per-customer", name: "Penjualan per Customer", description: "Rekapitulasi penjualan per pelanggan", icon: TrendingUp, color: "text-violet-600 bg-violet-50" },
    { id: "penjualan-per-salesman", name: "Penjualan per Salesman", description: "Kinerja penjualan per sales", icon: TrendingUp, color: "text-violet-600 bg-violet-50" },
    { id: "retur-penjualan", name: "Retur Penjualan", description: "Daftar retur dari pelanggan", icon: TrendingUp, color: "text-violet-600 bg-violet-50" },
  ],
  pembelian: [
    { id: "laporan-pembelian", name: "Laporan Pembelian", description: "Rekapitulasi pembelian per periode", icon: ClipboardList, color: "text-orange-600 bg-orange-50" },
    { id: "pembelian-per-item", name: "Pembelian per Item", description: "Breakdown pembelian per item", icon: ClipboardList, color: "text-orange-600 bg-orange-50" },
    { id: "pembelian-per-vendor", name: "Pembelian per Vendor", description: "Rekapitulasi pembelian per supplier", icon: ClipboardList, color: "text-orange-600 bg-orange-50" },
    { id: "retur-pembelian", name: "Retur Pembelian", description: "Daftar retur ke supplier", icon: ClipboardList, color: "text-orange-600 bg-orange-50" },
  ],
  persediaan: [
    { id: "kartu-stok", name: "Kartu Stok", description: "Rincian pergerakan stok per item", icon: Package, color: "text-teal-600 bg-teal-50" },
    { id: "laporan-persediaan", name: "Laporan Persediaan", description: "Daftar seluruh persediaan", icon: Package, color: "text-teal-600 bg-teal-50" },
    { id: "stok-akhir", name: "Stok Akhir", description: "Saldo stok akhir per item", icon: Package, color: "text-teal-600 bg-teal-50" },
    { id: "mutasi-stok", name: "Mutasi Stok", description: "Pergerakan masuk dan keluar stok", icon: Package, color: "text-teal-600 bg-teal-50" },
  ],
}

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null)
  const currentReports = activeCategory ? reportsByCategory[activeCategory] : []
  const currentLabel = activeCategory ? categories.find((c) => c.id === activeCategory)?.label : null

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Laporan Keuangan
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Daftar laporan keuangan dan analisis SCW Distribution
          </p>
        </div>
      </div>

      {activeCategory && (
        <div>
          <button
            onClick={() => setActiveCategory(null)}
            style={{ fontSize: 13, color: "#0176d3", border: "none", background: "none", cursor: "pointer", marginBottom: 12, display: "inline-block" }}
          >
            &larr; Kembali ke Kategori
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>{currentLabel}</h2>
              <p style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>{currentReports.length} laporan tersedia</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentReports.map((report) => {
              const Icon = report.icon
              const colorParts = report.color.split(" ")
              return (
                <Card key={report.id} style={{ cursor: "pointer", transition: "all 100ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <CardContent className="p-4" style={{ padding: 16 }}>
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${report.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{report.name}</h3>
                        <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>{report.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {!activeCategory && (
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Card
                key={cat.id}
                style={{ cursor: "pointer", transition: "all 100ms" }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                onClick={() => setActiveCategory(cat.id)}
              >
                <CardContent className="p-4" style={{ padding: 16 }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>{cat.label}</p>
                      <p style={{ fontSize: 22, fontWeight: 700, color: "#001526", marginTop: 4 }}>{cat.count}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 8, background: "#eef4ff" }}>
                      <Icon size={18} style={{ color: "#0176d3" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
