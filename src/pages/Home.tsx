import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";



function Home() {

  return (
    <div className="flex-1">
    <section className="relative h-[70vh] md:h-[90vh] overflow-hidden">
      <img
        src="/hero-bg.jpeg"
        alt="Hero Image"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover blur-sm opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-6 text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Discover the Perfect Product</h1>
        <p className="max-w-md text-muted-foreground">
          Explore our curated collection of high-quality products that will elevate your lifestyle.
        </p>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90">
          Shop Now
        </button>
      </div>
    </section>
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full" data-v0-t="card">
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="400"
              height="400"
              className="aspect-square object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">Acme Wireless Headphones</h3>
              <p className="text-muted-foreground">Experience immersive audio with our premium wireless headphones.</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">$99.99</span>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full" data-v0-t="card">
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="400"
              height="400"
              className="aspect-square object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">Acme Smart Watch</h3>
              <p className="text-muted-foreground">
                Stay connected and track your fitness with our advanced smart watch.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">$149.99</span>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full" data-v0-t="card">
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="400"
              height="400"

              className="aspect-square object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">Acme Ergonomic Chair</h3>
              <p className="text-muted-foreground">
                Upgrade your workspace with our comfortable and stylish ergonomic chair.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">$199.99</span>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full" data-v0-t="card">
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="400"
              height="400"
              className="aspect-square object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">Acme Portable Speaker</h3>
              <p className="text-muted-foreground">
                Enjoy high-quality sound on the go with our compact and durable portable speaker.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">$79.99</span>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Product Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="relative group">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View Product</span>
            </a>
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="600"
              height="600"

              className="aspect-square object-cover rounded-lg group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Product
              </button>
            </div>
          </div>
          <div className="relative group">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View Product</span>
            </a>
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="600"
              height="600"

              className="aspect-square object-cover rounded-lg group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Product
              </button>
            </div>
          </div>
          <div className="relative group">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View Product</span>
            </a>
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="600"
              height="600"
              className="aspect-square object-cover rounded-lg group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Product
              </Button>
            </div>
          </div>
          <div className="relative group">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View Product</span>
            </a>
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="600"
              height="600"
              className="aspect-square object-cover rounded-lg group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Product
              </button>
            </div>
          </div>
          <div className="relative group">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View Product</span>
            </a>
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="600"
              height="600"
              className="aspect-square object-cover rounded-lg group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Product
              </button>
            </div>
          </div>
          <div className="relative group">
            <a className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View Product</span>
            </a>
            <img
              src="/product/tshirt-1.png"
              alt="Product Image"
              width="600"
              height="600"

              className="aspect-square object-cover rounded-lg group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-12 md:py-16 lg:py-20 bg-muted">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img className="aspect-square h-full w-full" width="24" height="24" src="/user-avtar.png" alt="user" />
                </span>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-muted-foreground text-sm">Satisfied Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star />
              </div>
              <p className="text-muted-foreground">
                &quot;I&apos;m absolutely thrilled with the products I&apos;ve purchased from Acme Ecommerce.&quot; <br />
                &quot;The quality is outstanding, and the customer service is top-notch. Highly recommended!&quot;
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img className="aspect-square h-full w-full" width="24" height="24" src="/user-avtar.png" alt="user" />
                </span>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-muted-foreground text-sm">Satisfied Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
              </div>
              <p className="text-muted-foreground">
                &quot;I&apos;m absolutely thrilled with the products I&apos;ve purchased from Acme Ecommerce.&quot; <br />
                &quot;The quality is outstanding, and the customer service is top-notch. Highly recommended!&quot;
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img className="aspect-square h-full w-full" src="/user-avtar.png" width="24" height="24" alt="user" />
                </span>
                <div>
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <p className="text-muted-foreground text-sm">Satisfied Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star fill="text-secondary" />
                <Star />
              </div>
              <p className="text-muted-foreground">
                &quot;I&apos;m absolutely thrilled with the products I&apos;ve purchased from Acme Ecommerce.&quot; <br />
                &quot;The quality is outstanding, and the customer service is top-notch. Highly recommended!&quot;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
  );
}

export default Home;
