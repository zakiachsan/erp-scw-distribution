export interface Courier {
  id: string
  name: string
  type: "Internal" | "Expedisi Partner"
  status: "Active" | "Inactive"
  coverage: string
  contact: string
  rating: number
  totalShipments: number
  avgDeliveryDays: number
}

export const couriers: Courier[] = [
  { id: "C01", name: "JNE", type: "Expedisi Partner", status: "Active", coverage: "Nationwide", contact: "021-5678901", rating: 4.5, totalShipments: 1250, avgDeliveryDays: 3 },
  { id: "C02", name: "SiCepat", type: "Expedisi Partner", status: "Active", coverage: "Nationwide", contact: "021-5012345", rating: 4.3, totalShipments: 980, avgDeliveryDays: 2 },
  { id: "C03", name: "J&T Express", type: "Expedisi Partner", status: "Active", coverage: "Nationwide", contact: "021-50888888", rating: 4.1, totalShipments: 750, avgDeliveryDays: 3 },
  { id: "C04", name: "GrabExpress", type: "Expedisi Partner", status: "Active", coverage: "Metro Area", contact: "Via App", rating: 4.4, totalShipments: 320, avgDeliveryDays: 1 },
  { id: "C05", name: "SCW Delivery Van", type: "Internal", status: "Active", coverage: "Jakarta & Tangerang", contact: "0812-9999-0001", rating: 4.8, totalShipments: 450, avgDeliveryDays: 1 },
  { id: "C06", name: "SCW Delivery Bike", type: "Internal", status: "Active", coverage: "Jakarta Only", contact: "0812-9999-0002", rating: 4.6, totalShipments: 280, avgDeliveryDays: 1 },
  { id: "C07", name: "Pos Indonesia", type: "Expedisi Partner", status: "Inactive", coverage: "Nationwide", contact: "021-165", rating: 3.8, totalShipments: 120, avgDeliveryDays: 5 },
]
