"use client"

import React, { useState } from "react"
import {
  Shield,
  Plus,
  Edit,
  Check,
  X,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const roles = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 2,
    permissions: {
      inventory: { view: true, edit: true, delete: true },
      purchasing: { view: true, edit: true, delete: true },
      sales: { view: true, edit: true, delete: true },
      shipping: { view: true, edit: true, delete: true },
      packing: { view: true, edit: true, delete: true },
      accounting: { view: true, edit: true, delete: true },
      webcommerce: { view: true, edit: true, delete: true },
      settings: { view: true, edit: true, delete: true },
    },
  },
  {
    id: "2",
    name: "Sales Manager",
    description: "Manage sales team, orders, and customer relationships",
    userCount: 1,
    permissions: {
      inventory: { view: true, edit: false, delete: false },
      purchasing: { view: false, edit: false, delete: false },
      sales: { view: true, edit: true, delete: false },
      shipping: { view: true, edit: true, delete: false },
      packing: { view: false, edit: false, delete: false },
      accounting: { view: true, edit: false, delete: false },
      webcommerce: { view: true, edit: true, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "3",
    name: "Warehouse Staff",
    description: "Manage inventory, packing, and stock operations",
    userCount: 1,
    permissions: {
      inventory: { view: true, edit: true, delete: false },
      purchasing: { view: true, edit: false, delete: false },
      sales: { view: false, edit: false, delete: false },
      shipping: { view: true, edit: true, delete: false },
      packing: { view: true, edit: true, delete: false },
      accounting: { view: false, edit: false, delete: false },
      webcommerce: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "4",
    name: "Finance",
    description: "Manage accounting, invoices, and financial reports",
    userCount: 1,
    permissions: {
      inventory: { view: true, edit: false, delete: false },
      purchasing: { view: true, edit: true, delete: false },
      sales: { view: true, edit: false, delete: false },
      shipping: { view: false, edit: false, delete: false },
      packing: { view: false, edit: false, delete: false },
      accounting: { view: true, edit: true, delete: false },
      webcommerce: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "5",
    name: "Purchasing",
    description: "Manage purchase orders and supplier relationships",
    userCount: 1,
    permissions: {
      inventory: { view: true, edit: true, delete: false },
      purchasing: { view: true, edit: true, delete: false },
      sales: { view: false, edit: false, delete: false },
      shipping: { view: false, edit: false, delete: false },
      packing: { view: false, edit: false, delete: false },
      accounting: { view: true, edit: false, delete: false },
      webcommerce: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "6",
    name: "Customer Service",
    description: "Handle customer inquiries and order support",
    userCount: 1,
    permissions: {
      inventory: { view: true, edit: false, delete: false },
      purchasing: { view: false, edit: false, delete: false },
      sales: { view: true, edit: true, delete: false },
      shipping: { view: true, edit: false, delete: false },
      packing: { view: false, edit: false, delete: false },
      accounting: { view: false, edit: false, delete: false },
      webcommerce: { view: true, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
]

const modules = ["inventory", "purchasing", "sales", "shipping", "packing", "accounting", "webcommerce", "settings"] as const
type ModuleName = typeof modules[number]
const permissions = ["view", "edit", "delete"]

function PermissionIcon({ granted }: { granted: boolean }) {
  return granted ? (
    <Check className="h-4 w-4 text-green-600" />
  ) : (
    <X className="h-4 w-4 text-red-400" />
  )
}

export default function RolesPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          <p className="text-muted-foreground">
            Define roles and manage permission matrices for system access
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Create Role
        </Button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                    <Shield className="h-4 w-4 text-indigo-600" />
                  </div>
                  <CardTitle className="text-base">{role.name}</CardTitle>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {role.userCount} user{role.userCount > 1 ? "s" : ""}
                </span>
                <Badge variant="secondary">
                  {Object.values(role.permissions).filter(
                    (p) => p.view || p.edit || p.delete
                  ).length}{" "}
                  modules
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>
            Overview of permissions across all roles and modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40">Module</TableHead>
                  {roles.map((role) => (
                    <TableHead key={role.id} className="text-center min-w-[100px]">
                      {role.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.map((mod) => (
                  <TableRow key={mod}>
                    <TableCell className="font-medium capitalize">{mod.replace("-", " & ")}</TableCell>
                    {roles.map((role) => (
                      <TableCell key={role.id} className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div title="View" className={`rounded p-0.5 ${role.permissions[mod as ModuleName]?.view ? 'bg-green-50' : 'bg-red-50'}`}>
                            <PermissionIcon granted={role.permissions[mod as ModuleName]?.view || false} />
                          </div>
                          <div title="Edit" className={`rounded p-0.5 ${role.permissions[mod as ModuleName]?.edit ? 'bg-green-50' : 'bg-red-50'}`}>
                            <PermissionIcon granted={role.permissions[mod as ModuleName]?.edit || false} />
                          </div>
                          <div title="Delete" className={`rounded p-0.5 ${role.permissions[mod as ModuleName]?.delete ? 'bg-green-50' : 'bg-red-50'}`}>
                            <PermissionIcon granted={role.permissions[mod as ModuleName]?.delete || false} />
                          </div>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Check className="h-3 w-3 text-green-600" /> Granted</span>
            <span className="flex items-center gap-1"><X className="h-3 w-3 text-red-400" /> Denied</span>
            <span className="flex items-center gap-1">Columns: View | Edit | Delete</span>
          </div>
        </CardContent>
      </Card>

      {/* Create Role Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role with specific permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input id="role-name" placeholder="e.g. Shipping Manager" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-desc">Description</Label>
              <Input id="role-desc" placeholder="Brief description of this role" />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      <TableHead className="text-center">View</TableHead>
                      <TableHead className="text-center">Edit</TableHead>
                      <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((mod) => (
                      <TableRow key={mod}>
                        <TableCell className="font-medium capitalize">{mod.replace("-", " & ")}</TableCell>
                        {permissions.map((perm) => (
                          <TableCell key={perm} className="text-center">
                            <Checkbox />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreateDialog(false)}>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
