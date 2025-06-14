import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const BrandsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBrandClick = (brandName: string) => {
    console.log('Navigating to brand:', brandName);
    navigate(`/brand/${encodeURIComponent(brandName)}`);
  };

  // Featured brands for homepage display
  const featuredBrands = [
    {
      id: 1,
      name: "Mahindra Agri",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=200",
      description: "Agricultural Equipment"
    },
    {
      id: 2,
      name: "Tata Rallis",
      logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=200",
      description: "Crop Protection"
    },
    {
      id: 3,
      name: "UPL Limited",
      logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=200",
      description: "Seeds & Pesticides"
    },
    {
      id: 4,
      name: "Bayer CropScience",
      logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=200",
      description: "Innovation in Agriculture"
    },
    {
      id: 5,
      name: "Syngenta India",
      logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=200",
      description: "Crop Solutions"
    },
    {
      id: 6,
      name: "IFFCO",
      logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=200",
      description: "Fertilizers & Chemicals"
    }
  ];

  // All brands for modal display
  const allBrands = [
    ...featuredBrands,
    // Additional 64 brands to make 70 total
    { id: 7, name: "Coromandel International", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Fertilizers" },
    { id: 8, name: "Godrej Agrovet", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Animal Feed & Agri" },
    { id: 9, name: "Dharani Sugars", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Sugar & Ethanol" },
    { id: 10, name: "Deepak Fertilisers", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Chemicals & Fertilizers" },
    { id: 11, name: "Nagarjuna Fertilizers", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Crop Nutrition" },
    { id: 12, name: "Zuari Agro Chemicals", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Agrochemicals" },
    { id: 13, name: "Kaveri Seed Company", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Seeds & Genetics" },
    { id: 14, name: "Advanta Seeds", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Hybrid Seeds" },
    { id: 15, name: "Nuziveedu Seeds", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Cotton & Corn Seeds" },
    { id: 16, name: "Rasi Seeds", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Vegetable Seeds" },
    { id: 17, name: "Monsanto India", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Biotechnology" },
    { id: 18, name: "Dow AgroSciences", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Crop Protection" },
    { id: 19, name: "BASF India", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Agricultural Solutions" },
    { id: 20, name: "FMC India", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Crop Protection" },
    { id: 21, name: "Sumitomo Chemical", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Agrochemicals" },
    { id: 22, name: "Adama India", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Crop Protection" },
    { id: 23, name: "Crystal Crop Protection", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Pesticides" },
    { id: 24, name: "Insecticides India", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Crop Protection" },
    { id: 25, name: "Sharda Cropchem", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Agrochemicals" },
    { id: 26, name: "Rallis India", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Crop Care" },
    { id: 27, name: "Gujarat State Fertilizers", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Fertilizers" },
    { id: 28, name: "Rashtriya Chemicals", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Fertilizers" },
    { id: 29, name: "National Fertilizers", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Urea & DAP" },
    { id: 30, name: "Chambal Fertilizers", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Phosphatic Fertilizers" },
    { id: 31, name: "Indian Farmers", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Fertilizer Company" },
    { id: 32, name: "Paradeep Phosphates", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Complex Fertilizers" },
    { id: 33, name: "Mangalore Chemicals", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Fertilizers" },
    { id: 34, name: "Southern Petrochemicals", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Fertilizers" },
    { id: 35, name: "Fertilisers and Chemicals", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Travancore" },
    { id: 36, name: "Krishak Bharati", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Cooperative" },
    { id: 37, name: "John Deere India", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Tractors & Equipment" },
    { id: 38, name: "Mahindra Tractors", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Farm Equipment" },
    { id: 39, name: "TAFE Tractors", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Agricultural Machinery" },
    { id: 40, name: "Sonalika Tractors", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Farm Mechanization" },
    { id: 41, name: "New Holland Agriculture", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Farm Equipment" },
    { id: 42, name: "Case IH Agriculture", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Agricultural Solutions" },
    { id: 43, name: "Kubota Agricultural", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Machinery" },
    { id: 44, name: "VST Tillers Tractors", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Power Tillers" },
    { id: 45, name: "Captain Tractors", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Farm Equipment" },
    { id: 46, name: "Escorts Tractors", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Agricultural Machinery" },
    { id: 47, name: "Force Motors Agri", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Farm Equipment" },
    { id: 48, name: "ACE Tractors", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Agricultural Solutions" },
    { id: 49, name: "Fieldking Agricultural", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Implements" },
    { id: 50, name: "Lemken India", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Tillage Equipment" },
    { id: 51, name: "Kverneland Group", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Farm Machinery" },
    { id: 52, name: "Amazone India", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Seeding Technology" },
    { id: 53, name: "Preet Agro Industries", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Harvesters" },
    { id: 54, name: "Kartar Agro Industries", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Farm Equipment" },
    { id: 55, name: "Shaktiman Agri", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Implements" },
    { id: 56, name: "Landforce Equipment", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Agricultural Tools" },
    { id: 57, name: "Yanmar India", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Diesel Engines" },
    { id: 58, name: "Kirloskar Oil Engines", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Pumps & Engines" },
    { id: 59, name: "Crompton Greaves", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Water Pumps" },
    { id: 60, name: "CRI Pumps", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Irrigation Solutions" },
    { id: 61, name: "Shakti Pumps", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Solar Pumps" },
    { id: 62, name: "Jain Irrigation", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Micro Irrigation" },
    { id: 63, name: "Netafim India", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Drip Irrigation" },
    { id: 64, name: "Rain Bird India", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=150", description: "Irrigation Systems" },
    { id: 65, name: "Rivulis Irrigation", logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&w=150", description: "Micro Irrigation" },
    { id: 66, name: "Finolex Pipes", logo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&w=150", description: "Irrigation Pipes" },
    { id: 67, name: "Supreme Industries", logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&w=150", description: "Plastic Pipes" },
    { id: 68, name: "Astral Poly Technik", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&w=150", description: "Piping Solutions" },
    { id: 69, name: "Prince Pipes", logo: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3&w=150", description: "Plumbing Systems" },
    { id: 70, name: "KEI Industries", logo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&w=150", description: "Agricultural Cables" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">Trusted Brands</h3>
          <p className="text-xl text-gray-600">Leading agricultural brands partnering with farmers</p>
        </div>

        {/* Featured Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {featuredBrands.map((brand) => (
            <Card 
              key={brand.id} 
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-0 bg-white overflow-hidden"
              onClick={() => handleBrandClick(brand.name)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-16 h-16 mx-auto object-cover rounded-full shadow-md"
                  />
                </div>
                <h4 className="font-bold text-sm mb-2 group-hover:text-green-600 transition-colors">
                  {brand.name}
                </h4>
                <p className="text-xs text-gray-500">{brand.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See More Brands Button */}
        <div className="text-center">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                See More Brands
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center mb-4">
                  All Agricultural Brands ({allBrands.length} total)
                </DialogTitle>
              </DialogHeader>
              
              {/* All Brands Grid in Modal */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                {allBrands.map((brand) => (
                  <div 
                    key={brand.id} 
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300 bg-white p-4 rounded-lg shadow-md hover:shadow-lg border"
                    onClick={() => {
                      setIsModalOpen(false);
                      handleBrandClick(brand.name);
                    }}
                  >
                    <div className="text-center">
                      <div className="mb-3">
                        <img 
                          src={brand.logo} 
                          alt={brand.name}
                          className="w-12 h-12 mx-auto object-cover rounded-full shadow-sm"
                        />
                      </div>
                      <h4 className="font-semibold text-xs mb-1 group-hover:text-green-600 transition-colors line-clamp-2">
                        {brand.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{brand.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
