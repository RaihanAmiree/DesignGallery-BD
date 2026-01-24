import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function CommentBox({ name, msg, occupation }) {
  return (
    <div className="group relative max-w-xl mx-auto p-8 bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out overflow-hidden">

      <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm drop-shadow-sm" />
          ))}
        </div>

        <div className="relative mb-8">
          <FaQuoteLeft className="absolute -top-2 -left-2 text-4xl text-gray-100 -z-10" />
          <p className="text-gray-700 text-lg leading-relaxed italic">
            "{msg}"
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
            {name.charAt(0)}
          </div>

          <div>
            <h4 className="font-bold text-gray-900 tracking-tight">{name}</h4>
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-500">
              {occupation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}