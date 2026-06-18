"use client"

import { useState, useRef, useEffect } from "react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DollarSign, CreditCard, Banknote, Search, X, Filter, ChevronDown } from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

// ── Invoice options for dropdown ──
const invoiceOptions = [
  { id: "INV-2026-038", customer: "PT Autogloss Indonesia", amount: 8500000, status: "Draft" },
  { id: "INV-2026-037", customer: "CV Ceramic Pro JKT", amount: 6200000, status: "Sent" },
  { id: "INV-2026-036", customer: "UD Shinemax", amount: 4500000, status: "Paid" },
  { id: "INV-2026-035", customer: "PT DetailWorks BDG", amount: 7200000, status: "Paid" },
  { id: "INV-2026-034", customer: "PT Autogloss Indonesia", amount: 8500000, status: "Paid" },
  { id: "INV-2026-033", customer: "CV ProShine SBY", amount: 5800000, status: "Overdue" },
  { id: "INV-2026-032", customer: "GlossUp Bali", amount: 6200000, status: "Paid" },
  { id: "INV-2026-031", customer: "DetailPro Semarang", amount: 2800000, status: "Paid" },
]

interface Payment {
  id: string
  customer: string
  invoice: string
  amount: number
  date: string
  status: "Completed" | "Pending" | "Failed"
  method: "Transfer" | "Cash" | "Credit Card"
}

