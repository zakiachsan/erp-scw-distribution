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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
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
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
} from "lucide-react"

interface CustomerDetail {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  avatar: string
  totalOrders: number
  totalSpent: number
  avgOrderValue: number
}

interface OrderHistory {
  id: string
  date: string
  items: string
  total: number
  status: string
}

interface Review {
  id: string
  product: string
  rating: number
  comment: string
  date: string
}

const mockCustomers: Record<string, CustomerDetail> = {
  "CUST-001": {
    id: "CUST-001", name: "Ahmad Fauzi", email: "ahmad@gmail.com", phone: "0812-3456-7890",
    address: "Jl. Sudirman No. 45, Jakarta Selatan", joinDate: "2025-01-15", avatar: "AF",
    totalOrders: 12, totalSpent: 3250000, avgOrderValue: 270833,
  },
  "CUST-002": {
    id: "CUST-002", name: "Siti Nurhaliza", email: "siti@gmail.com", phone: "0856-7890-1234",
    address: "Jl. Thamrin No. 22, Jakarta Pusat", joinDate: "2025-03-22", avatar: "SN",
    totalOrders: 8, totalSpent: 2100000, avgOrderValue: 262500,
  },
  "CUST-003": {
    id: "CUST-003", name: "Budi Hartono", email: "budi@outlook.com", phone: "0878-9012-3456",
    address: "Jl. Gatot Subroto No. 12, Bandung", joinDate: "2024-11-10", avatar: "BH",
    totalOrders: 15, totalSpent: 5875000, avgOrderValue: 391667,
  },
  "CUST-005": {
    id: "CUST-005", name: "Dedi Kurniawan", email: "dedi@gmail.com", phone: "0813-5678-9012",
    address: "Jl. Pemuda No. 78, Surabaya", joinDate: "2024-12-05", avatar: "DK",
    totalOrders: 10, totalSpent: 4680000, avgOrderValue: 468000,
  },
}

const mockOrderHistory: Record<string, OrderHistory[]> = {
  "CUST-001": [
    { id: "ECO-2026-0156", date: "2026-06-01", items: "SCW Snow Foam x2, SCW Ceramic Coating x1", total: 654000, status: "pending" },
    { id: "ECO-2026-0142", date: "2026-05-15", items: "SCW Interior Detailer x3, SCW Tire Gel x2", total: 425000, status: "completed" },
    { id: "ECO-2026-0128", date: "2026-04-28", items: "SCW Spray Wax x5", total: 475000, status: "completed" },
    { id: "ECO-2026-0115", date: "2026-04-10", items: "SCW Ceramic Coating x2, SCW Glass Cleaner x3", total: 965000, status: "completed" },
    { id: "ECO-2026-0098", date: "2026-03-20", items: "SCW Snow Foam x10", total: 850000, status: "completed" },
  ],
  "CUST-002": [
    { id: "ECO-2026-0155", date: "2026-06-01", items: "SCW Ceramic Coating 9H x1", total: 399000, status: "pending" },
    { id: "ECO-2026-0138", date: "2026-05-10", items: "SCW Leather Conditioner x2, SCW Dashboard Coating x1", total: 310000, status: "completed" },
    { id: "ECO-2026-0120", date: "2026-04-22", items: "SCW All Purpose Cleaner x5", total: 350000, status: "completed" },
  ],
  "CUST-003": [
    { id: "ECO-2026-0154", date: "2026-05-30", items: "SCW Snow Foam x5, SCW Shampoo Plus x3", total: 1020000, status: "processing" },
    { id: "ECO-2026-0140", date: "2026-05-12", items: "SCW Ceramic Coating x3, SCW Polish Compound x2", total: 1650000, status: "completed" },
    { id: "ECO-2026-0125", date: "2026-04-25", items: "SCW Tire Gel x10, SCW Wheel Sealant x5", total: 1225000, status: "completed" },
  ],
  "CUST-005": [
    { id: "ECO-2026-0152", date: "2026-05-28", items: "SCW Interior Detailer x2, SCW Glass Cleaner x3", total: 635000, status: "shipped" },
    { id: "ECO-2026-0135", date: "2026-05-05", items: "SCW Brake Dust Remover x4, SCW Wheel Sealant x2", total: 480000, status: "completed" },
  ],
}

