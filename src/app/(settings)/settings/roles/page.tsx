"use client"

import React, { useState } from "react"
import {
  Shield,
  Plus,
  Edit,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

// ── Module & menu definitions (mirrors modules.ts) ──
const moduleDefs = [
  {
    id: "sales",
    name: "Sales & CRM",
    color: "bg-blue-50 text-blue-700",
    menus: ["Dashboard", "Pipeline", "Customers", "Purchase Orders", "Invoices", "Payments", "Commission", "Tiering Discount"],
  },
  {
    id: "operasional",
    name: "Operasional",
    color: "bg-emerald-50 text-emerald-700",
    menus: ["Dashboard", "Purchasing", "Inventory", "Packing", "Shipping"],
  },
  {
    id: "accounting",
    name: "Accounting",
    color: "bg-violet-50 text-violet-700",
    menus: ["Dashboard", "Jurnal", "General Ledger", "Balance Sheet", "P&L Statement", "Bank Reconciliation", "Tax PPh 21/23", "Fixed Asset", "Budget", "KPI"],
  },
  {
    id: "ecommerce",
    name: "WebCommerce",
    color: "bg-orange-50 text-orange-700",
    menus: ["Dashboard", "Products", "Orders", "Customers", "Categories", "Banners", "Coupons", "Reviews"],
  },
]

type Perm = { view: boolean; edit: boolean; delete: boolean }
type MenuPerms = Record<string, Perm>
type RolePermissions = Record<string, { enabled: boolean; menus: MenuPerms }>

// ── Initial roles ──
interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: RolePermissions
}

function allEnabled(modules: typeof moduleDefs): RolePermissions {
  const p: RolePermissions = {}
  for (const m of modules) {
    const menus: MenuPerms = {}
    for (const menu of m.menus) {
      menus[menu] = { view: true, edit: true, delete: true }
    }
    p[m.id] = { enabled: true, menus }
  }
  return p
}

