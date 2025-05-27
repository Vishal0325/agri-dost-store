
import React from 'react';
import { Calendar, User, Clock, ArrowRight, Leaf, Droplets, Bug, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BlogPage = () => {
  const featuredPost = {
    id: 1,
    title: "Complete Guide to Organic Farming in India",
    excerpt: "Learn the best practices for organic farming, including soil preparation, natural fertilizers, and pest management techniques that work in Indian climate conditions.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
    author: "Dr. Rakesh Sharma",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Organic Farming",
    tags: ["Organic", "Soil Health", "Fertilizers"]
  };

  const blogPosts = [
    {
      id: 2,
      title: "Best Seeds for Summer Crop Season",
      excerpt: "Discover which seeds perform best during India's summer season and tips for successful cultivation.",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3",
      author: "Priya Patel",
      date: "March 12, 2024",
      readTime: "5 min read",
      category: "Seeds",
      icon: Leaf
    },
    {
      id: 3,
      title: "Water Management Techniques",
      excerpt: "Efficient irrigation methods to conserve water and maximize crop yield.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      author: "Amit Kumar",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Irrigation",
      icon: Droplets
    },
    {
      id: 4,
      title: "Natural Pest Control Methods",
      excerpt: "Eco-friendly ways to protect your crops from pests without harmful chemicals.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?ixlib=rb-4.0.3",
      author: "Sunita Singh",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Pest Control",
      icon: Bug
    },
    {
      id: 5,
      title: "Climate-Smart Agriculture",
      excerpt: "Adapting farming practices to changing climate conditions for sustainable agriculture.",
      image: "https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-4.0.3",
      author: "Dr. Meera Joshi",
      date: "March 5, 2024",
      readTime: "9 min read",
      category: "Climate",
      icon: Thermometer
    },
    {
      id: 6,
      title: "Soil Testing and Analysis",
      excerpt: "Understanding your soil composition for better crop planning and fertilizer application.",
      image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3",
      author: "Rajesh Gupta",
      date: "March 3, 2024",
      readTime: "4 min read",
      category: "Soil Health",
      icon: Leaf
    },
    {
      id: 7,
      title: "Modern Farming Tools Guide",
      excerpt: "Essential tools and equipment that can revolutionize your farming efficiency.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3",
      author: "Vikram Singh",
      date: "March 1, 2024",
      readTime: "6 min read",
      category: "Tools",
      icon: Leaf
    }
  ];

  const categories = [
    { name: "All", count: 25, active: true },
    { name: "Organic Farming", count: 8 },
    { name: "Seeds", count: 6 },
    { name: "Irrigation", count: 4 },
    { name: "Pest Control", count: 5 },
    { name: "Soil Health", count: 2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Farming Knowledge Hub</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Expert tips, guides, and insights to help you grow better crops and increase your farm productivity
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <Badge className="mb-3 bg-green-100 text-green-800">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4 mb-2">
                    <User className="h-4 w-4 mr-1" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button className="bg-green-600 hover:bg-green-700">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        category.active 
                          ? 'bg-green-100 text-green-700 font-medium' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Stay Updated</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest farming tips and guides delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Latest</option>
                  <option>Most Popular</option>
                  <option>Most Viewed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => {
                const IconComponent = post.icon;
                return (
                  <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white text-gray-700">
                          <IconComponent className="h-3 w-3 mr-1" />
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <div className="flex items-center mr-3">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center mr-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="group-hover:bg-green-600 group-hover:text-white transition-colors">
                        Read More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
