import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useParams } from "react-router-dom";

// Define TypeScript interfaces
interface Product {
    productId: string;
    productName: string;
    qty: number;
    price: number; // Include price field
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

export default function OrderData() {
    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!id) return;

            setIsLoading(true);

            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/orders/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                setOrders(response.data.order);
            } catch (error) {
                console.error("Error fetching product data", error);
                toast({
                    title: "Error",
                    description: "There was an error fetching the product data. Please try again.",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [id]);

    return (
        <div>
            {isLoading ? (
                <p>Loading products...</p>
            ) : (
                orders && (
                    <div className="mx-auto px-4 md:px-6 py-8">
                        {/* <h1 className="w-full text-center text-2xl font-bold pb-4 border-b-2">Order Details</h1> */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="grid  gap-2">
                                            <div className="text-muted-foreground">Order ID: <span className="text-primary">{orders._id}</span></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Customer Name:  <span className="text-primary">{orders.customerName}</span></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Email:  <span className="text-primary">{orders.email}</span></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Phone:  <span className="text-primary">{orders.phone}</span></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">
                                                Address:
                                                <span className="text-primary">  {orders.address},{orders.city},{orders.state}</span>
                                            </div>

                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Payment Type:<span className="text-primary">{orders.paymentType}</span></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">
                                                Payment Status:
                                                <Badge
                                                    className="ml-2"
                                                    variant={
                                                        orders.paymentStatus === "Paid"
                                                            ? "secondary"
                                                            : orders.paymentStatus === "Pending"
                                                                ? "outline"
                                                                : "destructive" // Replace "danger" with "destructive" or another existing variant
                                                    }
                                                >
                                                    {orders.paymentStatus}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">
                                                Order Status:
                                                <Badge
                                                    className="ml-2"
                                                    variant={
                                                        orders.status === "Paid"
                                                            ? "secondary"
                                                            : orders.status === "Unpaid"
                                                                ? "destructive"
                                                                : "outline"
                                                    }
                                                >
                                                    {orders.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Delivery Date:<span className="text-primary">{orders.deliveryDate}</span></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Total:<span className="text-primary ml-2">{orders.totalAmount}</span></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className=" text-muted-foreground">
                                                Created At:
                                                <span className="ml-2 text-primary">
                                                    <time dateTime={orders.createdAt}>
                                                        {new Date(orders.createdAt).toLocaleString()}
                                                    </time>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Purchased Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                {/* <TableHead className="text-right">Price</TableHead> */}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.products.map((product) => (
                                                <TableRow key={product.productId}>
                                                    <TableCell>{product.productName}</TableCell>
                                                    <TableCell>{product.qty}</TableCell>
                                                    {/* <TableCell className="text-right">
                                                        ${product.price}
                                                    </TableCell> */}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
