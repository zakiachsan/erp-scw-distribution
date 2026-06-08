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
import { Switch } from "@/components/ui/switch"
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
  Percent,
  Save,
  Calculator,
  Package,
  RotateCcw,
} from "lucide-react"

const products = [
  { id: "P01", name: "SCW Snow Foam", sku: "SCW-SF-001" },
  { id: "P02", name: "SCW Ceramic Coating", sku: "SCW-CC-002" },
  { id: "P03", name: "SCW Interior Detailer", sku: "SCW-ID-003" },
  { id: "P04", name: "SCW Tire Gel", sku: "SCW-TG-004" },
  { id: "P05", name: "SCW Spray Wax", sku: "SCW-SW-008" },
  { id: "P06", name: "SCW Glass Cleaner", sku: "SCW-GC-009" },
]

interface TierRule {
  level: string
  minQty: number
  minAmount: number
  discountPercent: number
}

const defaultTypeARules: TierRule[] = [
  { level: "Bronze", minQty: 10, minAmount: 1000000, discountPercent: 2 },
  { level: "Silver", minQty: 25, minAmount: 5000000, discountPercent: 5 },
  { level: "Gold", minQty: 50, minAmount: 15000000, discountPercent: 8 },
  { minQty: 100, level: "Platinum", minAmount: 50000000, discountPercent: 12 },
]

const defaultTypeBRules: TierRule[] = [
  { level: "Bronze", minQty: 5, minAmount: 500000, discountPercent: 1 },
  { level: "Silver", minQty: 15, minAmount: 2000000, discountPercent: 3 },
  { level: "Gold", minQty: 30, minAmount: 8000000, discountPercent: 5 },
  { level: "Platinum", minQty: 60, minAmount: 20000000, discountPercent: 8 },
]

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-100 text-orange-800",
  Silver: "bg-gray-100 text-gray-800",
  Gold: "bg-yellow-100 text-yellow-800",
  Platinum: "bg-indigo-100 text-indigo-800",
}

export default function TieringPage() {
  const [selectedProduct, setSelectedProduct] = useState("P01")
  const [typeAEnabled, setTypeAEnabled] = useState(true)
  const [typeBEnabled, setTypeBEnabled] = useState(false)
  const [typeARules, setTypeARules] = useState<TierRule[]>(defaultTypeARules)
  const [typeBRules, setTypeBRules] = useState<TierRule[]>(defaultTypeBRules)

  // Simulation state
  const [simQty, setSimQty] = useState(50)
  const [simAmount, setSimAmount] = useState(15000000)

  const activeRules = typeAEnabled ? typeARules : typeBRules

  const simulatedTier = [...activeRules]
    .reverse()
    .find((r) => simQty >= r.minQty || simAmount >= r.minAmount)

  const simDiscount = simulatedTier ? simulatedTier.discountPercent : 0
  const simDiscountAmount = Math.round(simAmount * simDiscount / 100)
  const simFinal = simAmount - simDiscountAmount

  const updateRule = (index: number, field: keyof TierRule, value: number, isTypeA: boolean) => {
    if (isTypeA) {
      const newRules = [...typeARules]
      newRules[index] = { ...newRules[index], [field]: value }
      setTypeARules(newRules)
    } else {
      const newRules = [...typeBRules]
      newRules[index] = { ...newRules[index], [field]: value }
      setTypeBRules(newRules)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tiering Discount Configuration</h1>
          <p className="text-muted-foreground">
            Configure tier-based discount rules per product
          </p>
        </div>
        <Button onClick={() => alert("Konfigurasi berhasil disimpan!")}>
          <Save className="mr-2 h-4 w-4" />
          Save Configuration
        </Button>
      </div>

      {/* Product Selector & Type Toggle */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Product Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Product</Label>
                <Select value={selectedProduct} onValueChange={(v) => setSelectedProduct(v ?? "")}>
                  <SelectTrigger>
                    <Package className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tier Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-indigo-100 text-indigo-700">Type A</Badge>
                <div>
                  <p className="text-sm font-medium">Permanent Tier</p>
                  <p className="text-xs text-muted-foreground">Based on cumulative lifetime purchases</p>
                </div>
              </div>
              <Switch checked={typeAEnabled} onCheckedChange={setTypeAEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-100 text-amber-700">Type B</Badge>
                <div>
                  <p className="text-sm font-medium">Monthly Reset</p>
                  <p className="text-xs text-muted-foreground">Tier resets every month, based on monthly purchases</p>
                </div>
              </div>
              <Switch checked={typeBEnabled} onCheckedChange={setTypeBEnabled} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Rules Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-indigo-600" />
                Tier Rules
              </CardTitle>
              <CardDescription>
                {typeAEnabled ? "Type A — Permanent" : "Type B — Monthly Reset"} tier rules
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {typeAEnabled && (
                <Button variant="outline" size="sm" onClick={() => setTypeARules(defaultTypeARules)}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Type A
                </Button>
              )}
              {typeBEnabled && (
                <Button variant="outline" size="sm" onClick={() => setTypeBRules(defaultTypeBRules)}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Type B
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tier Level</TableHead>
                <TableHead className="text-right">Min Quantity</TableHead>
                <TableHead className="text-right">Min Amount (Rp)</TableHead>
                <TableHead className="text-right">Discount %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(typeAEnabled ? typeARules : typeBRules).map((rule, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant="outline" className={tierColors[rule.level]}>
                      {rule.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={rule.minQty}
                      onChange={(e) => updateRule(index, "minQty", parseInt(e.target.value) || 0, typeAEnabled)}
                      className="w-24 text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={rule.minAmount}
                      onChange={(e) => updateRule(index, "minAmount", parseInt(e.target.value) || 0, typeAEnabled)}
                      className="w-36 text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Input
                        type="number"
                        value={rule.discountPercent}
                        onChange={(e) => updateRule(index, "discountPercent", parseInt(e.target.value) || 0, typeAEnabled)}
                        className="w-20 text-right"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Preview Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            Preview Simulation
          </CardTitle>
          <CardDescription>Test tier discount with sample quantity and amount</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Simulate Quantity</Label>
                <Input
                  type="number"
                  value={simQty}
                  onChange={(e) => setSimQty(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Simulate Amount (Rp)</Label>
                <Input
                  type="number"
                  value={simAmount}
                  onChange={(e) => setSimAmount(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="rounded-xl border bg-muted/30 p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Matched Tier:</span>
                  {simulatedTier ? (
                    <Badge className={tierColors[simulatedTier.level]}>{simulatedTier.level}</Badge>
                  ) : (
                    <Badge variant="outline">No Tier</Badge>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Amount</span>
                  <span>Rp {simAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount ({simDiscount}%)</span>
                  <span className="text-emerald-600">-Rp {simDiscountAmount.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Final Amount</span>
                  <span className="text-indigo-600">Rp {simFinal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
