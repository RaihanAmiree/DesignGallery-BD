import React, { useEffect, useState } from 'react';
import WishCard from '../Components/WishCard';
import WishlistQuickProductView from '../Components/WishlistQuickProductView';
import { toast } from 'react-toastify';
import CarouselPage from './CarouselPage';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistItems(storedWishlist);
    };

    loadWishlist();

    window.addEventListener('wishlistUpdated', loadWishlist);

    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);


  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
    toast.success("Product removed from wishlist!");
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.some(item => item.id === product.id)) {
      toast.warning("Product is already in the cart. Adjust quantity in cart.");
      return;
    }
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Product added to cart!");
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <>
      <div className="pt-12 pb-32 px-6 select-none">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">
            My Wishlist ({wishlistItems.length})
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => {
                localStorage.setItem('wishlist', JSON.stringify([]));
                setWishlistItems([]);
                toast.success("All items removed from wishlist!");
                window.dispatchEvent(new Event('wishlistUpdated'));
              }}
              className="cursor-pointer bg-[#023d77] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#001f3f] transition-colors"
            >
              Clear All
            </button>

            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                let addedCount = 0;

                wishlistItems.forEach(item => {
                  if (!cart.some(cartItem => cartItem.id === item.id)) {
                    cart.push({ ...item, quantity: 1 });
                    addedCount++;
                  }
                });

                localStorage.setItem('cart', JSON.stringify(cart));
                toast.success(`${addedCount} items moved to cart!`);
                window.dispatchEvent(new Event('cartUpdated'));
              }}
              className="cursor-pointer bg-white text-black hover:text-white px-6 py-2 rounded-md font-semibold border-2 border-[#001f3f] hover:bg-[#001f3f] transition-colors"
            >
              Move All To Cart
            </button>
          </div>
        </div>



        {wishlistItems.length === 0 ? (
          <p className="text-lg">Your wishlist is empty. Start adding products!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map(product => (
              <WishCard
                key={product.id}
                product={product}
                viewProduct={setSelectedProduct}
                onRemove={removeFromWishlist}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {selectedProduct && (
          <WishlistQuickProductView
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
      <CarouselPage></CarouselPage>
    </>
  );
};

export default Wishlist;
