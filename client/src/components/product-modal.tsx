import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Minus, Plus, Check } from "lucide-react";

interface ProductModalProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function ProductModal({ 
  product, 
  open, 
  onOpenChange, 
  selectedSize, 
  onSizeChange 
}: ProductModalProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

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
      onOpenChange(false);
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
      onSizeChange(product.sizes[0]);
    }
    addToCartMutation.mutate({
      productId: product.id,
      quantity,
      size: selectedSize || (product.sizes && product.sizes[0]) || "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={product.imageUrl || "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <img 
                  key={i}
                  src={product.imageUrl || "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"} 
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.8 (124 reviews)</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size: string) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => onSizeChange(size)}
                      className="h-10"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <Badge className="bg-green-100 text-green-800">
                  {product.stock} in stock
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  Out of stock
                </Badge>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending || product.stock === 0}
              >
                {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
            </div>
            
            {/* Features */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Premium leather construction
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Cushioned insole for comfort
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Durable rubber outsole
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Breathable lining
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
