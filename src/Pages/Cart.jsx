import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { getCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../Functions/Cart';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => setCartItems(getCart());
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success("Product removed from cart!");
  };

  const handleClearAll = () => {
  localStorage.setItem('cart', JSON.stringify([])); // Clear cart in localStorage
  setCartItems([]); // Update state
  toast.success("All items removed from cart!"); // Show toast
  window.dispatchEvent(new Event('cartUpdated')); // Trigger cart badge update
};


  const handleIncrease = (id) => increaseQuantity(id);
  const handleDecrease = (id) => decreaseQuantity(id);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans select-none">
      <h1 className='mx-auto text-center block text-5xl my-5 font-bold text-[#001f3f]'>Cart</h1>

      {/* Cart Table Header */}
      <div className="hidden md:grid grid-cols-4 bg-white shadow-sm border border-gray-400 rounded-sm p-5 font-medium mb-6">
        <div>Product</div>
        <div className="text-center">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Subtotal</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is empty!</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 items-center bg-white shadow-sm border border-gray-400 rounded-sm p-5 relative group">
              
              {/* Product Info */}
              <div className="flex items-center gap-4 select-none">
                <div className="relative">
                  <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain" />
                  <button onClick={() => handleRemove(item.id)} className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-0.5 transition-opacity cursor-pointer">
                    <IoCloseOutline size={16} />
                  </button>
                </div>
                <span className="font-medium">{item.title}</span>
              </div>

              {/* Price */}
              <div className="text-center mt-4 md:mt-0 select-none">
                <span className="md:hidden font-bold mr-2">Price:</span>
                ${item.price}
              </div>

              {/* Quantity Selector */}
              <div className="flex justify-center mt-4 md:mt-0 select-none">
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 gap-4">
                  <span>{item.quantity.toString().padStart(2, '0')}</span>
                  <div className="flex flex-col text-gray-600">
                    <RiArrowUpSLine className="cursor-pointer hover:text-black" size={14} onClick={() => handleIncrease(item.id)} />
                    <RiArrowDownSLine className="cursor-pointer hover:text-black" size={14} onClick={() => handleDecrease(item.id)} />
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-center mt-4 md:mt-0 font-medium select-none">
                <span className="md:hidden font-bold mr-2">Subtotal:</span>
                ${item.price * item.quantity}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        <Link to='/shop'>
          <button className="cursor-pointer border-2 border-gray-300 px-10 py-3 font-medium rounded-sm hover:bg-[#001f3f] hover:border-white hover:text-white transition-colors">
            Return To Shop
          </button>
        </Link>

<button
  onClick={handleClearAll}
  className="cursor-pointer border-2 border-gray-300 px-10 py-3 font-medium rounded-sm hover:bg-[#001f3f] hover:border-white hover:text-white transition-colors"
>
  Clear All
</button>


        <Link to='/wishlist'>
          <button className="cursor-pointer border-2 border-gray-300 px-10 py-3 font-medium rounded-sm hover:bg-[#001f3f] hover:border-white hover:text-white transition-colors">
            Go To Wishlist
          </button>
        </Link>
      </div>

      {/* Cart Total Box */}
      <div className="mt-20 flex flex-col lg:flex-row justify-center gap-10 lg:items-start">
        <div className="border-2 border-gray-400 rounded-md p-6 w-full lg:w-100">
          <h3 className="text-xl font-medium mb-6">Cart Total</h3>
          
          <div className="flex justify-between border-b border-gray-300 pb-3 mb-4 select-none">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between border-b border-gray-300 pb-3 mb-4 select-none">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between mb-8 font-medium">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-center">
            <Link to='/billingpage'>
            <button className="cursor-pointer bg-[#023d77] text-white px-10 py-4 rounded-sm font-medium hover:bg-[#001f3f] transition-colors">
              Proceed to checkout
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
