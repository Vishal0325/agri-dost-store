import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Shield, Truck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            About KrishiMart
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering farmers across India with original agricultural products, fast delivery, and trusted service since our inception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">1000+</h3>
              <p className="text-gray-600">Happy Farmers</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">100%</h3>
              <p className="text-gray-600">Original Products</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
            <CardContent className="p-6">
              <Truck className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Fast</h3>
              <p className="text-gray-600">Delivery Service</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At KrishiMart, we are committed to revolutionizing agriculture in India by providing farmers with access to 
              high-quality agricultural inputs at competitive prices. Our mission is to bridge the gap between manufacturers 
              and farmers, ensuring that every farmer gets genuine products delivered right to their doorstep.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in empowering farmers with the right tools, seeds, fertilizers, and knowledge to increase their 
              productivity and income. Through our platform, we aim to create a sustainable agricultural ecosystem that 
              benefits farmers, their families, and the entire food chain.
            </p>
          </CardContent>
        </Card>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-green-700">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Badge className="bg-green-100 text-green-700">✓</Badge>
                <p className="text-gray-700">Original products directly from manufacturers</p>
              </div>
              <div className="flex items-start space-x-3">
                <Badge className="bg-green-100 text-green-700">✓</Badge>
                <p className="text-gray-700">Competitive pricing with best market rates</p>
              </div>
              <div className="flex items-start space-x-3">
                <Badge className="bg-green-100 text-green-700">✓</Badge>
                <p className="text-gray-700">Fast delivery across India</p>
              </div>
              <div className="flex items-start space-x-3">
                <Badge className="bg-green-100 text-green-700">✓</Badge>
                <p className="text-gray-700">Expert agricultural guidance and support</p>
              </div>
              <div className="flex items-start space-x-3">
                <Badge className="bg-green-100 text-green-700">✓</Badge>
                <p className="text-gray-700">Secure payment options including digital wallet</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Our Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Trust & Transparency</h4>
                <p className="text-gray-600 text-sm">We believe in honest business practices and transparent pricing.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Quality Assurance</h4>
                <p className="text-gray-600 text-sm">Every product goes through strict quality checks before delivery.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Customer First</h4>
                <p className="text-gray-600 text-sm">Our farmers' success is our priority and measure of achievement.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Innovation</h4>
                <p className="text-gray-600 text-sm">Continuously improving our platform and services for better farming.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;