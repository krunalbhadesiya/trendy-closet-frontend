import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShirtIcon } from "lucide-react";
import { Drop, Scissor, Star } from "iconsax-react";
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
                                {/* <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-0.5">
                                        <Star className="w-5 h-5 fill-primary" />
                                        <Star className="w-5 h-5 fill-primary" />
                                        <Star className="w-5 h-5 fill-primary" />
                                        <Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                        <Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                    </div>
                                    <span className="text-muted-foreground">4.3 (124 reviews)</span>
                                </div> */}
                                <div className="text-4xl font-bold">₹ {product.price}</div>
                            </div>
                            <div className="text-base">
                                <span className="font-bold mr-1">
                                    Color:
                                </span>
                                {product.color.toUpperCase()}

                            </div>
                            <div className="text-base">
                                <span className="font-bold mr-1">
                                    Size:
                                </span>
                                {product.size.toUpperCase()}
                            </div>
                            <Button size="lg">Add to Cart</Button>
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
