"use client"

import {
  useState,
  useMemo,
} from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  Building2,
  Phone,
  Mail,
  MapPin,
  ArrowUpDown,
} from "lucide-react"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  productCategories: string[]
  lastOrder: string
}

const suppliers: Supplier[] = [
  {
    id: "1",
    name: "PT Autocare Indonesia",
    contactPerson: "Budi Santoso",
    phone: "+62 812-9876-5432",
    email: "budi@autocare.co.id",
    address: "Jl. Industri Raya No. 88",
    city: "Tangerang",
    country: "Indonesia",
    productCategories: ["Exterior", "Wash", "Interior"],
    lastOrder: "2025-12-10",
  },
  {
    id: "2",
    name: "ChemPro Asia",
    contactPerson: "Andi Wijaya",
    phone: "+62 813-4567-8901",
    email: "andi@chemproasia.com",
    address: "Jl. Teknologi No. 45",
    city: "Bandung",
    country: "Indonesia",
    productCategories: ["Decon", "Wheel", "Wash"],
    lastOrder: "2025-12-12",
  },
  {
    id: "3",
    name: "NanoTech Coatings",
    contactPerson: "James Chen",
    phone: "+65 9123-4567",
    email: "james@nanotech.sg",
    address: "78 Innovation Drive",
    city: "Singapore",
    country: "Singapore",
    productCategories: ["Coating", "Protection"],
    lastOrder: "2025-12-13",
  },
  {
    id: "4",
    name: "DetailPro Supply",
    contactPerson: "Rina Kusuma",
    phone: "+62 821-2345-6789",
    email: "rina@detailpro.co.id",
    address: "Jl. Raya Bogor KM 30",
    city: "Jakarta",
    country: "Indonesia",
    productCategories: ["Correction", "Prep", "Tools"],
    lastOrder: "2025-12-14",
  },
  {
    id: "5",
    name: "CleanTech Global",
    contactPerson: "Mike Thompson",
    phone: "+1 555-123-4567",
    email: "mike@cleantech.com",
    address: "1200 Industrial Blvd",
    city: "Los Angeles",
    country: "United States",
    productCategories: ["Interior", "Protection"],
    lastOrder: "2025-12-08",
  },
  {
    id: "6",
    name: "PT Jaya Chemical",
    contactPerson: "Hendra Setiawan",
    phone: "+62 856-7890-1234",
    email: "hendra@jayachem.co.id",
    address: "Jl. Raya Semarang No. 12",
    city: "Semarang",
    country: "Indonesia",
    productCategories: ["Chemical"],
    lastOrder: "2025-08-20",
  },
]

interface POTransaction {
  id: string
  status: "Draft" | "Sent" | "Received" | "Paid"
  itemCount: number
}

const poTransactions: POTransaction[] = [
  { id: "1", status: "Paid", itemCount: 6 },
  { id: "2", status: "Received", itemCount: 3 },
  { id: "3", status: "Sent", itemCount: 4 },
  { id: "4", status: "Draft", itemCount: 2 },
  { id: "5", status: "Paid", itemCount: 5 },
  { id: "6", status: "Sent", itemCount: 3 },
  { id: "7", status: "Draft", itemCount: 1 },
  { id: "8", status: "Paid", itemCount: 7 },
  { id: "9", status: "Received", itemCount: 3 },
  { id: "10", status: "Sent", itemCount: 4 },
]

const supplierPOMap: Record<string, string[]> = {
  "1": ["1", "2", "3", "4", "5"],
  "2": ["6", "7"],
  "3": ["8", "9"],
  "4": ["10"],
  "5": [],
  "6": [],
}

function getSupplierStats(supplierId: string) {
  const poIds = supplierPOMap[supplierId] || []
  const orders = poIds
    .map((poId) => poTransactions.find((po) => po.id === poId))
    .filter(Boolean) as POTransaction[]

  const shippedOrders = orders.filter((o) => o.status === "Received" || o.status === "Paid")
  const shippedQty = shippedOrders.reduce((sum, o) => sum + o.itemCount, 0)

  return {
    qtyShipped: shippedQty,
    ordersShipped: shippedOrders.length,
  }
}

export default function SuppliersPage() {
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const addSupplier = () => {
    if (!name.trim()) return
    alert(`Supplier "${name}" added successfully!`)
    setName("")
    setContact("")
    setPhone("")
    setEmail("")
    setAddOpen(false)
  }

  const filtered = useMemo(() => {
    const result = suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase())
    )
    // Sort by qty items shipped (descending)
    return result.sort((a, b) => {
      const statsA = getSupplierStats(a.id)
      const statsB = getSupplierStats(b.id)
      return statsB.qtyShipped - statsA.qtyShipped
    })
  }, [search])

  const totalSuppliers = suppliers.length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage your supplier directory and contact information
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Supplier Name</Label>
              <Input placeholder="Enter supplier name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input placeholder="Enter contact person" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button onClick={addSupplier} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Suppliers</p>
                <p className="mt-1 text-lg font-semibold font-sans truncate">{totalSuppliers}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-900/20">
                <Building2 className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Supplier Directory</CardTitle>
              <CardDescription>
                {filtered.length} supplier{filtered.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    Shipped
                    <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Qty Items</TableHead>
                <TableHead>Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((supplier) => (
                <TableRow key={supplier.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link href={`/purchasing/suppliers/${supplier.id}`} className="block">
                      <div>
                        <p className="font-medium hover:text-indigo-600 transition-colors">{supplier.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {supplier.contactPerson}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {supplier.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {supplier.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {supplier.city}, {supplier.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-h-[2.6rem] overflow-hidden">
                      {supplier.productCategories.slice(0, 4).map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                      {supplier.productCategories.length > 4 && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          +{supplier.productCategories.length - 4}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-sans text-sm text-muted-foreground">
                      {(() => {
                        const stats = getSupplierStats(supplier.id)
                        return stats.ordersShipped
                      })()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-sans font-semibold text-sm">
                      {(() => {
                        const stats = getSupplierStats(supplier.id)
                        return stats.qtyShipped
                      })()}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {supplier.lastOrder}
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
