import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Phone, Mail, MessageCircle, HelpCircle, ShoppingCart, Truck, CreditCard, RefreshCw } from 'lucide-react';

const Support = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const faqData = [
    {
      id: '1',
      question: 'How do I place an order?',
      answer: 'Simply browse our products, click "Add to Cart" on items you want, go to your cart, select items for checkout, and proceed with payment using wallet or payment gateway.',
      category: 'ordering'
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept wallet payments (instant), UPI, credit/debit cards, net banking, digital wallets (Paytm, PhonePe), and cash on delivery (COD) with additional charges.',
      category: 'payment'
    },
    {
      id: '3',
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 2-5 business days. Express delivery (1-2 days) available in major cities. Free delivery on orders above ₹500.',
      category: 'delivery'
    },
    {
      id: '4',
      question: 'Are your products original and certified?',
      answer: 'Yes, all our products are 100% original and come directly from authorized manufacturers. We provide quality certificates and guarantee authenticity.',
      category: 'products'
    },
    {
      id: '5',
      question: 'Can I return products if not satisfied?',
      answer: 'Yes, we have a 7-day return policy for unused products in original packaging. Contact our support team to initiate a return.',
      category: 'returns'
    },
    {
      id: '6',
      question: 'How do I add money to my wallet?',
      answer: 'Go to the Wallet section, click "Add Money", choose amount and payment method. Money is added instantly to your wallet for quick purchases.',
      category: 'wallet'
    },
    {
      id: '7',
      question: 'Do you provide agricultural advice?',
      answer: 'Yes, our experts provide free agricultural consultation via chat, phone, or email. You can also access our crop recommendation system.',
      category: 'support'
    },
    {
      id: '8',
      question: 'What if a product is out of stock?',
      answer: 'You can enable notifications for out-of-stock products. We\'ll notify you immediately when the product is back in stock.',
      category: 'products'
    }
  ];

  const supportChannels = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone Support',
      description: '+91 98765 43210',
      availability: '6 AM - 10 PM (All Days)',
      action: 'Call Now',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      description: 'info@krishimart.com',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Live Chat',
      description: 'Chat with our experts',
      availability: 'Available 24/7',
      action: 'Start Chat',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const categories = [
    { id: 'all', label: 'All FAQs', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'ordering', label: 'Ordering', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'delivery', label: 'Delivery', icon: <Truck className="h-4 w-4" /> },
    { id: 'returns', label: 'Returns', icon: <RefreshCw className="h-4 w-4" /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help with your orders, products, and farming needs. Our team is here to support you 24/7.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className={`${channel.bgColor} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <div className={channel.iconColor}>
                    {channel.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-2">{channel.description}</p>
                <p className="text-sm text-gray-500 mb-4">{channel.availability}</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <HelpCircle className="h-6 w-6 mr-3" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "border-green-200 text-green-700 hover:bg-green-50"
                  }
                >
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </Button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Collapsible
                  key={faq.id}
                  open={openSection === faq.id}
                  onOpenChange={() => setOpenSection(openSection === faq.id ? null : faq.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-left p-6 h-auto hover:bg-green-50 border-2 border-gray-200 rounded-lg"
                    >
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform ${
                          openSection === faq.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-green-500">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Help Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Need Immediate Help?</h3>
              <p className="text-gray-600 mb-6">
                For urgent issues with your orders or technical problems, contact our support team directly.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support: +91 98765 43210
                </Button>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Agricultural Consultation</h3>
              <p className="text-gray-600 mb-6">
                Get expert advice on crop selection, pest control, soil management, and farming techniques.
              </p>
              <div className="space-y-3">
                <Badge className="bg-green-100 text-green-700 p-2">✓ Free consultation for all farmers</Badge>
                <Badge className="bg-blue-100 text-blue-700 p-2">✓ Expert agricultural scientists</Badge>
                <Badge className="bg-purple-100 text-purple-700 p-2">✓ Customized crop recommendations</Badge>
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Book Free Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;