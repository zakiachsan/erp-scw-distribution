"use client"

import { Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { useT, useLangStore, type Lang } from "@/lib/i18n"

const options: { value: Lang; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
]

export function LanguageSwitcher() {
  const setLang = useLangStore((s) => s.setLang)
  const { lang } = useT()

  return (
    <div className="flex items-center gap-1.5" title="Language / Bahasa">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <div
        className="relative flex items-center rounded-lg border bg-muted/60 p-0.5"
        role="group"
        aria-label="Language"
      >
        {/* Sliding thumb */}
        <span
          aria-hidden
          className={cn(
            "absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md bg-card shadow-sm ring-1 ring-border/60 transition-transform duration-200 ease-out",
            lang === "id" ? "translate-x-0" : "translate-x-full"
          )}
        />
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={lang === opt.value}
            className={cn(
              "relative z-10 flex h-6 w-9 items-center justify-center rounded-md text-[11px] font-semibold tracking-wide transition-colors duration-200",
              lang === opt.value
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
