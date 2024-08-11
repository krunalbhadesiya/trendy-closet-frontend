import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThankYouIllustration from "../../../../assets/8459737.jpg";

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
    const [paymentStatus] = useState<string>("");
    const [formData, setFormData] = useState({
        phone: "",
        address: "",
        city: "",
        state: "Gujarat",
        zip: "",
    });


    const submitOrder = async () => {
        const username = localStorage.getItem("username");
        const customerName = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        const totalAmount = cartItems.reduce(
            (acc, item) => acc + item.cartCount * item.productPrice,
            0
        );

        // console.log("Submitting Order:", {
        //     username,
        //     customerName,
        //     email,
        //     phone: formData.phone,
        //     address: formData.address,
        //     city: formData.city,
        //     state: formData.state,
        //     zip: formData.zip,
        //     totalAmount
        // });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/orders`,
                {
                    username,
                    customerName,
                    email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    products: cartItems.map((item) => ({
                        productId: item.pid,
                        productName: item.productName,
                        qty: item.cartCount,
                    })),
                    paymentType: paymentMethod,
                    paymentStatus: "Unpaid",
                    status: "Pending",
                    deliveryDate: " ",
                    totalAmount: totalAmount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // console.log("Order Response:", response);

            if (response.status === 200 || response.status === 201 || response.status === 204) {
                for (const item of cartItems) {
                    await axios.delete(
                        `${import.meta.env.VITE_API_BASE_URL}/cart/${item._id}`,
                        {
                            headers: {
                                Authorization: `${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    console.log(`Deleted Cart Item ID: ${item._id}`);
                }
            }
        } catch (error: any) {
            console.error("Error submitting order", error.response ? error.response.data : error.message);
            alert("An error occurred. Please try again later.");
        }
    };

    const handleNext = (event: React.FormEvent) => {
        event.preventDefault();
        if (step == 2) {
            setStep(3);
            submitOrder()
        } else {
            setStep(step + 1);
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
                                            onChange={(e) => {
                                                setFormData({ ...formData, [key]: e.target.value });
                                            }}
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
                                    onValueChange={(value) => {
                                        setPaymentMethod(value);
                                    }}
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

                {step === 3 && (
                    <div className="grid gap-6">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <img src={ThankYouIllustration} alt="Thank You" className="mx-auto w-1/2" />
                                <h2 className="text-2xl font-bold">Thank You!</h2>
                                <p className="text-muted-foreground">Your order has been placed.</p>
                                <p className="text-muted-foreground">Your order status is: {paymentStatus}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </form>
        </div>
    );
}
