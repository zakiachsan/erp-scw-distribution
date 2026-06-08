"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  ExternalLink,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Droplets,
  MessageCircle,
  RotateCcw,
  Star,
  MapPin,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  date: string
  status: "waiting_payment" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: { name: string; qty: number; price: number; variation: string }[]
  tracking: string | null
  shop: string
  address: string
}

const orders: Order[] = [
  {
    id: "ORD-2024-0892",
    date: "2024-12-15",
    status: "delivered",
    total: 1250000,
    items: [
      { name: "SCW Snow Foam", qty: 4, price: 125000, variation: "1 Liter" },
      { name: "SCW Ceramic Coating", qty: 2, price: 450000, variation: "30ml" },
    ],
    tracking: "JNE123456789",
    shop: "SCW Distribution",
    address: "Jakarta Selatan",
  },
  {
    id: "ORD-2024-0876",
    date: "2024-12-10",
    status: "shipped",
    total: 675000,
    items: [
      { name: "SCW Tire Gel", qty: 6, price: 75000, variation: "500ml" },
      { name: "SCW Wheel Cleaner", qty: 3, price: 105000, variation: "500ml" },
    ],
    tracking: "JNT987654321",
    shop: "SCW Distribution",
    address: "Jakarta Selatan",
  },
  {
    id: "ORD-2024-0845",
    date: "2024-12-05",
    status: "processing",
    total: 450000,
    items: [{ name: "SCW Ceramic Coating", qty: 1, price: 450000, variation: "30ml" }],
    tracking: null,
    shop: "SCW Distribution",
    address: "Jakarta Selatan",
  },
  {
    id: "ORD-2024-0830",
    date: "2024-12-02",
    status: "waiting_payment",
    total: 385000,
    items: [
      { name: "SCW Snow Foam", qty: 1, price: 125000, variation: "1 Liter" },
      { name: "SCW Glass Cleaner", qty: 4, price: 65000, variation: "500ml" },
    ],
    tracking: null,
    shop: "SCW Distribution",
    address: "Jakarta Selatan",
  },
  {
    id: "ORD-2024-0812",
    date: "2024-11-28",
    status: "delivered",
    total: 895000,
    items: [
      { name: "SCW Polish Compound", qty: 2, price: 195000, variation: "500ml" },
      { name: "SCW Spray Wax", qty: 3, price: 135000, variation: "500ml" },
      { name: "SCW Glass Cleaner", qty: 2, price: 65000, variation: "500ml" },
    ],
    tracking: "JNE555666777",
    shop: "SCW Distribution",
    address: "Jakarta Selatan",
  },
  {
    id: "ORD-2024-0798",
    date: "2024-11-20",
    status: "cancelled",
    total: 225000,
    items: [{ name: "SCW Tire Gel", qty: 3, price: 75000, variation: "500ml" }],
    tracking: null,
    shop: "SCW Distribution",
    address: "Jakarta Selatan",
  },
]

const statusTabs = [
  { id: "all", label: "Semua" },
  { id: "waiting_payment", label: "Menunggu" },
  { id: "processing", label: "Dikemas" },
  { id: "shipped", label: "Dikirim" },
  { id: "delivered", label: "Selesai" },
]

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  delivered: { label: "Selesai", color: "text-green-700", bg: "bg-green-50", icon: CheckCircle2 },
  shipped: { label: "Dikirim", color: "text-blue-700", bg: "bg-blue-50", icon: Truck },
  processing: { label: "Dikemas", color: "text-amber-700", bg: "bg-amber-50", icon: Package },
  waiting_payment: { label: "Menunggu Pembayaran", color: "text-orange-700", bg: "bg-orange-50", icon: Clock },
  cancelled: { label: "Dibatalkan", color: "text-red-700", bg: "bg-red-50", icon: XCircle },
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(price)
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter((order) => order.status === activeTab)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/commerce" className="hover:text-orange-500">Beranda</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-medium">Pesanan Saya</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">Pesanan Saya</h1>
      <p className="text-sm text-slate-500 mb-6">Lihat dan lacak pesanan Anda</p>

      {/* Status Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-1 border-b">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
              {tab.id !== "all" && (
                <span className="ml-1.5 text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                  {orders.filter((o) => o.status === tab.id).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="mx-auto h-16 w-16 text-slate-200 mb-4" />
            <p className="text-lg text-slate-500">Tidak ada pesanan ditemukan.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const config = statusConfig[order.status]
            const StatusIcon = config.icon
            return (
              <Card key={order.id} className="overflow-hidden">
                {/* Order Header */}
                <div className="flex items-center justify-between p-4 bg-slate-50 border-b">
                  <div className="flex items-center gap-3">
                    <Store className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-slate-900">{order.shop}</span>
                  </div>
                  <Badge variant="outline" className={`${config.bg} ${config.color} text-xs`}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {config.label}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <Droplets className="h-5 w-5 text-slate-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                          <p className="text-xs text-slate-400">{item.variation} × {item.qty}</p>
                        </div>
                        <p className="text-sm font-medium text-slate-700">{formatPrice(item.price * item.qty)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>No. Pesanan: {order.id}</span>
                        <span>·</span>
                        <span>{new Date(order.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {order.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Total</p>
                        <p className="text-lg font-bold text-orange-600">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 pt-3 border-t flex flex-wrap gap-2">
                    {order.status === "waiting_payment" && (
                      <>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Bayar Sekarang
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                          Batalkan
                        </Button>
                      </>
                    )}
                    {order.status === "processing" && (
                      <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                        Batalkan Pesanan
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <>
                        <Button size="sm" variant="outline">
                          <Truck className="h-3.5 w-3.5 mr-1" />
                          Lacak Pengiriman
                        </Button>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Diterima
                        </Button>
                      </>
                    )}
                    {order.status === "delivered" && (
                      <>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          Tulis Ulasan
                        </Button>
                        <Button size="sm" variant="outline">
                          <RotateCcw className="h-3.5 w-3.5 mr-1" />
                          Beli Lagi
                        </Button>
                      </>
                    )}
                    {order.status === "cancelled" && (
                      <Button size="sm" variant="outline">
                        <RotateCcw className="h-3.5 w-3.5 mr-1" />
                        Beli Ulang
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