function emptyPerms(): RolePermissions {
  const p: RolePermissions = {}
  for (const m of moduleDefs) {
    const menus: MenuPerms = {}
    for (const menu of m.menus) {
      menus[menu] = { view: false, edit: false, delete: false }
    }
    p[m.id] = { enabled: false, menus }
  }
  return p
}

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full akses ke semua modul dan menu",
    userCount: 2,
    permissions: allEnabled(moduleDefs),
  },
  {
    id: "2",
    name: "Sales Manager",
    description: "Kelola sales, customer, dan invoice",
    userCount: 1,
    permissions: {
      ...emptyPerms(),
      sales: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Pipeline: { view: true, edit: true, delete: false },
          Customers: { view: true, edit: true, delete: false },
          "Purchase Orders": { view: true, edit: true, delete: false },
          Invoices: { view: true, edit: true, delete: false },
          Payments: { view: true, edit: false, delete: false },
          Commission: { view: true, edit: false, delete: false },
          "Tiering Discount": { view: true, edit: true, delete: false },
        },
      },
      operasional: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Purchasing: { view: false, edit: false, delete: false },
          Inventory: { view: true, edit: false, delete: false },
          Packing: { view: false, edit: false, delete: false },
          Shipping: { view: true, edit: true, delete: false },
        },
      },
      ecommerce: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Products: { view: true, edit: true, delete: false },
          Orders: { view: true, edit: true, delete: false },
          Customers: { view: true, edit: false, delete: false },
          Categories: { view: false, edit: false, delete: false },
          Banners: { view: false, edit: false, delete: false },
          Coupons: { view: false, edit: false, delete: false },
          Reviews: { view: false, edit: false, delete: false },
        },
      },
    },
  },
  {
    id: "3",
    name: "Warehouse Staff",
    description: "Kelola inventory, packing, dan stock",
    userCount: 1,
    permissions: {
      ...emptyPerms(),
      operasional: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Purchasing: { view: true, edit: false, delete: false },
          Inventory: { view: true, edit: true, delete: false },
          Packing: { view: true, edit: true, delete: false },
          Shipping: { view: true, edit: true, delete: false },
        },
      },
    },
  },
  {
    id: "4",
    name: "Finance",
    description: "Kelola accounting, invoice, dan laporan keuangan",
    userCount: 1,
    permissions: {
      ...emptyPerms(),
      operasional: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Purchasing: { view: true, edit: true, delete: false },
          Inventory: { view: true, edit: false, delete: false },
          Packing: { view: false, edit: false, delete: false },
          Shipping: { view: false, edit: false, delete: false },
        },
      },
      accounting: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Jurnal: { view: true, edit: true, delete: false },
          "General Ledger": { view: true, edit: true, delete: false },
          "Balance Sheet": { view: true, edit: false, delete: false },
          "P&L Statement": { view: true, edit: false, delete: false },
          "Bank Reconciliation": { view: true, edit: true, delete: false },
          "Tax PPh 21/23": { view: true, edit: true, delete: false },
          "Fixed Asset": { view: true, edit: true, delete: false },
          Budget: { view: true, edit: false, delete: false },
          KPI: { view: true, edit: false, delete: false },
        },
      },
    },
  },
  {
    id: "5",
    name: "Purchasing",
    description: "Kelola purchase order dan supplier",
    userCount: 1,
    permissions: {
      ...emptyPerms(),
      operasional: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Purchasing: { view: true, edit: true, delete: false },
          Inventory: { view: true, edit: true, delete: false },
          Packing: { view: false, edit: false, delete: false },
          Shipping: { view: false, edit: false, delete: false },
        },
      },
    },
  },
  {
    id: "6",
    name: "Customer Service",
    description: "Handle customer inquiries dan order support",
    userCount: 1,
    permissions: {
      ...emptyPerms(),
      sales: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Pipeline: { view: false, edit: false, delete: false },
          Customers: { view: true, edit: true, delete: false },
          "Purchase Orders": { view: true, edit: true, delete: false },
          Invoices: { view: true, edit: false, delete: false },
          Payments: { view: false, edit: false, delete: false },
          Commission: { view: false, edit: false, delete: false },
          "Tiering Discount": { view: false, edit: false, delete: false },
        },
      },
      operasional: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Purchasing: { view: false, edit: false, delete: false },
          Inventory: { view: true, edit: false, delete: false },
          Packing: { view: false, edit: false, delete: false },
          Shipping: { view: true, edit: false, delete: false },
        },
      },
      ecommerce: {
        enabled: true,
        menus: {
          Dashboard: { view: true, edit: false, delete: false },
          Products: { view: true, edit: false, delete: false },
          Orders: { view: true, edit: true, delete: false },
          Customers: { view: true, edit: false, delete: false },
          Categories: { view: false, edit: false, delete: false },
          Banners: { view: false, edit: false, delete: false },
          Coupons: { view: false, edit: false, delete: false },
          Reviews: { view: false, edit: false, delete: false },
        },
      },
    },
  },
]

// ── Helpers ──
function countMenusPerms(p: RolePermissions) {
  let count = 0
  for (const m of Object.values(p)) {
    if (m.enabled) {
      for (const menu of Object.values(m.menus)) {
        if (menu.view || menu.edit || menu.delete) count++
      }
    }
  }
  return count
}

function isMenuAllChecked(menus: MenuPerms) {
  return Object.values(menus).every((m) => m.view && m.edit && m.delete)
}

function isMenuSomeChecked(menus: MenuPerms) {
  return Object.values(menus).some((m) => m.view || m.edit || m.delete)
}

