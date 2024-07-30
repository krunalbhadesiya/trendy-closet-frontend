import { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

// Custom hook for form handling
const useFormState = () => {
  const [image, setImage] = useState<File | null>(null);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  }, []);

  const handleTotalStockChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalStock(parseInt(e.target.value, 10));
  }, []);

  const resetForm = () => {
    setImage(null);
    setTotalStock(0);
  };

  return { image, totalStock, isLoading, handleImageChange, handleTotalStockChange, resetForm, setIsLoading };
};

export default function AddProduct() {
  const { image, totalStock, isLoading, handleImageChange, handleTotalStockChange, resetForm, setIsLoading } = useFormState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");
  
      let photoUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        console.log("Uploading image...", formData); // Debugging log
  
        const uploadResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `${token}`, // Ensure the token is prefixed with Bearer
          }
        });
  
        console.log("Image upload response:", uploadResponse); // Debugging log
        photoUrl = uploadResponse.data.imageUrl; // Ensure the response contains the URL in 'url' field
      }
  
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const productData = {
        name: formData.get("name"),
        description: formData.get("description"),
        totalStock,
        currentStock: totalStock,
        size: formData.get("size"),
        color: formData.get("color"),
        price: formData.get("price"),
        photoUrl
      };
  
      console.log("Submitting product data:", productData); // Debugging log
  
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, productData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`, // Ensure the token is prefixed with Bearer
        }
      });
  
      toast({
        title: "Product added successfully",
        description: `Product ${productData.name} has been added to your store.`,
      });
  
      resetForm();
    } catch (error) {
      console.error("Error submitting form", error);
      toast({
        title: "Error",
        description: "There was an error adding the product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground">Fill out the form below to add a new product to your store.</p>
      </div>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" type="text" placeholder="Enter product name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Enter product description" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="totalStock">Total Stock</Label>
            <Input id="totalStock" name="totalStock" type="number" value={totalStock} onChange={handleTotalStockChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currentStock">Current Stock</Label>
            <Input id="currentStock" name="currentStock" type="number" value={totalStock} disabled required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="size">Size</Label>
            <Select name="size">
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {["s", "m", "l", "xl", "xxl"].map(size => (
                  <SelectItem key={size} value={size}>{size.toUpperCase()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <Select name="color">
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {["black", "white", "blue", "red", "green", "gray", "orange"].map(color => (
                  <SelectItem key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" placeholder="Enter price" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Photo</Label>
            <Input id="image" name="image" type="file" onChange={handleImageChange} required />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Product'}
        </Button>
      </form>
    </div>
  );
}
