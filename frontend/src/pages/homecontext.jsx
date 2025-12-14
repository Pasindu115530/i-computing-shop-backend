import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Laptop, Cpu, Headphones, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  // Animation Variants for cleaner code
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 px-6 md:px-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-blue-800/50 px-4 py-1.5 rounded-full text-blue-200 text-sm font-medium border border-blue-700/50"
            >
              🚀 New Arrivals are here!
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              Power Your Potential <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Mendis Computers
              </span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-xl leading-relaxed">
              Your ultimate destination for high-performance rigs, laptops, and gear. Built for pros, gamers, and creators.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-full shadow-lg shadow-blue-900/20 flex items-center gap-3"
            >
              Shop Now <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Hero Image with Floating Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center relative"
          >
            {/* The "Floating" Effect */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80" 
                alt="Gaming Setup" 
                className="rounded-2xl shadow-2xl border-4 border-blue-400/20 w-full max-w-lg object-cover" 
              />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Official Dealer</p>
                    <p className="font-bold">100% Genuine</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 2. CATEGORIES GRID (Staggered Animation) */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-3xl font-bold text-slate-800 mb-10 text-center"
        >
          Explore Categories
        </motion.h2>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <CategoryCard icon={<Laptop size={32} />} title="Laptops" delay={0.1} />
          <CategoryCard icon={<Monitor size={32} />} title="Desktops" delay={0.2} />
          <CategoryCard icon={<Cpu size={32} />} title="Components" delay={0.3} />
          <CategoryCard icon={<Headphones size={32} />} title="Accessories" delay={0.4} />
        </motion.div>
      </div>

      {/* 3. FEATURED PRODUCTS */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-800">Best Sellers</h2>
              <p className="text-slate-500 mt-2">Top-rated tech picked just for you.</p>
            </motion.div>
            <motion.button 
              whileHover={{ x: 5 }}
              onClick={() => navigate('/products')} 
              className="text-blue-600 font-semibold hover:text-blue-800 hidden md:flex items-center gap-2"
            >
              View All Products <ArrowRight size={18} />
            </motion.button>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <ProductCard 
              image="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=60"
              title="Asus ROG Strix" 
              price="Rs. 450,000" 
              category="Gaming Laptop" 
            />
            <ProductCard 
              image="https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&w=500&q=60"
              title="Dell XPS 15" 
              price="Rs. 520,000" 
              category="Ultrabook" 
            />
            <ProductCard 
              image="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=60"
              title="Logitech MX Master" 
              price="Rs. 35,000" 
              category="Accessories" 
            />
            <ProductCard 
              image="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=60"
              title="RTX 4090 GPU" 
              price="Rs. 680,000" 
              category="Components" 
            />
          </motion.div>
        </div>
      </div>

      {/* 4. WHY CHOOSE US */}
      <div className="bg-blue-50 py-20 px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        >
          <Feature 
            icon={<ShieldCheck size={40} className="text-blue-600" />} 
            title="Genuine Warranty" 
            desc="100% Authentic products with trusted manufacturer warranty." 
          />
          <Feature 
            icon={<Truck size={40} className="text-blue-600" />} 
            title="Island-wide Delivery" 
            desc="Fast and secure shipping to your doorstep anywhere in Sri Lanka." 
          />
          <Feature 
            icon={<Clock size={40} className="text-blue-600" />} 
            title="Expert Support" 
            desc="Our technical team is available to help you build your dream rig." 
          />
        </motion.div>
      </div>
      
    </div>
  );
}

// --- SUB COMPONENTS WITH ANIMATION VARIANTS ---

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
};

function CategoryCard({ icon, title }) {
  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer group transition-colors"
    >
      <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="font-semibold text-slate-700 text-lg">{title}</span>
    </motion.div>
  );
}

function ProductCard({ title, price, category, image }) {
  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="h-56 bg-slate-100 w-full relative overflow-hidden">
         <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">{category}</p>
        <h3 className="font-bold text-slate-800 text-xl mt-1 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-slate-600 mt-2 font-medium">{price}</p>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div variants={cardVariants} className="flex flex-col items-center space-y-4">
      <motion.div 
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-5 rounded-full shadow-md"
      >
        {icon}
      </motion.div>
      <h3 className="font-bold text-xl text-slate-800">{title}</h3>
      <p className="text-slate-600 max-w-xs leading-relaxed">{desc}</p>
    </motion.div>
  );
}