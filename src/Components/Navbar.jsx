import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch, IoHeartOutline, IoCartOutline, IoMenu, IoClose, IoPersonOutline } from "react-icons/io5";
import WishlistBadge from './WishlistBadge';
import CartBadge from './CartBadge';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemStyles = ({ isActive }) =>
    `relative cursor-pointer group py-2 transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-600 hover:text-black'
    }`;

  const underlineStyles = (isActive) =>
    `absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`;

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-5">
        <div className="flex items-center justify-between">

          <NavLink to="/" className="shrink-0">

            <img src="/Products_Img/Logo.png" alt="" className="h-10 md:h-12 lg:h-14 w-auto object-contain" />
          </NavLink>

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

          <div className="hidden md:flex items-center gap-6">


            <div className="flex items-center gap-5 text-black">
              <NavLink to="/wishlist" className={({ isActive }) => isActive ? "text-red-500 scale-110" : "hover:scale-110 transition-transform text-3xl text-gray-700"}>
                <WishlistBadge />
              </NavLink>
              <NavLink to="/cart" className={({ isActive }) => isActive ? "text-red-500 scale-110" : " hover:scale-110 transition-transform text-3xl text-gray-700"}>
                <CartBadge></CartBadge>
              </NavLink>


            </div>
          </div>

          <button className="md:hidden text-4xl text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-60 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-8 flex flex-col gap-8">
          <button onClick={() => setIsOpen(false)} className="self-end text-4xl text-black">
            <IoClose />
          </button>
          <nav className="flex flex-col gap-6 text-xl font-semibold">
            {['Home', 'Shop', 'About', 'Contact', 'Wishlist', 'Cart'].map((item) => (
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