import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const WishCard = ({ product, viewProduct, onRemove, handleAddToCart }) => {
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setInCart(cart.some(item => item.id === product.id));
  }, [product.id]);

  const addToCartHandler = (e) => {
    e.stopPropagation();

    if (handleAddToCart) {
      handleAddToCart(product);
      setInCart(true);
    }
  };


  return (
    <div className=" group relative w-full max-w-sm overflow-hidden  bg-white  mx-auto">

      <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100" onClick={() => navigate(`/product/${product.id}`)}>
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
        />

        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              viewProduct && viewProduct(product);
            }}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm hover:bg-black hover:text-white transition-all active:scale-90"
          >
            <AiOutlineEye size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(product.id)
            }}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm hover:bg-black hover:text-white transition-all active:scale-90"
          >
            <RiDeleteBin6Line size={18} />
          </button>

          <button
            onClick={addToCartHandler}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm hover:bg-black hover:text-white transition-all active:scale-90"
          >
            <HiOutlineShoppingBag size={18} />
          </button>
        </div>



        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mt-1">
          <h3 className="text-base font-bold text-zinc-900 leading-tight">
            {product.title}
          </h3>

          <span className="text-base font-bold text-zinc-900">
            {product.price}tk
          </span>
        </div>
        <div className="w-full mt-5 border-2 border-[#291b39]/30">
          <button
            onClick={addToCartHandler}
            className="cursor-pointer w-full py-4 font-bold uppercase text-sm hover:bg-[#1e2042] hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
