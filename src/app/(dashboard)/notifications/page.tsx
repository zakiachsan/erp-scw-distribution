"use client"

import React, { useState } from "react"
import {
  Bell,
  Plus,
  Send,
  Clock,
  Users,
  MessageSquare,
  Megaphone,
  CheckCircle2,
  AlertTriangle,
  Info,
  Package,
  Truck,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const notifications = [
  {
    id: "1",
    type: "broadcast",
    title: "Holiday Schedule Notice",
    message: "SCW Distribution will observe holiday closure from Dec 24-26. All orders placed during this period will be processed on Dec 27. We wish you a happy holiday season!",
    sender: "Admin",
    target: "All Users",
    timestamp: "2024-12-16 09:00",
    read: false,
    priority: "info",
  },
  {
    id: "2",
    type: "alert",
    title: "Low Stock Alert: SCW Ceramic Coating",
    message: "SCW Ceramic Coating (5L) has fallen below minimum stock level. Current stock: 5 units. Minimum required: 20 units. Please arrange restocking immediately.",
    sender: "System",
    target: "Warehouse Staff, Admin",
    timestamp: "2024-12-16 08:45",
    read: false,
    priority: "warning",
  },
  {
    id: "3",
    type: "message",
    title: "Sales Target Update",
    message: "Congratulations team! We have achieved 105% of our December sales target. Special bonus distribution will be processed next week. Keep up the excellent work!",
    sender: "Rina Wijaya",
    target: "Sales Team",
    timestamp: "2024-12-15 16:30",
    read: true,
    priority: "success",
  },
  {
    id: "4",
    type: "broadcast",
    title: "New Product Launch: SCW Winter Shield",
    message: "We are excited to announce the launch of SCW Winter Shield - a premium cold-weather paint protection formula. Available for order starting Dec 20. Catalog price: Rp 285,000/unit.",
    sender: "Admin",
    target: "All Users",
    timestamp: "2024-12-15 14:00",
    read: true,
    priority: "info",
  },
  {
    id: "5",
    type: "alert",
    title: "Shipping Delay Notice",
    message: "Due to heavy rainfall in Jakarta, JNE shipments may experience 1-2 day delays. Affected orders: #SHP-2024-0234, #SHP-2024-0235. Customers have been notified.",
    sender: "Dedi Kurniawan",
    target: "Sales Team, Admin",
    timestamp: "2024-12-15 11:00",
    read: true,
    priority: "warning",
  },
  {
    id: "6",
    type: "message",
    title: "Invoice Reminder: PT AutoCare",
    message: "Reminder: Invoice #INV-2024-0450 for PT AutoCare (Rp 4,250,000) is due on Dec 18. Payment has not been received. Please follow up with the customer.",
    sender: "Ani Susanti",
    target: "Sales Team",
    timestamp: "2024-12-14 10:00",
    read: true,
    priority: "info",
  },
]

const priorityConfig: Record<string, { icon: React.ElementType; color: string; badgeColor: string }> = {
  info: { icon: Info, color: "border-l-blue-500", badgeColor: "bg-blue-50 text-blue-700" },
  warning: { icon: AlertTriangle, color: "border-l-amber-500", badgeColor: "bg-amber-50 text-amber-700" },
  success: { icon: CheckCircle2, color: "border-l-green-500", badgeColor: "bg-green-50 text-green-700" },
}

const typeIcons: Record<string, React.ElementType> = {
  broadcast: Megaphone,
  alert: AlertTriangle,
  message: MessageSquare,
}

export default function NotificationsPage() {
  const [showComposeDialog, setShowComposeDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("inbox")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-muted-foreground">
            Manage broadcasts, alerts, and team messages
          </p>
        </div>
        <Button onClick={() => setShowComposeDialog(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Compose
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <Bell className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-xl font-bold">
                  {notifications.filter((n) => !n.read).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Megaphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Broadcasts</p>
                <p className="text-xl font-bold">
                  {notifications.filter((n) => n.type === "broadcast").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-xl font-bold">
                  {notifications.filter((n) => n.type === "alert").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-xl font-bold">
                  {notifications.filter((n) => n.type === "message").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="inbox" onValueChange={(v) => setActiveTab(v ?? '')}>
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Inbox Tab */}
        <TabsContent value="inbox">
          <div className="space-y-3">
            {notifications.map((notification) => {
              const config = priorityConfig[notification.priority]
              const TypeIcon = typeIcons[notification.type] || Bell
              const PriorityIcon = config.icon

              return (
                <Card
                  key={notification.id}
                  className={`border-l-4 ${config.color} ${
                    !notification.read ? "ring-2 ring-indigo-100" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.badgeColor}`}>
                        <PriorityIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? "text-slate-900" : "text-slate-700"}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-indigo-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <TypeIcon className="h-3 w-3" />
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {notification.target}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.timestamp}
                          </span>
                          <span>by {notification.sender}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => {
                  const TypeIcon = typeIcons[notification.type] || Bell
                  return (
                    <div key={notification.id} className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                        <TypeIcon className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                        <Badge variant="outline" className="mt-1 text-[10px]">
                          {notification.target}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Compose Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose Notification</DialogTitle>
            <DialogDescription>
              Send a broadcast message or alert to selected recipients.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Recipient Role</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select recipient role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="sales">Sales Team</SelectItem>
                  <SelectItem value="warehouse">Warehouse Staff</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="purchasing">Purchasing</SelectItem>
                  <SelectItem value="cs">Customer Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info (Blue)</SelectItem>
                  <SelectItem value="warning">Warning (Amber)</SelectItem>
                  <SelectItem value="success">Success (Green)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="compose-message">Message</Label>
              <Textarea
                id="compose-message"
                placeholder="Type your notification message here..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowComposeDialog(false)}>
              <Send className="h-4 w-4 mr-1" />
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
