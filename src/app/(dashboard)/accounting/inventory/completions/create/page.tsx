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
  CheckCircle2,
} from "lucide-react"

interface CompletionLine {
  id: number
  itemName: string
  code: string
  quantity: number
  unit: string
  portion: number
  allocationAmount: number
}

const inventoryItems = [
  { code: "SCW-NCH-9H", name: "SCW Nano Coating 9H", unit: "Botol", costPerUnit: 450000 },
  { code: "SCW-BW-5L", name: "SCW Body Wash 5L", unit: "Liter", costPerUnit: 85000 },
  { code: "SCW-TS-500", name: "SCW Tire Shine 500ml", unit: "Botol", costPerUnit: 65000 },
  { code: "SCW-GC-250", name: "SCW Glass Coating 250ml", unit: "Botol", costPerUnit: 125000 },
  { code: "SCW-BP-500", name: "SCW Body Polish 500ml", unit: "Botol", costPerUnit: 78000 },
  { code: "SCW-LT-INT", name: "SCW Leather Treatment Interior", unit: "Botol", costPerUnit: 95000 },
  { code: "SCW-WS-1L", name: "SCW Wheel Shiner 1L", unit: "Liter", costPerUnit: 72000 },
  { code: "SCW-APC-5L", name: "SCW All Purpose Cleaner 5L", unit: "Liter", costPerUnit: 110000 },
]

const workOrderOptions = [
  { number: "JC.2026.06.00001", customer: "PT Autogloss Indonesia", batchNo: "BATCH-001" },
  { number: "JC.2026.06.00002", customer: "CV Ceramic Pro JKT", batchNo: "BATCH-002" },
  { number: "JC.2026.06.00003", customer: "PT DetailWorks BDG", batchNo: "BATCH-003" },
  { number: "JC.2026.06.00004", customer: "GlossUp Bali", batchNo: "BATCH-004" },
  { number: "JC.2026.06.00005", customer: "CV ProShine SBY", batchNo: "BATCH-005" },
]

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function CreateCompletionPage() {
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [selectedWorkOrder, setSelectedWorkOrder] = useState("")
  const [rollOverType, setRollOverType] = useState("Barang")
  const [keterangan, setKeterangan] = useState("")
  const [lines, setLines] = useState<CompletionLine[]>([
    { id: 1, itemName: "", code: "", quantity: 0, unit: "", portion: 0, allocationAmount: 0 },
  ])
  const [nextId, setNextId] = useState(2)

  const selectedWO = workOrderOptions.find((wo) => wo.number === selectedWorkOrder)

  const totalAllocation = lines.reduce((sum, l) => sum + l.allocationAmount, 0)

  const addLine = () => {
    setLines([
      ...lines,
      { id: nextId, itemName: "", code: "", quantity: 0, unit: "", portion: 0, allocationAmount: 0 },
    ])
    setNextId(nextId + 1)
  }

  const removeLine = (id: number) => {
    if (lines.length <= 1) return
    setLines(lines.filter((line) => line.id !== id))
  }

  const updateLine = (
    id: number,
    field: keyof CompletionLine,
    value: string | number
  ) => {
    setLines(
      lines.map((line) => {
        if (line.id === id) {
          const updated = { ...line, [field]: value }
          if (field === "code") {
            const item = inventoryItems.find((i) => i.code === value)
            updated.itemName = item?.name || ""
            updated.unit = item?.unit || ""
            updated.allocationAmount = updated.quantity * (item?.costPerUnit || 0)
          }
          if (field === "quantity" || field === "code") {
            const item = inventoryItems.find((i) => i.code === updated.code)
            updated.allocationAmount = updated.quantity * (item?.costPerUnit || 0)
          }
          if (field === "portion") {
            // Portion % doesn't directly change allocation, just the visual
          }
          return updated
        }
        return line
      })
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/accounting/inventory/completions">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Buat Penyelesaian Pesanan
            </h1>
            <p className="text-sm text-slate-500">
              Rekam penyelesaian dari pekerjaan pesanan
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
            Terbitkan Penyelesaian
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
              <Label>Job No (Pekerjaan Pesanan) *</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Select value={selectedWorkOrder} onValueChange={(v) => setSelectedWorkOrder(v ?? "")}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Cari pekerjaan pesanan..." />
                  </SelectTrigger>
                  <SelectContent>
                    {workOrderOptions.map((wo) => (
                      <SelectItem key={wo.number} value={wo.number}>
                        {wo.number} - {wo.customer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedWO && (
                <p className="text-xs text-slate-500">
                  Batch: {selectedWO.batchNo} | Pelanggan: {selectedWO.customer}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Roll Over Type (Tipe)</Label>
              <Select value={rollOverType} onValueChange={(v) => setRollOverType(v ?? "Barang")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Barang">Barang</SelectItem>
                  <SelectItem value="Jasa">Jasa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="keterangan">Keterangan</Label>
            <Input
              id="keterangan"
              placeholder="Deskripsi penyelesaian pesanan..."
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Item Lines Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              Detail Item Penyelesaian
            </CardTitle>
            <CardDescription>
              Alokasi biaya material untuk penyelesaian pesanan
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={addLine}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Item
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-[50px] font-semibold text-slate-700">
                  No.
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Nama Item
                </TableHead>
                <TableHead className="w-[140px] font-semibold text-slate-700">
                  Kode #
                </TableHead>
                <TableHead className="w-[100px] text-right font-semibold text-slate-700">
                  Jumlah
                </TableHead>
                <TableHead className="w-[80px] font-semibold text-slate-700">
                  Satuan
                </TableHead>
                <TableHead className="w-[100px] text-right font-semibold text-slate-700">
                  Portion %
                </TableHead>
                <TableHead className="w-[150px] text-right font-semibold text-slate-700">
                  Alokasi Biaya
                </TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line, idx) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <span className="text-sm text-slate-500">{idx + 1}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-800">
                      {line.itemName || (
                        <span className="text-slate-400 italic">Pilih kode item</span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Pilih kode"
                      value={line.code}
                      onChange={(e) =>
                        updateLine(line.id, "code", e.target.value)
                      }
                      className="text-sm"
                      list="completion-item-codes"
                    />
                    <datalist id="completion-item-codes">
                      {inventoryItems.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </datalist>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="0"
                      value={line.quantity || ""}
                      onChange={(e) =>
                        updateLine(
                          line.id,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="text-right font-sans text-sm"
                      min={0}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {line.unit || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="0"
                      value={line.portion || ""}
                      onChange={(e) =>
                        updateLine(
                          line.id,
                          "portion",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="text-right font-sans text-sm"
                      min={0}
                      max={100}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-sans text-sm font-medium text-slate-900">
                      {formatIDR(line.allocationAmount)}
                    </span>
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

          {/* Summary Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex items-center justify-end">
              <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">
                    Total Item:
                  </span>
                  <span className="font-sans text-sm font-bold text-slate-900">
                    {lines.filter((l) => l.code).length} item
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">
                    Total Alokasi Biaya:
                  </span>
                  <span className="font-sans font-bold text-slate-900">
                    {formatIDR(totalAllocation)}
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
