import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import QuickProductView from '../Components/QuickProductView';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';


const ShopPage = () => {
  // --- Products & loading ---
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();


  // --- Pagination & filters ---
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // --- Wishlist state ---
  const [wishlistItems, setWishlistItems] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });
  

  // --- Modal state ---
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- Fetch products from JSON ---
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProductsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);
// -------------------------------------
  useEffect(() => {
  const categoryFromUrl = searchParams.get('category');

  if (!categoryFromUrl || productsData.length === 0) return;

  const exists = productsData.some(
    p => p.category === categoryFromUrl
  );

  setSelectedCategory(exists ? categoryFromUrl : 'All');
  setCurrentPage(1);
}, [searchParams, productsData]);
// -------------------------------------



  // --- Categories ---
  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  // --- Filtered products ---
  const filteredProducts =
    selectedCategory === 'All'
      ? productsData
      : productsData.filter(p => p.category === selectedCategory);

  // --- Pagination calculations ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Wishlist function ---
  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) return; // already in wishlist
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setWishlistItems(wishlist);
  };

  // --- Handlers ---
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value === 50 ? filteredProducts.length : value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

    const handleAddToCart = () => {
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row gap-12">

        {/* Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <h2 className="text-lg font-bold mb-6 text-zinc-900 border-l-4 border-black pl-3">
            Shop by Category
          </h2>
          <ul className="space-y-4">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'text-black font-bold'
                      : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-10 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <p className="text-sm text-zinc-500">
              Showing {currentItems.length} of {filteredProducts.length} results
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-zinc-700">Show :</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="bg-white border border-zinc-200 rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-black cursor-pointer"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>All</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, i) => (
                  <div
                    key={i}
                    className="h-87.5 w-full bg-zinc-100 animate-pulse rounded-2xl"
                  />
                ))
              : currentItems.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewProduct={setSelectedProduct}
                    addToWishlist={() => addToWishlist(product)}
                    wishlistItems={wishlistItems}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <AiOutlineLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`w-10 h-10 flex items-center justify-center font-bold text-sm rounded-md transition-all ${
                    currentPage === num
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <AiOutlineRight size={20} />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Quick Product View Modal */}
      {selectedProduct && (
        <QuickProductView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ShopPage;
