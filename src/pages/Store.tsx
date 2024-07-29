import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchNormal } from "iconsax-react";
import { Input } from "@/components/ui/input";

type Filters = {
  category: string[];
  size: string[];
  color: string[];
  priceRange: [number, number];
};

export default function Store() {
  const products = [
    {
      id: 1,
      image: "/product/tshirt-1.png",
      title: "Classic Tee",
      description: "A timeless cotton t-shirt",
      price: 19.99,
      category: "Tops",
      size: "M",
      color: "black",
    },
    {
      id: 2,
      image: "/product/tshirt-2.png",
      title: "Graphic Tee",
      description: "A stylish graphic t-shirt",
      price: 24.99,
      category: "Tops",
      size: "L",
      color: "white",
    },
    {
      id: 3,
      image: "/product/tshirt-3.png",
      title: "Striped Tee",
      description: "A casual striped t-shirt",
      price: 22.99,
      category: "Tops",
      size: "S",
      color: "blue",
    },
    {
      id: 4,
      image: "/product/tshirt-4.png",
      title: "Vintage Tee",
      description: "A retro-inspired t-shirt",
      price: 29.99,
      category: "Tops",
      size: "XL",
      color: "red",
    },
    {
      id: 5,
      image: "/placeholder.svg",
      title: "Oversized Tee",
      description: "A comfortable oversized t-shirt",
      price: 27.99,
      category: "Tops",
      size: "XXL",
      color: "green",
    },
    {
      id: 6,
      image: "/placeholder.svg",
      title: "Pocket Tee",
      description: "A t-shirt with a front pocket",
      price: 21.99,
      category: "Tops",
      size: "M",
      color: "gray",
    },
  ];

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 100],
  });

  const handleFilterChange = (type: string, value: string | string[] | [number, number]) => {
    if (type === "category") {
      setSelectedFilters({
        ...selectedFilters,
        category: (value as string[]).includes(value as string)
          ? selectedFilters.category.filter((item) => item !== (value as string))
          : [...selectedFilters.category, value as string],
      });
    } else if (type === "size") {
      setSelectedFilters({
        ...selectedFilters,
        size: (value as string[]).includes(value as string)
          ? selectedFilters.size.filter((item) => item !== (value as string))
          : [...selectedFilters.size, value as string],
      });
    } else if (type === "color") {
      setSelectedFilters({
        ...selectedFilters,
        color: (value as string[]).includes(value as string)
          ? selectedFilters.color.filter((item) => item !== (value as string))
          : [...selectedFilters.color, value as string],
      });
    } else if (type === "priceRange") {
      setSelectedFilters({
        ...selectedFilters,
        priceRange: value as [number, number],
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
        return false;
      }
      if (selectedFilters.size.length > 0 && !selectedFilters.size.includes(product.size)) {
        return false;
      }
      if (selectedFilters.color.length > 0 && !selectedFilters.color.includes(product.color)) {
        return false;
      }
      if (product.price < selectedFilters.priceRange[0] || product.price > selectedFilters.priceRange[1]) {
        return false;
      }
      return true;
    });
  }, [selectedFilters]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <span className="text-xl font-bold">T-Shirt Store</span>
          <div className="flex items-center gap-4">
            <Input className="bg-primary text-primary-foreground" prefix='' />
            <Button variant="secondary">
              <SearchNormal variant="Bulk" />
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8">
        <div className="bg-background rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="text-base">Category</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("category", "Tops")} />
                    Tops
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size">
              <AccordionTrigger className="text-base">Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("size", "S")} />
                    S
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("size", "M")} />
                    M
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("size", "L")} />
                    L
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("size", "XL")} />
                    XL
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("size", "XXL")} />
                    XXL
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="color">
              <AccordionTrigger className="text-base">Color</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("color", "black")} />
                    Black
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("color", "white")} />
                    White
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("color", "blue")} />
                    Blue
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("color", "red")} />
                    Red
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("color", "green")} />
                    Green
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox onCheckedChange={() => handleFilterChange("color", "gray")} />
                    Gray
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="priceRange">
              <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
              <AccordionContent>
                <div />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-background rounded-lg shadow-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button>Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
