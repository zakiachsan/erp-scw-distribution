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
  Truck,
  Printer,
  Phone,
  MapPin,
  FileText,
  Hash,
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

interface MaterialUsed {
  name: string
  qty: number
  unit: string
}

interface PackingDetail {
  id: string
  soRef: string
  customer: string
  customerPhone: string
  customerAddress: string
  courier: string
  totalPrice: number
  items: LineItem[]
  materials: MaterialUsed[]
  status: "Queued" | "In Progress" | "Completed"
}

const formatIDR = (val: number) => `Rp ${val.toLocaleString("id-ID")}`

const PACKING_DATA: Record<string, PackingDetail> = {
  "PK-001": { id: "PK-001", soRef: "SO-2026-045", customer: "PT Autogloss Indonesia", customerPhone: "0812-8899-4521", customerAddress: "Jl. Alternatif Cibinong No. 88, Bogor", courier: "JNE", totalPrice: 8500000, items: [{ name: "SCW Snow Foam", qty: 20 }, { name: "SCW Ceramic Coating", qty: 10 }], materials: [{ name: "Box Large", qty: 2, unit: "pcs" }, { name: "Bubble Wrap", qty: 5, unit: "meter" }, { name: "Selotip", qty: 3, unit: "roll" }], status: "Queued" },
  "PK-002": { id: "PK-002", soRef: "SO-2026-044", customer: "CV Ceramic Pro JKT", customerPhone: "0813-5522-7788", customerAddress: "Jl. Panjang No. 12, Jakarta Barat", courier: "J&T Express", totalPrice: 6200000, items: [{ name: "SCW Interior Detailer", qty: 15 }, { name: "SCW Tire Gel", qty: 25 }], materials: [{ name: "Box Medium", qty: 3, unit: "pcs" }, { name: "Bubble Wrap", qty: 8, unit: "meter" }, { name: "Selotip", qty: 4, unit: "roll" }, { name: "Filler Paper", qty: 10, unit: "lembar" }], status: "In Progress" },
  "PK-003": { id: "PK-003", soRef: "SO-2026-043", customer: "UD Shinemax", customerPhone: "0821-3344-9012", customerAddress: "Jl. Raya Bandung No. 456, Bandung", courier: "Cargo", totalPrice: 4500000, items: [{ name: "SCW Spray Wax", qty: 30 }, { name: "SCW Glass Cleaner", qty: 20 }], materials: [{ name: "Box Large", qty: 4, unit: "pcs" }, { name: "Bubble Wrap", qty: 12, unit: "meter" }, { name: "Selotip", qty: 6, unit: "roll" }, { name: "Palet Kayu", qty: 1, unit: "pcs" }], status: "Completed" },
  "PK-004": { id: "PK-004", soRef: "SO-2026-040", customer: "CV ProShine SBY", customerPhone: "0856-7788-1234", customerAddress: "Jl. Rungkut Mapan Utara No. 10, Surabaya", courier: "TIKI", totalPrice: 5800000, items: [{ name: "SCW Polish Compound", qty: 10 }], materials: [{ name: "Box Small", qty: 1, unit: "pcs" }, { name: "Bubble Wrap", qty: 3, unit: "meter" }, { name: "Selotip", qty: 2, unit: "roll" }], status: "Queued" },
  "PK-005": { id: "PK-005", soRef: "SO-2026-039", customer: "AutoCare Makassar", customerPhone: "0811-4455-6677", customerAddress: "Jl. A.P. Pettarani No. 22, Makassar", courier: "JNE", totalPrice: 3200000, items: [{ name: "SCW Snow Foam", qty: 25 }], materials: [{ name: "Box Large", qty: 2, unit: "pcs" }, { name: "Bubble Wrap", qty: 6, unit: "meter" }, { name: "Selotip", qty: 3, unit: "roll" }], status: "Queued" },
  "PK-006": { id: "PK-006", soRef: "SO-2026-046", customer: "GlossUp Bali", customerPhone: "0819-2233-8899", customerAddress: "Jl. Sunset Road No. 88, Seminyak, Bali", courier: "Kurir Instant", totalPrice: 6200000, items: [{ name: "SCW Ceramic Coating", qty: 8 }, { name: "SCW Spray Wax", qty: 12 }], materials: [{ name: "Box Medium", qty: 2, unit: "pcs" }, { name: "Bubble Wrap", qty: 4, unit: "meter" }, { name: "Selotip", qty: 2, unit: "roll" }], status: "In Progress" },
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

          {/* Materials Used */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Materials Used
              </CardTitle>
              <CardDescription>{detail.materials.length} jenis material digunakan</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Satuan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detail.materials.map((mat, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{mat.name}</TableCell>
                      <TableCell className="text-center">{mat.qty}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{mat.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                    disabled={detail.status === "Completed"}
                    onChange={(e) => setDimensions((d) => ({ ...d, length: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Lebar (cm)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={dimensions.width}
                    disabled={detail.status === "Completed"}
                    onChange={(e) => setDimensions((d) => ({ ...d, width: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tinggi (cm)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={dimensions.height}
                    disabled={detail.status === "Completed"}
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
                  disabled={detail.status === "Completed"}
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
              {detail.status === "Completed" ? (
                <div className="space-y-3">
                  <div className="text-center text-sm text-muted-foreground pt-1">
                    ✅ Packing sudah selesai. Rekaman video dokumentasi:
                  </div>
                  {videos.length === 0 ? (
                    <>
                      <div className="rounded-lg border overflow-hidden bg-muted/30">
                        <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                          <Video className="h-10 w-10 text-indigo-300" />
                        </div>
                        <div className="p-2.5 flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">3:45</Badge>
                          <span className="text-[10px] text-muted-foreground">28 Mei 2026 11:00</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    videos.map((v) => (
                      <div key={v.id} className="rounded-lg border overflow-hidden">
                        <video src={v.blobUrl} controls playsInline className="w-full aspect-video bg-black" />
                        <div className="p-2.5 flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">{v.duration}</Badge>
                          <span className="text-[10px] text-muted-foreground">{v.uploadedAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <>
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
              {detail.status === "In Progress" && recordedBlob && (
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
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Delivery Tag */}
          <Card className="border-2 border-dashed border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Delivery Tag
              </CardTitle>
              <CardDescription className="text-[10px]">Tempelan nama, alamat, no. telp, kurir & nilai asuransi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border bg-white overflow-hidden">
                {/* Reference strip — Packing Slip ID & SO Reference */}
                <div className="grid grid-cols-2 divide-x border-b bg-slate-50">
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
                      <Hash className="h-3 w-3" />
                      Packing Slip
                    </div>
                    <div className="mt-0.5 font-mono text-sm font-bold tracking-tight">{detail.id}</div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
                      <FileText className="h-3 w-3" />
                      SO Reference
                    </div>
                    <div className="mt-0.5 font-mono text-sm font-bold tracking-tight">{detail.soRef}</div>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  {/* Penerima */}
                  <div>
                    <div className="mb-1.5 text-[10px] text-muted-foreground uppercase tracking-wider">Penerima</div>
                    <div className="text-base font-bold">{detail.customer}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-700">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      {detail.customerPhone}
                    </div>
                    <div className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {detail.customerAddress}
                    </div>
                  </div>

                  <div className="border-t border-dashed" />

                  {/* Pengirim */}
                  <div>
                    <div className="mb-1.5 text-[10px] text-muted-foreground uppercase tracking-wider">Pengirim</div>
                    <div className="text-sm font-semibold">SCW Distribution</div>
                    <div className="mt-0.5 flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      Jl. Industri Raya No. 123, Jakarta Utara 14310
                    </div>
                  </div>

                  <div className="border-t border-dashed" />

                  {/* Kurir & Asuransi */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Kurir</div>
                      <div className="text-sm font-bold text-blue-600">{detail.courier}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Nilai Asuransi</div>
                      <div className="text-sm font-bold text-amber-600">{formatIDR(detail.totalPrice)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full" onClick={() => window.print()}>
                <Printer className="mr-1.5 h-3.5 w-3.5" />
                Cetak Delivery Tag
              </Button>
            </CardContent>
          </Card>

          {/* Action */}
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
