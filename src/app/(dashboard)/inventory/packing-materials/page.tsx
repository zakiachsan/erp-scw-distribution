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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Package,
  Plus,
  Box,
  TrendingDown,
  History,
} from "lucide-react"

interface PackingMaterial {
  id: string
  name: string
  type: string
  stockQty: number
  unit: string
  reorderPoint: number
  location: string
  lastUsed: string
  status: "sufficient" | "low" | "critical"
}

const packingMaterials: PackingMaterial[] = [
  {
    id: "1",
    name: "Kardus Box (Small)",
    type: "Box",
    stockQty: 450,
    unit: "pcs",
    reorderPoint: 100,
    location: "Gudang Packing A",
    lastUsed: "2025-12-15",
    status: "sufficient",
  },
  {
    id: "2",
    name: "Kardus Box (Medium)",
    type: "Box",
    stockQty: 280,
    unit: "pcs",
    reorderPoint: 100,
    location: "Gudang Packing A",
    lastUsed: "2025-12-15",
    status: "sufficient",
  },
  {
    id: "3",
    name: "Kardus Box (Large)",
    type: "Box",
    stockQty: 45,
    unit: "pcs",
    reorderPoint: 50,
    location: "Gudang Packing A",
    lastUsed: "2025-12-14",
    status: "critical",
  },
  {
    id: "4",
    name: "Bubble Wrap (2m roll)",
    type: "Protection",
    stockQty: 12,
    unit: "rolls",
    reorderPoint: 10,
    location: "Gudang Packing B",
    lastUsed: "2025-12-15",
    status: "sufficient",
  },
  {
    id: "5",
    name: "Bubble Wrap (1m roll)",
    type: "Protection",
    stockQty: 3,
    unit: "rolls",
    reorderPoint: 10,
    location: "Gudang Packing B",
    lastUsed: "2025-12-15",
    status: "critical",
  },
  {
    id: "6",
    name: "Stretch Film",
    type: "Protection",
    stockQty: 8,
    unit: "rolls",
    reorderPoint: 5,
    location: "Gudang Packing B",
    lastUsed: "2025-12-13",
    status: "sufficient",
  },
  {
    id: "7",
    name: "Packing Tape (Clear)",
    type: "Sealing",
    stockQty: 25,
    unit: "rolls",
    reorderPoint: 15,
    location: "Gudang Packing C",
    lastUsed: "2025-12-15",
    status: "sufficient",
  },
  {
    id: "8",
    name: "Packing Tape (Brown)",
    type: "Sealing",
    stockQty: 8,
    unit: "rolls",
    reorderPoint: 15,
    location: "Gudang Packing C",
    lastUsed: "2025-12-14",
    status: "low",
  },
  {
    id: "9",
    name: "Foam Insert (Bottle)",
    type: "Insert",
    stockQty: 120,
    unit: "pcs",
    reorderPoint: 50,
    location: "Gudang Packing A",
    lastUsed: "2025-12-15",
    status: "sufficient",
  },
  {
    id: "10",
    name: "Plastic Bag (Large)",
    type: "Protection",
    stockQty: 350,
    unit: "pcs",
    reorderPoint: 100,
    location: "Gudang Packing C",
    lastUsed: "2025-12-15",
    status: "sufficient",
  },
  {
    id: "11",
    name: "Shrink Wrap Film",
    type: "Protection",
    stockQty: 6,
    unit: "rolls",
    reorderPoint: 5,
    location: "Gudang Packing B",
    lastUsed: "2025-12-12",
    status: "sufficient",
  },
  {
    id: "12",
    name: "Kertas Koran",
    type: "Protection",
    stockQty: 15,
    unit: "kg",
    reorderPoint: 10,
    location: "Gudang Packing A",
    lastUsed: "2025-12-14",
    status: "sufficient",
  },
]

const usageHistory = [
  { date: "2025-12-15", material: "Kardus Box (Small)", qty: 25, purpose: "Order #ORD-0451" },
  { date: "2025-12-15", material: "Packing Tape (Clear)", qty: 3, purpose: "Order #ORD-0451" },
  { date: "2025-12-15", material: "Foam Insert (Bottle)", qty: 12, purpose: "Order #ORD-0450" },
  { date: "2025-12-14", material: "Kardus Box (Medium)", qty: 18, purpose: "Order #ORD-0449" },
  { date: "2025-12-14", material: "Bubble Wrap (2m roll)", qty: 2, purpose: "Order #ORD-0448" },
  { date: "2025-12-13", material: "Kardus Box (Small)", qty: 30, purpose: "Bulk Shipment #SH-0089" },
  { date: "2025-12-12", material: "Stretch Film", qty: 1, purpose: "Pallet wrapping" },
]

const statusConfig = {
  sufficient: {
    label: "Sufficient",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  low: {
    label: "Low",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  critical: {
    label: "Critical",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
}

export default function PackingMaterialsPage() {
  const [addOpen, setAddOpen] = useState(false)
  const [matName, setMatName] = useState("")
  const [matUnit, setMatUnit] = useState("")
  const [matStock, setMatStock] = useState("")
  const [materialList, setMaterialList] = useState(packingMaterials)

  const addMaterial = () => {
    if (!matName.trim()) return
    const newMat = {
      id: String(materialList.length + 1),
      name: matName,
      type: "Protection",
      stockQty: Number(matStock) || 0,
      unit: matUnit || "pcs",
      reorderPoint: 10,
      location: "Gudang Packing A",
      lastUsed: new Date().toISOString().split("T")[0],
      status: "sufficient" as const,
    }
    setMaterialList([...materialList, newMat])
    setMatName("")
    setMatUnit("")
    setMatStock("")
    setAddOpen(false)
  }

  const totalItems = materialList.length
  const criticalItems = materialList.filter((p) => p.status === "critical").length
  const lowItems = materialList.filter((p) => p.status === "low").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packing Materials</h1>
          <p className="text-muted-foreground">
            Track and manage packaging supplies for order fulfillment
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger>
           <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input placeholder="Material Name" value={matName} onChange={(e) => setMatName(e.target.value)} />
              <Input placeholder="Unit (e.g. pcs, rolls, kg)" value={matUnit} onChange={(e) => setMatUnit(e.target.value)} />
              <Input placeholder="Stock Quantity" type="number" value={matStock} onChange={(e) => setMatStock(e.target.value)} />
              <Button onClick={addMaterial} className="w-full">Add Material</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Materials</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <TrendingDown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">{lowItems + criticalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50 dark:border-red-900/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <Box className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="h-5 w-5 text-indigo-600" />
            Materials Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Reorder Point</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialList.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{material.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {material.stockQty} {material.unit}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {material.reorderPoint} {material.unit}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {material.location}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[material.status].className}>
                      {statusConfig[material.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {material.lastUsed}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-indigo-600" />
            Recent Usage History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageHistory.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm text-muted-foreground">
                    {entry.date}
                  </TableCell>
                  <TableCell className="font-medium">{entry.material}</TableCell>
                  <TableCell className="text-right font-mono">{entry.qty}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {entry.purpose}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
