
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const UserMenu = () => {
    const navigate = useNavigate();
    const { userProfile, updateProfile } = useChatbot();
    const { t } = useLanguage();

    const handleLogout = () => {
        updateProfile({
            name: '',
            village: '',
            ward: '',
            mobile: '',
            farmSize: '',
            primaryCrops: []
        });
        navigate('/');
    };

    if (userProfile.name) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userProfile.name}`} alt={userProfile.name} />
                            <AvatarFallback>{userProfile.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {userProfile.mobile}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/purchase-history')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Purchase History</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-green-700"
            onClick={() => navigate('/login')}
        >
            <User className="h-4 w-4 mr-0 md:mr-2" />
            <span className="hidden md:inline">{t('header.login')}</span>
        </Button>
    );
};

export default UserMenu;
