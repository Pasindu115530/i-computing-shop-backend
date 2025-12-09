import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
    const [sideBarOpen, setsideBarOpen] = useState(false);

    return (
        <>
            <header className="w-full h-[100px] bg-accent flex relative">
                {/* Mobile Menu Button */}
                <LuListCollapse
                    className="text-white my-auto text-2xl ml-6 lg:hidden cursor-pointer"
                    onClick={() => setsideBarOpen(true)}
                />

                {/* Logo */}
                <img src="/logo.png" className="h-full" alt="logo" />

                {/* Desktop Menu */}
                <div className="w-full h-full hidden lg:flex text-primary justify-center items-center gap-[30px]">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contacts</Link>
                </div>

                {/* User Section */}
                <div className="absolute right-35 top-0 h-full flex items-center">
                    <UserData />
                </div>

                {/* Cart Icon */}
                <Link
                    to="/cart"
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-accent transition-all duration-200"
                >
                    <HiShoppingCart />
                </Link>

                {/* Sidebar Overlay */}
                {sideBarOpen && (
                    <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-300">

                        {/* Sidebar */}
                        <div className="w-[250px] h-screen flex-col relative z-30 bg-white shadow-xl">

                            {/* Sidebar Header */}
                            <div className="w-full h-[100px] flex justify-center items-center bg-accent relative">
                           <img 
                            src="/logo.png" 
                            className="absolute left-[40px] top-0 h-[120px] w-[120px] mr-4 mt-4" 
                            alt="logo"
                            />


                                {/* Close Button */}
                                <LuListCollapse
                                    className="text-white text-2xl absolute right-4 top-1/2 -translate-y-1/2 rotate-180 cursor-pointer"
                                    onClick={() => setsideBarOpen(false)}
                                />
                            </div>

                            {/* Sidebar Menu */}
                            <div className="flex flex-col mt-10 ml-6 gap-6 text-black text-lg">
                                <Link to="/" onClick={() => setsideBarOpen(false)}>Home</Link>
                                <Link to="/products" onClick={() => setsideBarOpen(false)}>Products</Link>
                                <Link to="/about" onClick={() => setsideBarOpen(false)}>About</Link>
                                <Link to="/contact" onClick={() => setsideBarOpen(false)}>Contacts</Link>
                            </div>

                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
