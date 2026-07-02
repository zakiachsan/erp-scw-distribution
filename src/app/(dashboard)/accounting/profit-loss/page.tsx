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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

interface PLLine {
  account: string
  code: string
  amount: number
}

const revenue: PLLine[] = [
  { account: "Penjualan SCW Nano Coating 9H", code: "4101", amount: 425000000 },
  { account: "Penjualan SCW Body Wash", code: "4101", amount: 187500000 },
  { account: "Penjualan SCW Tire Shine", code: "4101", amount: 95000000 },
  { account: "Penjualan SCW Leather Care", code: "4101", amount: 67800000 },
  { account: "Penjualan SCW Detailing Spray", code: "4101", amount: 54300000 },
  { account: "Pendapatan Jasa Detailing", code: "4102", amount: 32500000 },
]

const cogs: PLLine[] = [
  { account: "Harga Pokok SCW Nano Coating", code: "5101", amount: 255000000 },
  { account: "Harga Pokok SCW Body Wash", code: "5101", amount: 112500000 },
  { account: "Harga Pokok SCW Tire Shine", code: "5101", amount: 57000000 },
  { account: "Harga Pokok SCW Leather Care", code: "5101", amount: 40680000 },
  { account: "Harga Pokok SCW Detailing Spray", code: "5101", amount: 32580000 },
  { account: "Biaya Pengiriman Produk", code: "5102", amount: 18500000 },
]

