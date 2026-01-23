import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const colors = [
  "bg-[#38BDF8]",
  "bg-[#FBBF24]",
  "bg-[#EF4444]",
  "bg-[#1E1B4B]",
  "bg-[#0F172A]",
  "bg-[#16A34A]",
  "bg-[#9333EA]"
];

const Branding = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        const uniqueCategories = [...new Set(data.map(p => p.category))];

        const mapped = uniqueCategories.map((cat, idx) => ({
          title: cat,
          category: cat,
          color: colors[idx % colors.length],
          desc: `Explore our ${cat} collection`
        }));

        setCategories(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 bg-white overflow-hidden select-none">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#f37021] font-bold text-xs uppercase tracking-[0.4em] mb-4"
          >
            What We Offer
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-4xl md:text-6xl font-black text-[#003d7a] leading-tight"
          >
            Explore Our <br />
            <span className="text-[#f37021]">Product Categories</span>
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* LEFT: Dynamic Categories */}
          <div className="w-full lg:w-5/12 space-y-2 cursor-pointer">
            {categories.map((service, idx) => (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.08 }}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  navigate(`/shop?category=${encodeURIComponent(service.category)}`)
                }
                className={`${service.color} p-6 flex items-center gap-6 cursor-pointer shadow-lg group relative overflow-hidden`}
              >
                {/* Index */}
                <div className="w-10 h-10 border border-white/30 flex items-center justify-center text-white shrink-0">
                  <span className="text-xs font-mono">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Text */}
                <div className="text-white">
                  <h4 className="font-bold uppercase tracking-wider text-sm">
                    {service.title}
                  </h4>
                  <p className="text-[10px] opacity-70 hidden group-hover:block">
                    {service.desc}
                  </p>
                  <p className="text-[9px] opacity-50 uppercase mt-1">
                    View Products →
                  </p>
                </div>

                {/* Shine */}
                <motion.div
                  className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Static Branding Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full lg:w-7/12 bg-gray-50 rounded-xl overflow-hidden relative"
          >
            <div className="p-8 h-full">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#003d7a]">
                    Design & Branding
                  </h3>
                </div>

                <div className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center text-[#f37021] font-bold">
                  ★
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src="https://static.wixstatic.com/media/8a8033_680d667dfc25470fa33fc84c45fba6d7~mv2.jpg"
                  alt="Branding Portfolio"
                  className="w-full h-auto object-cover"
                />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-4 right-4 bg-white p-4 shadow-xl border-l-4 border-[#f37021]"
                >
                  <p className="text-[9px] font-black uppercase text-gray-400">
                    Dynamic System
                  </p>
                  <p className="text-xs font-bold text-[#003d7a]">
                    Auto Synced
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Branding;
