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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Percent,
  Save,
  Calculator,
  Package,
  RotateCcw,
  Infinity,
  RefreshCw,
  Users,
  ShoppingCart,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
} from "lucide-react"

// ─── Mock Products ──────────────────────────────────────────────────────────
const products = [
  { id: "P01", name: "SCW Snow Foam", sku: "SCW-SF-001" },
  { id: "P02", name: "SCW Ceramic Coating", sku: "SCW-CC-002" },
  { id: "P03", name: "SCW Interior Detailer", sku: "SCW-ID-003" },
  { id: "P04", name: "SCW Tire Gel", sku: "SCW-TG-004" },
  { id: "P05", name: "SCW Spray Wax", sku: "SCW-SW-008" },
  { id: "P06", name: "SCW Glass Cleaner", sku: "SCW-GC-009" },
]

// ─── Type A: Tier level structure (preserved for customer assignments) ──────
interface TierRule {
  level: string
  minQty: number
  minAmount: number
  discountPercent: number
}

const defaultTypeARules: TierRule[] = [
  { level: "Bronze", minQty: 10, minAmount: 1_000_000, discountPercent: 2 },
  { level: "Silver", minQty: 25, minAmount: 5_000_000, discountPercent: 5 },
  { level: "Gold", minQty: 50, minAmount: 15_000_000, discountPercent: 8 },
  { level: "Platinum", minQty: 100, minAmount: 50_000_000, discountPercent: 12 },
]

// ─── Type A: Mock customer data showing permanent tier assignment ──────────
interface CustomerTierAssignment {
  id: string
  name: string
  totalQty: number
  totalSpent: number
  currentTier: string
  achievedDate: string
  isPermanent: boolean
}

const mockCustomers: CustomerTierAssignment[] = [
  { id: "C001", name: "PT Maju Jaya Abadi", totalQty: 120, totalSpent: 62_000_000, currentTier: "Platinum", achievedDate: "2025-11-15", isPermanent: true },
  { id: "C002", name: "CV Sukses Selalu", totalQty: 55, totalSpent: 18_500_000, currentTier: "Gold", achievedDate: "2026-01-20", isPermanent: true },
  { id: "C003", name: "Toko Serba Cuci", totalQty: 30, totalSpent: 6_200_000, currentTier: "Silver", achievedDate: "2026-03-10", isPermanent: true },
  { id: "C004", name: "Bengkel Bersih Sentosa", totalQty: 12, totalSpent: 1_500_000, currentTier: "Bronze", achievedDate: "2026-04-05", isPermanent: true },
  { id: "C005", name: "Distributor SCW Medan", totalQty: 8, totalSpent: 850_000, currentTier: "Bronze", achievedDate: "2026-05-01", isPermanent: true },
]

// ─── Type B: Per-product discount config ────────────────────────────────────
interface TypeBProductRule {
  productId: string
  discountPercent: number
  activeMonth: string  // e.g. "June 2026"
  lastResetDate: string
}

const defaultTypeBRules: TypeBProductRule[] = products.map((p) => ({
  productId: p.id,
  discountPercent: p.id === "P01" ? 5 : p.id === "P03" ? 3 : 0,
  activeMonth: "June 2026",
  lastResetDate: "2026-06-01",
}))

// ─── Type B: Mock monthly history showing resets ────────────────────────────
interface MonthlyResetLog {
  month: string
  productId: string
  discountPercent: number
  totalOrders: number
  totalDiscountGiven: number
}

const mockMonthlyHistory: MonthlyResetLog[] = [
  { month: "April 2026", productId: "P01", discountPercent: 5, totalOrders: 34, totalDiscountGiven: 2_450_000 },
  { month: "May 2026", productId: "P01", discountPercent: 5, totalOrders: 41, totalDiscountGiven: 3_120_000 },
  { month: "April 2026", productId: "P03", discountPercent: 3, totalOrders: 22, totalDiscountGiven: 890_000 },
  { month: "May 2026", productId: "P03", discountPercent: 3, totalOrders: 28, totalDiscountGiven: 1_150_000 },
]

// ─── Helpers ────────────────────────────────────────────────────────────────
const tierColors: Record<string, string> = {
  Bronze: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  Silver: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
  Gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Platinum: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID").format(n)
}

function parseFormattedNumber(val: string): number {
  return parseInt(val.replace(/\./g, "")) || 0
}

function formatNumber(val: number): string {
  return val.toLocaleString("id-ID")
}

