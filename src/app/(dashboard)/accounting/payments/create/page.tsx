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
  Search,
} from "lucide-react"

interface PaymentLine {
  id: number
  account: string
  accountName: string
  amount: number
}

const cashBankAccounts = [
  { code: "1101", name: "Kas" },
  { code: "1102", name: "Bank BCA" },
  { code: "1103", name: "Bank Mandiri" },
]

const expenseAccounts = [
  { code: "5101", name: "Harga Pokok Penjualan" },
  { code: "6101", name: "Gaji Karyawan" },
  { code: "6102", name: "Sewa Gudang" },
  { code: "6103", name: "Listrik & Air" },
  { code: "6104", name: "Marketing & Promosi" },
  { code: "6105", name: "Transport & Pengiriman" },
  { code: "6106", name: "Perlengkapan Kantor" },
  { code: "2101", name: "Utang Usaha" },
  { code: "1202", name: "Piutang Usaha" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

function generateVoucherNo(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `PB.${year}.${month}.${seq}`
}

export default function CreatePaymentPage() {
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0])
  const [voucherNo, setVoucherNo] = useState(generateVoucherNo())
  const [cashBankSearch, setCashBankSearch] = useState("")
  const [selectedCashBank, setSelectedCashBank] = useState("")
  const [description, setDescription] = useState("")
  const [lines, setLines] = useState<PaymentLine[]>([
    { id: 1, account: "", accountName: "", amount: 0 },
    { id: 2, account: "", accountName: "", amount: 0 },
  ])
  const [nextId, setNextId] = useState(3)

  const totalAmount = lines.reduce((sum, l) => sum + l.amount, 0)

  const filteredAccounts = expenseAccounts.filter(
    (a) =>
      a.code.toLowerCase().includes(cashBankSearch.toLowerCase()) ||
      a.name.toLowerCase().includes(cashBankSearch.toLowerCase())
  )

  const addLine = () => {
    setLines([...lines, { id: nextId, account: "", accountName: "", amount: 0 }])
    setNextId(nextId + 1)
  }

  const removeLine = (id: number) => {
    if (lines.length <= 1) return
    setLines(lines.filter((l) => l.id !== id))
  }

  const updateLine = (id: number, field: keyof PaymentLine, value: string | number) => {
    setLines(
      lines.map((l) => {
        if (l.id === id) {
          const updated = { ...l, [field]: value }
          if (field === "account") {
            const acc = expenseAccounts.find((a) => a.code === value)
            updated.accountName = acc?.name || ""
          }
          return updated
        }
        return l
      })
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/accounting/payments">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Tambah Pembayaran
            </h1>
            <p className="text-sm text-slate-500">
              Catat pembayaran keluar dari kas atau bank
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
            Terbitkan
          </Button>
        </div>
      </div>

      {/* Header Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Cash/Bank Search */}
            <div className="space-y-2">
              <Label>Kas/Bank *</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Select value={selectedCashBank} onValueChange={(v) => setSelectedCashBank(v ?? "")}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Cari Kas/Bank..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cashBankAccounts.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        {a.code} - {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal *</Label>
              <Input
                id="date"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>

            {/* Voucher No */}
            <div className="space-y-2">
              <Label htmlFor="voucherNo">Nomor Bukti (Bank) *</Label>
              <Input
                id="voucherNo"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
                className="font-mono"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Keterangan</Label>
              <Input
                id="description"
                placeholder="Deskripsi pembayaran..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rincian Pembayaran */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-indigo-600">Rp</span>
              Rincian Pembayaran
            </CardTitle>
            <CardDescription>Daftar akun yang akan dibebaskan dari pembayaran ini</CardDescription>
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
                <TableHead className="w-[120px] font-semibold text-slate-700">Akun</TableHead>
                <TableHead className="font-semibold text-slate-700">Nama Akun</TableHead>
                <TableHead className="w-[200px] text-right font-semibold text-slate-700">Nilai (Rp)</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <Select
                      value={line.account}
                      onValueChange={(v) => updateLine(line.id, "account", v ?? "")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih akun" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseAccounts.map((acc) => (
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
                      value={line.amount || ""}
                      onChange={(e) => updateLine(line.id, "amount", parseInt(e.target.value) || 0)}
                      className="text-right font-sans"
                      min={0}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLine(line.id)}
                      disabled={lines.length <= 1}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Total */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex items-center justify-end">
              <div className="w-full max-w-xs rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">Total Pembayaran:</span>
                  <span className="font-sans font-bold text-slate-900">{formatIDR(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
