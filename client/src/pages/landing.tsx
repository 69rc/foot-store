import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Star, Shield, Truck, Play, ChevronRight, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="relative">
                <ShoppingBag className="h-8 w-8 text-indigo-600 mr-3" />
                <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SoleStyle
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-gray-900"
                onClick={() => window.location.href = '/api/login'}
              >
                Browse Collection
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                onClick={() => window.location.href = '/api/login'}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                New Collection 2025
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Step Into 
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600 leading-relaxed">
              Discover premium footwear that combines unmatched comfort, cutting-edge style, and performance that moves with you
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={() => window.location.href = '/api/login'}
              >
                Shop Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg transition-all duration-200 hover:border-gray-400"
                onClick={() => window.location.href = '/api/login'}
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Story
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-500 font-medium">Premium Styles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
                <div className="text-sm text-gray-500 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">4.9★</div>
                <div className="text-sm text-gray-500 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SoleStyle?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Handpicked shoes from top brands, ensuring durability and comfort
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Truck className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Free shipping on orders over $50, with express delivery options
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
                <p className="text-muted-foreground">
                  Your data and payments are protected with bank-level security
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect shoes for every occasion and style
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Men's Shoes", "Women's Shoes", "Kids' Shoes", "Sports"].map((category) => (
              <Card key={category} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-center">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of happy customers who trust SoleStyle
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90"
            onClick={() => window.location.href = '/api/login'}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-8 w-8 text-accent mr-2" />
                <h3 className="text-2xl font-bold">SoleStyle</h3>
              </div>
              <p className="text-gray-300">
                Your destination for premium footwear. Step into style with our curated collection.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Contact</li>
                <li>Size Guide</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Men's Shoes</li>
                <li>Women's Shoes</li>
                <li>Kids' Shoes</li>
                <li>Sports</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <p className="text-gray-300">
                Follow us for the latest updates and exclusive offers
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SoleStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
