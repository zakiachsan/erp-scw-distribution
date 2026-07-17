"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Truck,
  Package,
  MapPin,
  Building2,
  CheckCircle2,
  Circle,
  CircleDot,
  ChevronRight,
  Banknote,
  Warehouse,
} from "lucide-react"

import WarehouseAssignmentSection from "@/components/warehouse-assignment"
import { inboundPOSources } from "@/lib/warehouse-store"

/* ── Types ── */
interface PaymentRecord {
  date: string
  type: "DP" | "Angsuran" | "Pelunasan"
  amount: number
  reference?: string
  notes?: string
}

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
  recipientName?: string
  recipientPhone?: string
  origin?: string
  weight?: string
  notes?: string
  poGrandTotal?: number
  poTotalPaid?: number
  poCurrency?: string
  paymentLog?: PaymentRecord[]
}

/* ── Data (stateful via getInitialData) ── */
function getInitialData(): Record<string, LogisticItem> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem("scw-logistic-data")
  if (stored) {
    try { return JSON.parse(stored) } catch {}
  }
  return {
    lg1: {
      id: "lg1", poNumber: "PO-2025-0042", poId: "1", courier: "JNE",
      trackingNumber: "JNE287654123", status: "Delivered",
      shippingDate: "2025-12-12", estimatedDelivery: "2025-12-15",
      destination: "Tangerang, Banten", totalItems: 6,
      recipientName: "Budi Santoso", recipientPhone: "+62 812-9876-5432",
      origin: "Jakarta Pusat", weight: "12.5 kg",
      notes: "Barang pecah belah, handle dengan hati-hati",
      poGrandTotal: 21169000, poTotalPaid: 21169000, poCurrency: "IDR",
      paymentLog: [
        { date: "2025-12-12", type: "DP", amount: 6350700, reference: "TRF/BCA/001", notes: "DP 30%" },
        { date: "2025-12-20", type: "Pelunasan", amount: 14818300, reference: "TRF/BCA/002", notes: "Pelunasan" },
      ],
    },
    lg2: {
      id: "lg2", poNumber: "PO-2025-0045", poId: "4", courier: "SiCepat",
      trackingNumber: "SCP481276543", status: "In Transit",
      shippingDate: "2025-12-16", estimatedDelivery: "2025-12-20",
      destination: "Jakarta Selatan", totalItems: 4,
      recipientName: "Dewi Sartika", recipientPhone: "+62 821-3456-7890",
      origin: "Jakarta Timur", weight: "4.2 kg",
      poGrandTotal: 7654000, poTotalPaid: 2296200, poCurrency: "IDR",
      paymentLog: [
        { date: "2025-12-16", type: "DP", amount: 2296200, reference: "TRF/BCA/003", notes: "DP 30%" },
      ],
    },
    lg3: {
      id: "lg3", poNumber: "PO-2025-0043", poId: "2", courier: "J&T Express",
      trackingNumber: "JT583726194", status: "Delivered",
      shippingDate: "2025-12-14", estimatedDelivery: "2025-12-16",
      destination: "Tangerang, Banten", totalItems: 3,
      recipientName: "Budi Santoso", recipientPhone: "+62 812-9876-5432",
      origin: "Jakarta Pusat", weight: "8.0 kg",
      poGrandTotal: 12500000, poTotalPaid: 12500000, poCurrency: "IDR",
      paymentLog: [
        { date: "2025-12-15", type: "DP", amount: 3750000, reference: "TRF/BCA/004", notes: "DP 30%" },
        { date: "2025-12-18", type: "Pelunasan", amount: 8750000, reference: "TRF/BCA/005", notes: "Pelunasan" },
      ],
    },
    lg4: {
      id: "lg4", poNumber: "PO-2025-0049", poId: "8", courier: "DHL",
      trackingNumber: "DHL9988776655", status: "Picked Up",
      shippingDate: "2025-12-18", estimatedDelivery: "2025-12-28",
      destination: "Singapore", totalItems: 4,
      recipientName: "James Chen", recipientPhone: "+65 9123-4567",
      origin: "Jakarta Pusat", weight: "5.0 kg",
      notes: "International shipping - customs clearance required",
      poGrandTotal: 6800, poTotalPaid: 6800, poCurrency: "USD",
      paymentLog: [
        { date: "2025-12-20", type: "Pelunasan", amount: 6800, reference: "DHL/INV/001", notes: "Full payment" },
      ],
    },
  }
}

