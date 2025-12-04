import { useState } from "react";
import { addCart, getCart, getCartTotal } from "../lib/cart";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect if cart is empty
    if (!location.state || cart.length === 0) {
        return <Navigate to="/products" />;
    }

    const safe = (num) => Number(num) || 0;
    const formatCurrency = (v) => `LKR.${safe(v).toFixed(2)}`;

    async function submitOrder() {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You must be logged in!");
            navigate("/login");
            return;
        }

        if (!address || !phoneNumber) {
            toast.error("Please provide your address and phone number");
            return;
        }

        const orderItems = cart.map(item => ({
            productID: item.productID,
            quantity: item.quantity
        }));

        try {
            setLoading(true);

            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/orders",
                {
                    name: name || undefined, // backend will fill from user if undefined
                    address,
                    phonenumber: phoneNumber,
                    items: orderItems
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            toast.success("Order placed successfully!");
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/orders");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to place order. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex flex-col items-center p-6 bg-gray-50 min-h-[70vh]">
            <header className="w-[90%] max-w-5xl mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                <p className="text-sm text-gray-500">Confirm your order and place it</p>
            </header>

            <div className="w-[90%] max-w-5xl grid grid-cols-12 gap-6">
                {/* Cart Items */}
                <div className="col-span-8 flex flex-col gap-4">
                    {cart.map((item) => {
                        const price = safe(item?.price);
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
                                        <span className="text-lg text-accent font-semibold">{formatCurrency(price)}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">SKU: {item.productID}</div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex flex-col items-center bg-gray-100 rounded-md p-2">
                                        <button
                                            onClick={() => { addCart(item, 1); setCart(getCart()); }}
                                            className="p-1 rounded hover:bg-gray-200"
                                        >
                                            <FaChevronUp className="w-5 h-5 text-accent" />
                                        </button>
                                        <span className="text-lg font-medium">{qty}</span>
                                        <button
                                            onClick={() => { addCart(item, -1); setCart(getCart()); }}
                                            className="p-1 rounded hover:bg-gray-200"
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

                {/* Order Summary & Form */}
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

                    <input
                        type="text"
                        placeholder="Name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full mt-2 px-3 py-2 border rounded-md"
                    />

                    <button
                        onClick={submitOrder}
                        disabled={loading}
                        className="mt-2 w-full px-4 py-3 bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-60"
                    >
                        {loading ? "Placing Order..." : "Order Now"}
                    </button>

                    <Link to="/cart" className="mt-1 block text-center px-4 py-2 border rounded-md text-gray-700">
                        Back to Cart
                    </Link>
                </aside>
            </div>
        </div>
    );
}
