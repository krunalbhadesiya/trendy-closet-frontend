import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Oreder() {
  const orders = [
    {
      id: 1,
      date: "2023-06-01",
      number: "#12345",
      items: [
        { name: "Classic Tee", quantity: 2 },
        { name: "Graphic Tee", quantity: 1 },
      ],
      status: "Delivered",
    },
    {
      id: 2,
      date: "2023-05-15",
      number: "#12346",
      items: [{ name: "Striped Tee", quantity: 1 }],
      status: "Shipped",
    },
    {
      id: 3,
      date: "2023-04-30",
      number: "#12347",
      items: [{ name: "V-Neck Tee", quantity: 3 }],
      status: "Cancelled",
    },
    {
      id: 4,
      date: "2023-04-20",
      number: "#12348",
      items: [
        { name: "Crew Neck Tee", quantity: 1 },
        { name: "Polo Shirt", quantity: 1 },
      ],
      status: "Delivered",
    },
  ]
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 bg-background rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                Order {order.number} - {order.date}
              </div>
              <Badge
                variant={
                  order.status === "Delivered" ? "secondary" : order.status === "Shipped" ? "outline" : "destructive"
                }
                className="text-xs"
              >
                {order.status}
              </Badge>
            </div>
            <div className="grid gap-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground">x{item.quantity}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}