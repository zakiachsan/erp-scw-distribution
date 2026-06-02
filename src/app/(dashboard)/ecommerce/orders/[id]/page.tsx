"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
  Package,
  User,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"

interface OrderItem {
  name: string
  sku: string
  qty: number
  price: number
  subtotal: number
}

interface OrderDetail {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  payment: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
}

const mockOrders: Record<string, OrderDetail> = {
  "ECO-2026-0156": {
    id: "ECO-2026-0156",
    date: "2026-06-01",
    status: "pending",
    payment: "Bank Transfer",
    customer: { name: "Ahmad Fauzi", email: "ahmad@gmail.com", phone: "0812-3456-7890", address: "Jl. Sudirman No. 45, Jakarta Selatan" },
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 2, price: 85000, subtotal: 170000 },
      { name: "SCW Ceramic Coating 9H", sku: "SCW-CC-002", qty: 1, price: 399000, subtotal: 399000 },
      { name: "SCW Microfiber Towel Set", sku: "SCW-MFT-015", qty: 2, price: 55000, subtotal: 110000 },
    ],
    subtotal: 679000,
    shipping: 25000,
    discount: 50000,
    total: 654000,
  },
  "ECO-2026-0154": {
    id: "ECO-2026-0154",
    date: "2026-05-30",
    status: "processing",
    payment: "Bank Transfer",
    customer: { name: "Budi Hartono", email: "budi@outlook.com", phone: "0856-7890-1234", address: "Jl. Gatot Subroto No. 12, Bandung" },
    items: [
      { name: "SCW Snow Foam", sku: "SCW-SF-001", qty: 5, price: 85000, subtotal: 425000 },
      { name: "SCW Shampoo Plus", sku: "SCW-SP-018", qty: 3, price: 65000, subtotal: 195000 },
      { name: "SCW Tire Gel Pro", sku: "SCW-TG-004", qty: 2, price: 65000, subtotal: 130000 },
      { name: "SCW Spray Wax", sku: "SCW-SW-008", qty: 1, price: 95000, subtotal: 95000 },
      { name: "SCW Foam Applicator Pad", sku: "SCW-FP-014", qty: 4, price: 35000, subtotal: 140000 },
    ],
    subtotal: 985000,
    shipping: 35000,
    discount: 0,
    total: 1020000,
  },
  "ECO-2026-0152": {
    id: "ECO-2026-0152",
    date: "2026-05-28",
    status: "shipped",
    payment: "Bank Transfer",
    customer: { name: "Dedi Kurniawan", email: "dedi@gmail.com", phone: "0878-9012-3456", address: "Jl. Pemuda No. 78, Surabaya" },
    items: [
      { name: "SCW Interior Detailer", sku: "SCW-ID-003", qty: 2, price: 75000, subtotal: 150000 },
      { name: "SCW Glass Cleaner", sku: "SCW-GC-009", qty: 3, price: 55000, subtotal: 165000 },
      { name: "SCW Leather Conditioner", sku: "SCW-LC-010", qty: 1, price: 110000, subtotal: 110000 },
      { name: "SCW Dashboard Coating", sku: "SCW-DC-016", qty: 2, price: 90000, subtotal: 180000 },
    ],
    subtotal: 605000,
    shipping: 30000,
    discount: 0,
    total: 635000,
  },
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  processing: { label: "Diproses", className: "bg-blue-100 text-blue-800" },
  shipped: { label: "Dikirim", className: "bg-violet-100 text-violet-800" },
  completed: { label: "Selesai", className: "bg-emerald-100 text-emerald-800" },
  cancelled: { label: "Dibatalkan", className: "bg-red-100 text-red-800" },
}

const statusSteps = ["pending", "processing", "shipped", "completed"]

const formatRupiah = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const order = mockOrders[orderId]

  if (!order) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/ecommerce/orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Order Tidak Ditemukan</h1>
            <p className="text-muted-foreground">Order {orderId} tidak ditemukan dalam sistem</p>
          </div>
        </div>
      </div>
    )
  }

  const currentStepIndex = statusSteps.indexOf(order.status)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/ecommerce/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Order {order.id}</h1>
          <p className="text-muted-foreground">
            Detail pesanan dari {order.customer.name}
          </p>
        </div>
        <Badge variant="outline" className={`text-sm px-3 py-1 ${statusConfig[order.status].className}`}>
          {statusConfig[order.status].label}
        </Badge>
      </div>

      {/* Status Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex && order.status !== "cancelled"
              const isCurrent = index === currentStepIndex && order.status !== "cancelled"
              return (
                <div key={step} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-orange-100" : ""}`}>
                    {index === 0 && <Clock className="h-5 w-5" />}
                    {index === 1 && <Package className="h-5 w-5" />}
                    {index === 2 && <Truck className="h-5 w-5" />}
                    {index === 3 && <CheckCircle className="h-5 w-5" />}
                  </div>
                  <p className={`mt-2 text-xs font-medium ${isCompleted ? "text-orange-600" : "text-gray-400"}`}>
                    {index === 0 && "Pending"}
                    {index === 1 && "Diproses"}
                    {index === 2 && "Dikirim"}
                    {index === 3 && "Selesai"}
                  </p>
                </div>
              )
            })}
            <div className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200 -z-0">
              <div
                className="h-full bg-orange-600 transition-all"
                style={{ width: `${Math.max(0, (currentStepIndex / (statusSteps.length - 1)) * 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Info + Customer */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-600" />
                <CardTitle className="text-base">Informasi Order</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nomor Order</span>
                <span className="font-mono font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tanggal</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className={statusConfig[order.status].className}>
                  {statusConfig[order.status].label}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pembayaran</span>
                <span>{order.payment}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-orange-600" />
                <CardTitle className="text-base">Informasi Pelanggan</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nama</span>
                <span className="font-medium">{order.customer.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span>{order.customer.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Telepon</span>
                <span>{order.customer.phone}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Alamat</span>
                <p className="mt-1">{order.customer.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {order.status !== "completed" && order.status !== "cancelled" && (
            <Card>
              <CardContent className="p-4 space-y-2">
                {order.status === "pending" && (
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Package className="mr-2 h-4 w-4" />
                    Proses Order
                  </Button>
                )}
                {order.status === "processing" && (
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Truck className="mr-2 h-4 w-4" />
                    Kirim Pesanan
                  </Button>
                )}
                {order.status === "shipped" && (
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Tandai Selesai
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Items + Payment Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Item Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{item.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{item.qty}</TableCell>
                      <TableCell className="text-right">{formatRupiah(item.price)}</TableCell>
                      <TableCell className="text-right font-medium">{formatRupiah(item.subtotal)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-600" />
                <CardTitle className="text-base">Ringkasan Pembayaran</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatRupiah(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pengiriman</span>
                  <span>{formatRupiah(order.shipping)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Diskon</span>
                    <span className="text-red-500">-{formatRupiah(order.discount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-lg">{formatRupiah(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
