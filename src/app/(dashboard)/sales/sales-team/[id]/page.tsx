"use client"

import { useState } from "react"
import { use } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  User,
  DollarSign,
  TrendingUp,
  Edit,
  Check,
  X,
  Target,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

interface SalesTeamMember {
  id: string
  name: string
  email: string
  phone: string
  zone: string
  rate: number
  status: "Active" | "Inactive"
  totalSales: number
  totalCommission: number
  dealsCount: number
}

const members: Record<string, SalesTeamMember> = {
  SP01: { id: "SP01", name: "Rahman Hakim", email: "rahman@scw.co.id", phone: "0811-1111", zone: "Jakarta & Tangerang", rate: 5, status: "Active", totalSales: 85000000, totalCommission: 4250000, dealsCount: 8 },
  SP02: { id: "SP02", name: "Dewi Lestari", email: "dewi@scw.co.id", phone: "0811-2222", zone: "Bandung & Cimahi", rate: 5, status: "Active", totalSales: 62000000, totalCommission: 3100000, dealsCount: 6 },
  SP03: { id: "SP03", name: "Fajar Nugroho", email: "fajar@scw.co.id", phone: "0811-3333", zone: "Surabaya & Sidoarjo", rate: 6, status: "Active", totalSales: 45000000, totalCommission: 2700000, dealsCount: 5 },
  SP04: { id: "SP04", name: "Siti Rahma", email: "siti@scw.co.id", phone: "0811-4444", zone: "Makassar & Gowa", rate: 6, status: "Active", totalSales: 38000000, totalCommission: 2280000, dealsCount: 4 },
  SP05: { id: "SP05", name: "Andi Prasetyo", email: "andi@scw.co.id", phone: "0811-5555", zone: "Semarang & Solo", rate: 5, status: "Inactive", totalSales: 29000000, totalCommission: 1450000, dealsCount: 3 },
}

const dealsData: Record<string, { id: string; customer: string; value: number; stage: string }[]> = {
  SP01: [
    { id: "PL-001", customer: "PT Autogloss Indonesia", value: 25000000, stage: "Estimate" },
    { id: "PL-003", customer: "UD Shinemax", value: 32000000, stage: "Sales Order" },
    { id: "PL-006", customer: "AutoCare Makassar", value: 42000000, stage: "Invoice" },
  ],
  SP02: [
    { id: "PL-002", customer: "CV Ceramic Pro JKT", value: 18000000, stage: "Estimate" },
    { id: "PL-005", customer: "CV ProShine SBY", value: 8500000, stage: "Invoice" },
  ],
  SP03: [{ id: "PL-007", customer: "GlossUp Bali", value: 12500000, stage: "Paid" }],
  SP04: [{ id: "PL-004", customer: "PT DetailWorks BDG", value: 15000000, stage: "Sales Order" }],
  SP05: [],
}

const commissionHistory: Record<string, { period: string; amount: number; paid: boolean }[]> = {
  SP01: [{ period: "Juni 2026", amount: 1250000, paid: true }, { period: "Mei 2026", amount: 980000, paid: true }, { period: "April 2026", amount: 1500000, paid: false }],
  SP02: [{ period: "Juni 2026", amount: 850000, paid: true }, { period: "Mei 2026", amount: 720000, paid: true }],
  SP03: [{ period: "Juni 2026", amount: 650000, paid: true }, { period: "Mei 2026", amount: 500000, paid: false }],
  SP04: [{ period: "Juni 2026", amount: 450000, paid: true }],
  SP05: [],
}

export default function SalesTeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [member, setMember] = useState<SalesTeamMember | null>(members[id] ?? null)
  const [editRate, setEditRate] = useState<number | null>(null)

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <p className="text-sm text-muted-foreground">Sales tidak ditemukan</p>
        <Link href="/sales/sales-team">
          <Button variant="outline" size="sm"><ArrowLeft className="h-3.5 w-3.5 mr-1" />Kembali</Button>
        </Link>
      </div>
    )
  }

  const deals = dealsData[id] || []
  const history = commissionHistory[id] || []

  const handleSaveRate = () => {
    if (editRate !== null) {
      setMember({ ...member, rate: editRate })
      setEditRate(null)
    }
  }

  return (
    <div className="space-y-4 p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/sales/sales-team">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
            {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{member.name}</h1>
            <p className="text-xs text-muted-foreground">{member.id} · {member.zone}</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3">
            <p className="text-[11px] text-muted-foreground">Total Sales</p>
            <p className="text-lg font-bold">{formatIDR(member.totalSales)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-[11px] text-muted-foreground">Komisi</p>
            <p className="text-lg font-bold text-emerald-600">{formatIDR(member.totalCommission)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-[11px] text-muted-foreground">Deals</p>
            <p className="text-lg font-bold">{member.dealsCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Info + Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-500" />
            Informasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{member.zone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm pt-1.5 border-t">
            <DollarSign className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-muted-foreground">Rate Komisi</span>
            {editRate !== null ? (
              <div className="flex items-center gap-1 ml-auto">
                <Input type="number" value={editRate} onChange={(e) => setEditRate(parseInt(e.target.value) || 0)} className="h-7 w-20 text-xs" min={0} max={100} />
                <button onClick={handleSaveRate} className="p-0.5 text-emerald-600 hover:bg-emerald-50 rounded cursor-pointer"><Check className="h-3.5 w-3.5" /></button>
                <button onClick={() => setEditRate(null)} className="p-0.5 text-muted-foreground hover:bg-muted rounded cursor-pointer"><X className="h-3.5 w-3.5" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-1 ml-auto">
                <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-700">{member.rate}%</Badge>
                <button onClick={() => setEditRate(member.rate)} className="p-0.5 text-muted-foreground hover:text-indigo-600 cursor-pointer"><Edit className="h-3 w-3" /></button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Deals */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-500" />
            Projek ({deals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {deals.length === 0 ? (
            <p className="text-sm text-muted-foreground py-3 text-center">Belum ada projek</p>
          ) : (
            <div className="space-y-1.5">
              {deals.map((d) => (
                <Link key={d.id} href={`/sales/pipeline/${d.id}`} className="flex items-center justify-between rounded-md bg-slate-50 p-2.5 hover:bg-indigo-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{d.customer}</p>
                    <p className="text-xs text-muted-foreground">{d.id} · {d.stage}</p>
                  </div>
                  <span className="text-sm font-medium">{formatIDR(d.value)}</span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Commission History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            Riwayat Komisi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground py-3 text-center">Belum ada riwayat</p>
          ) : (
            <div className="space-y-1.5">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between rounded-md bg-slate-50 p-2.5">
                  <span className="text-sm font-medium">{h.period}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formatIDR(h.amount)}</span>
                    <Badge variant="outline" className={`text-[10px] ${h.paid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {h.paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
