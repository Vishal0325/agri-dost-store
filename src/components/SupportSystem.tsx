
import React, { useState } from 'react';
import { MessageCircle, Phone, Search, Package, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SupportSystem = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD)."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days. Express delivery is available in select areas with 1-2 day delivery."
    },
    {
      question: "Do you provide farming guidance?",
      answer: "Yes! Our expert team provides free farming advice via WhatsApp. You can also check our blog section for detailed guides."
    },
    {
      question: "What if seeds don't germinate?",
      answer: "We offer a germination guarantee. If seeds don't meet the promised germination rate, we provide free replacement."
    },
    {
      question: "Is there a minimum order amount?",
      answer: "Free shipping on orders above ₹999. Below that, standard shipping charges apply."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 2 hours of placement. After that, please contact our support team."
    }
  ];

  const orderStatuses = [
    { id: 'ORD001', status: 'Delivered', date: '2024-01-15', items: 'Hybrid Tomato Seeds, NPK Fertilizer' },
    { id: 'ORD002', status: 'In Transit', date: '2024-01-18', items: 'Bio Pesticide Spray' },
    { id: 'ORD003', status: 'Processing', date: '2024-01-20', items: 'Smart Irrigation Kit' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Transit': return <Package className="h-4 w-4 text-blue-600" />;
      case 'Processing': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsAppSupport = () => {
    const message = "नमस्ते! मुझे आपकी कृषि उत्पादों के बारे में जानकारी चाहिए।";
    const phoneNumber = "918765432109"; // Replace with actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Support Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Center</h2>
        <p className="text-gray-600">We're here to help you grow better crops</p>
      </div>

      {/* Quick Support Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800 mb-2">WhatsApp Support</h3>
                <p className="text-green-600 text-sm mb-4">Get instant farming advice from our experts</p>
                <Button 
                  onClick={handleWhatsAppSupport}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
              <MessageCircle className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Call Support</h3>
                <p className="text-blue-600 text-sm mb-4">Toll-free helpline available 24/7</p>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call 1800-123-4567
                </Button>
              </div>
              <Phone className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Track Your Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Enter order number (e.g., ORD001)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-1"
            />
            <Button>Track Order</Button>
          </div>

          {orderNumber && (
            <div className="space-y-4">
              <h4 className="font-medium">Recent Orders</h4>
              {orderStatuses.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{order.items}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Phone Support</h4>
              <p className="text-sm text-gray-600">1800-123-4567</p>
              <p className="text-xs text-gray-500">24/7 Available</p>
            </div>
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">WhatsApp</h4>
              <p className="text-sm text-gray-600">+91 87654 32109</p>
              <p className="text-xs text-gray-500">Instant Response</p>
            </div>
            <div className="text-center">
              <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Order Support</h4>
              <p className="text-sm text-gray-600">orders@agridost.com</p>
              <p className="text-xs text-gray-500">Order Related Queries</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSystem;
