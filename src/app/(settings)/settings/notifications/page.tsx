"use client"

import React from "react"
import { Bell, Check, Clock, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const notifications = [
  { id: 1, title: "Stock Alert: Nano Ceramic Coating below minimum", type: "warning", time: "15 min ago", read: false },
  { id: 2, title: "New order #SO-2024-0892 from AutoDetail Bandung", type: "info", time: "1 hour ago", read: false },
  { id: 3, title: "Payment received Rp 12.5M from customer Rina", type: "success", time: "2 hours ago", read: true },
  { id: 4, title: "Shipment #SHP-2024-0234 dispatched via JNE", type: "info", time: "3 hours ago", read: true },
  { id: 5, title: "System maintenance scheduled for tonight 11PM", type: "warning", time: "5 hours ago", read: true },
]

function getIcon(type: string) {
  switch (type) {
    case "warning": return <AlertTriangle className="h-4 w-4 text-amber-500" />
    case "success": return <Check className="h-4 w-4 text-green-500" />
    case "info": return <Info className="h-4 w-4 text-blue-500" />
    default: return <Bell className="h-4 w-4 text-gray-500" />
  }
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500">Kelola notifikasi sistem</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className={`flex items-start gap-3 rounded-lg border p-3 ${n.read ? "bg-white" : "bg-blue-50/50"}`}>
                {getIcon(n.type)}
                <div className="flex-1">
                  <p className={`text-sm ${n.read ? "text-gray-600" : "font-medium text-gray-900"}`}>{n.title}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {n.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
