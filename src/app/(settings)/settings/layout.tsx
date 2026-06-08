"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Settings,
  Users,
  Shield,
  Bell,
  Activity,
  ArrowLeft,
} from "lucide-react"

const settingsNav = [
  { label: "Users", href: "/settings/users", icon: Users },
  { label: "Roles", href: "/settings/roles", icon: Shield },
  { label: "Notifications", href: "/settings/notifications", icon: Bell },
  { label: "Activity Log", href: "/settings/activity-log", icon: Activity },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Settings Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-white">
        <div className="flex h-14 items-center border-b px-4">
          <Settings className="mr-2 h-5 w-5 text-slate-500" />
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Settings</h2>
            <p className="text-[10px] text-slate-500">Pengaturan Sistem</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {settingsNav.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t px-3 py-3">
          <Link
            href="/modules"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Modul
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}
