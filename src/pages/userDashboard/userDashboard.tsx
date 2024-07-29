import { Link } from "react-router-dom"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function UserDashboard() {
    const orders = [
        {
            id: 1,
            date: "2023-05-12",
            items: [
                { name: "Product A", quantity: 2 },
                { name: "Product B", quantity: 1 },
            ],
            total: 150.0,
            status: "Delivered",
        },
        {
            id: 2,
            date: "2023-04-28",
            items: [
                { name: "Product C", quantity: 1 },
                { name: "Product D", quantity: 3 },
            ],
            total: 250.0,
            status: "Shipped",
        },
        {
            id: 3,
            date: "2023-03-15",
            items: [
                { name: "Product E", quantity: 1 },
                { name: "Product F", quantity: 2 },
            ],
            total: 180.0,
            status: "Pending",
        },
        {
            id: 4,
            date: "2023-02-22",
            items: [
                { name: "Product G", quantity: 4 },
                { name: "Product H", quantity: 1 },
            ],
            total: 320.0,
            status: "Delivered",
        },
        {
            id: 5,
            date: "2023-01-08",
            items: [
                { name: "Product I", quantity: 2 },
                { name: "Product J", quantity: 3 },
            ],
            total: 400.0,
            status: "Shipped",
        },
    ]
    const cart = [
        {
            id: 1,
            name: "Product A",
            quantity: 2,
            price: 25.0,
        },
        {
            id: 2,
            name: "Product B",
            quantity: 1,
            price: 50.0,
        },
        {
            id: 3,
            name: "Product C",
            quantity: 3,
            price: 15.0,
        },
    ]
    return (
        <div className="flex min-h-screen flex-col bg-muted/40">

            <div className="flex-1 p-4 sm:p-6">
                <div className="grid gap-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Recent Orders</h2>
                            <Link to="user/order" className="text-sm font-medium underline">
                                View more
                            </Link>
                        </div>
                        <div className="mt-4 border shadow-sm rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order #</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>#{order.id}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>
                                                {order.items.map((item, index) => (
                                                    <div key={index}>
                                                        {item.quantity} x {item.name}
                                                    </div>
                                                ))}
                                            </TableCell>
                                            <TableCell>${order.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge variant={"outline"}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Cart</h2>
                            <Link to="user/cart" className="text-sm font-medium underline">
                                View more
                            </Link>
                        </div>
                        <div className="mt-4 border shadow-sm rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>${item.price.toFixed(2)}</TableCell>
                                            <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
