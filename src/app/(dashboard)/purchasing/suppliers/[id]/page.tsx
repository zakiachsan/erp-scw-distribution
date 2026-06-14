"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Building2,
  Phone,
  Mail,
  MapPin,
  Package,
  Truck,
  FileText,
  CheckCircle2,
  DollarSign,
  Save,
  Pencil,
  X,
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
  notes?: string
}

interface POTransaction {
  id: string
  poNumber: string
  status: "Draft" | "Sent" | "Received" | "Paid"
  date: string
  grandTotal: number
  currency: string
  itemCount: number
}

const suppliersData: Record<string, Supplier> = {
  "1": {
    id: "1",
    name: "PT Autocare Indonesia",
    contactPerson: "Budi Santoso",
    phone: "+62 812-9876-5432",
    email: "budi@autocare.co.id",
    address: "Jl. Industri Raya No. 88",
    city: "Tangerang",
    country: "Indonesia",
    productCategories: ["Exterior", "Wash", "Interior"],
    notes: "Main supplier for exterior products. Net 14 payment terms.",
  },
  "2": {
    id: "2",
    name: "ChemPro Asia",
    contactPerson: "Andi Wijaya",
    phone: "+62 813-4567-8901",
    email: "andi@chemproasia.com",
    address: "Jl. Teknologi No. 45",
    city: "Bandung",
    country: "Indonesia",
    productCategories: ["Decon", "Wheel", "Wash"],
    notes: "Specialized in chemical products. Net 7 payment terms.",
  },
  "3": {
    id: "3",
    name: "NanoTech Coatings",
    contactPerson: "James Chen",
    phone: "+65 9123-4567",
    email: "james@nanotech.sg",
    address: "78 Innovation Drive",
    city: "Singapore",
    country: "Singapore",
    productCategories: ["Coating", "Protection"],
    notes: "Premium coating supplier. International shipping.",
  },
  "4": {
    id: "4",
    name: "DetailPro Supply",
    contactPerson: "Rina Kusuma",
    phone: "+62 821-2345-6789",
    email: "rina@detailpro.co.id",
    address: "Jl. Raya Bogor KM 30",
    city: "Jakarta",
    country: "Indonesia",
    productCategories: ["Correction", "Prep", "Tools"],
  },
  "5": {
    id: "5",
    name: "CleanTech Global",
    contactPerson: "Mike Thompson",
    phone: "+1 555-123-4567",
    email: "mike@cleantech.com",
    address: "1200 Industrial Blvd",
    city: "Los Angeles",
    country: "United States",
    productCategories: ["Interior", "Protection"],
    notes: "US-based supplier. Long lead times but premium quality.",
  },
  "6": {
    id: "6",
    name: "PT Jaya Chemical",
    contactPerson: "Hendra Setiawan",
    phone: "+62 856-7890-1234",
    email: "hendra@jayachem.co.id",
    address: "Jl. Raya Semarang No. 12",
    city: "Semarang",
    country: "Indonesia",
    productCategories: ["Chemical"],
  },
}

const poTransactions: POTransaction[] = [
  { id: "1", poNumber: "PO-2025-0042", status: "Paid", date: "2025-12-10", grandTotal: 21169000, currency: "IDR", itemCount: 6 },
  { id: "2", poNumber: "PO-2025-0041", status: "Received", date: "2025-12-08", grandTotal: 8750000, currency: "IDR", itemCount: 3 },
  { id: "3", poNumber: "PO-2025-0040", status: "Sent", date: "2025-12-05", grandTotal: 12500000, currency: "IDR", itemCount: 4 },
  { id: "4", poNumber: "PO-2025-0039", status: "Draft", date: "2025-12-03", grandTotal: 4500000, currency: "IDR", itemCount: 2 },
  { id: "5", poNumber: "PO-2025-0038", status: "Paid", date: "2025-11-28", grandTotal: 15300000, currency: "IDR", itemCount: 5 },
  { id: "6", poNumber: "PO-2025-0037", status: "Sent", date: "2025-11-25", grandTotal: 7800000, currency: "IDR", itemCount: 3 },
  { id: "7", poNumber: "PO-2025-0036", status: "Draft", date: "2025-11-20", grandTotal: 3200000, currency: "IDR", itemCount: 1 },
  { id: "8", poNumber: "PO-2025-0035", status: "Paid", date: "2025-11-15", grandTotal: 22100000, currency: "IDR", itemCount: 7 },
  { id: "9", poNumber: "PO-2025-0034", status: "Received", date: "2025-11-10", grandTotal: 9800000, currency: "IDR", itemCount: 3 },
  { id: "10", poNumber: "PO-2025-0033", status: "Sent", date: "2025-11-05", grandTotal: 11200000, currency: "IDR", itemCount: 4 },
]

