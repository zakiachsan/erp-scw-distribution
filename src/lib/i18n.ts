"use client"

import React from "react"
import { create } from "zustand"

export type Lang = "id" | "en"

/* ── Store ── */
interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "id"
  try {
    const stored = localStorage.getItem("scw-lang")
    if (stored === "id" || stored === "en") return stored
  } catch {}
  return "id"
}

export const useLangStore = create<LangState>((set) => ({
  lang: getInitialLang(),
  setLang: (lang) => {
    try {
      localStorage.setItem("scw-lang", lang)
    } catch {}
    set({ lang })
  },
}))

/* ── App chrome (navbar, sidebar, modules page) ── */
const chrome: Record<Lang, Record<string, string>> = {
  id: {
    "nav.home": "Beranda",
    "nav.search": "Cari...",
    "nav.profile": "Profil",
    "nav.logout": "Keluar",
    "nav.language": "Bahasa",
    "sidebar.notifications": "Notifikasi",
    "sidebar.switchModule": "Ganti Modul",
    "modules.title": "Pilih Modul",
    "modules.subtitle":
      "Pilih modul yang ingin kamu akses. Sidebar akan menyesuaikan dengan modul yang dipilih.",
    "modules.menu": "menu",
    "modules.open": "Buka",
    "modules.erp": "Sistem Manajemen ERP",
  },
  en: {
    "nav.home": "Home",
    "nav.search": "Search...",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "nav.language": "Language",
    "sidebar.notifications": "Notifications",
    "sidebar.switchModule": "Switch Module",
    "modules.title": "Choose Module",
    "modules.subtitle":
      "Pick the module you want to access. The sidebar adjusts to the selected module.",
    "modules.menu": "menus",
    "modules.open": "Open",
    "modules.erp": "ERP Management System",
  },
}

/* ── Module names & descriptions (keyed by module id) ── */
const moduleNames: Record<Lang, Record<string, string>> = {
  id: {
    sales: "Sales & CRM",
    operasional: "Operasional",
    accounting: "Akuntansi",
    ecommerce: "WebCommerce",
  },
  en: {
    sales: "Sales & CRM",
    operasional: "Operations",
    accounting: "Accounting",
    ecommerce: "WebCommerce",
  },
}

const moduleDescs: Record<Lang, Record<string, string>> = {
  id: {
    sales: "Kelola penjualan, customer, invoice, dan komisi sales",
    operasional: "Kelola inventory, gudang, pembelian, pengiriman, dan packing",
    accounting: "Pembukuan, jurnal, neraca, laporan keuangan, dan pajak",
    ecommerce: "Kelola toko online, katalog produk, dan order dari customer",
  },
  en: {
    sales: "Manage sales, customers, invoices, and commissions",
    operasional: "Manage inventory, warehouse, purchasing, shipping, and packing",
    accounting: "Bookkeeping, journals, balance sheet, financial reports, and tax",
    ecommerce: "Manage your online store, product catalog, and customer orders",
  },
}

