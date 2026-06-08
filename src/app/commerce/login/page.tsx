"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  MessageCircle,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CommerceLoginPage() {
  const [loginMethod, setLoginMethod] = useState<"whatsapp" | "email">("whatsapp")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSendOtp = () => {
    setOtpSent(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/commerce" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Login</span>
      </nav>

      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your SCW account</p>
        </div>

        {/* Login method toggle */}
        <div className="grid grid-cols-2 gap-2 rounded-lg border bg-muted p-1">
          <button
            onClick={() => setLoginMethod("whatsapp")}
            className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              loginMethod === "whatsapp"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp OTP
          </button>
          <button
            onClick={() => setLoginMethod("email")}
            className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              loginMethod === "email"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="h-4 w-4" />
            Email & Password
          </button>
        </div>

        <Card>
          <CardContent className="p-6">
            {loginMethod === "whatsapp" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  <MessageCircle className="h-4 w-4" />
                  We&apos;ll send a verification code to your WhatsApp
                </div>

                {!otpSent ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+62 812 xxxx xxxx"
                          className="pl-9"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleSendOtp}>
                      Send OTP Code
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP Code</Label>
                      <Input
                        id="otp"
                        placeholder="000000"
                        className="text-center text-lg tracking-[0.5em]"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        Code sent to {phone || "+62 812 xxxx xxxx"}
                      </p>
                    </div>
                    <Button className="w-full">
                      Verify & Sign In
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <button
                      onClick={() => setOtpSent(false)}
                      className="w-full text-center text-sm text-indigo-600 hover:underline"
                    >
                      Change phone number
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full">
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button className="text-indigo-600 hover:underline font-medium">
            Register now
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
          <Shield className="h-3.5 w-3.5" />
          Your data is secure and encrypted
        </div>
      </div>
    </div>
  )
}