const supplierPOMap: Record<string, string[]> = {
  "1": ["1", "2", "3", "4", "5"],
  "2": ["6", "7"],
  "3": ["8", "9"],
  "4": ["10"],
  "5": [],
  "6": [],
}

const statusConfig = {
  Draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
    icon: FileText,
  },
  Sent: {
    label: "In Transit",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Truck,
  },
  Received: {
    label: "Received",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Package,
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

export default function SupplierDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [isEditing, setIsEditing] = useState(false)
  const [supplier, setSupplier] = useState<Supplier | null>(suppliersData[id] || null)

  const [editForm, setEditForm] = useState<Supplier>({
    id: "",
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    productCategories: [],
    notes: "",
  })

  const poIds = supplierPOMap[id] || []
  const transactions = poIds.map((poId) => poTransactions.find((po) => po.id === poId)).filter(Boolean) as POTransaction[]

  const draftCount = transactions.filter((t) => t.status === "Draft").length
  const inTransitCount = transactions.filter((t) => t.status === "Sent").length
  const shippedCount = transactions.filter((t) => t.status === "Received" || t.status === "Paid").length
  const totalOrders = transactions.length

  const handleEdit = () => {
    if (supplier) {
      setEditForm({ ...supplier })
      setIsEditing(true)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = () => {
    if (supplier) {
      setSupplier({ ...editForm })
      setIsEditing(false)
    }
  }

  const handleChange = (field: keyof Supplier, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  if (!supplier) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/purchasing/suppliers">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Supplier Not Found</h1>
        </div>
        <p className="text-muted-foreground">The supplier you are looking for does not exist.</p>
        <Link href="/purchasing/suppliers">
          <Button variant="outline">Back to Suppliers</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/purchasing/suppliers">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{supplier.name}</h1>
            <p className="text-muted-foreground">{supplier.city}, {supplier.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button variant="outline" onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Orders</p>
                <p className="mt-1 text-lg font-semibold font-sans truncate">{totalOrders}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-900/20">
                <Package className="h-4 w-4 text-indigo-600" />
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
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">In Transit</p>
                <p className="mt-1 text-lg font-semibold font-sans truncate">{inTransitCount}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-900/20">
                <Truck className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Shipped</p>
                <p className="mt-1 text-lg font-semibold font-sans truncate">{shippedCount}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 dark:bg-emerald-900/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Supplier Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-indigo-600" />
                Supplier Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isEditing ? (
                <>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                    <p className="font-medium">{supplier.contactPerson}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="font-medium">{supplier.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="font-medium">{supplier.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <div className="flex items-start gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      <p className="font-medium">{supplier.address}, {supplier.city}, {supplier.country}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Product Categories</p>
                    <div className="flex flex-wrap gap-1">
                      {supplier.productCategories.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {supplier.notes && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p className="text-sm">{supplier.notes}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Supplier Name</Label>
                    <Input value={editForm.name} onChange={(e) => handleChange("name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Person</Label>
                    <Input value={editForm.contactPerson} onChange={(e) => handleChange("contactPerson", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={editForm.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={editForm.email} onChange={(e) => handleChange("email", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea value={editForm.address} onChange={(e) => handleChange("address", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input value={editForm.city} onChange={(e) => handleChange("city", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input value={editForm.country} onChange={(e) => handleChange("country", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea value={editForm.notes || ""} onChange={(e) => handleChange("notes", e.target.value)} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-indigo-600" />
                Purchase Orders
              </CardTitle>
              <CardDescription>
                Transaction history with this supplier
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="py-8 text-center">
                  <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No purchase orders found for this supplier.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PO Number</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((po) => {
                      const cfg = statusConfig[po.status]
                      const StatusIcon = cfg.icon
                      return (
                        <TableRow
                          key={po.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => router.push(`/purchasing/${po.id}`)}
                        >
                          <TableCell className="font-sans font-medium text-sm">{po.poNumber}</TableCell>
                          <TableCell className="text-muted-foreground">{po.date}</TableCell>
                          <TableCell className="text-right">{po.itemCount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cfg.className}>
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {cfg.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-sans text-sm">
                            {formatCurrency(po.grandTotal, po.currency)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
