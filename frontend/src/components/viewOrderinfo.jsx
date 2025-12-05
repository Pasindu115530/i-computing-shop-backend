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
                        <div className="mt-4 text-sm text-slate-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div><strong>Customer:</strong> {order.name ?? '—'}</div>
                                <div><strong>Email:</strong> {order.email ?? '—'}</div>
                                <div><strong>Phone:</strong> {order.phonenumber ?? order.phoneNumber ?? '—'}</div>
                                <div><strong>Date:</strong> {order.date ? new Date(order.date).toLocaleString() : '—'}</div>
                                <div className="md:col-span-2"><strong>Address:</strong> {order.address ?? '—'}</div>
                                <div><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : order.status === 'Shipped' ? 'bg-yellow-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>{order.status ?? 'Pending'}</span></div>
                                <div className="text-right"><strong>Total:</strong> ${order.total ?? '0.00'}</div>
                            </div>

                            <div className="mt-4">
                                <strong className="block mb-2">Items</strong>
                                <div className="w-full overflow-auto">
                                    <table className="w-full text-sm">
                                        <thead className="text-slate-600 text-left border-b">
                                            <tr>
                                                <th className="py-2">SKU</th>
                                                <th className="py-2">Name</th>
                                                <th className="py-2 text-right">Unit</th>
                                                <th className="py-2 text-right">Qty</th>
                                                <th className="py-2 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(order.items || []).map((it, idx) => {
                                                const sku = it.productID ?? it.productId ?? it.sku ?? '-';
                                                const name = it.name ?? it.productName ?? it.title ?? 'Item';
                                                const qty = Number(it.quantity ?? it.qty ?? it.qtyOrdered ?? 1) || 0;
                                                const unit = Number(it.price ?? it.unitPrice ?? it.amount ?? 0) || 0;
                                                const subtotal = (unit * qty).toFixed(2);
                                                return (
                                                    <tr key={idx} className="border-b last:border-b-0">
                                                        <td className="py-2 align-top">{sku}</td>
                                                        <td className="py-2 align-top">{name}</td>
                                                        <td className="py-2 align-top text-right">${unit.toFixed(2)}</td>
                                                        <td className="py-2 align-top text-right">{qty}</td>
                                                        <td className="py-2 align-top text-right">${subtotal}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
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