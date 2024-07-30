import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Add, Edit, Eye, Trash } from "iconsax-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import AddProduct from "./AddProduct/AddProduct";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  photoUrl: string;
}

export default function AdminProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login.");

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          }
        });

        console.log("API Response:", response.data); // Log the response

        // Adjust based on actual response structure
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Example for wrapped response
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };



    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 gap-1 p-4">
      <div className="flex justify-end bg-background pb-4 border-b-2">
        <h1 className="w-full text-center text-2xl font-bold">Product Management</h1>
        <Link to="add">
          <Button className="ml-4 gap-2 md:gap-4" size="sm">
            <Add />
            <span className="hidden md:flex">Add Products</span>
          </Button>
        </Link>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map(product => (
              <Card key={product.id} className="relative overflow-hidden transition-transform  duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:scale-105">
                <img src={product.photoUrl} alt={product.name} width={500} height={400} className="object-cover w-full h-64" />
                <CardContent className="p-4 bg-background">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">${product.price.toFixed(2)}</h4>
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
                              <AddProduct />
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
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this product?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Yes</Button>
                            <Button variant="outline">No</Button>
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
            ))
          ) : (
            !isLoading && <p>No products available</p>
          )}
        </div>
      </main>
    </div>
  );
}
