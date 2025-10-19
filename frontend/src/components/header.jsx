import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent flex">
            <img src="/logo.png" className="h-full" alt="logo" />
            <div className="w-full h-full flex text-primary justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products">
                Products</Link>
                <Link to="/about">About
                </Link>
                <Link to="/contact">Contacts
                </Link>
            </div>
            

        </header>
    )
}