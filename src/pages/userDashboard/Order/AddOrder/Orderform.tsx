import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThankYouillustaration from "../../../../assets/8459737.jpg";

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

type OrderMultiStepFormProps = {
  cartItems: CartItem[];
};

export default function OrderMultiStepForm({ cartItems }: OrderMultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentStatus, setPaymentStatus] = useState<string >(" ");
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    state: "Gujarat",
    zip: "",
  });

  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 2) {
      setStep(paymentMethod === "upi" ? 3 : 5);
    } else if (step === 3) {
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  const handlePaymentStatus = (status: string) => {
    setPaymentStatus(status);
    if (status === "success") {
      setStep(5);
      submitOrder();
    } else {
      setStep(4);
    }
  };

  const submitOrder = async () => {
    const username = localStorage.getItem("username");
    const customerName = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.cartCount * item.productPrice,
      0
    );
  
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        {
          username: username,
          customerName: customerName,
          email: email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          products: cartItems.map((item) => ({
            productId: item.pid,
            qty: item.cartCount,
          })),
          paymentType: paymentMethod,
          paymentStatus: paymentStatus,
          status: "Pending",
          deliveryDate: " ",
          totalAmount: totalAmount,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error:any) {
      console.error("Error submitting order", error.response ? error.response.data : error.message); // Log detailed error
    }
  };
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <form onSubmit={handleNext}>
        {step === 1 && (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Delivery Details</h2>
              <p className="text-muted-foreground">Enter your delivery details.</p>
            </div>
            <Card>
              <CardContent className="p-4 grid gap-4">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="grid gap-2">
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <Input
                      id={key}
                      placeholder={`Enter your ${key}`}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <Button type="submit" size="lg" className="w-full">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Payment Details</h2>
              <p className="text-muted-foreground">Select your payment method.</p>
            </div>
            <Card>
              <CardContent className="p-4 grid gap-4">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value)}
                >
                  <div>
                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                    <Label
                      htmlFor="upi"
                      className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                    >
                      Pay with UPI
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                    >
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                <Button type="submit" size="lg" className="w-full">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && paymentMethod === "upi" && (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">UPI Payment Confirmation</h2>
              <p className="text-muted-foreground">Confirm your UPI payment.</p>
            </div>
            <Card>
              <CardContent className="p-4 grid gap-4">
                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  onClick={() => handlePaymentStatus("success")}
                >
                  Confirm Payment
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  variant="destructive"
                  onClick={() => handlePaymentStatus("failure")}
                >
                  Cancel Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Payment Status</h2>
              <p className="text-muted-foreground">
                Your payment status is: {paymentStatus}
              </p>
            </div>
            <Card>
              <CardContent className="p-4 text-center">
                <img src={ThankYouillustaration} alt="Thank You" className="mx-auto w-1/2" />
                <h2 className="text-2xl font-bold">Thank You!</h2>
                <p className="text-muted-foreground">Your order has been placed.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <p className="text-muted-foreground">Review your order details.</p>
            </div>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold">Cart Items:</h3>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item._id} className="flex justify-between py-2">
                      <span>{item.productName}</span>
                      <span>{item.cartCount} x ${item.productPrice}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full"
                    onClick={submitOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </form>
    </div>
  );
}
