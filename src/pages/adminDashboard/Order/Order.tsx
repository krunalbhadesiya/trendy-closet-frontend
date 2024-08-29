import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowSwapVertical } from "iconsax-react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
    productId: string;
    productName: string;
    qty: number;
    _id: string;
}

interface Order {
    _id: string;
    customerName: string;
    products: Product[];
    paymentType: string;
    paymentStatus: string;
    status: string;
    deliveryDate: string;
    totalAmount: number;
    createdAt: string;
}

function AdminOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [sortBy, setSortBy] = useState<keyof Order>("createdAt");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // const username = localStorage.getItem("username");
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/orders`,
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const sortedOrders = useMemo(() => {
        return orders.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [orders, sortBy, sortDirection]);

    const handleSort = (field: keyof Order) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortDirection("asc");
        }
    };

    return (
        <div className="mx-auto p-4">
            <h1 className="w-full text-center text-2xl font-bold pb-4 border-b-2">Order Management</h1>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {/* <TableHead>
                                <Button
                                    onClick={() => handleSort("_id")}
                                    variant={sortBy === "_id" ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <span>Order ID</span>
                                    {sortBy === "_id" && <ArrowSwapVertical className="h-4 w-4" />}
                                </Button>
                            </TableHead> */}
                            <TableHead>
                                <Button
                                    onClick={() => handleSort("customerName")}
                                    variant={sortBy === "customerName" ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <span>Customer</span>
                                    {sortBy === "customerName" && <ArrowSwapVertical className="h-4 w-4" />}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    onClick={() => handleSort("createdAt")}
                                    variant={sortBy === "createdAt" ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <span>Order Date</span>
                                    {sortBy === "createdAt" && <ArrowSwapVertical className="h-4 w-4" />}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    onClick={() => handleSort("status")}
                                    variant={sortBy === "status" ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <span>Status</span>
                                    {sortBy === "status" && <ArrowSwapVertical className="h-4 w-4" />}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    onClick={() => handleSort("totalAmount")}
                                    variant={sortBy === "totalAmount" ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center space-x-2"
                                >
                                    <span>Total</span>
                                    {sortBy === "totalAmount" && <ArrowSwapVertical className="h-4 w-4" />}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant={"outline"} size="sm" className="flex items-center space-x-2">
                                    <span>Action</span>
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedOrders.map((order) => (
                            <TableRow key={order._id}>
                                {/* <TableCell>{order._id}</TableCell> */}
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={"outline"}
                                        className={
                                            order.status === "Pending"
                                                ? "bg-yellow-500 text-white"
                                                : order.status === "Shipped"
                                                    ? "bg-blue-500 text-white"
                                                    : order.status === "Delivered"
                                                        ? "bg-green-500 text-white"
                                                        : "bg-red-500 text-white"
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>₹ {order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell className="flex flex-row gap-2">
                                    <Link to={`../admin/dashboard/order/${order._id}`}>
                                        <Button variant={"outline"} size="sm" >
                                            View
                                        </Button>
                                    </Link>
                                    <Link to={`../admin/dashboard/order/edit/${order._id}`}>
                                        <Button variant={"outline"} size="sm" >
                                            Edit
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default AdminOrder;
