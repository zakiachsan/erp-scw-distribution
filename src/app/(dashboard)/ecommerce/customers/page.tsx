"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import {
  Search,
  Eye,
  Users,
  User,
} from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  avatar: string
  totalOrders: number
  totalSpending: number
  lastOrder: string
  status: "active" | "inactive"
  joinDate: string
}

const customers: Customer[] = [
  { id: "CUST-001", name: "Ahmad Fauzi", email: "ahmad@gmail.com", avatar: "AF", totalOrders: 12, totalSpending: 3250000, lastOrder: "2026-06-01", status: "active", joinDate: "2025-01-15" },
  { id: "CUST-002", name: "Siti Nurhaliza", email: "siti@gmail.com", avatar: "SN", totalOrders: 8, totalSpending: 2100000, lastOrder: "2026-06-01", status: "active", joinDate: "2025-03-22" },
  { id: "CUST-003", name: "Budi Hartono", email: "budi@outlook.com", avatar: "BH", totalOrders: 15, totalSpending: 5875000, lastOrder: "2026-05-30", status: "active", joinDate: "2024-11-10" },
  { id: "CUST-004", name: "Rina Wijaya", email: "rina@yahoo.com", avatar: "RW", totalOrders: 6, totalSpending: 1420000, lastOrder: "2026-05-29", status: "active", joinDate: "2025-05-01" },
  { id: "CUST-005", name: "Dedi Kurniawan", email: "dedi@gmail.com", avatar: "DK", totalOrders: 10, totalSpending: 4680000, lastOrder: "2026-05-28", status: "active", joinDate: "2024-12-05" },
  { id: "CUST-006", name: "Maya Putri", email: "maya@gmail.com", avatar: "MP", totalOrders: 9, totalSpending: 2890000, lastOrder: "2026-05-27", status: "active", joinDate: "2025-02-18" },
  { id: "CUST-007", name: "Hendra Gunawan", email: "hendra@gmail.com", avatar: "HG", totalOrders: 14, totalSpending: 6350000, lastOrder: "2026-05-25", status: "active", joinDate: "2024-10-20" },
  { id: "CUST-008", name: "Rizky Firmansyah", email: "rizky@gmail.com", avatar: "RF", totalOrders: 3, totalSpending: 585000, lastOrder: "2026-05-24", status: "active", joinDate: "2025-06-12" },
  { id: "CUST-009", name: "Anisa Rahmawati", email: "anisa@gmail.com", avatar: "AR", totalOrders: 7, totalSpending: 2340000, lastOrder: "2026-05-22", status: "active", joinDate: "2025-04-08" },
  { id: "CUST-010", name: "Fajar Nugroho", email: "fajar@gmail.com", avatar: "FN", totalOrders: 2, totalSpending: 360000, lastOrder: "2026-05-20", status: "inactive", joinDate: "2025-07-01" },
  { id: "CUST-011", name: "Dewi Lestari", email: "dewi@gmail.com", avatar: "DL", totalOrders: 11, totalSpending: 4125000, lastOrder: "2026-05-18", status: "active", joinDate: "2024-09-15" },
  { id: "CUST-012", name: "Arif Setiawan", email: "arif@gmail.com", avatar: "AS", totalOrders: 5, totalSpending: 1875000, lastOrder: "2026-05-15", status: "active", joinDate: "2025-01-30" },
]

const formatRupiah = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Aktif", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  inactive: { label: "Tidak Aktif", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
}

export default function CustomersPage() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      return (
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [search])

  const totalCustomers = customers.length
  const activeCount = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpending, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Kelola pelanggan WebCommerce
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pelanggan</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pelanggan Aktif</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatRupiah(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Pelanggan ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelanggan</TableHead>
                <TableHead className="text-center">Total Orders</TableHead>
                <TableHead className="text-right">Total Pengeluaran</TableHead>
                <TableHead>Order Terakhir</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-semibold text-sm">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{customer.totalOrders}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatRupiah(customer.totalSpending)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[customer.status].className}>
                      {statusConfig[customer.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/ecommerce/customers/${customer.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Tidak ada pelanggan ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
