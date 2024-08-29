import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderMultiStepForm from "./Orderform";
import { toast } from "@/components/ui/use-toast";

type CartItem = {
  _id: string;
  username: string;
  pid: string;
  productName: string;
  productPhotoUrl: string;
  productSize: string;
  productColor: string;
  productPrice: number;
  cartCount: number;
};

export default function AddOrder() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [shipping] = useState<number>(5.00); // Example static shipping cost
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      if (!token || !username) {
        toast({
          title: "Error",
          description: "You need to be logged in to view your order summary.",
        });
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/cart/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const items = data.cart || [];
        setCartItems(items);
        
        // Calculate totals
        const subtotal = items.reduce((acc:any, item:any) => acc + item.cartCount * item.productPrice, 0);
        const tax = subtotal * 0.1; // Assuming a 10% tax rate
        const total = subtotal + tax + shipping;
        
        setSubtotal(subtotal);
        setTax(tax);
        setTotal(total);
      } catch (error) {
        console.error("Error fetching cart data", error);
        toast({
          title: "Error",
          description: "There was an error fetching your cart items. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Order Summary</h1>
            <p className="text-muted-foreground">Review your order details before completing the purchase.</p>
          </div>
          <Card>
            <CardContent className="p-4 grid grid-cols-1 gap-2">
              <div className="grid gap-4">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.productPhotoUrl}
                            alt={item.productName}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            style={{ aspectRatio: "80/80", objectFit: "cover" }}
                          />
                          <div>
                            <h3 className="font-medium">{item.productName}</h3>
                            <p className="text-muted-foreground">Color: {item.productColor.toUpperCase()} | Size: {item.productSize.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className="text-lg font-medium">₹{(item.productPrice * item.cartCount).toFixed(2)}</div>
                      </div>
                    ))}
                    <Separator />
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div>Subtotal</div>
                        <div>₹{subtotal.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Shipping</div>
                        <div>₹{shipping.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Tax</div>
                        <div>₹{tax.toFixed(2)}</div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-medium">
                        <div>Total</div>
                        <div>₹{total.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <OrderMultiStepForm cartItems={cartItems} />
      </div>
    </div>
  );
}
