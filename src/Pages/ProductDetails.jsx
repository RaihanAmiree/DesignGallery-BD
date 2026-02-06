import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../Functions/Wishlist';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === Number(id));
        setProduct(found);
        setActiveImage(found?.images?.[0] || '');
      });
  }, [id]);

  useEffect(() => {
    if (product?.id) {
      setInWishlist(isInWishlist(product.id));
    }
  }, [product]);

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Product removed from wishlist!");
      setInWishlist(false);
    } else {
      addToWishlist(product);
      toast.success("Product added to wishlist!");
      setInWishlist(true);
    }

    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-black">
      <h1 className="mx-auto text-center block text-5xl mb-10 font-bold text-[#012e5b]">
        Product Details
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">

        <div className="flex flex-col-reverse md:flex-row gap-4 lg:w-2/3">

          <div className="flex md:flex-col gap-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(img)}
                className="w-24 h-24 md:w-32 md:h-28 bg-[#F5F5F5] flex items-center justify-center rounded-sm cursor-pointer"
              >
                <img src={img} alt="thumbnail" className="w-20 object-contain" />
              </div>
            ))}
          </div>

          <div className="flex-1 bg-[#F5F5F5] flex items-center justify-center rounded-sm p-8">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>

        <div className="lg:w-1/3">
          <h1 className="text-2xl font-semibold mb-3">{product.title}</h1>

          <div className="text-2xl font-normal mb-6">tk.{product.price}</div>

          <p className="text-sm leading-relaxed mb-6 border-b pb-6">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-10">

            <div className="flex border border-gray-400 rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-[#001f3f] hover:text-white transition-colors border-r border-gray-400 text-xl"
              >
                −
              </button>

              <div className="px-6 py-2 font-semibold text-lg">{quantity}</div>

              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 hover:bg-[#001f3f] hover:text-white transition-colors border-l border-gray-400 text-xl"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];

                if (cart.some(item => item.id === product.id)) {
                  toast.warning('Product already in cart');
                  return;
                }

                cart.push({ ...product, quantity });
                localStorage.setItem('cart', JSON.stringify(cart));
                toast.success('Added to cart');
                window.dispatchEvent(new Event('cartUpdated'));
              }}
              className="flex-1 bg-[#023d77] text-white py-2.5 rounded-md font-medium hover:bg-[#001f3f] transition-colors"
            >
              Buy Now
            </button>

            <button
              onClick={handleWishlistClick}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-black shadow-sm transition-all active:scale-90"
            >
              {inWishlist ? (
                <AiFillHeart size={24} color="#EF4444" />
              ) : (
                <AiOutlineHeart size={24} className="text-gray-800 hover:text-white" />
              )}
            </button>
          </div>

          <Link to="/contact">
            <button className="flex-1 bg-[#023d77] text-white py-2.5 px-4 rounded-md font-medium hover:bg-[#001f3f] transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
