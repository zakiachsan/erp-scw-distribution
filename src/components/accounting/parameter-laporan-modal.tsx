"use client"

/* Modal "Parameter Laporan" — filter per laporan, diturunkan dari getReportParams.
 * Setiap laporan punya kombinasi filter sendiri: tanggal, cabang, pelanggan, pemasok,
 * barang, tenaga penjual, gudang, akun, bank, karyawan, tahun/bulan, dan checkbox.
 * Klik Tampilkan → navigasi ke halaman laporan ter-generate dengan query params.
 */

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Search, Check, CalendarDays } from "lucide-react"
import { CABANG_OPTIONS } from "@/lib/daftar-laporan-data"
import { getReportParams, type ReportFilter } from "@/lib/daftar-laporan-params"
import { EMPLOYEE_NAMES, SALESPEOPLE_NAMES } from "@/lib/daftar-laporan-generator"
import {
  dummyCustomers, dummySuppliers, dummyProducts, dummyWarehouses, dummyAccounts,
} from "@/lib/accounting-dummy-data"
import { useT } from "@/lib/i18n"

const inputStyle: React.CSSProperties = {
  height: 32, padding: "0 10px", fontSize: 13,
  border: "1px solid #d8d8d8", borderRadius: 6,
  outline: "none", width: "100%", boxSizing: "border-box", background: "#fff",
}

const ENTITY_OPTIONS: Partial<Record<ReportFilter, string[]>> = {
  customer: dummyCustomers.map(c => c.nama),
  supplier: dummySuppliers.map(s => s.nama),
  product: dummyProducts.map(p => p.nama),
  salesperson: SALESPEOPLE_NAMES,
  warehouse: dummyWarehouses.map(w => w.nama),
  account: dummyAccounts.map(a => `${a.kode} - ${a.nama}`),
  bank: dummyAccounts.filter(a => a.tipeAkun === "Kas & Bank").map(a => a.nama),
  employee: EMPLOYEE_NAMES,
}

