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
  ToggleLeft,
  ToggleRight,
  BookOpen,
} from "lucide-react"

interface JournalLine {
  id: number
  accountCode: string
  accountName: string
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

const transactionTypes = [
  "Penjualan",
  "Pembelian",
  "Pembayaran",
  "Penerimaan",
  "Biaya Operasional",
  "Penyesuaian",
  "Transfer",
  "Jurnal Umum",
]

function formatIDR(amount: number): string {
  if (amount === 0) return "-"
  return `Rp ${amount.toLocaleString("id-ID")}`
}

function generateJournalNumber(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `JV.${year}.${month}.${seq}`
}

export default function CreateJournalEntryPage() {
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [journalNumber, setJournalNumber] = useState(generateJournalNumber())
  const [isAutoNumber, setIsAutoNumber] = useState(true)
  const [transactionType, setTransactionType] = useState("")
  const [lines, setLines] = useState<JournalLine[]>([
    { id: 1, accountCode: "", accountName: "", debit: 0, credit: 0 },
    { id: 2, accountCode: "", accountName: "", debit: 0, credit: 0 },
  ])
  const [nextId, setNextId] = useState(3)

  const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0)
  const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0)
  const isBalanced = totalDebit === totalCredit && totalDebit > 0
  const difference = totalDebit - totalCredit

  const addLine = () => {
    setLines([
      ...lines,
      { id: nextId, accountCode: "", accountName: "", debit: 0, credit: 0 },
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
      lines.map((line) => {
        if (line.id === id) {
          const updated = { ...line, [field]: value }
          // Auto-fill account name when code is selected
          if (field === "accountCode") {
            const account = chartOfAccounts.find((a) => a.code === value)
            updated.accountName = account?.name || ""
          }
          return updated
        }
        return line
      })
    )
  }

  const toggleAutoNumber = () => {
    if (isAutoNumber) {
      setIsAutoNumber(false)
    } else {
      setIsAutoNumber(true)
      setJournalNumber(generateJournalNumber())
    }
  }

  return (
    <div className="space-y-4">
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
              Buat Jurnal Baru
            </h1>
            <p className="text-sm text-slate-500">
              Tambah jurnal umum untuk pencatatan transaksi
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Simpan Draft
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Send className="mr-2 h-4 w-4" />
            Terbitkan Jurnal
          </Button>
        </div>
      </div>

      {/* Header Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal *</Label>
              <Input
                id="date"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="number">Nomor Jurnal *</Label>
                <button
                  type="button"
                  onClick={toggleAutoNumber}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                >
                  {isAutoNumber ? (
                    <>
                      <ToggleRight className="h-4 w-4" />
                      Otomatis
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4" />
                      Manual
                    </>
                  )}
                </button>
              </div>
              <Input
                id="number"
                placeholder="JV.YYYY.MM.00001"
                value={journalNumber}
                onChange={(e) => setJournalNumber(e.target.value)}
                disabled={isAutoNumber}
                className={isAutoNumber ? "bg-slate-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipe Transaksi *</Label>
              <Select value={transactionType} onValueChange={(v) => setTransactionType(v ?? "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe transaksi" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
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
              Jurnal tidak seimbang
            </p>
            <p className="text-sm text-amber-700">
              Selisih: {difference > 0 ? "+" : ""}
              {formatIDR(Math.abs(difference))}{" "}
              {difference > 0 ? "(Debit lebih besar)" : "(Kredit lebih besar)"}
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
              Jurnal seimbang
            </p>
            <p className="text-sm text-green-700">
              Total Debit = Total Kredit = {formatIDR(totalDebit)}
            </p>
          </div>
        </div>
      )}

      {/* Journal Lines Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Detail Jurnal
            </CardTitle>
            <CardDescription>
              Minimal 2 baris. Pastikan total debit = total kredit.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={addLine}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Baris
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-[120px] font-semibold text-slate-700">
                  No. Akun
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Nama Akun
                </TableHead>
                <TableHead className="w-[180px] text-right font-semibold text-slate-700">
                  Debit (Rp)
                </TableHead>
                <TableHead className="w-[180px] text-right font-semibold text-slate-700">
                  Kredit (Rp)
                </TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <Select
                      value={line.accountCode}
                      onValueChange={(value) =>
                        updateLine(line.id, "accountCode", value ?? "")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih akun" />
                      </SelectTrigger>
                      <SelectContent>
                        {chartOfAccounts.map((acc) => (
                          <SelectItem key={acc.code} value={acc.code}>
                            {acc.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {line.accountName || (
                        <span className="text-slate-400 italic">Pilih akun terlebih dahulu</span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
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
                      className="text-right font-sans"
                      min={0}
                    />
                  </TableCell>
                  <TableCell>
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
                      className="text-right font-sans"
                      min={0}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLine(line.id)}
                      disabled={lines.length <= 2}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Totals Summary */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex items-center justify-end">
              <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">
                    Total Debit:
                  </span>
                  <span className="font-sans font-bold text-slate-900">
                    {formatIDR(totalDebit)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">
                    Total Kredit:
                  </span>
                  <span className="font-sans font-bold text-slate-900">
                    {formatIDR(totalCredit)}
                  </span>
                </div>
                <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Selisih:
                  </span>
                  <span
                    className={`font-sans font-bold ${
                      isBalanced ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isBalanced ? "Seimbang ✓" : formatIDR(Math.abs(difference))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