/* ── Sidebar menu labels — only labels that differ from the source language ── */
const menuLabels: Record<Lang, Record<string, string>> = {
  id: {
    Dashboard: "Dasbor",
    Customers: "Pelanggan",
    Quotation: "Penawaran",
    "Sales Orders": "Sales Order",
    Invoices: "Faktur",
    Payments: "Pembayaran",
    Commission: "Komisi",
    "Sales Team": "Tim Sales",
    "Tiering Discount": "Diskon Bertingkat",
    Purchasing: "Pembelian",
    "Purchase Requests": "Permintaan Pembelian",
    "Price Quotations": "Penawaran Harga",
    "Purchase Orders": "Pesanan Pembelian",
    Logistic: "Logistik",
    Suppliers: "Pemasok",
    "Currency Rate": "Kurs Mata Uang",
    Inventory: "Inventori",
    "Damaged Items": "Barang Rusak",
    Reports: "Laporan",
    Products: "Produk",
    "Warehouse / Rak": "Gudang / Rak",
    "Packing Materials": "Material Packing",
    "Stock Alert": "Peringatan Stok",
    "Packing Slips": "Slip Packing",
    "Video Gallery": "Galeri Video",
    "Materials Stock": "Stok Material",
    Shipping: "Pengiriman",
    "Delivery Orders": "Surat Jalan",
    "Proof of Delivery": "Bukti Terima",
    Couriers: "Kurir",
    "Customer Returns": "Retur Pelanggan",
    Orders: "Pesanan",
    Banners: "Banner",
    Coupons: "Kupon",
    Reviews: "Ulasan",
  },
  en: {
    "Buku Besar": "General Ledger",
    "Akun Perkiraan": "Chart of Accounts",
    "Pencatatan Beban": "Expense Entry",
    "Jurnal Umum": "General Journal",
    Anggaran: "Budget",
    "Histori Akun": "Account History",
    "Log Aktifitas Jurnal": "Journal Activity Log",
    "Kas & Bank": "Cash & Bank",
    Pembayaran: "Payments",
    Penerimaan: "Receipts",
    "Transfer Bank": "Bank Transfer",
    "Rekening Koran": "Bank Statement",
    "Rekonsiliasi Bank": "Bank Reconciliation",
    "Histori Bank": "Bank History",
    Penjualan: "Sales",
    "Penawaran Penjualan": "Sales Quotation",
    "Pesanan Penjualan": "Sales Order",
    "Pengiriman Pesanan": "Delivery Order",
    "Uang Muka Penjualan": "Sales Down Payment",
    "Faktur Penjualan": "Sales Invoice",
    "Penerimaan Penjualan": "Sales Receipt",
    "Retur Penjualan": "Sales Return",
    "Kategori Pelanggan": "Customer Category",
    "Kategori Penjualan": "Sales Category",
    "Pelanggan Penyesuaian Harga/Diskon": "Price/Discount Adjustment",
    Pelanggan: "Customers",
    "Komisi Penjual": "Sales Commission",
    "Target Penjualan": "Sales Target",
    Persediaan: "Inventory",
    "Pemindahan Barang": "Stock Transfer",
    "Penyesuaian Persediaan": "Inventory Adjustment",
    "Pekerjaan Pesanan": "Job Order",
    "Penambahan Bahan Baku": "Raw Material Addition",
    "Penyelesaian Pesanan": "Order Completion",
    "Barang & Jasa": "Items & Services",
    Gudang: "Warehouse",
    "Satuan Barang": "Unit of Measure",
    "Kategori Barang": "Item Category",
    "Merek Barang": "Item Brand",
    "Barang Per Gudang": "Items per Warehouse",
    "Barang Stok Minimum": "Minimum Stock Items",
    Pembelian: "Purchasing",
    "Pesanan Pembelian": "Purchase Order",
    "Penerimaan Barang": "Goods Receipt",
    "Uang Muka Pembelian": "Purchase Down Payment",
    "Faktur Pembelian": "Purchase Invoice",
    "Pembayaran Pembelian": "Purchase Payment",
    "Retur Pembelian": "Purchase Return",
    "Harga Pemasok": "Supplier Price",
    "Kategori Pemasok": "Supplier Category",
    Pemasok: "Supplier",
    "Aset Tetap": "Fixed Assets",
    "Kategori Aset": "Asset Category",
    "Disposisi Aset Tetap": "Fixed Asset Disposal",
    Perusahaan: "Company",
    "Syarat Pembayaran": "Payment Terms",
    Pengiriman: "Delivery",
    "Gaji & Tunjangan": "Salary & Allowances",
    Karyawan: "Employees",
    "Transaksi Berulang": "Recurring Transactions",
    "Proses Akhir Bulan": "Month-End Process",
    Kontak: "Contacts",
    "Transaksi Favorit": "Favorite Transactions",
    Kalender: "Calendar",
    "Log Aktifitas": "Activity Log",
    "Laporan Keuangan": "Financial Reports",
    "Laba Rugi": "Profit & Loss",
    Neraca: "Balance Sheet",
    "Arus Kas": "Cash Flow",
    "Laporan Penjualan": "Sales Report",
    "Laporan Pembelian": "Purchase Report",
    "Laporan Hutang Piutang": "Payable & Receivable Report",
    Dasbor: "Dashboard",
  },
}

