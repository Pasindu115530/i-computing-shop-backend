import axios from "axios";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addCart, getCart } from "../lib/cart";

export default function ProductOverview() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
            .then((response) => {
                setProduct(response.data);
                setStatus("success");
            })
            .catch(() => {
                toast.error("Product Not Found");
                setStatus("error");
            });
    }, [params.productID]);

    return (
        <>
            {status === "loading" && <Loader />}

            {status === "error" && (
                <h1 className="text-center text-red-600 mt-10 text-2xl font-semibold">
                    Error Loading Product
                </h1>
            )}

            {status === "success" && product && (
                <div className="w-full min-h-[calc(100vh-100px)] flex bg-gray-50 p-6">
                    <div className="w-1/2 h-full flex justify-center items-center bg-white rounded-xl shadow p-6">
                        <ImageSlider images={product.images || []} />
                    </div>

                    <div className="w-1/2 h-full p-10 flex flex-col gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Product ID: {product.productID}
                            </p>
                            <p className="text-lg font-medium text-indigo-600 mt-2">
                                {product.category}
                            </p>
                        </div>

                        <p className="text-gray-700 leading-relaxed flex-1 bg-white p-4 rounded-lg shadow-sm">
                            {product.description}
                        </p>

                        {/* Price Section */}
                        <div className="w-full mt-2">
                            {product.labelledPrice && product.labelledPrice > product.price && (
                                <span className="text-xl text-gray-400 line-through mr-4">
                                    ${product.labelledPrice.toFixed(2)}
                                </span>
                            )}
                            <span className="text-4xl font-bold text-green-600">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="w-full flex gap-4 mt-6">
                            <button onClick={()=>{
                                addCart(product,1);
                                navigate('/cart');
                            }} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-200">
                                Add to Cart
                            </button>

                            <button onClick={()=>{
                                navigate('/checkout', {state: [{
                                    productID: product.productID,
                                    name: product.name,
                                    price: product.price,
                                    labelledPrice: product.labelledPrice,
                                    quantity: product.quantity || 1,
                                    image: product.images[0]
                                }]});
                                console.log(getCart())
                            }} className="flex-1 bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 py-3 rounded-lg text-lg font-semibold shadow-sm transition-all duration-200">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
