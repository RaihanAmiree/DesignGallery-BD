import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../Functions/Wishlist';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, viewProduct }) => {
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id));
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  // Listen for wishlist updates
  useEffect(() => {
    const handleWishlistUpdate = () => {
      setInWishlist(isInWishlist(product.id));
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [product.id]);

  // Check cart
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setInCart(cart.some(item => item.id === product.id));
  }, [product.id]);

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Product removed from wishlist!");
    } else {
      addToWishlist(product);
      toast.success("Product added to wishlist!");
    }
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.id === product.id)) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      setInCart(true);
      toast.success("Product added to cart!");
      window.dispatchEvent(new Event('cartUpdated'));
    } else {
      toast.warning("Product is already in the cart. Adjust quantity in cart.");
    }
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    viewProduct(product);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer group relative w-full max-w-sm overflow-hidden  bg-white  mx-auto"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Side buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 lg:opacity-0 group-hover:opacity-100">
          <button
            onClick={handleViewProduct}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm hover:bg-black hover:text-white transition-all active:scale-90"
          >
            <AiOutlineEye size={18} />
          </button>

          <button
            onClick={handleWishlistClick}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white group/heart hover:bg-black shadow-sm transition-all active:scale-90"
          >
            {inWishlist ? (
              <AiFillHeart size={18} color="#EF4444" />
            ) : (
              <AiOutlineHeart size={18} className="cursor-pointer text-gray-800 group-hover/heart:text-white" />
            )}
          </button>

          <button
            onClick={handleAddToCart}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm hover:bg-black hover:text-white transition-all active:scale-90"
          >
            <HiOutlineShoppingBag size={18} />
          </button>
        </div>

        {/* Bottom Add to Cart */}
        <div className="absolute bottom-0 w-full translate-y-full group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="cursor-pointer w-full bg-black py-3 text-white font-bold uppercase text-xs hover:bg-zinc-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-bold text-zinc-900 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          {product.oldPrice && (
            <span className="text-xs font-medium text-zinc-400 line-through">
              {product.oldPrice}tk
            </span>
          )}
          <span className="text-base font-bold text-zinc-900">
            {product.price}tk
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
