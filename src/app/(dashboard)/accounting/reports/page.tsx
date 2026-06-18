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
  LineChart,
  PieChart,
  DollarSign,
  TrendingUp,
  Calculator,
  Landmark,
  Receipt,
  Package,
  ClipboardList,
  Factory,
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

const categoryCardColors: Record<CategoryId, { bg: string; iconBg: string; iconText: string }> = {
  keuangan: { bg: "bg-indigo-100 dark:bg-indigo-900/30", iconBg: "bg-indigo-100 dark:bg-indigo-900/30", iconText: "text-indigo-600" },
  buku_besar: { bg: "bg-slate-100 dark:bg-slate-900/30", iconBg: "bg-slate-100 dark:bg-slate-900/30", iconText: "text-slate-600" },
  kas_bank: { bg: "bg-emerald-100 dark:bg-emerald-900/30", iconBg: "bg-emerald-100 dark:bg-emerald-900/30", iconText: "text-emerald-600" },
  piutang: { bg: "bg-cyan-100 dark:bg-cyan-900/30", iconBg: "bg-cyan-100 dark:bg-cyan-900/30", iconText: "text-cyan-600" },
  penjualan: { bg: "bg-violet-100 dark:bg-violet-900/30", iconBg: "bg-violet-100 dark:bg-violet-900/30", iconText: "text-violet-600" },
  pembelian: { bg: "bg-orange-100 dark:bg-orange-900/30", iconBg: "bg-orange-100 dark:bg-orange-900/30", iconText: "text-orange-600" },
  persediaan: { bg: "bg-teal-100 dark:bg-teal-900/30", iconBg: "bg-teal-100 dark:bg-teal-900/30", iconText: "text-teal-600" },
}

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null)
  const currentReports = activeCategory ? reportsByCategory[activeCategory] : []
  const currentLabel = activeCategory ? categories.find((c) => c.id === activeCategory)?.label : null

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Laporan Keuangan</h1>
          <p className="text-muted-foreground">
            Daftar laporan keuangan dan analisis SCW Distribution
          </p>
        </div>
      </div>

      {activeCategory && (
        <div>
          <button
            onClick={() => setActiveCategory(null)}
            className="text-sm text-primary hover:underline mb-4 inline-block"
          >
            &larr; Kembali ke Kategori
          </button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">{currentLabel}</h2>
              <p className="text-sm text-muted-foreground">
                {currentReports.length} laporan tersedia
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentReports.map((report) => {
              const Icon = report.icon
              return (
                <Card key={report.id} className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${report.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium">{report.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
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
            const colors = categoryCardColors[cat.id]
            return (
              <Card
                key={cat.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => setActiveCategory(cat.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.iconBg}`}>
                      <Icon className={`h-5 w-5 ${colors.iconText}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{cat.label}</p>
                      <p className={`text-2xl font-bold ${colors.iconText}`}>{cat.count}</p>
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
