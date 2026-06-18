"use client"

import { useState, useMemo } from "react"
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
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"

interface AdjustmentLine {
  id: number
  itemName: string
  code: string
  type: "Masuk" | "Keluar"
  quantity: number
  unit: string
  costPerUnit: number
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

function generateAdjustmentNumber(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `IA.${year}.${month}.${seq}`
}

function formatIDR(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`
}

export default function CreateAdjustmentPage() {
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [adjustmentNumber, setAdjustmentNumber] = useState(generateAdjustmentNumber())
  const [isAutoNumber, setIsAutoNumber] = useState(true)
  const [keterangan, setKeterangan] = useState("")
  const [lines, setLines] = useState<AdjustmentLine[]>([
    { id: 1, itemName: "", code: "", type: "Masuk", quantity: 0, unit: "", costPerUnit: 0 },
  ])
  const [nextId, setNextId] = useState(2)

  const totalValue = useMemo(() => {
    return lines.reduce((sum, line) => {
      return sum + (line.quantity * line.costPerUnit)
    }, 0)
  }, [lines])

  const toggleAutoNumber = () => {
    if (isAutoNumber) {
      setIsAutoNumber(false)
    } else {
      setIsAutoNumber(true)
      setAdjustmentNumber(generateAdjustmentNumber())
    }
  }

  const addLine = () => {
    setLines([
      ...lines,
      { id: nextId, itemName: "", code: "", type: "Masuk", quantity: 0, unit: "", costPerUnit: 0 },
    ])
    setNextId(nextId + 1)
  }

  const removeLine = (id: number) => {
    if (lines.length <= 1) return
    setLines(lines.filter((line) => line.id !== id))
  }

  const updateLine = (
    id: number,
    field: keyof AdjustmentLine,
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
            updated.costPerUnit = item?.costPerUnit || 0
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
          <Link href="/accounting/inventory/adjustments">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Buat Penyesuaian Persediaan
            </h1>
            <p className="text-sm text-slate-500">
              Rekam penyesuaian stok persediaan
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
            Terbitkan Penyesuaian
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
                <Label htmlFor="number">Nomor Penyesuaian *</Label>
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
                placeholder="IA.YYYY.MM.00001"
                value={adjustmentNumber}
                onChange={(e) => setAdjustmentNumber(e.target.value)}
                disabled={isAutoNumber}
                className={isAutoNumber ? "bg-slate-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keterangan">Keterangan</Label>
              <Input
                id="keterangan"
                placeholder="Deskripsi penyesuaian..."
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Item Lines Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
              Detail Item Penyesuaian
            </CardTitle>
            <CardDescription>
              Item yang disesuaikan beserta tipe (Masuk/Keluar)
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
                <TableHead className="w-[120px] font-semibold text-slate-700">
                  Tipe
                </TableHead>
                <TableHead className="w-[100px] text-right font-semibold text-slate-700">
                  Jumlah
                </TableHead>
                <TableHead className="w-[80px] font-semibold text-slate-700">
                  Satuan
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
                      list="adjustment-item-codes"
                    />
                    <datalist id="adjustment-item-codes">
                      {inventoryItems.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </datalist>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={line.type}
                      onValueChange={(v) =>
                        updateLine(line.id, "type", v ?? "Masuk")
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masuk">Masuk</SelectItem>
                        <SelectItem value="Keluar">Keluar</SelectItem>
                      </SelectContent>
                    </Select>
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

          {/* Summary Footer with Total */}
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
                    Total Masuk:
                  </span>
                  <span className="font-sans text-sm font-bold text-green-600">
                    {lines
                      .filter((l) => l.type === "Masuk")
                      .reduce((sum, l) => sum + l.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium text-slate-600">
                    Total Keluar:
                  </span>
                  <span className="font-sans text-sm font-bold text-red-600">
                    {lines
                      .filter((l) => l.type === "Keluar")
                      .reduce((sum, l) => sum + l.quantity, 0)}
                  </span>
                </div>
                <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Total Nilai:
                  </span>
                  <span className="font-sans font-bold text-slate-900">
                    {formatIDR(totalValue)}
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
