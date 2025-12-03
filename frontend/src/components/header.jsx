import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent flex relative">
            <img src="/logo.png" className="h-full " alt="logo" />
            <div className="w-full h-full flex text-primary justify-center items-center gap-[30px]">
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
            

        </header>
    )
}