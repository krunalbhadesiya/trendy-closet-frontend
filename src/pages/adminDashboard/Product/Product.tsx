import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Add, Edit, Eye, Trash } from "iconsax-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string; // Update from id to _id
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
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async () => {
    if (!deletingProductId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/products/${deletingProductId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      // Re-fetch products after deletion
      await fetchProducts();
      setDeletingProductId(null); // Clear the ID
    } catch (err) {
      setError("Failed to delete product.");
      console.error(err);
    }
  };

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
                <img src={product.photoUrl} alt={product.name} width={500} height={500} className="object-contain w-full  h-64" />
                <CardContent className="p-4 bg-background">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="border-t-2 mt-2 pt-2 flex items-center justify-between">
                    <h4 className="text-lg font-semibold">₹ {product.price.toFixed(2)}</h4>
                    <div className="flex gap-2">
                      <Link to={`/admin/dashboard/product/update/${product._id}`}>
                        <Button
                          size="icon"
                          className="rounded-full"
                          variant="outline">
                          <Edit size="18" variant="Bulk" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setDeletingProductId(product._id)} // Set the ID to be deleted
                          >
                            <Trash size="18" variant="Bulk" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the product and remove it from our database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeletingProductId(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        size="icon"
                        className="rounded-full"
                        variant="outline">
                        <Eye size="18" variant="Bulk" />
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
