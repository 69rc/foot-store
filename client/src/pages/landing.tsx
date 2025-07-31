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
                Footwears
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200"
                onClick={() => (window.location.href = "/?user=customer")}
              >
                Browse as Customer
              </Button>
              <Button
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={() => (window.location.href = "/?user=admin")}
              >
                Admin Panel
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
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6 rounded-xl"
                onClick={() => (window.location.href = "/?user=customer")}
              >
                <ShoppingBag className="w-6 h-6 mr-3" />
                Start Shopping
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-indigo-400 text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/80 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                onClick={() => (window.location.href = "/?user=admin")}
              >
                <Play className="w-6 h-6 mr-3" />
                Admin Demo
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose Footwears?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of innovation, comfort, and style with every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Premium Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Crafted with the finest materials and attention to detail for long-lasting durability and comfort
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Fast Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Free shipping on orders over $50 with express delivery options available worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Customer Love</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join thousands of satisfied customers who trust us for their footwear needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <ShoppingBag className="h-8 w-8 text-indigo-400 mr-3" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Footwears
            </h3>
          </div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Step into a world of premium footwear designed for the modern lifestyle. Experience comfort, style, and performance like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
              onClick={() => (window.location.href = "/?user=customer")}
            >
              Explore Collection
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={() => (window.location.href = "/?user=admin")}
            >
              Admin Access
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}