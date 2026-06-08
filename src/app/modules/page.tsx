"use client"

import { useRouter } from "next/navigation"
import { useModuleStore, MODULES, type ModuleId } from "@/lib/modules"
import {
  Users,
  Package,
  BookOpen,
  Store,
  ArrowRight,
  Settings,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Users,
  Package,
  BookOpen,
  Store,
}

const colorMap: Record<string, { bg: string; icon: string; hover: string; ring: string }> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    hover: "hover:border-blue-300 hover:bg-blue-50/50",
    ring: "focus-visible:ring-blue-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    hover: "hover:border-emerald-300 hover:bg-emerald-50/50",
    ring: "focus-visible:ring-emerald-500",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    hover: "hover:border-violet-300 hover:bg-violet-50/50",
    ring: "focus-visible:ring-violet-500",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    hover: "hover:border-orange-300 hover:bg-orange-50/50",
    ring: "focus-visible:ring-orange-500",
  },
}

export default function ModulesPage() {
  const router = useRouter()
  const setActiveModule = useModuleStore((s) => s.setActiveModule)

  const handleSelect = (moduleId: ModuleId) => {
    setActiveModule(moduleId)
    // Navigate to module dashboard
    const mod = MODULES.find((m) => m.id === moduleId)
    const firstHref = mod?.menuItems?.[0]?.href || "/"
    router.push(firstHref)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              SCW
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900">SCW Distribution</h1>
              <p className="text-xs text-slate-500">ERP Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/settings/users")}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 transition-colors"
            >
              <Settings className="h-4 w-4 text-slate-500" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
              AD
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">admin@scw.co.id</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center px-6 py-6">
        <div className="mx-auto max-w-3xl w-full text-center">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Pilih Modul
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Pilih modul yang ingin kamu akses. Sidebar akan menyesuaikan dengan modul yang dipilih.
            </p>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MODULES.map((mod) => {
              const Icon = iconMap[mod.icon] || Package
              const colors = colorMap[mod.color] || colorMap.blue
              const menuCount = mod.menuItems.reduce(
                (acc, item) => acc + (item.children ? item.children.length : 1),
                0
              )

              return (
                <button
                  key={mod.id}
                  onClick={() => handleSelect(mod.id)}
                  className={`group relative flex flex-col items-start rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all ${colors.hover} hover:shadow-md focus-visible:outline-none focus-visible:ring-2 ${colors.ring}`}
                >
                  {/* Icon */}
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-base font-semibold text-slate-900">
                    {mod.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {mod.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between w-full">
                    <span className="text-xs text-slate-400">
                      {menuCount} menu
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                      Buka
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Quick Access */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              ← Kembali ke Dashboard
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 py-4 text-center text-xs text-slate-400">
        © 2026 SCW Distribution. All rights reserved.
      </footer>
    </div>
  )
}
