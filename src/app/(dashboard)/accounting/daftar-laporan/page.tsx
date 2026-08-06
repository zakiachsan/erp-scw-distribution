"use client"

/* Daftar Laporan — menu laporan lengkap (referensi Accurate).
 * Kiri: daftar kategori (sub menu). Kanan: grid laporan per kategori.
 * Klik laporan → modal Parameter Laporan (filter per laporan; framework isi menyusul).
 */

import { useMemo, useState } from "react"
import { Search, FileText, Table2, BarChart3, LayoutList } from "lucide-react"
import { REPORT_CATEGORIES } from "@/lib/daftar-laporan-data"
import { REPORT_EN } from "@/lib/daftar-laporan-en"
import { useT } from "@/lib/i18n"
import { ParameterLaporanModal } from "@/components/accounting/parameter-laporan-modal"

const railItem: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 10,
  padding: "9px 14px", fontSize: 13, borderRadius: 6,
  cursor: "pointer", border: "none", width: "100%", textAlign: "left",
}

function ReportIcon({ type }: { type: "doc" | "grid" | "chart" }) {
  if (type === "chart") return <BarChart3 size={18} style={{ color: "#fe9339", flexShrink: 0 }} />
  if (type === "grid") return <Table2 size={18} style={{ color: "#7a5af8", flexShrink: 0 }} />
  return <FileText size={18} style={{ color: "#0176d3", flexShrink: 0 }} />
}

export default function DaftarLaporanPage() {
  const [activeKey, setActiveKey] = useState("keuangan")
  const [search, setSearch] = useState("")
  const [selectedReport, setSelectedReport] = useState<{ catKey: string; index: number; title: string } | null>(null)
  const { lang, mounted, t } = useT()
  const isEn = mounted && lang === "en"

  const active = REPORT_CATEGORIES.find(c => c.key === activeKey) ?? REPORT_CATEGORIES[0]

  const reports = useMemo(() => {
    const q = search.toLowerCase()
    return active.reports.filter(r => !q || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q))
  }, [active, search])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "12px 20px 0", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#001526" }}>{t("reportList.title")}</h1>
            <p style={{ fontSize: 13, color: "#444746", marginTop: 2 }}>{t("reportList.subtitle")}</p>
          </div>
          <div style={{ position: "relative", marginTop: 4 }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />
            <input
              type="text"
              placeholder={t("reportList.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 220, outline: "none" }}
            />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* ── Left rail: kategori (sub menu) ── */}
        <div style={{ width: 210, flexShrink: 0, background: "#f8f9fa", borderRight: "1px solid #e4e4e4", overflowY: "auto", padding: "12px 8px" }}>
          {REPORT_CATEGORIES.map((cat) => {
            const isActive = cat.key === activeKey
            return (
              <button
                key={cat.key}
                onClick={() => { setActiveKey(cat.key); setSearch("") }}
                style={{
                  ...railItem,
                  background: isActive ? "#0176d3" : "transparent",
                  color: isActive ? "#fff" : "#444746",
                  fontWeight: isActive ? 600 : 400,
                  marginBottom: 2,
                }}
              >
                <LayoutList size={15} style={{ color: isActive ? "#fff" : "#999", flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{isEn ? cat.labelEn : cat.label}</span>
                <span style={{ fontSize: 10, color: isActive ? "rgba(255,255,255,0.8)" : "#aaa" }}>{cat.reports.length}</span>
              </button>
            )
          })}
        </div>

        {/* ── Report grid ── */}
        <div style={{ flex: 1, overflowY: "auto", background: "#f8f9fa", padding: "16px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#001526", marginBottom: 12 }}>
            {isEn ? active.labelEn : active.label} <span style={{ color: "#888", fontWeight: 400, marginLeft: 6 }}>{reports.length} {t("reportList.reports")}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 10 }}>
            {reports.length === 0 ? (
              <div style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 13, gridColumn: "1 / -1" }}>{t("reportList.noMatch")}</div>
            ) : reports.map((rep) => {
              const en = isEn ? REPORT_EN[active.key]?.[rep.title] : undefined
              const repTitle = en?.t ?? rep.title
              const repDesc = en?.d ?? rep.desc
              return (
              <button
                key={rep.title}
                onClick={() => setSelectedReport({ catKey: active.key, index: active.reports.indexOf(rep), title: repTitle })}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left",
                  background: "#fff", border: "1px solid #e4e4e4", borderRadius: 8,
                  padding: "14px 16px", cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#9ec5f5"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(1,118,211,0.12)" }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e4e4e4"; e.currentTarget.style.boxShadow = "none" }}
              >
                <ReportIcon type={rep.icon} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0176d3", lineHeight: 1.35 }}>{repTitle}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 3, lineHeight: 1.45 }}>{repDesc}</div>
                </div>
              </button>
              )
            })}
          </div>
        </div>
      </div>

      <ParameterLaporanModal key={selectedReport ? `${selectedReport.catKey}:${selectedReport.index}` : "closed"} report={selectedReport} onOpenChange={(o) => { if (!o) setSelectedReport(null) }} />
    </div>
  )
}
