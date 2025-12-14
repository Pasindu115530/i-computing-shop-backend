import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-slate-50 pt-[120px] pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800">Get in Touch</h1>
          <p className="text-slate-500 mt-2">Have a question? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <p className="text-blue-200 mb-8">
                Fill up the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="text-blue-400" />
                  <span>+94 123 456 789</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-400" />
                  <span>hello@mendiscomputers.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-blue-400" />
                  <span>123 Tech Street, Colombo, SL</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <div className="w-full h-40 bg-blue-800/50 rounded-xl flex items-center justify-center text-blue-300 text-sm">
                 [ Map Placeholder ]
               </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600">First Name</label>
                    <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50" placeholder="John" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600">Last Name</label>
                    <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50" placeholder="Doe" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600">Email</label>
                <input type="email" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50" placeholder="john@example.com" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600">Message</label>
                <textarea rows="4" className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50" placeholder="Write your message here..." />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}