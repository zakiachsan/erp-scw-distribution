// Shared dummy data for Accounting module — correlated across sub-modules
// All data references each other logically (accounts → journals, customers → invoices, etc.)

// ──────────────── ACCOUNTS (Akun Perkiraan) ────────────────
export interface Account {
  id: string; kode: string; nama: string; tipeAkun: "Kas & Bank" | "Piutang" | "Persediaan" | "Aset Lancar Lainnya" | "Aset Tetap" | "Kewajiban" | "Modal" | "Pendapatan" | "Beban" | "Beban Lain-lain"; saldo: number; nonAktif?: boolean
}
export const dummyAccounts: Account[] = [
  { id: "acc-1", kode: "110101", nama: "Kas Kecil", tipeAkun: "Kas & Bank", saldo: 15000000 },
  { id: "acc-2", kode: "110102", nama: "Bank BCA - Rekening Giro", tipeAkun: "Kas & Bank", saldo: 85000000 },
  { id: "acc-3", kode: "110103", nama: "Bank Mandiri", tipeAkun: "Kas & Bank", saldo: 120000000 },
  { id: "acc-4", kode: "110201", nama: "Deposito Bank 3 Bulan", tipeAkun: "Kas & Bank", saldo: 50000000 },
  { id: "acc-5", kode: "110301", nama: "Piutang Usaha", tipeAkun: "Piutang", saldo: 95000000 },
  { id: "acc-6", kode: "110302", nama: "Piutang Karyawan", tipeAkun: "Piutang", saldo: 5000000 },
  { id: "acc-7", kode: "110401", nama: "Persediaan Barang Dagang", tipeAkun: "Persediaan", saldo: 350000000 },
  { id: "acc-8", kode: "110402", nama: "Persediaan Bahan Baku", tipeAkun: "Persediaan", saldo: 75000000 },
  { id: "acc-9", kode: "110501", nama: "Perlengkapan Kantor", tipeAkun: "Aset Lancar Lainnya", saldo: 12000000 },
  { id: "acc-10", kode: "120101", nama: "Tanah", tipeAkun: "Aset Tetap", saldo: 2000000000 },
  { id: "acc-11", kode: "120201", nama: "Bangunan", tipeAkun: "Aset Tetap", saldo: 1500000000 },
  { id: "acc-12", kode: "120202", nama: "Akumulasi Penyusutan Bangunan", tipeAkun: "Aset Tetap", saldo: -150000000 },
  { id: "acc-13", kode: "120301", nama: "Kendaraan Operasional", tipeAkun: "Aset Tetap", saldo: 450000000 },
  { id: "acc-14", kode: "120302", nama: "Akumulasi Penyusutan Kendaraan", tipeAkun: "Aset Tetap", saldo: -90000000 },
  { id: "acc-15", kode: "210101", nama: "Hutang Usaha", tipeAkun: "Kewajiban", saldo: 120000000 },
  { id: "acc-16", kode: "210201", nama: "Hutang Bank", tipeAkun: "Kewajiban", saldo: 500000000 },
  { id: "acc-17", kode: "310101", nama: "Modal Disetor", tipeAkun: "Modal", saldo: 4000000000 },
  { id: "acc-18", kode: "310201", nama: "Laba Ditahan", tipeAkun: "Modal", saldo: 500000000 },
  { id: "acc-19", kode: "400101", nama: "Pendapatan Penjualan", tipeAkun: "Pendapatan", saldo: 0 },
  { id: "acc-20", kode: "400201", nama: "Pendapatan Jasa", tipeAkun: "Pendapatan", saldo: 0 },
  { id: "acc-21", kode: "500101", nama: "Beban Gaji Karyawan", tipeAkun: "Beban", saldo: 0 },
  { id: "acc-22", kode: "500201", nama: "Beban Listrik & Air", tipeAkun: "Beban", saldo: 0 },
  { id: "acc-23", kode: "500301", nama: "Beban Sewa Kantor", tipeAkun: "Beban", saldo: 0 },
  { id: "acc-24", kode: "500401", nama: "Beban Transportasi", tipeAkun: "Beban", saldo: 0 },
  { id: "acc-25", kode: "500501", nama: "Beban ATK", tipeAkun: "Beban", saldo: 0 },
  { id: "acc-26", kode: "500601", nama: "Beban Telepon & Internet", tipeAkun: "Beban", saldo: 0 },
  { id: "acc-27", kode: "510101", nama: "Beban Pokok Penjualan", tipeAkun: "Beban", saldo: 0 },
  { id: "acc-28", kode: "600101", nama: "Beban Bunga Pinjaman", tipeAkun: "Beban Lain-lain", saldo: 0 },
]

// ──────────────── CUSTOMERS (Pelanggan) ────────────────
export interface Customer {
  id: string; nama: string; idPelanggan: string; kategori: string; hp: string; email: string; alamat: string; kota: string; saldo: number; npwp?: string; syaratPembayaran?: string; nonAktif?: boolean
}
export const dummyCustomers: Customer[] = [
  { id: "cus-1", nama: "PT Maju Bersama", idPelanggan: "CUST-001", kategori: "General", hp: "081234567890", email: "maju@bersama.co.id", alamat: "Jl. Sudirman No. 45", kota: "Jakarta Pusat", saldo: 45000000, npwp: "01.234.567.8-012.000", syaratPembayaran: "Net 30" },
  { id: "cus-2", nama: "CV Karya Mandiri", idPelanggan: "CUST-002", kategori: "General", hp: "081298765432", email: "info@karyamandiri.com", alamat: "Jl. Merdeka No. 21", kota: "Bandung", saldo: 28500000, npwp: "02.345.678.9-013.000", syaratPembayaran: "Net 15" },
  { id: "cus-3", nama: "UD Sukses Selalu", idPelanggan: "CUST-003", kategori: "General", hp: "085612345678", email: "sukses@selalu.com", alamat: "Jl. Pemuda No. 88", kota: "Surabaya", saldo: 12000000, syaratPembayaran: "COD" },
  { id: "cus-4", nama: "PT Teknindo Solusi", idPelanggan: "CUST-004", kategori: "VIP", hp: "087812345678", email: "admin@teknindo.com", alamat: "Jl. Gatot Subroto No. 12", kota: "Jakarta Selatan", saldo: 75000000, npwp: "03.456.789.0-014.000", syaratPembayaran: "Net 30" },
  { id: "cus-5", nama: "Toko Berkah Abadi", idPelanggan: "CUST-005", kategori: "General", hp: "089812345678", email: "toko@berkahabadi.com", alamat: "Jl. Ahmad Yani No. 56", kota: "Medan", saldo: 8500000, syaratPembayaran: "Net 7" },
]

