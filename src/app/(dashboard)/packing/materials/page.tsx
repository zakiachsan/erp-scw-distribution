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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Package,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  ClipboardList,
} from "lucide-react"

// ─── Materials Stock Data ──────────────────────────────────────────────────
interface PackingMaterial {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  unit: string
  usageThisMonth: number
  usageLastMonth: number
  cost: number
  status: "normal" | "low" | "critical"
}

const materials: PackingMaterial[] = [
  { id: "M01", name: "Cardboard Box (Large)", category: "Box", stock: 150, minStock: 50, unit: "pcs", usageThisMonth: 85, usageLastMonth: 92, cost: 3500, status: "normal" },
  { id: "M02", name: "Cardboard Box (Medium)", category: "Box", stock: 200, minStock: 80, unit: "pcs", usageThisMonth: 120, usageLastMonth: 115, cost: 2500, status: "normal" },
  { id: "M03", name: "Cardboard Box (Small)", category: "Box", stock: 30, minStock: 50, unit: "pcs", usageThisMonth: 45, usageLastMonth: 38, cost: 1800, status: "low" },
  { id: "M04", name: "Bubble Wrap Roll", category: "Protective", stock: 8, minStock: 10, unit: "rolls", usageThisMonth: 12, usageLastMonth: 10, cost: 25000, status: "critical" },
  { id: "M05", name: "Packing Tape (Clear)", category: "Sealing", stock: 100, minStock: 30, unit: "rolls", usageThisMonth: 65, usageLastMonth: 70, cost: 8000, status: "normal" },
  { id: "M06", name: "Packing Tape (Brown)", category: "Sealing", stock: 45, minStock: 20, unit: "rolls", usageThisMonth: 30, usageLastMonth: 28, cost: 9500, status: "normal" },
  { id: "M07", name: "Foam Sheet", category: "Protective", stock: 40, minStock: 25, unit: "sheets", usageThisMonth: 22, usageLastMonth: 18, cost: 5000, status: "normal" },
  { id: "M08", name: "Void Fill (Kertas)", category: "Filler", stock: 15, minStock: 20, unit: "kg", usageThisMonth: 18, usageLastMonth: 15, cost: 3000, status: "low" },
  { id: "M09", name: "Stretch Film", category: "Protective", stock: 25, minStock: 10, unit: "rolls", usageThisMonth: 8, usageLastMonth: 6, cost: 18000, status: "normal" },
  { id: "M10", name: "Label Sticker", category: "Labeling", stock: 500, minStock: 200, unit: "pcs", usageThisMonth: 180, usageLastMonth: 165, cost: 200, status: "normal" },
]

// ─── Usage Log Data ────────────────────────────────────────────────────────
interface UsageLogEntry {
  packingId: string
  soRef: string
  customer: string
  date: string
  status: "Queued" | "In Progress" | "Completed"
  materials: { name: string; qty: number; unit: string }[]
}

const usageLogs: UsageLogEntry[] = [
  { packingId: "PK-003", soRef: "SO-2026-043", customer: "UD Shinemax", date: "2026-06-10", status: "Completed", materials: [
    { name: "Cardboard Box (Large)", qty: 4, unit: "pcs" },
    { name: "Bubble Wrap Roll", qty: 12, unit: "meter" },
    { name: "Packing Tape (Clear)", qty: 6, unit: "roll" },
    { name: "Palet Kayu", qty: 1, unit: "pcs" },
  ]},
  { packingId: "PK-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", date: "2026-06-12", status: "In Progress", materials: [
    { name: "Cardboard Box (Medium)", qty: 3, unit: "pcs" },
    { name: "Bubble Wrap Roll", qty: 8, unit: "meter" },
    { name: "Packing Tape (Brown)", qty: 4, unit: "roll" },
    { name: "Void Fill (Kertas)", qty: 10, unit: "lembar" },
  ]},
  { packingId: "PK-006", soRef: "SO-2026-046", customer: "GlossUp Bali", date: "2026-06-02", status: "In Progress", materials: [
    { name: "Cardboard Box (Medium)", qty: 2, unit: "pcs" },
    { name: "Bubble Wrap Roll", qty: 4, unit: "meter" },
    { name: "Packing Tape (Clear)", qty: 2, unit: "roll" },
  ]},
  { packingId: "PK-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", date: "2026-06-15", status: "Queued", materials: [
    { name: "Cardboard Box (Large)", qty: 2, unit: "pcs" },
    { name: "Bubble Wrap Roll", qty: 5, unit: "meter" },
    { name: "Packing Tape (Clear)", qty: 3, unit: "roll" },
  ]},
  { packingId: "PK-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", date: "2026-05-18", status: "Queued", materials: [
    { name: "Cardboard Box (Small)", qty: 1, unit: "pcs" },
    { name: "Bubble Wrap Roll", qty: 3, unit: "meter" },
    { name: "Packing Tape (Clear)", qty: 2, unit: "roll" },
  ]},
  { packingId: "PK-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", date: "2026-05-15", status: "Queued", materials: [
    { name: "Cardboard Box (Large)", qty: 2, unit: "pcs" },
    { name: "Bubble Wrap Roll", qty: 6, unit: "meter" },
    { name: "Packing Tape (Brown)", qty: 3, unit: "roll" },
  ]},
]

