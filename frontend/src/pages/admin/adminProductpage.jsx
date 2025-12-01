import { Link } from "react-router-dom";
import {BiPlus} from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
export default function adminProductPage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/products/")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="w-full p-8">
            <div className="bg-white shadow-lg rounded-lg overflow-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-accent text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Image</th>
                            <th className="px-4 py-3 text-left">ProductID</th>
                            <th className="px-4 py-3 text-left">ProductName</th>
                            <th className="px-4 py-3 text-right">Price</th>
                            <th className="px-4 py-3 text-right">Labelled Price</th>
                            <th className="px-4 py-3 text-left">Category</th>
                            <th className="px-4 py-3 text-left">Brand</th>
                            <th className="px-4 py-3 text-left">Model</th>
                            <th className="px-4 py-3 text-right">Stock</th>
                            <th className="px-4 py-3 text-left">Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr
                                key={p.productID}
                                className="odd:bg-slate-50 even:bg-white hover:bg-slate-100"
                            >
                                <td className="px-4 py-3">
                                    <img
                                        src={p.images?.[0] ?? "/logo.png"}
                                        alt={p.name}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-3">{p.productID}</td>
                                <td className="px-4 py-3">{p.name}</td>
                                <td className="px-4 py-3 text-right">
                                    ₹{p.price.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <span className="line-through text-slate-400 mr-2">
                                        ₹{p.labelledPrice.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{p.category}</td>
                                <td className="px-4 py-3">{p.brand}</td>
                                <td className="px-4 py-3">{p.modelNumber}</td>
                                <td className="px-4 py-3 text-right">{p.stock}</td>
                                <td className="px-4 py-3">
                                    {p.isAvailable ? (
                                        <span className="inline-block px-2 py-1 text-sm bg-emerald-100 text-emerald-800 rounded-full">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="inline-block px-2 py-1 text-sm bg-rose-100 text-rose-800 rounded-full">
                                            Out of stock
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link
                to="/admin/add-items"
                className="w-[50px] h-[50px] flex items-center justify-center text-3xl rounded-full fixed right-5 bottom-5 hover:text-white hover:bg-accent border-2 border-accent"
                aria-label="Add item"
            >
                <BiPlus />
            </Link>
        </div>
    );
}
