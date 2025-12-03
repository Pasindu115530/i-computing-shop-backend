import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function ProductOverview() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

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
                <h1 className="text-center text-red-600 mt-10">
                    Error Loading Product
                </h1>
            )}

            {status === "success" && product && (
                <div className="w-full h-[calc(100vh-100px)] flex ">
                    <div className="w-1/2 h-full flex justify-center items-center">
                        <img
                            src={
                                product.images && product.images.length
                                    ? product.images[0]
                                    : "/logo.png"
                            }
                            className="max-h-[80%] object-contain"
                        />
                    </div>

                    <div className="w-1/2 h-full p-10 flex flex-col gap-6">
                        <h1 className="text-4xl font-semibold">{product.name}</h1>
                    </div>
                </div>
            )}
        </>
    );
}
