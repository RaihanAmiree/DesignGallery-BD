import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <>
      <h1 className='mx-auto text-center block text-3xl md:text-5xl my-5 font-bold text-red-500'>
        Profile
      </h1>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 font-sans text-black flex flex-col md:flex-row gap-6 md:gap-10">

        <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0">
          <Link
            to="info"
            className="flex-1 md:flex-none whitespace-nowrap border-2 border-gray-200 bg-white px-4 md:px-6 py-3 rounded-sm font-medium hover:bg-[#da5b5b] hover:text-white transition-colors text-center text-sm md:text-base"
          >
            My Profile
          </Link>
          <Link
            to="editprofile"
            className="flex-1 md:flex-none whitespace-nowrap border-2 border-gray-200 bg-white px-4 md:px-6 py-3 rounded-sm font-medium hover:bg-[#da5b5b] hover:text-white transition-colors text-center text-sm md:text-base"
          >
            Edit My Profile
          </Link>
          <Link
            to="wishlist"
            className="flex-1 md:flex-none whitespace-nowrap border-2 border-gray-200 bg-white px-4 md:px-6 py-3 rounded-sm font-medium hover:bg-[#da5b5b] hover:text-white transition-colors text-center text-sm md:text-base"
          >
            My Wishlist
          </Link>
          <Link
            to="orders"
            className="flex-1 md:flex-none whitespace-nowrap border-2 border-gray-200 bg-white px-4 md:px-6 py-3 rounded-sm font-medium hover:bg-[#da5b5b] hover:text-white transition-colors text-center text-sm md:text-base"
          >
            My Orders
          </Link>
        </div>

        <div className="flex-1 bg-white   rounded-sm shadow-sm border border-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;