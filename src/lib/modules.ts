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
        label: "Pipeline",
        icon: "TrendingUp",
        href: "/sales/pipeline",
      },
      {
        label: "Customers",
        icon: "UserCheck",
        href: "/sales/customers",
      },
      {
        label: "Purchase Orders",
        icon: "FileText",
        href: "/sales/orders",
      },
      {
        label: "Invoices",
        icon: "Receipt",
        href: "/sales/invoices",
      },
      {
        label: "Payments",
        icon: "CreditCard",
        href: "/sales/payments",
      },
      { label: "Commission", icon: "DollarSign", href: "/sales/commission" },
      { label: "Sales Team", icon: "Users", href: "/sales/sales-team" },
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
        label: "Buku Besar",
        icon: "BookOpen",
        children: [
          { label: "Akun Perkiraan", href: "/accounting/coa" },
          { label: "Jurnal Umum", href: "/accounting/journal" },
        ],
      },
      {
        label: "Kas & Bank",
        icon: "Landmark",
        children: [
          { label: "Pembayaran", href: "/accounting/payments" },
          { label: "Penerimaan", href: "/accounting/receipts" },
          { label: "Transfer Bank", href: "/accounting/transfers" },
          { label: "Rekonsiliasi Bank", href: "/accounting/reconciliation" },
        ],
      },
      {
        label: "Penjualan",
        icon: "TrendingUp",
        children: [
          { label: "Penawaran Penjualan", href: "/accounting/sales/quotations" },
          { label: "Faktur Penjualan", href: "/accounting/sales/invoices" },
        ],
      },
      {
        label: "Persediaan",
        icon: "Package",
        children: [
          { label: "Pekerjaan Pesanan", href: "/accounting/inventory/work-orders" },
          { label: "Penyelesaian Pesanan", href: "/accounting/inventory/completions" },
          { label: "Penyesuaian Persediaan", href: "/accounting/inventory/adjustments" },
        ],
      },
      { label: "Aset Tetap", icon: "HardDrive", href: "/accounting/fixed-assets" },
      { label: "Laporan", icon: "PieChart", href: "/accounting/reports" },
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
