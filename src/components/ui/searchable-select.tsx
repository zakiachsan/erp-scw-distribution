"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface SearchableSelectOption {
  label: string
  value: string
}

interface SearchableSelectProps {
  options: SearchableSelectOption[]
  value: string
  onSelect: (value: string) => void
  onAddNew?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  addNewLabel?: string
  disabled?: boolean
  className?: string
  /** Extra classes for the trigger button */
  triggerClassName?: string
}

export function SearchableSelect({
  options,
  value,
  onSelect,
  onAddNew,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari...",
  emptyMessage = "Tidak ditemukan",
  addNewLabel = "Tambah Baru",
  disabled = false,
  className,
  triggerClassName,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [adding, setAdding] = React.useState(false)
  const [newValue, setNewValue] = React.useState("")
  const addInputRef = React.useRef<HTMLInputElement>(null)

  const selected = options.find((o) => o.value === value)

  const trimmed = search.trim()
  const exactMatch = options.some(
    (o) => o.label.toLowerCase() === trimmed.toLowerCase()
  )
  /** CTA label: shows the typed value when it's a new entry */
  const ctaLabel =
    trimmed && !exactMatch ? `${addNewLabel}: \u201C${trimmed}\u201D` : addNewLabel

  const filtered = options.filter((o) =>
    search ? o.label.toLowerCase().includes(search.toLowerCase()) : true
  )

  const resetPopover = () => {
    setSearch("")
    setAdding(false)
    setNewValue("")
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) resetPopover()
  }

  const commitNew = (raw: string) => {
    const v = raw.trim()
    if (!v) return
    onAddNew?.(v)
    resetPopover()
    setOpen(false)
  }

  /** CTA clicked: add typed value directly, or open inline input when nothing typed */
  const handleCtaSelect = () => {
    if (trimmed && !exactMatch) {
      commitNew(trimmed)
    } else {
      setSearch("")
      setAdding(true)
    }
  }

  React.useEffect(() => {
    if (adding) addInputRef.current?.focus()
  }, [adding])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        disabled={disabled}
        className={cn("w-full", triggerClassName)}
        render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal data-[state=open]:ring-2 data-[state=open]:ring-ring/30",
              !value && "text-muted-foreground",
              className
            )}
          />
        }
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[var(--anchor-width)] min-w-[200px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {/* "Tambah" CTA — always on top */}
              {onAddNew &&
                (adding ? (
                  <div
                    className="flex items-center gap-2 rounded-sm bg-blue-50/60 px-2 py-1.5"
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <Plus className="h-4 w-4 shrink-0 text-blue-600" />
                    <input
                      ref={addInputRef}
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation()
                        if (e.key === "Enter") commitNew(newValue)
                        if (e.key === "Escape") {
                          setAdding(false)
                          setNewValue("")
                        }
                      }}
                      placeholder={`${addNewLabel}...`}
                      className="h-7 w-full min-w-0 rounded-md border border-blue-200 bg-white px-2 text-sm outline-none placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => commitNew(newValue)}
                      disabled={!newValue.trim()}
                      className="shrink-0 rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-blue-700 disabled:opacity-40"
                    >
                      Tambah
                    </button>
                  </div>
                ) : (
                  <CommandItem
                    value={`__add_new__:${trimmed}`}
                    onSelect={handleCtaSelect}
                    className="font-medium text-blue-600 data-selected:bg-blue-50 data-selected:text-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4 shrink-0" />
                    {ctaLabel}
                  </CommandItem>
                ))}

              {filtered.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue)
                    resetPopover()
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
