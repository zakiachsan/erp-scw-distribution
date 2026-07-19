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
        label: "Quotation",
        icon: "FileText",
        href: "/sales/quotations",
      },
      {
        label: "Sales Orders",
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
          { label: "Purchase Requests", href: "/purchasing/requests" },
          { label: "Price Quotations", href: "/purchasing/quotations" },
          { label: "Purchase Orders", href: "/purchasing" },
          { label: "Logistic", href: "/purchasing/logistic" },
          { label: "Suppliers", href: "/purchasing/suppliers" },
          { label: "Currency Rate", href: "/purchasing/usd-rate" },
        ],
      },
      {
        label: "Inventory",
        icon: "Package",
        children: [
          { label: "Put Away", href: "/inventory/put-away" },
          { label: "Damaged Items", href: "/inventory/damaged" },
          { label: "Reports", href: "/inventory/reports" },
          { label: "Products", href: "/inventory" },
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
          { label: "Packing Slips", href: "/packing" },
          { label: "Video Gallery", href: "/packing/videos" },
          { label: "Materials Stock", href: "/packing/materials" },
        ],
      },
      {
        label: "Shipping",
        icon: "Truck",
        children: [
          { label: "Delivery Orders", href: "/shipping" },
          { label: "Proof of Delivery", href: "/shipping/pod" },
          { label: "Couriers", href: "/shipping/couriers" },
        ],
      },
      {
        label: "Customer Returns",
        icon: "RotateCcw",
        href: "/customer-returns",
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
          { label: "Akun Perkiraan", href: "/accounting/buku-besar/akun-perkiraan" },
          { label: "Pencatatan Beban", href: "/accounting/buku-besar/pencatatan-beban" },
          { label: "Jurnal Umum", href: "/accounting/buku-besar/jurnal-umum" },
          { label: "Anggaran", href: "/accounting/buku-besar/anggaran" },
          { label: "Histori Akun", href: "/accounting/buku-besar/histori-akun" },
          { label: "Log Aktifitas Jurnal", href: "/accounting/buku-besar/log-aktifitas-jurnal" },
        ],
      },
      {
        label: "Kas & Bank",
        icon: "Landmark",
        children: [
          { label: "Pembayaran", href: "/accounting/kas-bank/pembayaran" },
          { label: "Penerimaan", href: "/accounting/kas-bank/penerimaan" },
          { label: "Transfer Bank", href: "/accounting/kas-bank/transfer-bank" },
          { label: "Smartlink E-Banking", href: "/accounting/kas-bank/smartlink-ebanking" },
          { label: "Rekening Koran", href: "/accounting/kas-bank/rekening-koran" },
          { label: "Rekonsiliasi Bank", href: "/accounting/kas-bank/rekonsiliasi-bank" },
          { label: "Histori Bank", href: "/accounting/kas-bank/histori-bank" },
        ],
      },
      {
        label: "Penjualan",
        icon: "TrendingUp",
        children: [
          { label: "Penawaran Penjualan", href: "/accounting/penjualan/penawaran-penjualan" },
          { label: "Pesanan Penjualan", href: "/accounting/penjualan/pesanan-penjualan" },
          { label: "Pengiriman Pesanan", href: "/accounting/penjualan/pengiriman-pesanan" },
          { label: "Uang Muka Penjualan", href: "/accounting/penjualan/uang-muka-penjualan" },
          { label: "Faktur Penjualan", href: "/accounting/penjualan/faktur-penjualan" },
          { label: "Penerimaan Penjualan", href: "/accounting/penjualan/penerimaan-penjualan" },
          { label: "Retur Penjualan", href: "/accounting/penjualan/retur-penjualan" },
          { label: "Kategori Pelanggan", href: "/accounting/penjualan/kategori-pelanggan" },
          { label: "Kategori Penjualan", href: "/accounting/penjualan/kategori-penjualan" },
          { label: "Pelanggan Penyesuaian Harga/Diskon", href: "/accounting/penjualan/penyesuaian-harga-diskon" },
          { label: "Pelanggan", href: "/accounting/penjualan/pelanggan" },
          { label: "Komisi Penjual", href: "/accounting/penjualan/komisi-penjual" },
          { label: "Target Penjualan", href: "/accounting/penjualan/target-penjualan" },
        ],
      },
      {
        label: "Persediaan",
        icon: "Package",
        children: [
          { label: "Pemindahan Barang", href: "/accounting/persediaan/pemindahan-barang" },
          { label: "Penyesuaian Persediaan", href: "/accounting/persediaan/penyesuaian-persediaan" },
          { label: "Pekerjaan Pesanan", href: "/accounting/persediaan/pekerjaan-pesanan" },
          { label: "Penambahan Bahan Baku", href: "/accounting/persediaan/penambahan-bahan-baku" },
          { label: "Penyelesaian Pesanan", href: "/accounting/persediaan/penyelesaian-pesanan" },
          { label: "Barang & Jasa", href: "/accounting/persediaan/barang-jasa" },
          { label: "Gudang", href: "/accounting/persediaan/gudang" },
          { label: "Satuan Barang", href: "/accounting/persediaan/satuan-barang" },
          { label: "Kategori Barang", href: "/accounting/persediaan/kategori-barang" },
          { label: "Merek Barang", href: "/accounting/persediaan/merek-barang" },
          { label: "Barang Per Gudang", href: "/accounting/persediaan/barang-per-gudang" },
          { label: "Barang Stok Minimum", href: "/accounting/persediaan/barang-stok-minimum" },
        ],
      },
      {
        label: "Pembelian",
        icon: "ShoppingCart",
        children: [
          { label: "Pesanan Pembelian", href: "/accounting/pembelian/pesanan-pembelian" },
          { label: "Penerimaan Barang", href: "/accounting/pembelian/penerimaan-barang" },
          { label: "Uang Muka Pembelian", href: "/accounting/pembelian/uang-muka-pembelian" },
          { label: "Faktur Pembelian", href: "/accounting/pembelian/faktur-pembelian" },
          { label: "Pembayaran Pembelian", href: "/accounting/pembelian/pembayaran-pembelian" },
          { label: "Retur Pembelian", href: "/accounting/pembelian/retur-pembelian" },
          { label: "Harga Pemasok", href: "/accounting/pembelian/harga-pemasok" },
          { label: "Kategori Pemasok", href: "/accounting/pembelian/kategori-pemasok" },
          { label: "Pemasok", href: "/accounting/pembelian/pemasok" },
        ],
      },
      {
        label: "Aset Tetap",
        icon: "Building",
        children: [
          { label: "Aset Tetap", href: "/accounting/aset-tetap/aset-tetap" },
          { label: "Kategori Aset", href: "/accounting/aset-tetap/kategori-aset" },
          { label: "Disposisi Aset Tetap", href: "/accounting/aset-tetap/disposisi-aset-tetap" },
        ],
      },
      {
        label: "Perusahaan",
        icon: "Building",
        children: [
          { label: "Syarat Pembayaran", href: "/accounting/perusahaan/syarat-pembayaran" },
          { label: "Pengiriman", href: "/accounting/perusahaan/pengiriman" },
          { label: "FOB", href: "/accounting/perusahaan/fob" },
          { label: "Gaji & Tunjangan", href: "/accounting/perusahaan/gaji-tunjangan" },
          { label: "Karyawan", href: "/accounting/perusahaan/karyawan" },
          { label: "Transaksi Berulang", href: "/accounting/perusahaan/transaksi-berulang" },
          { label: "Proses Akhir Bulan", href: "/accounting/perusahaan/proses-akhir-bulan" },
          { label: "Kontak", href: "/accounting/perusahaan/kontak" },
          { label: "Transaksi Favorit", href: "/accounting/perusahaan/transaksi-favorit" },
          { label: "Kalender", href: "/accounting/perusahaan/kalender" },
          { label: "Log Aktifitas", href: "/accounting/perusahaan/log-aktifitas" },
        ],
      },
      {
        label: "Laporan Keuangan",
        icon: "BarChart3",
        children: [
          { label: "Laba Rugi", href: "/accounting/laporan/laba-rugi" },
          { label: "Neraca", href: "/accounting/laporan/neraca" },
          { label: "Arus Kas", href: "/accounting/laporan/arus-kas" },
          { label: "Laporan Penjualan", href: "/accounting/laporan/penjualan" },
          { label: "Laporan Pembelian", href: "/accounting/laporan/pembelian" },
          { label: "Laporan Hutang Piutang", href: "/accounting/laporan/hutang-piutang" },
        ],
      },
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
      { label: "Customers", icon: "UserCheck", href: "/sales/customers" },
      { label: "Quotation", icon: "FileText", href: "/sales/quotations" },
      { label: "Purchase Orders", icon: "FileText", href: "/sales/orders" },
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
    pathname.startsWith("/packing") ||
    pathname.startsWith("/customer-returns")
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
