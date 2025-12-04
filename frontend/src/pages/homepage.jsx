import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./overview";
import Cart from "./cart";
import Checkout from "./checkOut";

export default function homepage(){
    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)] ">
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/about" element={<h1>About Page</h1>}/>
                    <Route path="/contact" element={<h1>Contact Page</h1>}/>
                    <Route path="/overview/:productID" element = {<ProductOverview />}/>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/*" element={<h1>Page Not Found</h1>}/>
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>

        </div>
    )
}