// ──────────────── SUPPLIERS (Pemasok) ────────────────
export interface Supplier {
  id: string; nama: string; idPemasok: string; kategori: string; hp: string; email: string; alamat: string; kota: string; saldo: number; npwp?: string; syaratPembayaran?: string
}
export const dummySuppliers: Supplier[] = [
  { id: "sup-1", nama: "PT Sumber Makmur", idPemasok: "SUP-001", kategori: "General", hp: "082112345678", email: "sales@sumbermakmur.co.id", alamat: "Jl. Industri No. 30", kota: "Jakarta Utara", saldo: 35000000, npwp: "11.234.567.8-021.000", syaratPembayaran: "Net 30" },
  { id: "sup-2", nama: "CV Sinar Jaya", idPemasok: "SUP-002", kategori: "General", hp: "082187654321", email: "order@sinarjaya.com", alamat: "Jl. Pahlawan No. 15", kota: "Semarang", saldo: 18000000, npwp: "12.345.678.9-022.000", syaratPembayaran: "Net 15" },
  { id: "sup-3", nama: "PT Indo Baja Utama", idPemasok: "SUP-003", kategori: "VIP", hp: "082134567890", email: "info@indobaja.com", alamat: "Jl. Raya Industri No. 100", kota: "Jakarta Pusat", saldo: 65000000, npwp: "13.456.789.0-023.000", syaratPembayaran: "Net 45" },
  { id: "sup-4", nama: "UD Sumber Rezeki", idPemasok: "SUP-004", kategori: "General", hp: "087890123456", email: "tokosumrez@gmail.com", alamat: "Jl. Diponegoro No. 22", kota: "Yogyakarta", saldo: 5500000, syaratPembayaran: "COD" },
]

// ──────────────── PRODUCTS (Barang & Jasa) ────────────────
export interface Product {
  id: string; nama: string; kode: string; jenis: "Persediaan" | "Jasa" | "Aset"; satuan: string; hargaBeli: number; hargaJual: number; stok: number; kategori: string; merek: string; stokMin: number
}
export const dummyProducts: Product[] = [
  { id: "prd-1", nama: "SCW Snow Foam", kode: "SCW-SF-001", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 45000, hargaJual: 60000, stok: 245, kategori: "Exterior", merek: "SCW", stokMin: 10 },
  { id: "prd-2", nama: "SCW Ceramic Coating", kode: "SCW-CC-002", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 185000, hargaJual: 240000, stok: 12, kategori: "Coating", merek: "SCW", stokMin: 10 },
  { id: "prd-3", nama: "SCW Interior Detailer", kode: "SCW-ID-003", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 55000, hargaJual: 72000, stok: 180, kategori: "Interior", merek: "SCW", stokMin: 10 },
  { id: "prd-4", nama: "SCW Tire Gel", kode: "SCW-TG-004", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 42000, hargaJual: 55000, stok: 95, kategori: "Exterior", merek: "SCW", stokMin: 10 },
  { id: "prd-5", nama: "SCW Clay Bar", kode: "SCW-CB-005", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 35000, hargaJual: 45500, stok: 0, kategori: "Prep", merek: "SCW", stokMin: 10 },
  { id: "prd-6", nama: "SCW Microfiber Wash", kode: "SCW-MW-006", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 38000, hargaJual: 50000, stok: 312, kategori: "Wash", merek: "SCW", stokMin: 10 },
  { id: "prd-7", nama: "SCW Polish Compound", kode: "SCW-PC-007", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 95000, hargaJual: 124000, stok: 8, kategori: "Correction", merek: "SCW", stokMin: 10 },
  { id: "prd-8", nama: "SCW Spray Wax", kode: "SCW-SW-008", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 52000, hargaJual: 68000, stok: 156, kategori: "Protection", merek: "SCW", stokMin: 10 },
  { id: "prd-9", nama: "SCW Glass Cleaner", kode: "SCW-GC-009", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 32000, hargaJual: 42000, stok: 200, kategori: "Interior", merek: "SCW", stokMin: 10 },
  { id: "prd-10", nama: "SCW Leather Conditioner", kode: "SCW-LC-010", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 68000, hargaJual: 90000, stok: 45, kategori: "Interior", merek: "SCW", stokMin: 10 },
  { id: "prd-11", nama: "SCW All Purpose Cleaner", kode: "SCW-AW-011", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 36000, hargaJual: 47000, stok: 5, kategori: "Wash", merek: "SCW", stokMin: 10 },
  { id: "prd-12", nama: "SCW Trim Restorer", kode: "SCW-TR-012", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 58000, hargaJual: 75000, stok: 67, kategori: "Exterior", merek: "SCW", stokMin: 10 },
  { id: "prd-13", nama: "SCW Brake Dust Remover", kode: "SCW-BR-013", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 48000, hargaJual: 62000, stok: 0, kategori: "Wheel", merek: "SCW", stokMin: 10 },
  { id: "prd-14", nama: "SCW Foam Pad", kode: "SCW-FP-014", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 22000, hargaJual: 29000, stok: 88, kategori: "Tools", merek: "SCW", stokMin: 10 },
  { id: "prd-15", nama: "SCW Microfiber Towel", kode: "SCW-MF-015", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 15000, hargaJual: 20000, stok: 520, kategori: "Tools", merek: "SCW", stokMin: 10 },
  { id: "prd-16", nama: "SCW Dashboard Coating", kode: "SCW-DC-016", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 75000, hargaJual: 100000, stok: 33, kategori: "Interior", merek: "SCW", stokMin: 10 },
  { id: "prd-17", nama: "SCW Iron Decontamination", kode: "SCW-IL-017", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 88000, hargaJual: 115000, stok: 14, kategori: "Decon", merek: "SCW", stokMin: 10 },
  { id: "prd-18", nama: "SCW Shampoo Plus", kode: "SCW-SP-018", jenis: "Persediaan", satuan: "Pcs", hargaBeli: 40000, hargaJual: 52000, stok: 275, kategori: "Wash", merek: "SCW", stokMin: 10 },
]

// ──────────────── WAREHOUSES (Gudang) ────────────────
export interface Warehouse {
  id: string; nama: string; alamat: string; penanggungJawab: string
}
export const dummyWarehouses: Warehouse[] = [
  { id: "wh-1", nama: "Gudang Pusat", alamat: "Jl. Industri No. 10, Jakarta Utara", penanggungJawab: "Budi Santoso" },
  { id: "wh-2", nama: "Gudang Bandung", alamat: "Jl. Soekarno Hatta No. 45, Bandung", penanggungJawab: "Asep Sunandar" },
  { id: "wh-3", nama: "Gudang Surabaya", alamat: "Jl. Raya Waru No. 88, Surabaya", penanggungJawab: "Dian Prasetyo" },
]

