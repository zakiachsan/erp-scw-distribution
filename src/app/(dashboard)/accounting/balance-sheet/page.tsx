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
import { Download } from "lucide-react"

interface BalanceSheetItem {
  account: string
  code: string
  amount: number
}

const currentAssets: BalanceSheetItem[] = [
  { account: "Kas", code: "1101", amount: 125000000 },
  { account: "Bank BCA", code: "1102", amount: 180000000 },
  { account: "Bank Mandiri", code: "1103", amount: 45000000 },
  { account: "Piutang Usaha", code: "1202", amount: 67800000 },
  { account: "Persediaan Barang", code: "1201", amount: 185000000 },
  { account: "Perlengkapan Kantor", code: "1301", amount: 12500000 },
]

const fixedAssets: BalanceSheetItem[] = [
  { account: "Tanah", code: "1401", amount: 450000000 },
  { account: "Gedung", code: "1402", amount: 320000000 },
  { account: "Peralatan Produksi", code: "1403", amount: 175000000 },
  { account: "Kendaraan", code: "1404", amount: 95000000 },
]

const liabilities: BalanceSheetItem[] = [
  { account: "Utang Usaha", code: "2101", amount: 42000000 },
  { account: "Utang Bank", code: "2102", amount: 75000000 },
  { account: "PPh Terutang", code: "2201", amount: 18500000 },
  { account: "Utang Gaji", code: "2103", amount: 12500000 },
]

const equity: BalanceSheetItem[] = [
  { account: "Modal Disetor", code: "3101", amount: 500000000 },
  { account: "Laba Ditahan", code: "3201", amount: 214800000 },
  { account: "Laba Tahun Berjalan", code: "3301", amount: 96000000 },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function BalanceSheetPage() {
  const [asOfMonth, setAsOfMonth] = useState("2026-06")

  const totalCurrentAssets = currentAssets.reduce((sum, a) => sum + a.amount, 0)
  const totalFixedAssets = fixedAssets.reduce((sum, a) => sum + a.amount, 0)
  const totalAssets = totalCurrentAssets + totalFixedAssets

  const totalLiabilities = liabilities.reduce((sum, a) => sum + a.amount, 0)
  const totalEquity = equity.reduce((sum, a) => sum + a.amount, 0)
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            Balance Sheet
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Neraca keuangan SCW Distribution - Laporan posisi keuangan
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={asOfMonth} onValueChange={(v) => setAsOfMonth(v ?? '')}>
            <SelectTrigger className="w-[180px]" style={{ height: 32, fontSize: 12, borderRadius: 6 }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-06">Juni 2026</SelectItem>
              <SelectItem value="2026-05">Mei 2026</SelectItem>
              <SelectItem value="2026-04">April 2026</SelectItem>
              <SelectItem value="2026-03">Maret 2026</SelectItem>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #0176d3" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Assets</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0176d3", marginTop: 4 }}>{formatIDR(totalAssets)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #fe9339" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Liabilities</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#9a6b00", marginTop: 4 }}>{formatIDR(totalLiabilities)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16, borderLeft: "4px solid #2e844a" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Equity</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{formatIDR(totalEquity)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Balance Sheet Statement */}
      <Card>
        <CardHeader className="text-center pb-3">
          <CardTitle style={{ fontSize: 18, fontWeight: 700, color: "#001526" }}>SCW Distribution</CardTitle>
          <CardDescription style={{ fontSize: 14, fontWeight: 600, color: "#001526", marginTop: 2 }}>
            Neraca (Balance Sheet)
          </CardDescription>
          <p style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>Per 30 Juni 2026</p>
        </CardHeader>
        <CardContent className="p-5 space-y-6">
          {/* ASSETS */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0176d3", borderBottom: "2px solid #c8e0f7", paddingBottom: 4, marginBottom: 12 }}>
              ASSETS
            </h2>

            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Current Assets</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {currentAssets.map((item) => (
                  <tr key={item.code} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "6px 12px 6px 32px", fontSize: 13, color: "#444746" }}>{item.account}</td>
                    <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.amount)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #ecebea", background: "#eef4ff" }}>
                  <td style={{ padding: "8px 12px 8px 32px", fontSize: 13, fontWeight: 700, color: "#001526" }}>Total Current Assets</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#0176d3" }}>{formatIDR(totalCurrentAssets)}</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8, marginTop: 16 }}>Fixed Assets (Non-Current)</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {fixedAssets.map((item) => (
                  <tr key={item.code} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "6px 12px 6px 32px", fontSize: 13, color: "#444746" }}>{item.account}</td>
                    <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.amount)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #ecebea", background: "#eef4ff" }}>
                  <td style={{ padding: "8px 12px 8px 32px", fontSize: 13, fontWeight: 700, color: "#001526" }}>Total Fixed Assets</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#0176d3" }}>{formatIDR(totalFixedAssets)}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ background: "#d8eafe", borderRadius: 8, padding: 12, marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, color: "#001526", fontSize: 16 }}>TOTAL ASSETS</span>
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#001526", fontSize: 16 }}>{formatIDR(totalAssets)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* LIABILITIES */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#fe9339", borderBottom: "2px solid #f9e0a0", paddingBottom: 4, marginBottom: 12 }}>
              LIABILITIES
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {liabilities.map((item) => (
                  <tr key={item.code} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "6px 12px 6px 32px", fontSize: 13, color: "#444746" }}>{item.account}</td>
                    <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.amount)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #ecebea", background: "#fff4e5" }}>
                  <td style={{ padding: "8px 12px 8px 32px", fontSize: 13, fontWeight: 700, color: "#001526" }}>Total Liabilities</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#9a6b00" }}>{formatIDR(totalLiabilities)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* EQUITY */}
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#2e844a", borderBottom: "2px solid #b8dcc5", paddingBottom: 4, marginBottom: 12 }}>
              EQUITY
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {equity.map((item) => (
                  <tr key={item.code} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "6px 12px 6px 32px", fontSize: 13, color: "#444746" }}>{item.account}</td>
                    <td style={{ padding: "6px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526" }}>{formatIDR(item.amount)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #ecebea", background: "#e8f5ed" }}>
                  <td style={{ padding: "8px 12px 8px 32px", fontSize: 13, fontWeight: 700, color: "#001526" }}>Total Equity</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#2e844a" }}>{formatIDR(totalEquity)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#f4f6f9", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: "#001526", fontSize: 16 }}>TOTAL LIABILITIES & EQUITY</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#001526", fontSize: 16 }}>{formatIDR(totalLiabilitiesAndEquity)}</span>
            </div>
          </div>

          {/* Verification */}
          <div style={{
            textAlign: "center", padding: 12, borderRadius: 8,
            background: totalAssets === totalLiabilitiesAndEquity ? "#e8f5ed" : "#fef1f0",
            color: totalAssets === totalLiabilitiesAndEquity ? "#2e844a" : "#ea001e",
          }}>
            {totalAssets === totalLiabilitiesAndEquity ? (
              <p style={{ fontWeight: 500 }}>✓ Assets = Liabilities + Equity — Neraca seimbang</p>
            ) : (
              <p style={{ fontWeight: 500 }}>✗ Neraca tidak seimbang! Selisih: {formatIDR(Math.abs(totalAssets - totalLiabilitiesAndEquity))}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
