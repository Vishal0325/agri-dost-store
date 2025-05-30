
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: number) => void;
}

const ProductList = ({ products, onDeleteProduct }: ProductListProps) => {
  // Display only first 8 products for 2x4 grid
  const displayProducts = products.slice(0, 8);

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <span>उत्पाद सूची ({displayProducts.length}/8)</span>
          <span className="text-sm font-normal opacity-90">2×4 ग्रिड व्यू</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {displayProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">अभी तक कोई उत्पाद नहीं जोड़ा गया</p>
            <p className="text-sm text-gray-400 mt-2">कृपया उत्पाद जोड़ें</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
            {displayProducts.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard
                  product={product}
                  onDelete={onDeleteProduct}
                />
              </div>
            ))}
          </div>
        )}
        
        {products.length > 8 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {products.length - 8} और उत्पाद उपलब्ध हैं
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
