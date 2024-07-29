import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Add, Edit, Eye, Trash } from "iconsax-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function AdminProduct() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 gap-1">
      <div className="sticky top-0 z-30 flex h-14 justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <span className="hidden">h</span>
        <h1 className="w-full text-center text-2xl font-bold mb-6 ">Product Management</h1>
        <Dialog>
          <DialogTrigger>
            <Button className="ml-4 gap-2 md:gap-4" size="sm">
              <Add /> Add Products
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Products</DialogTitle>
              <DialogDescription>
                Under Maintance
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">

            <img src="/product/tshirt-4.png" alt="T-Shirt 5" width={500} height={400} className="object-cover w-full h-64"  />
            <CardContent className="p-4 bg-background">
              <h3 className="text-xl font-bold">Oversized Tee</h3>
              <p className="text-sm text-muted-foreground">Relaxed fit, 100% cotton</p>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">$27.99</h4>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger>
                      <Button size="icon" variant="outline">
                        <Edit size="16" variant="Bulk" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Under Maintance
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <Button size="icon" variant="outline">
                        <Trash size="16" variant="Bulk" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are Confirm Delete</DialogTitle>
                        <DialogDescription>
                          Under Maintance
                        </DialogDescription>

                      </DialogHeader>
                      <DialogFooter>

                        <Button variant="outline">
                          Yes
                        </Button>
                        <Button variant="outline">
                          No
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button size="icon" variant="outline">
                    <Eye size="16" variant="Bulk" />
                    <span className="sr-only">View</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
