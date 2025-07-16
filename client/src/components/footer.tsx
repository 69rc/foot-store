"use client"

import {
  ShoppingBag,
  Sparkles,
  Heart,
  Mail,
  Send,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6 group">
                <div className="relative">
                  <ShoppingBag className="h-10 w-10 text-indigo-400 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Footwears
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Your destination for premium footwear. Step into style with our curated collection of shoes for every
                occasion.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <MapPin className="h-4 w-4 mr-3 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">123 Fashion Street, Style City</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <Phone className="h-4 w-4 mr-3 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                  <Clock className="h-4 w-4 mr-3 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Mon-Fri: 9AM-8PM</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                  { icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                  { icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
                  { icon: Youtube, color: "hover:bg-red-600", label: "YouTube" },
                ].map(({ icon: Icon, color, label }) => (
                  <a
                    key={label}
                    href="#"
                    className={`w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center ${color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg group`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/products", label: "Products" },
                  { href: "#", label: "About Us" },
                  { href: "#", label: "Contact" },
                  { href: "#", label: "Size Guide" },
                  { href: "#", label: "Shipping Info" },
                  { href: "#", label: "Returns & Exchanges" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href}>
                      <a className="text-gray-300 hover:text-white transition-all duration-200 flex items-center group">
                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{label}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white relative">
                Categories
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/products?category=men", label: "Men's Shoes", emoji: "👔" },
                  { href: "/products?category=women", label: "Women's Shoes", emoji: "👠" },
                  { href: "/products?category=kids", label: "Kids' Shoes", emoji: "🧸" },
                  { href: "/products?category=sports", label: "Sports", emoji: "⚡" },
                  { href: "/products", label: "All Products", emoji: "🛍️" },
                ].map(({ href, label, emoji }) => (
                  <li key={label}>
                    <Link href={href}>
                      <a className="text-gray-300 hover:text-white transition-all duration-200 flex items-center group">
                        <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">
                          {emoji}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{label}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white relative">
                Stay Connected
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-indigo-400"></div>
              </h4>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Subscribe to get updates on new arrivals, exclusive offers, and style tips delivered to your inbox.
              </p>

              {/* Newsletter Form */}
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-12 pr-4 py-3 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-lg backdrop-blur-sm"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  Subscribe Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-3">Trusted by 50,000+ customers</p>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full border-2 border-gray-800 flex items-center justify-center"
                      >
                        <span className="text-xs">⭐</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center text-gray-300">
                <p>&copy; 2024 Footwears. All rights reserved.</p>
                <Heart className="w-4 h-4 ml-2 text-pink-400 animate-pulse" />
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
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
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
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
      `}</style>
    </footer>
  )
}
