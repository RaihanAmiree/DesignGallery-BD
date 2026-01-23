import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { getWishlist } from '../Functions/Wishlist';
import { Link } from 'react-router-dom';

const WishlistBadge = ({ className = '' }) => {
  const [count, setCount] = useState(getWishlist().length);

  useEffect(() => {
    const handleUpdate = () => setCount(getWishlist().length);
    window.addEventListener('wishlistUpdated', handleUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleUpdate);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>

    
      {/* Heart icon always visible */}
      <AiOutlineHeart size={28} className="text-gray-800 hover:text-red-500 transition" />
      
      {/* Badge only visible if count > 0 */}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};

export default WishlistBadge;
