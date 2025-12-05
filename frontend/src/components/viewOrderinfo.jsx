import toast from "react-hot-toast";

export default function ViewOrderInfo(props) {
    const { order } = props;
    return (
        <button
            onClick={() => {
                if (!order || !order.orderID) {
                    toast.error("Order id not available");
                    return;
                }
                toast.success(`Order ${order.orderID}`);
            }}
            className="bg-accent/70 hover:bg-accent p-2 rounded-2xl text-white"
        >
            View Order Info
        </button>
    );
}