const statusConfig: Record<string, { label: string; className: string }> = {
  normal: { label: "Normal", className: "bg-emerald-100 text-emerald-800" },
  low: { label: "Low Stock", className: "bg-amber-100 text-amber-800" },
  critical: { label: "Critical", className: "bg-red-100 text-red-800" },
}

const packingStatusConfig: Record<string, { className: string }> = {
  Queued: { className: "bg-gray-100 text-gray-800" },
  "In Progress": { className: "bg-amber-100 text-amber-800" },
  Completed: { className: "bg-emerald-100 text-emerald-800" },
}

export default function PackingMaterialsPage() {
  const [restockOpen, setRestockOpen] = useState(false)
  const [restockQty, setRestockQty] = useState("")

  const totalMaterials = materials.length
  const lowStockCount = materials.filter((m) => m.status === "low" || m.status === "critical").length
  const totalUsageCost = materials.reduce((sum, m) => sum + m.usageThisMonth * m.cost, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packing Materials</h1>
          <p className="text-muted-foreground">
            Stok material packing dan log penggunaan per transaksi
          </p>
        </div>
        <Dialog open={restockOpen} onOpenChange={setRestockOpen}>
          <DialogTrigger render={<Button />}>
            <Package className="mr-2 h-4 w-4" />
            Restock Materials
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Restock Materials</DialogTitle>
              <DialogDescription>Enter the quantity to restock for low/critical items.</DialogDescription>
            </DialogHeader>
            <div>
              <label className="text-sm font-medium">Quantity to Restock</label>
              <Input type="number" placeholder="e.g. 50" value={restockQty} onChange={(e) => setRestockQty(e.target.value)} />
            </div>
            <DialogFooter showCloseButton>
              <Button onClick={() => { alert(`Berhasil restock ${restockQty} unit!`); setRestockOpen(false); setRestockQty(""); }}>
                Submit Restock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Materials</p>
                <p className="text-2xl font-bold">{totalMaterials}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low / Critical Stock</p>
                <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Usage Cost</p>
                <p className="text-2xl font-bold">
                  Rp {(totalUsageCost / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="stock">
        <TabsList>
          <TabsTrigger value="stock" className="gap-1.5">
            <Package className="h-3.5 w-3.5" />
            Stock
          </TabsTrigger>
          <TabsTrigger value="usage-log" className="gap-1.5">
            <ClipboardList className="h-3.5 w-3.5" />
            Usage Log
          </TabsTrigger>
        </TabsList>

        {/* Stock Tab */}
        <TabsContent value="stock">
          <Card>
            <CardHeader>
              <CardTitle>Materials Stock</CardTitle>
              <CardDescription>Usage tracking and remaining stock per material type</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Min Stock</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead className="text-right">This Month</TableHead>
                    <TableHead className="text-right">Last Month</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => {
                    const stockPercent = Math.min(100, (material.stock / (material.minStock * 3)) * 100)
                    const usageChange = material.usageThisMonth - material.usageLastMonth
                    return (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{material.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {material.stock} {material.unit}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {material.minStock} {material.unit}
                        </TableCell>
                        <TableCell className="w-40">
                          <Progress
                            value={stockPercent}
                            className={`h-2 ${material.status === "critical" ? "[&>div]:bg-red-500" : material.status === "low" ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500"}`}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          {material.usageThisMonth} {material.unit}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span>{material.usageLastMonth} {material.unit}</span>
                            {usageChange !== 0 && (
                              <TrendingDown className={`h-3 w-3 ${usageChange > 0 ? "text-red-500 rotate-180" : "text-emerald-500"}`} />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          Rp {material.cost.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusConfig[material.status].className}>
                            {statusConfig[material.status].label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Log Tab */}
        <TabsContent value="usage-log">
          <Card>
            <CardHeader>
              <CardTitle>Material Usage Log</CardTitle>
              <CardDescription>Material yang digunakan di tiap transaksi packing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Packing ID</TableHead>
                    <TableHead>SO Ref</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Materials Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageLogs.map((log) => (
                    <TableRow key={log.packingId}>
                      <TableCell>
                        <Link href={`/packing/${log.packingId}`} className="text-blue-600 hover:underline font-medium text-sm">
                          {log.packingId}
                        </Link>
                      </TableCell>
                      <TableCell className="text-xs">{log.soRef}</TableCell>
                      <TableCell className="text-sm">{log.customer}</TableCell>
                      <TableCell className="text-sm">{log.date}</TableCell>
                      <TableCell>
                        <Badge className={`${packingStatusConfig[log.status].className} text-[10px]`}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {log.materials.map((mat, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px]">
                              {mat.name} × {mat.qty} {mat.unit}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