/* ── Breadcrumb labels (keyed by path segment) ── */
const breadcrumbs: Record<Lang, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    inventory: "Inventory",
    products: "Products",
    warehouse: "Warehouse / Rack",
    "stock-opname": "Stock Opname",
    "stock-alert": "Stock Alert",
    "packing-materials": "Packing Materials",
    purchasing: "Purchasing",
    orders: "Sales Orders",
    suppliers: "Suppliers",
    "usd-rate": "USD Rate",
    sales: "Sales",
    customers: "Customers",
    invoices: "Invoices",
    payments: "Payments",
    pipeline: "Pipeline",
    quotations: "Quotations",
    commission: "Commission",
    "top-customers": "Most-Buy Customers",
    "tiering-discount": "Tiering Discount",
    tiering: "Tiering Discount",
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
    "customer-returns": "Customer Returns",
    pod: "Proof of Delivery",
    logistic: "Logistic",
    requests: "Requests",
    damaged: "Damaged Items",
    reports: "Reports",
    "put-away": "Put Away",
    ecommerce: "WebCommerce",
    banners: "Banners",
    coupons: "Coupons",
    reviews: "Reviews",
    modules: "Modules",
    operasional: "Operations",
  },
  id: {
    dashboard: "Dasbor",
    inventory: "Inventori",
    products: "Produk",
    warehouse: "Gudang / Rak",
    "stock-opname": "Stok Opname",
    "stock-alert": "Peringatan Stok",
    "packing-materials": "Material Packing",
    purchasing: "Pembelian",
    orders: "Sales Order",
    suppliers: "Pemasok",
    "usd-rate": "Kurs USD",
    sales: "Penjualan",
    customers: "Pelanggan",
    invoices: "Faktur",
    payments: "Pembayaran",
    pipeline: "Pipeline",
    quotations: "Penawaran",
    commission: "Komisi",
    "top-customers": "Pelanggan Terbanyak",
    "tiering-discount": "Diskon Bertingkat",
    tiering: "Diskon Bertingkat",
    shipping: "Pengiriman",
    shipments: "Surat Jalan",
    couriers: "Kurir",
    packing: "Packing",
    queue: "Antrean Packing",
    videos: "Galeri Video",
    materials: "Stok Material",
    accounting: "Akuntansi",
    journal: "Jurnal",
    ledger: "Buku Besar",
    "balance-sheet": "Neraca",
    pnl: "Laba Rugi",
    "bank-reconciliation": "Rekonsiliasi Bank",
    "tax-pph": "Pajak PPh",
    "fixed-asset": "Aset Tetap",
    budget: "Anggaran",
    kpi: "KPI",
    webcommerce: "WebCommerce",
    catalog: "Katalog",
    notifications: "Notifikasi",
    settings: "Pengaturan",
    users: "Pengguna",
    roles: "Peran",
    "activity-log": "Log Aktivitas",
    "sales-team": "Tim Sales",
    "customer-returns": "Retur Pelanggan",
    pod: "Bukti Terima",
    logistic: "Logistik",
    requests: "Permintaan",
    damaged: "Barang Rusak",
    reports: "Laporan",
    "put-away": "Put Away",
    ecommerce: "WebCommerce",
    banners: "Banner",
    coupons: "Kupon",
    reviews: "Ulasan",
    modules: "Modul",
    operasional: "Operasional",
  },
}

/* ── Hook — mounted-gated to avoid hydration mismatch ── */
export function useT() {
  const lang = useLangStore((s) => s.lang)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])
  const active: Lang = mounted ? lang : "id"

  return {
    lang: active,
    mounted,
    t: (key: string) => chrome[active][key] ?? chrome.en[key] ?? key,
    tMenu: (label: string) => menuLabels[active][label] ?? label,
    tBreadcrumb: (segment: string) =>
      breadcrumbs[active][segment] ?? breadcrumbs.en[segment] ?? segment,
    tModule: (id: string) => moduleNames[active][id] ?? id,
    tModuleDesc: (id: string) => moduleDescs[active][id] ?? moduleDescs.id[id] ?? "",
  }
}