const mockReviews: Record<string, Review[]> = {
  "CUST-001": [
    { id: "R001", product: "SCW Snow Foam", rating: 5, comment: "Busa tebal, sangat efektif membersihkan kotoran. Recommended!", date: "2026-05-20" },
    { id: "R002", product: "SCW Ceramic Coating 9H", rating: 5, comment: "Coating terbaik yang pernah saya pakai. Kilau tahan lama.", date: "2026-04-15" },
    { id: "R003", product: "SCW Spray Wax", rating: 4, comment: "Mudah diaplikasi, hasil mengkilap. Cocok untuk quick detail.", date: "2026-03-25" },
  ],
  "CUST-002": [
    { id: "R004", product: "SCW Ceramic Coating 9H", rating: 5, comment: "Sangat puas dengan hasil coating. Mobil terlihat seperti baru.", date: "2026-06-01" },
    { id: "R005", product: "SCW Leather Conditioner", rating: 4, comment: "Kulit jadi lembut dan wangi. Bagus untuk jok kulit.", date: "2026-05-12" },
  ],
  "CUST-003": [
    { id: "R006", product: "SCW Snow Foam", rating: 5, comment: "Order dalam jumlah banyak untuk detailing shop. Konsisten kualitasnya.", date: "2026-05-30" },
    { id: "R007", product: "SCW Shampoo Plus", rating: 5, comment: "Shampoo terbaik, busa melimpah dan tidak merusak coating.", date: "2026-05-15" },
    { id: "R008", product: "SCW Ceramic Coating", rating: 4, comment: "Hasil bagus, aplikasi mudah. Harga worth it.", date: "2026-04-28" },
  ],
  "CUST-005": [
    { id: "R009", product: "SCW Interior Detailer", rating: 5, comment: "Interior jadi bersih dan wangi. Sering repeat order.", date: "2026-05-28" },
  ],
}

const formatRupiah = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  processing: { label: "Diproses", className: "bg-blue-100 text-blue-800" },
  shipped: { label: "Dikirim", className: "bg-violet-100 text-violet-800" },
  completed: { label: "Selesai", className: "bg-emerald-100 text-emerald-800" },
  cancelled: { label: "Dibatalkan", className: "bg-red-100 text-red-800" },
}

export default function CustomerDetailPage() {
  const params = useParams()
  const customerId = params.id as string
  const customer = mockCustomers[customerId]
  const orders = mockOrderHistory[customerId] || []
  const reviews = mockReviews[customerId] || []

  if (!customer) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/ecommerce/customers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pelanggan Tidak Ditemukan</h1>
            <p className="text-muted-foreground">Pelanggan {customerId} tidak ditemukan dalam sistem</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/ecommerce/customers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-bold text-xl">
            {customer.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
            <p className="text-muted-foreground">{customer.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{customer.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
                <p className="text-2xl font-bold">{formatRupiah(customer.totalSpent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rata-rata Order</p>
                <p className="text-2xl font-bold">{formatRupiah(customer.avgOrderValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-orange-600" />
              <CardTitle className="text-base">Informasi Pelanggan</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Bergabung: {customer.joinDate}</span>
              </div>
            </div>
            <Separator />
            <div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">
                Pelanggan Aktif
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs: Orders & Reviews */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Pesanan ({orders.length})</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm font-medium">
                            <Link href={`/ecommerce/orders/${order.id}`} className="text-orange-600 hover:underline">
                              {order.id}
                            </Link>
                          </TableCell>
                          <TableCell className="text-sm">{order.date}</TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                            {order.items}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatRupiah(order.total)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusConfig[order.status]?.className || ""}>
                              {statusConfig[order.status]?.label || order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {orders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Belum ada pesanan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="space-y-4 p-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{review.product}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Belum ada ulasan
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
