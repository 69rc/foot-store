"use client"

import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { ArrowRight, Sparkles, Star, Heart, Zap } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/50 to-pink-900/30"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20 animate-pulse"></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
        <div className="text-center">
          {/* Enhanced Badge */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 text-sm font-medium text-white/90 mb-6 hover:scale-105 transition-all duration-300 cursor-pointer group">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400 animate-spin-slow group-hover:animate-spin" />✨ Premium
              Collection 2025 - Limited Edition
              <Zap className="w-4 h-4 ml-2 text-blue-400 animate-pulse" />
            </span>
          </div>

          {/* Enhanced Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 animate-fade-in-up">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-gradient-x">
              Foot
            </span>
            <span className="block bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent animate-gradient-x-delayed">
              wears
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl lg:text-4xl mb-16 max-w-4xl mx-auto text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text leading-relaxed animate-fade-in-up delay-200">
            Discover premium footwear that{" "}
            <span className="text-blue-300 font-semibold animate-pulse">defines your style</span>. From everyday comfort
            to special occasions, find your <span className="text-purple-300 font-semibold">perfect pair</span>.
          </p>

          {/* Enhanced Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in-up delay-300">
            <Link href="/products">
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-white to-gray-100 text-slate-900 hover:from-gray-100 hover:to-white px-10 py-6 text-xl font-bold rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  Explore Collection
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="relative border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10 py-6 text-xl font-bold rounded-full backdrop-blur-md transition-all duration-500 transform hover:scale-110 hover:shadow-2xl group overflow-hidden bg-transparent"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <Heart className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                View Lookbook
              </span>
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-400">
            <div className="text-center group cursor-pointer">
              <div className="relative">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-125 transition-all duration-300">
                  500+
                </div>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className="w-4 h-4 text-yellow-400 animate-spin" />
                </div>
              </div>
              <div className="text-sm lg:text-base text-gray-300 font-medium group-hover:text-white transition-colors">
                Premium Styles
              </div>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="relative">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-125 transition-all duration-300">
                  50K+
                </div>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                </div>
              </div>
              <div className="text-sm lg:text-base text-gray-300 font-medium group-hover:text-white transition-colors">
                Happy Customers
              </div>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="relative">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-125 transition-all duration-300">
                  4.9★
                </div>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-bounce" />
                </div>
              </div>
              <div className="text-sm lg:text-base text-gray-300 font-medium group-hover:text-white transition-colors">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-white/10 to-blue/20 rounded-full blur-sm animate-float-gentle"></div>
      <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-br from-purple-500/20 to-pink-500/30 rounded-full blur-sm animate-float-gentle-delayed"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/30 rounded-full blur-sm animate-float-gentle-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-green-400/20 to-teal-400/30 rounded-full blur-sm animate-float-gentle"></div>

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
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        
        @keyframes float-gentle-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(-5px); }
          50% { transform: translateY(-8px) translateX(8px); }
          75% { transform: translateY(-12px) translateX(-3px); }
        }
        
        @keyframes float-gentle-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-8px) translateX(4px) scale(1.1); }
          66% { transform: translateY(-4px) translateX(-6px) scale(0.9); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-x-delayed {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
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
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        .animate-float-gentle-delayed {
          animation: float-gentle-delayed 5s ease-in-out infinite;
        }
        
        .animate-float-gentle-slow {
          animation: float-gentle-slow 7s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-gradient-x-delayed {
          background-size: 200% 200%;
          animation: gradient-x-delayed 4s ease infinite;
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
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  )
}
