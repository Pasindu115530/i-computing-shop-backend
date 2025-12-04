import { useState } from "react";
import { addCart, getCart, getCartTotal } from "../lib/cart";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function Checkout() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);

    if (location.state == null) {
        return <Navigate to="/products" />;
    }

    const safe = (num) => Number(num) || 0; // helper
    const formatCurrency = (v) => `LKR.${safe(v).toFixed(2)}`;

    return (
        <div className="w-full flex flex-col items-center p-6 bg-gray-50 min-h-[70vh]">
            <header className="w-[90%] max-w-5xl mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                <p className="text-sm text-gray-500">Confirm your order and place it</p>
            </header>

            <div className="w-[90%] max-w-5xl grid grid-cols-12 gap-6">
                <div className="col-span-8 flex flex-col gap-4">
                    {cart.map((item) => {
                        const price = safe(item?.price);
                        const labelled = safe(item?.labelledPrice);
                        const qty = safe(item?.quantity);

                        return (
                            <div
                                key={item.productID}
                                className="w-full rounded-xl overflow-hidden shadow-sm bg-white flex gap-4 p-4 items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-36 h-28 object-cover rounded-md"
                                />

                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {item.name.length > 50 ? item.name.substring(0, 50) + "..." : item.name}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-3">
                                        {labelled > price && (
                                            <span className="text-sm text-gray-400 line-through">{formatCurrency(labelled)}</span>
                                        )}
                                        <span className="text-lg text-accent font-semibold">{formatCurrency(price)}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">SKU: {item.productID}</div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex flex-col items-center bg-gray-100 rounded-md p-2">
                                        <button
                                            onClick={() => {
                                                addCart(item, 1);
                                                setCart(getCart());
                                            }}
                                            className="p-1 rounded hover:bg-gray-200"
                                            aria-label="Increase quantity"
                                        >
                                            <FaChevronUp className="w-5 h-5 text-accent" />
                                        </button>
                                        <span className="text-lg font-medium">{qty}</span>
                                        <button
                                            onClick={() => {
                                                addCart(item, -1);
                                                setCart(getCart());
                                            }}
                                            className="p-1 rounded hover:bg-gray-200"
                                            aria-label="Decrease quantity"
                                        >
                                            <FaChevronDown className="w-5 h-5 text-accent" />
                                        </button>
                                    </div>

                                    <div className="text-sm font-semibold">{formatCurrency(price * qty)}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <aside className="col-span-4 bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">{formatCurrency(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium">Free</span>
                    </div>
                    <div className="border-t mt-2 pt-3 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-xl font-bold text-accent">{formatCurrency(getCartTotal())}</span>
                    </div>

                    <button className="mt-2 w-full px-4 py-3 bg-accent text-white rounded-md hover:bg-accent/90">Order Now</button>

                    <Link to="/cart" className="mt-1 block text-center px-4 py-2 border rounded-md text-gray-700">Back to Cart</Link>
                </aside>
            </div>
        </div>
    );
}
