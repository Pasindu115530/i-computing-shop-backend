import { useEffect, useState } from "react"
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductPage(){

    const [Products , setProducts] = useState([]);
    const [loaded , setLoaded] = useState (false);

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products/")
                .then((response) => {
                    setProducts(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    toast.error("Failed to load products");
                });
        }
    }, [loaded]);

    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
            
            <div className="w-full min-h-[calc(100%-100px)]  flex">
                {
                    !loaded ? <Loader /> :
                    <div className="w-full flex flex-wrap justify-center gap-6 p-6">
                        {
                            Products.map((p) => (
                                <ProductCard key={p.productID} product={p} />
                            ))
                        }
                    </div>
                    

                }
            </div>
        </div>
    )   
}