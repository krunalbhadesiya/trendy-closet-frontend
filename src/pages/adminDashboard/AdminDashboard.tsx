import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "iconsax-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {

  return (

    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <h1 className="w-full text-center text-2xl font-bold mb-6 ">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-bold">$125,256</CardTitle>
            <CardDescription className="text-primary font-semibold">Total Sales</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-2 text-green-500">
            <ArrowUp className="h-4 w-4 " />
            <div>19% increase</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-bold">$75</CardTitle>
            <CardDescription className="text-primary font-semibold">Average Order Value</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-2 text-red-500">
            <ArrowDown className="h-4 w-4 " />
            <div>3% decrease</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-bold">1500</CardTitle>
            <CardDescription className="text-primary font-semibold">Total Avilabe Stock</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-2 text-red-500">
            <ArrowDown className="h-4 w-4 " />
            <div>56% decrease</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-bold">125</CardTitle>
            <CardDescription className="text-primary font-semibold">New Orders</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-2 text-green-500">
            <ArrowUp className="h-4 w-4 " />
            <div>5% increase</div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>The best-selling t-shirt designs in the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src="/placeholder.svg" width={48} height={48} alt="Product Image" />
                      <div>
                        <div className="font-medium">Classic Tee</div>
                        <div className="text-sm text-muted-foreground">Black, M</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>1,234</TableCell>
                  <TableCell>₹12,340</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src="/placeholder.svg"
                        width={48}
                        height={48}
                        alt="Product Image"
                        className="rounded-md"
                      />
                      <div>
                        <div className="font-medium">Graphic Tee</div>
                        <div className="text-sm text-muted-foreground">White, L</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>987</TableCell>
                  <TableCell>₹9,870</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src="/placeholder.svg"
                        width={48}
                        height={48}
                        alt="Product Image"
                        className="rounded-md"
                      />
                      <div>
                        <div className="font-medium">Striped Tee</div>
                        <div className="text-sm text-muted-foreground">Navy, XL</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>789</TableCell>
                  <TableCell>₹7,890</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
            <CardDescription>Key metrics about your customer base.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>New Customers</div>
                <div className="text-4xl font-bold">1,234</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Repeat Customers</div>
                <div className="text-4xl font-bold">987</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Average Order Value</div>
                <div className="text-4xl font-bold">₹75</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Customer Lifetime Value</div>
                <div className="text-4xl font-bold">₹250</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>The latest orders placed on your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#3210</TableCell>
                  <TableCell>Olivia Martin</TableCell>
                  <TableCell>February 20, 2022</TableCell>
                  <TableCell>₹42.25</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      Shipped
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#3209</TableCell>
                  <TableCell>Ava Johnson</TableCell>
                  <TableCell>January 5, 2022</TableCell>
                  <TableCell>₹74.99</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      Paid
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#3204</TableCell>
                  <TableCell>Michael Johnson</TableCell>
                  <TableCell>August 3, 2021</TableCell>
                  <TableCell>₹64.75</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      Unfulfilled
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div >

  )
}
