import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function ViewOrderInfo(props) {
    const { order } = props || {};
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // tell react-modal which element is the app root for accessibility
        try {
            Modal.setAppElement('#root');
        } catch (e) {
            // ignore in non-browser environments
        }
    }, []);

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel={order ? `Order ${order.orderID}` : 'Order details'}
                overlayClassName="fixed inset-0 bg-black/40 flex items-start md:items-center justify-center p-4 z-50"
                className="bg-white rounded-lg max-w-2xl w-full shadow-lg outline-none"
            >
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-xl font-semibold mb-2 text-slate-800">Order Details {order ? `- #${order.orderID}` : ''}</h2>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-700">Close</button>
                    </div>

                    {order ? (
                        <div className="mt-4 space-y-3 text-sm text-slate-700">
                            <div><strong>Customer:</strong> {order.name} &lt;{order.email}&gt;</div>
                            <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
                            <div><strong>Amount:</strong> ${order.total}</div>
                            <div>
                                <strong>Items:</strong>
                                <ul className="list-disc list-inside ml-2">
                                    {(order.items || []).map((it, idx) => (
                                        <li key={idx}>{it.name ?? it.productName ?? 'Item'} x {it.qty ?? it.quantity ?? 1}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-slate-600 mt-4">Order information not available.</div>
                    )}
                </div>
            </Modal>

            <button
                onClick={() => {
                    if (!order || !order.orderID) {
                        toast.error("Order id not available");
                        return;
                    }
                    setIsModalOpen(true);
                }}
                className="bg-accent/70 hover:bg-accent p-2 rounded-2xl text-white"
            >
                View Order Info
            </button>
        </>
    );
}