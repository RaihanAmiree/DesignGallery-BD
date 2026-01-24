import { toast } from 'react-toastify';

export const getWishlist = () => {
  const stored = localStorage.getItem('wishlist');
  return stored ? JSON.parse(stored) : [];
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  
  if (wishlist.some(item => item.id === product.id)) {
    return;
  }

  wishlist.push(product);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const newWishlist = wishlist.filter(item => item.id !== productId);

  if (newWishlist.length === wishlist.length) {
    return;
  }

  localStorage.setItem('wishlist', JSON.stringify(newWishlist));
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};
