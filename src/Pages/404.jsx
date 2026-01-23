import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-black">
     

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-7xl md:text-9xl font-medium tracking-widest mb-6">
          404 Not Found
        </h1>
        
        <p className="text-base md:text-lg mb-12">
          Your visited page not found. You may go home page.
        </p>

        <Link 
          to="/" 
          className="bg-[#DB4444] text-white px-12 py-4 rounded-sm font-medium hover:bg-[#E07575] transition-colors"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;