// ──────────────── PURCHASE ORDERS ────────────────
export interface PurchaseOrder {
  id: string; nomor: string; noFaktur: string; tanggal: string; pemasok: string; pemasokId: string; keterangan: string; status: "Draft" | "Approved" | "Received" | "Billed"; total: number; items: POItem[]
}
export interface POItem { namaBarang: string; kodeBarang: string; qty: number; satuan: string; harga: number; diskon: number; total: number }
export const dummyPurchaseOrders: PurchaseOrder[] = [
  { id: "po-1", nomor: "PO/2026/07/001", noFaktur: "INV/2026/07/SP-001", tanggal: "01/07/2026", pemasok: "PT Sumber Makmur", pemasokId: "sup-1", keterangan: "Pembelian produk detailing", status: "Received", total: 8810000, items: [
    { namaBarang: "SCW Snow Foam", kodeBarang: "SCW-SF-001", qty: 50, satuan: "Pcs", harga: 85000, diskon: 0, total: 4250000 },
    { namaBarang: "SCW Ceramic Coating", kodeBarang: "SCW-CC-002", qty: 20, satuan: "Pcs", harga: 110000, diskon: 0, total: 2200000 },
    { namaBarang: "SCW Interior Detailer", kodeBarang: "SCW-ID-003", qty: 5, satuan: "Pcs", harga: 450000, diskon: 50000, total: 2200000 },
    { namaBarang: "SCW Polish Compound", kodeBarang: "SCW-PC-007", qty: 1, satuan: "Pcs", harga: 180000, diskon: 20000, total: 160000 },
  ]},
  { id: "po-2", nomor: "PO/2026/07/002", noFaktur: "INV/2026/07/IJ-001", tanggal: "03/07/2026", pemasok: "CV Sinar Jaya", pemasokId: "sup-2", keterangan: "Restok produk detailing", status: "Approved", total: 3880000, items: [
    { namaBarang: "SCW Clay Bar", kodeBarang: "SCW-CB-005", qty: 30, satuan: "Pcs", harga: 58000, diskon: 0, total: 1740000 },
    { namaBarang: "SCW Microfiber Wash", kodeBarang: "SCW-MW-006", qty: 20, satuan: "Pcs", harga: 78000, diskon: 0, total: 1560000 },
    { namaBarang: "SCW Tire Gel", kodeBarang: "SCW-TG-004", qty: 1, satuan: "Pcs", harga: 680000, diskon: 100000, total: 580000 },
  ]},
  { id: "po-3", nomor: "PO/2026/07/003", noFaktur: "INV/2026/07/IB-001", tanggal: "05/07/2026", pemasok: "PT Indo Baja Utama", pemasokId: "sup-3", keterangan: "Restok produk detailing", status: "Draft", total: 5820000, items: [
    { namaBarang: "SCW Snow Foam", kodeBarang: "SCW-SF-001", qty: 30, satuan: "Pcs", harga: 85000, diskon: 0, total: 2550000 },
    { namaBarang: "SCW Microfiber Wash", kodeBarang: "SCW-MW-006", qty: 30, satuan: "Pcs", harga: 78000, diskon: 0, total: 2340000 },
    { namaBarang: "SCW Interior Detailer", kodeBarang: "SCW-ID-003", qty: 2, satuan: "Pcs", harga: 450000, diskon: 100000, total: 800000 },
    { namaBarang: "SCW Polish Compound", kodeBarang: "SCW-PC-007", qty: 1, satuan: "Pcs", harga: 180000, diskon: 50000, total: 130000 },
  ]},
]

// ──────────────── SALES ORDERS ────────────────
export interface SalesOrder {
  id: string; nomor: string; tanggal: string; pelanggan: string; pelangganId: string; keterangan: string; status: "Draft" | "Approved" | "Shipped" | "Invoiced"; total: number; items: SOItem[]
}
export interface SOItem { namaBarang: string; kodeBarang: string; qty: number; satuan: string; harga: number; diskon: number; total: number }
export const dummySalesOrders: SalesOrder[] = [
  { id: "so-1", nomor: "SO/2026/07/001", tanggal: "02/07/2026", pelanggan: "PT Maju Bersama", pelangganId: "cus-1", keterangan: "Pesanan produk detailing", status: "Approved", total: 8200000, items: [
    { namaBarang: "SCW Snow Foam", kodeBarang: "SCW-SF-001", qty: 40, satuan: "Pcs", harga: 105000, diskon: 0, total: 4200000 },
    { namaBarang: "SCW Interior Detailer", kodeBarang: "SCW-ID-003", qty: 5, satuan: "Pcs", harga: 550000, diskon: 50000, total: 2700000 },
    { namaBarang: "SCW Polish Compound", kodeBarang: "SCW-PC-007", qty: 2, satuan: "Pcs", harga: 225000, diskon: 0, total: 450000 },
    { namaBarang: "SCW Spray Wax", kodeBarang: "SCW-SW-008", qty: 5, satuan: "Pcs", harga: 150000, diskon: 100000, total: 850000 },
  ]},
  { id: "so-2", nomor: "SO/2026/07/002", tanggal: "04/07/2026", pelanggan: "CV Karya Mandiri", pelangganId: "cus-2", keterangan: "Pesanan produk detailing", status: "Approved", total: 6100000, items: [
    { namaBarang: "SCW Ceramic Coating", kodeBarang: "SCW-CC-002", qty: 25, satuan: "Pcs", harga: 135000, diskon: 0, total: 3375000 },
    { namaBarang: "SCW Tire Gel", kodeBarang: "SCW-TG-004", qty: 2, satuan: "Pcs", harga: 820000, diskon: 50000, total: 1590000 },
    { namaBarang: "SCW Glass Cleaner", kodeBarang: "SCW-GC-009", qty: 3, satuan: "Pcs", harga: 350000, diskon: 150000, total: 1135000 },
  ]},
  { id: "so-3", nomor: "SO/2026/07/003", tanggal: "06/07/2026", pelanggan: "PT Teknindo Solusi", pelangganId: "cus-4", keterangan: "Pesanan produk detailing", status: "Draft", total: 4100000, items: [
    { namaBarang: "SCW Clay Bar", kodeBarang: "SCW-CB-005", qty: 50, satuan: "Pcs", harga: 72000, diskon: 0, total: 3600000 },
    { namaBarang: "SCW Polish Compound", kodeBarang: "SCW-PC-007", qty: 2, satuan: "Pcs", harga: 225000, diskon: 0, total: 450000 },
    { namaBarang: "SCW Spray Wax", kodeBarang: "SCW-SW-008", qty: 1, satuan: "Pcs", harga: 150000, diskon: 100000, total: 50000 },
  ]},
]

// ──────────────── PAYMENTS ────────────────
export interface Payment {
  id: string; nomor: string; tanggal: string; kasBank: string; noCek: string; nilai: number; keterangan: string; tipe: "penerimaan" | "pembayaran"; pelanggan?: string
}
export const dummyPayments: Payment[] = [
  { id: "pay-1", nomor: "PMB/2026/07/001", tanggal: "01/07/2026", kasBank: "Bank BCA", noCek: "CEK-001", nilai: 15000000, keterangan: "Pembayaran sewa kantor", tipe: "pembayaran" },
  { id: "pay-2", nomor: "PNR/2026/07/001", tanggal: "03/07/2026", kasBank: "Bank Mandiri", noCek: "-", nilai: 25000000, keterangan: "Penerimaan dari PT Maju Bersama", tipe: "penerimaan", pelanggan: "PT Maju Bersama" },
  { id: "pay-3", nomor: "PMB/2026/07/002", tanggal: "05/07/2026", kasBank: "Kas Kecil", noCek: "-", nilai: 5000000, keterangan: "Pembayaran ATK", tipe: "pembayaran" },
  { id: "pay-4", nomor: "PNR/2026/07/002", tanggal: "06/07/2026", kasBank: "Bank BCA", noCek: "-", nilai: 18000000, keterangan: "Penerimaan dari CV Karya Mandiri", tipe: "penerimaan", pelanggan: "CV Karya Mandiri" },
]

