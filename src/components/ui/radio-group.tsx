"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { Radio } from "@base-ui/react/radio"
import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: Radio.Root.Props) {
  return (
    <Radio.Root
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-primary text-primary shadow focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Radio.Indicator className="flex items-center justify-center">
        <div className="size-2 rounded-full bg-current" />
      </Radio.Indicator>
    </Radio.Root>
  )
}

export { RadioGroup, RadioGroupItem }
