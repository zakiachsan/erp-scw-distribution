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
  { id: "prd-1", nama: "Besi Hollow 40x40x2mm", kode: "BH-001", jenis: "Persediaan", satuan: "Batang", hargaBeli: 85000, hargaJual: 105000, stok: 250, kategori: "General", merek: "KS", stokMin: 50 },
  { id: "prd-2", nama: "Besi Hollow 40x40x3mm", kode: "BH-002", jenis: "Persediaan", satuan: "Batang", hargaBeli: 110000, hargaJual: 135000, stok: 180, kategori: "General", merek: "KS", stokMin: 40 },
  { id: "prd-3", nama: "Besi Plat 4mm", kode: "BP-001", jenis: "Persediaan", satuan: "Lembar", hargaBeli: 450000, hargaJual: 550000, stok: 85, kategori: "General", merek: "Gunung Garuda", stokMin: 20 },
  { id: "prd-4", nama: "Besi Plat 6mm", kode: "BP-002", jenis: "Persediaan", satuan: "Lembar", hargaBeli: 680000, hargaJual: 820000, stok: 60, kategori: "General", merek: "Gunung Garuda", stokMin: 15 },
  { id: "prd-5", nama: "Besi Beton 10mm", kode: "BB-001", jenis: "Persediaan", satuan: "Batang", hargaBeli: 58000, hargaJual: 72000, stok: 400, kategori: "General", merek: "Master Steel", stokMin: 80 },
  { id: "prd-6", nama: "Besi Beton 12mm", kode: "BB-002", jenis: "Persediaan", satuan: "Batang", hargaBeli: 78000, hargaJual: 95000, stok: 320, kategori: "General", merek: "Master Steel", stokMin: 60 },
  { id: "prd-7", nama: "Cat Besi Glossy Hitam", kode: "CB-001", jenis: "Persediaan", satuan: "Kaleng", hargaBeli: 180000, hargaJual: 225000, stok: 45, kategori: "General", merek: "Nippon Paint", stokMin: 10 },
  { id: "prd-8", nama: "Jasa Pengelasan", kode: "JS-001", jenis: "Jasa", satuan: "Jam", hargaBeli: 0, hargaJual: 150000, stok: 0, kategori: "General", merek: "", stokMin: 0 },
  { id: "prd-9", nama: "Jasa Pemasangan", kode: "JS-002", jenis: "Jasa", satuan: "Unit", hargaBeli: 0, hargaJual: 350000, stok: 0, kategori: "General", merek: "", stokMin: 0 },
  { id: "prd-10", nama: "Mesin Gerinda Tangan", kode: "AS-001", jenis: "Aset", satuan: "Unit", hargaBeli: 750000, hargaJual: 0, stok: 5, kategori: "General", merek: "Makita", stokMin: 2 },
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
  { id: "po-1", nomor: "PO/2026/07/001", noFaktur: "INV/2026/07/SP-001", tanggal: "01/07/2026", pemasok: "PT Sumber Makmur", pemasokId: "sup-1", keterangan: "Pembelian besi hollow dan plat", status: "Received", total: 8810000, items: [
    { namaBarang: "Besi Hollow 40x40x2mm", kodeBarang: "BH-001", qty: 50, satuan: "Batang", harga: 85000, diskon: 0, total: 4250000 },
    { namaBarang: "Besi Hollow 40x40x3mm", kodeBarang: "BH-002", qty: 20, satuan: "Batang", harga: 110000, diskon: 0, total: 2200000 },
    { namaBarang: "Besi Plat 4mm", kodeBarang: "BP-001", qty: 5, satuan: "Lembar", harga: 450000, diskon: 50000, total: 2200000 },
    { namaBarang: "Cat Besi Glossy Hitam", kodeBarang: "CB-001", qty: 1, satuan: "Kaleng", harga: 180000, diskon: 20000, total: 160000 },
  ]},
  { id: "po-2", nomor: "PO/2026/07/002", noFaktur: "INV/2026/07/IJ-001", tanggal: "03/07/2026", pemasok: "CV Sinar Jaya", pemasokId: "sup-2", keterangan: "Besi beton tambahan", status: "Approved", total: 3880000, items: [
    { namaBarang: "Besi Beton 10mm", kodeBarang: "BB-001", qty: 30, satuan: "Batang", harga: 58000, diskon: 0, total: 1740000 },
    { namaBarang: "Besi Beton 12mm", kodeBarang: "BB-002", qty: 20, satuan: "Batang", harga: 78000, diskon: 0, total: 1560000 },
    { namaBarang: "Besi Plat 6mm", kodeBarang: "BP-002", qty: 1, satuan: "Lembar", harga: 680000, diskon: 100000, total: 580000 },
  ]},
  { id: "po-3", nomor: "PO/2026/07/003", noFaktur: "INV/2026/07/IB-001", tanggal: "05/07/2026", pemasok: "PT Indo Baja Utama", pemasokId: "sup-3", keterangan: "Restok besi hollow dan beton", status: "Draft", total: 5820000, items: [
    { namaBarang: "Besi Hollow 40x40x2mm", kodeBarang: "BH-001", qty: 30, satuan: "Batang", harga: 85000, diskon: 0, total: 2550000 },
    { namaBarang: "Besi Beton 12mm", kodeBarang: "BB-002", qty: 30, satuan: "Batang", harga: 78000, diskon: 0, total: 2340000 },
    { namaBarang: "Besi Plat 4mm", kodeBarang: "BP-001", qty: 2, satuan: "Lembar", harga: 450000, diskon: 100000, total: 800000 },
    { namaBarang: "Cat Besi Glossy Hitam", kodeBarang: "CB-001", qty: 1, satuan: "Kaleng", harga: 180000, diskon: 50000, total: 130000 },
  ]},
]

