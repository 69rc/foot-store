import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isLoading } = useAuth();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart"],
    enabled: !!user,
  });

  const cartCount = cartItems.length;

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Footwears
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-gray-700 hover:text-gray-900 font-medium transition-colors pb-1 ${location === "/" ? "text-gray-900 border-b-2 border-gray-900" : ""}`}>
              Home
            </Link>
            <Link href="/products" className={`text-gray-700 hover:text-gray-900 font-medium transition-colors pb-1 ${location === "/products" ? "text-gray-900 border-b-2 border-gray-900" : ""}`}>
              Products
            </Link>
            {user?.role === "admin" && (
              <Link href="/admin" className={`text-gray-700 hover:text-gray-900 font-medium transition-colors pb-1 ${location === "/admin" ? "text-gray-900 border-b-2 border-gray-900" : ""}`}>
                Admin
              </Link>
            )}
            <Link href="/orders" className={`text-gray-700 hover:text-gray-900 font-medium transition-colors pb-1 ${location === "/orders" ? "text-gray-900 border-b-2 border-gray-900" : ""}`}>
              Orders
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="w-5 h-5 text-gray-600" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <Heart className="w-5 h-5 text-gray-600" />
            </Button>
            
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {isLoading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Hi, {user.firstName || user.email}</span>
                </div>
                <a href="/api/logout">
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Logout
                  </Button>
                </a>
              </div>
            ) : (
              <a href="/api/login">
                <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                  Sign In
                </Button>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Products
              </Link>
              {user?.role === "admin" && (
                <Link href="/admin" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  Admin
                </Link>
              )}
              <Link href="/cart" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Cart ({cartCount})
              </Link>
              <Link href="/orders" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Orders
              </Link>
              {user ? (
                <a href="/api/logout" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  Logout
                </a>
              ) : (
                <a href="/api/login" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  Sign In
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}