
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Sprout, Leaf, SprayCan, Wrench, Star, Filter, Mic, MicOff, Search, Calendar, TrendingUp } from 'lucide-react';
import { CropCategory, CropProduct, FilterOptions } from '@/types/crop';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';

const CropRecommendations = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<CropProduct[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    usageStages: [],
    priceRange: { min: 0, max: 50000 },
    categories: [],
    packSizes: [],
    organicOnly: false
  });
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSeason, setCurrentSeason] = useState<string>('');

  const { balance, deductMoney } = useWallet();
  const { toast } = useToast();

  // Crop categories data
  const cropCategories: CropCategory[] = [
    {
      id: 'wheat',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      icon: '🌾',
      season: 'rabi',
      growthStages: ['sowing', 'germination', 'tillering', 'flowering', 'grain-filling', 'harvesting'],
      commonProducts: ['seeds', 'fertilizers', 'pesticides', 'herbicides']
    },
    {
      id: 'rice',
      name: 'Rice/Paddy',
      nameHindi: 'धान',
      icon: '🌾',
      season: 'kharif',
      growthStages: ['nursery', 'transplanting', 'vegetative', 'reproductive', 'maturity'],
      commonProducts: ['seeds', 'fertilizers', 'pesticides', 'herbicides']
    },
    {
      id: 'vegetables',
      name: 'Vegetables',
      nameHindi: 'सब्जियां',
      icon: '🥬',
      season: 'all',
      growthStages: ['sowing', 'germination', 'vegetative', 'flowering', 'fruiting', 'harvesting'],
      commonProducts: ['seeds', 'fertilizers', 'pesticides', 'tools']
    },
    {
      id: 'fruits',
      name: 'Fruits',
      nameHindi: 'फल',
      icon: '🍎',
      season: 'all',
      growthStages: ['planting', 'vegetative', 'flowering', 'fruiting', 'harvesting'],
      commonProducts: ['saplings', 'fertilizers', 'pesticides', 'tools']
    },
    {
      id: 'cotton',
      name: 'Cotton',
      nameHindi: 'कपास',
      icon: '🌸',
      season: 'kharif',
      growthStages: ['sowing', 'germination', 'squaring', 'flowering', 'boll-development'],
      commonProducts: ['seeds', 'fertilizers', 'pesticides', 'pgr']
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      icon: '🎋',
      season: 'all',
      growthStages: ['planting', 'germination', 'tillering', 'grand-growth', 'maturity'],
      commonProducts: ['seeds', 'fertilizers', 'pesticides', 'tools']
    }
  ];

  // Sample products database
  const productDatabase: CropProduct[] = [
    {
      id: 'wheat-seed-1',
      name: 'HD-2967 Wheat Seeds',
      nameHindi: 'एचडी-2967 गेहूं के बीज',
      category: 'Seeds',
      subcategory: 'Wheat Seeds',
      brand: 'IARI',
      mrp: 450,
      sellingPrice: 380,
      discount: 16,
      packSize: '10',
      unit: 'kg',
      usageStage: ['sowing'],
      cropTypes: ['wheat'],
      description: 'High yielding wheat variety suitable for timely sowing',
      features: ['High yield', 'Disease resistant', 'Good quality grain'],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.5,
      reviews: 234,
      frequentlyBoughtWith: ['npk-fertilizer-1', 'herbicide-1'],
      seasonal: true,
      organicCertified: false
    },
    {
      id: 'rice-seed-1',
      name: 'Basmati 370 Rice Seeds',
      nameHindi: 'बासमती 370 धान के बीज',
      category: 'Seeds',
      subcategory: 'Rice Seeds',
      brand: 'Punjab Agricultural University',
      mrp: 520,
      sellingPrice: 450,
      discount: 13,
      packSize: '5',
      unit: 'kg',
      usageStage: ['nursery', 'transplanting'],
      cropTypes: ['rice'],
      description: 'Premium basmati rice variety with excellent grain quality',
      features: ['Long grain', 'Aromatic', 'Export quality'],
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e8c3?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.7,
      reviews: 189,
      frequentlyBoughtWith: ['npk-fertilizer-2', 'pesticide-1'],
      seasonal: true,
      organicCertified: false
    },
    {
      id: 'npk-fertilizer-1',
      name: 'NPK 12:32:16 Fertilizer',
      nameHindi: 'एनपीके 12:32:16 उर्वरक',
      category: 'Fertilizers',
      subcategory: 'Complex Fertilizer',
      brand: 'IFFCO',
      mrp: 1200,
      sellingPrice: 1050,
      discount: 13,
      packSize: '50',
      unit: 'kg',
      usageStage: ['sowing', 'vegetative'],
      cropTypes: ['wheat', 'rice', 'vegetables'],
      description: 'Balanced NPK fertilizer for initial growth',
      features: ['Quick release', 'Balanced nutrition', 'Suitable for all crops'],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.3,
      reviews: 156,
      frequentlyBoughtWith: ['urea-1', 'potash-1'],
      seasonal: false,
      organicCertified: false
    },
    {
      id: 'pesticide-1',
      name: 'Imidacloprid 17.8% SL',
      nameHindi: 'इमिडाक्लोप्रिड 17.8% एसएल',
      category: 'Pesticides',
      subcategory: 'Insecticide',
      brand: 'Bayer',
      mrp: 890,
      sellingPrice: 750,
      discount: 16,
      packSize: '250',
      unit: 'ml',
      usageStage: ['vegetative', 'flowering'],
      cropTypes: ['rice', 'cotton', 'vegetables'],
      description: 'Systemic insecticide for sucking pests',
      features: ['Long lasting', 'Systemic action', 'Broad spectrum'],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.4,
      reviews: 98,
      frequentlyBoughtWith: ['fungicide-1', 'sticker-1'],
      seasonal: false,
      organicCertified: false
    },
    {
      id: 'herbicide-1',
      name: '2,4-D Amine Salt 58% SL',
      nameHindi: '2,4-डी अमीन साल्ट 58% एसएल',
      category: 'Herbicides',
      subcategory: 'Selective Herbicide',
      brand: 'Dhanuka',
      mrp: 680,
      sellingPrice: 580,
      discount: 15,
      packSize: '500',
      unit: 'ml',
      usageStage: ['vegetative'],
      cropTypes: ['wheat', 'sugarcane'],
      description: 'Post-emergence herbicide for broad leaf weeds',
      features: ['Selective action', 'Effective against broad leaf weeds', 'Easy to use'],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.2,
      reviews: 87,
      frequentlyBoughtWith: ['surfactant-1'],
      seasonal: false,
      organicCertified: false
    },
    {
      id: 'vegetable-seed-1',
      name: 'Tomato Hybrid Seeds (Arka Rakshak)',
      nameHindi: 'टमाटर हाइब्रिड बीज (अर्का रक्षक)',
      category: 'Seeds',
      subcategory: 'Vegetable Seeds',
      brand: 'IIHR',
      mrp: 320,
      sellingPrice: 280,
      discount: 13,
      packSize: '10',
      unit: 'g',
      usageStage: ['sowing'],
      cropTypes: ['vegetables'],
      description: 'Disease resistant hybrid tomato variety',
      features: ['High yield', 'Disease resistant', 'Good shelf life'],
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.6,
      reviews: 145,
      frequentlyBoughtWith: ['organic-fertilizer-1', 'bio-pesticide-1'],
      seasonal: false,
      organicCertified: false
    },
    {
      id: 'organic-fertilizer-1',
      name: 'Vermicompost Organic Fertilizer',
      nameHindi: 'वर्मीकम्पोस्ट जैविक उर्वरक',
      category: 'Fertilizers',
      subcategory: 'Organic Fertilizer',
      brand: 'EcoFarm',
      mrp: 450,
      sellingPrice: 380,
      discount: 16,
      packSize: '25',
      unit: 'kg',
      usageStage: ['sowing', 'vegetative'],
      cropTypes: ['vegetables', 'fruits'],
      description: 'Premium quality vermicompost for organic farming',
      features: ['100% organic', 'Rich in nutrients', 'Improves soil health'],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.8,
      reviews: 203,
      frequentlyBoughtWith: ['bio-pesticide-1', 'micronutrient-1'],
      seasonal: false,
      organicCertified: true
    },
    {
      id: 'bio-pesticide-1',
      name: 'Neem Oil Bio Pesticide',
      nameHindi: 'नीम तेल जैविक कीटनाशक',
      category: 'Pesticides',
      subcategory: 'Bio Pesticide',
      brand: 'NeemTree',
      mrp: 780,
      sellingPrice: 650,
      discount: 17,
      packSize: '1',
      unit: 'L',
      usageStage: ['vegetative', 'flowering'],
      cropTypes: ['vegetables', 'fruits', 'cotton'],
      description: 'Natural neem-based insecticide and fungicide',
      features: ['100% natural', 'Safe for environment', 'Multiple pest control'],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.5,
      reviews: 167,
      frequentlyBoughtWith: ['organic-fertilizer-1'],
      seasonal: false,
      organicCertified: true
    },
    {
      id: 'cotton-seed-1',
      name: 'Bt Cotton Seeds (RCH-134)',
      nameHindi: 'बीटी कपास बीज (आरसीएच-134)',
      category: 'Seeds',
      subcategory: 'Cotton Seeds',
      brand: 'Rasi Seeds',
      mrp: 850,
      sellingPrice: 750,
      discount: 12,
      packSize: '450',
      unit: 'g',
      usageStage: ['sowing'],
      cropTypes: ['cotton'],
      description: 'High yielding Bt cotton hybrid for bollworm resistance',
      features: ['Bollworm resistant', 'High yield', 'Good fiber quality'],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.4,
      reviews: 134,
      frequentlyBoughtWith: ['cotton-fertilizer-1', 'pgr-1'],
      seasonal: true,
      organicCertified: false
    },
    {
      id: 'pgr-1',
      name: 'NAA Plant Growth Regulator',
      nameHindi: 'एनएए प्लांट ग्रोथ रेगुलेटर',
      category: 'PGR',
      subcategory: 'Growth Promoter',
      brand: 'BioGrow',
      mrp: 920,
      sellingPrice: 780,
      discount: 15,
      packSize: '100',
      unit: 'ml',
      usageStage: ['flowering', 'fruiting'],
      cropTypes: ['cotton', 'vegetables', 'fruits'],
      description: 'Promotes flowering and fruit setting',
      features: ['Increases yield', 'Better fruit setting', 'Improves quality'],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3',
      inStock: true,
      rating: 4.3,
      reviews: 89,
      frequentlyBoughtWith: ['micronutrient-1'],
      seasonal: false,
      organicCertified: false
    }
  ];

  // Get current season based on month
  useEffect(() => {
    const month = new Date().getMonth() + 1;
    if (month >= 4 && month <= 9) {
      setCurrentSeason('kharif');
    } else if (month >= 10 || month <= 3) {
      setCurrentSeason('rabi');
    } else {
      setCurrentSeason('zaid');
    }
  }, []);

  // Filter products based on selected crop and other filters
  useEffect(() => {
    let filtered = productDatabase;

    if (selectedCrop) {
      filtered = filtered.filter(product => 
        product.cropTypes.includes(selectedCrop)
      );
    }

    if (selectedStage) {
      filtered = filtered.filter(product => 
        product.usageStage.includes(selectedStage)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameHindi.includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    if (filters.organicOnly) {
      filtered = filtered.filter(product => product.organicCertified);
    }

    filtered = filtered.filter(product => 
      product.sellingPrice >= filters.priceRange.min && 
      product.sellingPrice <= filters.priceRange.max
    );

    setFilteredProducts(filtered);
  }, [selectedCrop, selectedStage, searchTerm, filters]);

  const handlePurchase = (product: CropProduct) => {
    if (balance >= product.sellingPrice) {
      const success = deductMoney(product.sellingPrice);
      if (success) {
        toast({
          title: "खरीदारी सफल!",
          description: `आपने ${product.nameHindi} ₹${product.sellingPrice} में खरीदा`,
        });
      }
    } else {
      toast({
        title: "अपर्याप्त बैलेंस",
        description: `इस उत्पाद को खरीदने के लिए ₹${product.sellingPrice - balance} और चाहिए`,
        variant: "destructive",
      });
    }
  };

  const getFrequentlyBoughtTogether = (productId: string) => {
    const product = productDatabase.find(p => p.id === productId);
    if (!product) return [];
    
    return productDatabase.filter(p => 
      product.frequentlyBoughtWith.includes(p.id)
    );
  };

  const getSeasonalRecommendations = () => {
    return cropCategories.filter(crop => 
      crop.season === currentSeason || crop.season === 'all'
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">फसल आधारित उत्पाद सुझाव</h1>
        <p className="text-xl text-gray-600">अपनी फसल चुनें और सही उत्पाद पाएं</p>
      </div>

      {/* Seasonal Recommendations Banner */}
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold flex items-center mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                मौसमी सिफारिश ({currentSeason === 'kharif' ? 'खरीफ' : currentSeason === 'rabi' ? 'रबी' : 'जायद'})
              </h3>
              <p className="opacity-90">इस मौसम की सिफारिशें:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {getSeasonalRecommendations().map(crop => (
                  <Badge key={crop.id} className="bg-white/20 text-white">
                    {crop.icon} {crop.nameHindi}
                  </Badge>
                ))}
              </div>
            </div>
            <TrendingUp className="h-12 w-12 opacity-80" />
          </div>
        </CardContent>
      </Card>

      {/* Crop Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sprout className="h-6 w-6 mr-2" />
            फसल चुनें
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cropCategories.map(crop => (
              <Button
                key={crop.id}
                variant={selectedCrop === crop.id ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                  selectedCrop === crop.id ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
                onClick={() => setSelectedCrop(crop.id)}
              >
                <span className="text-2xl">{crop.icon}</span>
                <span className="text-sm font-medium">{crop.nameHindi}</span>
                <Badge variant="secondary" className="text-xs">
                  {crop.season === 'kharif' ? 'खरीफ' : crop.season === 'rabi' ? 'रबी' : 'सभी मौसम'}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Stage Selection */}
      {selectedCrop && (
        <Card>
          <CardHeader>
            <CardTitle>वृद्धि चरण चुनें</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="वृद्धि चरण चुनें" />
              </SelectTrigger>
              <SelectContent>
                {cropCategories.find(c => c.id === selectedCrop)?.growthStages.map(stage => (
                  <SelectItem key={stage} value={stage}>
                    {stage === 'sowing' ? 'बुआई' :
                     stage === 'germination' ? 'अंकुरण' :
                     stage === 'vegetative' ? 'वानस्पतिक' :
                     stage === 'flowering' ? 'फूल आना' :
                     stage === 'fruiting' ? 'फल लगना' :
                     stage === 'harvesting' ? 'कटाई' : stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Search and Voice */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="उत्पाद खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={isVoiceSearch ? "default" : "outline"}
              onClick={() => setIsVoiceSearch(!isVoiceSearch)}
              className="px-4"
            >
              {isVoiceSearch ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            फिल्टर
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">ब्रांड</label>
              <div className="space-y-2">
                {['IFFCO', 'Bayer', 'Dhanuka', 'IARI', 'EcoFarm'].map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            brands: [...prev.brands, brand]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            brands: prev.brands.filter(b => b !== brand)
                          }));
                        }
                      }}
                    />
                    <label htmlFor={brand} className="text-sm">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">मूल्य सीमा</label>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="न्यूनतम"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: Number(e.target.value) }
                  }))}
                />
                <Input
                  type="number"
                  placeholder="अधिकतम"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                  }))}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox
                  id="organic"
                  checked={filters.organicOnly}
                  onCheckedChange={(checked) => setFilters(prev => ({
                    ...prev,
                    organicOnly: !!checked
                  }))}
                />
                <label htmlFor="organic" className="text-sm font-medium">केवल जैविक उत्पाद</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {product.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    -{product.discount}%
                  </Badge>
                )}
                {product.organicCertified && (
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    जैविक
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{product.nameHindi}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.name}</p>
                <p className="text-sm text-green-600 font-medium mb-2">
                  {product.brand} • {product.packSize} {product.unit}
                </p>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : ''
                      }`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.sellingPrice.toLocaleString()}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.usageStage.map(stage => (
                      <Badge key={stage} variant="secondary" className="text-xs">
                        {stage === 'sowing' ? 'बुआई' :
                         stage === 'vegetative' ? 'वानस्पतिक' :
                         stage === 'flowering' ? 'फूल' : stage}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button
                  className={`w-full ${
                    balance >= product.sellingPrice
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={balance < product.sellingPrice}
                  onClick={() => handlePurchase(product)}
                >
                  {balance >= product.sellingPrice ? 'खरीदें' : 'अपर्याप्त बैलेंस'}
                </Button>
                
                {/* Frequently Bought Together */}
                {getFrequentlyBoughtTogether(product.id).length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      अक्सर साथ खरीदे गए:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {getFrequentlyBoughtTogether(product.id).slice(0, 2).map(item => (
                        <Badge key={item.id} variant="outline" className="text-xs">
                          {item.nameHindi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && selectedCrop && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 text-lg">इस फसल के लिए कोई उत्पाद नहीं मिला</p>
            <p className="text-sm text-gray-400 mt-2">कृपया अन्य फिल्टर आज़माएं</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropRecommendations;
