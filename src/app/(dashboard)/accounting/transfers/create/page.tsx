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
  Save,
  Send,
  ArrowRightLeft,
} from "lucide-react"

const cashBankAccounts = [
  { code: "1101", name: "Kas" },
  { code: "1102", name: "Bank BCA" },
  { code: "1103", name: "Bank Mandiri" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

function generateTransferNo(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `TF.${year}.${month}.${seq}`
}

export default function CreateTransferPage() {
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split("T")[0])
  const [transferNo, setTransferNo] = useState(generateTransferNo())
  const [fromBank, setFromBank] = useState("")
  const [toBank, setToBank] = useState("")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")

  const fromAccount = cashBankAccounts.find((a) => a.code === fromBank)
  const toAccount = cashBankAccounts.find((a) => a.code === toBank)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/accounting/transfers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Transfer Uang
            </h1>
            <p className="text-sm text-slate-500">
              Pindahkan dana antar rekening kas & bank
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

      {/* Transfer Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-indigo-600" />
            Detail Transfer
          </CardTitle>
          <CardDescription>Isi data transfer antar rekening bank</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Top Row: Date & Transfer No */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="transferDate">Tanggal Transaksi *</Label>
              <Input
                id="transferDate"
                type="date"
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transferNo">Nomor Transfer *</Label>
              <Input
                id="transferNo"
                value={transferNo}
                onChange={(e) => setTransferNo(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Keterangan</Label>
              <Input
                id="description"
                placeholder="Deskripsi transfer..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Transfer Visual */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <div className="grid grid-cols-1 gap-4 items-end md:grid-cols-[1fr,auto,1fr]">
              {/* From */}
              <div className="space-y-2">
                <Label>Dari Kas/Bank *</Label>
                <Select value={fromBank} onValueChange={(v) => setFromBank(v ?? "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih rekening asal..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cashBankAccounts.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        {a.code} - {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fromAccount && (
                  <div className="rounded-md bg-white border border-slate-200 p-3">
                    <p className="text-xs text-slate-500">Rekening Asal</p>
                    <p className="text-sm font-medium text-slate-900">{fromAccount.name}</p>
                    <p className="text-xs font-mono text-slate-500">{fromAccount.code}</p>
                  </div>
                )}
              </div>

              {/* Arrow */}
              <div className="flex justify-center pb-6">
                <div className="flex items-center gap-2">
                  <div className="h-px w-12 bg-slate-300" />
                  <ArrowRightLeft className="h-6 w-6 text-indigo-600" />
                  <div className="h-px w-12 bg-slate-300" />
                </div>
              </div>

              {/* To */}
              <div className="space-y-2">
                <Label>Ke Kas/Bank *</Label>
                <Select value={toBank} onValueChange={(v) => setToBank(v ?? "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih rekening tujuan..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cashBankAccounts.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        {a.code} - {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {toAccount && (
                  <div className="rounded-md bg-white border border-slate-200 p-3">
                    <p className="text-xs text-slate-500">Rekening Tujuan</p>
                    <p className="text-sm font-medium text-slate-900">{toAccount.name}</p>
                    <p className="text-xs font-mono text-slate-500">{toAccount.code}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Jumlah Transfer (Rp) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount || ""}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                className="text-right font-sans text-lg"
                min={0}
              />
              <p className="text-sm text-slate-500">
                Terbilang: {formatIDR(amount)}
              </p>
            </div>
          </div>

          {/* Preview Table */}
          {fromBank && toBank && amount > 0 && (
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Rekening Asal</TableHead>
                    <TableHead className="font-semibold text-slate-700">Rekening Tujuan</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <span className="text-sm font-medium text-slate-900">
                        {fromAccount?.name} ({fromAccount?.code})
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-slate-900">
                        {toAccount?.name} ({toAccount?.code})
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-sans font-bold text-slate-900">
                      {formatIDR(amount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
