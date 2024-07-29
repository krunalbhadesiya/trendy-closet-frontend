import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function AddOrder() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <img
          src="/placeholder.svg"
          alt="Product Image"
          width={600}
          height={900}
          className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">Acme Circles T-Shirt</h1>
          <div>
            <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base">
              Quantity
            </Label>
            <Input id="quantity" type="number" placeholder="1" className="w-28"/>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">$99</div>
            <Button size="lg" className="ml-auto">
              Add to Cart
            </Button>
            <Button size="lg">Buy Now</Button>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 text-sm leading-loose">
          <h2 className="text-lg font-bold">Product Details</h2>
          <p>
            Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern individual. This tee
            is crafted with a meticulous composition of 60% combed ringspun cotton and 40% polyester jersey, ensuring a
            soft and breathable fabric that feels gentle against the skin.
          </p>
          <p>
            The design of the Acme Prism T-Shirt is as striking as it is comfortable. The shirt features a unique
            prism-inspired pattern that adds a modern and eye-catching touch to your ensemble.
          </p>
        </div>
      </div>
    </div>
  )
}