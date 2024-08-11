import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShirtIcon } from "lucide-react";
import { Drop, Scissor } from "iconsax-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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

export default function Products() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            setIsLoading(true);

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
                setProduct(data.product);
            } catch (error) {
                console.error("Error fetching product data", error);
                toast({
                    title: "Error",
                    description: "There was an error fetching the product data. Please try again.",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle adding the product to the cart
    const handleAddToCart = async () => {
        if (!product || !id) return;

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            toast({
                title: "Error",
                description: "You need to be logged in to add items to the cart.",
            });
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/cart`,
                {
                    username: username,
                    pid: id,
                    productName: product.name,
                    productPhotoUrl: product.photoUrl,
                    productSize: product.size,
                    productColor: product.color,
                    productPrice: product.price,
                    cartCount: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast({
                title: "Success",
                description: `${product.name} has been added to your cart.`,
            });
        } catch (error) {
            console.error("Error adding product to cart", error);
            toast({
                title: "Error",
                description: "There was an error adding the product to the cart. Please try again.",
            });
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading products...</p>
            ) : (
                product && (
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-12">
                        <div className="grid gap-4">
                            <img
                                src={product.photoUrl}
                                alt="Product Image"
                                className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
                            />
                        </div>
                        <div className="grid gap-4 md:gap-6 items-start">
                            <div className="grid gap-2">
                                <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
                                <p className="text-muted-foreground">{product.description}</p>
                            </div>
                            <div className="grid gap-2">
                                <div className="text-4xl font-bold">₹ {product.price}</div>
                            </div>
                            <div className="text-base">
                                <span className="font-bold mr-1">Color:</span>
                                {product.color.toUpperCase()}
                            </div>
                            <div className="text-base">
                                <span className="font-bold mr-1">Size:</span>
                                {product.size.toUpperCase()}
                            </div>
                            <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
                            <Separator />
                            <div className="grid gap-4 text-sm leading-loose">
                                <h2 className="font-bold text-lg">Product Details</h2>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <ShirtIcon className="w-5 h-5 text-muted-foreground" />
                                        <span>100% Organic Cotton</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Scissor className="w-5 h-5 text-muted-foreground" />
                                        <span>Ethically Sourced</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Drop className="w-5 h-5 text-muted-foreground" />
                                        <span>Machine Washable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