const operatingExpenses: Record<string, PLLine[]> = {
  "Personnel": [
    { account: "Gaji Karyawan Produksi", code: "6101", amount: 125000000 },
    { account: "Gaji Karyawan Kantor", code: "6101", amount: 75000000 },
    { account: "Bonus & Insentif", code: "6101", amount: 35000000 },
    { account: "BPJS Karyawan", code: "6101", amount: 18500000 },
  ],
  "Facility": [
    { account: "Sewa Gudang & Kantor", code: "6102", amount: 45000000 },
    { account: "Listrik & Air", code: "6103", amount: 12500000 },
    { account: "Internet & Telepon", code: "6103", amount: 3500000 },
    { account: "Maintenance Gedung", code: "6102", amount: 7500000 },
  ],
  "Marketing": [
    { account: "Iklan Digital & Social Media", code: "6104", amount: 15000000 },
    { account: "Event & Sponsorship", code: "6104", amount: 8500000 },
    { account: "Branding & Desain", code: "6104", amount: 5000000 },
  ],
  "Logistics": [
    { account: "Biaya Pengiriman & Freight", code: "6105", amount: 22500000 },
    { account: "Bensin & Kendaraan", code: "6105", amount: 8500000 },
  ],
  "Office": [
    { account: "Perlengkapan Kantor", code: "6106", amount: 3500000 },
    { account: "Software & Lisensi", code: "6106", amount: 7500000 },
    { account: "Audit & Konsultan", code: "6106", amount: 12000000 },
  ],
}

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function ProfitLossPage() {
  const [period, setPeriod] = useState("2026-06")

  const totalRevenue = revenue.reduce((sum, r) => sum + r.amount, 0)
  const totalCOGS = cogs.reduce((sum, c) => sum + c.amount, 0)
  const grossProfit = totalRevenue - totalCOGS
  const grossProfitMargin = ((grossProfit / totalRevenue) * 100).toFixed(1)

  let totalOpex = 0
  const opexByCategory: Record<string, { items: PLLine[]; total: number }> = {}
  for (const [category, items] of Object.entries(operatingExpenses)) {
    const total = items.reduce((sum, i) => sum + i.amount, 0)
    opexByCategory[category] = { items, total }
    totalOpex += total
  }

  const netProfit = grossProfit - totalOpex
  const netProfitMargin = ((netProfit / totalRevenue) * 100).toFixed(1)

  const periodLabel =
    period === "2026-06" ? "Juni 2026"
    : period === "2026-05" ? "Mei 2026"
    : period === "q2" ? "Q2 2026"
    : "2026 YTD"

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Profit & Loss Statement
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Laba rugi SCW Distribution - Laporan kinerja keuangan
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v ?? '')}>
            <SelectTrigger className="w-[180px]" style={{ height: 32, fontSize: 12, borderRadius: 6 }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-06">Juni 2026</SelectItem>
              <SelectItem value="2026-05">Mei 2026</SelectItem>
              <SelectItem value="q2">Q2 2026</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "7px 14px", fontSize: 13, fontWeight: 500,
              background: "#fff", color: "#0176d3",
              border: "1px solid #d8d8d8", borderRadius: 6,
              cursor: "pointer", transition: "all 100ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7ff"; e.currentTarget.style.borderColor = "#0176d3" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#d8d8d8" }}
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #0176d3" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Revenue</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0176d3", marginTop: 4 }}>{formatIDR(totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #7b4c9e" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Gross Profit</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#7b4c9e", marginTop: 4 }}>{formatIDR(grossProfit)}</p>
            <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>Margin: {grossProfitMargin}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #fe9339" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Operating Expenses</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{formatIDR(totalOpex)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #2e844a" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Net Profit</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: netProfit >= 0 ? "#2e844a" : "#ea001e", marginTop: 4 }}>
              {formatIDR(netProfit)}
            </p>
            <p style={{ fontSize: 11, color: "#444746", marginTop: 2 }}>Margin: {netProfitMargin}%</p>
          </CardContent>
        </Card>
      </div>

      {/* P&L Statement */}
      <Card>
        <CardHeader className="text-center pb-3">
          <CardTitle style={{ fontSize: 18, fontWeight: 700, color: "#001526" }}>SCW Distribution</CardTitle>
          <CardDescription style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginTop: 2 }}>
            Laporan Laba Rugi (Profit & Loss Statement)
          </CardDescription>
          <p style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>Periode: {periodLabel}</p>
        </CardHeader>
        <CardContent className="p-5 space-y-6">
          {/* Revenue */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0176d3", borderBottom: "2px solid #c8e0f7", paddingBottom: 4, marginBottom: 12 }}>
              REVENUE (Pendapatan)
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {revenue.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "6px 12px 6px 32px", fontSize: 13, color: "#444746" }}>{item.account}</td>
                    <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.amount)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #ecebea", background: "#eef4ff" }}>
                  <td style={{ padding: "8px 12px 8px 32px", fontSize: 13, fontWeight: 700, color: "#001526" }}>Total Revenue</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#0176d3" }}>{formatIDR(totalRevenue)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* COGS */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#7b4c9e", borderBottom: "2px solid #d4c5e1", paddingBottom: 4, marginBottom: 12 }}>
              COST OF GOODS SOLD (Harga Pokok Penjualan)
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {cogs.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "6px 12px 6px 32px", fontSize: 13, color: "#444746" }}>{item.account}</td>
                    <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.amount)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #ecebea", background: "#f0ebf5" }}>
                  <td style={{ padding: "8px 12px 8px 32px", fontSize: 13, fontWeight: 700, color: "#001526" }}>Total COGS</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#7b4c9e" }}>{formatIDR(totalCOGS)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Gross Profit */}
          <div style={{ background: "#e8f5ed", borderRadius: 8, padding: 12, borderTop: "2px solid #b8dcc5" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "#001526", fontSize: 16 }}>GROSS PROFIT</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#001526", fontSize: 16 }}>{formatIDR(grossProfit)}</span>
            </div>
            <div style={{ textAlign: "right", fontSize: 12, color: "#2e844a", marginTop: 2 }}>Gross Margin: {grossProfitMargin}%</div>
          </div>

          {/* Operating Expenses */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fe9339", borderBottom: "2px solid #f9e0a0", paddingBottom: 4, marginBottom: 12 }}>
              OPERATING EXPENSES (Biaya Operasional)
            </h2>
            {Object.entries(opexByCategory).map(([category, { items, total }]) => (
              <div key={category} className="mb-4">
                <h3 style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>{category}</h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "6px 12px 6px 32px", fontSize: 13, color: "#444746" }}>{item.account}</td>
                        <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.amount)}</td>
                      </tr>
                    ))}
                    <tr style={{ borderBottom: "1px solid #ecebea" }}>
                      <td style={{ padding: "6px 12px 6px 32px", fontSize: 12, fontStyle: "italic", color: "#444746" }}>Subtotal {category}</td>
                      <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 500, color: "#444746" }}>{formatIDR(total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
            <div style={{ background: "#fff4e5", borderRadius: 8, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, color: "#001526" }}>Total Operating Expenses</span>
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#9a6b00" }}>{formatIDR(totalOpex)}</span>
              </div>
            </div>
          </div>

          {/* Net Profit */}
          <div style={{
            borderTop: `2px solid ${netProfit >= 0 ? "#2e844a" : "#ea001e"}`,
            background: netProfit >= 0 ? "#e8f5ed" : "#fef1f0",
            borderRadius: 8, padding: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {netProfit >= 0 ? (
                  <TrendingUp size={24} style={{ color: "#2e844a" }} />
                ) : (
                  <TrendingDown size={24} style={{ color: "#ea001e" }} />
                )}
                <span style={{ fontWeight: 700, fontSize: 18, color: netProfit >= 0 ? "#001526" : "#ea001e" }}>
                  NET PROFIT (Laba Bersih)
                </span>
              </div>
              <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18, color: netProfit >= 0 ? "#001526" : "#ea001e" }}>
                {formatIDR(netProfit)}
              </span>
            </div>
            <div style={{ textAlign: "right", fontSize: 12, color: netProfit >= 0 ? "#2e844a" : "#ea001e", marginTop: 4 }}>
              Net Profit Margin: {netProfitMargin}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
