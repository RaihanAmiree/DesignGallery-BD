import React from 'react'
import Carousel from '../Components/Carousel'
import { Link } from 'react-router'

const CarouselPage = () => {
  return (
    <div className="w-full py-10 bg-white  px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start mb-4">
          <Link to='/shop'>
            <button className='cursor-pointer bg-[#023d77] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-[#001f3f] transition-all shadow-md active:scale-95'>
              Show All Products
            </button>
          </Link>
        </div>

        <Carousel />
      </div>
    </div>
  )
}

export default CarouselPage