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
  createdAt: string;
};

export default function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data", error);
        toast({
          title: "Error",
          description: "There was an error fetching the product data. Please try again.",
        });
      }
    };

    fetchProduct();
  }, [id]);

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
      const createdAt = form.createdAt.value;

      let photoUrl = product?.photoUrl || ''; // Default to existing URL
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadResponse = await axios.post("/api/upload", formData);
        photoUrl = uploadResponse.data.url;
      }

      const productData = {
        name,
        description,
        size,
        color,
        price,
        photoUrl,
        createdAt
      };

      await axios.put(`/api/products/${id}`, productData);

      toast({
        title: "Product updated successfully",
        description: `Product ${name} has been updated.`,
      });

      navigate("/admin/dashboard/product"); // Redirect after successful update

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
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" type="text" defaultValue={product.name} placeholder="Enter product name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={product.description} placeholder="Enter product description" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="createdAt">Created At</Label>
          <Input id="createdAt" name="createdAt" type="date" defaultValue={product.createdAt} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="size">Size</Label>
            <Select  name="size" defaultValue={product.size}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s">Small</SelectItem>
                <SelectItem value="m">Medium</SelectItem>
                <SelectItem value="l">Large</SelectItem>
                <SelectItem value="xl">X-Large</SelectItem>
                <SelectItem value="xxl">XX-Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <Select name="color" defaultValue={product.color}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" defaultValue={product.price} placeholder="Enter price" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Photo</Label>
            <Input id="image" name="image" type="file" onChange={handleImageChange} />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Product"}
        </Button>
      </form>
    </div>
  );
}
