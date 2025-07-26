import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <CheckCircle className="h-5 w-5" />,
      content: `By accessing and using KrishiMart, you accept and agree to be bound by the terms and provision of this agreement. 
      If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'use',
      title: 'Use License',
      icon: <FileText className="h-5 w-5" />,
      content: `Permission is granted to temporarily download one copy of KrishiMart materials for personal, 
      non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      • Modify or copy the materials
      • Use materials for commercial purposes
      • Attempt to reverse engineer any software
      • Remove copyright notations from materials`
    },
    {
      id: 'products',
      title: 'Product Information',
      icon: <Shield className="h-5 w-5" />,
      content: `All agricultural products listed on KrishiMart are sourced from authorized manufacturers and distributors. 
      We guarantee product authenticity but recommend following manufacturer guidelines for usage. Product descriptions, 
      images, and specifications are provided for information purposes and may vary slightly from actual products.`
    },
    {
      id: 'orders',
      title: 'Order Processing',
      icon: <CheckCircle className="h-5 w-5" />,
      content: `Orders are processed within 24 hours of confirmation. We reserve the right to cancel orders in case of:
      • Product unavailability
      • Pricing errors
      • Payment failures
      • Suspicious or fraudulent activity
      Confirmed orders cannot be cancelled once shipped.`
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: <FileText className="h-5 w-5" />,
      content: `We accept various payment methods including digital wallet, UPI, cards, and COD. 
      All prices are in Indian Rupees (INR) and include applicable taxes. Wallet refunds are processed within 2-3 business days. 
      COD orders may have additional charges as mentioned during checkout.`
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: <CheckCircle className="h-5 w-5" />,
      content: `Standard delivery takes 2-5 business days depending on location. Express delivery available in major cities. 
      Free shipping on orders above ₹500. Risk of loss and title pass to buyer upon delivery. 
      We are not responsible for delays due to natural calamities or unforeseen circumstances.`
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: `We offer 7-day return policy on unused products in original packaging. Seeds and perishable items cannot be returned. 
      Return shipping costs are borne by customer unless product is defective. Refunds processed within 7-10 business days. 
      Contact support team to initiate returns.`
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <Shield className="h-5 w-5" />,
      content: `Your privacy is important to us. We collect minimal personal information required for order processing and delivery. 
      We do not share your information with third parties except delivery partners. Payment information is securely processed 
      through encrypted gateways. You can request data deletion by contacting our support team.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: `KrishiMart shall not be liable for any damages arising from use of our products or services. 
      Our liability is limited to product replacement or refund value. We are not responsible for crop damage, 
      yield loss, or indirect damages. Users are advised to follow agricultural best practices and expert guidance.`
    },
    {
      id: 'modifications',
      title: 'Terms Modifications',
      icon: <FileText className="h-5 w-5" />,
      content: `KrishiMart reserves the right to revise these terms at any time without notice. 
      By using this platform, you agree to be bound by the current version of these terms. 
      Continued use after modifications constitutes acceptance of updated terms.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services. 
            These terms govern your use of KrishiMart platform and services.
          </p>
          <Badge className="mt-4 bg-green-100 text-green-700 px-4 py-2">
            Last Updated: January 2024
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl mb-8">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center">
                <Shield className="h-6 w-6 mr-3" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Agreement to Terms</h3>
                    <p className="text-yellow-700 text-sm leading-relaxed">
                      By accessing or using KrishiMart, you agree to be legally bound by these terms and conditions. 
                      If you disagree with any part of these terms, you may not access our services. 
                      These terms apply to all visitors, users, and customers of KrishiMart.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={section.id} className="shadow-lg">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-gray-800">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <div className="text-green-600">
                        {section.icon}
                      </div>
                    </div>
                    <span className="text-lg">{index + 1}. {section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-xl mt-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-green-700">Email</p>
                  <p className="text-green-600">legal@krishimart.com</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-700">Phone</p>
                  <p className="text-blue-600">+91 98765 43210</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-semibold text-purple-700">Address</p>
                  <p className="text-purple-600">New Delhi, India</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;