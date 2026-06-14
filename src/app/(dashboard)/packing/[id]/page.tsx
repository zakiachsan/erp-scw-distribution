"use client"

import { useState, use, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  Camera,
  Video,
  StopCircle,
  Play,
  Trash2,
  CheckCircle2,
  Clock,
  Package,
  Ruler,
  Weight,
} from "lucide-react"

interface PackingVideo {
  id: string
  packingId: string
  customer: string
  blobUrl: string
  duration: string
  uploadedAt: string
}

interface LineItem {
  name: string
  qty: number
}

interface PackingDetail {
  id: string
  soRef: string
  customer: string
  items: LineItem[]
  status: "Queued" | "In Progress" | "Completed"
}

const PACKING_DATA: Record<string, PackingDetail> = {
  "PK-001": { id: "PK-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", items: [{ name: "SCW Snow Foam", qty: 20 }, { name: "SCW Ceramic Coating", qty: 10 }], status: "Queued" },
  "PK-002": { id: "PK-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", items: [{ name: "SCW Interior Detailer", qty: 15 }, { name: "SCW Tire Gel", qty: 25 }], status: "In Progress" },
  "PK-003": { id: "PK-003", soRef: "SO-2026-043", customer: "UD Shinemax", items: [{ name: "SCW Spray Wax", qty: 30 }, { name: "SCW Glass Cleaner", qty: 20 }], status: "Completed" },
  "PK-004": { id: "PK-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", items: [{ name: "SCW Polish Compound", qty: 10 }], status: "Queued" },
  "PK-005": { id: "PK-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", items: [{ name: "SCW Snow Foam", qty: 25 }], status: "Queued" },
  "PK-006": { id: "PK-006", soRef: "SO-2026-046", customer: "GlossUp Bali", items: [{ name: "SCW Ceramic Coating", qty: 8 }, { name: "SCW Spray Wax", qty: 12 }], status: "In Progress" },
}

let videoIdCounter = 100
const nextVideoId = () => `V${++videoIdCounter}`

