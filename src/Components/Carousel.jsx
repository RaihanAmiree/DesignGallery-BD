import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from '../Components/ProductCard';
import QuickProductView from '../Components/QuickProductView';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Carousel = ({ wishlistItems, addToWishlist, handleAddToCart }) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(2);
      else if (window.innerWidth < 1024) setItemsToShow(3);
      else setItemsToShow(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p => p.id >= 1 && p.id <= 12);
        setProductsData([...filtered, ...filtered, ...filtered]);
        setCurrentIndex(filtered.length); 
        setLoading(false);
      });
  }, []);

  const handleTransitionEnd = () => {
    const realLength = productsData.length / 3;
    if (currentIndex >= realLength * 2) {
      setIsTransitioning(false);
      setCurrentIndex(realLength);
    } else if (currentIndex < realLength) {
      setIsTransitioning(false);
      setCurrentIndex(realLength * 2 - 1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => setCurrentIndex(prev => prev + 1), []);
  const handlePrev = useCallback(() => setCurrentIndex(prev => prev - 1), []);

  const onDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX || e.touches[0].pageX;
    setDragOffset(currentX - startX);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -50) handleNext();
    else if (dragOffset > 50) handlePrev();
    setIsDragging(false);
    setDragOffset(0);
  };

  // Expose the navigation functions via a custom event or shared parent if needed, 
  // but for simplicity, we will keep the UI internal to the Carousel's top bar.

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* 1. Header with Title/Button and Navigation Arrows */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-2xl font-bold text-zinc-800">Featured Products</h2>
        
        {/* Navigation Buttons grouped together */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 bg-zinc-100 rounded-full hover:bg-[#ffcc00] hover:text-black transition-all active:scale-90"
            aria-label="Previous"
          >
            <AiOutlineLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 bg-zinc-100 rounded-full hover:bg-[#ffcc00] hover:text-black transition-all active:scale-90"
            aria-label="Next"
          >
            <AiOutlineRight size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-4">
          {[...Array(itemsToShow)].map((_, i) => (
            <div key={i} className="h-72 flex-1 bg-zinc-100 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div 
          className="overflow-hidden touch-pan-y"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)' : ''}`}
            style={{ 
              transform: `translateX(calc(-${currentIndex * (100 / itemsToShow)}% + ${dragOffset}px))`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {productsData.map((product, index) => (
              <div 
                key={`${product.id}-${index}`} 
                className="flex-shrink-0 px-2 select-none"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <ProductCard
                  product={product}
                  viewProduct={() => setSelectedProduct(product)}
                  addToWishlist={() => addToWishlist(product)}
                  wishlistItems={wishlistItems}
                  handleAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProduct && (
        <QuickProductView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Carousel;