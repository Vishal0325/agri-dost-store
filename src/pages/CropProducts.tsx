
import React from 'react';
import CropRecommendations from '@/components/CropRecommendations';

const CropProducts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <CropRecommendations />
      </div>
    </div>
  );
};

export default CropProducts;
