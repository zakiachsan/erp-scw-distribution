"use client"

import { useState } from "react"
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
  GripVertical,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowLeft,
  ArrowRight,
  FileText,
  ShoppingCart,
  Truck,
  CheckCircle2,
  XCircle,
  UserCheck,
  Phone,
  MessageSquare,
} from "lucide-react"

type StageId = "estimate" | "order" | "invoice" | "paid" | "shipped"

interface PipelineDeal {
  id: string
  customer: string
  company: string
  value: number
  stage: StageId
  salesName: string
  createdAt: string
  probability: number
}

const STAGES: { id: StageId; label: string; icon: typeof FileText; color: string }[] = [
  { id: "estimate", label: "Estimate", icon: FileText, color: "border-t-blue-500" },
  { id: "order", label: "Sales Order", icon: ShoppingCart, color: "border-t-indigo-500" },
  { id: "invoice", label: "Invoice", icon: FileText, color: "border-t-violet-500" },
  { id: "paid", label: "Paid", icon: CheckCircle2, color: "border-t-emerald-500" },
  { id: "shipped", label: "Shipped", icon: Truck, color: "border-t-cyan-500" },
]

const PIPELINE_DEALS: PipelineDeal[] = [
  { id: "PL-001", customer: "Budi Santoso", company: "PT Autogloss Indonesia", value: 25000000, stage: "estimate", salesName: "Ahmad Rizki", createdAt: "2026-06-10", probability: 30 },
  { id: "PL-002", customer: "Andi Pratama", company: "CV Ceramic Pro JKT", value: 18000000, stage: "estimate", salesName: "Siti Nurhaliza", createdAt: "2026-06-09", probability: 45 },
  { id: "PL-003", customer: "Rina Wijaya", company: "UD Shinemax", value: 32000000, stage: "order", salesName: "Ahmad Rizki", createdAt: "2026-06-08", probability: 60 },
  { id: "PL-004", customer: "Dedi Kurniawan", company: "PT DetailWorks BDG", value: 15000000, stage: "order", salesName: "Bambang", createdAt: "2026-06-07", probability: 70 },
  { id: "PL-005", customer: "Sari Dewi", company: "CV ProShine SBY", value: 8500000, stage: "invoice", salesName: "Siti Nurhaliza", createdAt: "2026-06-06", probability: 85 },
  { id: "PL-006", customer: "Hendra Gunawan", company: "AutoCare Makassar", value: 42000000, stage: "invoice", salesName: "Ahmad Rizki", createdAt: "2026-06-05", probability: 90 },
  { id: "PL-007", customer: "Maya Putri", company: "GlossUp Bali", value: 12500000, stage: "paid", salesName: "Bambang", createdAt: "2026-06-03", probability: 100 },
  { id: "PL-008", customer: "Rizky Firmansyah", company: "DetailPro Semarang", value: 28000000, stage: "paid", salesName: "Siti Nurhaliza", createdAt: "2026-06-01", probability: 100 },
  { id: "PL-009", customer: "Ani Sulastri", company: "CarCare Medan", value: 9500000, stage: "shipped", salesName: "Ahmad Rizki", createdAt: "2026-05-28", probability: 100 },
  { id: "PL-010", customer: "Fajar Hidayat", company: "PT AutoPrima Surabaya", value: 55000000, stage: "shipped", salesName: "Bambang", createdAt: "2026-05-25", probability: 100 },
]

const salesPeople = ["Ahmad Rizki", "Siti Nurhaliza", "Bambang"]

