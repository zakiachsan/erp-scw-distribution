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
  ClipboardList,
} from "lucide-react"

interface WorkOrderLine {
  id: number
  itemName: string
  code: string
  quantity: number
  unit: string
}

const inventoryItems = [
  { code: "SCW-NCH-9H", name: "SCW Nano Coating 9H", unit: "Botol" },
  { code: "SCW-BW-5L", name: "SCW Body Wash 5L", unit: "Liter" },
  { code: "SCW-TS-500", name: "SCW Tire Shine 500ml", unit: "Botol" },
  { code: "SCW-GC-250", name: "SCW Glass Coating 250ml", unit: "Botol" },
  { code: "SCW-BP-500", name: "SCW Body Polish 500ml", unit: "Botol" },
  { code: "SCW-LT-INT", name: "SCW Leather Treatment Interior", unit: "Botol" },
  { code: "SCW-WS-1L", name: "SCW Wheel Shiner 1L", unit: "Liter" },
  { code: "SCW-APC-5L", name: "SCW All Purpose Cleaner 5L", unit: "Liter" },
]

function generateWorkOrderNumber(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const seq = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `JC.${year}.${month}.${seq}`
}

export default function CreateWorkOrderPage() {
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [workOrderNumber, setWorkOrderNumber] = useState(generateWorkOrderNumber())
  const [batchNo, setBatchNo] = useState("")
  const [keterangan, setKeterangan] = useState("")
  const [lines, setLines] = useState<WorkOrderLine[]>([
    { id: 1, itemName: "", code: "", quantity: 0, unit: "" },
  ])
  const [nextId, setNextId] = useState(2)

  const addLine = () => {
    setLines([
      ...lines,
      { id: nextId, itemName: "", code: "", quantity: 0, unit: "" },
    ])
    setNextId(nextId + 1)
  }

  const removeLine = (id: number) => {
    if (lines.length <= 1) return
    setLines(lines.filter((line) => line.id !== id))
  }

  const updateLine = (
    id: number,
    field: keyof WorkOrderLine,
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
          <Link href="/accounting/inventory/work-orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Buat Pekerjaan Pesanan
            </h1>
            <p className="text-sm text-slate-500">
              Buat pekerjaan pesanan baru untuk proses produksi
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
            Terbitkan Pekerjaan
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
              <Label htmlFor="number">Nomor Pekerjaan *</Label>
              <Input
                id="number"
                placeholder="JC.YYYY.MM.00001"
                value={workOrderNumber}
                onChange={(e) => setWorkOrderNumber(e.target.value)}
                className="bg-slate-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch">Batch No (Job Costing)</Label>
              <Input
                id="batch"
                placeholder="Masukkan nomor batch..."
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="keterangan">Keterangan</Label>
            <Input
              id="keterangan"
              placeholder="Deskripsi pekerjaan pesanan..."
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
              <ClipboardList className="h-5 w-5 text-indigo-600" />
              Detail Item Pekerjaan
            </CardTitle>
            <CardDescription>
              Daftar item yang akan dikerjakan dalam pesanan ini
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
                <TableHead className="w-[120px] text-right font-semibold text-slate-700">
                  Jumlah
                </TableHead>
                <TableHead className="w-[100px] font-semibold text-slate-700">
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
                      list="item-codes"
                    />
                    <datalist id="item-codes">
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
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Total {lines.filter((l) => l.code).length} item
              </span>
              <span className="text-sm text-slate-500">
                Total Jumlah:{" "}
                <strong className="text-slate-900">
                  {lines.reduce((sum, l) => sum + l.quantity, 0)}
                </strong>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