export default function PackingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [detail, setDetail] = useState(() => PACKING_DATA[id])
  const [videos, setVideos] = useState<PackingVideo[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "", weight: "" })

  const videoRef = useRef<HTMLVideoElement>(null)
  const previewRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const startTimeRef = useRef<number>(0)

  if (!detail) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <p className="mt-4 text-muted-foreground">Packing tidak ditemukan.</p>
      </div>
    )
  }

  const totalQty = detail.items.reduce((sum, i) => sum + i.qty, 0)
  const totalItems = detail.items.length

  const formatDuration = (ms: number) => {
    const sec = Math.floor(ms / 1000)
    const min = Math.floor(sec / 60)
    const s = sec % 60
    return `${min}:${s.toString().padStart(2, "0")}`
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(mediaStream)
      setCameraActive(true)
      if (previewRef.current) previewRef.current.srcObject = mediaStream
    } catch {
      alert("Tidak bisa mengakses kamera. Pastikan izin kamera diberikan.")
    }
  }

  const stopCamera = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop())
    setStream(null)
    setCameraActive(false)
    setRecordedBlob(null)
  }

  const startRecording = () => {
    if (!stream) return
    chunksRef.current = []
    startTimeRef.current = Date.now()
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" })
    mediaRecorderRef.current = recorder
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" })
      setRecordedBlob(blob)
      setIsRecording(false)
    }
    recorder.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
  }

  const handleSaveVideo = () => {
    if (!recordedBlob) return
    const durationMs = Date.now() - startTimeRef.current
    const blobUrl = URL.createObjectURL(recordedBlob)
    const newVideo: PackingVideo = {
      id: nextVideoId(),
      packingId: detail.id,
      customer: detail.customer,
      blobUrl,
      duration: formatDuration(durationMs),
      uploadedAt: new Date().toLocaleString("id-ID"),
    }
    setVideos((prev) => [newVideo, ...prev])
    setRecordedBlob(null)
    stopCamera()
  }

  const handleDeleteVideo = (videoId: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId))
  }

  const handleStartPacking = () => setDetail((p) => ({ ...p, status: "In Progress" as const }))
  const handleCompletePacking = () => setDetail((p) => ({ ...p, status: "Completed" as const }))

  const statusStyle = detail.status === "Queued" ? "bg-gray-100 text-gray-800" :
    detail.status === "In Progress" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"

  useEffect(() => {
    return () => { if (stream) stream.getTracks().forEach((t) => t.stop()) }
  }, [])

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{detail.id}</h1>
          <p className="text-muted-foreground">{detail.soRef}</p>
        </div>
        <Badge variant="outline" className={statusStyle}>{detail.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          {/* Item Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Item Packing
              </CardTitle>
              <CardDescription>{totalItems} produk, total {totalQty} pcs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Item</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detail.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-center">{item.qty}</TableCell>
                      <TableCell className="text-right font-mono">{item.qty} pcs</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-3 rounded-lg border bg-muted/30 p-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Total Qty</span>
                <span className="font-bold">{totalQty} pcs</span>
              </div>
            </CardContent>
          </Card>

          {/* Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Dimensi Paket
              </CardTitle>
              <CardDescription>Masukkan ukuran dan berat paket setelah di-packing.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Panjang (cm)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={dimensions.length}
                    onChange={(e) => setDimensions((d) => ({ ...d, length: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Lebar (cm)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={dimensions.width}
                    onChange={(e) => setDimensions((d) => ({ ...d, width: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tinggi (cm)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={dimensions.height}
                    onChange={(e) => setDimensions((d) => ({ ...d, height: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Label className="text-xs">Berat (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={dimensions.weight}
                  onChange={(e) => setDimensions((d) => ({ ...d, weight: e.target.value }))}
                />
              </div>

              {/* Volume display */}
              {dimensions.length && dimensions.width && dimensions.height && (
                <div className="mt-3 text-xs text-muted-foreground text-center">
                  Volume: {(Number(dimensions.length) * Number(dimensions.width) * Number(dimensions.height) / 1000).toFixed(1)} liter
                  {dimensions.weight && (
                    <span className="ml-2">| Berat: {dimensions.weight} kg</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Camera */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Rekam Packing
              </CardTitle>
              <CardDescription>Rekam video proses packing sebagai bukti dokumentasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!cameraActive && !recordedBlob && (
                <div className="flex flex-col items-center gap-3 py-6">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Klik untuk mengaktifkan kamera</p>
                  <Button onClick={startCamera} className="gap-2">
                    <Camera className="h-4 w-4" />
                    Aktifkan Kamera
                  </Button>
                </div>
              )}
              {cameraActive && !recordedBlob && (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                    <video ref={previewRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                    {isRecording && (
                      <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                        <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        REC
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!isRecording ? (
                      <Button onClick={startRecording} className="flex-1 gap-2">
                        <Video className="h-4 w-4" />
                        Mulai Rekam
                      </Button>
                    ) : (
                      <Button onClick={stopRecording} variant="destructive" className="flex-1 gap-2">
                        <StopCircle className="h-4 w-4" />
                        Stop Rekam
                      </Button>
                    )}
                    <Button variant="outline" onClick={stopCamera}>Tutup Kamera</Button>
                  </div>
                </div>
              )}
              {recordedBlob && (
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden bg-black aspect-video">
                    <video ref={videoRef} src={URL.createObjectURL(recordedBlob)} controls playsInline className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveVideo} className="flex-1 gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      OK — Simpan Video
                    </Button>
                    <Button variant="outline" onClick={() => { setRecordedBlob(null); startCamera() }} className="gap-2">
                      <Video className="h-4 w-4" />
                      Rekam Ulang
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aksi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detail.status === "Queued" && (
                <Button className="w-full gap-2" onClick={handleStartPacking}>
                  <Play className="h-4 w-4" />
                  Mulai Packing
                </Button>
              )}
              {detail.status === "In Progress" && (
                <Button className="w-full gap-2" onClick={handleCompletePacking}>
                  <CheckCircle2 className="h-4 w-4" />
                  Selesaikan Packing
                </Button>
              )}
              {detail.status === "Completed" && (
                <div className="text-center text-sm text-emerald-600 py-2">
                  ✅ Packing selesai
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Packing
              </CardTitle>
              <CardDescription>{videos.length} video tersimpan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {videos.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Belum ada video. Gunakan kamera di samping untuk merekam.
                </p>
              )}
              {videos.map((v) => (
                <div key={v.id} className="rounded-lg border overflow-hidden">
                  <video src={v.blobUrl} controls playsInline className="w-full aspect-video bg-black" />
                  <div className="p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">{v.duration}</Badge>
                      <span className="text-[10px] text-muted-foreground">{v.uploadedAt}</span>
                    </div>
                    <Button
                      variant="ghost" size="sm" className="h-7 text-xs gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteVideo(v.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
