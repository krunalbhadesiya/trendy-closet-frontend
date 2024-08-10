import Autoplay from "embla-carousel-autoplay"
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fetchedProducts = response.data.products;
      if (Array.isArray(fetchedProducts)) {
        setProducts(fetchedProducts);
        setError(null);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching products:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        <img
          src="/hero-bg.jpeg"
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-6 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Discover the Perfect Product
          </h1>
          <p className="max-w-md text-muted-foreground">
            Explore our curated collection of high-quality products that will elevate your lifestyle.
          </p>
          <Button className="px-8">Shop Now</Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Products</h2>
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {isLoading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <CarouselItem key={product._id} className="basis-1/4">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
                      <img
                        src={product.photoUrl || "/product/tshirt-2.png"}
                        alt={product.name}
                        className="aspect-square object-cover rounded-t-lg"
                      />
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-muted-foreground">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">₹{product.price}</span>
                          <Button className="h-9 rounded-md px-3">Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p>No products available</p>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Product Gallery</h2>
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          > {/* Ensure that Carousel wraps CarouselContent */}
            <CarouselContent>
              {isLoading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <CarouselItem key={product._id} className="basis-1/4">
                    <div className="relative group">
                      <a className="absolute inset-0 z-10" href="#">
                        <span className="sr-only">View Product</span>
                      </a>
                      <img
                        src={product.photoUrl}
                        alt={product.name}
                        className="aspect-square object-cover rounded-lg group-hover:opacity-50 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                          View Product
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p>No products available</p>
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img
                      className="aspect-square h-full w-full"
                      src="/user-avatar.png"
                      alt="user"
                    />
                  </span>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-muted-foreground text-sm">Satisfied Customer</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      fill="currentColor"
                      className={i < 4 ? "text-secondary" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">Amazing product! Exceeded my expectations.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