/* Combobox searchable sederhana: pilihan dari options, nilai "__all__" = Semua */
function FilterCombobox({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const { t } = useT()
  const all = t("report.filter.all")
  const shown = [all, ...options].filter(o => !q || o.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#999", zIndex: 1 }} />
        <input
          style={{ ...inputStyle, paddingLeft: 28 }}
          placeholder={`${label}...`}
          value={value === "__all__" ? all : value}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {open && (
          <div style={{ position: "absolute", top: 34, left: 0, right: 0, maxHeight: 160, overflowY: "auto", background: "#fff", border: "1px solid #d8d8d8", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10 }}>
            {shown.length === 0 ? (
              <div style={{ padding: 10, fontSize: 12, color: "#888", textAlign: "center" }}>{t("report.noResult")}</div>
            ) : shown.map(o => (
              <div
                key={o}
                onMouseDown={(e) => { e.preventDefault(); onChange(o === all ? "__all__" : o); setQ(""); setOpen(false) }}
                style={{ padding: "8px 10px", fontSize: 13, cursor: "pointer", borderBottom: "1px solid #f5f5f5", background: value === o ? "#f0f7ff" : "transparent" }}
              >
                {o}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function ParameterLaporanModal({ report, onOpenChange }: {
  report: { catKey: string; index: number; title: string } | null
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useT()
  const router = useRouter()
  const [tab, setTab] = useState<"umum" | "kolom">("umum")
  const [dari, setDari] = useState("2026-08-01")
  const [sd, setSd] = useState("2026-08-06")
  const [cabang, setCabang] = useState("cabang.all")
  const [cabangOpen, setCabangOpen] = useState(false)
  const [cabangSearch, setCabangSearch] = useState("")
  const [entity, setEntity] = useState<Record<string, string>>({})
  const [year, setYear] = useState("2026")
  const [month, setMonth] = useState("")
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<string | null>(null)

  const params = report ? getReportParams(report.catKey, report.title) : null

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const open = report !== null && params !== null
  if (!open && !toast) return null
  const p = params!

  const filteredCabang = CABANG_OPTIONS.filter(c => !cabangSearch || t(c).toLowerCase().includes(cabangSearch.toLowerCase()))
  const entityFilters: ReportFilter[] = ["customer", "supplier", "product", "salesperson", "warehouse", "account", "bank", "employee"]
    .filter(f => p.filters.includes(f as ReportFilter)) as ReportFilter[]

  const handleTampilkan = () => {
    if (!report || !params) return
    const q = new URLSearchParams()
    q.set("laporan", String(report.index))
    q.set("dari", dari)
    q.set("sd", sd)
    if (cabang !== "cabang.all") q.set("cabang", cabang)
    for (const f of entityFilters) {
      const v = entity[f]
      if (v && v !== "__all__") q.set(`f.${f}`, v)
    }
    if (p.filters.includes("year")) q.set("tahun", year)
    if (p.filters.includes("month") && month) q.set("bulan", month)
    for (const [k, v] of Object.entries(checks)) {
      if (v) q.set(`cb.${k.replace("report.cb.", "")}`, "1")
    }
    setToast(`${t("report.toast")} "${report.title}" ${t("report.saved")}`)
    onOpenChange(false)
    router.push(`/accounting/daftar-laporan/${report.catKey}?${q.toString()}`)
  }

  return (
    <>
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => onOpenChange(false)}>
          <div style={{ background: "#fff", borderRadius: 8, width: "100%", maxWidth: 560, boxShadow: "0 8px 28px rgba(0,0,0,0.18)", overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
            {/* Header — dark blue bar */}
            <div style={{ background: "#032d60", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{t("report.parameters")}</span>
                {report && <span style={{ fontSize: 11, fontWeight: 500, color: "#b8d1f0", background: "rgba(255,255,255,0.12)", padding: "2px 8px", borderRadius: 4 }}>{report.title}</span>}
              </div>
              <button onClick={() => onOpenChange(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff", padding: 2 }} aria-label="Tutup">
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0", padding: "0 18px" }}>
              {([["umum", "report.general"], ["kolom", "report.columns"]] as const).map(([k, key]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  style={{
                    padding: "10px 14px", fontSize: 13, fontWeight: tab === k ? 600 : 400,
                    color: tab === k ? "#0176d3" : "#666", background: "transparent", border: "none",
                    borderBottom: tab === k ? "2px solid #0176d3" : "2px solid transparent",
                    marginBottom: -1, cursor: "pointer",
                  }}
                >
                  {t(key)}
                </button>
              ))}
            </div>

            {/* Body */}
            <div style={{ padding: "16px 18px", maxHeight: "60vh", overflow: "auto" }}>
              {tab === "umum" ? (
                <>
                  {p.filters.includes("date") && (
                    <>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#001526", marginBottom: 8 }}>{t("report.date")}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{t("report.from")}</div>
                          <div style={{ position: "relative" }}>
                            <CalendarDays size={13} style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", color: "#999", pointerEvents: "none" }} />
                            <input type="date" style={{ ...inputStyle, paddingRight: 30 }} value={dari} onChange={(e) => setDari(e.target.value)} />
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{t("report.to")}</div>
                          <div style={{ position: "relative" }}>
                            <CalendarDays size={13} style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", color: "#999", pointerEvents: "none" }} />
                            <input type="date" style={{ ...inputStyle, paddingRight: 30 }} value={sd} onChange={(e) => setSd(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {p.filters.includes("year") && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{t("report.filter.year")}</div>
                      <select style={{ ...inputStyle }} value={year} onChange={(e) => setYear(e.target.value)}>
                        {["2024", "2025", "2026"].map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  )}

                  {p.filters.includes("month") && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{t("report.filter.month")}</div>
                      <select style={{ ...inputStyle }} value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">{t("report.filter.all")}</option>
                        {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  )}

                  {(p.filters.includes("date") || p.filters.includes("branch") || entityFilters.length > 0 || p.filters.includes("year") || p.filters.includes("month")) && (
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#001526", marginBottom: 8 }}>{t("report.additionalParams")}</div>
                  )}

                  {p.filters.includes("branch") && (
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{t("report.branch")} <span style={{ color: "#ea001e" }}>*</span></div>
                      <div style={{ position: "relative" }}>
                        <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#999", zIndex: 1 }} />
                        <input
                          style={{ ...inputStyle, paddingLeft: 28 }}
                          placeholder={t("report.searchBranch")}
                          value={t(cabang)}
                          onFocus={() => setCabangOpen(true)}
                          onChange={(e) => { setCabangSearch(e.target.value); setCabangOpen(true) }}
                          onBlur={() => setTimeout(() => setCabangOpen(false), 150)}
                        />
                        {cabangOpen && (
                          <div style={{ position: "absolute", top: 34, left: 0, right: 0, maxHeight: 160, overflowY: "auto", background: "#fff", border: "1px solid #d8d8d8", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10 }}>
                            {filteredCabang.length === 0 ? (
                              <div style={{ padding: 10, fontSize: 12, color: "#888", textAlign: "center" }}>{t("report.noResult")}</div>
                            ) : filteredCabang.map(c => (
                              <div
                                key={c}
                                onMouseDown={(e) => { e.preventDefault(); setCabang(c); setCabangSearch(""); setCabangOpen(false) }}
                                style={{ padding: "8px 10px", fontSize: 13, cursor: "pointer", borderBottom: "1px solid #f5f5f5", background: cabang === c ? "#f0f7ff" : "transparent" }}
                              >
                                {t(c)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {entityFilters.map(f => (
                    <FilterCombobox
                      key={f}
                      label={t(`report.filter.${f}`)}
                      options={ENTITY_OPTIONS[f] ?? []}
                      value={entity[f] ?? "__all__"}
                      onChange={(v) => setEntity({ ...entity, [f]: v })}
                    />
                  ))}

                  {p.checkboxes.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                      {p.checkboxes.map((k) => (
                        <label key={k} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#444746" }}>
                          <input
                            type="checkbox"
                            checked={!!checks[k]}
                            onChange={(e) => setChecks({ ...checks, [k]: e.target.checked })}
                            style={{ width: 15, height: 15, cursor: "pointer" }}
                          />
                          {t(k)}
                        </label>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ padding: "30px 0", textAlign: "center", color: "#888", fontSize: 13 }}>
                  {t("report.columnsPlaceholder")}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 18px", borderTop: "1px solid #e0e0e0", display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => onOpenChange(false)}
                style={{ padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#fff", color: "#444746", border: "1px solid #d8d8d8", borderRadius: 6, cursor: "pointer" }}
              >
                {t("report.cancel")}
              </button>
              <button
                onClick={handleTampilkan}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", fontSize: 13, fontWeight: 600, background: "#0176d3", color: "#fff", border: "1px solid #0176d3", borderRadius: 6, cursor: "pointer" }}
              >
                <Check size={14} /> {t("report.display")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 60, padding: "12px 18px", background: "#059669", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          <Check size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
          {toast}
        </div>
      )}
    </>
  )
}
