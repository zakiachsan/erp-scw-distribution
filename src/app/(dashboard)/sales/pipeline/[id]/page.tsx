"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import {
  ArrowLeft, Phone, Mail, MapPin, User, DollarSign, Activity,
  Pencil, ChevronDown, Trash2, FileText, X, Clock, Calendar,
  Check, ShoppingCart, ExternalLink, Package,
} from "lucide-react"
import Link from "next/link"

// ─── Types ───────────────────────────────────────────────────────────────────

type StageId = "estimate" | "order" | "invoice" | "paid" | "shipped"

interface QuotationItem {
  id: string; description: string; quantity: number; unit: string; unitPrice: number; discount: number; amount: number
}

interface ActivityLog {
  id: string; type: "Call" | "Meeting" | "Visit" | "Follow-up" | "Other"; notes: string; timestamp: string
}

interface PipelineDeal {
  id: string; customer: string; company: string; phone: string; email: string; address: string
  value: number; stage: StageId; salesName: string; tier: string; notes: string; createdAt: string; poId: string | null
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STAGES: { id: StageId; label: string; color: string }[] = [
  { id: "estimate", label: "Estimate", color: "bg-blue-100 text-blue-700" },
  { id: "order", label: "Sales Order", color: "bg-indigo-100 text-indigo-700" },
  { id: "invoice", label: "Invoice", color: "bg-violet-100 text-violet-700" },
  { id: "paid", label: "Paid", color: "bg-emerald-100 text-emerald-700" },
  { id: "shipped", label: "Shipped", color: "bg-cyan-100 text-cyan-700" },
]

const SALES_PEOPLE = ["Ahmad Rizki", "Siti Nurhaliza", "Bambang"]
const ACTIVITY_TYPES = ["Call", "Meeting", "Visit", "Follow-up", "Other"] as const

const PRODUCTS = [
  { id: "P01", name: "SCW Snow Foam", unit: "Pcs", price: 150000 },
  { id: "P02", name: "SCW Ceramic Coating", unit: "Pcs", price: 250000 },
  { id: "P03", name: "SCW Interior Detailer", unit: "Pcs", price: 120000 },
  { id: "P04", name: "SCW Tire Gel", unit: "Pcs", price: 95000 },
  { id: "P05", name: "SCW Spray Wax", unit: "Pcs", price: 110000 },
  { id: "P06", name: "SCW Glass Cleaner", unit: "Pcs", price: 85000 },
  { id: "P07", name: "SCW Polish Compound", unit: "Kg", price: 180000 },
  { id: "P08", name: "SCW Shampoo Plus", unit: "Pcs", price: 90000 },
  { id: "P09", name: "SCW Iron Decontamination", unit: "Pcs", price: 135000 },
  { id: "P10", name: "SCW All Purpose Cleaner", unit: "Pcs", price: 105000 },
]

const TIER_DISCOUNTS: Record<string, number> = {
  Bronze: 0.02,
  Silver: 0.05,
  Gold: 0.08,
  Platinum: 0.12,
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_DEALS: Record<string, PipelineDeal> = {
  "PL-001": {
    id: "PL-001", customer: "Budi Santoso", company: "PT Autogloss Indonesia",
    phone: "(021) 555-0123", email: "budi@autogloss.co.id",
    address: "Jl. Raya Bogor Km 30, Jakarta Timur",
    value: 25000000, stage: "estimate", salesName: "Ahmad Rizki", tier: "Gold",
    notes: "Follow up after product demo. Customer interested in bulk order.",
    createdAt: "2026-06-10", poId: "SO-2026-045",
  },
  "PL-002": {
    id: "PL-002", customer: "Andi Pratama", company: "CV Ceramic Pro JKT",
    phone: "(021) 555-0456", email: "andi@ceramicpro.co.id",
    address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
    value: 18000000, stage: "estimate", salesName: "Siti Nurhaliza", tier: "Silver",
    notes: "", createdAt: "2026-06-09", poId: "SO-2026-044",
  },
  "PL-003": {
    id: "PL-003", customer: "Rina Wijaya", company: "UD Shinemax",
    phone: "(031) 555-0789", email: "rina@shinemax.co.id",
    address: "Jl. Basuki Rahmat No. 12, Surabaya",
    value: 32000000, stage: "order", salesName: "Ahmad Rizki", tier: "Bronze",
    notes: "Confirmed order. Awaiting stock allocation.",
    createdAt: "2026-06-08", poId: null,
  },
  "PL-004": {
    id: "PL-004", customer: "Dedi Kurniawan", company: "PT DetailWorks BDG",
    phone: "(022) 555-0321", email: "dedi@detailworks.co.id",
    address: "Jl. Asia Afrika No. 78, Bandung",
    value: 15000000, stage: "order", salesName: "Bambang", tier: "Platinum",
    notes: "", createdAt: "2026-06-07", poId: "SO-2026-042",
  },
  "PL-005": {
    id: "PL-005", customer: "Sari Dewi", company: "CV ProShine SBY",
    phone: "(031) 555-0654", email: "sari@proshine.co.id",
    address: "Jl. Pemuda No. 33, Surabaya",
    value: 8500000, stage: "invoice", salesName: "Siti Nurhaliza", tier: "Silver",
    notes: "Invoice sent. Waiting for payment confirmation.",
    createdAt: "2026-06-06", poId: null,
  },
  "PL-006": {
    id: "PL-006", customer: "Hendra Gunawan", company: "AutoCare Makassar",
    phone: "(0411) 555-0987", email: "hendra@autocare.co.id",
    address: "Jl. AP Pettarani No. 10, Makassar",
    value: 42000000, stage: "invoice", salesName: "Ahmad Rizki", tier: "Bronze",
    notes: "Big deal. Payment expected within 7 days.",
    createdAt: "2026-06-05", poId: null,
  },
  "PL-007": {
    id: "PL-007", customer: "Maya Putri", company: "GlossUp Bali",
    phone: "(0361) 555-0234", email: "maya@glossup.co.id",
    address: "Jl. Sunset Road No. 88, Kuta, Bali",
    value: 12500000, stage: "paid", salesName: "Bambang", tier: "Platinum",
    notes: "Payment received via bank transfer.",
    createdAt: "2026-06-03", poId: null,
  },
  "PL-008": {
    id: "PL-008", customer: "Rizky Firmansyah", company: "DetailPro Semarang",
    phone: "(024) 555-0876", email: "rizky@detailpro.co.id",
    address: "Jl. Pandanaran No. 55, Semarang",
    value: 28000000, stage: "paid", salesName: "Siti Nurhaliza", tier: "Gold",
    notes: "", createdAt: "2026-06-01", poId: null,
  },
  "PL-009": {
    id: "PL-009", customer: "Ani Sulastri", company: "CarCare Medan",
    phone: "(061) 555-0543", email: "ani@carcare.co.id",
    address: "Jl. Iskandar Muda No. 20, Medan",
    value: 9500000, stage: "shipped", salesName: "Ahmad Rizki", tier: "Bronze",
    notes: "Delivered. Awaiting customer feedback.",
    createdAt: "2026-05-28", poId: null,
  },
  "PL-010": {
    id: "PL-010", customer: "Fajar Hidayat", company: "PT AutoPrima Surabaya",
    phone: "(031) 555-0111", email: "fajar@autoprima.co.id",
    address: "Jl. Dharmahusada No. 40, Surabaya",
    value: 55000000, stage: "shipped", salesName: "Bambang", tier: "Gold",
    notes: "Completed deal. Potential repeat order next quarter.",
    createdAt: "2026-05-25", poId: null,
  },
}

const MOCK_QUOTATION_ITEMS: QuotationItem[] = [
  { id: "QI-001", description: "SCW Auto Gloss 3000ml", quantity: 20, unit: "Pail", unitPrice: 850000, discount: 0, amount: 17000000 },
  { id: "QI-002", description: "SCW Micro Fiber Cloth", quantity: 50, unit: "Pcs", unitPrice: 25000, discount: 0, amount: 1250000 },
  { id: "QI-003", description: "SCW Polish Compound", quantity: 10, unit: "Kg", unitPrice: 350000, discount: 0, amount: 3500000 },
]

const MOCK_ACTIVITIES: ActivityLog[] = [
  { id: "ACT-001", type: "Call", notes: "Called customer to confirm interest. They will review the catalog.", timestamp: "2026-06-10T09:30:00" },
  { id: "ACT-002", type: "Meeting", notes: "Product demo at customer site. Very positive feedback.", timestamp: "2026-06-11T14:00:00" },
  { id: "ACT-003", type: "Follow-up", notes: "Sent follow-up email with quotation. Awaiting reply.", timestamp: "2026-06-12T10:00:00" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIDR(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`
}

function getActivityIcon(type: string) {
  switch (type) {
    case "Call": return Phone
    case "Meeting": return Calendar
    case "Visit": return MapPin
    case "Follow-up": return Clock
    default: return Activity
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case "Call": return "bg-blue-100 text-blue-600"
    case "Meeting": return "bg-purple-100 text-purple-600"
    case "Visit": return "bg-emerald-100 text-emerald-600"
    case "Follow-up": return "bg-amber-100 text-amber-600"
    default: return "bg-slate-100 text-slate-600"
  }
}

// ─── Collapsible Section Wrapper ─────────────────────────────────────────────

function CollapsibleSection({
  title, icon: Icon, iconColor, badge, expanded, onToggle, children,
}: {
  title: string; icon: React.ElementType; iconColor?: string; badge?: string
  expanded: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <Card>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-2.5 cursor-pointer bg-transparent border-none"
      >
        <div className="flex items-center gap-2">
          <Icon className={`size-3.5 ${iconColor ?? "text-indigo-500"}`} />
          <span className="text-xs font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge && <span className="text-xs text-muted-foreground">{badge}</span>}
          <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${expanded ? "" : "-rotate-90"}`} />
        </div>
      </button>
      {expanded && <CardContent className="pt-0 pb-2.5">{children}</CardContent>}
    </Card>
  )
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function PipelineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const [deal, setDeal] = useState<PipelineDeal | null>(MOCK_DEALS[id] ?? null)
  const [isEditing, setIsEditing] = useState(false)
  const [editStage, setEditStage] = useState<StageId>("estimate")
  const [editValue, setEditValue] = useState("")
  const [editSales, setEditSales] = useState("")
  const [editNotes, setEditNotes] = useState("")

  const [activities, setActivities] = useState<ActivityLog[]>(MOCK_ACTIVITIES)
  const [newActivityType, setNewActivityType] = useState<string>("Call")
  const [newActivityNotes, setNewActivityNotes] = useState("")

  const [quotationExpanded, setQuotationExpanded] = useState(true)
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>(MOCK_QUOTATION_ITEMS)
  const [quotationData, setQuotationData] = useState({
    refNumber: "026/SCW/VI/2026", date: "2026-06-10", attn: "",
    subject: "Quotation - Auto Gloss Products", paymentTerms: "CBD 30 Days",
    deliveryTime: "3 days process", taxPercent: "11", signatory: "David",
  })

  const [newItem, setNewItem] = useState({ productId: "", description: "", quantity: "1", unit: "", unitPrice: "0", discount: "0", amount: "0" })
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState({ description: "", quantity: "1", unit: "", unitPrice: "0", discount: "0", amount: "0" })

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteItemConfirm, setDeleteItemConfirm] = useState<{ id: string; description: string } | null>(null)
  const [poExpanded, setPoExpanded] = useState(true)
  const [activityExpanded, setActivityExpanded] = useState(true)

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-sm text-muted-foreground">Pipeline not found</p>
        <Button variant="outline" size="sm" onClick={() => router.push("/sales/pipeline")}>
          <ArrowLeft className="size-3.5 mr-1" /> Kembali
        </Button>
      </div>
    )
  }

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleStartEdit = () => {
    setEditStage(deal.stage); setEditValue(deal.value.toString())
    setEditSales(deal.salesName); setEditNotes(deal.notes); setIsEditing(true)
  }

  const handleSaveEdit = () => {
    setDeal({ ...deal, stage: editStage, value: Number(editValue) || deal.value, salesName: editSales || deal.salesName, notes: editNotes })
    setIsEditing(false)
  }

  const handleAddActivity = () => {
    if (!newActivityNotes.trim()) return
    setActivities([{
      id: `ACT-${String(activities.length + 1).padStart(3, "0")}`,
      type: newActivityType as ActivityLog["type"], notes: newActivityNotes.trim(), timestamp: new Date().toISOString(),
    }, ...activities])
    setNewActivityNotes("")
  }

  const handleAddQuotationItem = () => {
    if (!newItem.description.trim()) return
    const qty = parseFloat(newItem.quantity) || 1, price = parseFloat(newItem.unitPrice) || 0
    const disc = parseFloat(newItem.discount) || 0
    setQuotationItems([...quotationItems, {
      id: `QI-${String(quotationItems.length + 1).padStart(3, "0")}`,
      description: newItem.description, quantity: qty, unit: newItem.unit, unitPrice: price, discount: disc, amount: (price - disc) * qty,
    }])
    setNewItem({ productId: "", description: "", quantity: "1", unit: "", unitPrice: "0", discount: "0", amount: "0" })
  }

  const handleStartEditItem = (item: QuotationItem) => {
    setEditingItemId(item.id)
    setEditItem({ description: item.description, quantity: item.quantity.toString(), unit: item.unit, unitPrice: item.unitPrice.toString(), discount: item.discount.toString(), amount: item.amount.toString() })
  }

  const handleSaveEditItem = () => {
    if (!editingItemId) return
    const qty = parseFloat(editItem.quantity) || 1, price = parseFloat(editItem.unitPrice) || 0
    const disc = parseFloat(editItem.discount) || 0
    setQuotationItems(quotationItems.map((item) =>
      item.id === editingItemId ? { ...item, description: editItem.description, quantity: qty, unit: editItem.unit, unitPrice: price, discount: disc, amount: (price - disc) * qty } : item
    ))
    setEditingItemId(null)
  }

  const handleDeleteItem = (itemId: string) => { setQuotationItems(quotationItems.filter((i) => i.id !== itemId)); setDeleteItemConfirm(null) }
  const handleDelete = () => { router.push("/sales/pipeline") }
  const calcAmount = (qty: string, price: string) => (parseFloat(qty || "0") * parseFloat(price || "0")).toString()

  const stageInfo = STAGES.find((s) => s.id === deal.stage)
  const subtotalAmount = quotationItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
  const discountTotal = quotationItems.reduce((s, i) => s + i.discount * i.quantity, 0)
  const totalAmount = subtotalAmount - discountTotal
  const taxPercent = parseFloat(quotationData.taxPercent) || 0
  const taxAmount = Math.round((totalAmount * taxPercent) / 100)
  const canCreatePO = deal.stage !== "estimate"

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-3 p-3 max-w-6xl mx-auto">
      {/* Back + Header — one line */}
      <div className="flex items-center gap-2">
        <button onClick={() => router.push("/sales/pipeline")} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <ArrowLeft className="size-4" />
        </button>
        <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
          <h1 className="text-base font-semibold truncate">{deal.customer}</h1>
          <span className="text-xs text-muted-foreground truncate hidden sm:inline">— {deal.company}</span>
          {stageInfo && <Badge variant="secondary" className={`text-xs ${stageInfo.color}`}>{stageInfo.label}</Badge>}

        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {!isEditing ? (
            <>
              <Button variant="outline" size="xs" onClick={handleStartEdit}><Pencil className="size-3 mr-0.5" />Edit</Button>
              <Button variant="destructive" size="xs" onClick={() => setDeleteOpen(true)}><Trash2 className="size-3 mr-0.5" />Hapus</Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="xs" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button size="xs" onClick={handleSaveEdit}><Check className="size-3 mr-0.5" />Save</Button>
            </>
          )}
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">

        {/* ─── LEFT: Main Content ──────────────────────────────────────── */}
        <div className="space-y-3">
          {/* Activity */}
          <CollapsibleSection title="Activity" icon={Activity} iconColor="text-purple-500" expanded={activityExpanded} onToggle={() => setActivityExpanded(!activityExpanded)}>
            <div className="space-y-2">
              <div className="flex gap-1.5">
                <Select value={newActivityType} onValueChange={(v) => v && setNewActivityType(v)}>
                  <SelectTrigger className="h-7 text-xs w-24"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ACTIVITY_TYPES.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                  </SelectContent>
                </Select>
                <input type="text" value={newActivityNotes} onChange={(e) => setNewActivityNotes(e.target.value)} placeholder="Add activity note..." className="flex-1 px-2 py-1 bg-background border border-input rounded-md text-xs outline-none focus:border-ring" onKeyDown={(e) => e.key === "Enter" && handleAddActivity()} />
                <Button size="xs" onClick={handleAddActivity} disabled={!newActivityNotes.trim()}>Add</Button>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {activities.length > 0 ? activities.map((act) => {
                  const Icon = getActivityIcon(act.type)
                  return (
                    <div key={act.id} className="flex items-start gap-2">
                      <div className={`p-1 rounded-md flex-shrink-0 ${getActivityColor(act.type)}`}><Icon className="size-3" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold">{act.type}</span>
                          <span className="text-xs text-muted-foreground">{new Date(act.timestamp).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                        {act.notes && <p className="text-xs text-muted-foreground mt-0.5">{act.notes}</p>}
                      </div>
                    </div>
                  )
                }) : <p className="text-xs text-muted-foreground text-center py-3">No activities yet</p>}
              </div>
            </div>
          </CollapsibleSection>

          {/* Quotation */}
          <CollapsibleSection title="Quotation" icon={FileText} expanded={quotationExpanded} onToggle={() => setQuotationExpanded(!quotationExpanded)} badge={quotationData.refNumber}>
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([
                  ["Ref Number", "refNumber", "text"], ["Date", "date", "date"], ["Attn", "attn", "text", "Nama PIC"],
                  ["Subject", "subject", "text"], ["Payment Terms", "paymentTerms", "text", "CBD / 30 Days"],
                  ["Delivery Time", "deliveryTime", "text", "3 days process"], ["Tax %", "taxPercent", "number"], ["Signatory", "signatory", "text"],
                ] as [string, string, string, string?][]).map(([label, key, type, ph]) => (
                  <div key={key} className="space-y-0.5">
                    <Label className="text-xs">{label}</Label>
                    <Input type={type} value={(quotationData as any)[key]} onChange={(e) => setQuotationData({ ...quotationData, [key]: e.target.value })} className="h-7 !text-xs" placeholder={ph ?? ""} />
                  </div>
                ))}
              </div>

              {/* Items */}
              <div className="pt-2 border-t">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Item Produk</p>
                <div className="flex gap-1.5 mb-2">
                  <select
                    value={newItem.productId}
                    onChange={(e) => {
                      const pid = e.target.value
                      const prod = PRODUCTS.find((p) => p.id === pid)
                      if (prod) {
                        const disc = Math.round(prod.price * (TIER_DISCOUNTS[deal.tier] || 0))
                        setNewItem({ ...newItem, productId: pid, description: prod.name, unit: prod.unit, unitPrice: prod.price.toString(), discount: disc.toString() })
                      } else {
                        setNewItem({ ...newItem, productId: "", description: "", unit: "", unitPrice: "0", discount: "0" })
                      }
                    }}
                    className="flex-[2] min-w-0 px-2 py-1 bg-background border border-input rounded-md text-xs outline-none focus:border-ring"
                  >
                    <option value="">Pilih produk...</option>
                    {PRODUCTS.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                  </select>
                  <input type="text" value={newItem.unit} readOnly placeholder="Unit" className="flex-1 min-w-0 px-2 py-1 bg-muted border border-input rounded-md text-xs outline-none" />
                  <input type="number" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} placeholder="Qty" className="w-16 px-2 py-1 bg-background border border-input rounded-md text-xs outline-none focus:border-ring" min="1" />
                  <button onClick={handleAddQuotationItem} disabled={!newItem.productId} className="px-2 py-1 bg-indigo-600 text-white rounded-md text-xs disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">Add</button>
                </div>

                {quotationItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left px-1.5 py-1 font-medium">Description</th>
                          <th className="text-center px-1 py-1 font-medium w-10">Qty</th>
                          <th className="text-center px-1 py-1 font-medium w-10">Unit</th>
                          <th className="text-right px-1.5 py-1 font-medium w-24 whitespace-nowrap">Harga Satuan</th>
                          <th className="text-right px-1.5 py-1 font-medium w-20 whitespace-nowrap">Diskon</th>
                          <th className="text-right px-1.5 py-1 font-medium w-24 whitespace-nowrap">Amount</th>
                          <th className="px-1 py-1 w-14"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotationItems.map((item) => (
                          <tr key={item.id} className="border-t border-border/50">
                            {editingItemId === item.id ? (
                              <>
                                <td className="px-1 py-0.5"><input type="text" value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} className="w-full px-1 py-0.5 border border-input rounded text-xs bg-background" /></td>
                                <td className="px-1 py-0.5"><input type="number" value={editItem.quantity} onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })} className="w-full px-1 py-0.5 border border-input rounded text-xs text-center bg-background" min="1" /></td>
                                <td className="px-1 py-0.5"><input type="text" value={editItem.unit} onChange={(e) => setEditItem({ ...editItem, unit: e.target.value })} className="w-full px-1 py-0.5 border border-input rounded text-xs text-center bg-background" /></td>
                                <td className="px-1.5 py-0.5 text-right whitespace-nowrap">{formatIDR(parseFloat(editItem.unitPrice || "0"))}</td>
                                <td className="px-1.5 py-0.5 text-right whitespace-nowrap text-muted-foreground">{formatIDR(parseFloat(editItem.discount || "0"))}</td>
                                <td className="px-1.5 py-0.5 text-right whitespace-nowrap">{formatIDR((parseFloat(editItem.unitPrice || "0") - parseFloat(editItem.discount || "0")) * (parseFloat(editItem.quantity || "0")))}</td>
                                <td className="px-1 py-0.5"><div className="flex gap-0.5"><button onClick={handleSaveEditItem} className="p-0.5 text-emerald-600 hover:bg-emerald-50 rounded cursor-pointer"><Check className="size-3" /></button><button onClick={() => setEditingItemId(null)} className="p-0.5 text-muted-foreground hover:bg-muted rounded cursor-pointer"><X className="size-3" /></button></div></td>
                              </>
                            ) : (
                              <>
                                <td className="px-1.5 py-1">{item.description}</td>
                                <td className="px-1 py-1 text-center">{item.quantity}</td>
                                <td className="px-1 py-1 text-center">{item.unit}</td>
                                <td className="px-1.5 py-1 text-right whitespace-nowrap">{formatIDR(item.unitPrice)}</td>
                                <td className="px-1.5 py-1 text-right whitespace-nowrap text-muted-foreground">{item.discount > 0 ? formatIDR(item.discount) : "-"}</td>
                                <td className="px-1.5 py-1 text-right whitespace-nowrap">{formatIDR(item.amount)}</td>
                                <td className="px-1 py-1"><div className="flex gap-0.5 justify-center"><button onClick={() => handleStartEditItem(item)} className="p-0.5 text-indigo-500 hover:bg-indigo-50 rounded cursor-pointer"><Pencil className="size-3" /></button><button onClick={() => setDeleteItemConfirm({ id: item.id, description: item.description })} className="p-0.5 text-muted-foreground hover:bg-destructive/10 rounded cursor-pointer"><Trash2 className="size-3" /></button></div></td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-border/50">
                          <td colSpan={5} className="px-1.5 py-0.5 text-right text-muted-foreground">Subtotal</td>
                          <td className="px-1.5 py-0.5 text-right text-muted-foreground whitespace-nowrap">{formatIDR(subtotalAmount)}</td>
                          <td></td>
                        </tr>
                        <tr className="border-t border-border/50">
                          <td colSpan={5} className="px-1.5 py-0.5 text-right text-muted-foreground">Diskon</td>
                          <td className="px-1.5 py-0.5 text-right text-muted-foreground whitespace-nowrap">-{formatIDR(discountTotal)}</td>
                          <td></td>
                        </tr>
                        <tr className="border-t-2 border-border bg-muted/30">
                          <td colSpan={5} className="px-1.5 py-1 text-right font-medium">TOTAL</td>
                          <td className="px-1.5 py-1 text-right font-medium whitespace-nowrap">{formatIDR(totalAmount)}</td>
                          <td></td>
                        </tr>
                        {taxPercent > 0 && (
                          <>
                            <tr className="border-t border-border/50">
                              <td colSpan={5} className="px-1.5 py-0.5 text-right text-muted-foreground">PPN {taxPercent}%</td>
                              <td className="px-1.5 py-0.5 text-right text-muted-foreground whitespace-nowrap">{formatIDR(taxAmount)}</td>
                              <td></td>
                            </tr>
                            <tr className="border-t-2 border-border bg-muted/30">
                              <td colSpan={5} className="px-1.5 py-1 text-right font-medium">TOTAL + PPN</td>
                              <td className="px-1.5 py-1 text-right font-medium whitespace-nowrap">{formatIDR(totalAmount + taxAmount)}</td>
                              <td></td>
                            </tr>
                          </>
                        )}
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-2 italic">Belum ada item.</p>
                )}
              </div>
            </div>
          </CollapsibleSection>

          {/* Purchase Order */}
          <CollapsibleSection title="Purchase Order" icon={ShoppingCart} expanded={poExpanded} onToggle={() => setPoExpanded(!poExpanded)} badge={deal.poId ?? undefined}>
            {deal.poId ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                    <p className="text-xs text-muted-foreground">PO Number</p>
                    <Link href={`/sales/orders/${deal.poId}`} className="text-xs font-semibold text-indigo-600 hover:underline">{deal.poId}</Link>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 mt-0.5">Confirmed</Badge>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-xs font-semibold">{formatIDR(deal.value)}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="text-xs">{deal.company}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link href={`/sales/orders/${deal.poId}`}><Button variant="outline" size="xs"><ExternalLink className="size-3 mr-1" />Lihat PO</Button></Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <Package className="mx-auto size-7 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">Belum ada Purchase Order</p>
                {canCreatePO ? (
                  <Link href={`/sales/orders/create?pipelineId=${deal.id}`}><Button size="xs" className="bg-indigo-600 hover:bg-indigo-700"><ShoppingCart className="size-3 mr-1" />Buat Purchase Order</Button></Link>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Pindahkan deal ke stage setelah Estimate untuk membuat PO</p>
                )}
              </div>
            )}
          </CollapsibleSection>
        </div>

        {/* ─── RIGHT: Sidebar ──────────────────────────────────────────── */}
        <div className="space-y-3">
          {/* Combined Contact + Deal Info Card */}
          <Card>
            <CardContent className="p-2.5 space-y-2.5">
              {/* Value Banner */}
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                <p className="text-xs opacity-70 font-medium">Deal Value</p>
                <p className="text-base font-bold">{formatIDR(deal.value)}</p>
              </div>

              {/* Stage + Sales */}
              <div className="flex items-center gap-2 text-xs">
                {stageInfo && <Badge variant="secondary" className={`text-xs ${stageInfo.color}`}>{stageInfo.label}</Badge>}
                <span className="flex items-center gap-1 text-muted-foreground text-xs"><User className="size-3" />PIC: {deal.salesName}</span>
              </div>

              {/* Contact */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</p>
                <div className="flex items-center gap-2 p-1.5 rounded bg-indigo-50/50">
                  <Phone className="size-3 text-indigo-500" />
                  <span className="text-xs">{deal.phone}</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-indigo-50/50">
                  <Mail className="size-3 text-indigo-500" />
                  <span className="text-xs truncate">{deal.email}</span>
                </div>
                <div className="flex items-start gap-2 p-1.5 rounded bg-indigo-50/50">
                  <MapPin className="size-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">{deal.address}</span>
                </div>
              </div>

              {/* Notes */}
              {deal.notes && (
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notes</p>
                  <div className="p-1.5 bg-muted/50 rounded text-xs">{deal.notes}</div>
                </div>
              )}

              {/* Edit Form (inline in sidebar when editing) */}
              {isEditing && (
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Edit Data</p>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Stage</Label>
                    <Select value={editStage} onValueChange={(v) => v && setEditStage(v as StageId)}>
                      <SelectTrigger className="h-7 text-xs w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>{STAGES.map((s) => (<SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Deal Value (Rp)</Label>
                    <Input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="h-7 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Sales Person</Label>
                    <Select value={editSales} onValueChange={(v) => setEditSales(v ?? "")}>
                      <SelectTrigger className="h-7 text-xs w-full"><SelectValue placeholder="Pilih sales" /></SelectTrigger>
                      <SelectContent>{SALES_PEOPLE.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Notes</Label>
                    <Textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} className="text-xs min-h-[50px]" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Pipeline Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Hapus Sales Pipeline?</DialogTitle>
            <DialogDescription>Yakin ingin menghapus pipeline &quot;{deal.customer}&quot;? Tindakan ini tidak dapat dibatalkan.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="xs" onClick={() => setDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" size="xs" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Item Confirmation */}
      <Dialog open={!!deleteItemConfirm} onOpenChange={(o) => !o && setDeleteItemConfirm(null)}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>Hapus Item?</DialogTitle>
            <DialogDescription>Yakin ingin menghapus &quot;{deleteItemConfirm?.description}&quot; dari daftar?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="xs" onClick={() => setDeleteItemConfirm(null)}>Batal</Button>
            <Button variant="destructive" size="xs" onClick={() => deleteItemConfirm && handleDeleteItem(deleteItemConfirm.id)}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
