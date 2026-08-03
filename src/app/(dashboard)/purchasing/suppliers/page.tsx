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
  MapPin,
  Wallet,
  AlertTriangle,
  CalendarClock,
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
  paymentTerms: string
  outstandingBalance: number
  lastInvoiceDate: string
  /* A3 — DP & Pelunasan tracking */
  dpPaid: number       // total down payment sudah dibayar
  totalInvoice: number // total tagihan dari semua invoice belum lunas
}

const paymentTermsOptions = [
  "COD",
  "Net 14",
  "Net 30",
  "Net 45",
  "Net 60",
  "Net 90",
  "DP 30% + Net 30",
  "DP 50% + Pelunasan",
]

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
    paymentTerms: "Net 30",
    outstandingBalance: 45200000,
    lastInvoiceDate: "2025-12-10",
    dpPaid: 15000000,
    totalInvoice: 60200000,
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
    paymentTerms: "Net 14",
    outstandingBalance: 12800000,
    lastInvoiceDate: "2025-12-12",
    dpPaid: 0,
    totalInvoice: 12800000,
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
    paymentTerms: "DP 50% + Pelunasan",
    outstandingBalance: 0,
    lastInvoiceDate: "2025-12-13",
    dpPaid: 22500000,
    totalInvoice: 22500000,
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
    paymentTerms: "Net 45",
    outstandingBalance: 8750000,
    lastInvoiceDate: "2025-11-20",
    dpPaid: 0,
    totalInvoice: 8750000,
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
    paymentTerms: "Net 60",
    outstandingBalance: 156000000,
    lastInvoiceDate: "2025-10-15",
    dpPaid: 78000000,
    totalInvoice: 234000000,
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
    paymentTerms: "COD",
    outstandingBalance: 0,
    lastInvoiceDate: "2025-08-20",
    dpPaid: 0,
    totalInvoice: 0,
  },
]

const fmtIDR = (n: number) => "Rp " + n.toLocaleString("id-ID")

function getAgingDays(lastInvoiceDate: string): number {
  const now = new Date()
  const inv = new Date(lastInvoiceDate)
  return Math.max(0, Math.floor((now.getTime() - inv.getTime()) / (1000 * 60 * 60 * 24)))
}

function getAgingBadge(days: number, balance: number) {
  if (balance <= 0) return null
  if (days <= 30)
    return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">0-30 hr</Badge>
  if (days <= 60)
    return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 text-[10px]">31-60 hr</Badge>
  if (days <= 90)
    return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">61-90 hr</Badge>
  return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px]">&gt;90 hr</Badge>
}

export default function SuppliersPage() {
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [terms, setTerms] = useState("Net 30")

  const addSupplier = () => {
    if (!name.trim()) return
    alert(`Supplier "${name}" added successfully!`)
    setName("")
    setContact("")
    setPhone("")
    setEmail("")
    setTerms("Net 30")
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

  const totalOutstanding = suppliers.reduce((sum, s) => sum + s.outstandingBalance, 0)
  const overdueCount = suppliers.filter((s) => s.outstandingBalance > 0 && getAgingDays(s.lastInvoiceDate) > 30).length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Daftar pemasok, payment terms & umur hutang
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Pemasok</p>
                <p className="mt-1 text-lg font-semibold">{suppliers.length}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50">
                <MapPin className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Hutang</p>
                <p className="mt-1 text-lg font-semibold text-amber-600">{fmtIDR(totalOutstanding)}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-50">
                <Wallet className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Jatuh Tempo (&gt;30 hr)</p>
                <p className="mt-1 text-lg font-semibold text-red-600">{overdueCount} supplier</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Terms</Label>
              <select
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="h-9 w-full border border-input rounded-md px-2 text-sm bg-transparent"
              >
                {paymentTermsOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <Button onClick={addSupplier} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                <TableHead>Payment Terms</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead>Umur Hutang</TableHead>
                <TableHead>DP &amp; Pelunasan</TableHead>
                <TableHead>Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((supplier) => {
                const agingDays = getAgingDays(supplier.lastInvoiceDate)
                const dpPaid = supplier.dpPaid ?? 0
                const totalInv = supplier.totalInvoice ?? 0
                const sisa = totalInv - dpPaid
                return (
                  <TableRow key={supplier.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/purchasing/suppliers/${supplier.id}`} className="text-blue-600 hover:underline font-sans font-medium text-sm">
                        {supplier.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {supplier.contactPerson} · {supplier.city}, {supplier.country}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <CalendarClock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{supplier.paymentTerms}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {supplier.outstandingBalance > 0 ? (
                        <span className="text-sm font-semibold text-amber-600">{fmtIDR(supplier.outstandingBalance)}</span>
                      ) : (
                        <span className="text-sm text-emerald-600">Lunas</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {supplier.outstandingBalance > 0 ? (
                        <div className="flex items-center gap-1.5">
                          {getAgingBadge(agingDays, supplier.outstandingBalance)}
                          <span className="text-[10px] text-muted-foreground">{agingDays} hr</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">DP:</span>
                          <span className={dpPaid > 0 ? "font-medium text-emerald-700" : "text-muted-foreground"}>
                            {dpPaid > 0 ? fmtIDR(dpPaid) : "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Sisa:</span>
                          <span className={sisa > 0 ? "font-medium text-amber-700" : "text-muted-foreground"}>
                            {sisa > 0 ? fmtIDR(sisa) : "Lunas"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {supplier.lastOrder}
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
