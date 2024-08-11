import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

// Define TypeScript interfaces
interface Product {
  productId: string;
  productName: string;
  qty: number;
  _id: string;
}

interface Order {
  _id: string;
  customerName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  products: Product[];
  paymentType: string;
  paymentStatus: string;
  status: string;
  deliveryDate: string;
  totalAmount: number;
  createdAt: string;
}

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/orders/username/${username}`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOrders(response.data.orders); // Ensure this matches your backend response
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order._id} className="p-6 bg-background rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                Order - {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <Badge
                variant={
                  order.status === "Delivered"? "secondary"
                  : order.status === "Shipped" ? "outline"
                  : order.status === "Cancelled" ? "destructive"
                  : "default" // Fallback for any other status
                }
                className="text-xs"
              >
                {order.status}
              </Badge>

            </div>
            <div className="grid gap-4">
              {order.products.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="font-medium">{item.productName}</div>
                  <div className="text-muted-foreground">x{item.qty}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
