"use client"

import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const salesVsPurchase = [
  { bulan: "Jan", penjualan: 425, pembelian: 250 },
  { bulan: "Feb", penjualan: 480, pembelian: 280 },
  { bulan: "Mar", penjualan: 520, pembelian: 310 },
  { bulan: "Apr", penjualan: 495, pembelian: 290 },
  { bulan: "Mei", penjualan: 580, pembelian: 340 },
  { bulan: "Jun", penjualan: 625, pembelian: 370 },
  { bulan: "Jul", penjualan: 680, pembelian: 410 },
  { bulan: "Agu", penjualan: 720, pembelian: 425 },
]

const cashFlow = [
  { bulan: "Jan", operasional: 80, investasi: -20, pendanaan: 0 },
  { bulan: "Feb", operasional: 95, investasi: -25, pendanaan: 0 },
  { bulan: "Mar", operasional: 110, investasi: -30, pendanaan: 50 },
  { bulan: "Apr", operasional: 105, investasi: -15, pendanaan: 0 },
  { bulan: "Mei", operasional: 130, investasi: -40, pendanaan: 0 },
  { bulan: "Jun", operasional: 145, investasi: -35, pendanaan: 0 },
  { bulan: "Jul", operasional: 165, investasi: -45, pendanaan: 0 },
  { bulan: "Agu", operasional: 180, investasi: -50, pendanaan: 0 },
]

const profitTrend = [
  { bulan: "Jan", pendapatan: 425, beban: 350, laba: 75 },
  { bulan: "Feb", pendapatan: 480, beban: 390, laba: 90 },
  { bulan: "Mar", pendapatan: 520, beban: 415, laba: 105 },
  { bulan: "Apr", pendapatan: 495, beban: 395, laba: 100 },
  { bulan: "Mei", pendapatan: 580, beban: 455, laba: 125 },
  { bulan: "Jun", pendapatan: 625, beban: 485, laba: 140 },
  { bulan: "Jul", pendapatan: 680, beban: 525, laba: 155 },
  { bulan: "Agu", pendapatan: 720, beban: 555, laba: 165 },
]

const expenseBreakdown = [
  { name: "HPP", value: 1950, color: "#0176d3" },
  { name: "Gaji", value: 620, color: "#6f3dc4" },
  { name: "Operasional", value: 380, color: "#b95000" },
  { name: "Marketing", value: 245, color: "#0d7a3d" },
  { name: "Lain-lain", value: 180, color: "#c1342b" },
]

export default function GrafikPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 20px", background: "#fff", overflow: "auto" }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526", margin: 0 }}>Grafik Keuangan</h1>
        <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>Visualisasi penjualan, arus kas, laba/rugi, dan komposisi beban (2026 YTD)</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <ChartCard title="Penjualan vs Pembelian" subtitle="Per bulan (juta IDR)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesVsPurchase} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="penjualan" fill="#0176d3" name="Penjualan" radius={[3, 3, 0, 0]} />
              <Bar dataKey="pembelian" fill="#b95000" name="Pembelian" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Arus Kas" subtitle="Per bulan (juta IDR)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={cashFlow} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="operasional" stroke="#0d7a3d" strokeWidth={2} name="Operasional" />
              <Line type="monotone" dataKey="investasi" stroke="#c1342b" strokeWidth={2} name="Investasi" />
              <Line type="monotone" dataKey="pendanaan" stroke="#6f3dc4" strokeWidth={2} name="Pendanaan" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Laba Rugi Trend" subtitle="Pendapatan vs Beban (juta IDR)">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={profitTrend} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0176d3" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#0176d3" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b95000" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#b95000" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="pendapatan" stroke="#0176d3" fill="url(#rev)" name="Pendapatan" />
              <Area type="monotone" dataKey="beban" stroke="#b95000" fill="url(#exp)" name="Beban" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Komposisi Beban" subtitle="Akumulasi Jan–Agu 2026 (juta IDR)">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={expenseBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2} label={(e: { name?: string; percent?: number }) => `${e.name ?? ""} ${((e.percent ?? 0) * 100).toFixed(0)}%`} labelLine={false} style={{ fontSize: 11 }}>
                {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "14px 16px" }}>
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#001526", margin: 0 }}>{title}</h3>
        <p style={{ fontSize: 11, color: "#666", margin: "2px 0 0" }}>{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
