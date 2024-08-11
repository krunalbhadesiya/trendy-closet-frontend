import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

type Order = {
    _id: string;
    createdAt: string;
    customerName: string;
    products: { productName: string; qty: number }[];
    totalAmount: number;
    status: string;
};

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

export default function UserDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [isLoadingCart, setIsLoadingCart] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username");

            if (!token || !username) {
                toast({
                    title: "Error",
                    description: "You need to be logged in to view this information.",
                });
                setIsLoadingOrders(false);
                setIsLoadingCart(false);
                return;
            }

            try {
                // Fetch orders
                const ordersResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/orders/username/${username}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setOrders(ordersResponse.data.orders || []); // Ensure this matches your backend response

                // Fetch cart items
                const cartResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/cart/${username}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setCartItems(cartResponse.data.cart || []); // Access cart items from the cart key

            } catch (error) {
                console.error("Error fetching data", error);
                toast({
                    title: "Error",
                    description: "There was an error fetching your data. Please try again.",
                });
            } finally {
                setIsLoadingOrders(false);
                setIsLoadingCart(false);
            }
        };

        fetchData();
    }, []);

    // Get counts
    const orderCount = orders.length;
    const cartCount = cartItems.reduce((acc, item) => acc + item.cartCount, 0);

    return (
        <div className="flex min-h-screen flex-col bg-muted/40">
            <div className="flex-1 p-4 sm:p-6">
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="text-center p-2">
                                <div className="text-xl font-bold">Total Orders</div>
                                <div className="text-3xl font-bold">
                                    {isLoadingOrders ? 'Loading...' : orderCount}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="text-center p-2">
                                <div className="text-xl font-bold">Total Cart Items</div>
                                <div className="text-3xl font-bold">
                                    {isLoadingCart ? 'Loading...' : cartCount}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Orders Section */}
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Recent Orders</h2>
                            <Link to="user/dashboard/order" className="text-sm font-medium underline">
                                View more
                            </Link>
                        </div>
                        <div className="mt-4 border shadow-sm rounded-lg overflow-hidden">
                            {isLoadingOrders ? (
                                <p>Loading orders...</p>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell>
                                                    {order.products.map((item, index) => (
                                                        <div key={index}>
                                                            {item.qty} x {item.productName}
                                                        </div>
                                                    ))}
                                                </TableCell>
                                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        order.status === "Delivered" ? "secondary"
                                                            : order.status === "Shipped" ? "outline"
                                                                : order.status === "Cancelled" ? "destructive"
                                                                    : "default"
                                                    }>
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
