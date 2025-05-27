
import React from 'react';
import { MessageCircle, Users, Smartphone, Award, TrendingUp, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FarmerOutreach = () => {
  const successStories = [
    {
      name: "राजेश कुमार",
      location: "पंजाब",
      crop: "गेहूं",
      improvement: "30% अधिक उत्पादन",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3"
    },
    {
      name: "प्रिया शर्मा",
      location: "हरियाणा", 
      crop: "टमाटर",
      improvement: "बेहतर गुणवत्ता",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3"
    },
    {
      name: "मोहम्मद अली",
      location: "उत्तर प्रदेश",
      crop: "धान",
      improvement: "कम लागत",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3"
    }
  ];

  const outreachChannels = [
    {
      title: "WhatsApp मार्केटिंग",
      description: "किसान समुदाय के साथ सीधा संपर्क",
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      action: "Join WhatsApp Group",
      link: "https://wa.me/918765432109"
    },
    {
      title: "कृषि केंद्र टाई-अप",
      description: "स्थानीय कृषि केंद्रों के साथ साझेदारी",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      action: "Find Nearest Center",
      link: "#"
    },
    {
      title: "SMS अभियान",
      description: "फसल की जानकारी और ऑफर्स",
      icon: <MessageCircle className="h-8 w-8 text-purple-600" />,
      action: "Subscribe SMS",
      link: "#"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Mobile App Promotion */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Agri Dost Mobile App</h2>
              <p className="text-lg mb-6 opacity-90">
                कम डेटा में भी चलने वाला ऐप। हिंदी भाषा में पूरी जानकारी।
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Badge className="bg-white/20 text-white mr-3">✓</Badge>
                  ऑफलाइन मोड उपलब्ध
                </li>
                <li className="flex items-center">
                  <Badge className="bg-white/20 text-white mr-3">✓</Badge>
                  हिंदी भाषा सपोर्ट
                </li>
                <li className="flex items-center">
                  <Badge className="bg-white/20 text-white mr-3">✓</Badge>
                  कम इंटरनेट में तेज़ लोडिंग
                </li>
                <li className="flex items-center">
                  <Badge className="bg-white/20 text-white mr-3">✓</Badge>
                  फ्री डिलीवरी ट्रैकिंग
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Download App (Coming Soon)
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Watch Demo Video
                </Button>
              </div>
            </div>
            <div className="text-center">
              <Smartphone className="h-32 w-32 mx-auto mb-4 opacity-80" />
              <p className="text-sm opacity-75">App launching this month!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outreach Channels */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-8">किसानों तक पहुंचने के तरीके</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outreachChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {channel.icon}
                </div>
                <CardTitle className="text-lg">{channel.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <Button 
                  className="w-full"
                  onClick={() => window.open(channel.link, '_blank')}
                >
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-8">किसानों की सफलता की कहानियां</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-green-600">
                  {story.improvement}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-1">{story.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{story.location}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{story.crop}</Badge>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-8 text-center">
          <Gift className="h-12 w-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-orange-800 mb-4">
            नए किसानों के लिए विशेष छूट
          </h3>
          <p className="text-orange-700 mb-6">
            पहली खरीदारी पर 25% तक की छूट। कोड का उपयोग करें: NEWFARMER25
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Award className="h-4 w-4 mr-2" />
            अभी ऑर्डर करें
          </Button>
        </CardContent>
      </Card>

      {/* Contact for Partnership */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Partnership Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            Join us in empowering farmers across India. Partner with us for distribution, 
            training, or technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Become a Partner
            </Button>
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Sales Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerOutreach;
