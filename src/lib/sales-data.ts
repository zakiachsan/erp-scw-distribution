export interface Customer {
  id: string
  name: string
  company: string
  creditLimit: number
  remainingCredit: number
  lastPurchase: string
  tier: "Bronze" | "Silver" | "Gold" | "Platinum"
  totalPurchase: number
  totalOrders: number
  avgOrderValue: number
}

export const customers: Customer[] = [
  { id: "C001", name: "Budi Santoso", company: "PT Autogloss Indonesia", creditLimit: 50000000, remainingCredit: 32000000, lastPurchase: "2026-05-28", tier: "Platinum", totalPurchase: 85000000, totalOrders: 24, avgOrderValue: 3541667 },
  { id: "C002", name: "Andi Pratama", company: "CV Ceramic Pro JKT", creditLimit: 40000000, remainingCredit: 18000000, lastPurchase: "2026-05-25", tier: "Gold", totalPurchase: 62000000, totalOrders: 18, avgOrderValue: 3444444 },
  { id: "C003", name: "Rina Wijaya", company: "UD Shinemax", creditLimit: 30000000, remainingCredit: 28000000, lastPurchase: "2026-05-20", tier: "Gold", totalPurchase: 45000000, totalOrders: 12, avgOrderValue: 3750000 },
  { id: "C004", name: "Dedi Kurniawan", company: "PT DetailWorks BDG", creditLimit: 25000000, remainingCredit: 25000000, lastPurchase: "2026-05-15", tier: "Silver", totalPurchase: 38000000, totalOrders: 10, avgOrderValue: 3800000 },
  { id: "C005", name: "Sari Dewi", company: "CV ProShine SBY", creditLimit: 20000000, remainingCredit: 12000000, lastPurchase: "2026-05-10", tier: "Silver", totalPurchase: 29000000, totalOrders: 8, avgOrderValue: 3625000 },
  { id: "C006", name: "Hendra Gunawan", company: "AutoCare Makassar", creditLimit: 15000000, remainingCredit: 15000000, lastPurchase: "2026-04-30", tier: "Bronze", totalPurchase: 18000000, totalOrders: 5, avgOrderValue: 3600000 },
  { id: "C007", name: "Maya Putri", company: "GlossUp Bali", creditLimit: 20000000, remainingCredit: 5000000, lastPurchase: "2026-05-22", tier: "Platinum", totalPurchase: 72000000, totalOrders: 20, avgOrderValue: 3600000 },
  { id: "C008", name: "Rizky Firmansyah", company: "DetailPro Semarang", creditLimit: 15000000, remainingCredit: 10000000, lastPurchase: "2026-05-18", tier: "Bronze", totalPurchase: 15000000, totalOrders: 4, avgOrderValue: 3750000 },
]
