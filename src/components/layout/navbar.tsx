"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Bell,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  inventory: "Inventory",
  products: "Products",
  warehouse: "Warehouse / Rak",
  "stock-opname": "Stock Opname",
  "stock-alert": "Stock Alert",
  "packing-materials": "Packing Materials",
  purchasing: "Purchasing",
  orders: "Purchase Orders",
  suppliers: "Suppliers",
  "usd-rate": "USD Rate",
  sales: "Sales",
  customers: "Customers",
  invoices: "Invoices",
  commission: "Commission",
  "top-customers": "Most-Buy Customers",
  "tiering-discount": "Tiering Discount",
  shipping: "Shipping",
  shipments: "Shipments",
  couriers: "Couriers",
  packing: "Packing",
  queue: "Packing Queue",
  videos: "Video Gallery",
  materials: "Materials Stock",
  accounting: "Accounting",
  journal: "Journal",
  ledger: "General Ledger",
  "balance-sheet": "Balance Sheet",
  pnl: "P&L",
  "bank-reconciliation": "Bank Reconciliation",
  "tax-pph": "Tax PPh",
  "fixed-asset": "Fixed Asset",
  budget: "Budget",
  kpi: "KPI",
  webcommerce: "WebCommerce",
  catalog: "Catalog",
  notifications: "Notifications",
  settings: "Settings",
  users: "Users",
  roles: "Roles",
  "activity-log": "Activity Log",
  "sales-team": "Sales Team",
}

export function Navbar() {
  const pathname = usePathname()
  const pathParts = pathname.split("/").filter(Boolean)

  const breadcrumbs = pathParts.map((part, index) => ({
    label: breadcrumbMap[part] || part,
    href: "/" + pathParts.slice(0, index + 1).join("/"),
    isLast: index === pathParts.length - 1,
  }))

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-1.5 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.href}>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              {crumb.isLast ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right side - Search, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-8 h-8"
          />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Notification Bell */}
        <div className="relative">
          <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>
        </div>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@scw.co.id</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
