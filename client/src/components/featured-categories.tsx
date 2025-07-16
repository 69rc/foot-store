"use client"

import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { ArrowRight, Sparkles, Star, Heart, Zap, Crown, Award } from "lucide-react"

const categories = [
  {
    name: "Men's Collection",
    description: "Classic and contemporary styles",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=men",
    count: "150+ styles",
    gradient: "from-blue-600/80 to-indigo-600/80",
    accent: "text-blue-400",
    icon: Crown,
    badge: "Premium",
  },
  {
    name: "Women's Collection",
    description: "Elegant and comfortable designs",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=women",
    count: "200+ styles",
    gradient: "from-pink-600/80 to-purple-600/80",
    accent: "text-pink-400",
    icon: Heart,
    badge: "Trending",
  },
  {
    name: "Kids' Collection",
    description: "Fun and durable footwear",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=kids",
    count: "80+ styles",
    gradient: "from-yellow-500/80 to-orange-500/80",
    accent: "text-yellow-400",
    icon: Star,
    badge: "Popular",
  },
  {
    name: "Sports Collection",
    description: "Performance athletic wear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=sports",
    count: "120+ styles",
    gradient: "from-green-600/80 to-teal-600/80",
    accent: "text-green-400",
    icon: Zap,
    badge: "Athletic",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="mb-6">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-800 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
              Curated Collections
              <Award className="w-4 h-4 ml-2 text-purple-600" />
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Discover Our Collections
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From <span className="text-indigo-600 font-semibold">timeless classics</span> to{" "}
            <span className="text-purple-600 font-semibold">cutting-edge designs</span>, find the perfect pair for every
            step of your journey.
          </p>
        </div>

        {/* Enhanced Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1">
                {/* Image Container */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />

                  {/* Enhanced Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.gradient} via-black/30 to-transparent`}
                  />

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-lg">
                      {category.badge}
                    </div>
                  </div>

                  {/* Animated Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <category.icon className={`w-6 h-6 ${category.accent}`} />
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white">
                      <div className="flex items-center mb-2">
                        <p className="text-sm font-bold opacity-90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {category.count}
                        </p>
                        <Sparkles className="w-4 h-4 ml-2 text-yellow-400 animate-pulse" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm opacity-90 mb-6 leading-relaxed">{category.description}</p>

                      <Link href={category.href}>
                        <Button className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white hover:text-black rounded-full px-6 py-3 font-bold transition-all duration-300 transform group-hover:scale-110 hover:shadow-xl group border-0">
                          <span className="flex items-center">
                            Explore Collection
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`h-1 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center animate-fade-in-up delay-600">
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-4">Ready to explore our entire collection?</p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                  >
                    <Star className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">Rated 4.9/5 by 50,000+ customers</span>
            </div>
          </div>

          <Link href="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gray-900 via-gray-800 to-black hover:from-black hover:via-gray-900 hover:to-gray-800 text-white px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center">
                <Zap className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                View All Products
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
          </Link>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
              30-day return policy
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
              Lifetime warranty available
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
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
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  )
}
