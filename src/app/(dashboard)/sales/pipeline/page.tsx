"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Plus,
  FileText,
  ShoppingCart,
  CheckCircle2,
  Truck,
  Target,
  TrendingUp,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  GripVertical,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type StageId = "estimate" | "order" | "invoice" | "paid" | "shipped"

interface PipelineDeal {
  id: string
  customer: string
  company: string
  value: number
  stage: StageId
  salesName: string
  notes: string
  createdAt: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STAGES: { id: StageId; label: string; icon: typeof FileText; color: string }[] = [
  { id: "estimate", label: "Estimate", icon: FileText, color: "border-t-blue-500" },
  { id: "order", label: "Sales Order", icon: ShoppingCart, color: "border-t-indigo-500" },
  { id: "invoice", label: "Invoice", icon: FileText, color: "border-t-violet-500" },
  { id: "paid", label: "Paid", icon: CheckCircle2, color: "border-t-emerald-500" },
  { id: "shipped", label: "Shipped", icon: Truck, color: "border-t-cyan-500" },
]

const SALES_PEOPLE = ["Ahmad Rizki", "Siti Nurhaliza", "Bambang"]

// ─── Mock Data ───────────────────────────────────────────────────────────────

const INITIAL_DEALS: PipelineDeal[] = [
  { id: "PL-001", customer: "Budi Santoso", company: "PT Autogloss Indonesia", value: 25000000, stage: "estimate", salesName: "Ahmad Rizki", notes: "Follow up after demo", createdAt: "2026-06-10" },
  { id: "PL-002", customer: "Andi Pratama", company: "CV Ceramic Pro JKT", value: 18000000, stage: "estimate", salesName: "Siti Nurhaliza", notes: "", createdAt: "2026-06-09" },
  { id: "PL-003", customer: "Rina Wijaya", company: "UD Shinemax", value: 32000000, stage: "order", salesName: "Ahmad Rizki", notes: "Confirmed order", createdAt: "2026-06-08" },
  { id: "PL-004", customer: "Dedi Kurniawan", company: "PT DetailWorks BDG", value: 15000000, stage: "order", salesName: "Bambang", notes: "", createdAt: "2026-06-07" },
  { id: "PL-005", customer: "Sari Dewi", company: "CV ProShine SBY", value: 8500000, stage: "invoice", salesName: "Siti Nurhaliza", notes: "Invoice sent", createdAt: "2026-06-06" },
  { id: "PL-006", customer: "Hendra Gunawan", company: "AutoCare Makassar", value: 42000000, stage: "invoice", salesName: "Ahmad Rizki", notes: "Big deal", createdAt: "2026-06-05" },
  { id: "PL-007", customer: "Maya Putri", company: "GlossUp Bali", value: 12500000, stage: "paid", salesName: "Bambang", notes: "Payment received", createdAt: "2026-06-03" },
  { id: "PL-008", customer: "Rizky Firmansyah", company: "DetailPro Semarang", value: 28000000, stage: "paid", salesName: "Siti Nurhaliza", notes: "", createdAt: "2026-06-01" },
  { id: "PL-009", customer: "Ani Sulastri", company: "CarCare Medan", value: 9500000, stage: "shipped", salesName: "Ahmad Rizki", notes: "Delivered", createdAt: "2026-05-28" },
  { id: "PL-010", customer: "Fajar Hidayat", company: "PT AutoPrima Surabaya", value: 55000000, stage: "shipped", salesName: "Bambang", notes: "Completed", createdAt: "2026-05-25" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIDR(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`
}

function formatCompactIDR(n: number): string {
  if (n >= 1000000000) return `Rp ${(n / 1000000000).toFixed(1).replace(".", ",")}M`
  if (n >= 1000000) return `Rp ${(n / 1000000).toFixed(1).replace(".", ",")}jt`
  if (n >= 1000) return `Rp ${(n / 1000).toFixed(0).replace(".", ",")}rb`
  return `Rp ${n.toLocaleString("id-ID")}`
}

function getProbability(stage: StageId): number {
  switch (stage) {
    case "estimate": return 20
    case "order": return 50
    case "invoice": return 80
    case "paid": return 100
    case "shipped": return 100
  }
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function PipelinePage() {
  const router = useRouter()
  const [deals, setDeals] = useState<PipelineDeal[]>(INITIAL_DEALS)
  const [addOpen, setAddOpen] = useState(false)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  // New deal form
  const [newName, setNewName] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [newValue, setNewValue] = useState("")
  const [newSales, setNewSales] = useState("")
  const [newStage, setNewStage] = useState<StageId>("estimate")
  const [newNotes, setNewNotes] = useState("")

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleAddDeal = () => {
    if (!newName.trim() || !newValue.trim()) return
    const deal: PipelineDeal = {
      id: `PL-${String(deals.length + 1).padStart(3, "0")}`,
      customer: newName.trim(),
      company: newCompany.trim() || "-",
      value: Number(newValue),
      stage: newStage,
      salesName: newSales || "Unassigned",
      notes: newNotes.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setDeals([deal, ...deals])
    setAddOpen(false)
    setNewName("")
    setNewCompany("")
    setNewValue("")
    setNewSales("")
    setNewStage("estimate")
    setNewNotes("")
  }

  const moveDeal = (dealId: string, direction: 1 | -1) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d
        const idx = STAGES.findIndex((s) => s.id === d.stage)
        const newIdx = Math.max(0, Math.min(STAGES.length - 1, idx + direction))
        const newStage = STAGES[newIdx].id
        return { ...d, stage: newStage }
      })
    )
  }

  // ─── Drag & Drop ──────────────────────────────────────────────────────────

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedId(dealId)
    e.dataTransfer.effectAllowed = "move"
    // Needed for Firefox
    e.dataTransfer.setData("text/plain", dealId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetStage: StageId) => {
    e.preventDefault()
    if (!draggedId) return
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== draggedId) return d
        return { ...d, stage: targetStage }
      })
    )
    setDraggedId(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  // ─── Derived ──────────────────────────────────────────────────────────────

  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0)
  const totalDeals = deals.length
  const activeLeads = deals.filter((d) => d.stage === "estimate" || d.stage === "order").length
  const wonDeals = deals.filter((d) => d.stage === "paid" || d.stage === "shipped")
  const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0)

  const stageSummaries = STAGES.map((s) => ({
    ...s,
    deals: deals.filter((d) => d.stage === s.id),
    total: deals.filter((d) => d.stage === s.id).reduce((sum, d) => sum + d.value, 0),
  }))

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Sales Pipeline</h1>
          <p className="text-xs text-muted-foreground">
            Kelola prospek penjualan dari estimasi hingga pengiriman
          </p>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="size-3.5 mr-1" />
          Add Lead
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Target className="size-4 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Pipeline Value</p>
                <p className="text-sm font-semibold">{formatCompactIDR(totalPipeline)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <TrendingUp className="size-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Active Leads</p>
                <p className="text-sm font-semibold">{activeLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle2 className="size-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Total Deals</p>
                <p className="text-sm font-semibold">{totalDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                <DollarSign className="size-4 text-cyan-600" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Revenue</p>
                <p className="text-sm font-semibold">{formatCompactIDR(wonValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto">
        {stageSummaries.map((stage) => {
          const Icon = stage.icon
          return (
            <div key={stage.id} className="min-w-[200px]">
              {/* Column Header */}
              <div
                className={`rounded-t-lg border-t-4 ${stage.color} bg-card border-x border-t-0 p-2.5`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-xs font-medium truncate">{stage.label}</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] ml-1.5 shrink-0">
                    {stage.deals.length}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {formatCompactIDR(stage.total)}
                </p>
              </div>

              {/* Column Body */}
              <div
                className="border-x border-b rounded-b-lg bg-muted/20 p-1.5 space-y-1.5 min-h-[160px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {stage.deals.length === 0 && (
                  <p className="text-[10px] text-muted-foreground text-center py-6">No deals</p>
                )}
                {stage.deals.map((deal) => (
                  <Card
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    onDragEnd={handleDragEnd}
                    className={`cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow ${
                      draggedId === deal.id ? "opacity-50" : ""
                    }`}
                  >
                    <CardContent className="p-2 space-y-1">
                      <div className="flex items-start gap-1">
                        <GripVertical className="size-3 text-muted-foreground mt-0.5 shrink-0 opacity-40" />
                        <div className="min-w-0 flex-1 cursor-pointer" onClick={() => router.push(`/sales/pipeline/${deal.id}`)}>
                          <p className="text-xs font-medium truncate">{deal.customer}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{deal.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pl-4">
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                          {formatCompactIDR(deal.value)}
                        </span>
                        <span className="text-[9px] text-muted-foreground truncate ml-1">
                          {deal.salesName}
                        </span>
                      </div>
                      {/* Move buttons */}
                      <div className="flex items-center gap-1 pl-4 pt-0.5">
                        {STAGES.findIndex((s) => s.id === deal.stage) > 0 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); moveDeal(deal.id, -1) }}
                            className="text-[9px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 cursor-pointer"
                          >
                            <ArrowLeft className="size-2.5" />
                            prev
                          </button>
                        )}
                        {STAGES.findIndex((s) => s.id === deal.stage) < STAGES.length - 1 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); moveDeal(deal.id, 1) }}
                            className="text-[9px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 cursor-pointer ml-auto"
                          >
                            next
                            <ArrowRight className="size-2.5" />
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add New Lead Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>Masukkan data prospek penjualan baru.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <Label className="text-xs">Customer Name *</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nama customer"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Company</Label>
              <Input
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="Nama perusahaan"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Deal Value (Rp) *</Label>
              <Input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="25000000"
                className="h-8 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Sales Person</Label>
                <Select value={newSales} onValueChange={(v) => setNewSales(v ?? "")}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Pilih sales" />
                  </SelectTrigger>
                  <SelectContent>
                    {SALES_PEOPLE.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Stage</Label>
                <Select value={newStage} onValueChange={(v) => v && setNewStage(v as StageId)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Notes</Label>
              <Textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Catatan tentang lead ini"
                className="text-sm min-h-[60px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAddDeal} disabled={!newName.trim() || !newValue.trim()}>Add Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
