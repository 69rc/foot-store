import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import ProductModal from "./product-modal";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <>
      <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden border-0 shadow-md">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <div 
              className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200"
              onClick={() => setIsProductModalOpen(true)}
            >
              <img
                src={product.imageUrl || "/api/placeholder/300/300"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml;base64,₦{btoa(`
                    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#f3f4f6"/>
                      <rect x="25%" y="25%" width="50%" height="50%" fill="#d1d5db" rx="8"/>
                      <text x="50%" y="55%" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="16">Product Image</text>
                    </svg>
                  `)}`;
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-gray-900 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProductModalOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white p-2 shadow-lg">
                <Heart className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
            
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4 bg-red-500 text-white">
                Only {product.stock} left
              </Badge>
            )}
            
            {product.stock === 0 && (
              <Badge variant="secondary" className="absolute top-4 left-4 bg-gray-500 text-white">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <div className="p-5">
            <div className="mb-3">
              <Badge variant="outline" className="text-xs font-medium text-gray-600 border-gray-300">
                {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}
              </Badge>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2 font-medium">(4.8) • 127 reviews</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                 ${product.price}
                </span>
                <span className="text-sm text-gray-500">Free shipping</span>
              </div>
              
              <Button 
                onClick={() => setIsProductModalOpen(true)}
                disabled={product.stock === 0}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductModal
        product={product}
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />
    </>
  );
}