function saveData(data: Record<string, LogisticItem>) {
  if (typeof window !== "undefined") {
    localStorage.setItem("scw-logistic-data", JSON.stringify(data))
  }
}

const statusConfig: Record<string, { label: string; className: string }> = {
  Booked: { label: "Booked", className: "bg-blue-50 text-blue-700 border-blue-200" },
  "Picked Up": { label: "Picked Up", className: "bg-amber-50 text-amber-700 border-amber-200" },
  "In Transit": { label: "In Transit", className: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  Delivered: { label: "Delivered", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
}

const timelineSteps = [
  { key: "Booked", label: "Booking Confirmed" },
  { key: "Picked Up", label: "Picked Up by Courier" },
  { key: "In Transit", label: "In Transit" },
  { key: "Delivered", label: "Delivered" },
]

const nextStatus: Record<string, string> = {
  Booked: "Picked Up",
  "Picked Up": "In Transit",
  "In Transit": "Delivered",
}

const statusIcons: Record<string, React.ElementType> = {
  Booked: CircleDot,
  "Picked Up": Truck,
  "In Transit": Package,
  Delivered: CheckCircle2,
}

export default function LogisticDetailPage() {
  const params = useParams()
  const id = String(params?.id ?? "")
  const [dataMap, setDataMap] = useState<Record<string, LogisticItem>>(getInitialData)
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null)
  const [noteInput, setNoteInput] = useState("")
  const [mounted, setMounted] = useState(false)
  const [recordPayOpen, setRecordPayOpen] = useState(false)
  const [payForm, setPayForm] = useState({
    type: "DP" as "DP" | "Angsuran" | "Pelunasan",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    reference: "",
    notes: "",
  })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const item = mounted ? dataMap[id] : undefined

  const updateStatus = (newStatus: LogisticItem["status"]) => {
    if (!item) return
    const updated = { ...dataMap, [id]: { ...item, status: newStatus, notes: noteInput || item.notes } }
    setDataMap(updated)
    saveData(updated)
    setConfirmDialog(null)
    setNoteInput("")
  }

  const handleRecordPayment = () => {
    const amount = parseInt(payForm.amount.replace(/\D/g, "")) || 0
    if (amount <= 0 || !item) return
    const newPaid = (item.poTotalPaid || 0) + amount
    const newLog: PaymentRecord = {
      date: payForm.date,
      type: payForm.type,
      amount,
      reference: payForm.reference || undefined,
      notes: payForm.notes || undefined,
    }
    const updated = {
      ...dataMap,
      [id]: {
        ...item,
        poTotalPaid: newPaid,
        paymentLog: [...(item.paymentLog || []), newLog],
      },
    }
    setDataMap(updated)
    saveData(updated)
    setRecordPayOpen(false)
    setPayForm({ type: "DP", amount: "", date: new Date().toISOString().split("T")[0], reference: "", notes: "" })
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </div>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">Memuat...</CardContent>
        </Card>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="space-y-6">
        <Link href="/purchasing/logistic" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">Data tidak ditemukan.</CardContent>
        </Card>
      </div>
    )
  }

  const statusIndex = timelineSteps.findIndex((s) => s.key === item.status)
  const cfg = statusConfig[item.status]
  const nextStep = nextStatus[item.status]
  const NextIcon = nextStep ? statusIcons[nextStep] || ChevronRight : null

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link href="/purchasing/logistic" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>

      {/* Header */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans font-medium text-xs text-muted-foreground">{item.trackingNumber}</span>
              <Badge variant="outline" className={cfg.className}>{cfg.label}</Badge>
            </div>
            <CardTitle>{item.courier}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              PO: <Link href={`/purchasing/${item.poId}`} className="text-blue-600 hover:underline">{item.poNumber}</Link>
              {" · "}{item.totalItems} item
            </p>
          </div>
          {nextStep && (
            <Button onClick={() => { setConfirmDialog(nextStep); setNoteInput("") }}>
              {NextIcon && <NextIcon className="mr-1.5 h-4 w-4" />}
              Mark as {nextStep}
            </Button>
          )}
        </CardHeader>
      </Card>

      {/* Warehouse Assignment - top, full width */}
      {item.status === "Delivered" && (
        <WarehouseAssignmentSection
          poId={item.poId}
          poNumber={item.poNumber}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-indigo-600" />
                Tracking Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineSteps.map((step, i) => {
                  const isDone = i < statusIndex
                  const isCurrent = i === statusIndex
                  const isPending = i > statusIndex

                  return (
                    <div key={step.key} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          isDone ? "bg-emerald-100 text-emerald-600" :
                          isCurrent ? "bg-cyan-100 text-cyan-600" :
                          "bg-gray-100 text-gray-400"
                        }`}>
                          {isDone ? <CheckCircle2 className="h-4 w-4" /> :
                           isCurrent ? <CircleDot className="h-4 w-4" /> :
                           <Circle className="h-4 w-4" />}
                        </div>
                        {i < timelineSteps.length - 1 && (
                          <div className={`w-0.5 flex-1 ${isDone ? "bg-emerald-300" : "bg-gray-200"}`} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={`text-sm font-medium ${isPending ? "text-muted-foreground" : "text-foreground"}`}>
                          {step.label}
                        </p>
                        {isCurrent && <p className="text-xs text-muted-foreground">{item.shippingDate}</p>}
                        {step.key === "Delivered" && isDone && (
                          <p className="text-xs text-emerald-600 font-medium">
                            Delivered on {new Date(item.estimatedDelivery).toLocaleDateString("id-ID")}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Shipment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4 text-indigo-600" />
                Shipment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Courier</p>
                  <p className="font-medium">{item.courier}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tracking Number</p>
                  <p className="text-sm font-medium text-primary">{item.trackingNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Origin</p>
                  <p className="text-sm">{item.origin || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="text-sm">{item.destination}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Shipping Date</p>
                  <p className="text-sm">{new Date(item.shippingDate).toLocaleDateString("id-ID")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                  <p className="text-sm">{new Date(item.estimatedDelivery).toLocaleDateString("id-ID")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Weight</p>
                  <p className="text-sm">{item.weight || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Items</p>
                  <p className="text-sm">{item.totalItems} item</p>
                </div>
              </div>
              {item.notes && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Catatan:</span> {item.notes}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          {(() => {
            const poSource = inboundPOSources.find((p) => p.id === item.poId) ||
              inboundPOSources.find((p) => p.id === `po-00${item.poId}`)
            if (!poSource) return null
            return (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-indigo-600" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {poSource.items.map((itm, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0">
                        <div>
                          <p className="text-sm font-medium">{itm.name}</p>
                          <p className="text-xs text-muted-foreground">{itm.sku}</p>
                        </div>
                        <span className="text-sm font-medium">×{itm.orderedQty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })()}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recipient Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4 text-indigo-600" />
                Recipient
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium">{item.recipientName || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm">{item.recipientPhone || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Destination</p>
                <p className="text-sm">{item.destination}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          {item.poGrandTotal != null && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Banknote className="h-4 w-4 text-indigo-600" />
                  Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const total = item.poGrandTotal || 0
                  const paid = item.poTotalPaid || 0
                  const remaining = total - paid
                  const percent = total > 0 ? Math.round((paid / total) * 100) : 0
                  const isPaid = paid >= total
                  const fmtAmt = (n: number, c: string) =>
                    c === "USD"
                      ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
                      : "Rp " + n.toLocaleString("id-ID")
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Status</span>
                        <Badge variant="outline" className={
                          isPaid ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          paid > 0 ? "bg-cyan-50 text-cyan-700 border-cyan-200" :
                          "bg-amber-50 text-amber-700 border-amber-200"
                        }>
                          {isPaid ? "Lunas" : paid > 0 ? "Sebagian" : "Belum Dibayar"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Total PO</span>
                        <span className="text-sm font-semibold">{fmtAmt(total, item.poCurrency || "IDR")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Dibayar</span>
                        <span className="text-sm font-semibold text-emerald-600">{fmtAmt(paid, item.poCurrency || "IDR")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Sisa</span>
                        <span className={`text-sm font-semibold ${isPaid ? "text-emerald-600" : "text-amber-600"}`}>
                          {isPaid ? "✓" : fmtAmt(remaining, item.poCurrency || "IDR")}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${isPaid ? "bg-emerald-500" : "bg-cyan-500"}`}
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                      {!isPaid && (
                        <Button size="sm" className="w-full mt-1" onClick={() => setRecordPayOpen(true)}>
                          <Banknote className="mr-1.5 h-3.5 w-3.5" /> Record Payment
                        </Button>
                      )}

                      {/* Payment Log */}
                      {item.paymentLog && item.paymentLog.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Riwayat Pembayaran</p>
                          <div className="space-y-1.5">
                            {item.paymentLog.map((p, i) => (
                              <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="text-muted-foreground shrink-0">{new Date(p.date).toLocaleDateString("id-ID")}</span>
                                  <Badge variant="outline" className={`text-[9px] px-1 py-0 ${
                                    p.type === "DP" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                    p.type === "Angsuran" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                    "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  }`}>{p.type}</Badge>
                                </div>
                                <span className="font-medium shrink-0 ml-2">{fmtAmt(p.amount, item.poCurrency || "IDR")}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/purchasing/${item.poId}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Lihat PO {item.poNumber}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Record Payment Dialog */}
      <Dialog open={recordPayOpen} onOpenChange={setRecordPayOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Record Payment — {item?.poNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <select value={payForm.type} onChange={(e) => setPayForm((p) => ({ ...p, type: e.target.value as "DP" | "Angsuran" | "Pelunasan" }))}
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="DP">DP (Uang Muka)</option>
                  <option value="Angsuran">Angsuran</option>
                  <option value="Pelunasan">Pelunasan</option>
                </select>
              </div>
              <div>
                <Label>Amount</Label>
                <Input value={payForm.amount} onChange={(e) => setPayForm((p) => ({ ...p, amount: e.target.value }))} placeholder="Rp" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date</Label>
                <Input type="date" value={payForm.date} onChange={(e) => setPayForm((p) => ({ ...p, date: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Reference</Label>
                <Input value={payForm.reference} onChange={(e) => setPayForm((p) => ({ ...p, reference: e.target.value }))} placeholder="No. referensi" className="mt-1" />
              </div>
            </div>
            {item && !item.poTotalPaid && payForm.type === "Pelunasan" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                Sisa: <span className="font-bold">{(item.poGrandTotal || 0).toLocaleString("id-ID")}</span>
                <Button variant="link" className="text-blue-700 text-xs p-0 h-auto ml-2"
                  onClick={() => setPayForm((p) => ({ ...p, amount: String(item.poGrandTotal || 0) }))}>
                  [Isi otomatis]
                </Button>
              </div>
            )}
            <div>
              <Label>Notes</Label>
              <Input value={payForm.notes} onChange={(e) => setPayForm((p) => ({ ...p, notes: e.target.value }))} placeholder="Catatan" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRecordPayOpen(false)}>Batal</Button>
            <Button onClick={handleRecordPayment}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Status Update Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={(o) => !o && setConfirmDialog(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              Update Status ke &quot;{confirmDialog}&quot;
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              Ubah status pengiriman {item?.courier} ({item?.trackingNumber}) menjadi {confirmDialog}?
            </p>
            <div>
              <Label>Catatan (opsional)</Label>
              <Input
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Tambahkan catatan..."
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog(null)}>Batal</Button>
            <Button onClick={() => updateStatus(confirmDialog as LogisticItem["status"])}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
