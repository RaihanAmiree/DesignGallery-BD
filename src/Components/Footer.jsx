import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt
} from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Cart', path: '/cart' },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  return (
    <footer className="bg-[#001f3f] text-white pt-20 pb-10 mt-auto font-sans border-t border-white/5 select-none">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black  hover:text-[#FFD700] transition-colors inline-block">
              DESIGN GALLERY <span className="text-[#FFD700]">BD</span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Your one-stop destination for premium products. We bridge the gap between digital imagination and physical reality.
            </p>

            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-[#FFD700] hover:text-[#001f3f] hover:border-[#FFD700] hover:-translate-y-1"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#FFD700] mb-8">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-[1px] bg-[#FFD700] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#FFD700] mb-8">
              Categories
            </h3>
            <ul className="space-y-4">
              {categories.slice(0, 6).map(cat => (
                <li key={cat}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat)}`}
                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 h-[1px] bg-[#FFD700] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#FFD700] mb-8">
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-[#FFD700] mt-1" />
                <p className="text-gray-400 text-sm">
                  Dhaka, Bangladesh <br /> 1200 Division
                </p>
              </li>
              <li className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#FFD700]" />
                <p className="text-gray-400 text-sm">
                  +880 1849-853447
                </p>
              </li>
              <li className="pt-4">
                <Link to="/contact">
                  <button className="cursor-pointer text-xs font-bold uppercase tracking-widest border border-[#FFD700] text-[#FFD700] px-6 py-3 rounded-full hover:bg-[#FFD700] hover:text-[#001f3f] transition-all">
                    Get Support
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} DesignGallery BD <br />Developed by Raihan Amiree
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-500">
            <Link to="/privacy" className="hover:text-[#FFD700]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#FFD700]">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
