
import React, { useState } from 'react';
import { Plus, Upload, Save, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ProductUpload = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    originalPrice: '',
    description: '',
    features: [''],
    specifications: {},
    images: [],
    inStock: true,
    badge: '',
    discount: ''
  });

  const categories = ['Seeds', 'Fertilizers', 'Pesticides', 'Tools'];
  const badges = ['Best Seller', 'Organic', 'Premium', 'New Arrival', 'Limited Offer'];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
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

  const updateFeature = (index, value) => {
    setCurrentProduct(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index) => {
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

  const saveProduct = () => {
    if (!currentProduct.name || !currentProduct.category || !currentProduct.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const productToSave = {
      ...currentProduct,
      id: Date.now(),
      features: currentProduct.features.filter(f => f.trim() !== '')
    };

    setProducts(prev => [...prev, productToSave]);
    setCurrentProduct({
      name: '',
      category: '',
      brand: '',
      price: '',
      originalPrice: '',
      description: '',
      features: [''],
      specifications: {},
      images: [],
      inStock: true,
      badge: '',
      discount: ''
    });

    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from the catalog",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Upload Center</h1>
          <p className="text-gray-600">Add fertilizers, seeds, pesticides, and tools to your catalog</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Form */}
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

              <Button onClick={saveProduct} className="w-full bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Product
              </Button>
            </CardContent>
          </Card>

          {/* Product List */}
          <Card>
            <CardHeader>
              <CardTitle>Product Catalog ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No products added yet</p>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                          {product.badge && (
                            <Badge variant="secondary">{product.badge}</Badge>
                          )}
                        </div>
                        <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
