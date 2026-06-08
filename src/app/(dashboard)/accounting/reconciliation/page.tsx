"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  RefreshCw,
} from "lucide-react"

interface BankEntry {
  id: string
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
  matched: boolean
  journalRef?: string
}

interface JournalEntry {
  id: string
  reference: string
  date: string
  description: string
  amount: number
  type: "debit" | "credit"
  matched: boolean
  bankRef?: string
}

const bankEntries: BankEntry[] = [
  { id: "BK-001", date: "2026-06-02", description: "TRSF dari PT Maju Jaya", amount: 45000000, type: "credit", matched: true, journalRef: "JE-2026-00187" },
  { id: "BK-002", date: "2026-06-01", description: "TRSF ke ChemPro Asia", amount: 28500000, type: "debit", matched: true, journalRef: "JE-2026-00186" },
  { id: "BK-003", date: "2026-06-01", description: "BIAYA ADM BCA JUN26", amount: 25000, type: "debit", matched: false },
  { id: "BK-004", date: "2026-05-31", description: "TRSF dari Toko Onderdil", amount: 32500000, type: "credit", matched: false },
  { id: "BK-005", date: "2026-05-30", description: "TRSF dari SPBU Jaya Abadi", amount: 18700000, type: "credit", matched: false },
  { id: "BK-006", date: "2026-05-29", description: "PEMBAYARAN LISTRIK PLN", amount: 3750000, type: "debit", matched: false },
  { id: "BK-007", date: "2026-05-28", description: "TRSF dari Distributor Bandung", amount: 56200000, type: "credit", matched: true, journalRef: "JE-2026-00179" },
  { id: "BK-008", date: "2026-05-27", description: "TRSF ke NanoTech Coatings", amount: 45000000, type: "debit", matched: true, journalRef: "JE-2026-00176" },
]

const journalEntries: JournalEntry[] = [
  { id: "JE-001", reference: "JE-2026-00187", date: "2026-06-02", description: "Pembayaran Invoice PT Maju Jaya", amount: 45000000, type: "debit", matched: true, bankRef: "BK-001" },
  { id: "JE-002", reference: "JE-2026-00186", date: "2026-06-01", description: "Pembelian bahan ChemPro Asia", amount: 28500000, type: "credit", matched: true, bankRef: "BK-002" },
  { id: "JE-003", reference: "JE-2026-00185", date: "2026-06-01", description: "Gaji bulanan tim produksi SCW", amount: 125000000, type: "debit", matched: false },
  { id: "JE-004", reference: "JE-2026-00184", date: "2026-05-31", description: "Sewa gudang warehouse Surabaya", amount: 15000000, type: "debit", matched: false },
  { id: "JE-005", reference: "JE-2026-00183", date: "2026-05-30", description: "Penjualan SCW Body Wash & Tire Shine", amount: 67800000, type: "credit", matched: false },
  { id: "JE-006", reference: "JE-2026-00182", date: "2026-05-30", description: "Pembayaran invoice SPBU Jaya Abadi", amount: 32500000, type: "debit", matched: false },
  { id: "JE-007", reference: "JE-2026-00179", date: "2026-05-28", description: "Transfer masuk distributor Bandung", amount: 56200000, type: "debit", matched: true, bankRef: "BK-007" },
  { id: "JE-008", reference: "JE-2026-00176", date: "2026-05-27", description: "Iklan Instagram SCW detailing", amount: 5000000, type: "debit", matched: false },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function ReconciliationPage() {
  const [bankData, setBankData] = useState(bankEntries)
  const [journalData, setJournalData] = useState(journalEntries)

  const matchedBankCount = bankData.filter((b) => b.matched).length
  const unmatchedBankCount = bankData.filter((b) => !b.matched).length
  const matchedJournalCount = journalData.filter((j) => j.matched).length
  const unmatchedJournalCount = journalData.filter((j) => !j.matched).length

  const totalBankCredit = bankData.filter((b) => b.type === "credit" && !b.matched).reduce((sum, b) => sum + b.amount, 0)
  const totalBankDebit = bankData.filter((b) => b.type === "debit" && !b.matched).reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Bank Reconciliation
          </h1>
          <p className="text-slate-500">
            Rekening bank BCA - Cocokkan transaksi bank dengan jurnal
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Statement
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-sm text-slate-500">Matched Entries</p>
            </div>
            <p className="text-xl font-bold text-green-600">
              {matchedBankCount + matchedJournalCount}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <p className="text-sm text-slate-500">Unmatched Bank</p>
            </div>
            <p className="text-xl font-bold text-amber-600">{unmatchedBankCount}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-slate-500">Unmatched Journal</p>
            </div>
            <p className="text-xl font-bold text-blue-600">{unmatchedJournalCount}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
              <p className="text-sm text-slate-500">Reconciliation %</p>
            </div>
            <p className="text-xl font-bold text-indigo-600">
              {((matchedBankCount / bankData.length) * 100).toFixed(0)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Side by Side */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left: Bank Statement */}
        <Card>
          <CardHeader className="bg-slate-50 rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              Bank Statement (BCA)
            </CardTitle>
            <CardDescription>8 entries imported</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankData.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className={entry.matched ? "bg-green-50/50" : ""}
                  >
                    <TableCell>
                      <Checkbox checked={entry.matched} />
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {entry.date}
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">
                      {entry.description}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      <span
                        className={
                          entry.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {entry.type === "credit" ? "+" : "-"}
                        {formatIDR(entry.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {entry.matched ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          Matched
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right: Journal Entries */}
        <Card>
          <CardHeader className="bg-indigo-50 rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-indigo-500" />
              Journal Entries
            </CardTitle>
            <CardDescription>8 entries in system</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journalData.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className={entry.matched ? "bg-green-50/50" : ""}
                  >
                    <TableCell>
                      <Checkbox checked={entry.matched} />
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {entry.date}
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {entry.reference}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatIDR(entry.amount)}
                    </TableCell>
                    <TableCell>
                      {entry.matched ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          Matched
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                          Open
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Unmatched Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            Unmatched Items
          </CardTitle>
          <CardDescription>
            Transaksi yang belum dicocokkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">
                Bank Entries (Unmatched)
              </h3>
              <div className="space-y-2">
                {bankData
                  .filter((b) => !b.matched)
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded border border-amber-200 bg-amber-50 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{entry.description}</p>
                        <p className="text-xs text-slate-500">{entry.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-sm font-medium ${
                            entry.type === "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {formatIDR(entry.amount)}
                        </span>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          Match
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">
                Journal Entries (Unmatched)
              </h3>
              <div className="space-y-2">
                {journalData
                  .filter((j) => !j.matched)
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded border border-blue-200 bg-blue-50 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{entry.description}</p>
                        <p className="text-xs text-slate-500">{entry.reference}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-blue-600">
                          {formatIDR(entry.amount)}
                        </span>
                        <Button size="sm" variant="outline">
                          Match
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
