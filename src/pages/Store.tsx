import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  size?: string;
  color?: string;
}

export default function Store() {
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
    <div className="container py-2 md:py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="bg-background rounded-lg shadow-sm overflow-hidden border-2">
            <img
              src={product.photoUrl}
              alt={product.name}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">₹ {product.price}</span>
                <Link to={`../products/${product._id}`}>
                  <Button variant={"outline"}>
                    View More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
