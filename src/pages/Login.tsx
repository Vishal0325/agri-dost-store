
import React, { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface LoginFormData {
  name: string;
  mobile: string;
  pincode: string;
  village: string;
  ward: string;
  post: string;
  subBlock: string;
  district: string;
}

interface PostOffice {
  Name: string;
  District: string;
  Block: string;
  State: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [availableLocations, setAvailableLocations] = useState<PostOffice[]>([]);

  const form = useForm<LoginFormData>({
    defaultValues: {
      name: '',
      mobile: '',
      pincode: '',
      village: '',
      ward: '',
      post: '',
      subBlock: '',
      district: ''
    }
  });

  const fetchLocationByPincode = async (pincode: string) => {
    if (pincode.length !== 6) {
      setAvailableLocations([]);
      return;
    }
    
    setIsLoadingLocation(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0].Status === 'Success' && data[0].PostOffice.length > 0) {
        setAvailableLocations(data[0].PostOffice);
        
        toast({
          title: "Locations Found",
          description: `${data[0].PostOffice.length} locations found for PIN ${pincode}`,
        });
      } else {
        setAvailableLocations([]);
        toast({
          title: "Location Not Found",
          description: "No locations found for this PIN code",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setAvailableLocations([]);
      toast({
        title: "Error",
        description: "Could not fetch locations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const onSubmit = (data: LoginFormData) => {
    console.log('Login form submitted:', data);
    toast({
      title: "Registration Successful",
      description: `Welcome ${data.name}! Your account has been created.`,
    });
    navigate('/');
  };

  const handlePincodeChange = (value: string) => {
    form.setValue('pincode', value);
    // Clear previous selections when PIN code changes
    form.setValue('village', '');
    form.setValue('post', '');
    form.setValue('subBlock', '');
    form.setValue('district', '');
    
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      fetchLocationByPincode(value);
    } else {
      setAvailableLocations([]);
    }
  };

  const handleLocationSelect = (locationName: string) => {
    const selectedLocation = availableLocations.find(loc => loc.Name === locationName);
    if (selectedLocation) {
      form.setValue('village', selectedLocation.Name);
      form.setValue('post', selectedLocation.Name);
      form.setValue('subBlock', selectedLocation.Block);
      form.setValue('district', selectedLocation.District);
    }
  };

  // Get unique values for dropdowns
  const uniqueVillages = [...new Set(availableLocations.map(loc => loc.Name))];
  const uniquePosts = [...new Set(availableLocations.map(loc => loc.Name))];
  const uniqueBlocks = [...new Set(availableLocations.map(loc => loc.Block))];
  const uniqueDistricts = [...new Set(availableLocations.map(loc => loc.District))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-green-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-green-100 text-sm">Join our farming community</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800 mb-2">
              Register Your Account
            </CardTitle>
            <p className="text-gray-600">
              Enter your details to get started with KrishiMart
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="Enter your full name" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mobile"
                    rules={{ 
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Please enter a valid 10-digit mobile number"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="Enter mobile number" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Address Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="pincode"
                    rules={{ 
                      required: "PIN Code is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Please enter a valid 6-digit PIN code"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="Enter PIN code to load locations" 
                              className="pl-10" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handlePincodeChange(e.target.value);
                              }}
                            />
                            {isLoadingLocation && (
                              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600 animate-spin" />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="village"
                      rules={{ required: "Village is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Village</FormLabel>
                          <FormControl>
                            {uniqueVillages.length > 0 ? (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select village" />
                                </SelectTrigger>
                                <SelectContent>
                                  {uniqueVillages.map((village) => (
                                    <SelectItem key={village} value={village}>
                                      {village}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input placeholder="Enter village" {...field} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ward"
                      rules={{ required: "Ward is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ward</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ward" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="post"
                      rules={{ required: "Post office is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post Office</FormLabel>
                          <FormControl>
                            {uniquePosts.length > 0 ? (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select post office" />
                                </SelectTrigger>
                                <SelectContent>
                                  {uniquePosts.map((post) => (
                                    <SelectItem key={post} value={post}>
                                      {post}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input placeholder="Enter post office" {...field} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subBlock"
                      rules={{ required: "Sub Block is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub Block</FormLabel>
                          <FormControl>
                            {uniqueBlocks.length > 0 ? (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sub block" />
                                </SelectTrigger>
                                <SelectContent>
                                  {uniqueBlocks.map((block) => (
                                    <SelectItem key={block} value={block}>
                                      {block}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input placeholder="Enter sub block" {...field} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="district"
                    rules={{ required: "District is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          {uniqueDistricts.length > 0 ? (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select district" />
                              </SelectTrigger>
                              <SelectContent>
                                {uniqueDistricts.map((district) => (
                                  <SelectItem key={district} value={district}>
                                    {district}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input placeholder="Enter district" {...field} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(-1)} 
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
