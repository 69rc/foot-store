import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import ProductModal from "./product-modal";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity, size }: { productId: number; quantity: number; size: string }) => {
      await apiRequest('POST', '/api/cart', { productId, quantity, size });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    addToCartMutation.mutate({
      productId: product.id,
      quantity: 1,
      size: selectedSize || (product.sizes && product.sizes[0]) || "",
    });
  };

  return (
    <>
      <Card className="group cursor-pointer hover:shadow-xl transition-shadow overflow-hidden">
        <div className="relative" onClick={() => setIsModalOpen(true)}>
          <img 
            src={product.imageUrl || "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock < 10 && product.stock > 0 && (
            <Badge className="absolute top-2 right-2 bg-yellow-500">
              Low Stock
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Out of Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>
          <Button 
            className="w-full bg-accent hover:bg-accent/90"
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending || product.stock === 0}
          >
            {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>

      <ProductModal 
        product={product} 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />
    </>
  );
}