// ═══════════════════════════════════════════════════════════════════════════
export default function TieringPage() {
  const [selectedProduct, setSelectedProduct] = useState("P01")
  const [tab, setTab] = useState("typeA")

  // Type A state
  const [typeARules, setTypeARules] = useState<TierRule[]>(defaultTypeARules)
  const [editTierRules, setEditTierRules] = useState(false)
  const [assignedProducts, setAssignedProducts] = useState<string[]>(["P01", "P02"])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [addProductId, setAddProductId] = useState("P03")
  const [removeConfirm, setRemoveConfirm] = useState<string | null>(null)

  // Type B state
  const [typeBProducts, setTypeBProducts] = useState<string[]>(["P01", "P02", "P03"])
  const [typeBRules, setTypeBRules] = useState<TypeBProductRule[]>(
    products.filter((p) => ["P01", "P02", "P03"].includes(p.id)).map((p) => ({
      productId: p.id,
      discountPercent: p.id === "P01" ? 5 : p.id === "P03" ? 3 : 0,
      activeMonth: "June 2026",
      lastResetDate: "2026-06-01",
    }))
  )
  const [editTypeBRules, setEditTypeBRules] = useState(false)
  const [showAddTypeB, setShowAddTypeB] = useState(false)
  const [addTypeBId, setAddTypeBId] = useState("P04")
  const [removeTypeBConfirm, setRemoveTypeBConfirm] = useState<string | null>(null)

  // Simulation state
  const [simQty, setSimQty] = useState(50)
  const [simAmount, setSimAmount] = useState(15_000_000)

  // ── Type A handlers ─────────────────────────────────────────────────────
  const updateTierRule = (index: number, field: keyof TierRule, value: number) => {
    const newRules = [...typeARules]
    newRules[index] = { ...newRules[index], [field]: value }
    setTypeARules(newRules)
  }

  // ── Type B handlers ─────────────────────────────────────────────────────
  const updateProductDiscount = (productId: string, value: number) => {
    setTypeBRules((prev) =>
      prev.map((r) => (r.productId === productId ? { ...r, discountPercent: value } : r))
    )
  }

  const getProductDiscount = (productId: string) =>
    typeBRules.find((r) => r.productId === productId)?.discountPercent ?? 0

  // ── Simulation ──────────────────────────────────────────────────────────
  const simulatedTier = [...typeARules]
    .reverse()
    .find((r) => simQty >= r.minQty || simAmount >= r.minAmount)

  const simTypeADiscount = simulatedTier ? simulatedTier.discountPercent : 0
  const simTypeBDiscount = getProductDiscount(selectedProduct)
  const simDiscount = tab === "typeA" ? simTypeADiscount : simTypeBDiscount
  const simDiscountAmount = Math.round((simAmount * simDiscount) / 100)
  const simFinal = simAmount - simDiscountAmount

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className="space-y-6 p-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl  tracking-tight">Tiering Discount Configuration</h1>
          <p className="text-muted-foreground">
            Configure tier-based discount rules — Type A (Permanent) or Type B (Monthly Reset)
          </p>
        </div>
        <Button onClick={() => alert("Konfigurasi berhasil disimpan!")}>
          <Save className="mr-2 h-4 w-4" />
          Save Configuration
        </Button>
      </div>

      {/* ── Tabs: Type A | Type B ───────────────────────────────────── */}
      <Tabs value={tab} onValueChange={(v) => setTab(v ?? "typeA")}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="typeA" className="gap-2">
            <Infinity className="h-4 w-4 text-indigo-500" />
            Type A — Permanen
          </TabsTrigger>
          <TabsTrigger value="typeB" className="gap-2">
            <RefreshCw className="h-4 w-4 text-amber-500" />
            Type B — Reset Bulanan
          </TabsTrigger>
        </TabsList>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* TYPE A — PERMANEN                                            */}
        {/* ════════════════════════════════════════════════════════════ */}
        <TabsContent value="typeA" className="space-y-6 pt-4">
          {/* Type A Info Banner */}
          <Card className="border-indigo-200 bg-indigo-50/40">
            <CardContent className="flex items-center gap-3 p-3">
              <Infinity className="h-5 w-5 text-indigo-600 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-indigo-800">
                  Type A — Permanent Tier Discount
                </p>
                <p className="text-xs text-indigo-700/80">
                  Once a customer reaches a tier level based on cumulative lifetime purchases, the discount applies <strong>permanently</strong>. Tier status is never reset.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Selector — daftar produk yang masuk Type A */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4 text-indigo-500" />
                  Produk Type A ({assignedProducts.length})
                </CardTitle>
                <Button size="sm" variant="outline" onClick={() => { setAddProductId("P03"); setShowAddProduct(true) }}>
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Tambah Produk
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {assignedProducts.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Belum ada produk yang masuk Type A. Klik "Tambah Produk" untuk menambahkan.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {assignedProducts.map((pid) => {
                    const p = products.find((pr) => pr.id === pid)
                    return (
                      <div key={pid} className="flex items-center justify-between rounded-md border p-2.5">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-indigo-500" />
                          <span className="text-sm font-medium">{p?.name || pid}</span>
                          <span className="text-xs text-muted-foreground">({p?.sku})</span>
                        </div>
                        <button
                          onClick={() => setRemoveConfirm(pid)}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tier Rules Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-indigo-600" />
                    Tier Level Rules
                  </CardTitle>
                  <CardDescription>
                    Configure tier thresholds and discount percentage for each level
                  </CardDescription>
                </div>
                <Button
                  variant={editTierRules ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (editTierRules) {
                      setEditTierRules(false)
                    } else {
                      setEditTierRules(true)
                    }
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {editTierRules ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Tier Level</TableHead>
                    <TableHead className="text-right">Min Quantity</TableHead>
                    <TableHead className="text-right">Min Amount (Rp)</TableHead>
                    <TableHead className="text-right">Discount %</TableHead>
                    <TableHead className="text-center">Permanent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {typeARules.map((rule, index) => (
                    <TableRow key={rule.level}>
                      <TableCell>
                        <Badge variant="outline" className={tierColors[rule.level]}>
                          <Award className="mr-1 h-3 w-3" />
                          {rule.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          value={rule.minQty}
                          onChange={(e) =>
                            updateTierRule(index, "minQty", parseInt(e.target.value) || 0)
                          }
                          disabled={!editTierRules}
                          className="w-24 text-right ml-auto"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={formatNumber(rule.minAmount)}
                          onChange={(e) =>
                            updateTierRule(index, "minAmount", parseFormattedNumber(e.target.value))
                          }
                          disabled={!editTierRules}
                          className="w-36 text-right ml-auto"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Input
                            type="number"
                            value={rule.discountPercent}
                            onChange={(e) =>
                              updateTierRule(index, "discountPercent", parseInt(e.target.value) || 0)
                            }
                            disabled={!editTierRules}
                            className="w-20 text-right"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Lifetime
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Mock Data: Customer Tier Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Customer Tier Assignments
              </CardTitle>
              <CardDescription>
                Customer yang sudah mendapatkan tier permanent berdasarkan total pembelian.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Total Qty</TableHead>
                    <TableHead className="text-right">Total Spent (Rp)</TableHead>
                    <TableHead className="text-center">Discount</TableHead>
                    <TableHead>Since</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map((c) => {
                    const matchingTier = typeARules.find((t) => t.level === c.currentTier)
                    const effectiveDiscount = matchingTier?.discountPercent ?? 0
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="">{c.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={tierColors[c.currentTier]}>
                            <Award className="mr-1 h-3 w-3" />
                            {c.currentTier}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{c.totalQty}</TableCell>
                        <TableCell className="text-right">
                          Rp {formatRupiah(c.totalSpent)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 text-xs">
                            {effectiveDiscount}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {c.achievedDate}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* TYPE B — RESET BULANAN                                       */}
        {/* ════════════════════════════════════════════════════════════ */}
        <TabsContent value="typeB" className="space-y-6 pt-4">
          {/* Type B Info Banner */}
          <Card className="border-amber-200 bg-amber-50/40">
            <CardContent className="flex items-center gap-3 p-3">
              <RefreshCw className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-amber-800">
                  Type B — Reset Bulanan
                </p>
                <p className="text-xs text-amber-700/80">
                  Bedanya dengan Type A, akumulasi belanja customer di-reset tiap bulan ke 0.
                  Setiap awal bulan, semua customer kembali ke tier terendah.
                  Produk & tier rules bisa diatur sendiri, tidak terikat dengan Type A.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Produk Type B */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Package className="h-4 w-4 text-amber-600" />
                  Produk Type B ({typeBProducts.length})
                </CardTitle>
                <Button size="sm" variant="outline" onClick={() => { setAddTypeBId("P04"); setShowAddTypeB(true) }}>
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Tambah Produk
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {typeBProducts.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Belum ada produk yang masuk Type B. Klik "Tambah Produk" untuk menambahkan.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {typeBProducts.map((pid) => {
                    const p = products.find((pr) => pr.id === pid)
                    return (
                      <div key={pid} className="flex items-center justify-between rounded-md border p-2.5">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-amber-600" />
                          <span className="text-sm font-medium">{p?.name || pid}</span>
                          <span className="text-xs text-muted-foreground">({p?.sku})</span>
                        </div>
                        <button
                          onClick={() => setRemoveTypeBConfirm(pid)}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tier Rules Type B */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-amber-600" />
                    Tier Rules Type B
                  </CardTitle>
                  <CardDescription>
                    Configure tier thresholds and discount percentage for Type B
                  </CardDescription>
                </div>
                <Button
                  variant={editTypeBRules ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditTypeBRules(!editTypeBRules)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {editTypeBRules ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {typeBProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-3 text-center">Tambah produk terlebih dahulu</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Tier Level</TableHead>
                      <TableHead className="text-right">Min Quantity</TableHead>
                      <TableHead className="text-right">Min Amount (Rp)</TableHead>
                      <TableHead className="text-right">Discount %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {typeARules.map((rule, index) => (
                      <TableRow key={rule.level}>
                        <TableCell>
                          <Badge variant="outline" className={tierColors[rule.level]}>
                            <Award className="mr-1 h-3 w-3" />
                            {rule.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            value={rule.minQty}
                            onChange={(e) =>
                              updateTierRule(index, "minQty", parseInt(e.target.value) || 0)
                            }
                            disabled={!editTypeBRules}
                            className="w-24 text-right ml-auto"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={formatNumber(rule.minAmount)}
                            onChange={(e) =>
                              updateTierRule(index, "minAmount", parseFormattedNumber(e.target.value))
                            }
                            disabled={!editTypeBRules}
                            className="w-36 text-right ml-auto"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Input
                              type="number"
                              value={rule.discountPercent}
                              onChange={(e) =>
                                updateTierRule(index, "discountPercent", parseInt(e.target.value) || 0)
                              }
                              disabled={!editTypeBRules}
                              className="w-20 text-right"
                            />
                            <span className="text-sm text-muted-foreground">%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Monthly Reset History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                Monthly Reset History
              </CardTitle>
              <CardDescription>
                Riwayat reset diskon Type B setiap bulan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Discount %</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="text-right">Total Discount Given (Rp)</TableHead>
                    <TableHead>Reset Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMonthlyHistory.map((entry, i) => {
                    const product = products.find((p) => p.id === entry.productId)
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Badge variant="outline" className="border-sky-200 text-sky-700 dark:border-sky-700 dark:text-sky-400">
                            <Calendar className="mr-1 h-3 w-3" />
                            {entry.month}
                          </Badge>
                        </TableCell>
                        <TableCell className="">{product?.name}</TableCell>
                        <TableCell className="text-right">{entry.discountPercent}%</TableCell>
                        <TableCell className="text-right">{entry.totalOrders}</TableCell>
                        <TableCell className="text-right">Rp {formatRupiah(entry.totalDiscountGiven)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                          >
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Applied &amp; Reset
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <p className="mt-4 text-xs text-muted-foreground">
                * Each month, discounts start fresh. No carry-over from previous months.
                This is the key difference from Type A (Permanent).
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirm Hapus Type B Dialog */}
      <Dialog open={!!removeTypeBConfirm} onOpenChange={(o) => { if (!o) setRemoveTypeBConfirm(null) }}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Hapus Produk?</DialogTitle>
            <DialogDescription>
              {(() => {
                const p = products.find((pr) => pr.id === removeTypeBConfirm)
                return `Yakin ingin menghapus "${p?.name || removeTypeBConfirm}" dari Type B?`
              })()}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setRemoveTypeBConfirm(null)}>Batal</Button>
            <Button variant="destructive" size="sm" onClick={() => {
              if (removeTypeBConfirm) {
                setTypeBProducts((prev) => prev.filter((x) => x !== removeTypeBConfirm))
                setTypeBRules((prev) => prev.filter((r) => r.productId !== removeTypeBConfirm))
              }
              setRemoveTypeBConfirm(null)
            }}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tambah Produk Type B Dialog */}
      <Dialog open={showAddTypeB} onOpenChange={setShowAddTypeB}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Tambah Produk Type B</DialogTitle>
            <DialogDescription>Pilih produk yang akan masuk program Type B</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-xs">Produk</Label>
            <Select value={addTypeBId} onValueChange={(v) => setAddTypeBId(v ?? "P04")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {products
                  .filter((p) => !typeBProducts.includes(p.id))
                  .map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {products.filter((p) => !typeBProducts.includes(p.id)).length === 0 && (
              <p className="text-xs text-muted-foreground">Semua produk sudah ditambahkan</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowAddTypeB(false)}>Batal</Button>
            <Button size="sm" disabled={products.filter((p) => !typeBProducts.includes(p.id)).length === 0}
              onClick={() => {
                setTypeBProducts((prev) => [...prev, addTypeBId])
                if (!typeBRules.find((r) => r.productId === addTypeBId)) {
                  setTypeBRules((prev) => [...prev, {
                    productId: addTypeBId,
                    discountPercent: 0,
                    activeMonth: "June 2026",
                    lastResetDate: "2026-06-01",
                  }])
                }
                setShowAddTypeB(false)
              }}
            >Tambah</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Hapus Dialog */}
      <Dialog open={!!removeConfirm} onOpenChange={(o) => { if (!o) setRemoveConfirm(null) }}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Hapus Produk?</DialogTitle>
            <DialogDescription>
              {(() => {
                const p = products.find((pr) => pr.id === removeConfirm)
                return `Yakin ingin menghapus "${p?.name || removeConfirm}" dari program Type A?`
              })()}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setRemoveConfirm(null)}>Batal</Button>
            <Button variant="destructive" size="sm" onClick={() => {
              if (removeConfirm) setAssignedProducts((prev) => prev.filter((x) => x !== removeConfirm))
              setRemoveConfirm(null)
            }}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tambah Produk Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Tambah Produk</DialogTitle>
            <DialogDescription>Pilih produk yang akan masuk program Type A</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-xs">Produk</Label>
            <Select value={addProductId} onValueChange={(v) => setAddProductId(v ?? "P03")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {products
                  .filter((p) => !assignedProducts.includes(p.id))
                  .map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {products.filter((p) => !assignedProducts.includes(p.id)).length === 0 && (
              <p className="text-xs text-muted-foreground">Semua produk sudah ditambahkan</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowAddProduct(false)}>Batal</Button>
            <Button size="sm" disabled={products.filter((p) => !assignedProducts.includes(p.id)).length === 0}
              onClick={() => {
                setAssignedProducts((prev) => [...prev, addProductId])
                setShowAddProduct(false)
              }}
            >Tambah</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Simulation / Preview ────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calculator className="h-4 w-4 text-indigo-600" />
              Preview Simulation
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {tab === "typeA" ? "Type A — Permanent" : "Type B — Monthly Reset"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Simulate Quantity</Label>
                <Input
                  type="number"
                  value={simQty}
                  onChange={(e) => setSimQty(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Simulate Amount (Rp)</Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formatNumber(simAmount)}
                  onChange={(e) => setSimAmount(parseFormattedNumber(e.target.value))}
                />
              </div>
              {tab === "typeB" && (
                <div className="space-y-1">
                  <Label className="text-xs">Product (for Type B rate)</Label>
                  <Select value={selectedProduct} onValueChange={(v) => setSelectedProduct(v ?? "")}>
                    <SelectTrigger>
                      <Package className="mr-2 h-4 w-4" />
                      {products.find((p) => p.id === selectedProduct)?.name || selectedProduct}
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="rounded-lg border bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    tab === "typeA"
                      ? "border-indigo-200 text-indigo-700 dark:border-indigo-700 dark:text-indigo-400"
                      : "border-amber-200 text-amber-700 dark:border-amber-700 dark:text-amber-400"
                  }
                >
                  {tab === "typeA" ? (
                    <Infinity className="mr-1 h-3 w-3" />
                  ) : (
                    <RefreshCw className="mr-1 h-3 w-3" />
                  )}
                  {tab === "typeA" ? "Type A — Permanent" : "Type B — Monthly Reset"}
                </Badge>
              </div>
              <div className="space-y-3">
                {tab === "typeA" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Matched Tier:</span>
                    {simulatedTier ? (
                      <Badge className={tierColors[simulatedTier.level]}>
                        {simulatedTier.level}
                      </Badge>
                    ) : (
                      <Badge variant="outline">No Tier</Badge>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Product Discount:</span>
                    <Badge
                      variant="outline"
                      className="border-amber-200 text-amber-700 dark:border-amber-700 dark:text-amber-400"
                    >
                      {getProductDiscount(selectedProduct)}% off
                    </Badge>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Amount</span>
                  <span>Rp {formatRupiah(simAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Discount ({simDiscount}%)
                  </span>
                  <span className="text-emerald-600">
                    -Rp {formatRupiah(simDiscountAmount)}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between  text-lg">
                  <span>Final Amount</span>
                  <span className="text-indigo-600">Rp {formatRupiah(simFinal)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
