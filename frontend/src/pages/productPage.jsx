import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductPage() {

    const [Products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");

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

    return (
        <div className="w-full h-full overflow-y-scroll max-h-full">
            <div className="w-full min-h-[calc(100%-100px)] flex">

                {!loaded ? (
                    <Loader />
                ) : (
                    <div className="w-full flex flex-col items-center gap-6 p-6 pt-[100px]">

                        <div className="w-full text-center mb-6">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={query}
                                className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={async (e) => {
                                    setQuery(e.target.value);
                                    if( e.target.value.trim() === "" ){
                                        setLoaded(false);
                                        await axios.get(import.meta.env.VITE_BACKEND_URL + "/products/")
                                        .then((response) => {
                                            setProducts(response.data);
                                            setLoaded(true);
                                        })
                                        .catch((error) => {
                                            console.error("Error fetching products:", error);
                                            toast.error("Failed to load products");
                                        });             
                                    } else {
                                        await axios.get(import.meta.env.VITE_BACKEND_URL + "/products/search" + e.target.value)
                                        .then((response) => {
                                            setProducts(response.data);
                                            setLoaded(true);
                                        })
                                        .catch((error) => {
                                            console.error("Error searching products:", error);
                                            toast.error("Failed to search products");
                                        });                                 
                                    }
                                }}
                            />
                        </div>

                        <div className="w-full flex flex-wrap justify-center gap-6">
                            {Products.map((p) => (
                                <ProductCard key={p.productID} product={p} />
                            ))}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
