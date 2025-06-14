
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sprout, Wheat, Leaf, Sun, CloudRain, Snowflake, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Crop {
  id: string;
  name: string;
  nameHindi: string;
  image: string;
  season: 'kharif' | 'rabi' | 'zaid';
  sowingMonths: string;
  harvestMonths: string;
  duration: string;
  description: string;
}

const CropRecommendations = () => {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const { toast } = useToast();

  const biharCrops: Crop[] = [
    // Kharif Crops (June-October)
    {
      id: 'paddy',
      name: 'Paddy (Rice)',
      nameHindi: 'धान',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'June-July',
      harvestMonths: 'October-November',
      duration: '120-150 days',
      description: 'Main staple crop of Bihar, grown in flooded fields'
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'February-April',
      harvestMonths: 'December-April',
      duration: '10-18 months',
      description: 'Cash crop, requires adequate water supply'
    },
    {
      id: 'maize',
      name: 'Maize',
      nameHindi: 'मक्का',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'June-July',
      harvestMonths: 'September-October',
      duration: '90-120 days',
      description: 'Versatile crop used for food, feed, and industrial purposes'
    },
    {
      id: 'arhar',
      name: 'Arhar (Pigeon Pea)',
      nameHindi: 'अरहर',
      image: 'https://images.unsplash.com/photo-1585154956861-e1f50b211d7a?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'June-July',
      harvestMonths: 'December-January',
      duration: '150-180 days',
      description: 'Important pulse crop, drought resistant'
    },
    {
      id: 'urad',
      name: 'Urad (Black Gram)',
      nameHindi: 'उड़द',
      image: 'https://images.unsplash.com/photo-1585154956861-e1f50b211d7a?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'June-July',
      harvestMonths: 'September-October',
      duration: '75-90 days',
      description: 'Short duration pulse crop, nitrogen fixing'
    },
    {
      id: 'moong',
      name: 'Moong (Green Gram)',
      nameHindi: 'मूंग',
      image: 'https://images.unsplash.com/photo-1585154956861-e1f50b211d7a?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'June-July',
      harvestMonths: 'September-October',
      duration: '60-75 days',
      description: 'Quick growing pulse, good for crop rotation'
    },
    {
      id: 'cotton',
      name: 'Cotton',
      nameHindi: 'कपास',
      image: 'https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'May-June',
      harvestMonths: 'October-December',
      duration: '150-180 days',
      description: 'Fiber crop, requires warm climate'
    },
    {
      id: 'jute',
      name: 'Jute',
      nameHindi: 'जूट',
      image: 'https://images.unsplash.com/photo-1569855142995-63e93a51ae3d?ixlib=rb-4.0.3',
      season: 'kharif',
      sowingMonths: 'April-June',
      harvestMonths: 'July-September',
      duration: '120-150 days',
      description: 'Fiber crop, grows well in humid conditions'
    },

    // Rabi Crops (November-April)
    {
      id: 'wheat',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'November-December',
      harvestMonths: 'March-April',
      duration: '120-150 days',
      description: 'Second most important food grain after rice'
    },
    {
      id: 'mustard',
      name: 'Mustard',
      nameHindi: 'सरसों',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'October-November',
      harvestMonths: 'February-March',
      duration: '120-140 days',
      description: 'Oilseed crop, also used as green vegetable'
    },
    {
      id: 'barley',
      name: 'Barley',
      nameHindi: 'जौ',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'November-December',
      harvestMonths: 'March-April',
      duration: '120-140 days',
      description: 'Hardy crop, used for animal feed and malt'
    },
    {
      id: 'gram',
      name: 'Gram (Chickpea)',
      nameHindi: 'चना',
      image: 'https://images.unsplash.com/photo-1585154956861-e1f50b211d7a?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'October-November',
      harvestMonths: 'February-March',
      duration: '120-150 days',
      description: 'Important pulse crop, drought tolerant'
    },
    {
      id: 'lentil',
      name: 'Lentil',
      nameHindi: 'मसूर',
      image: 'https://images.unsplash.com/photo-1585154956861-e1f50b211d7a?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'October-November',
      harvestMonths: 'February-March',
      duration: '110-130 days',
      description: 'Nutritious pulse, short duration crop'
    },
    {
      id: 'pea',
      name: 'Field Pea',
      nameHindi: 'मटर',
      image: 'https://images.unsplash.com/photo-1585154956861-e1f50b211d7a?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'October-November',
      harvestMonths: 'February-March',
      duration: '100-120 days',
      description: 'Cool season legume, nitrogen fixing'
    },
    {
      id: 'linseed',
      name: 'Linseed',
      nameHindi: 'अलसी',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'October-November',
      harvestMonths: 'February-March',
      duration: '120-140 days',
      description: 'Oilseed crop, produces linseed oil'
    },
    {
      id: 'potato',
      name: 'Potato',
      nameHindi: 'आलू',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3',
      season: 'rabi',
      sowingMonths: 'October-November',
      harvestMonths: 'January-February',
      duration: '90-120 days',
      description: 'Important tuber crop, high nutritional value'
    },

    // Zaid Crops (April-June)
    {
      id: 'summer-rice',
      name: 'Summer Rice',
      nameHindi: 'गर्मी का धान',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'April-May',
      harvestMonths: 'July-August',
      duration: '90-120 days',
      description: 'Summer variety of rice, requires irrigation'
    },
    {
      id: 'summer-maize',
      name: 'Summer Maize',
      nameHindi: 'गर्मी का मक्का',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'March-April',
      harvestMonths: 'June-July',
      duration: '90-100 days',
      description: 'Summer variety of maize, drought tolerant'
    },
    {
      id: 'summer-moong',
      name: 'Summer Moong',
      nameHindi: 'गर्मी का मूंग',
      image: 'https://images.unsplash.com/photo-1585154956861-e1f50b211d7a?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'March-April',
      harvestMonths: 'May-June',
      duration: '60-75 days',
      description: 'Summer pulse crop, quick growing'
    },
    {
      id: 'watermelon',
      name: 'Watermelon',
      nameHindi: 'तरबूज',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'February-March',
      harvestMonths: 'May-June',
      duration: '90-120 days',
      description: 'Summer fruit crop, high water content'
    },
    {
      id: 'muskmelon',
      name: 'Muskmelon',
      nameHindi: 'खरबूजा',
      image: 'https://images.unsplash.com/photo-1574275743816-72e5edd49e60?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'February-March',
      harvestMonths: 'May-June',
      duration: '90-110 days',
      description: 'Summer fruit, sweet and nutritious'
    },
    {
      id: 'cucumber',
      name: 'Cucumber',
      nameHindi: 'खीरा',
      image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'February-March',
      harvestMonths: 'April-May',
      duration: '50-70 days',
      description: 'Summer vegetable, high water content'
    },
    {
      id: 'bottle-gourd',
      name: 'Bottle Gourd',
      nameHindi: 'लौकी',
      image: 'https://images.unsplash.com/photo-1609501676725-7186f5d4b8a8?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'February-March',
      harvestMonths: 'April-June',
      duration: '60-90 days',
      description: 'Summer vegetable, climbing vine'
    },
    {
      id: 'bitter-gourd',
      name: 'Bitter Gourd',
      nameHindi: 'करेला',
      image: 'https://images.unsplash.com/photo-1621264448270-9ef00e88a935?ixlib=rb-4.0.3',
      season: 'zaid',
      sowingMonths: 'February-March',
      harvestMonths: 'April-June',
      duration: '60-80 days',
      description: 'Summer vegetable, medicinal properties'
    }
  ];

  const toggleCropSelection = (cropId: string) => {
    setSelectedCrops(prev => {
      const isSelected = prev.includes(cropId);
      const newSelection = isSelected 
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId];
      
      const crop = biharCrops.find(c => c.id === cropId);
      
      toast({
        title: isSelected ? "Crop Deselected" : "Crop Selected",
        description: `${crop?.name} (${crop?.nameHindi}) ${isSelected ? 'removed from' : 'added to'} your selection`,
      });
      
      return newSelection;
    });
  };

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'kharif': return CloudRain;
      case 'rabi': return Snowflake;
      case 'zaid': return Sun;
      default: return Sprout;
    }
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'kharif': return 'from-blue-500 to-green-500';
      case 'rabi': return 'from-orange-500 to-yellow-500';
      case 'zaid': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCropsBySeason = (season: 'kharif' | 'rabi' | 'zaid') => {
    return biharCrops.filter(crop => crop.season === season);
  };

  const renderCropGrid = (crops: Crop[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {crops.map((crop) => {
        const isSelected = selectedCrops.includes(crop.id);
        const SeasonIcon = getSeasonIcon(crop.season);
        
        return (
          <Card 
            key={crop.id} 
            className={`cursor-pointer transform hover:scale-105 transition-all duration-300 ${
              isSelected 
                ? 'ring-4 ring-green-500 bg-green-50 shadow-2xl' 
                : 'hover:shadow-xl bg-white'
            }`}
            onClick={() => toggleCropSelection(crop.id)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={crop.image} 
                  alt={crop.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={`bg-gradient-to-r ${getSeasonColor(crop.season)} text-white`}>
                    <SeasonIcon className="h-3 w-3 mr-1" />
                    {crop.season.charAt(0).toUpperCase() + crop.season.slice(1)}
                  </Badge>
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-500 rounded-full p-1">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Duration</span>
                      <span>{crop.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{crop.name}</h3>
                    <p className="text-green-600 font-medium text-sm">{crop.nameHindi}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{crop.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Sowing: {crop.sowingMonths}</span>
                    <span>Harvest: {crop.harvestMonths}</span>
                  </div>
                </div>
                
                <Button 
                  className={`w-full mt-3 transition-all duration-200 ${
                    isSelected 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCropSelection(crop.id);
                  }}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Sprout className="h-4 w-4 mr-2" />
                      Select Crop
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🌾 Bihar Crop Recommendations
        </h2>
        <p className="text-xl text-gray-600 mb-2">
          बिहार के मुख्य फसलों की जानकारी - सीजन के अनुसार
        </p>
        <p className="text-lg text-gray-500">
          Select crops for your farming season and get detailed information
        </p>
        {selectedCrops.length > 0 && (
          <div className="mt-4">
            <Badge className="bg-green-600 text-white px-4 py-2 text-base">
              {selectedCrops.length} crops selected
            </Badge>
          </div>
        )}
      </div>

      {/* Season Tabs */}
      <Tabs defaultValue="kharif" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="kharif" className="flex items-center space-x-2 text-base py-3">
            <CloudRain className="h-5 w-5" />
            <span>Kharif (खरीफ)</span>
            <Badge variant="secondary">{getCropsBySeason('kharif').length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rabi" className="flex items-center space-x-2 text-base py-3">
            <Snowflake className="h-5 w-5" />
            <span>Rabi (रबी)</span>
            <Badge variant="secondary">{getCropsBySeason('rabi').length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="zaid" className="flex items-center space-x-2 text-base py-3">
            <Sun className="h-5 w-5" />
            <span>Zaid (जायद)</span>
            <Badge variant="secondary">{getCropsBySeason('zaid').length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kharif">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">
              Kharif Season (June - October)
            </h3>
            <p className="text-gray-600">
              Monsoon crops grown during the rainy season. These crops require warm weather and adequate rainfall.
            </p>
          </div>
          {renderCropGrid(getCropsBySeason('kharif'))}
        </TabsContent>

        <TabsContent value="rabi">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-orange-800 mb-2">
              Rabi Season (November - April)
            </h3>
            <p className="text-gray-600">
              Winter crops grown during the cooler months. These crops require cool weather and less water.
            </p>
          </div>
          {renderCropGrid(getCropsBySeason('rabi'))}
        </TabsContent>

        <TabsContent value="zaid">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-red-800 mb-2">
              Zaid Season (April - June)
            </h3>
            <p className="text-gray-600">
              Summer crops grown during the hot season. These crops require irrigation and are heat tolerant.
            </p>
          </div>
          {renderCropGrid(getCropsBySeason('zaid'))}
        </TabsContent>
      </Tabs>

      {/* Selected Crops Summary */}
      {selectedCrops.length > 0 && (
        <div className="mt-12 bg-green-50 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Your Selected Crops ({selectedCrops.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {selectedCrops.map(cropId => {
              const crop = biharCrops.find(c => c.id === cropId);
              if (!crop) return null;
              
              return (
                <div key={cropId} className="text-center">
                  <img 
                    src={crop.image} 
                    alt={crop.name}
                    className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-gray-900">{crop.name}</p>
                  <p className="text-xs text-green-600">{crop.nameHindi}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-6">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              onClick={() => {
                toast({
                  title: "Crop Selection Saved!",
                  description: `Your ${selectedCrops.length} selected crops have been saved for reference.`,
                });
              }}
            >
              Save Selection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropRecommendations;
