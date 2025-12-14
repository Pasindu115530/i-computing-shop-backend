import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Laptop, Cpu, Headphones, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeContent() {
  const navigate = useNavigate();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-50 overflow-x-hidden pt-[20px]">
      
      {/* 1. HERO SECTION */}
      <div className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 px-6 md:px-12 relative overflow-hidden mb-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-block bg-blue-800/50 px-4 py-1.5 rounded-full text-blue-200 text-sm font-medium border border-blue-700/50">
              🚀 Upgrade Your Setup Today
            </div>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              Mendis <span className="text-blue-300">Computers</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-xl leading-relaxed">
              Experience the future of computing. Premium laptops, custom rigs, and accessories tailored for performance.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-full shadow-lg flex items-center gap-3 transition-colors"
            >
              Browse Products <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center relative"
          >
            <motion.img 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=1000&auto=format&fit=crop" 
              alt="Hero Tech" 
              className="rounded-2xl shadow-2xl border-4 border-blue-400/20 w-full max-w-lg object-cover" 
            />
          </motion.div>
        </div>
      </div>

      {/* 2. CATEGORIES */}
      <div className="max-w-7xl mx-auto py-10 px-6 w-full">
        <motion.h2 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-slate-800 mb-10 text-center"
        >
          Browse by Category
        </motion.h2>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <CategoryCard icon={<Laptop size={32} />} title="Laptops" />
          <CategoryCard icon={<Monitor size={32} />} title="Desktops" />
          <CategoryCard icon={<Cpu size={32} />} title="Parts" />
          <CategoryCard icon={<Headphones size={32} />} title="Audio" />
        </motion.div>
      </div>

      {/* 3. BEST SELLERS (Styled like your ProductCard) */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Trending Now</h2>
              <p className="text-slate-500 mt-2">Our most popular picks this week.</p>
            </div>
            <button onClick={() => navigate('/products')} className="text-blue-600 font-semibold hover:text-blue-800 hidden md:block">
              View All &rarr;
            </button>
          </div>

          {/* MOCK PRODUCTS - REPLICATING YOUR CARD STYLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <HomeProductCard 
              id="1"
              title="MacBook Pro M2" 
              category="Laptops"
              price={2500.00}
              image="https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=500&q=60"
            />
            <HomeProductCard 
              id="2"
              title="RTX 4090 Gaming PC" 
              category="Desktops"
              price={4500.00}
              image="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=60"
            />
            <HomeProductCard 
              id="3"
              title="Sony WH-1000XM5" 
              category="Audio"
              price={350.00}
              image="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=60"
            />
             <HomeProductCard 
              id="4"
              title="Keychron K2" 
              category="Accessories"
              price={120.00}
              image="https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </div>

      {/* 4. FEATURES */}
      <div className="bg-blue-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <Feature icon={<ShieldCheck size={40} className="text-blue-600" />} title="Warranty" desc="Trusted protection." />
          <Feature icon={<Truck size={40} className="text-blue-600" />} title="Fast Delivery" desc="Island-wide shipping." />
          <Feature icon={<Clock size={40} className="text-blue-600" />} title="24/7 Support" desc="We are here to help." />
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function CategoryCard({ icon, title }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer group hover:shadow-md transition-all"
    >
      <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="font-semibold text-slate-700">{title}</span>
    </motion.div>
  );
}

// Mimics your ProductCard.jsx style exactly
function HomeProductCard({ id, title, category, price, image }) {
  const navigate = useNavigate();
  return (
    <motion.div 
        onClick={() => navigate(`/overview/${id}`)}
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden cursor-pointer transform transition-transform duration-200"
    >
      <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center relative">
         <img src={image} alt={title} className="max-h-full object-contain" />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
           <h3 className="text-gray-900 font-semibold text-lg truncate">{title}</h3>
           <span className="text-sm text-gray-500">{category}</span>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-xl font-bold text-green-600">${price.toFixed(2)}</span>
        </div>
        {/* Only "View Product" button, no Add to Cart */}
        <div className="pt-2">
            <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 rounded-md text-sm font-medium shadow-md transition-colors duration-200">
                View Details
            </button>
        </div>
      </div>
    </motion.div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-5 rounded-full shadow-md">{icon}</div>
      <h3 className="font-bold text-xl text-slate-800">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}