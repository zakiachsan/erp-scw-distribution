"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Truck,
  Package,
  MapPin,
  ArrowUpDown,
  Banknote,
  Plus,
  X,
  Wallet,
} from "lucide-react"

/* ── Types ── */
interface LogisticItem {
  id: string
  poNumber: string
  poId: string
  courier: string
  trackingNumber: string
  status: "Booked" | "Picked Up" | "In Transit" | "Delivered"
  shippingDate: string
  estimatedDelivery: string
  destination: string
  totalItems: number
}

interface CourierPayment {
  id: string
  courier: string
  poNumber: string
  invoiceNo: string
  currency: "IDR" | "USD" | "SGD"
  rate: number
  amount: number
  date: string
  dueDate: string
  status: "Belum Dibayar" | "Sebagian" | "Lunas"
  paidAmount: number
  notes: string
}

/* ── Initial Data ── */
const initialData: LogisticItem[] = [
  {
    id: "lg1",
    poNumber: "PO-2025-0042",
    poId: "1",
    courier: "JNE",
    trackingNumber: "JNE287654123",
    status: "Delivered",
    shippingDate: "2025-12-12",
    estimatedDelivery: "2025-12-15",
    destination: "Tangerang, Banten",
    totalItems: 6,
  },
  {
    id: "lg2",
    poNumber: "PO-2025-0045",
    poId: "4",
    courier: "SiCepat",
    trackingNumber: "SCP481276543",
    status: "In Transit",
    shippingDate: "2025-12-16",
    estimatedDelivery: "2025-12-20",
    destination: "Jakarta Selatan",
    totalItems: 4,
  },
  {
    id: "lg3",
    poNumber: "PO-2025-0043",
    poId: "2",
    courier: "J&T Express",
    trackingNumber: "JT583726194",
    status: "Delivered",
    shippingDate: "2025-12-14",
    estimatedDelivery: "2025-12-16",
    destination: "Tangerang, Banten",
    totalItems: 3,
  },
  {
    id: "lg4",
    poNumber: "PO-2025-0049",
    poId: "8",
    courier: "DHL",
    trackingNumber: "DHL9988776655",
    status: "Picked Up",
    shippingDate: "2025-12-18",
    estimatedDelivery: "2025-12-28",
    destination: "Singapore",
    totalItems: 4,
  },
]