// ──────────────── EXPENSE RECORDS ────────────────
export interface ExpenseRecord {
  id: string; nomor: string; tanggal: string; jatuhTempo: string; total: number; dibayar: number; status: "Lunas" | "Belum Lunas"; keterangan: string
}
export const dummyExpenseRecords: ExpenseRecord[] = [
  { id: "exp-1", nomor: "EXP/2026/07/001", tanggal: "01/07/2026", jatuhTempo: "15/07/2026", total: 15000000, dibayar: 15000000, status: "Lunas", keterangan: "Sewa kantor Juli" },
  { id: "exp-2", nomor: "EXP/2026/07/002", tanggal: "03/07/2026", jatuhTempo: "17/07/2026", total: 5000000, dibayar: 5000000, status: "Lunas", keterangan: "ATK dan perlengkapan" },
  { id: "exp-3", nomor: "EXP/2026/07/003", tanggal: "05/07/2026", jatuhTempo: "19/07/2026", total: 3500000, dibayar: 0, status: "Belum Lunas", keterangan: "Tagihan telepon & internet" },
]

// ──────────────── JOURNAL ENTRIES ────────────────
export interface JournalEntry {
  id: string; nomor: string; noTrans: string; tanggal: string; keterangan: string; tipeTransaksi: "Jurnal Umum" | "Penyesuaian" | "Penutup"; total: number
}
export const dummyJournalEntries: JournalEntry[] = [
  { id: "jrn-1", nomor: "JU/2026/07/001", noTrans: "JV-001", tanggal: "01/07/2026", keterangan: "Pembayaran sewa kantor bulan Juli", tipeTransaksi: "Jurnal Umum", total: 15000000 },
  { id: "jrn-2", nomor: "JU/2026/07/002", noTrans: "JV-002", tanggal: "02/07/2026", keterangan: "Penerimaan piutang dari PT Maju Bersama", tipeTransaksi: "Jurnal Umum", total: 25000000 },
  { id: "jrn-3", nomor: "JU/2026/07/003", noTrans: "JV-003", tanggal: "03/07/2026", keterangan: "Pembelian ATK", tipeTransaksi: "Jurnal Umum", total: 5000000 },
  { id: "jrn-4", nomor: "JU/2026/07/004", noTrans: "JV-004", tanggal: "04/07/2026", keterangan: "Penjualan ke CV Karya Mandiri", tipeTransaksi: "Jurnal Umum", total: 6100000 },
]

// ──────────────── JOURNAL LINES (Rincian Jurnal) ────────────────
export interface JournalLine {
  id: string
  /** Source transaction id — links to SalesOrder, Payment, JournalEntry, etc. */
  sourceId: string
  /** Source type label for display */
  sourceType: string
  /** Source document number */
  sourceNo: string
  tanggal: string
  keterangan: string
  lines: { akun: string; namaAkun: string; debit: number; kredit: number }[]
}

export const dummyJournalLines: JournalLine[] = [
  {
    id: "jl-1", sourceId: "so-1", sourceType: "Faktur Penjualan", sourceNo: "SO/2026/07/001", tanggal: "02/07/2026",
    keterangan: "Penjualan ke PT Maju Bersama",
    lines: [
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 8200000, kredit: 0 },
      { akun: "400101", namaAkun: "Pendapatan Penjualan", debit: 0, kredit: 7350000 },
      { akun: "400201", namaAkun: "Pendapatan Jasa", debit: 0, kredit: 850000 },
    ],
  },
  {
    id: "jl-2", sourceId: "so-2", sourceType: "Faktur Penjualan", sourceNo: "SO/2026/07/002", tanggal: "04/07/2026",
    keterangan: "Penjualan ke CV Karya Mandiri",
    lines: [
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 6100000, kredit: 0 },
      { akun: "400101", namaAkun: "Pendapatan Penjualan", debit: 0, kredit: 4965000 },
      { akun: "400201", namaAkun: "Pendapatan Jasa", debit: 0, kredit: 1135000 },
    ],
  },
  {
    id: "jl-3", sourceId: "so-3", sourceType: "Faktur Penjualan", sourceNo: "SO/2026/07/003", tanggal: "06/07/2026",
    keterangan: "Penjualan ke PT Teknindo Solusi",
    lines: [
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 4100000, kredit: 0 },
      { akun: "400101", namaAkun: "Pendapatan Penjualan", debit: 0, kredit: 4050000 },
      { akun: "400201", namaAkun: "Pendapatan Jasa", debit: 0, kredit: 50000 },
    ],
  },
  {
    id: "jl-4", sourceId: "pay-1", sourceType: "Pembayaran", sourceNo: "PMB/2026/07/001", tanggal: "01/07/2026",
    keterangan: "Pembayaran sewa kantor bulan Juli",
    lines: [
      { akun: "500301", namaAkun: "Beban Sewa Kantor", debit: 15000000, kredit: 0 },
      { akun: "110102", namaAkun: "Bank BCA - Rekening Giro", debit: 0, kredit: 15000000 },
    ],
  },
  {
    id: "jl-5", sourceId: "pay-2", sourceType: "Penerimaan", sourceNo: "PNR/2026/07/001", tanggal: "03/07/2026",
    keterangan: "Penerimaan piutang dari PT Maju Bersama",
    lines: [
      { akun: "110103", namaAkun: "Bank Mandiri", debit: 25000000, kredit: 0 },
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 0, kredit: 25000000 },
    ],
  },
  {
    id: "jl-6", sourceId: "pay-3", sourceType: "Pembayaran", sourceNo: "PMB/2026/07/002", tanggal: "05/07/2026",
    keterangan: "Pembelian ATK",
    lines: [
      { akun: "500501", namaAkun: "Beban ATK", debit: 5000000, kredit: 0 },
      { akun: "110101", namaAkun: "Kas Kecil", debit: 0, kredit: 5000000 },
    ],
  },
  {
    id: "jl-7", sourceId: "pay-4", sourceType: "Penerimaan", sourceNo: "PNR/2026/07/002", tanggal: "06/07/2026",
    keterangan: "Penerimaan piutang dari CV Karya Mandiri",
    lines: [
      { akun: "110102", namaAkun: "Bank BCA - Rekening Giro", debit: 18000000, kredit: 0 },
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 0, kredit: 18000000 },
    ],
  },
  {
    id: "jl-8", sourceId: "jrn-1", sourceType: "Jurnal Umum", sourceNo: "JU/2026/07/001", tanggal: "01/07/2026",
    keterangan: "Pembayaran sewa kantor bulan Juli",
    lines: [
      { akun: "500301", namaAkun: "Beban Sewa Kantor", debit: 15000000, kredit: 0 },
      { akun: "110102", namaAkun: "Bank BCA - Rekening Giro", debit: 0, kredit: 15000000 },
    ],
  },
  {
    id: "jl-9", sourceId: "jrn-2", sourceType: "Jurnal Umum", sourceNo: "JU/2026/07/002", tanggal: "02/07/2026",
    keterangan: "Penerimaan piutang dari PT Maju Bersama",
    lines: [
      { akun: "110103", namaAkun: "Bank Mandiri", debit: 25000000, kredit: 0 },
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 0, kredit: 25000000 },
    ],
  },
  {
    id: "jl-10", sourceId: "jrn-3", sourceType: "Jurnal Umum", sourceNo: "JU/2026/07/003", tanggal: "03/07/2026",
    keterangan: "Pembelian ATK",
    lines: [
      { akun: "500501", namaAkun: "Beban ATK", debit: 5000000, kredit: 0 },
      { akun: "110101", namaAkun: "Kas Kecil", debit: 0, kredit: 5000000 },
    ],
  },
  {
    id: "jl-11", sourceId: "jrn-4", sourceType: "Jurnal Umum", sourceNo: "JU/2026/07/004", tanggal: "04/07/2026",
    keterangan: "Penjualan ke CV Karya Mandiri",
    lines: [
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 6100000, kredit: 0 },
      { akun: "400101", namaAkun: "Pendapatan Penjualan", debit: 0, kredit: 4965000 },
      { akun: "400201", namaAkun: "Pendapatan Jasa", debit: 0, kredit: 1135000 },
    ],
  },
  {
    id: "jl-12", sourceId: "sr-1", sourceType: "Retur Penjualan", sourceNo: "SR/2026/07/001", tanggal: "05/07/2026",
    keterangan: "Retur produk cacat — PT Maju Bersama",
    lines: [
      { akun: "400101", namaAkun: "Pendapatan Penjualan", debit: 1525000, kredit: 0 },
      { akun: "400201", namaAkun: "Pendapatan Jasa", debit: 575000, kredit: 0 },
      { akun: "110301", namaAkun: "Piutang Usaha", debit: 0, kredit: 2100000 },
    ],
  },
]

