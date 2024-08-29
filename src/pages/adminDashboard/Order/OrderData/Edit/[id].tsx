import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

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

export default function OrderDataEdit() {
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
    const handleSave = async () => {
        if (!orders) return;

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/orders/${id}`,
                {
                    customerName: orders.customerName,
                    email: orders.email,
                    phone: orders.phone,
                    address: orders.address,
                    city: orders.city,
                    state: orders.state,
                    paymentType: orders.paymentType,
                    paymentStatus: orders.paymentStatus,
                    status: orders.status,
                    deliveryDate: orders.deliveryDate,
                    totalAmount: parseFloat(orders.totalAmount.toString()),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast({
                title: "Success",
                description: "Order details updated successfully.",
            });
        } catch (error) {
            console.error("Error updating order data", error);
            toast({
                title: "Error",
                description: "There was an error updating the order data. Please try again.",
            });
        }
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrders((prevOrder) =>
            prevOrder
                ? {
                    ...prevOrder,
                    [name]: value,
                }
                : null
        );
    };

    // Handle radio button change
    const handleRadioChange = (name: string, value: string) => {
        setOrders((prevOrder) =>
            prevOrder
                ? {
                    ...prevOrder,
                    [name]: value,
                }
                : null
        );
    };

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
                                    <CardTitle className="flex flex-row justify-between">Order Details <Button onClick={handleSave}>Save</Button></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid  gap-2">
                                            <div className="text-muted-foreground">Order ID: <Input className="text-primary" value={orders._id} onChange={handleInputChange} readOnly /></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Customer Name: <Input className="text-primary" name="customerName" value={orders.customerName} onChange={handleInputChange} /></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Email: <Input className="text-primary" name="email" value={orders.email} onChange={handleInputChange} /></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Phone:  <Input className="text-primary" name="phone" value={orders.phone} onChange={handleInputChange} /></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">
                                                Address:
                                                <Input className="text-primary" name="address" value={orders.address} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">
                                                City:
                                                <Input className="text-primary" name="city" value={orders.city} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">
                                                State:
                                                <Input className="text-primary" name="state" value={orders.state} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Payment Type:<Input className="text-primary" name="paymentType" value={orders.paymentType} onChange={handleInputChange} /></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">
                                                Payment Status:
                                                <RadioGroup name="paymentStatus" defaultValue={orders.paymentStatus} onValueChange={(value) => handleRadioChange("paymentStatus", value)}>
                                                    <span>
                                                        <RadioGroupItem value="Paid" />
                                                        <Badge
                                                            className="ml-2 text-white bg-green-600"
                                                            variant={"outline"}
                                                        >
                                                            Paid
                                                        </Badge>
                                                    </span>
                                                    <span>
                                                        <RadioGroupItem value="Unpaid" />
                                                        <Badge
                                                            className="ml-2 text-white bg-red-600"
                                                            variant={"outline"}
                                                        >
                                                            Unpaid
                                                        </Badge>
                                                    </span>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-muted-foreground">
                                                Order Status:
                                                <RadioGroup name="status" defaultValue={orders.status} onValueChange={(value) => handleRadioChange("status", value)}>
                                                    <span>
                                                        <RadioGroupItem value="Delivered" />
                                                        <Badge
                                                            className="ml-2 text-white bg-green-600"
                                                            variant={"outline"}
                                                        >
                                                            Delivered
                                                        </Badge>
                                                    </span>
                                                    <span>
                                                        <RadioGroupItem value="Shipped" />
                                                        <Badge
                                                            className="ml-2 text-white bg-blue-500 "
                                                            variant={"outline"}
                                                        >
                                                            Shipped
                                                        </Badge>
                                                    </span>
                                                    <span>
                                                        <RadioGroupItem value="Pending" />
                                                        <Badge
                                                            className="ml-2 text-white bg-red-600"
                                                            variant={"outline"}
                                                        >
                                                            Pending
                                                        </Badge>
                                                    </span>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Delivery Date:<Input className="text-primary" type="datetime-local" name="deliveryDate" value={orders.deliveryDate} onChange={handleInputChange} /></div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="text-muted-foreground">Total:<Input className="text-primary ml-2" name="totalAmount" value={orders.totalAmount} onChange={handleInputChange} /></div>
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
