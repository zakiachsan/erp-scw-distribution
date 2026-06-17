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
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search, X, DollarSign, User } from "lucide-react"

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

const initialMembers: SalesTeamMember[] = [
  { id: "SP01", name: "Rahman Hakim", email: "rahman@scw.co.id", phone: "0811-1111", zone: "Jakarta & Tangerang", rate: 5, status: "Active", totalSales: 85000000, totalCommission: 4250000, dealsCount: 8 },
  { id: "SP02", name: "Dewi Lestari", email: "dewi@scw.co.id", phone: "0811-2222", zone: "Bandung & Cimahi", rate: 5, status: "Active", totalSales: 62000000, totalCommission: 3100000, dealsCount: 6 },
  { id: "SP03", name: "Fajar Nugroho", email: "fajar@scw.co.id", phone: "0811-3333", zone: "Surabaya & Sidoarjo", rate: 6, status: "Active", totalSales: 45000000, totalCommission: 2700000, dealsCount: 5 },
  { id: "SP04", name: "Siti Rahma", email: "siti@scw.co.id", phone: "0811-4444", zone: "Makassar & Gowa", rate: 6, status: "Active", totalSales: 38000000, totalCommission: 2280000, dealsCount: 4 },
  { id: "SP05", name: "Andi Prasetyo", email: "andi@scw.co.id", phone: "0811-5555", zone: "Semarang & Solo", rate: 5, status: "Inactive", totalSales: 29000000, totalCommission: 1450000, dealsCount: 3 },
]

export default function SalesTeamPage() {
  const [members, setMembers] = useState(initialMembers)
  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newZone, setNewZone] = useState("")
  const [newRate, setNewRate] = useState("5")
  const router = useRouter()

  const filtered = members.filter((m) =>
    !search ||
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.zone.toLowerCase().includes(search.toLowerCase()) ||
    m.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    if (!newName.trim()) return
    const member: SalesTeamMember = {
      id: `SP${String(members.length + 1).padStart(2, "0")}`,
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      zone: newZone.trim(),
      rate: parseInt(newRate) || 5,
      status: "Active",
      totalSales: 0,
      totalCommission: 0,
      dealsCount: 0,
    }
    setMembers([...members, member])
    setNewName(""); setNewEmail(""); setNewPhone(""); setNewZone(""); setNewRate("5")
    setShowAdd(false)
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Sales Team</h1>
          <p className="text-xs text-gray-500">Kelola tim sales, komisi, dan pantau projek</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Tambah Sales
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl">{members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Komisi</p>
                <p className="text-2xl">{formatIDR(members.reduce((s, m) => s + m.totalCommission, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl">{members.filter((m) => m.status === "Active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {/* Filter */}
          <div className="flex items-center gap-3 border-b px-4 py-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari nama / zona..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Zona</th>
                <th className="px-3 py-2 text-right">Rate</th>
                <th className="px-3 py-2 text-right">Total Sales</th>
                <th className="px-3 py-2 text-right">Komisi</th>
                <th className="px-3 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-sm text-muted-foreground">
                    Tidak ada sales ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => router.push(`/sales/sales-team/${m.id}`)}>
                    <td className="px-3 py-2 text-sm font-medium">{m.name}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{m.zone}</td>
                    <td className="px-3 py-2 text-sm text-right font-medium text-indigo-600">{m.rate}%</td>
                    <td className="px-3 py-2 text-sm text-right">{formatIDR(m.totalSales)}</td>
                    <td className="px-3 py-2 text-sm text-right text-emerald-600">{formatIDR(m.totalCommission)}</td>
                    <td className="px-3 py-2 text-center">
                      <Badge variant="outline" className={`text-[10px] ${m.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                        {m.status}
                      </Badge>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Sales Baru</DialogTitle>
            <DialogDescription>Input data sales baru untuk tim penjualan</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Nama Lengkap</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nama sales" className="h-8 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Email</Label>
                <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="email@scw.co.id" className="h-8 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">No. Telepon</Label>
                <Input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="0811-xxxx" className="h-8 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Zona</Label>
                <Input value={newZone} onChange={(e) => setNewZone(e.target.value)} placeholder="Jakarta & Tangerang" className="h-8 text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Komisi Rate (%)</Label>
              <Input type="number" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="h-8 text-sm w-24" min={0} max={100} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Batal</Button>
            <Button size="sm" onClick={handleAdd} disabled={!newName.trim()}>Tambah</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
