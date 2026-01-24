import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const AboutHero = () => {
  const floating = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#FDFDFD] overflow-hidden select-none">

      <div className="absolute top-20 right-[-10%] w-125 h-125 bg-orange-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-10 left-[-5%] w-75 h-75 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">


          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-orange-500" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Since 2026</span>
              </div>

              <div className="select-none">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] lg:leading-[0.85] mb-6 space-y-10">
                  <span className='text-[#003d7a] mb-10'>DESIGN </span>  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#cbad06] to-[#b7aa5d] ">
                    Is Our
                  </span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffcc00] to-[#00d4ff]">
                    Identity
                  </span>
                </h1>


                <p className="text-gray-500 text-lg md:text-xl  leading-relaxed max-w-lg mb-10"> We are more than just a printing office. Design Gallery BD is a creative sanctuary where high-quality branding meets human-centric design. </p>
              </div>
              <Link to='/shop'>
                <div className="flex flex-wrap gap-6 items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer px-10 py-4 bg-[#003d7a] text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-blue-900/20"
                  >
                    Shop Now
                  </motion.button>

                  <Link to='/contact'>
                    <button className="cursor-pointer flex items-center gap-3 text-sm font-bold uppercase tracking-widest group text-[#black] hover:text-[#3f1616] transition-colors">
                      Contact Us
                      <span className="w-6 h-px bg-black group-hover:w-10 transition-all"></span>
                    </button>
                  </Link>
                </div>
              </Link>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative h-125 md:h-150">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 h-95 md:w-87.5 md:h-120 rounded-2xl overflow-hidden shadow-2xl z-20 border-10 border-white"
            >
              <img
                src="/Products_Img/Studio-Life.avif"
                alt="Studio Life"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={floating}
              animate="animate"
              className="absolute top-10 left-0 md:left-10 w-32 h-32 md:w-40 md:h-40 bg-white p-2 rounded-xl shadow-lg z-30"
            >
              <div className="w-full h-full rounded-lg overflow-hidden bg-orange-50 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-2xl mb-1">✨</span>
                <p className="text-[10px] font-bold text-[#003d7a] uppercase tracking-tighter">Premium Quality</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 right-0 md:right-10 w-32 h-44 md:w-44 md:h-56 rounded-xl overflow-hidden shadow-2xl z-10"
            >
              <img
                src="/Products_Img/Creative-Work.avif"
                alt="Creative Work"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;