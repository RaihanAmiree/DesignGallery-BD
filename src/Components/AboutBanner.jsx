import React from 'react';
import { motion } from 'framer-motion';

const AboutBanner = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden select-none">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fa] -z-10 hidden lg:block" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-20"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-12 border-white">
                <img
                  src="/Products_Img/Graphic.jpg"
                  alt="Our Creative Studio"
                  className="w-full h-125 object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#003d7a]">Our Legacy</span>
                <div className="h-px w-12 bg-orange-400" />
              </div>

              <h2 className="text-5xl md:text-6xl  font-bold text-[#1a1a1a] leading-[1.1] mb-6">
                Redefining the art of <br />
                <span className="italic font-semibold text-gray-600 underline decoration-orange-200 decoration-2 underline-offset-8">Online Shopping.</span>
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                <strong>Design Gallery BD</strong> started with a simple vision: to make high-end printing and custom branding accessible to everyone. We believe that every product tells a story, and we're here to help you write yours.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {['Premium Quality', 'Eco-Friendly', 'Low-Cost'].map((tag, i) => (
                  <span key={i} className="px-5 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-extrabold uppercase tracking-wider border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#003d7a", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer px-10 py-5 border-2 border-[#003d7a] text-[#003d7a] rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-10"
              >
                Discover Our Story
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
