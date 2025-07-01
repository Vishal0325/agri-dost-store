import React, { useState } from 'react';
import { Search, ShoppingCart, User, Phone, Truck, Leaf, Star, Crown, Sprout, SprayCan, Wrench, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import WalletDisplay from '@/components/WalletDisplay';
import { useWallet } from '@/contexts/WalletContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import UserMenu from './UserMenu';
import { allProducts } from '@/lib/products';
import { allBrands } from '@/lib/brands';
import HomeVoiceSearch from './HomeVoiceSearch';
import LocationDisplay from './LocationDisplay';
import AppSidebar from './AppSidebar';

const Header = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { balance, deductMoney } = useWallet();
    const { addToCart, getTotalItems } = useCart();
    const { toast } = useToast();

    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [brandResults, setBrandResults] = useState<any[]>([]);

    const handleHomeVoiceSearch = (voiceQuery: string) => {
        setSearchQuery(voiceQuery);
        performSearch(voiceQuery);
    };

    const categories = [
        { id: 1, name: t('categories.seeds'), icon: Sprout },
        { id: 2, name: t('categories.pgr'), icon: Leaf },
        { id: 3, name: t('categories.pesticides'), icon: SprayCan },
        { id: 4, name: t('categories.herbicide'), icon: Crown },
        { id: 5, name: t('categories.sprayMachine'), icon: SprayCan },
        { id: 6, name: t('categories.tools'), icon: Wrench },
    ];
    
    const performSearch = (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            setBrandResults([]);
            setShowSearchResults(false);
            return;
        }

        // Search products
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.badge.toLowerCase().includes(query.toLowerCase()) ||
            product.company.toLowerCase().includes(query.toLowerCase())
        );

        // Search brands with priority for "starts-with" matches
        const startsWithMatches = allBrands.filter(brand =>
            brand.name.toLowerCase().startsWith(query.toLowerCase())
        );
        
        const containsMatches = allBrands.filter(brand =>
            brand.name.toLowerCase().includes(query.toLowerCase()) &&
            !brand.name.toLowerCase().startsWith(query.toLowerCase())
        );

        const filteredBrands = [...startsWithMatches, ...containsMatches];

        setSearchResults(filteredProducts);
        setBrandResults(filteredBrands);
        setShowSearchResults(true);
    };

    const handleTextSearch = () => {
        performSearch(searchQuery);
    };

    const handleVoiceSearch = (query: string) => {
        setSearchQuery(query);
        performSearch(query);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.length > 0) {
            performSearch(value);
        } else {
            setSearchResults([]);
            setBrandResults([]);
            setShowSearchResults(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTextSearch();
        }
    };

    const handleSearchBlur = () => {
        setTimeout(() => {
            setShowSearchResults(false);
        }, 200);
    };

    const handlePurchase = (product: any) => {
        const productPrice = product.price;

        if (balance >= productPrice) {
            const success = deductMoney(productPrice);
            if (success) {
                toast({
                    title: "Purchase Successful!",
                    description: `You bought ${product.name} for ₹${productPrice}`,
                });
                setShowSearchResults(false);
            }
        } else {
            toast({
                title: "Insufficient Balance",
                description: `You need ₹${productPrice - balance} more to buy this product`,
                variant: "destructive",
            });
        }
    };

    const handleBrandClick = (brand: any) => {
        navigate(`/brand/${brand.slug}`);
        setShowSearchResults(false);
        setSearchQuery('');
    };

    return (
        <header className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white shadow-2xl sticky top-0 z-40">
            <div className="border-b border-green-500 bg-green-800">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                <span>{t('header.phone')}</span>
                            </div>
                            <div className="flex items-center">
                                <Truck className="h-4 w-4 mr-2" />
                                <span>{t('header.shipping')}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <WalletDisplay variant="header" />
                            <LanguageSwitcher />
                            <UserMenu />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <AppSidebar />
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="bg-white p-2 rounded-full">
                                <Leaf className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="hidden md:block">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    {t('header.title')}
                                </h1>
                                <p className="text-sm text-green-200">{t('header.subtitle')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-2xl mx-2 md:mx-8">
                        <div className="relative">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                                <Input
                                    placeholder="Search products or brand names..."
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                    onBlur={handleSearchBlur}
                                    onFocus={() => searchQuery && setShowSearchResults(true)}
                                    className="w-full pl-10 pr-20 py-3 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-500"
                                />
                                <div className="absolute right-12 top-1/2 transform -translate-y-1/2 z-10">
                                    <HomeVoiceSearch
                                        setSearchQuery={setSearchQuery}
                                        onVoiceSearchResult={handleHomeVoiceSearch}
                                        disabled={false}
                                    />
                                </div>
                                <Button
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 z-10"
                                    onClick={handleTextSearch}
                                >
                                    {t('common.search')}
                                </Button>
                            </div>
                            {showSearchResults && searchQuery && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                                    {brandResults.length === 0 && searchResults.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            <p>Sorry, no brands or products match your search.</p>
                                            <p className="text-sm mt-1">Please try again with different keywords.</p>
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            {/* Brand Results Section */}
                                            {brandResults.length > 0 && (
                                                <>
                                                    <div className="text-xs text-gray-500 px-3 py-2 border-b font-medium bg-blue-50">
                                                        🏢 Brands ({brandResults.length} found)
                                                    </div>
                                                    {brandResults.map((brand) => (
                                                        <div 
                                                            key={brand.id} 
                                                            className="p-3 hover:bg-blue-50 border-b cursor-pointer transition-colors" 
                                                            onClick={() => handleBrandClick(brand)}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <img
                                                                    src={brand.logo}
                                                                    alt={brand.name}
                                                                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="font-semibold text-gray-900 text-sm">{brand.name}</h4>
                                                                    <p className="text-xs text-gray-600 mt-1">{brand.tagline}</p>
                                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{brand.description}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <Badge variant="outline" className="text-xs">
                                                                        View Brand
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}

                                            {/* Product Results Section */}
                                            {searchResults.length > 0 && (
                                                <>
                                                    <div className="text-xs text-gray-500 px-3 py-2 border-b font-medium bg-green-50">
                                                        🛒 Products ({searchResults.length} found)
                                                    </div>
                                                    {searchResults.map((product) => (
                                                        <div key={product.id} className="p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                                                            <div className="flex items-center space-x-3">
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</h4>
                                                                    <div className="flex items-center justify-between mt-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <span className="font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                                                                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                                                        </div>
                                                                        <Button
                                                                            size="sm"
                                                                            className={`text-xs px-3 py-1 ${balance >= product.price ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                                                                            disabled={balance < product.price}
                                                                            onClick={(e) => { e.stopPropagation(); handlePurchase(product); }}
                                                                        >
                                                                            <Wallet className="h-3 w-3 mr-1" />
                                                                            Buy
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="hidden md:block">
                            <LocationDisplay />
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 md:space-x-4">
                        <WalletDisplay variant="inline" />
                        <Button
                            variant="ghost"
                            className="relative p-3 hover:bg-green-700 rounded-full"
                            onClick={() => navigate('/cart')}
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {getTotalItems() > 0 && (
                                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                                    {getTotalItems()}
                                </Badge>
                            )}
                            <span className="ml-2 hidden md:inline">{t('header.cart')}</span>
                        </Button>
                    </div>
                </div>
                <div className="md:hidden mt-2">
                    <LocationDisplay />
                </div>
            </div>

            <nav className="border-t border-green-500 bg-green-700">
                <div className="container mx-auto px-4">
                    <div className="hidden md:flex items-center justify-center space-x-6 py-3 flex-wrap">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <Button
                                    key={category.id}
                                    variant="ghost"
                                    className="text-white hover:bg-green-600 hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2 text-sm"
                                    onClick={() => navigate('/products')}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="hidden md:inline">{category.name}</span>
                                </Button>
                            );
                        })}
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-green-600 hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2"
                            onClick={() => navigate('/crop-products')}
                        >
                            <Sprout className="h-4 w-4" />
                            <span className="hidden md:inline">{t('nav.cropSuggestions')}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-green-600 hover:text-yellow-300 transition-all duration-300 flex items-center space-x-2"
                            onClick={() => navigate('/blog')}
                        >
                            <User className="h-4 w-4" />
                            <span className="hidden md:inline">{t('nav.blog')}</span>
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