/** Lookup journal lines by source transaction id */
export function getJournalLinesBySource(sourceId: string): JournalLine | undefined {
  return dummyJournalLines.find((jl) => jl.sourceId === sourceId)
}

// ──────────────── BANK RECORDS ────────────────
export interface BankRecord {
  id: string; tanggal: string; kasBank: string; noSumber: string; noCek: string; tipeTransaksi: string; keterangan: string; mutasi: number; tipe: "Debit" | "Kredit"; saldo: number
}
export const dummyBankRecords: BankRecord[] = [
  { id: "br-1", tanggal: "01/07/2026", kasBank: "Bank BCA", noSumber: "SO/2026/07/001", noCek: "CEK-001", tipeTransaksi: "Pembayaran", keterangan: "Sewa kantor Juli", mutasi: -15000000, tipe: "Debit", saldo: 85000000 },
  { id: "br-2", tanggal: "03/07/2026", kasBank: "Bank BCA", noSumber: "SO/2026/07/002", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Pelunasan dari PT Maju Bersama", mutasi: 25000000, tipe: "Kredit", saldo: 110000000 },
  { id: "br-3", tanggal: "05/07/2026", kasBank: "Bank Mandiri", noSumber: "PO/2026/07/001", noCek: "-", tipeTransaksi: "Pembayaran", keterangan: "Pembelian ATK", mutasi: -5000000, tipe: "Debit", saldo: 105000000 },
  { id: "br-4", tanggal: "06/07/2026", kasBank: "Bank Mandiri", noSumber: "SO/2026/07/003", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Uang muka dari PT Teknindo", mutasi: 15000000, tipe: "Kredit", saldo: 120000000 },
]

// ──────────────── SALES RETURNS ────────────────
export interface SalesReturn {
  id: string; nomor: string; tanggal: string; pelanggan: string; keterangan: string; total: number; items: SOItem[]
}
export const dummySalesReturns: SalesReturn[] = [
  { id: "sr-1", nomor: "SR/2026/07/001", tanggal: "05/07/2026", pelanggan: "PT Maju Bersama", keterangan: "Retur produk cacat", total: 2100000, items: [
    { namaBarang: "SCW Snow Foam", kodeBarang: "SCW-SF-001", qty: 2, satuan: "Pcs", harga: 105000, diskon: 0, total: 210000 },
    { namaBarang: "SCW Interior Detailer", kodeBarang: "SCW-ID-003", qty: 2, satuan: "Pcs", harga: 550000, diskon: 0, total: 1100000 },
    { namaBarang: "SCW Polish Compound", kodeBarang: "SCW-PC-007", qty: 1, satuan: "Pcs", harga: 225000, diskon: 0, total: 225000 },
    { namaBarang: "SCW Spray Wax", kodeBarang: "SCW-SW-008", qty: 2, satuan: "Pcs", harga: 150000, diskon: 35000, total: 565000 },
  ]},
]

// ──────────────── ASSET CATEGORIES (Kategori Aset) ────────────────
export interface AssetCategory { id: string; nama: string; kode: string; keterangan?: string }
export const dummyAssetCategories: AssetCategory[] = [
  { id: "kat-1", nama: "Kendaraan", kode: "KAT-KEND", keterangan: "Kendaraan operasional kantor dan distribusi" },
  { id: "kat-2", nama: "Mesin Produksi", kode: "KAT-MESIN", keterangan: "Mesin untuk produksi dan manufaktur" },
  { id: "kat-3", nama: "Elektronik", kode: "KAT-ELEK", keterangan: "Laptop, komputer, AC, dan perangkat elektronik" },
  { id: "kat-4", nama: "Gedung", kode: "KAT-GDG", keterangan: "Bangunan kantor dan gudang" },
  { id: "kat-5", nama: "Peralatan Kantor", kode: "KAT-ALK", keterangan: "Meja, kursi, lemari, dan furnitur kantor" },
  { id: "kat-6", nama: "Tanah", kode: "KAT-TNH", keterangan: "Tanah kavling untuk lokasi usaha" },
]

// ──────────────── ASSETS ────────────────
export interface FixedAsset {
  id: string; nomor: string; nama: string; kategori: string; tanggalBeli: string; kuantitas: number; hargaPerolehan: number; totalNilai: number; nilaiBuku: number; umurEkonomis: number; metodePenyusutan: string; penyusutanBulanan: number; status: "Aktif" | "Disposed"; lokasi?: string; catatan?: string
}
export const dummyFixedAssets: FixedAsset[] = [
  { id: "fa-1", nomor: "FA-001", nama: "Toyota Avanza 2024", kategori: "Kendaraan", tanggalBeli: "15/01/2024", kuantitas: 1, hargaPerolehan: 250000000, totalNilai: 250000000, nilaiBuku: 208333333, umurEkonomis: 8, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 2604167, status: "Aktif", lokasi: "Gudang Pusat", catatan: "Kendaraan operasional sales" },
  { id: "fa-2", nomor: "FA-002", nama: "Mesin CNC Milling", kategori: "Mesin", tanggalBeli: "20/03/2024", kuantitas: 1, hargaPerolehan: 450000000, totalNilai: 450000000, nilaiBuku: 403125000, umurEkonomis: 10, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 3750000, status: "Aktif", lokasi: "Workshop Bandung", catatan: "Mesin utama produksi" },
  { id: "fa-3", nomor: "FA-003", nama: "Laptop Dell Inspiron", kategori: "Elektronik", tanggalBeli: "01/01/2026", kuantitas: 5, hargaPerolehan: 12000000, totalNilai: 60000000, nilaiBuku: 56250000, umurEkonomis: 4, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 1250000, status: "Aktif", lokasi: "Kantor Pusat" },
  { id: "fa-4", nomor: "FA-004", nama: "AC Split 2 PK", kategori: "Elektronik", tanggalBeli: "15/06/2026", kuantitas: 3, hargaPerolehan: 6500000, totalNilai: 19500000, nilaiBuku: 19256250, umurEkonomis: 5, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 325000, status: "Aktif", lokasi: "Kantor Pusat" },
  { id: "fa-5", nomor: "FA-005", nama: "Gedung Kantor Pusat", kategori: "Gedung", tanggalBeli: "10/05/2023", kuantitas: 1, hargaPerolehan: 1500000000, totalNilai: 1500000000, nilaiBuku: 1425000000, umurEkonomis: 20, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 6250000, status: "Aktif", lokasi: "Kantor Pusat" },
  { id: "fa-6", nomor: "FA-006", nama: "Meja Kerja Kantor Set", kategori: "Peralatan Kantor", tanggalBeli: "12/03/2025", kuantitas: 15, hargaPerolehan: 3500000, totalNilai: 52500000, nilaiBuku: 44625000, umurEkonomis: 7, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 625000, status: "Aktif", lokasi: "Kantor Pusat" },
  { id: "fa-7", nomor: "FA-007", nama: "Forklift Caterpillar", kategori: "Mesin", tanggalBeli: "05/08/2024", kuantitas: 1, hargaPerolehan: 180000000, totalNilai: 180000000, nilaiBuku: 153000000, umurEkonomis: 10, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 1500000, status: "Aktif", lokasi: "Gudang Surabaya" },
  { id: "fa-8", nomor: "FA-008", nama: "Tanah Kavling Surabaya", kategori: "Tanah", tanggalBeli: "20/02/2023", kuantitas: 1, hargaPerolehan: 800000000, totalNilai: 800000000, nilaiBuku: 800000000, umurEkonomis: 0, metodePenyusutan: "Tidak Disusutkan", penyusutanBulanan: 0, status: "Aktif", lokasi: "Surabaya" },
  { id: "fa-9", nomor: "FA-009", nama: "Printer Canon LBP 810", kategori: "Elektronik", tanggalBeli: "15/06/2023", kuantitas: 1, hargaPerolehan: 4500000, totalNilai: 4500000, nilaiBuku: 0, umurEkonomis: 5, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 75000, status: "Disposed", lokasi: "Kantor Pusat", catatan: "Rusak total - sudah tidak bisa diperbaiki, dihapuskan 15/03/2026" },
  { id: "fa-10", nomor: "FA-010", nama: "Honda Beat 2021", kategori: "Kendaraan", tanggalBeli: "10/08/2021", kuantitas: 1, hargaPerolehan: 18500000, totalNilai: 18500000, nilaiBuku: 3083333, umurEkonomis: 6, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 256944, status: "Disposed", lokasi: "Kantor Pusat", catatan: "Dijual kepada karyawan pada 20/05/2026 seharga Rp 4.500.000" },
]

// ──────────────── ASSET CHANGE LOG (Perubahan Aset Tetap) ────────────────
export interface AssetChange {
  id: string; tanggal: string; kodeAset: string; namaAset: string; field: string; nilaiLama: string; nilaiBaru: string; pengguna: string; keterangan: string
}
export const dummyAssetChanges: AssetChange[] = [
  { id: "ch-1", tanggal: "12/04/2026", kodeAset: "FA-003", namaAset: "Laptop Dell Inspiron", field: "Lokasi", nilaiLama: "Gudang Pusat", nilaiBaru: "Kantor Pusat", pengguna: "Admin Akunting", keterangan: "Relokasi setelah reorganisasi kantor" },
  { id: "ch-2", tanggal: "15/03/2026", kodeAset: "FA-009", namaAset: "Printer Canon LBP 810", field: "Status", nilaiLama: "Aktif", nilaiBaru: "Disposed", pengguna: "Budi Santoso", keterangan: "Aset rusak total, dihapuskan dari buku besar" },
  { id: "ch-3", tanggal: "20/05/2026", kodeAset: "FA-010", namaAset: "Honda Beat 2021", field: "Status", nilaiLama: "Aktif", nilaiBaru: "Disposed", pengguna: "Sari Dewi", keterangan: "Dijual ke karyawan - sale proceeds Rp 4.5jt" },
  { id: "ch-4", tanggal: "01/06/2026", kodeAset: "FA-004", namaAset: "AC Split 2 PK", field: "Metode Penyusutan", nilaiLama: "Saldo Menurun", nilaiBaru: "Garis Lurus", pengguna: "Admin Akunting", keterangan: "Perubahan metode per kebijakan akuntansi baru" },
  { id: "ch-5", tanggal: "10/06/2026", kodeAset: "FA-007", namaAset: "Forklift Caterpillar", field: "Umur Ekonomis", nilaiLama: "8 tahun", nilaiBaru: "10 tahun", pengguna: "Admin Akunting", keterangan: "Penyesuaian estimasi umur ekonomis" },
  { id: "ch-6", tanggal: "18/06/2026", kodeAset: "FA-001", namaAset: "Toyota Avanza 2024", field: "Penanggung Jawab", nilaiLama: "Andi Wijaya", nilaiBaru: "Rina Astuti", pengguna: "Admin Operasional", keterangan: "Mutasi PIC kendaraan operasional" },
  { id: "ch-7", tanggal: "22/06/2026", kodeAset: "FA-006", namaAset: "Meja Kerja Kantor Set", field: "Lokasi", nilaiLama: "Lantai 1", nilaiBaru: "Lantai 2 & 3", pengguna: "Admin Operasional", keterangan: "Penataan ulang ruang kantor" },
  { id: "ch-8", tanggal: "28/06/2026", kodeAset: "FA-002", namaAset: "Mesin CNC Milling", field: "Catatan", nilaiLama: "Mesin produksi", nilaiBaru: "Mesin utama produksi + overhaul Q2", pengguna: "Ahmad Fauzi", keterangan: "Update catatan setelah maintenance besar" },
  { id: "ch-9", tanggal: "02/07/2026", kodeAset: "FA-005", namaAset: "Gedung Kantor Pusat", field: "Asuransi", nilaiLama: "Tidak diasuransikan", nilaiBaru: "Asuransi all-risk Rp 2 M", pengguna: "Admin Akunting", keterangan: "Pengaktifan polis asuransi property" },
  { id: "ch-10", tanggal: "05/07/2026", kodeAset: "FA-008", namaAset: "Tanah Kavling Surabaya", field: "Sertifikat", nilaiLama: "Dalam proses", nilaiBaru: "Sertifikat HM atas nama PT", pengguna: "Admin Legal", keterangan: "Sertifikat tanah sudah terbit" },
]

// ──────────────── ASSET DISPOSITIONS (Disposisi Aset Tetap) ────────────────
export interface AssetDisposition {
  id: string; tanggal: string; kodeAset: string; namaAset: string; nilaiBuku: number; hargaJual: number; selisih: number; metode: "Dijual" | "Dihapuskan" | "Ditukar"; keterangan: string
}
export const dummyAssetDispositions: AssetDisposition[] = [
  { id: "disp-1", tanggal: "15/03/2026", kodeAset: "FA-009", namaAset: "Printer Canon LBP 810", nilaiBuku: 0, hargaJual: 0, selisih: 0, metode: "Dihapuskan", keterangan: "Rusak total - sudah tidak bisa diperbaiki" },
  { id: "disp-2", tanggal: "20/05/2026", kodeAset: "FA-010", namaAset: "Honda Beat 2021", nilaiBuku: 3083333, hargaJual: 4500000, selisih: 1416667, metode: "Dijual", keterangan: "Dijual kepada karyawan internal" },
  { id: "disp-3", tanggal: "10/01/2026", kodeAset: "FA-OLD-01", namaAset: "Meja Kantor Lipat", nilaiBuku: 250000, hargaJual: 150000, selisih: -100000, metode: "Dijual", keterangan: "Penjualan barang bekas kantor" },
  { id: "disp-4", tanggal: "22/02/2026", kodeAset: "FA-OLD-02", namaAset: "Lemari Arsip Besi", nilaiBuku: 0, hargaJual: 0, selisih: 0, metode: "Dihapuskan", keterangan: "Hilang saat relokasi kantor cabang" },
  { id: "disp-5", tanggal: "05/04/2026", kodeAset: "FA-OLD-03", namaAset: "Kursi Putar Bekas", nilaiBuku: 175000, hargaJual: 200000, selisih: 25000, metode: "Dijual", keterangan: "Penjualan lelang internal" },
  { id: "disp-6", tanggal: "18/04/2026", kodeAset: "FA-OLD-04", namaAset: "Komputer Desktop Lama", nilaiBuku: 450000, hargaJual: 600000, selisih: 150000, metode: "Ditukar", keterangan: "Ditukar dengan laptop baru (tambah bayar)" },
]

// ──────────────── ASSET TRANSFERS (Pindah Aset) ────────────────
export interface AssetTransfer {
  id: string; tanggal: string; kodeAset: string; namaAset: string; lokasiAsal: string; lokasiTujuan: string; penanggungJawab: string; keterangan: string
}
export const dummyAssetTransfers: AssetTransfer[] = [
  { id: "tr-1", tanggal: "12/04/2026", kodeAset: "FA-003", namaAset: "Laptop Dell Inspiron", lokasiAsal: "Gudang Pusat", lokasiTujuan: "Kantor Pusat", penanggungJawab: "Admin Operasional", keterangan: "Relokasi setelah reorganisasi" },
  { id: "tr-2", tanggal: "22/04/2026", kodeAset: "FA-001", namaAset: "Toyota Avanza 2024", lokasiAsal: "Kantor Pusat", lokasiTujuan: "Gudang Bandung", penanggungJawab: "Andi Wijaya", keterangan: "Penugasan operasional Bandung" },
  { id: "tr-3", tanggal: "05/05/2026", kodeAset: "FA-006", namaAset: "Meja Kerja Kantor Set", lokasiAsal: "Lantai 1", lokasiTujuan: "Lantai 3", penanggungJawab: "Admin Operasional", keterangan: "Penataan ulang ruang kantor" },
  { id: "tr-4", tanggal: "15/05/2026", kodeAset: "FA-002", namaAset: "Mesin CNC Milling", lokasiAsal: "Workshop Jakarta", lokasiTujuan: "Workshop Bandung", penanggungJawab: "Ahmad Fauzi", keterangan: "Konsolidasi mesin produksi" },
  { id: "tr-5", tanggal: "01/06/2026", kodeAset: "FA-007", namaAset: "Forklift Caterpillar", lokasiAsal: "Gudang Pusat", lokasiTujuan: "Gudang Surabaya", penanggungJawab: "Dian Prasetyo", keterangan: "Penugasan di gudang baru" },
  { id: "tr-6", tanggal: "08/06/2026", kodeAset: "FA-004", namaAset: "AC Split 2 PK", lokasiAsal: "Gudang", lokasiTujuan: "Lantai 2 Kantor", penanggungJawab: "Admin Operasional", keterangan: "Pemasangan AC tambahan" },
  { id: "tr-7", tanggal: "20/06/2026", kodeAset: "FA-003", namaAset: "Laptop Dell Inspiron (2 unit)", lokasiAsal: "Kantor Pusat", lokasiTujuan: "Workshop Bandung", penanggungJawab: "Admin IT", keterangan: "Untuk teknisi workshop" },
  { id: "tr-8", tanggal: "28/06/2026", kodeAset: "FA-006", namaAset: "Meja Kerja Kantor Set (5 unit)", lokasiAsal: "Kantor Pusat", lokasiTujuan: "Gudang Bandung", penanggungJawab: "Admin Operasional", keterangan: "Penataan cabang Bandung" },
]

// ──────────────── INVENTORY MOVEMENTS ────────────────
export interface InventoryMovement {
  id: string; nomor: string; tanggal: string; tipe: "Kirim" | "Terima"; gudangAsal: string; gudangTujuan: string; keterangan: string; status: string; items: { namaBarang: string; kode: string; qty: number; satuan: string }[]
}
export const dummyInventoryMovements: InventoryMovement[] = [
  { id: "im-1", nomor: "PMB/2026/07/001", tanggal: "02/07/2026", tipe: "Kirim", gudangAsal: "Gudang Pusat", gudangTujuan: "Gudang Bandung", keterangan: "Pengiriman stok produk", status: "Dikirim", items: [
    { namaBarang: "SCW Snow Foam", kode: "SCW-SF-001", qty: 20, satuan: "Pcs" },
    { namaBarang: "SCW Ceramic Coating", kode: "SCW-CC-002", qty: 10, satuan: "Pcs" },
  ]},
  { id: "im-2", nomor: "PMB/2026/07/002", tanggal: "04/07/2026", tipe: "Kirim", gudangAsal: "Gudang Pusat", gudangTujuan: "Gudang Surabaya", keterangan: "Pengiriman stok produk", status: "Dikirim", items: [
    { namaBarang: "SCW Clay Bar", kode: "SCW-CB-005", qty: 50, satuan: "Pcs" },
    { namaBarang: "SCW Microfiber Wash", kode: "SCW-MW-006", qty: 30, satuan: "Pcs" },
  ]},
]

// ──────────────── BUDGET (Anggaran) ────────────────
export interface Budget {
  id: string; nomor: string; nama: string; periode: string; totalAnggaran: number; realisasi: number; sisa: number; status: "On Track" | "Over Budget" | "Under Budget"
}
export const dummyBudgets: Budget[] = [
  { id: "bud-1", nomor: "ANG/2026/01", nama: "Anggaran Operasional 2026", periode: "Jan-Des 2026", totalAnggaran: 500000000, realisasi: 280000000, sisa: 220000000, status: "On Track" },
  { id: "bud-2", nomor: "ANG/2026/02", nama: "Anggaran Marketing 2026", periode: "Jan-Des 2026", totalAnggaran: 120000000, realisasi: 85000000, sisa: 35000000, status: "Over Budget" },
  { id: "bud-3", nomor: "ANG/2026/03", nama: "Anggaran IT 2026", periode: "Jan-Des 2026", totalAnggaran: 80000000, realisasi: 35000000, sisa: 45000000, status: "Under Budget" },
]

// ──────────────── EMPLOYEES ────────────────
export interface Employee {
  id: string; nama: string; posisi: string; email: string; hp: string; tglMasuk: string; statusKerja: "Tetap" | "Kontrak" | "Freelance"; npwp: string; utang: number
}
export const dummyEmployees: Employee[] = [
  { id: "emp-1", nama: "Budi Santoso", posisi: "Kepala Gudang", email: "budi@erpscw.co.id", hp: "081211223344", tglMasuk: "01/03/2023", statusKerja: "Tetap", npwp: "21.111.222.3-004.000", utang: 0 },
  { id: "emp-2", nama: "Sari Dewi", posisi: "Staff Admin", email: "sari@erpscw.co.id", hp: "081212345678", tglMasuk: "15/06/2024", statusKerja: "Tetap", npwp: "22.333.444.5-005.000", utang: 2500000 },
  { id: "emp-3", nama: "Ahmad Fauzi", posisi: "Teknisi", email: "ahmad@erpscw.co.id", hp: "085678901234", tglMasuk: "01/01/2025", statusKerja: "Kontrak", npwp: "23.555.666.7-006.000", utang: 0 },
]

// ──────────────── SALE TARGETS ────────────────
export interface SaleTarget {
  id: string; nama: string; tipe: string; dariTanggal: string; sdTanggal: string; items: { namaBarang: string; kode: string; kuantitas: number; nilai: number }[]
}
export const dummySaleTargets: SaleTarget[] = [
  { id: "st-1", nama: "Target Q3 2026", tipe: "Per Barang", dariTanggal: "01/07/2026", sdTanggal: "30/09/2026", items: [
    { namaBarang: "SCW Snow Foam", kode: "SCW-SF-001", kuantitas: 200, nilai: 12000000 },
    { namaBarang: "SCW Clay Bar", kode: "SCW-CB-005", kuantitas: 300, nilai: 13650000 },
  ]},
]

// ──────────────── COMMISSION ────────────────
export interface Commission {
  id: string; catatan: string; nama: string; periode: string; persentase: number; targetPenjualan: number
}
export const dummyCommissions: Commission[] = [
  { id: "com-1", catatan: "Komisi Q3", nama: "Komisi Penjualan Juli", periode: "Juli 2026", persentase: 2.5, targetPenjualan: 50000000 },
  { id: "com-2", catatan: "Komisi Spesial", nama: "Komisi Lebaran", periode: "Juli 2026", persentase: 5, targetPenjualan: 30000000 },
]

// ──────────────── PRICE ADJUSTMENTS ────────────────
export interface PriceAdjustment {
  id: string; nomor: string; mulaiBerlaku: string; kategori: string; keterangan: string; tipe: "Harga" | "Diskon"; items: { namaBarang: string; kode: string; satuan: string; hargaBaru: number }[]
}
export const dummyPriceAdjustments: PriceAdjustment[] = [
  { id: "pa-1", nomor: "PS/2026/07/001", mulaiBerlaku: "07/07/2026", kategori: "General", keterangan: "Kenaikan harga produk", tipe: "Harga", items: [
    { namaBarang: "SCW Snow Foam", kode: "SCW-SF-001", satuan: "Pcs", hargaBaru: 63000 },
    { namaBarang: "SCW Clay Bar", kode: "SCW-CB-005", satuan: "Pcs", hargaBaru: 48000 },
  ]},
]

// ──────────────── EMPLOYEE SALARIES ────────────────
export interface EmployeeSalary {
  id: string; nomor: string; tanggal: string; jatuhTempo: string; total: number; tipe: string; status: "Draft" | "Approved" | "Paid"; periode: string; keterangan: string
}
export const dummyEmployeeSalaries: EmployeeSalary[] = [
  { id: "es-1", nomor: "GAJI/2026/07/001", tanggal: "01/07/2026", jatuhTempo: "01/07/2026", total: 15000000, tipe: "Bulanan", status: "Paid", periode: "Juni 2026", keterangan: "Gaji karyawan tetap" },
]

// ──────────────── JOB ORDERS ────────────────
export interface JobOrder {
  id: string; nomor: string; tanggal: string; pelanggan: string; keterangan: string; status: "Draft" | "In Progress" | "Completed"
}
export const dummyJobOrders: JobOrder[] = [
  { id: "jo-1", nomor: "JO/2026/07/001", tanggal: "02/07/2026", pelanggan: "PT Maju Bersama", keterangan: "Pengerjaan detailing kendaraan", status: "In Progress" },
  { id: "jo-2", nomor: "JO/2026/07/002", tanggal: "05/07/2026", pelanggan: "CV Karya Mandiri", keterangan: "Pemasangan aksesori kendaraan", status: "Draft" },
]

// ──────────────── WORK ORDER COMPLETIONS ────────────────
export interface WorkOrderCompletion {
  id: string; nomor: string; tanggal: string; pekerjaanPesanan: string; tipePenyelesaian: string; keterangan: string
}
export const dummyWorkOrderCompletions: WorkOrderCompletion[] = [
  { id: "woc-1", nomor: "WP/2026/07/001", tanggal: "06/07/2026", pekerjaanPesanan: "JO/2026/07/001", tipePenyelesaian: "Barang", keterangan: "Penyelesaian detailing kendaraan" },
]

// ──────────────── RECURRING TRANSACTIONS ────────────────
export interface RecurringTransaction {
  id: string; nama: string; tipe: string; frekuensi: string; keterangan: string; nonAktif: boolean
}
export const dummyRecurringTransactions: RecurringTransaction[] = [
  { id: "rt-1", nama: "Sewa Kantor Bulanan", tipe: "Pembayaran", frekuensi: "Bulanan", keterangan: "Pembayaran sewa gedung kantor", nonAktif: false },
  { id: "rt-2", nama: "Tagihan Listrik", tipe: "Pembayaran", frekuensi: "Bulanan", keterangan: "Tagihan listrik bulanan", nonAktif: false },
]

// ──────────────── CONTACTS ────────────────
export interface Contact {
  id: string; nama: string; tipe: "Customer" | "Supplier" | "Other"; perusahaan: string; hp: string; email: string; alamat: string; catatan: string
}
export const dummyContacts: Contact[] = [
  { id: "ct-1", nama: "Budi Setiawan", tipe: "Customer", perusahaan: "PT Maju Bersama", hp: "081234567890", email: "budi@maju.com", alamat: "Jl. Sudirman 45, Jakarta", catatan: "PIC proyek" },
  { id: "ct-2", nama: "Rina Wijaya", tipe: "Supplier", perusahaan: "PT Sumber Makmur", hp: "082112345678", email: "rina@sumbermakmur.co.id", alamat: "Jl. Industri 30, Jakarta", catatan: "" },
]

// ──────────────── END OF MONTH PROCESSES ────────────────
export interface EndOfMonthProcess {
  id: string; nama: string; tanggalInput: string; keterangan: string; nilaiTukar: { mataUang: string; nilai: number }[]
}
export const dummyEndOfMonthProcesses: EndOfMonthProcess[] = [
  { id: "eom-1", nama: "Proses Akhir Juni 2026", tanggalInput: "30/06/2026", keterangan: "Closing book bulan Juni", nilaiTukar: [
    { mataUang: "IDR", nilai: 1 }, { mataUang: "USD", nilai: 15800 }, { mataUang: "SGD", nilai: 11800 },
  ]},
]

// ──────────────── DELIVERY ORDERS ────────────────
export interface DeliveryOrder {
  id: string; nomor: string; tanggal: string; pelanggan: string; pengiriman: string; keterangan: string; status: string
}
export const dummyDeliveryOrders: DeliveryOrder[] = [
  { id: "do-1", nomor: "SJ/2026/07/001", tanggal: "03/07/2026", pelanggan: "PT Maju Bersama", pengiriman: "JNE", keterangan: "Pengiriman produk", status: "Dikirim" },
  { id: "do-2", nomor: "SJ/2026/07/002", tanggal: "05/07/2026", pelanggan: "CV Karya Mandiri", pengiriman: "Pickup", keterangan: "Pengiriman kanopi", status: "Draft" },
]
