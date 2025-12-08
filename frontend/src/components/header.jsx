import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";

export default function Header(){
    const [sideBarOpen , setsideBarOpen] = useState(false);
    return(
        <>
        <header className="w-full h-[100px] bg-accent flex relative">
            <LuListCollapse
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
            {sideBarOpen && <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-300">
                <div className="w-[250px] h-screen flex-col border-white border-2 relative    ">
                    <div className="absoulte w-full h-full bg-white left-[-250px] transform-flat transalte-x-[250px] transition-transform duration-1000 ">
                    <div className="w-full h-[100px] flex items-center justify-center bg-accent"><img src="/logo.png " className="h-full " alt="logo" /> 
                    <LuListCollapse
                className="text-white my-auto text-2xl ml-6 lg:hidden rotate-180"
                onClick={() => setsideBarOpen(false)}
            /> </div> 
                <div className="flex flex-col mt-10 ml-6 gap-6 text-black text-lg">
                    <Link to="/" onClick={() => setsideBarOpen(false)}>Home</Link>
                    <Link to="/products" onClick={() => setsideBarOpen(false)}>Products</Link>
                    <Link to="/about" onClick={() => setsideBarOpen(false)}>About</Link>
                    <Link to="/contact" onClick={() => setsideBarOpen(false)}>Contacts</Link>
                </div>   
                      

                    </div>
                </div>
            </div>}
            

         </header>
        </>
    )
}