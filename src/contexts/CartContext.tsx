import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  company: string;
  quantity: number;
  badge?: string;
  selectedForCheckout: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  toggleItemSelection: (id: number) => void;
  removePurchasedItems: () => void;
  selectAllItems: (select: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: any) => {
    console.log('Adding to cart:', product);
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity and set as selected if item already exists
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, selectedForCheckout: true }
            : item
        );
        
        toast({
          title: "मात्रा बढ़ाई गई!",
          description: `${product.name} की मात्रा बढ़ाकर ${existingItem.quantity + 1} कर दी गई`,
        });
        
        return updatedItems;
      } else {
        // Add new item and set as selected
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          company: product.company,
          quantity: 1,
          badge: product.badge,
          selectedForCheckout: true,
        };
        
        toast({
          title: "कार्ट में जोड़ा गया!",
          description: `${product.name} आपके कार्ट में जोड़ दिया गया`,
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      toast({
        title: "कार्ट से हटाया गया",
        description: "उत्पाद कार्ट से हटा दिया गया",
      });
      return updatedItems;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "कार्ट खाली कर दिया गया",
      description: "सभी उत्पाद कार्ट से हटा दिए गए",
    });
  };

  const toggleItemSelection = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selectedForCheckout: !item.selectedForCheckout } : item
      )
    );
  };
  
  const selectAllItems = (select: boolean) => {
    setCartItems(prevItems =>
      prevItems.map(item => ({ ...item, selectedForCheckout: select }))
    );
  };

  const removePurchasedItems = () => {
    setCartItems(prevItems => prevItems.filter(item => !item.selectedForCheckout));
    toast({
      title: "खरीदारी पूरी हुई",
      description: "खरीदे गए आइटम आपके कार्ट से हटा दिए गए हैं।",
    });
  };

  const getTotalPrice = () => {
    return cartItems
      .filter(item => item.selectedForCheckout)
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems
      .filter(item => item.selectedForCheckout)
      .reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        toggleItemSelection,
        removePurchasedItems,
        selectAllItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
