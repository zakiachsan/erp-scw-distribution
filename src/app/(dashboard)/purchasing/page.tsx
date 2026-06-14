"use client"

import { useState, useMemo } from "react"
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
  Search,
  Plus,
  FileText,
  Filter,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react"

interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  date: string
  status: "Draft" | "Sent" | "Received" | "Paid"
  totalAmount: number
  itemCount: number
  currency: string
}

const purchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2025-0042",
    supplier: "PT Autocare Indonesia",
    date: "2025-12-10",
    status: "Paid",
    totalAmount: 28500000,
    itemCount: 6,
    currency: "IDR",
  },
  {
    id: "2",
    poNumber: "PO-2025-0043",
    supplier: "ChemPro Asia",
    date: "2025-12-12",
    status: "Received",
    totalAmount: 12500000,
    itemCount: 3,
    currency: "IDR",
  },
  {
    id: "3",
    poNumber: "PO-2025-0044",
    supplier: "NanoTech Coatings",
    date: "2025-12-13",
    status: "Sent",
    totalAmount: 4500,
    itemCount: 2,
    currency: "USD",
  },
  {
    id: "4",
    poNumber: "PO-2025-0045",
    supplier: "DetailPro Supply",
    date: "2025-12-14",
    status: "Draft",
    totalAmount: 8750000,
    itemCount: 4,
    currency: "IDR",
  },
  {
    id: "5",
    poNumber: "PO-2025-0046",
    supplier: "PT Autocare Indonesia",
    date: "2025-12-15",
    status: "Draft",
    totalAmount: 15200000,
    itemCount: 5,
    currency: "IDR",
  },
  {
    id: "6",
    poNumber: "PO-2025-0047",
    supplier: "CleanTech Global",
    date: "2025-12-08",
    status: "Paid",
    totalAmount: 3200,
    itemCount: 3,
    currency: "USD",
  },
  {
    id: "7",
    poNumber: "PO-2025-0048",
    supplier: "ChemPro Asia",
    date: "2025-12-05",
    status: "Received",
    totalAmount: 7800000,
    itemCount: 2,
    currency: "IDR",
  },
  {
    id: "8",
    poNumber: "PO-2025-0049",
    supplier: "NanoTech Coatings",
    date: "2025-12-01",
    status: "Paid",
    totalAmount: 6800,
    itemCount: 4,
    currency: "USD",
  },
]

const statusConfig = {
  Draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
    icon: FileText,
  },
  Sent: {
    label: "Sent",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Clock,
  },
  Received: {
    label: "Received",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: CheckCircle2,
  },
  Paid: {
    label: "Paid",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: DollarSign,
  },
}

function formatCurrency(amount: number, currency: string) {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
}

export default function PurchasingPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = useMemo(() => {
    return purchaseOrders.filter((po) => {
      const matchesSearch =
        po.poNumber.toLowerCase().includes(search.toLowerCase()) ||
        po.supplier.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "All" || po.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const totalPOs = purchaseOrders.length
  const draftCount = purchaseOrders.filter((po) => po.status === "Draft").length
  const pendingCount = purchaseOrders.filter(
    (po) => po.status === "Sent" || po.status === "Received"
  ).length

  const totalValue = purchaseOrders.reduce((sum, po) => {
    if (po.currency === "IDR") return sum + po.totalAmount
    return sum + po.totalAmount * 15700
  }, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Manage purchase orders and supplier transactions
          </p>
        </div>
        <Link href="/purchasing/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create PO
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total POs</p>
                <p className="mt-1 text-lg font-semibold font-sans truncate">{totalPOs}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-900/20">
                <FileText className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Draft</p>
                <p className="mt-1 text-lg font-semibold font-sans truncate">{draftCount}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-50 dark:bg-gray-800/20">
                <FileText className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pending</p>
                <p className="mt-1 text-lg font-semibold font-sans truncate">{pendingCount}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-50 dark:bg-amber-900/20">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Value</p>
                <p className="mt-1 text-sm font-semibold font-sans truncate leading-tight">{formatCurrency(totalValue, "IDR")}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 dark:bg-emerald-900/20">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Purchase Order List</CardTitle>
              <CardDescription>
                {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search PO number or supplier..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "All")}>
                <SelectTrigger className="w-36">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((po) => {
                const cfg = statusConfig[po.status]
                const Icon = cfg.icon
                return (
                  <TableRow key={po.id}>
                    <TableCell className="font-sans font-medium text-sm">
                      <Link
                        href={`/purchasing/${po.id}?status=${po.status}`}
                        className="text-primary hover:underline"
                      >
                        {po.poNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell className="text-muted-foreground">{po.date}</TableCell>
                    <TableCell className="text-right">{po.itemCount} items</TableCell>
                    <TableCell className="text-right font-sans text-sm font-normal">
                      {formatCurrency(po.totalAmount, po.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cfg.className}>
                        <Icon className="mr-1 h-3 w-3" />
                        {cfg.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
