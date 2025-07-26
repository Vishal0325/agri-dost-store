
import React from 'react';
import { Leaf, Phone, Sprout, Crown, SprayCan, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const categories = [
        { id: 1, name: t('categories.seeds'), icon: Sprout },
        { id: 2, name: t('categories.pgr'), icon: Leaf },
        { id: 3, name: t('categories.pesticides'), icon: SprayCan },
        { id: 4, name: t('categories.herbicide'), icon: Crown },
        { id: 5, name: t('categories.sprayMachine'), icon: SprayCan },
        { id: 6, name: t('categories.tools'), icon: Wrench },
    ];

    return (
        <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-white p-2 rounded-full">
                                <Leaf className="h-6 w-6 text-green-600" />
                            </div>
                            <h4 className="text-xl font-bold">{t('header.title')}</h4>
                        </div>
                        <p className="text-green-200">
                            {t('header.subtitle')}
                        </p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">{t('footer.quickLinks')}</h5>
                        <ul className="space-y-2 text-green-200">
                            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
                            <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">{t('footer.productCategories')}</h5>
                        <ul className="space-y-2 text-green-200">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors flex items-center space-x-2"
                                        onClick={() => navigate('/products')}
                                    >
                                        <category.icon className="h-3 w-3" />
                                        <span>{category.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">{t('footer.contactInfo')}</h5>
                        <div className="space-y-3 text-green-200">
                            <p className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                +91 98765 43210
                            </p>
                            <p>📧 info@krishimart.com</p>
                            <p>📍 Agricultural Hub, New Delhi, India</p>
                            <div className="mt-4">
                                <h6 className="font-semibold text-white mb-2">About KrishiMart</h6>
                                <p className="text-sm text-green-200">
                                    We are dedicated to providing farmers with high-quality agricultural products at competitive prices. 
                                    With over 1000+ satisfied farmers, we ensure original products and fast delivery across India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