const initialPayments: Payment[] = [
  { id: "PAY-2026-012", customer: "PT Autogloss Indonesia", invoice: "INV-2026-034", amount: 8500000, date: "2026-06-02", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-011", customer: "CV Ceramic Pro JKT", invoice: "INV-2026-037", amount: 3100000, date: "2026-06-01", status: "Pending", method: "Credit Card" },
  { id: "PAY-2026-010", customer: "UD Shinemax", invoice: "INV-2026-036", amount: 4500000, date: "2026-05-30", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-009", customer: "PT DetailWorks BDG", invoice: "INV-2026-035", amount: 7200000, date: "2026-05-28", status: "Completed", method: "Cash" },
  { id: "PAY-2026-008", customer: "PT Autogloss Indonesia", invoice: "INV-2026-034", amount: 8500000, date: "2026-05-25", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-007", customer: "CV ProShine SBY", invoice: "INV-2026-033", amount: 2900000, date: "2026-05-22", status: "Failed", method: "Credit Card" },
  { id: "PAY-2026-006", customer: "GlossUp Bali", invoice: "INV-2026-032", amount: 6200000, date: "2026-05-20", status: "Completed", method: "Transfer" },
  { id: "PAY-2026-005", customer: "DetailPro Semarang", invoice: "INV-2026-031", amount: 2800000, date: "2026-05-18", status: "Completed", method: "Cash" },
]

const statusConfig: Record<string, { className: string }> = {
  Completed: { className: "bg-emerald-100 text-emerald-800" },
  Pending: { className: "bg-yellow-100 text-yellow-800" },
  Failed: { className: "bg-red-100 text-red-800" },
}

const invoiceStatusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Sent: "bg-blue-100 text-blue-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Overdue: "bg-red-100 text-red-700",
}

// ── Searchable Invoice Dropdown ──
function InvoiceDropdown({
  value,
  onSelect,
}: {
  value: string
  onSelect: (invoiceId: string, customer: string, amount: number) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = invoiceOptions.find((i) => i.id === value)

  const filtered = invoiceOptions.filter(
    (i) =>
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen(!open)
          setTimeout(() => inputRef.current?.focus(), 0)
        }}
        className={`flex h-9 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
          open ? "border-indigo-300 ring-1 ring-indigo-200" : "border-gray-200"
        }`}
      >
        {selected ? (
          <span className="flex items-center gap-2 truncate">
            <span className="text-xs">{selected.id}</span>
            <span className="text-muted-foreground">—</span>
            <span className="truncate">{selected.customer}</span>
            <span className="ml-auto text-xs text-muted-foreground shrink-0">{formatIDR(selected.amount)}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">Pilih invoice...</span>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 ml-2 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg">
          {/* Search input */}
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Cari nomor invoice atau nama customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                Invoice tidak ditemukan
              </div>
            ) : (
              filtered.map((inv) => (
                <button
                  key={inv.id}
                  type="button"
                  onClick={() => {
                    onSelect(inv.id, inv.customer, inv.amount)
                    setOpen(false)
                    setSearch("")
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-indigo-50 ${
                    value === inv.id ? "bg-indigo-50" : ""
                  }`}
                >
                  <span className="text-xs font-medium">{inv.id}</span>
                  <span className="text-muted-foreground">—</span>
                  <span className="flex-1 truncate">{inv.customer}</span>
                  <Badge variant="outline" className={`text-[10px] px-1 py-0 ${invoiceStatusColors[inv.status] || ""}`}>
                    {inv.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground shrink-0">{formatIDR(inv.amount)}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ──
export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [statusFilter, setStatusFilter] = useState("All")
  const [dialogOpen, setDialogOpen] = useState(false)

  // Form state
  const [formCustomer, setFormCustomer] = useState("")
  const [formInvoice, setFormInvoice] = useState("")
  const [formAmount, setFormAmount] = useState("")
  const [formMethod, setFormMethod] = useState("Transfer")

  const [search, setSearch] = useState("")

  const filtered = payments.filter((p) => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter
    const matchSearch = !search ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.invoice.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0)
  const completedAmount = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0)

  const handleSubmit = () => {
    if (!formCustomer || !formInvoice || !formAmount) {
      alert("Mohon lengkapi semua field")
      return
    }
    const newPayment: Payment = {
      id: `PAY-2026-${String(payments.length + 1).padStart(3, "0")}`,
      customer: formCustomer,
      invoice: formInvoice,
      amount: parseInt(formAmount) || 0,
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
      method: formMethod as Payment["method"],
    }
    setPayments([newPayment, ...payments])
    setFormCustomer("")
    setFormInvoice("")
    setFormAmount("")
    setFormMethod("Transfer")
    setDialogOpen(false)
    alert("Pembayaran berhasil dicatat!")
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Kelola pembayaran dari customer
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />}>
            Record Payment
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
              <DialogDescription>
                Catat pembayaran baru dari customer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input
                  placeholder="PT Autogloss Indonesia"
                  value={formCustomer}
                  onChange={(e) => setFormCustomer(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Invoice Reference</Label>
                <InvoiceDropdown
                  value={formInvoice}
                  onSelect={(id, customer, amount) => {
                    setFormInvoice(id)
                    if (!formCustomer) setFormCustomer(customer)
                    if (!formAmount) setFormAmount(String(amount))
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Amount (Rp)</Label>
                <Input
                  type="number"
                  placeholder="8500000"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={formMethod} onValueChange={(v) => setFormMethod(v ?? "Transfer")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <CreditCard className="mr-2 h-4 w-4" />
                Submit Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <DollarSign className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payments</p>
                <p className="text-2xl">{formatIDR(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Banknote className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl text-emerald-600">{formatIDR(completedAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <CreditCard className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl text-yellow-600">{formatIDR(pendingAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          {/* Filter bar */}
          <div className="flex items-center gap-3 border-b px-4 py-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari payment ID / customer / invoice..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Completed", "Pending", "Failed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    statusFilter === s
                      ? s === "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                        : s === "Completed" ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : s === "Pending" ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                        : "border-red-300 bg-red-50 text-red-700"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {s === "All" ? "Semua" : s}
                </button>
              ))}
              {statusFilter !== "All" && (
                <button onClick={() => setStatusFilter("All")} className="rounded-md px-1 text-gray-400 hover:text-gray-600">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-sm text-muted-foreground">
                      Tidak ada pembayaran ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="text-xs">{payment.id}</TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell className="text-xs">{payment.invoice}</TableCell>
                      <TableCell className="text-right">{formatIDR(payment.amount)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <select
                          value={payment.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as Payment["status"]
                            setPayments((prev) =>
                              prev.map((p) => (p.id === payment.id ? { ...p, status: newStatus } : p))
                            )
                          }}
                          className={`cursor-pointer rounded-full border-0 px-2 py-0.5 text-[11px] font-medium outline-none transition-colors hover:opacity-80 ${statusConfig[payment.status].className}`}
                        >
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </TableCell>
                      <TableCell><Badge variant="outline">{payment.method}</Badge></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
