import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      label: "Mission",
      title: "Precision Print Lab",
      desc: "Transforming digital concepts into premium tangible experiences with 2026-grade accuracy."
    },
    {
      label: "Vision",
      title: "Design Leadership",
      desc: "Setting the global standard for high-fidelity branding and sustainable artisan techniques."
    },
    {
      label: "Values",
      title: "Quality Mastery",
      desc: "Every project undergoes a rigorous audit to ensure the output exceeds your brand's vision."
    }
  ];

  return (
    <section className="py-16 bg-[#001f3f] text-white overflow-hidden select-none">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <span className="text-[#FFD700] font-black text-xs uppercase tracking-[0.4em] mb-3 block">
                Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Crafting Your <br /> 
                <span className="text-[#FFD700]">Dream Works.</span>
              </h2>
            </motion.div>
            <div className="relative rounded-xl overflow-hidden h-64 border border-white/10 shadow-xl">
              <img 
                src="/Products_Img/Workspace.jpg" 
                alt="Workspace"
                className="w-full h-full object-cover grayscale-50 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#001f3f]/30" />
            </div>
          </div>

          <div className="w-full lg:w-7/12 ">
            <div className="space-y-3">
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  className={` rounded-xl border border-white/5 transition-all duration-300 ${
                    activeIndex === index ? 'bg-white/5' : 'bg-transparent'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-sm font-black transition-colors ${
                        activeIndex === index ? 'text-[#FFD700]' : 'text-gray-500'
                      }`}>
                        0{index + 1}
                      </span>
                      <h4 className={`text-lg font-bold tracking-tight ${
                        activeIndex === index ? 'text-white' : 'text-gray-400'
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                        activeIndex === index ? 'border-[#FFD700] bg-[#FFD700] text-[#001f3f]' : 'border-white/20 text-white/20'
                      }`}
                    >
                      <span className="text-xs">↓</span>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-20 pb-6 text-gray-400 text-sm font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Accordion;