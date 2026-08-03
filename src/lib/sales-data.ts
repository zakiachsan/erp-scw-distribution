export type CustomerType = "Reseller" | "Dealer" | "Workshop" | "Retail"
export type PaymentTerm = "COD" | "Net 14" | "Net 30" | "Net 45" | "Net 60" | "DP 30% + Net 30" | "DP 50% + Pelunasan"
export type ShippingMethod = "JNE" | "J&T" | "SiCepat" | "AnterAja" | "Ambil Sendiri" | "Lainnya"

export interface Customer {
  id: string
  name: string
  company: string
  /* Quotation info (dipindahkan dari Quotation ke Customer per Revisi 30Jul26) */
  customerType: CustomerType
  paymentTerms: PaymentTerm
  defaultShipping: ShippingMethod
  /* Kontak */
  pic: string
  phone: string
  email: string
  address: string
  /* Finansial */
  npwp: string
  currency: "IDR" | "USD" | "SGD"
  creditLimit: number
  remainingCredit: number
  lastPurchase: string
  tier: "Bronze" | "Silver" | "Gold" | "Platinum"
  totalPurchase: number
  totalOrders: number
  avgOrderValue: number
}

export const customers: Customer[] = [
  { id: "C001", name: "Budi Santoso", company: "PT Autogloss Indonesia", customerType: "Dealer", paymentTerms: "Net 30", defaultShipping: "JNE", pic: "Budi Santoso", phone: "0812-1000-0001", email: "budi@autogloss.id", address: "Jl. Sudirman No. 88, Jakarta Selatan", npwp: "01.234.567.8-012.000", currency: "IDR", creditLimit: 50000000, remainingCredit: 32000000, lastPurchase: "2026-05-28", tier: "Platinum", totalPurchase: 85000000, totalOrders: 24, avgOrderValue: 3541667 },
  { id: "C002", name: "Andi Pratama", company: "CV Ceramic Pro JKT", customerType: "Workshop", paymentTerms: "Net 14", defaultShipping: "J&T", pic: "Andi Pratama", phone: "0812-1000-0002", email: "andi@ceramicpro.co.id", address: "Jl. Panjang No. 12, Jakarta Barat", npwp: "02.345.678.9-013.000", currency: "IDR", creditLimit: 40000000, remainingCredit: 18000000, lastPurchase: "2026-05-25", tier: "Gold", totalPurchase: 62000000, totalOrders: 18, avgOrderValue: 3444444 },
  { id: "C003", name: "Rina Wijaya", company: "UD Shinemax", customerType: "Reseller", paymentTerms: "Net 30", defaultShipping: "SiCepat", pic: "Rina Wijaya", phone: "0812-1000-0003", email: "rina@shinemax.id", address: "Jl. Asia Afrika No. 100, Bandung", npwp: "03.456.789.0-014.000", currency: "IDR", creditLimit: 30000000, remainingCredit: 28000000, lastPurchase: "2026-05-20", tier: "Gold", totalPurchase: 45000000, totalOrders: 12, avgOrderValue: 3750000 },
  { id: "C004", name: "Dedi Kurniawan", company: "PT DetailWorks BDG", customerType: "Workshop", paymentTerms: "Net 30", defaultShipping: "JNE", pic: "Dedi Kurniawan", phone: "0812-1000-0004", email: "dedi@detailworks.id", address: "Jl. Dipatiukur No. 35, Bandung", npwp: "", currency: "IDR", creditLimit: 25000000, remainingCredit: 25000000, lastPurchase: "2026-05-15", tier: "Silver", totalPurchase: 38000000, totalOrders: 10, avgOrderValue: 3800000 },
  { id: "C005", name: "Sari Dewi", company: "CV ProShine SBY", customerType: "Reseller", paymentTerms: "Net 30", defaultShipping: "JNE", pic: "Sari Dewi", phone: "0812-1000-0005", email: "sari@proshine.id", address: "Jl. Mayjend Sungkono No. 45, Surabaya", npwp: "04.567.890.1-015.000", currency: "IDR", creditLimit: 20000000, remainingCredit: 12000000, lastPurchase: "2026-05-10", tier: "Silver", totalPurchase: 29000000, totalOrders: 8, avgOrderValue: 3625000 },
  { id: "C006", name: "Hendra Gunawan", company: "AutoCare Makassar", customerType: "Dealer", paymentTerms: "Net 30", defaultShipping: "J&T", pic: "Hendra Gunawan", phone: "0812-1000-0006", email: "hendra@autocare-mks.id", address: "Jl. Pengayoman No. 22, Makassar", npwp: "", currency: "IDR", creditLimit: 15000000, remainingCredit: 15000000, lastPurchase: "2026-04-30", tier: "Bronze", totalPurchase: 18000000, totalOrders: 5, avgOrderValue: 3600000 },
  { id: "C007", name: "Maya Putri", company: "GlossUp Bali", customerType: "Workshop", paymentTerms: "Net 14", defaultShipping: "JNE", pic: "Maya Putri", phone: "0812-1000-0007", email: "maya@glossup.id", address: "Jl. Sunset Road No. 88, Denpasar", npwp: "05.678.901.2-016.000", currency: "IDR", creditLimit: 20000000, remainingCredit: 5000000, lastPurchase: "2026-05-22", tier: "Platinum", totalPurchase: 72000000, totalOrders: 20, avgOrderValue: 3600000 },
  { id: "C008", name: "Rizky Firmansyah", company: "DetailPro Semarang", customerType: "Reseller", paymentTerms: "Net 30", defaultShipping: "SiCepat", pic: "Rizky Firmansyah", phone: "0812-1000-0008", email: "rizky@detailpro.id", address: "Jl. Pandanaran No. 55, Semarang", npwp: "", currency: "IDR", creditLimit: 15000000, remainingCredit: 10000000, lastPurchase: "2026-05-18", tier: "Bronze", totalPurchase: 15000000, totalOrders: 4, avgOrderValue: 3750000 },
]

/** Lookup helper used by Quotation create form to auto-fill customerType & paymentTerms */
export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id)
}