function formatIDR(n: number) {
  return `Rp ${(n / 1000).toFixed(0)}rb`
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<PipelineDeal[]>(PIPELINE_DEALS)
  const [addOpen, setAddOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [newValue, setNewValue] = useState("")
  const [newSales, setNewSales] = useState("")
  const [newStage, setNewStage] = useState<StageId>("estimate")
  const [dealDetail, setDealDetail] = useState<PipelineDeal | null>(null)

  const handleAddDeal = () => {
    if (!newName.trim() || !newValue.trim()) return
    const deal: PipelineDeal = {
      id: `PL-${String(deals.length + 1).padStart(3, "0")}`,
      customer: newName.trim(),
      company: newCompany.trim() || "-",
      value: Number(newValue),
      stage: newStage,
      salesName: newSales || "Unassigned",
      createdAt: new Date().toISOString().slice(0, 10),
      probability: newStage === "estimate" ? 20 : newStage === "order" ? 50 : newStage === "invoice" ? 80 : 100,
    }
    setDeals([deal, ...deals])
    setAddOpen(false)
    setNewName("")
    setNewCompany("")
    setNewValue("")
    setNewSales("")
    setNewStage("estimate")
  }

  const moveDeal = (dealId: string, direction: 1 | -1) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d
        const idx = STAGES.findIndex((s) => s.id === d.stage)
        const newIdx = Math.max(0, Math.min(STAGES.length - 1, idx + direction))
        const newStage = STAGES[newIdx].id
        return {
          ...d,
          stage: newStage,
          probability: newStage === "paid" || newStage === "shipped" ? 100 : newStage === "invoice" ? 80 : newStage === "order" ? 50 : 20,
        }
      })
    )
  }

  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0)
  const totalDeals = deals.length
  const wonDeals = deals.filter((d) => d.stage === "paid" || d.stage === "shipped")
  const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0)

  const stageSummaries = STAGES.map((s) => ({
    ...s,
    deals: deals.filter((d) => d.stage === s.id),
    total: deals.filter((d) => d.stage === s.id).reduce((sum, d) => sum + d.value, 0),
  }))

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Kelola prospek penjualan dari estimasi hingga pengiriman
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Deal
          </Button>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
              <DialogDescription>Masukkan data prospek penjualan baru.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <Label>Customer Name *</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nama customer" />
              </div>
              <div className="space-y-1">
                <Label>Company</Label>
                <Input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} placeholder="Nama perusahaan" />
              </div>
              <div className="space-y-1">
                <Label>Deal Value (Rp) *</Label>
                <Input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="25000000" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Sales Person</Label>
                  <Select value={newSales} onValueChange={(v) => setNewSales(v)}>
                    <SelectTrigger><SelectValue placeholder="Pilih sales" /></SelectTrigger>
                    <SelectContent>
                      {salesPeople.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Stage</Label>
                  <Select value={newStage} onValueChange={(v) => setNewStage(v as StageId)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STAGES.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDeal} disabled={!newName.trim() || !newValue.trim()}>Add Deal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold">{formatIDR(totalPipeline)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deals</p>
                <p className="text-2xl font-bold">{totalDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Won</p>
                <p className="text-2xl font-bold">{wonDeals.length} deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100">
                <DollarSign className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">{formatIDR(wonValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
        {stageSummaries.map((stage) => {
          const Icon = stage.icon
          return (
            <div key={stage.id} className="min-w-[220px]">
              <div className={`rounded-t-lg border-t-4 ${stage.color} bg-card p-3 border-x border-t-0`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">{stage.label}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{stage.deals.length}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{formatIDR(stage.total)}</p>
              </div>
              <div className="border-x border-b rounded-b-lg bg-muted/20 p-2 space-y-2 min-h-[200px]">
                {stage.deals.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">No deals</p>
                )}
                {stage.deals.map((deal) => {
                  const stageIdx = STAGES.findIndex((s) => s.id === deal.stage)
                  return (
                    <Card
                      key={deal.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setDealDetail(deal)}
                    >
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{deal.customer}</p>
                            <p className="text-xs text-muted-foreground truncate">{deal.company}</p>
                          </div>
                          <Badge variant="outline" className="text-xs ml-2 shrink-0">
                            {deal.probability}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-indigo-600">{formatIDR(deal.value)}</span>
                          <span className="text-[10px] text-muted-foreground">{deal.salesName}</span>
                        </div>
                        <div className="flex gap-1 pt-1 border-t">
                          {stageIdx > 0 && (
                            <button
                              className="flex-1 text-[10px] text-muted-foreground hover:text-foreground flex items-center justify-center gap-0.5 py-0.5 rounded hover:bg-muted"
                              onClick={(e) => { e.stopPropagation(); moveDeal(deal.id, -1) }}
                            >
                              <ArrowLeft className="h-3 w-3" /> Prev
                            </button>
                          )}
                          {stageIdx < STAGES.length - 1 && (
                            <button
                              className="flex-1 text-[10px] text-muted-foreground hover:text-foreground flex items-center justify-center gap-0.5 py-0.5 rounded hover:bg-muted"
                              onClick={(e) => { e.stopPropagation(); moveDeal(deal.id, 1) }}
                            >
                              Next <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Deal Detail Dialog */}
      <Dialog open={!!dealDetail} onOpenChange={(o) => !o && setDealDetail(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dealDetail?.customer}</DialogTitle>
            <DialogDescription>{dealDetail?.company}</DialogDescription>
          </DialogHeader>
          {dealDetail && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deal ID</span>
                <span className="font-mono text-xs">{dealDetail.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Value</span>
                <span className="font-bold">Rp {dealDetail.value.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stage</span>
                <Badge variant="outline">{STAGES.find((s) => s.id === dealDetail.stage)?.label}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sales</span>
                <span>{dealDetail.salesName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Probability</span>
                <span className="font-medium">{dealDetail.probability}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span>{dealDetail.createdAt}</span>
              </div>
              <hr />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Actions</span>
                <div className="flex gap-2">
                  {STAGES.findIndex((s) => s.id === dealDetail.stage) > 0 && (
                    <Button size="sm" variant="outline" onClick={() => { moveDeal(dealDetail.id, -1); setDealDetail(null) }}>
                      <ArrowLeft className="h-4 w-4 mr-1" /> Prev
                    </Button>
                  )}
                  {STAGES.findIndex((s) => s.id === dealDetail.stage) < STAGES.length - 1 && (
                    <Button size="sm" onClick={() => { moveDeal(dealDetail.id, 1); setDealDetail(null) }}>
                      Next <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
