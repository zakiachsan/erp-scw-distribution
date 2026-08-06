"use client"

/* Halaman laporan ter-generate — format referensi (header perusahaan, judul merah,
 * garis biru di header tabel, font serif). Isi disesuaikan per laporan via
 * generateReport (dummy data). Filter dari query params: dari, sd, cabang, f.*, tahun, bulan, cb.*.
 */

import { useMemo } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Printer, Download, Check } from "lucide-react"
import { REPORT_CATEGORIES, type ReportItem } from "@/lib/daftar-laporan-data"
import { REPORT_EN } from "@/lib/daftar-laporan-en"
import { generateReport, type GeneratedReport } from "@/lib/daftar-laporan-generator"
import { useT } from "@/lib/i18n"

const fmtMoney = (n: number) => new Intl.NumberFormat("id-ID").format(n)
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return `${String(d).padStart(2, "0")} ${MONTHS_ID[m - 1]} ${y}`
}

function TableReport({ rep }: { rep: GeneratedReport & { kind: "table" } }) {
  const { lang, mounted, t } = useT()
  const isEn = mounted && lang === "en"
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Courier New', monospace", fontSize: 12 }}>
      <thead>
        <tr>
          {rep.columns.map((c) => (
            <th
              key={c.key}
              style={{
                borderBottom: "1px solid #0176d3", borderTop: "1px solid #0176d3",
                padding: "6px 8px", textAlign: c.align === "right" ? "right" : "left",
                fontSize: 11, fontWeight: 700,
              }}
            >
              {isEn ? c.enLabel : c.idLabel}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rep.rows.map((r, i) => (
          <tr key={i}>
            {r.cells.map((cell, j) => {
              const isGroup = r.group
              const isTotal = r.total
              return (
                <td
                  key={j}
                  style={{
                    padding: "5px 8px",
                    textAlign: rep.columns[j]?.align === "right" ? "right" : "left",
                    fontWeight: isGroup || isTotal || r.bold ? 700 : 400,
                    borderBottom: isTotal ? "1px solid #0176d3" : "1px solid #f0f0f0",
                    background: isGroup ? "#f5f7fa" : "transparent",
                    fontSize: isGroup ? 11 : 12,
                    color: isTotal ? "#0176d3" : "#001526",
                    whiteSpace: "nowrap",
                  }}
                >
                  {typeof cell === "number" ? fmtMoney(cell) : (isGroup ? t(String(cell)) : cell)}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ChartReport({ rep }: { rep: GeneratedReport & { kind: "chart" } }) {
  const max = Math.max(...rep.series.map(s => s.value), 1)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 0" }}>
      {rep.series.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 130, fontSize: 11, textAlign: "right", color: "#444746", flexShrink: 0 }}>{s.label}</div>
          <div style={{ flex: 1, background: "#f0f4f8", borderRadius: 3, height: 20 }}>
            <div
              style={{ width: `${Math.max((s.value / max) * 100, 2)}%`, height: 20, background: "#0176d3", borderRadius: 3 }}
            />
          </div>
          <div style={{ width: 110, fontSize: 11, color: "#001526", fontFamily: "'Courier New', monospace" }}>{fmtMoney(s.value)}</div>
        </div>
      ))}
    </div>
  )
}

function downloadCsv(title: string, rep: GeneratedReport & { kind: "table" }) {
  const rows = rep.rows.filter(r => !r.group).map(r => r.cells.map(c => (typeof c === "number" ? String(c) : `"${c}"`)).join(","))
  const csv = "\uFEFF" + [rep.columns.map(c => c.idLabel).join(","), ...rows].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `${title.replace(/[^\w]+/g, "-")}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function GeneratedReportPage() {
  const { kategori } = useParams<{ kategori: string }>()
  const sp = useSearchParams()
  const { lang, mounted, t } = useT()
  const isEn = mounted && lang === "en"

  const cat = REPORT_CATEGORIES.find(c => c.key === kategori)
  const idx = Number(sp.get("laporan") ?? 0)
  const report: ReportItem | undefined = cat?.reports[idx]
  const en = isEn && report ? REPORT_EN[cat?.key ?? ""]?.[report.title] : undefined
  const repTitle = en?.t ?? report?.title ?? "?"

  const opts = useMemo(() => ({
    dari: sp.get("dari") ?? "2026-08-01",
    sd: sp.get("sd") ?? "2026-08-06",
    cabang: sp.get("cabang") ?? "",
    customer: sp.get("f.customer") ?? "__all__",
    supplier: sp.get("f.supplier") ?? "__all__",
    product: sp.get("f.product") ?? "__all__",
    salesperson: sp.get("f.salesperson") ?? "__all__",
    warehouse: sp.get("f.warehouse") ?? "__all__",
    account: sp.get("f.account") ?? "__all__",
    bank: sp.get("f.bank") ?? "__all__",
    employee: sp.get("f.employee") ?? "__all__",
    year: sp.get("tahun") ?? "2026",
    month: sp.get("bulan") ?? "",
  }), [sp])

  const generated = useMemo<GeneratedReport | null>(() => {
    if (!cat || !report) return null
    return generateReport(cat.key, report.title, opts)
  }, [cat, report, opts])

  if (!cat || !report || !generated) {
    return (
      <div style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13 }}>
        {t("report.noData")} — <Link href="/accounting/daftar-laporan" style={{ color: "#0176d3" }}>{t("report.back")}</Link>
      </div>
    )
  }

  const cabangLabel = sp.get("cabang") ? t(sp.get("cabang")!) : null
  const dateLine = `${t("report.period")} ${fmtDate(opts.dari)} s/d ${fmtDate(opts.sd)}${cabangLabel ? ` — ${cabangLabel}` : ""}`
  const filterLines: string[] = []
  const fLabels: [string, string][] = [
    ["customer", t("report.filter.customer")], ["supplier", t("report.filter.supplier")],
    ["product", t("report.filter.product")], ["salesperson", t("report.filter.salesperson")],
    ["warehouse", t("report.filter.warehouse")], ["account", t("report.filter.account")],
    ["bank", t("report.filter.bank")], ["employee", t("report.filter.employee")],
  ]
  for (const [k, label] of fLabels) {
    const v = sp.get(`f.${k}`)
    if (v) filterLines.push(`${label}: ${v}`)
  }
  if (sp.get("tahun")) filterLines.push(`${t("report.filter.year")}: ${sp.get("tahun")}`)
  if (sp.get("bulan")) filterLines.push(`${t("report.filter.month")}: ${sp.get("bulan")}`)

  return (
    <div style={{ padding: "0 24px 40px", background: "#f1f3f5", minHeight: "100%" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0", borderBottom: "1px solid #e4e4e4", marginBottom: 16 }}>
        <Link href="/accounting/daftar-laporan" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#0176d3", textDecoration: "none" }}>
          <ArrowLeft size={14} /> {t("report.back")}
        </Link>
        <div style={{ flex: 1 }} />
        <button onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
          <Printer size={14} /> {t("report.print")}
        </button>
        {generated.kind === "table" && (
          <button onClick={() => downloadCsv(repTitle, generated)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}>
            <Download size={14} /> {t("report.downloadCsv")}
          </button>
        )}
      </div>

      {/* Paper */}
      <div style={{ maxWidth: 860, margin: "0 auto", background: "#fff", border: "1px solid #e4e4e4", borderRadius: 6, padding: "36px 40px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", fontFamily: "'Courier New', monospace" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#001526", letterSpacing: 1 }}>SCW DISTRIBUTION</div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>Jl. Raya Industri No. 100, Jakarta</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#d0021b", marginTop: 14 }}>{repTitle}</div>
          <div style={{ fontSize: 12, color: "#d0021b", marginTop: 4 }}>{dateLine}</div>
          {filterLines.length > 0 && (
            <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{filterLines.join("  •  ")}</div>
          )}
        </div>

        <div style={{ marginTop: 18 }}>
          {generated.kind === "chart" ? <ChartReport rep={generated} /> : <TableReport rep={generated} />}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#666" }}>
          <span>SCW Distribution — {t("report.perDate")} {fmtDate(opts.sd)}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Check size={12} /> Generated {new Date().toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  )
}
