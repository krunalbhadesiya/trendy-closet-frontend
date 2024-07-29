"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowSwapVertical } from "iconsax-react";

interface Order {
    id: string;
    customer: string;
    date: string;
    status: string;
    total: number;
}

const AdminOrder = () => {
    return (
        <div>
            <Component />
        </div>
    );
};

export default AdminOrder;

function Component() {
    const orders: Order[] = [
        {
            id: "ORD001",
            customer: "John Doe",
            date: "2023-05-01",
            status: "Pending",
            total: 49.99,
        },
        {
            id: "ORD002",
            customer: "Jane Smith",
            date: "2023-05-02",
            status: "Shipped",
            total: 59.99,
        },
        {
            id: "ORD003",
            customer: "Bob Johnson",
            date: "2023-05-03",
            status: "Delivered",
            total: 39.99,
        },
        {
            id: "ORD004",
            customer: "Sara Lee",
            date: "2023-05-04",
            status: "Cancelled",
            total: 29.99,
        },
        {
            id: "ORD005",
            customer: "Tom Wilson",
            date: "2023-05-05",
            status: "Pending",
            total: 69.99,
        },
        {
            id: "ORD006",
            customer: "Emily Davis",
            date: "2023-05-06",
            status: "Shipped",
            total: 79.99,
        },
        {
            id: "ORD007",
            customer: "Michael Brown",
            date: "2023-05-07",
            status: "Delivered",
            total: 49.99,
        },
        {
            id: "ORD008",
            customer: "Olivia Taylor",
            date: "2023-05-08",
            status: "Cancelled",
            total: 39.99,
        },
    ];

    const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
    const [sortBy, setSortBy] = useState<keyof Order>("date");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleFilter = (status: string) => {
        if (status === "all") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.status === status));
        }
    };

    const handleSort = (field: keyof Order) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortDirection("asc");
        }
    };

    const sortedOrders = useMemo(() => {
        return filteredOrders.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredOrders, sortBy, sortDirection]);

    //   const totalOrders = orders.length;
    //   const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="w-full text-center text-2xl font-bold mb-6 ">T-Shirt Order Management</h1>
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-4">Order Filters</h2>
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={() => handleFilter("all")}
                        variant={filteredOrders.length === orders.length ? "default" : "outline"}
                    >
                        All
                    </Button>
                    <Button
                        onClick={() => handleFilter("Pending")}
                        variant={filteredOrders.some((order) => order.status === "Pending") ? "default" : "outline"}
                    >
                        Pending
                    </Button>
                    <Button
                        onClick={() => handleFilter("Shipped")}
                        variant={filteredOrders.some((order) => order.status === "Shipped") ? "default" : "outline"}
                    >
                        Shipped
                    </Button>
                    <Button
                        onClick={() => handleFilter("Delivered")}
                        variant={filteredOrders.some((order) => order.status === "Delivered") ? "default" : "outline"}
                    >
                        Delivered
                    </Button>
                    <Button
                        onClick={() => handleFilter("Cancelled")}
                        variant={filteredOrders.some((order) => order.status === "Cancelled") ? "default" : "outline"}
                    >
                        Cancelled
                    </Button>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-4">Orders</h2>
                <div className="overflow-x-auto">
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button
                                        onClick={() => handleSort("id")}
                                        variant={sortBy === "id" ? "default" : "outline"}
                                        size="sm"
                                        className="flex items-center space-x-2"
                                    >
                                        <span>Order ID</span>
                                        {sortBy === "id" && <ArrowSwapVertical className="h-4 w-4" />}
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        onClick={() => handleSort("customer")}
                                        variant={sortBy === "customer" ? "default" : "outline"}
                                        size="sm"
                                        className="flex items-center space-x-2"
                                    >
                                        <span>Customer</span>
                                        {sortBy === "customer" && <ArrowSwapVertical className="h-4 w-4" />}
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        onClick={() => handleSort("date")}
                                        variant={sortBy === "date" ? "default" : "outline"}
                                        size="sm"
                                        className="flex items-center space-x-2"
                                    >
                                        <span>Order Date</span>
                                        {sortBy === "date" && <ArrowSwapVertical className="h-4 w-4" />}
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
                                        onClick={() => handleSort("total")}
                                        variant={sortBy === "total" ? "default" : "outline"}
                                        size="sm"
                                        className="flex items-center space-x-2"
                                    >
                                        <span>Total</span>
                                        {sortBy === "total" && <ArrowSwapVertical className="h-4 w-4" />}
                                    </Button>
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                order.status === "Pending"
                                                    ? "bg-green-500 text-white"
                                                    : order.status === "Shipped"
                                                        ? "bg-green-600 text-white"
                                                        : order.status === "Delivered"
                                                            ? "bg-green-700 text-white"
                                                            : "bg-red-600 text-white"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    );
}
