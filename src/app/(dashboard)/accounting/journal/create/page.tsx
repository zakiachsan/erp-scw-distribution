"use client"

import { useState } from "react"
import Link from "next/link"
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
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

interface JournalLine {
  id: number
  account: string
  description: string
  debit: number
  credit: number
}

const chartOfAccounts = [
  { code: "1101", name: "Kas" },
  { code: "1102", name: "Bank BCA" },
  { code: "1103", name: "Bank Mandiri" },
  { code: "1201", name: "Persediaan Barang" },
  { code: "1202", name: "Piutang Usaha" },
  { code: "1301", name: "Perlengkapan Kantor" },
  { code: "1401", name: "Tanah" },
  { code: "1402", name: "Gedung" },
  { code: "1403", name: "Peralatan Produksi" },
  { code: "1404", name: "Kendaraan" },
  { code: "2101", name: "Utang Usaha" },
  { code: "2102", name: "Utang Bank" },
  { code: "2201", name: "PPh Terutang" },
  { code: "3101", name: "Modal Disetor" },
  { code: "3201", name: "Laba Ditahan" },
  { code: "4101", name: "Penjualan Produk" },
  { code: "4102", name: "Pendapatan Jasa" },
  { code: "5101", name: "Harga Pokok Penjualan" },
  { code: "6101", name: "Gaji Karyawan" },
  { code: "6102", name: "Sewa Gudang" },
  { code: "6103", name: "Listrik & Air" },
  { code: "6104", name: "Marketing & Promosi" },
  { code: "6105", name: "Transport & Pengiriman" },
  { code: "6106", name: "Perlengkapan Kantor" },
]

function formatIDR(amount: number): string {
  if (amount === 0) return "-"
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function CreateJournalEntryPage() {
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [reference, setReference] = useState("")
  const [lines, setLines] = useState<JournalLine[]>([
    { id: 1, account: "", description: "", debit: 0, credit: 0 },
    { id: 2, account: "", description: "", debit: 0, credit: 0 },
  ])
  const [nextId, setNextId] = useState(3)

  const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0)
  const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0)
  const isBalanced = totalDebit === totalCredit && totalDebit > 0
  const difference = totalDebit - totalCredit

  const addLine = () => {
    setLines([
      ...lines,
      { id: nextId, account: "", description: "", debit: 0, credit: 0 },
    ])
    setNextId(nextId + 1)
  }

  const removeLine = (id: number) => {
    if (lines.length <= 2) return
    setLines(lines.filter((line) => line.id !== id))
  }

  const updateLine = (
    id: number,
    field: keyof JournalLine,
    value: string | number
  ) => {
    setLines(
      lines.map((line) =>
        line.id === id ? { ...line, [field]: value } : line
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/accounting/journal">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create Journal Entry
            </h1>
            <p className="text-slate-500">
              Buat entri jurnal baru untuk pencatatan transaksi
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Send className="mr-2 h-4 w-4" />
            Submit Entry
          </Button>
        </div>
      </div>

      {/* Header Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">Entry Date *</Label>
              <Input
                id="date"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number *</Label>
              <Input
                id="reference"
                placeholder="e.g. INV-2026-0313"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Entry Type</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Entry</SelectItem>
                  <SelectItem value="adjustment">Adjustment Entry</SelectItem>
                  <SelectItem value="closing">Closing Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Warning */}
      {!isBalanced && (totalDebit > 0 || totalCredit > 0) && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800">
              Entry tidak seimbang
            </p>
            <p className="text-sm text-amber-700">
              Selisih: {difference > 0 ? "+" : ""}
              {formatIDR(Math.abs(difference))}{" "}
              {difference > 0 ? "(Debit lebih besar)" : "(Credit lebih besar)"}
            </p>
          </div>
        </div>
      )}

      {/* Balanced Success */}
      {isBalanced && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800">
              Entry seimbang
            </p>
            <p className="text-sm text-green-700">
              Total Debit = Total Credit = {formatIDR(totalDebit)}
            </p>
          </div>
        </div>
      )}

      {/* Journal Lines */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Journal Lines</CardTitle>
            <CardDescription>
              Minimal 2 baris. Pastikan total debit = total credit.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={addLine}>
            <Plus className="mr-2 h-4 w-4" />
            Add Line
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lines.map((line, index) => (
              <div
                key={line.id}
                className="grid grid-cols-12 gap-3 items-end rounded-lg border border-slate-200 p-4"
              >
                <div className="col-span-12 md:col-span-3">
                  <Label className="text-xs text-slate-500">Account *</Label>
                  <Select
                    value={line.account}
                    onValueChange={(value) =>
                      updateLine(line.id, "account", value ?? "")
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartOfAccounts.map((acc) => (
                        <SelectItem key={acc.code} value={acc.code}>
                          {acc.code} - {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Label className="text-xs text-slate-500">Description *</Label>
                  <Input
                    placeholder="Description for this line..."
                    value={line.description}
                    onChange={(e) =>
                      updateLine(line.id, "description", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div className="col-span-5 md:col-span-2">
                  <Label className="text-xs text-slate-500">Debit (IDR)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={line.debit || ""}
                    onChange={(e) =>
                      updateLine(
                        line.id,
                        "debit",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="mt-1 font-mono"
                    min={0}
                  />
                </div>
                <div className="col-span-5 md:col-span-2">
                  <Label className="text-xs text-slate-500">Credit (IDR)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={line.credit || ""}
                    onChange={(e) =>
                      updateLine(
                        line.id,
                        "credit",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="mt-1 font-mono"
                    min={0}
                  />
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLine(line.id)}
                    disabled={lines.length <= 2}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex justify-between py-1">
                <span className="text-sm font-medium text-slate-600">
                  Total Debit:
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {formatIDR(totalDebit)}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm font-medium text-slate-600">
                  Total Credit:
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {formatIDR(totalCredit)}
                </span>
              </div>
              <div className="border-t border-slate-300 mt-2 pt-2 flex justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Difference:
                </span>
                <span
                  className={`font-mono font-bold ${
                    isBalanced ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isBalanced ? "Balanced ✓" : formatIDR(Math.abs(difference))}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