// ──────────────── SALES ORDERS ────────────────
export interface SalesOrder {
  id: string; nomor: string; tanggal: string; pelanggan: string; pelangganId: string; keterangan: string; status: "Draft" | "Approved" | "Shipped" | "Invoiced"; total: number; items: SOItem[]
}
export interface SOItem { namaBarang: string; kodeBarang: string; qty: number; satuan: string; harga: number; diskon: number; total: number }
export const dummySalesOrders: SalesOrder[] = [
  { id: "so-1", nomor: "SO/2026/07/001", tanggal: "02/07/2026", pelanggan: "PT Maju Bersama", pelangganId: "cus-1", keterangan: "Pesanan besi untuk proyek", status: "Approved", total: 8200000, items: [
    { namaBarang: "Besi Hollow 40x40x2mm", kodeBarang: "BH-001", qty: 40, satuan: "Batang", harga: 105000, diskon: 0, total: 4200000 },
    { namaBarang: "Besi Plat 4mm", kodeBarang: "BP-001", qty: 5, satuan: "Lembar", harga: 550000, diskon: 50000, total: 2700000 },
    { namaBarang: "Cat Besi Glossy Hitam", kodeBarang: "CB-001", qty: 2, satuan: "Kaleng", harga: 225000, diskon: 0, total: 450000 },
    { namaBarang: "Jasa Pengelasan", kodeBarang: "JS-001", qty: 5, satuan: "Jam", harga: 150000, diskon: 100000, total: 850000 },
  ]},
  { id: "so-2", nomor: "SO/2026/07/002", tanggal: "04/07/2026", pelanggan: "CV Karya Mandiri", pelangganId: "cus-2", keterangan: "Kanopi besi", status: "Approved", total: 6100000, items: [
    { namaBarang: "Besi Hollow 40x40x3mm", kodeBarang: "BH-002", qty: 25, satuan: "Batang", harga: 135000, diskon: 0, total: 3375000 },
    { namaBarang: "Besi Plat 6mm", kodeBarang: "BP-002", qty: 2, satuan: "Lembar", harga: 820000, diskon: 50000, total: 1590000 },
    { namaBarang: "Jasa Pemasangan", kodeBarang: "JS-002", qty: 3, satuan: "Unit", harga: 350000, diskon: 150000, total: 1135000 },
  ]},
  { id: "so-3", nomor: "SO/2026/07/003", tanggal: "06/07/2026", pelanggan: "PT Teknindo Solusi", pelangganId: "cus-4", keterangan: "Material konstruksi", status: "Draft", total: 4100000, items: [
    { namaBarang: "Besi Beton 10mm", kodeBarang: "BB-001", qty: 50, satuan: "Batang", harga: 72000, diskon: 0, total: 3600000 },
    { namaBarang: "Cat Besi Glossy Hitam", kodeBarang: "CB-001", qty: 2, satuan: "Kaleng", harga: 225000, diskon: 0, total: 450000 },
    { namaBarang: "Jasa Pengelasan", kodeBarang: "JS-001", qty: 1, satuan: "Jam", harga: 150000, diskon: 100000, total: 50000 },
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

// ──────────────── BANK RECORDS ────────────────
export interface BankRecord {
  id: string; tanggal: string; noSumber: string; noCek: string; tipeTransaksi: string; keterangan: string; mutasi: number; tipe: "Debit" | "Kredit"; saldo: number
}
export const dummyBankRecords: BankRecord[] = [
  { id: "br-1", tanggal: "01/07/2026", noSumber: "SO/2026/07/001", noCek: "CEK-001", tipeTransaksi: "Pembayaran", keterangan: "Sewa kantor Juli", mutasi: -15000000, tipe: "Debit", saldo: 85000000 },
  { id: "br-2", tanggal: "03/07/2026", noSumber: "SO/2026/07/002", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Pelunasan dari PT Maju Bersama", mutasi: 25000000, tipe: "Kredit", saldo: 110000000 },
  { id: "br-3", tanggal: "05/07/2026", noSumber: "PO/2026/07/001", noCek: "-", tipeTransaksi: "Pembayaran", keterangan: "Pembelian ATK", mutasi: -5000000, tipe: "Debit", saldo: 105000000 },
  { id: "br-4", tanggal: "06/07/2026", noSumber: "SO/2026/07/003", noCek: "-", tipeTransaksi: "Penerimaan", keterangan: "Uang muka dari PT Teknindo", mutasi: 15000000, tipe: "Kredit", saldo: 120000000 },
]

// ──────────────── SALES RETURNS ────────────────
export interface SalesReturn {
  id: string; nomor: string; tanggal: string; pelanggan: string; keterangan: string; total: number; items: SOItem[]
}
export const dummySalesReturns: SalesReturn[] = [
  { id: "sr-1", nomor: "SR/2026/07/001", tanggal: "05/07/2026", pelanggan: "PT Maju Bersama", keterangan: "Retur besi hollow cacat", total: 2100000, items: [
    { namaBarang: "Besi Hollow 40x40x2mm", kodeBarang: "BH-001", qty: 2, satuan: "Batang", harga: 105000, diskon: 0, total: 210000 },
    { namaBarang: "Besi Plat 4mm", kodeBarang: "BP-001", qty: 2, satuan: "Lembar", harga: 550000, diskon: 0, total: 1100000 },
    { namaBarang: "Cat Besi Glossy Hitam", kodeBarang: "CB-001", qty: 1, satuan: "Kaleng", harga: 225000, diskon: 0, total: 225000 },
    { namaBarang: "Jasa Pengelasan", kodeBarang: "JS-001", qty: 2, satuan: "Jam", harga: 150000, diskon: 35000, total: 565000 },
  ]},
]

// ──────────────── ASSETS ────────────────
export interface FixedAsset {
  id: string; nomor: string; nama: string; kategori: string; tanggalBeli: string; kuantitas: number; hargaPerolehan: number; totalNilai: number; nilaiBuku: number; umurEkonomis: number; metodePenyusutan: string; penyusutanBulanan: number
}
export const dummyFixedAssets: FixedAsset[] = [
  { id: "fa-1", nomor: "FA-001", nama: "Toyota Avanza 2024", kategori: "Kendaraan", tanggalBeli: "15/01/2024", kuantitas: 1, hargaPerolehan: 250000000, totalNilai: 250000000, nilaiBuku: 208333333, umurEkonomis: 8, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 2604167 },
  { id: "fa-2", nomor: "FA-002", nama: "Mesin CNC Milling", kategori: "Mesin", tanggalBeli: "20/03/2024", kuantitas: 1, hargaPerolehan: 450000000, totalNilai: 450000000, nilaiBuku: 403125000, umurEkonomis: 10, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 3750000 },
  { id: "fa-3", nomor: "FA-003", nama: "Laptop Dell Inspiron", kategori: "Elektronik", tanggalBeli: "01/01/2026", kuantitas: 5, hargaPerolehan: 12000000, totalNilai: 60000000, nilaiBuku: 56250000, umurEkonomis: 4, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 1250000 },
  { id: "fa-4", nomor: "FA-004", nama: "AC Split 2 PK", kategori: "Elektronik", tanggalBeli: "15/06/2026", kuantitas: 3, hargaPerolehan: 6500000, totalNilai: 19500000, nilaiBuku: 19256250, umurEkonomis: 5, metodePenyusutan: "Metode Garis Lurus", penyusutanBulanan: 325000 },
]

// ──────────────── INVENTORY MOVEMENTS ────────────────
export interface InventoryMovement {
  id: string; nomor: string; tanggal: string; tipe: "Kirim" | "Terima"; gudangAsal: string; gudangTujuan: string; keterangan: string; status: string; items: { namaBarang: string; kode: string; qty: number; satuan: string }[]
}
export const dummyInventoryMovements: InventoryMovement[] = [
  { id: "im-1", nomor: "PMB/2026/07/001", tanggal: "02/07/2026", tipe: "Kirim", gudangAsal: "Gudang Pusat", gudangTujuan: "Gudang Bandung", keterangan: "Pengiriman stok besi hollow", status: "Dikirim", items: [
    { namaBarang: "Besi Hollow 40x40x2mm", kode: "BH-001", qty: 20, satuan: "Batang" },
    { namaBarang: "Besi Hollow 40x40x3mm", kode: "BH-002", qty: 10, satuan: "Batang" },
  ]},
  { id: "im-2", nomor: "PMB/2026/07/002", tanggal: "04/07/2026", tipe: "Kirim", gudangAsal: "Gudang Pusat", gudangTujuan: "Gudang Surabaya", keterangan: "Pengiriman besi beton", status: "Dikirim", items: [
    { namaBarang: "Besi Beton 10mm", kode: "BB-001", qty: 50, satuan: "Batang" },
    { namaBarang: "Besi Beton 12mm", kode: "BB-002", qty: 30, satuan: "Batang" },
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
    { namaBarang: "Besi Hollow 40x40x2mm", kode: "BH-001", kuantitas: 200, nilai: 21000000 },
    { namaBarang: "Besi Beton 10mm", kode: "BB-001", kuantitas: 300, nilai: 21600000 },
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
  { id: "pa-1", nomor: "PS/2026/07/001", mulaiBerlaku: "07/07/2026", kategori: "General", keterangan: "Kenaikan harga besi", tipe: "Harga", items: [
    { namaBarang: "Besi Hollow 40x40x2mm", kode: "BH-001", satuan: "Batang", hargaBaru: 110000 },
    { namaBarang: "Besi Beton 10mm", kode: "BB-001", satuan: "Batang", hargaBaru: 75000 },
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
  { id: "jo-1", nomor: "JO/2026/07/001", tanggal: "02/07/2026", pelanggan: "PT Maju Bersama", keterangan: "Pembuatan kanopi besi", status: "In Progress" },
  { id: "jo-2", nomor: "JO/2026/07/002", tanggal: "05/07/2026", pelanggan: "CV Karya Mandiri", keterangan: "Pemasangan pagar besi", status: "Draft" },
]

// ──────────────── WORK ORDER COMPLETIONS ────────────────
export interface WorkOrderCompletion {
  id: string; nomor: string; tanggal: string; pekerjaanPesanan: string; tipePenyelesaian: string; keterangan: string
}
export const dummyWorkOrderCompletions: WorkOrderCompletion[] = [
  { id: "woc-1", nomor: "WP/2026/07/001", tanggal: "06/07/2026", pekerjaanPesanan: "JO/2026/07/001", tipePenyelesaian: "Barang", keterangan: "Penyelesaian kanopi besi" },
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
  { id: "do-1", nomor: "SJ/2026/07/001", tanggal: "03/07/2026", pelanggan: "PT Maju Bersama", pengiriman: "JNE", keterangan: "Pengiriman besi", status: "Dikirim" },
  { id: "do-2", nomor: "SJ/2026/07/002", tanggal: "05/07/2026", pelanggan: "CV Karya Mandiri", pengiriman: "Pickup", keterangan: "Pengiriman kanopi", status: "Draft" },
]
