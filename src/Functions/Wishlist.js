// src/Functions/Wishlist.js
import { toast } from 'react-toastify';

// Get current wishlist from localStorage
export const getWishlist = () => {
  const stored = localStorage.getItem('wishlist');
  return stored ? JSON.parse(stored) : [];
};

// Add a product to wishlist
export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  
  if (wishlist.some(item => item.id === product.id)) {
    // toast.error("Product is already in wishlist!");
    return;
  }

  wishlist.push(product);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   toast.success("Product added to wishlist!");
};

// Remove a product from wishlist
export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const newWishlist = wishlist.filter(item => item.id !== productId);

  if (newWishlist.length === wishlist.length) {
    // toast.error("Product not found in wishlist!");
    return;
  }

  localStorage.setItem('wishlist', JSON.stringify(newWishlist));
//   toast.success("Product removed from wishlist!");
};

// Check if a product is in wishlist
export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};
