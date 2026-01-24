
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

export const isInCart = (productId) => {
  return getCart().some(item => item.id === productId);
};

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

export const removeFromCart = (productId) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const increaseQuantity = (productId) => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) item.quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const decreaseQuantity = (productId) => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item && item.quantity > 1) item.quantity -= 1;
  else removeFromCart(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const clearCart = () => {
  localStorage.removeItem('cart'); 
  window.dispatchEvent(new Event('cartUpdated')); 
};


