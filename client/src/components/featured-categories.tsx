import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Men's Collection",
    description: "Classic and contemporary styles",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=men",
    count: "150+ styles"
  },
  {
    name: "Women's Collection",
    description: "Elegant and comfortable designs",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=women",
    count: "200+ styles"
  },
  {
    name: "Kids' Collection",
    description: "Fun and durable footwear",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=kids",
    count: "80+ styles"
  },
  {
    name: "Sports Collection",
    description: "Performance athletic wear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    href: "/products?category=sports",
    count: "120+ styles"
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover Our Collections</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From timeless classics to cutting-edge designs, find the perfect pair for every step of your journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.name} 
              className="group cursor-pointer"
              style={{ animationDelay: `₦{index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium opacity-90 mb-1">{category.count}</p>
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90 mb-4">{category.description}</p>
                      
                      <Link href={category.href}>
                        <Button 
                          className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-2 font-medium transition-all duration-300 transform group-hover:scale-105"
                        >
                          Explore Collection
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link href="/products">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}