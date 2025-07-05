import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductFiltersProps {
  filters: {
    category: string;
    sizes: string[];
    search: string;
    minPrice: string;
    maxPrice: string;
  };
  onFiltersChange: (filters: any) => void;
}

const categories = [
  { id: "men", label: "Men's Shoes" },
  { id: "women", label: "Women's Shoes" },
  { id: "kids", label: "Kids' Shoes" },
  { id: "sports", label: "Sports" },
];

const sizes = ["6", "7", "8", "9", "10", "11", "12"];

export default function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : "",
    });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked 
      ? [...filters.sizes, size]
      : filters.sizes.filter(s => s !== size);
    
    onFiltersChange({
      ...filters,
      sizes: newSizes,
    });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      sizes: [],
      search: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Filters
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.category === category.id}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="text-sm cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                className="w-full"
              />
              <span className="text-sm text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
