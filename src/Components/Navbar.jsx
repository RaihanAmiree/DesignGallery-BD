import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch, IoHeartOutline, IoCartOutline, IoMenu, IoClose, IoPersonOutline } from "react-icons/io5";
import WishlistBadge from './WishlistBadge';
import CartBadge from './CartBadge';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Link styling: Black for active, Gray for inactive
  const navItemStyles = ({ isActive }) => 
    `relative cursor-pointer group py-2 transition-colors duration-300 ${
      isActive ? 'text-black' : 'text-gray-600 hover:text-black'
    }`;

  // Underline styling: Black rectangle border effect
  const underlineStyles = (isActive) => 
    `absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`;

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-5">
        <div className="flex items-center justify-between">
          
          {/* Logo Placeholder - Now Dark */}
          <NavLink to="/" className="shrink-0">
           
              <img src="/Products_Img/Logo.png" alt="" className="h-10 md:h-12 lg:h-14 w-auto object-contain"/>
          </NavLink>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
            <li>
              <NavLink to="/" className={navItemStyles}>
                {({ isActive }) => (
                  <>Home<span className={underlineStyles(isActive)}></span></>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={navItemStyles}>
                {({ isActive }) => (
                  <>Shop<span className={underlineStyles(isActive)}></span></>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navItemStyles}>
                {({ isActive }) => (
                  <>About<span className={underlineStyles(isActive)}></span></>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navItemStyles}>
                {({ isActive }) => (
                  <>Contact<span className={underlineStyles(isActive)}></span></>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Bar - Light Background */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="bg-gray-100 border border-transparent py-2.5 pl-5 pr-12 rounded-full text-sm w-64 text-black placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-gray-200 transition-all"
              />
              <IoSearch className="absolute right-4 top-3 text-2xl text-gray-600 cursor-pointer" />
            </div>

            {/* Icons & Account */}
            <div className="flex items-center gap-5 text-black">
              {/* Wishlist Link */}
              <NavLink to="/wishlist" className={({isActive}) => isActive ? "text-red-500 scale-110" : "hover:scale-110 transition-transform text-3xl text-gray-700"}>
                 <WishlistBadge />
              </NavLink>

              {/* Cart Link */}
              <NavLink to="/cart" className={({isActive}) => isActive ? "text-red-500 scale-110" : " hover:scale-110 transition-transform text-3xl text-gray-700"}>
                <CartBadge></CartBadge>
              </NavLink>

             
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-4xl text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-60 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-8 flex flex-col gap-8">
          <button onClick={() => setIsOpen(false)} className="self-end text-4xl text-black">
            <IoClose />
          </button>
          <nav className="flex flex-col gap-6 text-xl font-semibold">
            {['Home', 'Shop', 'About','Contact', 'Wishlist', 'Cart'].map((item) => (
              <NavLink 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  isActive ? 'text-black border-b-2 border-black w-fit' : 'text-gray-500 hover:text-black'
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;