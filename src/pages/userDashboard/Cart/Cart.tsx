import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Add, Minus } from "iconsax-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

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

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username");

            if (!token || !username) {
                toast({
                    title: "Error",
                    description: "You need to be logged in to view your cart.",
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
                setCartItems(data.cart || []); // Access cart items from the cart key
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

    // Update cart count
    const updateCartCount = async (itemId: string, newCount: number) => {
        if (newCount < 1) return; // Ensure cart count is not less than 1

        const token = localStorage.getItem("token");

        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/cart/${itemId}`,
                { cartCount: newCount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update local state
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === itemId ? { ...item, cartCount: newCount } : item
                )
            );
        } catch (error) {
            console.error("Error updating cart count", error);
            toast({
                title: "Error",
                description: "There was an error updating your cart item. Please try again.",
            });
        }
    };

    // Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + item.cartCount * item.productPrice, 0);
    const tax = subtotal * 0.1; // Assuming a 10% tax rate
    const total = subtotal + tax;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 py-8 px-4 md:px-6">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted/40 px-4 py-3 font-medium">Items in Cart</div>
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <div className="divide-y">
                                    {cartItems.length === 0 ? (
                                        <p className="px-4 py-3">Your cart is empty.</p>
                                    ) : (
                                        cartItems.map((item) => (
                                            <div key={item._id} className="grid grid-cols-[80px_1fr_100px] items-center gap-4 px-4 py-3">
                                                <img
                                                    src={item.productPhotoUrl}
                                                    width={80}
                                                    height={80}
                                                    alt={item.productName}
                                                    className="rounded-md object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-lg">{item.productName}</h3>
                                                    <div className="text-sm ">
                                                        <span className="font-bold mr-1">
                                                            Size:
                                                        </span>
                                                        {item.productSize.toUpperCase()}
                                                    </div>
                                                    <div className="text-sm ">
                                                        <span className="font-bold mr-1">
                                                            Color:
                                                        </span>
                                                        {item.productColor.toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateCartCount(item._id, item.cartCount - 1)}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span>{item.cartCount}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateCartCount(item._id, item.cartCount + 1)}
                                                    >
                                                        <Add className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted/40 px-4 py-3 font-medium">Order Summary</div>
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="bg-muted/40 px-4 py-3 flex gap-2">
                                <Link to={"/user/dashboard/order/add"}>
                                    <Button className="flex-1">Proceed to Checkout</Button>
                                </Link>
                                <Link to={"/store"}>
                                    <Button variant="outline" className="flex-1">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
