"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Star, Shield, Truck, Play, ChevronRight, Sparkles, Heart, Award, Zap } from "lucide-react"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group">
              <div className="relative">
                <ShoppingBag className="h-8 w-8 text-indigo-600 mr-3 transition-transform group-hover:scale-110" />
                <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Footwear
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200"
                onClick={() => (window.location.href = "/api/login")}
              >
                Browse Collection
              </Button>
              <Button
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={() => (window.location.href = "/api/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-800 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />✨ New Collection 2025 - Limited Edition
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance animate-fade-in-up">
              Step Into{" "}
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Extraordinary
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto text-gray-600 leading-relaxed animate-fade-in-up delay-200">
              Discover premium footwear that combines{" "}
              <span className="text-indigo-600 font-semibold">unmatched comfort</span>,{" "}
              <span className="text-purple-600 font-semibold">cutting-edge style</span>, and{" "}
              <span className="text-pink-600 font-semibold">performance</span> that moves with you
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up delay-300">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-6 text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                onClick={() => (window.location.href = "/api/login")}
              >
                Shop Now
                <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-10 py-6 text-xl transition-all duration-300 hover:shadow-lg group bg-transparent"
                onClick={() => (window.location.href = "/api/login")}
              >
                <Play className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                Watch Story
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-400">
              <div className="text-center group cursor-pointer">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  500+
                </div>
                <div className="text-sm lg:text-base text-gray-500 font-medium">Premium Styles</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  50K+
                </div>
                <div className="text-sm lg:text-base text-gray-500 font-medium">Happy Customers</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  4.9★
                </div>
                <div className="text-sm lg:text-base text-gray-500 font-medium">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Why Choose Footwear?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to providing you with an extraordinary shopping experience that exceeds expectations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-8 pb-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-10 w-10 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Premium Quality</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Handpicked shoes from top brands, ensuring unmatched durability, comfort, and style that lasts
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-8 pb-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Truck className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Lightning Fast Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Free shipping on orders over $50, with express delivery options and real-time tracking
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-8 pb-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Secure Shopping</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your data and payments are protected with military-grade security and encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find the perfect shoes for every occasion, style, and adventure that awaits you
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Men's Shoes", gradient: "from-blue-400 to-indigo-600", icon: "👔" },
              { name: "Women's Shoes", gradient: "from-pink-400 to-purple-600", icon: "👠" },
              { name: "Kids' Shoes", gradient: "from-yellow-400 to-orange-600", icon: "🧸" },
              { name: "Sports", gradient: "from-green-400 to-teal-600", icon: "⚡" },
            ].map((category) => (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white overflow-hidden"
                onClick={() => (window.location.href = "/api/login")}
              >
                <CardContent className="p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <div
                    className={`aspect-square bg-gradient-to-br ${category.gradient} rounded-2xl mb-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <span className="text-white text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 group-hover:text-gray-700 transition-colors">
                    {category.name}
                  </h3>
                  <div className="mt-4 flex justify-center">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8">
              <Heart className="w-4 h-4 mr-2 text-pink-400" />
              Join Our Community
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of happy customers who trust Footwear for their style journey
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-6 text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
              onClick={() => (window.location.href = "/api/login")}
            >
              <Zap className="mr-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
              Get Started Now
            </Button>
            <div className="flex items-center space-x-4 text-gray-400">
              <Award className="w-5 h-5" />
              <span className="text-sm">30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black text-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6 group">
                <div className="relative">
                  <ShoppingBag className="h-10 w-10 text-indigo-400 mr-3 group-hover:scale-110 transition-transform" />
                  <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Footwear
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Your destination for premium footwear. Step into style with our curated collection of extraordinary
                shoes.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram"].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="text-xs group-hover:scale-110 transition-transform">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {["About Us", "Contact", "Size Guide", "Returns", "FAQ"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Categories</h4>
              <ul className="space-y-3">
                {["Men's Shoes", "Women's Shoes", "Kids' Shoes", "Sports", "Accessories"].map((category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Footwear. All rights reserved. Made with <Heart className="w-4 h-4 inline text-pink-400" />{" "}
              for shoe lovers.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
