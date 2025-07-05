import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
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
      setSelectedSize("");
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
    if (!selectedSize) {
      setIsModalOpen(true);
      return;
    }

    addToCartMutation.mutate({
      productId: product.id,
      quantity: 1,
      size: selectedSize,
    });
  };

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl || "/api/placeholder/300/200"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black hover:bg-gray-100 rounded-full px-6"
            >
              Quick View
            </Button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3">
            {product.stock < 5 && product.stock > 0 && (
              <Badge className="bg-orange-500 text-white text-xs">
                Only {product.stock} left
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="bg-red-500 text-white text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
          
          {/* Wishlist button */}
          <div className="absolute top-3 right-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-white/90 hover:bg-white rounded-full w-10 h-10 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="mb-3">
            <Badge variant="outline" className="text-xs text-gray-600 mb-2 capitalize">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
            
            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">(4.8)</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              <span className="text-sm text-gray-500 line-through">${(parseFloat(product.price) * 1.2).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.slice(0, 4).map((size: string) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="w-10 h-8 p-0 text-xs rounded-lg"
                  >
                    {size}
                  </Button>
                ))}
                {product.sizes.length > 4 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                    className="w-10 h-8 p-0 text-xs"
                  >
                    +{product.sizes.length - 4}
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || addToCartMutation.isPending}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-3 font-medium"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>

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