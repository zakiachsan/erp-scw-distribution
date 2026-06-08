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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { ClipboardCheck, AlertTriangle, CheckCircle2, ArrowUp, ArrowDown } from "lucide-react"

interface ProductOption {
  id: string
  sku: string
  name: string
  systemQty: number
  location: string
}

const productOptions: ProductOption[] = [
  { id: "1", sku: "SCW-SF-001", name: "SCW Snow Foam", systemQty: 245, location: "Rak A-01" },
  { id: "2", sku: "SCW-CC-002", name: "SCW Ceramic Coating", systemQty: 12, location: "Rak A-02" },
  { id: "3", sku: "SCW-ID-003", name: "SCW Interior Detailer", systemQty: 180, location: "Rak B-01" },
  { id: "4", sku: "SCW-TG-004", name: "SCW Tire Gel", systemQty: 95, location: "Rak B-02" },
  { id: "5", sku: "SCW-MW-006", name: "SCW Microfiber Wash", systemQty: 312, location: "Rak A-03" },
  { id: "6", sku: "SCW-SW-008", name: "SCW Spray Wax", systemQty: 156, location: "Rak B-03" },
  { id: "7", sku: "SCW-GC-009", name: "SCW Glass Cleaner", systemQty: 200, location: "Rak D-01" },
  { id: "8", sku: "SCW-LC-010", name: "SCW Leather Conditioner", systemQty: 45, location: "Rak D-02" },
]

interface OpnameEntry {
  productId: string
  physicalCount: number
  notes: string
}

export default function StockOpnamePage() {
  const [entries, setEntries] = useState<OpnameEntry[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [physicalCount, setPhysicalCount] = useState("")
  const [notes, setNotes] = useState("")

  const addEntry = () => {
    if (!selectedProduct || physicalCount === "") return
    const existing = entries.find((e) => e.productId === selectedProduct)
    if (existing) {
      setEntries(
        entries.map((e) =>
          e.productId === selectedProduct
            ? { ...e, physicalCount: parseInt(physicalCount), notes }
            : e
        )
      )
    } else {
      setEntries([
        ...entries,
        {
          productId: selectedProduct,
          physicalCount: parseInt(physicalCount),
          notes,
        },
      ])
    }
    setSelectedProduct("")
    setPhysicalCount("")
    setNotes("")
  }

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.productId !== id))
  }

  const getProduct = (id: string) => productOptions.find((p) => p.id === id)

  const totalVariance = entries.reduce((sum, entry) => {
    const product = getProduct(entry.productId)
    if (!product) return sum
    return sum + (entry.physicalCount - product.systemQty)
  }, 0)

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stock Opname</h1>
        <p className="text-muted-foreground">
          Record physical inventory counts and reconcile with system data
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-indigo-600" />
              Add Product Count
            </CardTitle>
            <CardDescription>
              Select a product and enter the physical count from the warehouse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Select Product</Label>
                <Select value={selectedProduct} onValueChange={(v) => setSelectedProduct(v ?? "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.sku} - {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Physical Count</Label>
                <Input
                  type="number"
                  placeholder="Enter physical count"
                  value={physicalCount}
                  onChange={(e) => setPhysicalCount(e.target.value)}
                />
              </div>
            </div>

            {selectedProduct && (
              <div className="rounded-lg border bg-muted/30 p-3">
                {(() => {
                  const product = getProduct(selectedProduct)
                  if (!product) return null
                  const phys = parseInt(physicalCount) || 0
                  const variance = phys - product.systemQty
                  return (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">System Count</p>
                        <p className="text-lg font-bold">{product.systemQty}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Physical Count</p>
                        <p className="text-lg font-bold">{phys || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Variance</p>
                        <p
                          className={`text-lg font-bold ${variance > 0 ? "text-emerald-600" : variance < 0 ? "text-red-600" : "text-muted-foreground"}`}
                        >
                          {physicalCount === ""
                            ? "-"
                            : variance > 0
                              ? `+${variance}`
                              : variance}
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea
                placeholder="Reason for variance, condition notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button onClick={addEntry} disabled={!selectedProduct || physicalCount === ""}>
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Add to Opname
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opname Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm text-muted-foreground">Items Checked</p>
                <p className="text-3xl font-bold text-indigo-600">{entries.length}</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm text-muted-foreground">Total Variance</p>
                <p
                  className={`text-3xl font-bold ${
                    totalVariance > 0
                      ? "text-emerald-600"
                      : totalVariance < 0
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {totalVariance > 0 ? "+" : ""}
                  {totalVariance}
                </p>
              </div>
            </div>

            {entries.length > 0 && (
              <div className="rounded-lg border bg-amber-50 p-3 dark:bg-amber-950/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                    {entries.filter((e) => {
                      const p = getProduct(e.productId)
                      return p && e.physicalCount !== p.systemQty
                    }).length}{" "}
                    item(s) have variances
                  </p>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              disabled={entries.length === 0}
            >
              Submit Stock Opname
            </Button>
          </CardContent>
        </Card>
      </div>

      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Opname Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">System</TableHead>
                  <TableHead className="text-right">Physical</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => {
                  const product = getProduct(entry.productId)
                  if (!product) return null
                  const variance = entry.physicalCount - product.systemQty
                  return (
                    <TableRow key={entry.productId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.location}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {product.systemQty}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold">
                        {entry.physicalCount}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {variance > 0 ? (
                            <ArrowUp className="h-3 w-3 text-emerald-600" />
                          ) : variance < 0 ? (
                            <ArrowDown className="h-3 w-3 text-red-600" />
                          ) : null}
                          <span
                            className={`font-mono font-bold ${
                              variance > 0
                                ? "text-emerald-600"
                                : variance < 0
                                  ? "text-red-600"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {variance > 0 ? "+" : ""}
                            {variance}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {entry.notes || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEntry(entry.productId)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
