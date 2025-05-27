
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import ProductForm from '@/components/ProductForm';
import ProductList from '@/components/ProductList';

const ProductUpload = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    originalPrice: '',
    description: '',
    features: [''],
    specifications: {} as Record<string, string>,
    images: [] as string[],
    inStock: true,
    badge: '',
    discount: ''
  });

  const saveProduct = () => {
    if (!currentProduct.name || !currentProduct.category || !currentProduct.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const productToSave: Product = {
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
      specifications: {} as Record<string, string>,
      images: [] as string[],
      inStock: true,
      badge: '',
      discount: ''
    });

    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const deleteProduct = (id: number) => {
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
          <ProductForm
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            onSave={saveProduct}
          />
          <ProductList
            products={products}
            onDeleteProduct={deleteProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
