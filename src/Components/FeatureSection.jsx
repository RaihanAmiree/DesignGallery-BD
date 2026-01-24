import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const FeatureSection = () => {
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="relative flex justify-center items-center h-[400px]">
            <div className="absolute w-72 h-72 bg-orange-100 rounded-full blur-[100px] opacity-60" />

            <div className="relative flex -space-x-12 sm:-space-x-16">
              <motion.div
                animate={floatingAnimation}
                className="w-40 h-56 sm:w-48 sm:h-64 bg-gradient-to-b from-[#2D3A8C] to-[#1a2255] rounded-t-lg shadow-2xl relative z-10 origin-bottom -rotate-12"
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-white/20 rounded-t-full" />
              </motion.div>

              <motion.div
                animate={{ ...floatingAnimation, y: [0, -25, 0] }}
                transition={{ ...floatingAnimation.transition, delay: 0.5 }}
                className="w-40 h-56 sm:w-48 sm:h-64 bg-gradient-to-b from-[#E5E7EB] to-[#D1D5DB] rounded-t-lg shadow-2xl relative z-30 flex items-center justify-center"
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-black/10 rounded-t-full" />
                <span className="text-[10px] font-extrabold text-black/80 uppercase tracking-widest">
                  Design Gallery BD
                </span>
              </motion.div>

              <motion.div
                animate={{ ...floatingAnimation, y: [0, -10, 0] }}
                transition={{ ...floatingAnimation.transition, delay: 1 }}
                className="w-40 h-56 sm:w-48 sm:h-64 bg-gradient-to-b from-[#F37021] to-[#d45d17] rounded-t-lg shadow-2xl relative z-20 origin-bottom rotate-12"
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-white/20 rounded-t-full" />
              </motion.div>
            </div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-extrabold text-[#F37021] uppercase tracking-[0.35em] mb-4">
                Our Signature Service
              </h2>

              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003d7a] leading-tight mb-6">
                Paper with a <br />
                <span className="font-semibold text-gray-400">
                  Personalized Touch.
                </span>
              </h3>

              <p className="text-gray-500 text-lg font-normal leading-relaxed max-w-md">
                We transform everyday packaging into brand statements. Quality
                printing that feels as good as it looks.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { label: "Vibrant Color", color: "bg-blue-500" },
                { label: "Fine Texture", color: "bg-orange-500" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-gray-700">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer px-10 py-4 bg-[#003d7a] text-white rounded-full text-xs font-extrabold uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20"
              >
                Learn More
              </motion.button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
