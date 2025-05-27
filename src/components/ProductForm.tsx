
import React from 'react';
import { Plus, Upload, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  price: string;
  originalPrice: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  inStock: boolean;
  badge: string;
  discount: string;
}

interface ProductFormProps {
  currentProduct: ProductFormData;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductFormData>>;
  onSave: () => void;
}

const ProductForm = ({ currentProduct, setCurrentProduct, onSave }: ProductFormProps) => {
  const categories = ['Seeds', 'Fertilizers', 'Pesticides', 'Tools'];
  const badges = ['Best Seller', 'Organic', 'Premium', 'New Arrival', 'Limited Offer'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const imageUrls = files.map((file: File) => URL.createObjectURL(file));
    setCurrentProduct(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const addFeature = () => {
    setCurrentProduct(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setCurrentProduct(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    const key = prompt('Enter specification name:');
    const value = prompt('Enter specification value:');
    if (key && value) {
      setCurrentProduct(prev => ({
        ...prev,
        specifications: { ...prev.specifications, [key]: value }
      }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Premium Hybrid Tomato Seeds"
            />
          </div>
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={currentProduct.category}
              onValueChange={(value) => setCurrentProduct(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={currentProduct.brand}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, brand: e.target.value }))}
              placeholder="SeedCorp"
            />
          </div>
          <div>
            <Label htmlFor="badge">Badge</Label>
            <Select
              value={currentProduct.badge}
              onValueChange={(value) => setCurrentProduct(prev => ({ ...prev, badge: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select badge" />
              </SelectTrigger>
              <SelectContent>
                {badges.map(badge => (
                  <SelectItem key={badge} value={badge}>{badge}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, price: e.target.value }))}
              placeholder="450"
            />
          </div>
          <div>
            <Label htmlFor="originalPrice">Original Price (₹)</Label>
            <Input
              id="originalPrice"
              type="number"
              value={currentProduct.originalPrice}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, originalPrice: e.target.value }))}
              placeholder="550"
            />
          </div>
          <div>
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              value={currentProduct.discount}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, discount: e.target.value }))}
              placeholder="18% OFF"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={currentProduct.description}
            onChange={(e) => setCurrentProduct(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Premium quality hybrid tomato seeds..."
            rows={3}
          />
        </div>

        {/* Features */}
        <div>
          <Label>Features</Label>
          <div className="space-y-2">
            {currentProduct.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="High yield variety - up to 40-50 kg per plant"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              <Plus className="h-4 w-4 mr-2" /> Add Feature
            </Button>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <Label>Specifications</Label>
          <div className="space-y-2">
            {Object.entries(currentProduct.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSpecification}>
              <Plus className="h-4 w-4 mr-2" /> Add Specification
            </Button>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="images">Product Images</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Label htmlFor="images" className="cursor-pointer">
              <Button type="button" variant="outline">Choose Files</Button>
            </Label>
          </div>
          {currentProduct.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {currentProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <Button onClick={onSave} className="w-full bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
