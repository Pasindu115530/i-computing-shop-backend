import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import UserData from "./userData"; // Your existing User component
import { getCartItemCount } from "../lib/cart";

export default function Header() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const location = useLocation();

    // Detect scroll to change header style
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Keep cart badge in sync with localStorage changes
    useEffect(() => {
        const syncCartCount = () => setCartCount(getCartItemCount());
        syncCartCount();

        window.addEventListener("storage", syncCartCount);
        window.addEventListener("cartUpdated", syncCartCount);
        window.addEventListener("focus", syncCartCount);

        return () => {
            window.removeEventListener("storage", syncCartCount);
            window.removeEventListener("cartUpdated", syncCartCount);
            window.removeEventListener("focus", syncCartCount);
        };
    }, []);

    // Active Link Style Helper
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled 
                    ? "bg-white/90 backdrop-blur-md shadow-md py-3" 
                    : "bg-white py-5 shadow-sm"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    
                    {/* 1. LOGO SECTION */}
                    <Link to="/" className="flex items-center gap-2 z-50">
                        {/* Assuming you have a logo image, or use text fallback */}
                        {/* <img src="/logo.png" alt="Mendis Computers" className="h-10 w-auto" /> */}
                        <div className="flex flex-col leading-tight">
                            <span className="text-2xl font-bold text-blue-900 tracking-tight">Mendis<span className="text-blue-500">Computers</span></span>
                        </div>
                    </Link>

                    {/* 2. DESKTOP NAVIGATION */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {["/", "/products", "/about", "/contact"].map((path, index) => {
                            const labels = ["Home", "Products", "About", "Contact"];
                            return (
                                <Link 
                                    key={path} 
                                    to={path} 
                                    className="relative group py-2"
                                >
                                    <span className={`text-sm font-semibold transition-colors duration-300 ${
                                        isActive(path) ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                                    }`}>
                                        {labels[index]}
                                    </span>
                                    {/* Animated Underline */}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                                        isActive(path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                    }`}/>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* 3. ICONS & USER SECTION */}
                    <div className="flex items-center gap-5">
                        {/* Search Icon (Optional visual) */}
                        <button className="hidden sm:block text-slate-500 hover:text-blue-600 transition">
                            <Search size={20} />
                        </button>

                        {/* User Data Component */}
                        <div className="hidden md:block">
                            <UserData />
                        </div>

                        {/* Cart Icon */}
                        <Link to="/cart" className="relative group">
                            <div className="p-2 bg-slate-100 rounded-full text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <ShoppingCart size={20} />
                            </div>
                            {/* Badge */}
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button 
                            className="lg:hidden text-slate-800 focus:outline-none"
                            onClick={() => setSideBarOpen(true)}
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Spacer to prevent content from hiding behind sticky header */}
            <div className={`${scrolled ? "h-[80px]" : "h-[100px]"}`} />

            {/* 4. MOBILE SIDEBAR (AnimatePresence) */}
            <AnimatePresence>
                {sideBarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSideBarOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm lg:hidden"
                        />
                        
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[70] lg:hidden flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 flex items-center justify-between border-b border-slate-100">
                                <span className="font-bold text-lg text-blue-900">Menu</span>
                                <button 
                                    onClick={() => setSideBarOpen(false)}
                                    className="p-2 bg-slate-100 rounded-full hover:bg-red-100 hover:text-red-600 transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer Links */}
                            <div className="flex flex-col p-6 gap-4">
                                {["Home", "Products", "About", "Contact"].map((item, idx) => (
                                    <Link 
                                        key={idx}
                                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        onClick={() => setSideBarOpen(false)}
                                        className="text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition flex items-center justify-between group"
                                    >
                                        {item}
                                        <span className="opacity-0 group-hover:opacity-100 text-blue-400 text-sm">→</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Drawer Footer (User Section for Mobile) */}
                            <div className="mt-auto p-6 bg-slate-50 border-t border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                   <UserData /> {/* Reusing your component here if it fits, or abstracting logic */}
                                </div>
                                <p className="text-xs text-center text-slate-400">
                                    © 2024 Mendis Computers
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}