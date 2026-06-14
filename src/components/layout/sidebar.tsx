"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useModuleStore, getModuleById, getModuleIdByPathname } from "@/lib/modules"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Percent,
  Truck,
  Box,
  BookOpen,
  Store,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  UserCheck,
  FileText,
  Receipt,
  DollarSign,
  ListOrdered,
  Scale,
  TrendingUp,
  ArrowLeftRight,
  Landmark,
  HardDrive,
  PieChart,
  Target,
  ShoppingBag,
  ClipboardList,
  Tag,
  Image,
  Ticket,
  Star,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Percent,
  Truck,
  Box,
  BookOpen,
  Store,
  Bell,
  Settings,
  UserCheck,
  FileText,
  Receipt,
  DollarSign,
  ListOrdered,
  Scale,
  TrendingUp,
  ArrowLeftRight,
  Landmark,
  HardDrive,
  PieChart,
  Target,
  ShoppingBag,
  ClipboardList,
  Tag,
  Image,
  Ticket,
  Star,
}

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const { activeModule, setActiveModule } = useModuleStore()

  // Auto-detect active module from current path so the sidebar menu never
  // disappears when navigating directly to a module page.
  React.useEffect(() => {
    const moduleFromPath = getModuleIdByPathname(pathname)
    if (moduleFromPath && moduleFromPath !== activeModule) {
      setActiveModule(moduleFromPath)
    }
  }, [pathname, activeModule, setActiveModule])

  const moduleInfo = activeModule ? getModuleById(activeModule) : null

  // Delay rendering until client-side hydration is complete
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    // Open all sub-menus by default
    if (moduleInfo) {
      const allSections = moduleInfo.menuItems
        .filter((item) => item.children && item.children.length > 0)
        .map((item) => item.label)
      setOpenSections(allSections)
    }
  }, [moduleInfo])

  // Build menu items from module
  const menuItems = useMemo(() => {
    if (!moduleInfo) return []
    return moduleInfo.menuItems.map((item) => ({
      ...item,
      iconEl: iconMap[item.icon] || Package,
      children: item.children?.map((child) => ({
        ...child,
      })),
    }))
  }, [moduleInfo])

  const toggleSection = (label: string) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    )
  }

  const isActive = (href: string) => pathname === href
  const isChildActive = (href: string, allChildHrefs: string[]) => {
    if (pathname === href) return true
    if (!pathname.startsWith(href + "/")) return false
    // When href is a prefix (e.g., /inventory or /purchasing), check if
    // the next path segment matches a known sibling page. If so, it's
    // NOT a detail page of this href.
    const nextSegment = pathname.slice(href.length + 1).split("/")[0]
    const isKnownSibling = allChildHrefs.some((h) => {
      if (h === href) return false
      const siblingNext = h.slice(href.length + 1).split("/")[0]
      return siblingNext === nextSegment
    })
    return !isKnownSibling
  }
  const isSectionActive = (item: { children?: { href: string }[] }) => {
    const childHrefs = item.children?.map((c) => c.href) ?? []
    return item.children?.some((child) => isChildActive(child.href, childHrefs))
  }

  // Module color themes
  const moduleColors: Record<string, { active: string; hover: string; accent: string }> = {
    sales: { active: "bg-blue-600 text-white", hover: "hover:bg-blue-50 hover:text-blue-700", accent: "bg-blue-100 text-blue-700" },
    operasional: { active: "bg-emerald-600 text-white", hover: "hover:bg-emerald-50 hover:text-emerald-700", accent: "bg-emerald-100 text-emerald-700" },
    accounting: { active: "bg-violet-600 text-white", hover: "hover:bg-violet-50 hover:text-violet-700", accent: "bg-violet-100 text-violet-700" },
    ecommerce: { active: "bg-orange-600 text-white", hover: "hover:bg-orange-50 hover:text-orange-700", accent: "bg-orange-100 text-orange-700" },
  }

  const colors = activeModule ? moduleColors[activeModule] : moduleColors.sales

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r bg-card text-card-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
              SCW
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">SCW Distribution</span>
              {mounted && moduleInfo && (
                <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full w-fit", colors.accent)}>
                  {moduleInfo.name}
                </span>
              )}
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {mounted && menuItems.map((item) => {
          const Icon = item.iconEl
          const hasChildren = !!item.children
          const isExpanded = openSections.includes(item.label)
          const active = item.href ? isActive(item.href) : isSectionActive(item)

          if (hasChildren) {
            return (
              <div key={item.label} className="mb-1">
                <button
                  onClick={() => toggleSection(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? `${colors.accent}`
                      : `text-muted-foreground ${colors.hover}`
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </>
                  )}
                </button>
                {!collapsed && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l pl-3">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-sm transition-colors",
                          isChildActive(child.href, item.children!.map((c) => c.href))
                            ? `${colors.accent} font-medium`
                            : `text-muted-foreground hover:bg-muted hover:text-foreground`
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href!)
                  ? colors.active
                  : `text-muted-foreground ${colors.hover}`
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}

        {/* Divider */}
        <div className="my-3 border-t" />

        {/* Global items */}
        <Link
          href="/notifications"
          className={cn(
            "mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive("/notifications")
              ? "bg-slate-600 text-white"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Bell className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Notifications</span>}
        </Link>

        <Link
          href="/settings/users"
          className={cn(
            "mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname.startsWith("/settings")
              ? "bg-slate-600 text-white"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        {!collapsed && (
          <div className="space-y-2">
            {/* Switch Module */}
            <Link
              href="/modules"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Ganti Modul
            </Link>
            {/* User */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                AD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@scw.co.id</span>
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <Link
            href="/modules"
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        )}
      </div>
    </aside>
  )
}
