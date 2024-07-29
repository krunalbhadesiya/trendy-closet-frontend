import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Add, Minus } from "iconsax-react"

export default function Cart() {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="flex-1 py-8 px-4 md:px-6">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted/40 px-4 py-3 font-medium">Items in Cart</div>
                            <div className="divide-y">
                                <div className="grid grid-cols-[80px_1fr_100px] items-center gap-4 px-4 py-3">
                                    <img
                                        src="/placeholder.svg"
                                        width={80}
                                        height={80}
                                        alt="T-Shirt"
                                        className="rounded-md object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium">Acme T-Shirt</h3>
                                        <div className="text-sm text-muted-foreground">Size: Medium</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon">
                                            <Minus  className="h-4 w-4" />
                                        </Button>
                                        <span>1</span>
                                        <Button variant="outline" size="icon">
                                            <Add className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[80px_1fr_100px] items-center gap-4 px-4 py-3">
                                    <img
                                        src="/placeholder.svg"
                                        width={80}
                                        height={80}
                                        alt="T-Shirt"
                                        className="rounded-md object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium">Acme T-Shirt</h3>
                                        <div className="text-sm text-muted-foreground">Size: Large</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon">
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span>2</span>
                                        <Button variant="outline" size="icon">
                                            <Add className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[80px_1fr_100px] items-center gap-4 px-4 py-3">
                                    <img
                                        src="/placeholder.svg"
                                        width={80}
                                        height={80}
                                        alt="T-Shirt"
                                        className="rounded-md object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium">Acme T-Shirt</h3>
                                        <div className="text-sm text-muted-foreground">Size: Small</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon">
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span>1</span>
                                        <Button variant="outline" size="icon">
                                            <Add className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted/40 px-4 py-3 font-medium">Order Summary</div>
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>$99.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$9.90</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>$108.90</span>
                                </div>
                            </div>
                            <div className="bg-muted/40 px-4 py-3 flex gap-2">
                                <Button className="flex-1">Proceed to Checkout</Button>
                                <Button variant="outline" className="flex-1">
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
