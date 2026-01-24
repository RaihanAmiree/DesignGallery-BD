import React, { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';

const CartBadge = ({ className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCount(cart.length);
    };

    updateCount(); // initial
    window.addEventListener('cartUpdated', updateCount);

    return () => window.removeEventListener('cartUpdated', updateCount);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <IoCartOutline className="text-3xl" />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default CartBadge;