// ── Component ──
export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [editPerms, setEditPerms] = useState<RolePermissions>({})
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDesc, setNewRoleDesc] = useState("")

  const startEdit = (role: Role) => {
    setEditingRole(role)
    setEditPerms(JSON.parse(JSON.stringify(role.permissions)))
    setExpandedModules([])
  }

  const saveEdit = () => {
    if (!editingRole) return
    setRoles((prev) =>
      prev.map((r) =>
        r.id === editingRole.id ? { ...r, permissions: editPerms } : r
      )
    )
    setEditingRole(null)
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )
  }

  const toggleModuleEnabled = (moduleId: string) => {
    setEditPerms((prev) => {
      const mod = prev[moduleId]
      const newEnabled = !mod.enabled
      const menus: MenuPerms = {}
      for (const m of moduleDefs.find((md) => md.id === moduleId)!.menus) {
        menus[m] = newEnabled
          ? { view: true, edit: true, delete: true }
          : { view: false, edit: false, delete: false }
      }
      return { ...prev, [moduleId]: { enabled: newEnabled, menus } }
    })
  }

  const toggleMenuAll = (moduleId: string, menuName: string) => {
    setEditPerms((prev) => {
      const current = prev[moduleId].menus[menuName]
      const allOn = current.view && current.edit && current.delete
      return {
        ...prev,
        [moduleId]: {
          ...prev[moduleId],
          menus: {
            ...prev[moduleId].menus,
            [menuName]: allOn
              ? { view: false, edit: false, delete: false }
              : { view: true, edit: true, delete: true },
          },
        },
      }
    })
  }

  const toggleMenuPerm = (moduleId: string, menuName: string, perm: "view" | "edit" | "delete") => {
    setEditPerms((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        menus: {
          ...prev[moduleId].menus,
          [menuName]: {
            ...prev[moduleId].menus[menuName],
            [perm]: !prev[moduleId].menus[menuName][perm],
          },
        },
      },
    }))
  }

  const toggleAllMenus = (moduleId: string) => {
    setEditPerms((prev) => {
      const allChecked = isMenuAllChecked(prev[moduleId].menus)
      const menus: MenuPerms = {}
      for (const [name] of Object.entries(prev[moduleId].menus)) {
        menus[name] = allChecked
          ? { view: false, edit: false, delete: false }
          : { view: true, edit: true, delete: true }
      }
      return { ...prev, [moduleId]: { ...prev[moduleId], menus } }
    })
  }

  const handleCreate = () => {
    if (!newRoleName.trim()) return
    const newRole: Role = {
      id: Date.now().toString(),
      name: newRoleName.trim(),
      description: newRoleDesc.trim() || "Custom role",
      userCount: 0,
      permissions: emptyPerms(),
    }
    setRoles((prev) => [...prev, newRole])
    setNewRoleName("")
    setNewRoleDesc("")
    setShowCreateDialog(false)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Role Management</h1>
          <p className="text-xs text-gray-500">Atur role dan hak akses per modul & menu</p>
        </div>
        <Button size="sm" onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Buat Role
        </Button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => {
          const menuCount = countMenusPerms(role.permissions)
          const moduleCount = Object.values(role.permissions).filter((m) => m.enabled).length
          return (
            <Card key={role.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                      <Shield className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{role.name}</h3>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{role.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => startEdit(role)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-muted hover:text-slate-600 transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {role.userCount} user
                  </span>
                  <span>{moduleCount} modul</span>
                  <span>{menuCount} menu</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {moduleDefs.map((m) => {
                    const mod = role.permissions[m.id]
                    if (!mod?.enabled) return null
                    return (
                      <span key={m.id} className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${m.color}`}>
                        {m.name}
                      </span>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Permission Matrix Overview */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Permission Matrix</h2>
            <p className="text-[11px] text-muted-foreground">Overview akses semua role per modul & menu</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                  <th className="px-4 py-2 min-w-[200px]">Modul / Menu</th>
                  {roles.map((r) => (
                    <th key={r.id} className="px-3 py-2 text-center min-w-[90px]">{r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {moduleDefs.map((m) => (
                  <React.Fragment key={m.id}>
                    {/* Module header row */}
                    <tr className="border-b bg-slate-50/80">
                      <td className="px-4 py-1.5">
                        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold ${m.color}`}>
                          {m.name}
                        </span>
                      </td>
                      {roles.map((r) => {
                        const mod = r.permissions[m.id]
                        const enabled = mod?.enabled ?? false
                        return (
                          <td key={r.id} className="px-3 py-1.5 text-center">
                            {enabled ? (
                              <Check className="inline h-3.5 w-3.5 text-green-600" />
                            ) : (
                              <X className="inline h-3.5 w-3.5 text-red-400" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                    {/* Menu rows */}
                    {m.menus.map((menu) => (
                      <tr key={menu} className="border-b last:border-0 hover:bg-slate-50/30">
                        <td className="pl-8 pr-4 py-1.5 text-xs text-muted-foreground">{menu}</td>
                        {roles.map((r) => {
                          const mod = r.permissions[m.id]
                          const menuPerm = mod?.menus?.[menu]
                          if (!mod?.enabled || !menuPerm) {
                            return <td key={r.id} className="px-3 py-1.5 text-center"><X className="inline h-3 w-3 text-red-300" /></td>
                          }
                          return (
                            <td key={r.id} className="px-3 py-1.5 text-center">
                              <div className="flex items-center justify-center gap-0.5">
                                <span title="View" className={`rounded p-0.5 ${menuPerm.view ? "bg-green-50" : "bg-red-50"}`}>
                                  {menuPerm.view ? <Check className="h-2.5 w-2.5 text-green-600" /> : <X className="h-2.5 w-2.5 text-red-400" />}
                                </span>
                                <span title="Edit" className={`rounded p-0.5 ${menuPerm.edit ? "bg-green-50" : "bg-red-50"}`}>
                                  {menuPerm.edit ? <Check className="h-2.5 w-2.5 text-green-600" /> : <X className="h-2.5 w-2.5 text-red-400" />}
                                </span>
                                <span title="Delete" className={`rounded p-0.5 ${menuPerm.delete ? "bg-green-50" : "bg-red-50"}`}>
                                  {menuPerm.delete ? <Check className="h-2.5 w-2.5 text-green-600" /> : <X className="h-2.5 w-2.5 text-red-400" />}
                                </span>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t px-4 py-2 flex items-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Check className="h-2.5 w-2.5 text-green-600" /> Granted</span>
            <span className="flex items-center gap-1"><X className="h-2.5 w-2.5 text-red-400" /> Denied</span>
            <span>View | Edit | Delete</span>
          </div>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={!!editingRole} onOpenChange={(open) => { if (!open) setEditingRole(null) }}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role: {editingRole?.name}</DialogTitle>
            <DialogDescription>Atur akses modul dan menu untuk role ini</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {moduleDefs.map((m) => {
              const mod = editPerms[m.id]
              if (!mod) return null
              const expanded = expandedModules.includes(m.id)
              const allChecked = isMenuAllChecked(mod.menus)
              const someChecked = isMenuSomeChecked(mod.menus)

              return (
                <div key={m.id} className="rounded-lg border">
                  {/* Module header */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/80">
                    <Checkbox
                      checked={mod.enabled}
                      onCheckedChange={() => toggleModuleEnabled(m.id)}
                    />
                    <button
                      onClick={() => toggleModule(m.id)}
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-700"
                    >
                      {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${m.color}`}>{m.name}</span>
                    </button>
                    {mod.enabled && (
                      <>
                        <div className="ml-auto flex items-center gap-1.5">
                          <button
                            onClick={() => toggleAllMenus(m.id)}
                            className="text-[11px] text-indigo-600 hover:underline"
                          >
                            {allChecked ? "Uncheck All" : "Check All"}
                          </button>
                          <span className="text-[10px] text-muted-foreground">
                            {Object.values(mod.menus).filter((mm) => mm.view || mm.edit || mm.delete).length}/{m.menus.length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Menu items */}
                  {mod.enabled && expanded && (
                    <div className="divide-y">
                      {m.menus.map((menuName) => {
                        const menuPerm = mod.menus[menuName]
                        const menuAllOn = menuPerm.view && menuPerm.edit && menuPerm.delete
                        return (
                          <div key={menuName} className="flex items-center gap-3 px-3 py-1.5 pl-8">
                            <Checkbox
                              checked={menuAllOn}
                              onCheckedChange={() => toggleMenuAll(m.id, menuName)}
                            />
                            <span className="text-xs text-slate-700 w-40">{menuName}</span>
                            <div className="flex items-center gap-3 ml-auto">
                              {(["view", "edit", "delete"] as const).map((perm) => (
                                <label key={perm} className="flex items-center gap-1 cursor-pointer">
                                  <Checkbox
                                    checked={menuPerm[perm]}
                                    onCheckedChange={() => toggleMenuPerm(m.id, menuName, perm)}
                                    className="h-3.5 w-3.5"
                                  />
                                  <span className="text-[11px] text-muted-foreground capitalize">{perm}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditingRole(null)}>Batal</Button>
            <Button size="sm" onClick={saveEdit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Role Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Role Baru</DialogTitle>
            <DialogDescription>Buat role baru, lalu atur permissionsnya</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="rn" className="text-xs">Nama Role</Label>
              <Input id="rn" placeholder="e.g. Outbond Staff" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} className="h-8 text-sm" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="rd" className="text-xs">Deskripsi</Label>
              <Input id="rd" placeholder="Deskripsi singkat" value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} className="h-8 text-sm" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowCreateDialog(false)}>Batal</Button>
            <Button size="sm" onClick={handleCreate} disabled={!newRoleName.trim()}>Buat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
