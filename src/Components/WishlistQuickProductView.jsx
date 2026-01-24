import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineClose, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../Functions/Wishlist';
import { useNavigate } from 'react-router-dom';

const WishlistQuickProductView = ({ product, onClose }) => {
  const [inWishlist, setInWishlist] = useState(isInWishlist(product?.id));
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      setInWishlist(isInWishlist(product?.id));
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [product?.id]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setInCart(cart.some(item => item.id === product.id));
  }, [product?.id]);



  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some(item => item.id === product.id)) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      setInCart(true);
      toast.success("Product added to cart!");
      window.dispatchEvent(new Event('cartUpdated')); // global cart update
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        <button
          onClick={onClose}
          className="cursor-pointer absolute right-5 top-5 z-10 text-zinc-500 hover:text-black transition"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
          <div className="w-full h-105 bg-zinc-100 rounded-2xl overflow-hidden">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">{product.title}</h2>
              <p className="mt-3 text-xl font-semibold text-black">{product.price} tk</p>
              <p className="mt-6 text-sm text-zinc-600 leading-relaxed">
                Quick product preview modal. Add description, size, color, stock, or brand info.
              </p>
              <div className="mt-6 text-sm">
                <span className="font-semibold text-zinc-700">Category:</span>{' '}
                <span className="text-zinc-500">{product.category}</span>
              </div>
            </div>
            <button onClick={() => navigate(`/product/${product.id}`)} className='cursor-pointer border-2 border-gray-300 px-10 py-3 font-medium rounded-sm hover:bg-red-500 hover:border-white hover:text-white transition-colors'>
              View Product Details
            </button>


            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={inCart}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${inCart
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-black text-white hover:bg-zinc-800 cursor-pointer '
                  }`}
              >
                {inCart ? 'Added to Cart' : 'Add to Cart'}
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistQuickProductView;
