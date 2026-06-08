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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Download,
  Calendar,
  TrendingUp,
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

export default function LedgerPage() {
  const [selectedAccount, setSelectedAccount] = useState("1101")
  const [period, setPeriod] = useState("current-month")

  const accountInfo = accounts.find((a) => a.code === selectedAccount)
  const entries = ledgerData[selectedAccount] || []

  const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0)
  const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0)
  const currentBalance = entries.length > 0 ? entries[0].balance : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            General Ledger
          </h1>
          <p className="text-slate-500">
            Buku besar umum - catatan transaksi per rekening
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Account</p>
            <p className="text-lg font-bold text-slate-900">
              {selectedAccount} - {accountInfo?.name || "Select Account"}
            </p>
            <Badge className="mt-1 bg-indigo-100 text-indigo-700">
              {accountInfo?.type || ""}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Debit</p>
            <p className="text-lg font-bold text-blue-600">{formatIDR(totalDebit)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Total Credit</p>
            <p className="text-lg font-bold text-indigo-600">{formatIDR(totalCredit)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-slate-500">Current Balance</p>
            <p className="text-lg font-bold text-slate-900">{formatIDR(currentBalance)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Select Account</Label>
              <Select value={selectedAccount} onValueChange={(v) => setSelectedAccount(v ?? '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc.code} value={acc.code}>
                      {acc.code} - {acc.name} ({acc.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select value={period} onValueChange={(v) => setPeriod(v ?? '')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Search Description</Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input placeholder="Search transactions..." className="pl-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            Transaction History
          </CardTitle>
          <CardDescription>
            Transaksi untuk rekening {selectedAccount} - {accountInfo?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-slate-600">{entry.date}</TableCell>
                    <TableCell className="font-mono text-sm font-medium">
                      {entry.reference}
                    </TableCell>
                    <TableCell className="max-w-[350px] truncate text-slate-600">
                      {entry.description}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {entry.debit > 0 ? formatIDR(entry.debit) : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {entry.credit > 0 ? formatIDR(entry.credit) : "-"}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-slate-900">
                      {formatIDR(entry.balance)}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals Row */}
                <TableRow className="border-t-2 border-slate-300 bg-slate-50">
                  <TableCell colSpan={3} className="font-bold text-slate-700">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-blue-600">
                    {formatIDR(totalDebit)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-indigo-600">
                    {formatIDR(totalCredit)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-slate-900">
                    {formatIDR(currentBalance)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <BookOpen className="h-12 w-12 mx-auto text-slate-300 mb-3" />
              <p className="font-medium">No transactions found</p>
              <p className="text-sm">
                Tidak ada transaksi untuk rekening ini pada periode yang dipilih.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
