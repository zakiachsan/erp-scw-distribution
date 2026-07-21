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
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { useT } from "@/lib/i18n"

export function Navbar() {
  const pathname = usePathname()
  const pathParts = pathname.split("/").filter(Boolean)
  const { t, tBreadcrumb, mounted } = useT()

  const breadcrumbs = pathParts.map((part, index) => ({
    label: mounted ? tBreadcrumb(part) : part,
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
            {t("nav.home")}
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

      {/* Right side - Search, Notifications, Language, User */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("nav.search")}
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

        {/* Language Switcher */}
        <LanguageSwitcher />

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
              {t("nav.profile")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut className="h-4 w-4" />
              {t("nav.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
