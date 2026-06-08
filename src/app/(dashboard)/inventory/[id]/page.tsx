"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  Edit,
  Barcode,
  Package,
  MapPin,
  Tag,
} from "lucide-react"

const productMap: Record<
  string,
  {
    id: string
    sku: string
    name: string
    category: string
    description: string
    barcode: string
    status: "in-stock" | "low-stock" | "out-of-stock"
    warehouses: { name: string; rak: string; qty: number }[]
    priceTiers: { tier: string; minQty: number; priceIDR: number; priceUSD: number }[]
  }
> = {
  "1": {
    id: "1",
    sku: "SCW-SF-001",
    name: "SCW Snow Foam",
    category: "Exterior",
    description:
      "High-foaming pre-wash snow foam for safe and effective removal of dirt and grime. pH-neutral formula safe for all surfaces.",
    barcode: "8991234567890",
    status: "in-stock",
    warehouses: [
      { name: "Gudang Utama", rak: "Rak A-01", qty: 150 },
      { name: "Gudang Cabang", rak: "Rak B-03", qty: 60 },
      { name: "Gudang Display", rak: "Rak D-01", qty: 35 },
    ],
    priceTiers: [
      { tier: "Retail", minQty: 1, priceIDR: 85000, priceUSD: 5.5 },
      { tier: "Wholesale", minQty: 10, priceIDR: 72000, priceUSD: 4.65 },
      { tier: "Distributor", minQty: 50, priceIDR: 58000, priceUSD: 3.75 },
      { tier: "Bulk", minQty: 100, priceIDR: 48000, priceUSD: 3.1 },
    ],
  },
  "2": {
    id: "2",
    sku: "SCW-CC-002",
    name: "SCW Ceramic Coating",
    category: "Coating",
    description:
      "Professional-grade ceramic coating providing up to 2 years of protection with hydrophobic and UV-resistant properties.",
    barcode: "8991234567891",
    status: "low-stock",
    warehouses: [
      { name: "Gudang Utama", rak: "Rak A-02", qty: 8 },
      { name: "Gudang Cabang", rak: "Rak C-01", qty: 4 },
    ],
    priceTiers: [
      { tier: "Retail", minQty: 1, priceIDR: 350000, priceUSD: 22.5 },
      { tier: "Wholesale", minQty: 5, priceIDR: 310000, priceUSD: 19.9 },
      { tier: "Distributor", minQty: 20, priceIDR: 260000, priceUSD: 16.7 },
      { tier: "Bulk", minQty: 50, priceIDR: 220000, priceUSD: 14.1 },
    ],
  },
}

const defaultProduct = {
  id: "0",
  sku: "SCW-ID-003",
  name: "SCW Interior Detailer",
  category: "Interior",
  description:
    "Premium interior detailer with UV protection and anti-static properties. Leaves a matte finish on dashboards and trim.",
  barcode: "8991234567892",
  status: "in-stock" as const,
  warehouses: [
    { name: "Gudang Utama", rak: "Rak B-01", qty: 120 },
    { name: "Gudang Cabang", rak: "Rak D-02", qty: 60 },
  ],
  priceTiers: [
    { tier: "Retail", minQty: 1, priceIDR: 75000, priceUSD: 4.85 },
    { tier: "Wholesale", minQty: 10, priceIDR: 65000, priceUSD: 4.2 },
    { tier: "Distributor", minQty: 50, priceIDR: 52000, priceUSD: 3.35 },
    { tier: "Bulk", minQty: 100, priceIDR: 42000, priceUSD: 2.7 },
  ],
}

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-emerald-100 text-emerald-800" },
  "low-stock": { label: "Low Stock", className: "bg-amber-100 text-amber-800" },
  "out-of-stock": { label: "Out of Stock", className: "bg-red-100 text-red-800" },
}

function formatIDR(val: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val)
}

function formatUSD(val: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val)
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const product = productMap[id] || { ...defaultProduct, id }

  const totalStock = product.warehouses.reduce((sum, w) => sum + w.qty, 0)

  const barcodeLines = product.barcode
    .split("")
    .map(() => "| || | || | || |")
    .join("\n")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/inventory">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground">{product.sku}</p>
          </div>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Product
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">SKU</p>
                  <p className="font-mono font-medium">{product.sku}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={statusConfig[product.status].className}>
                    {statusConfig[product.status].label}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Stock</p>
                  <p className="text-2xl font-bold">{totalStock} pcs</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{product.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Stock per Warehouse / Rak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Rak</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.warehouses.map((wh, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{wh.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{wh.rak}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">{wh.qty}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{totalStock}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Price Tiers
              </CardTitle>
              <CardDescription>
                Multi-tier pricing for different customer segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Min Qty</TableHead>
                    <TableHead className="text-right">Price (IDR)</TableHead>
                    <TableHead className="text-right">Price (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.priceTiers.map((tier) => (
                    <TableRow key={tier.tier}>
                      <TableCell className="font-medium">{tier.tier}</TableCell>
                      <TableCell className="text-right">{tier.minQty}+</TableCell>
                      <TableCell className="text-right font-mono">
                        {formatIDR(tier.priceIDR)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatUSD(tier.priceUSD)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Barcode className="h-4 w-4" />
                Barcode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-white p-4 text-center">
                <p className="mb-2 font-mono text-xs text-gray-500">
                  {product.barcode}
                </p>
                <div className="flex justify-center gap-[1px]">
                  {product.barcode.split("").map((char, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{
                        width: i % 3 === 0 ? "2px" : "1px",
                        height: "40px",
                      }}
                    />
                  ))}
                </div>
                <p className="mt-2 font-mono text-[10px]">{product.barcode}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Print Barcode
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4" />
                Print Price Tag
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Transfer Stock
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
