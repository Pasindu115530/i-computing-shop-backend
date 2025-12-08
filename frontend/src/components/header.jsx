import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";

export default function Header(){
    const [sideBarOpen , setsideBarOpen] = useState(false);
    return(
        <>
        <header className="w-full h-[100px] bg-accent flex relative">
            <IoMdMenu
                className="text-white my-auto text-2xl ml-6 lg:hidden"
                onClick={() => setsideBarOpen(true)}
            />
            <img src="/logo.png" className="h-full " alt="logo" />
            <div className="w-full h-full hidden lg:flex text-primary justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products">
                Products</Link>
                <Link to="/about">About
                </Link>
                <Link to="/contact">Contacts
                </Link>
            </div>
            <Link to="/cart" className="absolute right-8 top-1/2 -translate-y-1/2 text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-accent transition-all duration-200">
                <HiShoppingCart/>
            </Link>
            <div className="fixed w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-300">
            </div>
            

         </header>
        </>
    )
}