import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface CartItem extends Iproduct.Product {
  cartQuantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Iproduct.Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getProductIds: () => string[];
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  addMultipleToCart: (products: Iproduct.Product[]) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length > 0) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Iproduct.Product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].cartQuantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, cartQuantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.cartQuantity,
      0
    );
  };

  const getProductIds = () => {
    return cart.map((item) => item._id);
  };

  // New functions for quantity manipulation
  const increaseQuantity = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(
        (item) => item._id === productId
      );
      if (productIndex >= 0) {
        updatedCart[productIndex].cartQuantity += 1;
      }
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(
        (item) => item._id === productId
      );
      if (productIndex >= 0) {
        if (updatedCart[productIndex].cartQuantity > 1) {
          updatedCart[productIndex].cartQuantity -= 1;
        } else {
          // Remove item from cart if quantity reaches 0
          updatedCart.splice(productIndex, 1);
        }
      }
      return updatedCart;
    });
  };
  const addMultipleToCart = (products: Iproduct.Product[]) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];

      products.forEach((product) => {
        const existingProductIndex = updatedCart.findIndex(
          (item) => item._id === product._id
        );
        if (existingProductIndex >= 0) {
          updatedCart[existingProductIndex].cartQuantity += 1;
        } else {
          updatedCart.push({ ...product, cartQuantity: 1 });
        }
      });

      return updatedCart;
    });
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getProductIds,
        increaseQuantity,
        decreaseQuantity,
        addMultipleToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
