import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 40 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 15);
    mouseY.set((clientY - innerHeight / 2) / 15);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a1128] text-white py-20 lg:py-0"
    >
      {/* Background Decorative Text - Responsive Sizing */}
      <motion.div
        style={{ y: bgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 4 }}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
      >
        <h2 className="text-[20vw] lg:text-[25vw] font-black leading-none uppercase">
          <img src="/Products_Img/Logo2.png" alt="" />
        </h2>
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-20">

        {/* Left Side: Content - Centered on mobile, left-aligned on desktop */}
        <motion.div style={{ y: textY }} className="z-30 order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-[1px] bg-[#00d4ff] hidden sm:block"
              />
              <span className="text-[#00d4ff] font-mono text-xs sm:text-sm tracking-[0.3em] uppercase font-bold select-none">
                Premium Printing
              </span>
            </div>
            <div className="select-none">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] lg:leading-[0.85] mb-6">
                DESIGN <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffcc00] to-[#00d4ff]">
                  GALLERY BD
                </span>
              </h1>
            </div>


            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 2.5, delay: 0.8 }}
              className="max-w-md mx-auto lg:mx-0 text-gray-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-10 select-none"
            >
              Design Gallery BD is a creative graphic design and printing studio delivering high-quality designs and professional print solutions to bring your brand to life.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link to='/shop' className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer w-full sm:w-auto bg-[#ffd700] text-[#0a1128] px-10 py-4 font-bold rounded-full text-sm uppercase tracking-tighter transition-colors"
                >
                  Shop Now
                </motion.button>
              </Link>

              <Link to='/contact'>
                <button className="cursor-pointer flex items-center gap-3 text-sm font-bold uppercase tracking-widest group text-[#00d4ff] hover:text-white transition-colors">
                  Contact Us
                  <span className="w-6 h-[1px] bg-[#00d4ff] group-hover:w-10 transition-all"></span>
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Card - Stacked on top for mobile */}
        <div className="relative flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[500px] order-1 lg:order-2">
          <motion.div
            style={{
              x: springX,
              y: springY,
              rotateX: springY,
              rotateY: springX
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="w-60 h-[380px] sm:w-72 sm:h-[420px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl flex flex-col p-6 sm:p-8 relative overflow-hidden"
          >
            <motion.div
              animate={{ x: [-400, 400] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-0 h-full w-20 bg-white/5 skew-x-12"
            />

            <div className="mt-auto">
              <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-full mb-4 blur-md animate-pulse" />
              <h3 className="text-3xl sm:text-4xl font-serif italic mb-2 text-[#ffd700]">Design Gallery BD</h3>


              <p className="text-[10px] sm:text-xs text-gray-300 font-mono tracking-[0.2em] uppercase">Md Jowel</p>
            </div>
          </motion.div>

          <motion.div
            style={{
              x: useTransform(springX, x => x * -1.5),
              y: useTransform(springY, y => y * -1.5)
            }}
            className="absolute -bottom-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 bg-[#00d4ff]/10 rounded-full blur-[80px] sm:blur-[100px] z-10 hidden sm:block"
          />
        </div>
      </div>

      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6">
        <motion.div
          animate={{ height: [0, 100, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="w-[1px] bg-gradient-to-b from-transparent via-[#ffd700] to-transparent"
        />

        <p className="text-[10px] font-mono text-[#ffd700]/40 uppercase [writing-mode:vertical-lr] tracking-[1em]">
          Design Gallery BD
        </p>
      </div>
    </section>
  );
};

export default HeroSection;