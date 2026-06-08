"use client"

import { useState, useMemo } from "react"
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
  ExternalLink,
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
  status: "active" | "inactive"
  productCategories: string[]
  leadTimeDays: number
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
    status: "active",
    productCategories: ["Exterior", "Wash", "Interior"],
    leadTimeDays: 7,
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
    status: "active",
    productCategories: ["Decon", "Wheel", "Wash"],
    leadTimeDays: 14,
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
    status: "active",
    productCategories: ["Coating", "Protection"],
    leadTimeDays: 21,
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
    status: "active",
    productCategories: ["Correction", "Prep", "Tools"],
    leadTimeDays: 10,
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
    status: "active",
    productCategories: ["Interior", "Protection"],
    leadTimeDays: 30,
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
    status: "inactive",
    productCategories: ["Chemical"],
    leadTimeDays: 14,
    lastOrder: "2025-08-20",
  },
]

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
  },
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
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const activeCount = suppliers.filter((s) => s.status === "active").length
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Building2 className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Suppliers</p>
                <p className="text-2xl font-bold">{totalSuppliers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Building2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Suppliers</p>
                <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
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
                <TableHead className="text-right">Lead Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {supplier.contactPerson}
                      </p>
                    </div>
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
                    <div className="flex flex-wrap gap-1">
                      {supplier.productCategories.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {supplier.leadTimeDays} days
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[supplier.status].className}>
                      {statusConfig[supplier.status].label}
                    </Badge>
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
