"use client"

import React from "react"
import Link from "next/link"
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CommerceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +62 21 5555 0123
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              info@scwdistribution.co.id
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free shipping for orders above Rp 500.000</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Jakarta, Indonesia
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3">
          {/* Logo */}
          <Link href="/commerce" className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              SCW
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-slate-900">
                SCW Distribution
              </span>
              <span className="text-[10px] leading-tight text-muted-foreground">
                Car Detailing &amp; Coating Specialists
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products, brands, categories..."
              className="h-10 pl-10 pr-4"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/commerce/cart">
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <ShoppingCart className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-0 text-[10px]"
                >
                  3
                </Badge>
              </Button>
            </Link>
            <Link href="/commerce/login">
              <Button variant="outline" size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Category navigation */}
        <div className="border-t bg-slate-50">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1.5 overflow-x-auto">
            {[
              { label: "All Products", href: "/commerce/products" },
              { label: "Exterior Care", href: "/commerce/products?category=exterior" },
              { label: "Interior Care", href: "/commerce/products?category=interior" },
              { label: "Wheel & Tire", href: "/commerce/products?category=wheel-tire" },
              { label: "Coating & Protection", href: "/commerce/products?category=coating" },
              { label: "Tools & Accessories", href: "/commerce/products?category=tools" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                  SCW
                </div>
                <span className="text-lg font-bold">SCW Distribution</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Indonesia&apos;s trusted distributor for premium car detailing,
                coating, and body care products. Serving the automotive care
                industry since 2015.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  <Globe className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/commerce" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/commerce/products" className="hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/commerce/orders" className="hover:text-white transition-colors">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="/commerce/login" className="hover:text-white transition-colors">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Categories
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/commerce/products?category=exterior" className="hover:text-white transition-colors">
                    Exterior Care
                  </Link>
                </li>
                <li>
                  <Link href="/commerce/products?category=interior" className="hover:text-white transition-colors">
                    Interior Care
                  </Link>
                </li>
                <li>
                  <Link href="/commerce/products?category=coating" className="hover:text-white transition-colors">
                    Coating &amp; Protection
                  </Link>
                </li>
                <li>
                  <Link href="/commerce/products?category=wheel-tire" className="hover:text-white transition-colors">
                    Wheel &amp; Tire
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Contact Us
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Jl. Raya Industri No. 88, Jakarta Utara
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  +62 21 5555 0123
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  info@scwdistribution.co.id
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
            <span>&copy; 2024 SCW Distribution. All rights reserved.</span>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Return Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
