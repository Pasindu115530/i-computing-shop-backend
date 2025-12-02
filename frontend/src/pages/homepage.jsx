import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";

export default function homepage(){
    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)] bg-red-900">
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/about" element={<h1>About Page</h1>}/>
                    <Route path="/contact" element={<h1>Contact Page</h1>}/>
                    <Route path="/*" element={<h1>Page Not Found</h1>}/>
                </Routes>
            </div>

        </div>
    )
}