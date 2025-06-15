
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Home, Bug, ShieldCheck, Sprout, Microscope, Seedling, Wrench, Info, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const AppSidebar = () => {
  const { t } = useLanguage();

  const menuItems = [
    { title: t('nav.home'), href: '/', icon: Home },
    { title: t('categories.insecticide'), href: '/products', icon: Bug },
    { title: t('categories.fungicide'), href: '/products', icon: ShieldCheck },
    { title: t('categories.pgr'), href: '/products', icon: Sprout },
    { title: t('categories.miticide'), href: '/products', icon: Microscope },
    { title: t('categories.seeds'), href: '/products', icon: Seedling },
    { title: t('categories.tools'), href: '/products', icon: Wrench },
    { title: 'About Us', href: '/blog', icon: Info },
    { title: 'Contact Info', href: '/', icon: Phone },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-green-600 rounded-full md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white p-0">
          <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold text-green-700">Menu</h2>
              <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                  </Button>
              </SheetClose>
          </div>
        <div className="py-4">
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <SheetClose asChild key={item.title}>
                <Link
                  to={item.href}
                  className="flex items-center space-x-4 px-4 py-3 text-lg text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                >
                  <item.icon className="h-6 w-6 text-green-600" />
                  <span>{item.title}</span>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppSidebar;
