import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-14 px-4">
      <div className="group select-none">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d7a] ">
          {title}
        </h2>

        <div className="w-24 h-1 bg-black mx-auto mt-4 rounded-full transition-all duration-300 group-hover:w-40"></div>
      </div>


      <p className="mt-4 text-gray-500 text-sm sm:text-base">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;