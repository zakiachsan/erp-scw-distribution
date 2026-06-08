"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertTriangle,
  AlertCircle,
  Bell,
  Settings,
  ShoppingCart,
  TrendingDown,
} from "lucide-react"

interface AlertProduct {
  id: string
  sku: string
  name: string
  category: string
  currentStock: number
  threshold: number
  severity: "critical" | "warning"
  lastRestock: string
  supplier: string
  leadTimeDays: number
}

const alertProducts: AlertProduct[] = [
  {
    id: "5",
    sku: "SCW-CB-005",
    name: "SCW Clay Bar",
    category: "Prep",
    currentStock: 0,
    threshold: 20,
    severity: "critical",
    lastRestock: "2025-11-15",
    supplier: "PT Autocare Indonesia",
    leadTimeDays: 7,
  },
  {
    id: "13",
    sku: "SCW-BR-013",
    name: "SCW Brake Dust Remover",
    category: "Wheel",
    currentStock: 0,
    threshold: 15,
    severity: "critical",
    lastRestock: "2025-10-20",
    supplier: "ChemPro Asia",
    leadTimeDays: 14,
  },
  {
    id: "11",
    sku: "SCW-AW-011",
    name: "SCW All Purpose Cleaner",
    category: "Wash",
    currentStock: 5,
    threshold: 30,
    severity: "critical",
    lastRestock: "2025-12-01",
    supplier: "PT Autocare Indonesia",
    leadTimeDays: 7,
  },
  {
    id: "7",
    sku: "SCW-PC-007",
    name: "SCW Polish Compound",
    category: "Correction",
    currentStock: 8,
    threshold: 25,
    severity: "critical",
    lastRestock: "2025-12-05",
    supplier: "DetailPro Supply",
    leadTimeDays: 10,
  },
  {
    id: "2",
    sku: "SCW-CC-002",
    name: "SCW Ceramic Coating",
    category: "Coating",
    currentStock: 12,
    threshold: 15,
    severity: "warning",
    lastRestock: "2025-12-08",
    supplier: "NanoTech Coatings",
    leadTimeDays: 21,
  },
  {
    id: "17",
    sku: "SCW-IL-017",
    name: "SCW Iron Decontamination",
    category: "Decon",
    currentStock: 14,
    threshold: 20,
    severity: "warning",
    lastRestock: "2025-11-28",
    supplier: "ChemPro Asia",
    leadTimeDays: 14,
  },
  {
    id: "10",
    sku: "SCW-LC-010",
    name: "SCW Leather Conditioner",
    category: "Interior",
    currentStock: 45,
    threshold: 50,
    severity: "warning",
    lastRestock: "2025-12-10",
    supplier: "PT Autocare Indonesia",
    leadTimeDays: 7,
  },
]

export default function StockAlertPage() {
  const router = useRouter()
  const [thresholds, setThresholds] = useState<Record<string, number>>(
    Object.fromEntries(alertProducts.map((p) => [p.id, p.threshold]))
  )
  const [showSettings, setShowSettings] = useState(false)

  const criticalCount = alertProducts.filter((p) => p.severity === "critical").length
  const warningCount = alertProducts.filter((p) => p.severity === "warning").length
  const outOfStockCount = alertProducts.filter((p) => p.currentStock === 0).length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Alerts</h1>
          <p className="text-muted-foreground">
            Products below minimum stock threshold requiring attention
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="mr-2 h-4 w-4" />
          Thresholds
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Warning</p>
                <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-900/50 dark:bg-orange-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-orange-600">{outOfStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Threshold Settings
            </CardTitle>
            <CardDescription>
              Configure minimum stock thresholds for each product category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {alertProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Current: {product.currentStock}
                    </p>
                  </div>
                  <Input
                    type="number"
                    value={thresholds[product.id] || product.threshold}
                    onChange={(e) =>
                      setThresholds({
                        ...thresholds,
                        [product.id]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-20 text-right"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-indigo-600" />
            Alert List
          </CardTitle>
          <CardDescription>
            {alertProducts.length} product{alertProducts.length !== 1 ? "s" : ""} below
            threshold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-right">Threshold</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Lead Time</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className={
                    product.severity === "critical"
                      ? "bg-red-50/50 dark:bg-red-950/10"
                      : ""
                  }
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {product.sku}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-bold ${
                        product.currentStock === 0
                          ? "text-red-600"
                          : product.severity === "critical"
                            ? "text-orange-600"
                            : "text-amber-600"
                      }`}
                    >
                      {product.currentStock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {product.threshold}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        product.severity === "critical"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }
                    >
                      {product.severity === "critical" ? (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      )}
                      {product.severity === "critical" ? "Critical" : "Warning"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {product.supplier}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {product.leadTimeDays} days
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => router.push("/purchasing/create")}>
                      <ShoppingCart className="mr-2 h-3 w-3" />
                      Create PO
                    </Button>
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
