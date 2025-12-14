import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pt-[100px] pb-20">
      
      {/* Header */}
      <div className="bg-white py-16 text-center shadow-sm">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="max-w-3xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Mendis Computers</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are more than just a computer shop. We are tech enthusiasts dedicated to bringing you the best hardware in Sri Lanka.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
            alt="Office Team" 
            className="rounded-2xl shadow-2xl" 
          />
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-blue-900">Our Story</h2>
          <p className="text-slate-600 leading-relaxed">
            Founded with a passion for technology, Mendis Computers started as a small repair hub and grew into a premier destination for high-end computing. We believe in quality, transparency, and after-sales support that you can rely on.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Whether you are a professional video editor, a hardcore gamer, or a student, we carefully curate our inventory to ensure you get the best performance for your budget.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
               <h3 className="text-3xl font-bold text-blue-600">5k+</h3>
               <p className="text-sm text-slate-500">Happy Customers</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
               <h3 className="text-3xl font-bold text-blue-600">100%</h3>
               <p className="text-sm text-slate-500">Genuine Parts</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard icon={<Target size={32} />} title="Precision" desc="We build PCs with extreme attention to detail." />
          <ValueCard icon={<Users size={32} />} title="Community" desc="We support the local gaming and tech community." />
          <ValueCard icon={<Award size={32} />} title="Excellence" desc="Only the best brands make it to our shelves." />
        </div>
      </div>

    </div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600 text-center"
    >
      <div className="inline-block p-3 bg-blue-50 rounded-full text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </motion.div>
  );
}