"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BookOpen,
  Download,
  TrendingUp,
  Search,
} from "lucide-react"

interface LedgerEntry {
  date: string
  reference: string
  description: string
  debit: number
  credit: number
  balance: number
}

const accounts = [
  { code: "1101", name: "Kas", type: "Asset" },
  { code: "1102", name: "Bank BCA", type: "Asset" },
  { code: "1103", name: "Bank Mandiri", type: "Asset" },
  { code: "1201", name: "Persediaan Barang", type: "Asset" },
  { code: "1202", name: "Piutang Usaha", type: "Asset" },
  { code: "1401", name: "Tanah", type: "Asset" },
  { code: "1402", name: "Gedung", type: "Asset" },
  { code: "1403", name: "Peralatan Produksi", type: "Asset" },
  { code: "1404", name: "Kendaraan", type: "Asset" },
  { code: "2101", name: "Utang Usaha", type: "Liability" },
  { code: "2102", name: "Utang Bank", type: "Liability" },
  { code: "3101", name: "Modal Disetor", type: "Equity" },
  { code: "4101", name: "Penjualan Produk", type: "Revenue" },
  { code: "5101", name: "Harga Pokok Penjualan", type: "Expense" },
  { code: "6101", name: "Gaji Karyawan", type: "Expense" },
  { code: "6102", name: "Sewa Gudang", type: "Expense" },
]

const ledgerData: Record<string, LedgerEntry[]> = {
  "1101": [
    { date: "2026-06-02", reference: "JE-2026-00187", description: "Pembayaran Invoice PT Maju Jaya - SCW Nano Coating 9H", debit: 45000000, credit: 0, balance: 125000000 },
    { date: "2026-06-01", reference: "JE-2026-00180", description: "Penarikan kas operasional", debit: 0, credit: 15000000, balance: 80000000 },
    { date: "2026-05-30", reference: "JE-2026-00182", description: "Pembayaran invoice dari SPBU Jaya Abadi", debit: 32500000, credit: 0, balance: 95000000 },
    { date: "2026-05-28", reference: "JE-2026-00175", description: "Setor kas ke bank", debit: 0, credit: 20000000, balance: 62500000 },
    { date: "2026-05-27", reference: "JE-2026-00171", description: "Penerimaan pembayaran distributor Jakarta", debit: 56200000, credit: 0, balance: 82500000 },
    { date: "2026-05-25", reference: "JE-2026-00168", description: "Pembayaran supplier ChemPro Asia", debit: 0, credit: 28500000, balance: 26300000 },
    { date: "2026-05-24", reference: "JE-2026-00165", description: "Penerimaan kas dari penjualan cash", debit: 18700000, credit: 0, balance: 54800000 },
    { date: "2026-05-22", reference: "JE-2026-00160", description: "Pembayaran gaji karyawan", debit: 0, credit: 125000000, balance: 36100000 },
  ],
  "1102": [
    { date: "2026-06-01", reference: "JE-2026-00186", description: "Transfer ke supplier NanoTech Coatings", debit: 0, credit: 45000000, balance: 180000000 },
    { date: "2026-05-30", reference: "JE-2026-00179", description: "Transfer masuk dari distributor Bandung", debit: 56200000, credit: 0, balance: 225000000 },
    { date: "2026-05-28", reference: "JE-2026-00175", description: "Setor kas dari gudang", debit: 20000000, credit: 0, balance: 168800000 },
    { date: "2026-05-25", reference: "JE-2026-00167", description: "Pembayaran sewa gudang", debit: 0, credit: 15000000, balance: 148800000 },
  ],
  "4101": [
    { date: "2026-05-30", reference: "JE-2026-00183", description: "Penjualan SCW Body Wash & SCW Tire Shine ke Toko Onderdil", debit: 0, credit: 67800000, balance: 425000000 },
    { date: "2026-05-27", reference: "JE-2026-00177", description: "Penjualan SCW Leather Care ke bengkel premium", debit: 0, credit: 24300000, balance: 357200000 },
    { date: "2026-05-24", reference: "JE-2026-00164", description: "Penjualan SCW Nano Coating 9H grosir", debit: 0, credit: 125000000, balance: 332900000 },
  ],
}

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

const typeBadge = (type: string) => {
  const colorMap: Record<string, string> = {
    Asset: "#0176d3",
    Liability: "#ea001e",
    Equity: "#2e844a",
    Revenue: "#7b4c9e",
    Expense: "#fe9339",
  }
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: colorMap[type] || "#444746", background: "#f4f6f9", padding: "2px 8px", borderRadius: 4 }}>
      {type}
    </span>
  )
}

