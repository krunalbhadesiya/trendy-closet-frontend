import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type Product = {
  name: string;
  description: string;
  size: string;
  color: string;
  price: number;
  photoUrl: string;
  totalStock: number;
  currentStock: number;
};

export default function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!token) throw new Error("No token found. Please login.");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        const productData = response.data.product;

        setProduct({
          name: productData.name || '',
          description: productData.description || '',
          size: productData.size || 's',
          color: productData.color || 'black',
          price: productData.price || 0,
          photoUrl: productData.photoUrl || '',
          totalStock: productData.totalStock || 0,
          currentStock: productData.currentStock || 0,
        });
      } catch (error) {
        console.error("Error fetching product data", error);
        toast({
          title: "Error",
          description: "There was an error fetching the product data. Please try again.",
        });
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.currentTarget;
      const name = form.name.valueOf;
      const description = form.description.value;
      const size = form.size.value;
      const color = form.color.value;
      const price = Number(form.price.value);

      let photoUrl = product?.photoUrl || '';
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload`, formData, {
          headers: {
            "Authorization": `${token}`
          }
        });
        photoUrl = uploadResponse.data.url;
      }

      const productData = {
        name,
        description,
        size,
        color,
        price,
        photoUrl,
        totalStock: product?.totalStock || 0,
        currentStock: product?.currentStock || 0,
      };

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, productData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        }
      });

      toast({
        title: "Product updated successfully",
        description: `Product ${name} has been updated.`,
      });

      navigate("/admin/dashboard/product");

    } catch (error) {
      console.error("Error updating product", error);
      toast({
        title: "Error",
        description: "There was an error updating the product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Update Product</h1>
        <p className="text-muted-foreground">Fill out the form below to update the product.</p>
      </div>
      <div className={`${product.photoUrl ? 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6' : ''}`}>
        {product.photoUrl && (
          <img src={product.photoUrl} alt="Product" className="rounded-sm border-border border-2 p-2" />
        )}
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" type="text" defaultValue={product.name} placeholder="Enter product name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={product.description} placeholder="Enter product description" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="totalStock">Total Stock</Label>
              <Input id="totalStock" name="totalStock" type="number" defaultValue={product.totalStock} onChange={(e) => setProduct(prev => prev ? { ...prev, totalStock: +e.target.value } : null)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentStock">Current Stock</Label>
              <Input id="currentStock" name="currentStock" type="number" value={product.currentStock} disabled required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="size">Size</Label>
              <Select name="size" defaultValue={product.size.toLowerCase()}>
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
              <Select name="color" defaultValue={product.color.toLowerCase()}>
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
              <Input id="price" name="price" type="number" defaultValue={product.price} placeholder="Enter price" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Photo</Label>
              <Input id="image" name="image" type="file" onChange={handleImageChange} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Product'}
          </Button>
        </form>
      </div>
    </div>
  );
}
