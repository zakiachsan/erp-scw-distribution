import { create } from "zustand"

export type ModuleId = "sales" | "operasional" | "accounting" | "ecommerce"

export interface ModuleInfo {
  id: ModuleId
  name: string
  description: string
  icon: string
  color: string
  menuItems: {
    label: string
    icon: string
    href?: string
    children?: { label: string; href: string }[]
  }[]
}

export const MODULES: ModuleInfo[] = [
  {
    id: "sales",
    name: "Sales & CRM",
    description: "Kelola penjualan, customer, invoice, dan komisi sales",
    icon: "Users",
    color: "blue",
    menuItems: [
      { label: "Dashboard", icon: "LayoutDashboard", href: "/sales" },
      {
        label: "Customers",
        icon: "UserCheck",
        children: [
          { label: "Customer List", href: "/sales/customers" },
          { label: "Most-Buy Customers", href: "/sales/most-buy" },
        ],
      },
      {
        label: "Sales Orders",
        icon: "FileText",
        children: [
          { label: "Order List", href: "/sales/orders" },
          { label: "Create SO", href: "/sales/orders/create" },
        ],
      },
      {
        label: "Invoices",
        icon: "Receipt",
        children: [
          { label: "Invoice List", href: "/sales/invoices" },
          { label: "Create Invoice", href: "/sales/invoices/create" },
        ],
      },
      {
        label: "Payments",
        icon: "CreditCard",
        href: "/sales/payments",
      },
      { label: "Commission", icon: "DollarSign", href: "/sales/commission" },
      { label: "Tiering Discount", icon: "Percent", href: "/tiering" },
    ],
  },
  {
    id: "operasional",
    name: "Operasional",
    description: "Kelola inventory, gudang, pembelian, pengiriman, dan packing",
    icon: "Package",
    color: "emerald",
    menuItems: [
      { label: "Dashboard", icon: "LayoutDashboard", href: "/operasional" },
      {
        label: "Purchasing",
        icon: "ShoppingCart",
        children: [
          { label: "Purchase Orders", href: "/purchasing" },
          { label: "Suppliers", href: "/purchasing/suppliers" },
          { label: "USD Rate", href: "/purchasing/usd-rate" },
        ],
      },
      {
        label: "Inventory",
        icon: "Package",
        children: [
          { label: "Products", href: "/inventory" },
          { label: "Inbound", href: "/inventory/inbound" },
          { label: "Put Away", href: "/inventory/put-away" },
          { label: "Warehouse / Rak", href: "/inventory/warehouse" },
          { label: "Outbond", href: "/inventory/outbond" },
          { label: "Stock Opname", href: "/inventory/stock-opname" },
          { label: "Packing Materials", href: "/inventory/packing-materials" },
          { label: "Stock Alert", href: "/inventory/stock-alert" },
        ],
      },
      {
        label: "Packing",
        icon: "Box",
        children: [
          { label: "Packing Queue", href: "/packing" },
          { label: "Video Gallery", href: "/packing/videos" },
          { label: "Materials Stock", href: "/packing/materials" },
        ],
      },
      {
        label: "Shipping",
        icon: "Truck",
        children: [
          { label: "Shipments", href: "/shipping" },
          { label: "Couriers", href: "/shipping/couriers" },
        ],
      },
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    description: "Pembukuan, jurnal, neraca, laporan keuangan, dan pajak",
    icon: "BookOpen",
    color: "violet",
    menuItems: [
      { label: "Dashboard", icon: "LayoutDashboard", href: "/accounting" },
      {
        label: "Jurnal",
        icon: "BookOpen",
        children: [
          { label: "Journal Entries", href: "/accounting/journal" },
          { label: "New Journal", href: "/accounting/journal/create" },
        ],
      },
      { label: "General Ledger", icon: "ListOrdered", href: "/accounting/ledger" },
      { label: "Balance Sheet", icon: "Scale", href: "/accounting/balance-sheet" },
      { label: "P&L Statement", icon: "TrendingUp", href: "/accounting/profit-loss" },
      { label: "Bank Reconciliation", icon: "ArrowLeftRight", href: "/accounting/reconciliation" },
      { label: "Tax PPh 21/23", icon: "Landmark", href: "/accounting/tax" },
      { label: "Fixed Asset", icon: "HardDrive", href: "/accounting/fixed-asset" },
      { label: "Budget", icon: "PieChart", href: "/accounting/budget" },
      { label: "KPI", icon: "Target", href: "/accounting/kpi" },
    ],
  },
  {
    id: "ecommerce",
    name: "WebCommerce",
    description: "Kelola toko online, katalog produk, dan order dari customer",
    icon: "Store",
    color: "orange",
    menuItems: [
      { label: "Dashboard", icon: "LayoutDashboard", href: "/ecommerce" },
      { label: "Products", icon: "ShoppingBag", href: "/ecommerce/products" },
      { label: "Orders", icon: "ClipboardList", href: "/ecommerce/orders" },
      { label: "Customers", icon: "Users", href: "/ecommerce/customers" },
      { label: "Categories", icon: "Tag", href: "/ecommerce/categories" },
      { label: "Banners", icon: "Image", href: "/ecommerce/banners" },
      { label: "Coupons", icon: "Ticket", href: "/ecommerce/coupons" },
      { label: "Reviews", icon: "Star", href: "/ecommerce/reviews" },
      { label: "Settings", icon: "Settings", href: "/ecommerce/settings" },
    ],
  },
]

interface ModuleState {
  activeModule: ModuleId | null
  setActiveModule: (module: ModuleId | null) => void
}

function getInitialModule(): ModuleId | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem("scw-active-module")
    if (stored && ["sales", "operasional", "accounting", "ecommerce"].includes(stored)) {
      return stored as ModuleId
    }
  } catch {}
  return null
}

export const useModuleStore = create<ModuleState>((set) => ({
  activeModule: getInitialModule(),
  setActiveModule: (module) => {
    try {
      if (module) {
        localStorage.setItem("scw-active-module", module)
      } else {
        localStorage.removeItem("scw-active-module")
      }
    } catch {}
    set({ activeModule: module })
  },
}))

export function getModuleById(id: ModuleId): ModuleInfo | undefined {
  return MODULES.find((m) => m.id === id)
}

export function getModuleIdByPathname(pathname: string): ModuleId | null {
  if (
    pathname.startsWith("/sales") ||
    pathname === "/tiering" ||
    pathname.startsWith("/tiering/")
  ) {
    return "sales"
  }
  if (
    pathname.startsWith("/operasional") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/purchasing") ||
    pathname.startsWith("/shipping") ||
    pathname.startsWith("/packing")
  ) {
    return "operasional"
  }
  if (pathname.startsWith("/accounting")) {
    return "accounting"
  }
  if (pathname.startsWith("/ecommerce")) {
    return "ecommerce"
  }
  return null
}