export default function LedgerPage() {
  const [selectedAccount, setSelectedAccount] = useState("1101")
  const [period, setPeriod] = useState("current-month")
  const [searchDesc, setSearchDesc] = useState("")

  const accountInfo = accounts.find((a) => a.code === selectedAccount)
  const entries = useMemo(() => {
    const data = ledgerData[selectedAccount] || []
    if (!searchDesc) return data
    return data.filter((e) =>
      e.description.toLowerCase().includes(searchDesc.toLowerCase())
    )
  }, [selectedAccount, searchDesc])

  const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0)
  const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0)
  const currentBalance = entries.length > 0 ? entries[0].balance : 0

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", lineHeight: 1.2 }}>
            General Ledger
          </h1>
          <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>
            Buku besar umum - catatan transaksi per rekening
          </p>
        </div>
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

      {/* Account Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4" style={{ padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Account</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#001526", marginTop: 4 }}>
              {selectedAccount} - {accountInfo?.name || "Select Account"}
            </p>
            <div style={{ marginTop: 4 }}>{typeBadge(accountInfo?.type || "")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Debit</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#0176d3", marginTop: 4 }}>{formatIDR(totalDebit)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Credit</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#2e844a", marginTop: 4 }}>{formatIDR(totalCredit)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4" style={{ padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em" }}>Current Balance</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#001526", marginTop: 4 }}>{formatIDR(currentBalance)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4" style={{ padding: 16 }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4 }}>Select Account</p>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                style={{
                  height: 32, width: "100%", padding: "0 10px",
                  fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6,
                  background: "#fff", color: "#001526", outline: "none",
                  cursor: "pointer",
                }}
              >
                {accounts.map((acc) => (
                  <option key={acc.code} value={acc.code}>
                    {acc.code} - {acc.name} ({acc.type})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4 }}>Period</p>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                style={{
                  height: 32, width: "100%", padding: "0 10px",
                  fontSize: 12, border: "1px solid #d8d8d8", borderRadius: 6,
                  background: "#fff", color: "#001526", outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#444746", marginBottom: 4 }}>Search Description</p>
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#444746" }} />
                <input
                  placeholder="Search transactions..."
                  value={searchDesc}
                  onChange={(e) => setSearchDesc(e.target.value)}
                  style={{
                    height: 32, width: "100%",
                    padding: "0 10px 0 32px",
                    fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6,
                    outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0176d3"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#d8d8d8"}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ledger Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: "#0176d3" }} />
            <CardTitle style={{ fontSize: 15, fontWeight: 600, color: "#001526" }}>Transaction History</CardTitle>
          </div>
          <CardDescription style={{ fontSize: 12, color: "#444746", marginTop: 2 }}>
            Transaksi untuk rekening {selectedAccount} - {accountInfo?.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {entries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Date</TableHead>
                  <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Reference</TableHead>
                  <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff" }}>Description</TableHead>
                  <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Debit</TableHead>
                  <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Credit</TableHead>
                  <TableHead style={{ fontSize: 11, fontWeight: 600, color: "#444746", textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", textAlign: "right" }}>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, idx) => (
                  <TableRow key={idx} style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer", transition: "background 100ms" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <TableCell style={{ fontSize: 13, color: "#444746" }}>{entry.date}</TableCell>
                    <TableCell style={{ fontSize: 13, fontWeight: 500, color: "#001526" }}>{entry.reference}</TableCell>
                    <TableCell style={{ fontSize: 13, color: "#444746", maxWidth: 350 }} className="truncate">{entry.description}</TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: entry.debit > 0 ? "#001526" : "#444746" }}>
                      {entry.debit > 0 ? formatIDR(entry.debit) : "-"}
                    </TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: entry.credit > 0 ? "#001526" : "#444746" }}>
                      {entry.credit > 0 ? formatIDR(entry.credit) : "-"}
                    </TableCell>
                    <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", color: "#001526", fontWeight: 700 }}>
                      {formatIDR(entry.balance)}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                <TableRow style={{ borderTop: "2px solid #ecebea", background: "#f4f6f9" }}>
                  <TableCell colSpan={3} style={{ fontSize: 13, fontWeight: 700, color: "#001526", padding: "8px 12px" }}>Total</TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#0176d3", padding: "8px 12px" }}>{formatIDR(totalDebit)}</TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#2e844a", padding: "8px 12px" }}>{formatIDR(totalCredit)}</TableCell>
                  <TableCell style={{ fontSize: 13, fontFamily: "monospace", textAlign: "right", fontWeight: 700, color: "#001526", padding: "8px 12px" }}>{formatIDR(currentBalance)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div style={{ textAlign: "center", padding: 48 }}>
              <BookOpen size={48} style={{ color: "#d8d8d8", margin: "0 auto 8px" }} />
              <p style={{ fontSize: 14, fontWeight: 500, color: "#444746" }}>No transactions found</p>
              <p style={{ fontSize: 12, color: "#444746", marginTop: 4 }}>
                Tidak ada transaksi untuk rekening ini pada periode yang dipilih.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
