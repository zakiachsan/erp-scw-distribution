"use client"

import React, { useState, useMemo } from "react"
import {
  Send,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Package,
  Store,
  BookOpen,
  Users,
  Trash2,
  Eye,
  Megaphone,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

type ModuleTarget = "all" | "sales" | "operasional" | "accounting" | "ecommerce"
type Priority = "info" | "warning" | "success"

interface NotifItem {
  id: string
  title: string
  message: string
  priority: Priority
  targets: ModuleTarget[]
  sentAt: string
  sentBy: string
}

const moduleConfig: Record<ModuleTarget, { label: string; icon: React.ElementType; color: string }> = {
  all: { label: "Semua Modul", icon: Users, color: "bg-slate-100 text-slate-700" },
  sales: { label: "Sales & CRM", icon: Megaphone, color: "bg-blue-100 text-blue-700" },
  operasional: { label: "Operasional", icon: Package, color: "bg-emerald-100 text-emerald-700" },
  accounting: { label: "Accounting", icon: BookOpen, color: "bg-violet-100 text-violet-700" },
  ecommerce: { label: "WebCommerce", icon: Store, color: "bg-orange-100 text-orange-700" },
}

const priorityConfig: Record<Priority, { icon: React.ElementType; badge: string; label: string }> = {
  info: { icon: Info, badge: "bg-blue-50 text-blue-700", label: "Info" },
  warning: { icon: AlertTriangle, badge: "bg-amber-50 text-amber-700", label: "Warning" },
  success: { icon: CheckCircle2, badge: "bg-green-50 text-green-700", label: "Success" },
}

const initialNotifications: NotifItem[] = [
  { id: "1", title: "Jadwal Libur Nasional", message: "Toko tutup tanggal 25 Desember. Order yang masuk diproses 26 Desember.", priority: "info", targets: ["all"], sentAt: "2026-06-17 09:00", sentBy: "Admin" },
  { id: "2", title: "Stok Menipis: Nano Ceramic Coating", message: "Stok saat ini 5 unit, minimum 20 unit. Segera restock.", priority: "warning", targets: ["operasional"], sentAt: "2026-06-17 08:30", sentBy: "System" },
  { id: "3", title: "Target Sales Tercapai 105%", message: "Bonus akan diproses minggu depan. Terima kasih atas kerja kerasnya!", priority: "success", targets: ["sales"], sentAt: "2026-06-16 16:00", sentBy: "Rina Wijaya" },
  { id: "4", title: "Update Kurs USD", message: "Kurs USD terbaru: Rp 16,200. Mohon update harga purchasing.", priority: "warning", targets: ["operasional", "accounting"], sentAt: "2026-06-16 10:00", sentBy: "Admin" },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotifItem[]>(initialNotifications)
  const [showCompose, setShowCompose] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<NotifItem | null>(null)

  // Filter
  const [search, setSearch] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  // Form
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState<Priority>("info")
  const [targets, setTargets] = useState<ModuleTarget[]>([])

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase())
      const matchPriority = filterPriority === "all" || n.priority === filterPriority
      return matchSearch && matchPriority
    })
  }, [notifications, search, filterPriority])

  const toggleTarget = (mod: ModuleTarget) => {
    if (mod === "all") {
      setTargets((prev) => (prev.includes("all") ? [] : ["all"]))
      return
    }
    setTargets((prev) => {
      const withoutAll = prev.filter((t) => t !== "all")
      if (withoutAll.includes(mod)) return withoutAll.filter((t) => t !== mod)
      const next = [...withoutAll, mod]
      return next.length === 4 ? ["all"] : next
    })
  }

  const resetForm = () => {
    setTitle("")
    setMessage("")
    setPriority("info")
    setTargets([])
  }

  const handleSend = () => {
    const newNotif: NotifItem = {
      id: Date.now().toString(),
      title,
      message,
      priority,
      targets,
      sentAt: new Date().toLocaleString("id-ID", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(",", ""),
      sentBy: "Admin",
    }
    setNotifications((prev) => [newNotif, ...prev])
    resetForm()
    setShowCompose(false)
    setShowConfirmDialog(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !message.trim() || targets.length === 0) return
    setShowConfirmDialog(true)
  }

  const targetLabel = (t: ModuleTarget[]) =>
    t.includes("all") ? "Semua Modul" : t.map((x) => moduleConfig[x].label).join(", ")

  const canSend = title.trim() && message.trim() && targets.length > 0

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
        <p className="text-xs text-gray-500">Kelola dan kirim notifikasi ke user berdasarkan modul</p>
      </div>

      {/* Compose Form */}
      {showCompose && (
        <Card className="border-indigo-200 bg-indigo-50/30">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="n-title" className="text-xs">Judul</Label>
                <Input id="n-title" placeholder="Judul notifikasi..." value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 text-sm" required />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Kirim Ke Modul</Label>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(moduleConfig) as ModuleTarget[]).map((mod) => {
                    const cfg = moduleConfig[mod]
                    const Icon = cfg.icon
                    const isChecked = targets.includes(mod)
                    return (
                      <button key={mod} type="button" onClick={() => toggleTarget(mod)} className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${isChecked ? "border-indigo-300 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"}`}>
                        <Checkbox checked={isChecked} onCheckedChange={() => toggleTarget(mod)} className="pointer-events-none h-3 w-3" />
                        <Icon className="h-3 w-3" />
                        {cfg.label}
                      </button>
                    )
                  })}
                </div>
                {targets.length === 0 && <p className="text-[11px] text-red-500">Pilih minimal satu modul</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Prioritas</Label>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(priorityConfig) as Priority[]).map((p) => {
                    const cfg = priorityConfig[p]
                    const Icon = cfg.icon
                    return (
                      <button key={p} type="button" onClick={() => setPriority(p)} className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${priority === p ? `${cfg.badge} border-current ring-1 ring-current/20` : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"}`}>
                        <Icon className="h-3 w-3" />
                        {cfg.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="n-msg" className="text-xs">Pesan</Label>
                <Textarea id="n-msg" placeholder="Tulis pesan notifikasi..." rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="text-sm" required />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => { resetForm(); setShowCompose(false) }}>Batal</Button>
                <Button type="submit" size="sm" disabled={!canSend}><Send className="h-3.5 w-3.5 mr-1" />Kirim</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari notifikasi..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 pl-8 text-sm" />
        </div>
        <div className="flex items-center gap-1.5">
          {(Object.keys(priorityConfig) as Priority[]).map((p) => {
            const cfg = priorityConfig[p]
            const Icon = cfg.icon
            const active = filterPriority === p
            return (
              <button key={p} onClick={() => setFilterPriority(active ? "all" : p)} className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-all ${active ? `${cfg.badge} border-current` : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                <Icon className="h-3 w-3" />
                {cfg.label}
              </button>
            )
          })}
          {filterPriority !== "all" && (
            <button onClick={() => setFilterPriority("all")} className="flex items-center gap-0.5 rounded-md px-1.5 py-1 text-xs text-gray-400 hover:text-gray-600">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="ml-auto">
          <Button size="sm" onClick={() => setShowCompose(!showCompose)}>
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Kirim Notifikasi
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-3 py-2">Judul</th>
              <th className="px-3 py-2">Pesan</th>
              <th className="px-3 py-2 w-20">Prioritas</th>
              <th className="px-3 py-2">Target Modul</th>
              <th className="px-3 py-2 w-24">Oleh</th>
              <th className="px-3 py-2 w-32">Waktu</th>
              <th className="px-3 py-2 w-16 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-10 text-center text-xs text-muted-foreground">
                  Tidak ada notifikasi ditemukan
                </td>
              </tr>
            ) : (
              filtered.map((n) => {
                const pCfg = priorityConfig[n.priority]
                const PIcon = pCfg.icon
                return (
                  <tr key={n.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-3 py-2">
                      <span className="font-medium text-xs text-slate-900">{n.title}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs text-muted-foreground line-clamp-1">{n.message}</span>
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${pCfg.badge}`}>
                        <PIcon className="h-2.5 w-2.5 mr-0.5 inline" />
                        {pCfg.label}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-0.5">
                        {n.targets.map((t) => {
                          const mCfg = moduleConfig[t]
                          const MIcon = mCfg.icon
                          return (
                            <span key={t} className={`inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-medium ${mCfg.color}`}>
                              <MIcon className="h-2.5 w-2.5" />
                              {mCfg.label}
                            </span>
                          )
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{n.sentBy}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">{n.sentAt}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <button onClick={() => { setSelectedDetail(n); setShowDetailDialog(true) }} className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-muted hover:text-slate-600 transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setNotifications((prev) => prev.filter((x) => x.id !== n.id))} className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kirim Notifikasi?</DialogTitle>
            <DialogDescription>Notifikasi akan dikirim ke user pada modul yang dipilih.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 rounded-lg border bg-slate-50 p-3 text-sm">
            <div><span className="text-xs text-muted-foreground">Judul</span><p className="font-medium">{title}</p></div>
            <div><span className="text-xs text-muted-foreground">Pesan</span><p>{message}</p></div>
            <div className="flex items-center gap-3">
              <div><span className="text-xs text-muted-foreground">Prioritas</span><Badge variant="outline" className={`ml-1 text-[10px] ${priorityConfig[priority]?.badge}`}>{priorityConfig[priority]?.label}</Badge></div>
              <div><span className="text-xs text-muted-foreground">Target</span><span className="ml-1 text-xs font-medium">{targetLabel(targets)}</span></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowConfirmDialog(false)}>Batal</Button>
            <Button size="sm" onClick={handleSend}><Send className="h-3.5 w-3.5 mr-1" />Kirim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{selectedDetail?.title}</DialogTitle></DialogHeader>
          {selectedDetail && (
            <div className="space-y-3">
              <Badge variant="outline" className={`${priorityConfig[selectedDetail.priority]?.badge}`}>{priorityConfig[selectedDetail.priority]?.label}</Badge>
              <div className="rounded-lg border bg-slate-50 p-3"><p className="text-sm leading-relaxed">{selectedDetail.message}</p></div>
              <div className="flex flex-wrap gap-1">
                {selectedDetail.targets.map((t) => {
                  const mCfg = moduleConfig[t]
                  const MIcon = mCfg.icon
                  return <span key={t} className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium ${mCfg.color}`}><MIcon className="h-2.5 w-2.5" /> {mCfg.label}</span>
                })}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>{selectedDetail.sentAt}</span>
                <span>oleh {selectedDetail.sentBy}</span>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="outline" size="sm" onClick={() => setShowDetailDialog(false)}>Tutup</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
