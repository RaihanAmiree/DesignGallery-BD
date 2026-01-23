// src/Functions/Cart.js

// Get cart from localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Check if a product is in the cart
export const isInCart = (productId) => {
  return getCart().some(item => item.id === productId);
};

// Add product to cart (or increase quantity if exists)
export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

// Remove product from cart
export const removeFromCart = (productId) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

// Increase quantity
export const increaseQuantity = (productId) => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) item.quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

// Decrease quantity
export const decreaseQuantity = (productId) => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item && item.quantity > 1) item.quantity -= 1;
  else removeFromCart(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const clearCart = () => {
  localStorage.removeItem('cart'); // remove the cart from localStorage
  window.dispatchEvent(new Event('cartUpdated')); // notify listeners
};


