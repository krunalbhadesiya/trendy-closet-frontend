import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
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
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${id}`);
                setOrders(data.order);
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
                        <h1 className="w-full text-center text-2xl font-bold pb-4 border-b-2">Order Details</h1>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Order ID:</div>
                                            <div>{orders._id}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Customer Name:</div>
                                            <div>{orders.customerName}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Email:</div>
                                            <div>
                                                <Link href={`mailto:${orders.email}`} prefetch={false}>
                                                    {orders.email}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Phone:</div>
                                            <div>
                                                <Link href={`tel:${orders.phone}`} prefetch={false}>
                                                    {orders.phone}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Address:</div>
                                            <div>
                                                {orders.address}
                                                <br />
                                                {orders.city}, {orders.state}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Payment Type:</div>
                                            <div>{orders.paymentType}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Payment Status:</div>
                                            <div>
                                                <Badge
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
                                            <div className="text-muted-foreground">Order Status:</div>
                                            <div>
                                                <Badge
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
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Delivery Date:</div>
                                            <div>{orders.deliveryDate}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Total:</div>
                                            <div>${orders.totalAmount.toFixed(2)}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">Created At:</div>
                                            <div>
                                                <time dateTime={orders.createdAt}>
                                                    {new Date(orders.createdAt).toLocaleString()}
                                                </time>
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
                                                <TableHead className="text-right">Price</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.products.map((product) => (
                                                <TableRow key={product.productId}>
                                                    <TableCell>{product.productName}</TableCell>
                                                    <TableCell>{product.qty}</TableCell>
                                                    <TableCell className="text-right">
                                                        ${product.price.toFixed(2)}
                                                    </TableCell>
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