/* Dummy: biaya kirim terpisah (kurir/forwarder di luar PO) */
const initialCourierPayments: CourierPayment[] = [
  {
    id: "cp1",
    courier: "DHL Express",
    poNumber: "PO-2025-0049",
    invoiceNo: "DHL-INV-88231",
    currency: "USD",
    rate: 16250,
    amount: 450,
    date: "2025-12-18",
    dueDate: "2026-01-02",
    status: "Belum Dibayar",
    paidAmount: 0,
    notes: "Forwarder luar negeri — customs clearance + freight",
  },
  {
    id: "cp2",
    courier: "Kargo Darat Sejahtera",
    poNumber: "PO-2025-0042",
    invoiceNo: "KDS-2025-1201",
    currency: "IDR",
    rate: 1,
    amount: 2850000,
    date: "2025-12-12",
    dueDate: "2025-12-26",
    status: "Lunas",
    paidAmount: 2850000,
    notes: "Trucking kontainer dari pelabuhan ke gudang",
  },
  {
    id: "cp3",
    courier: "Samudera Freight",
    poNumber: "PO-2025-0045",
    invoiceNo: "SF-FRT-00912",
    currency: "SGD",
    rate: 12100,
    amount: 780,
    date: "2025-12-16",
    dueDate: "2025-12-30",
    status: "Sebagian",
    paidAmount: 400,
    notes: "Sea freight Singapura → Jakarta, biaya menyusul setelah barang tiba",
  },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  Booked: { label: "Booked", className: "bg-blue-50 text-blue-700 border-blue-200" },
  "Picked Up": { label: "Picked Up", className: "bg-amber-50 text-amber-700 border-amber-200" },
  "In Transit": { label: "In Transit", className: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  Delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
}

const payStatusConfig: Record<string, string> = {
  "Belum Dibayar": "bg-amber-50 text-amber-700 border-amber-200",
  Sebagian: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Lunas: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

const fmtIDR = (n: number) => "Rp " + n.toLocaleString("id-ID")
const fmtForeign = (n: number, c: string) =>
  c === "IDR" ? fmtIDR(n) : `${c} ${n.toLocaleString("en-US")}`

export default function LogisticPage() {
  const [data] = useState<LogisticItem[]>(initialData)
  const [payments, setPayments] = useState<CourierPayment[]>(initialCourierPayments)
  const [tab, setTab] = useState<"pengiriman" | "pembayaran">("pengiriman")
  const [search, setSearch] = useState("")
  const [paySearch, setPaySearch] = useState("")
  const [sortField, setSortField] = useState<keyof LogisticItem>("shippingDate")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [modalOpen, setModalOpen] = useState(false)
  const [payModal, setPayModal] = useState<CourierPayment | null>(null)
  const [payInput, setPayInput] = useState("")

  const [form, setForm] = useState({
    courier: "",
    poNumber: "",
    invoiceNo: "",
    currency: "IDR" as "IDR" | "USD" | "SGD",
    rate: "1",
    amount: "",
    dueDate: "",
    notes: "",
  })

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter(
      (item) =>
        item.poNumber.toLowerCase().includes(q) ||
        item.courier.toLowerCase().includes(q) ||
        item.trackingNumber.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q)
    )
  }, [data, search])

  const filteredPayments = useMemo(() => {
    if (!paySearch) return payments
    const q = paySearch.toLowerCase()
    return payments.filter(
      (p) =>
        p.courier.toLowerCase().includes(q) ||
        p.poNumber.toLowerCase().includes(q) ||
        p.invoiceNo.toLowerCase().includes(q)
    )
  }, [payments, paySearch])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal)
    })
  }, [filtered, sortField, sortDir])

  const toggleSort = (field: keyof LogisticItem) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const stats = {
    total: data.length,
    inTransit: data.filter((d) => d.status === "In Transit" || d.status === "Picked Up").length,
    delivered: data.filter((d) => d.status === "Delivered").length,
  }

  const unpaidTotal = payments
    .filter((p) => p.status !== "Lunas")
    .reduce((sum, p) => sum + (p.amount - p.paidAmount) * p.rate, 0)

  const handleSavePayment = () => {
    if (!form.courier || !form.poNumber || !form.amount) return
    const rate = parseFloat(form.rate.replace(/[^\d.]/g, "")) || 1
    const amount = parseFloat(form.amount.replace(/[^\d.]/g, "")) || 0
    const newPayment: CourierPayment = {
      id: `cp-${Date.now()}`,
      courier: form.courier,
      poNumber: form.poNumber,
      invoiceNo: form.invoiceNo || "—",
      currency: form.currency,
      rate,
      amount,
      date: new Date().toISOString().split("T")[0],
      dueDate: form.dueDate || new Date().toISOString().split("T")[0],
      status: "Belum Dibayar",
      paidAmount: 0,
      notes: form.notes,
    }
    setPayments((prev) => [newPayment, ...prev])
    setForm({ courier: "", poNumber: "", invoiceNo: "", currency: "IDR", rate: "1", amount: "", dueDate: "", notes: "" })
    setModalOpen(false)
  }

  const handleRecordPay = () => {
    if (!payModal) return
    const amount = parseFloat(payInput.replace(/[^\d.]/g, "")) || 0
    if (amount <= 0) return
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id !== payModal.id) return p
        const newPaid = Math.min(p.amount, p.paidAmount + amount)
        return { ...p, paidAmount: newPaid, status: newPaid >= p.amount ? "Lunas" : "Sebagian" }
      })
    )
    setPayModal(null)
    setPayInput("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Logistic</h1>
          <p className="text-muted-foreground">Pengiriman kurir & biaya kirim terpisah untuk Purchase Orders</p>
        </div>
        {tab === "pembayaran" && (
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Catat Biaya Kirim
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200">
        <button
          onClick={() => setTab("pengiriman")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${
            tab === "pengiriman"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Truck className="h-4 w-4" /> Pengiriman
          </span>
        </button>
        <button
          onClick={() => setTab("pembayaran")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${
            tab === "pembayaran"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Banknote className="h-4 w-4" /> Pembayaran Kurir
            {payments.filter((p) => p.status !== "Lunas").length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center h-4.5 min-w-4.5 px-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                {payments.filter((p) => p.status !== "Lunas").length}
              </span>
            )}
          </span>
        </button>
      </div>

      {tab === "pengiriman" ? (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Shipment</p>
                    <p className="mt-1 text-lg font-semibold">{stats.total}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50">
                    <Truck className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">In Transit</p>
                    <p className="mt-1 text-lg font-semibold">{stats.inTransit}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-50">
                    <Package className="h-4 w-4 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Delivered</p>
                    <p className="mt-1 text-lg font-semibold">{stats.delivered}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Daftar Pengiriman</CardTitle>
                <CardDescription>Semua pengiriman yang terhubung dengan Purchase Orders</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pengiriman..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("courier")}>
                        Courier <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>PO</TableHead>
                    <TableHead>Tracking</TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("shippingDate")}>
                        Ship Date <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Est. Delivery</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sorted.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Tidak ada data pengiriman.
                      </TableCell>
                    </TableRow>
                  )}
                  {sorted.map((item) => {
                    const cfg = statusConfig[item.status]
                    return (
                      <TableRow key={item.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{item.courier}</TableCell>
                        <TableCell>
                          <Link
                            href={`/purchasing/${item.poId}?status=${item.status === "Delivered" ? "Paid" : "Partial"}`}
                            className="text-blue-600 hover:underline font-sans font-medium text-sm"
                          >
                            {item.poNumber}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/purchasing/logistic/${item.id}`} className="text-blue-600 hover:underline font-sans font-medium text-sm">
                            {item.trackingNumber}
                          </Link>
                        </TableCell>
                        <TableCell className="text-xs">{new Date(item.shippingDate).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell className="text-xs">{new Date(item.estimatedDelivery).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.destination}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cfg.className}>
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
        </>
      ) : (
        <>
          {/* Payment Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Tagihan</p>
                    <p className="mt-1 text-lg font-semibold">{payments.length}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50">
                    <Banknote className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Belum Lunas</p>
                    <p className="mt-1 text-lg font-semibold">{payments.filter((p) => p.status !== "Lunas").length}</p>
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
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Sisa (IDR)</p>
                    <p className="mt-1 text-lg font-semibold text-amber-600">{fmtIDR(unpaidTotal)}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-50">
                    <Banknote className="h-4 w-4 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Pembayaran Kurir Terpisah</CardTitle>
                <CardDescription>
                  Biaya kirim tambahan / forwarder yang belum termasuk di PO — input sesuai invoice, dikali kurs
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari kurir / PO / invoice..."
                  value={paySearch}
                  onChange={(e) => setPaySearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kurir / Forwarder</TableHead>
                    <TableHead>PO Terkait</TableHead>
                    <TableHead>No. Invoice</TableHead>
                    <TableHead className="text-right">Nilai</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Tidak ada biaya kirim terpisah.
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredPayments.map((p) => {
                    const remaining = (p.amount - p.paidAmount) * p.rate
                    return (
                      <TableRow key={p.id} className="hover:bg-muted/30">
                        <TableCell className="text-sm font-medium">{p.courier}</TableCell>
                        <TableCell className="text-sm">{p.poNumber}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{p.invoiceNo}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-semibold">{fmtForeign(p.amount, p.currency)}</span>
                          {p.currency !== "IDR" && (
                            <p className="text-[10px] text-muted-foreground">
                              ≈ {fmtIDR(p.amount * p.rate)} · kurs {p.rate.toLocaleString("id-ID")}
                            </p>
                          )}
                          {p.paidAmount > 0 && p.status !== "Lunas" && (
                            <p className="text-[10px] font-medium text-amber-600">sisa {fmtIDR(remaining)}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(p.dueDate).toLocaleDateString("id-ID")}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={payStatusConfig[p.status]}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {p.status !== "Lunas" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => { setPayModal(p); setPayInput("") }}
                            >
                              Bayar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {/* Modal: Catat Biaya Kirim Baru */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white">
              <h3 className="text-base font-semibold text-slate-800">Catat Biaya Kirim Terpisah</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Kurir / Forwarder *</Label>
                  <Input
                    value={form.courier}
                    onChange={(e) => setForm((prev) => ({ ...prev, courier: e.target.value }))}
                    placeholder="mis. DHL Express"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">PO Terkait *</Label>
                  <Input
                    value={form.poNumber}
                    onChange={(e) => setForm((prev) => ({ ...prev, poNumber: e.target.value }))}
                    placeholder="mis. PO-2025-0049"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">No. Invoice Kurir</Label>
                <Input
                  value={form.invoiceNo}
                  onChange={(e) => setForm((prev) => ({ ...prev, invoiceNo: e.target.value }))}
                  placeholder="mis. DHL-INV-88231"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Mata Uang</Label>
                  <select
                    value={form.currency}
                    onChange={(e) => {
                      const c = e.target.value as "IDR" | "USD" | "SGD"
                      setForm((prev) => ({
                        ...prev,
                        currency: c,
                        rate: c === "IDR" ? "1" : c === "USD" ? "16250" : "12100",
                      }))
                    }}
                    className="mt-1 h-9 w-full border border-input rounded-md px-2 text-sm bg-transparent"
                  >
                    <option value="IDR">IDR</option>
                    <option value="USD">USD</option>
                    <option value="SGD">SGD</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Kurs (→ IDR)</Label>
                  <Input
                    value={form.rate}
                    onChange={(e) => setForm((prev) => ({ ...prev, rate: e.target.value }))}
                    disabled={form.currency === "IDR"}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Nilai ({form.currency}) *</Label>
                  <Input
                    value={form.amount}
                    onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                    inputMode="decimal"
                    className="mt-1 text-right"
                  />
                </div>
              </div>
              {form.currency !== "IDR" && form.amount && (
                <p className="text-xs text-muted-foreground">
                  ≈ {fmtIDR((parseFloat(form.amount.replace(/[^\d.]/g, "")) || 0) * (parseFloat(form.rate.replace(/[^\d.]/g, "")) || 1))} (kurs {parseFloat(form.rate.replace(/[^\d.]/g, "")).toLocaleString("id-ID")})
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Jatuh Tempo</Label>
                  <Input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Catatan</Label>
                <Input
                  value={form.notes}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="mis. Freight + customs clearance"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
              <Button onClick={handleSavePayment}>Simpan</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Bayar */}
      {payModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg w-full max-w-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-base font-semibold text-slate-800">Bayar — {payModal.courier}</h3>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total tagihan</span>
                <span className="font-medium">{fmtForeign(payModal.amount, payModal.currency)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sudah dibayar</span>
                <span className="font-medium text-emerald-600">{fmtForeign(payModal.paidAmount, payModal.currency)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-muted-foreground">Sisa ({payModal.currency})</span>
                <span className="font-semibold text-amber-600">{fmtForeign(payModal.amount - payModal.paidAmount, payModal.currency)}</span>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Jumlah Bayar ({payModal.currency})</Label>
                <Input
                  value={payInput}
                  onChange={(e) => setPayInput(e.target.value)}
                  placeholder="0"
                  inputMode="decimal"
                  className="mt-1 text-right"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200">
              <Button variant="outline" onClick={() => setPayModal(null)}>Batal</Button>
              <Button onClick={handleRecordPay}>Konfirmasi Bayar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
