"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Users,
  CreditCard,
  TrendingUp,
  ArrowUpDown,
  X,
} from "lucide-react"
import { customers, type Customer } from "@/lib/sales-data"

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

const tierConfig = {
  Bronze: { label: "Bronze", className: "bg-orange-100 text-orange-800" },
  Silver: { label: "Silver", className: "bg-gray-100 text-gray-800" },
  Gold: { label: "Gold", className: "bg-yellow-100 text-yellow-800" },
  Platinum: { label: "Platinum", className: "bg-indigo-100 text-indigo-800" },
}

type SortKey = "name" | "totalPurchase" | "lastPurchase"

export default function CustomerListPage() {
  const [search, setSearch] = useState("")
  const [tierFilter, setTierFilter] = useState("All")
  const [mostBuyOnly, setMostBuyOnly] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>("totalPurchase")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [addOpen, setAddOpen] = useState(false)
  const [custName, setCustName] = useState("")
  const [custCompany, setCustCompany] = useState("")
  const [customerList, setCustomerList] = useState(customers)

  const addCustomer = () => {
    if (!custName.trim()) return
    const newCust: Customer = {
      id: `C${String(customerList.length + 1).padStart(3, "0")}`,
      name: custName,
      company: custCompany || "Unknown",
      creditLimit: 0,
      remainingCredit: 0,
      lastPurchase: new Date().toISOString().split("T")[0],
      tier: "Bronze",
      totalPurchase: 0,
      totalOrders: 0,
      avgOrderValue: 0,
    }
    setCustomerList([...customerList, newCust])
    setCustName("")
    setCustCompany("")
    setAddOpen(false)
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const filtered = useMemo(() => {
    let result = customerList.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
      const matchTier = tierFilter === "All" || c.tier === tierFilter
      const matchMostBuy = !mostBuyOnly || c.totalOrders >= 10
      return matchSearch && matchTier && matchMostBuy
    })
    result.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })
    return result
  }, [search, tierFilter, mostBuyOnly, sortKey, sortDir, customerList])

  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = { All: customerList.length }
    for (const c of customerList) {
      counts[c.tier] = (counts[c.tier] || 0) + 1
    }
    return counts
  }, [customerList])

  const totalPurchaseAll = customerList.reduce((s, c) => s + c.totalPurchase, 0)

  const SortIcon = ({ col }: { col: SortKey }) => (
    <ArrowUpDown className={`h-3 w-3 inline ml-1 ${sortKey === col ? "text-indigo-600" : "text-muted-foreground"}`} />
  )

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Customers</h1>
          <p className="text-xs text-gray-500">Kelola data customer dan total pembelian</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button size="sm" />}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Tambah Customer
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Customer Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <Label className="text-xs">Nama Customer</Label>
                <Input placeholder="Nama customer" value={custName} onChange={(e) => setCustName(e.target.value)} className="h-8 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Perusahaan</Label>
                <Input placeholder="Nama perusahaan" value={custCompany} onChange={(e) => setCustCompany(e.target.value)} className="h-8 text-sm" />
              </div>
              <Button onClick={addCustomer} className="w-full" size="sm" disabled={!custName.trim()}>Tambah</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 grid-cols-2">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                <Users className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Total Customer</p>
                <p className="text-lg font-bold">{customerList.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Total Pembelian</p>
                <p className="text-lg font-bold">{formatIDR(totalPurchaseAll)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {/* Filter bar */}
          <div className="flex items-center gap-3 border-b px-4 py-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari nama / perusahaan..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
            </div>
            <div className="flex items-center gap-1.5">
              {(["All", "Platinum", "Gold", "Silver", "Bronze"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    tierFilter === t
                      ? t === "All" ? "border-indigo-300 bg-indigo-50 text-indigo-700" : tierConfig[t]?.className + " border-current"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {t === "All" ? "Semua Tier" : t} ({tierCounts[t] || 0})
                </button>
              ))}
              {tierFilter !== "All" && (
                <button onClick={() => setTierFilter("All")} className="rounded-md px-1 text-gray-400 hover:text-gray-600">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setMostBuyOnly(!mostBuyOnly)}
                className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all ${
                  mostBuyOnly
                    ? "border-amber-300 bg-amber-50 text-amber-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Checkbox checked={mostBuyOnly} onCheckedChange={() => setMostBuyOnly(!mostBuyOnly)} className="pointer-events-none h-3 w-3" />
                Most-Buy (≥10 orders)
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-3 py-2 w-16">ID</th>
                <th className="px-3 py-2 cursor-pointer select-none" onClick={() => toggleSort("name")}>
                  Nama <SortIcon col="name" />
                </th>
                <th className="px-3 py-2 w-48">Perusahaan</th>
                <th className="px-3 py-2 whitespace-nowrap cursor-pointer select-none text-center" onClick={() => toggleSort("totalPurchase")}>
                  Total Pembelian <SortIcon col="totalPurchase" />
                </th>
                <th className="px-3 py-2 whitespace-nowrap cursor-pointer select-none" onClick={() => toggleSort("lastPurchase")}>
                  Terakhir Beli <SortIcon col="lastPurchase" />
                </th>
                <th className="px-3 py-2">Tier</th>

              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-xs text-muted-foreground">
                    Tidak ada customer ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => window.location.href = `/sales/customers/${c.id}`}>
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{c.id}</td>
                    <td className="px-3 py-2">
                      <span className="text-xs font-medium text-slate-900">{c.name}</span>
                    </td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{c.company}</td>
                    <td className="px-3 py-2 text-xs text-center font-medium whitespace-nowrap">{formatIDR(c.totalPurchase)}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{c.lastPurchase}</td>
                    <td className="px-3 py-2">
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${tierConfig[c.tier].className}`}>
                        {c.tier}
                      </Badge>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
