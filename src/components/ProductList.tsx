
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: number) => void;
}

const ProductList = ({ products, onDeleteProduct }: ProductListProps) => {
  return (
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
              <ProductCard
                key={product.id}
                product={product}
                onDelete={onDeleteProduct}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
