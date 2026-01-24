import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Identity = () => {
  return (
    <section className="py-24 text-[#1a1a1a] relative overflow-hidden select-none">

      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-5/12"
          >
            <div className="relative group">
              <div className="absolute inset-0 border border-gray-300 translate-x-4 translate-y-4 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />

              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/Products_Img/Jewel.png"
                  alt="MD. RASEL HAQUE"
                  className="w-full h-auto object-cover filter contrast-[1.05]"
                />
              </div>
            </div>
          </motion.div>

          <div className="w-full md:w-7/12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 border border-orange-200 rounded-full mb-6">
                <p className="text-[#f37021] font-extrabold text-[10px] uppercase tracking-[0.35em]">
                  Owner
                </p>
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-[#003d7a]">
                MD. Jowel
              </h2>

              <div className="space-y-6 text-gray-700 text-lg font-normal leading-relaxed">
                <p className="font-medium text-[#003d7a]">
                  “Printing is the bridge between a digital concept and a physical reality.
                  We ensure that bridge is built with perfection.”
                </p>

                <p className="text-gray-500 text-base">
                  At <span className="text-[#003d7a] font-semibold">Design Gallery BD</span>,
                  we focus on the fine details that make your brand stand out. From premium
                  textures to perfect color accuracy, our goal is to bring your dream works
                  to life.
                </p>
              </div>

              <motion.div
                className="mt-12 pt-8 border-t border-gray-200"
                whileHover={{ x: 5 }}
              >
                <Link
                  to="/contact"
                  className="text-sm font-extrabold uppercase tracking-widest text-[#003d7a] flex items-center gap-3"
                >
                  Let's Connect
                  <span className="h-[1px] w-8 bg-[#f37021]" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Identity;
