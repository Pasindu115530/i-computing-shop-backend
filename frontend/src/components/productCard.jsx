export default function ProductCard(props){
    const product = props.product;

    return(
        <div className="max-w-[300px] w-full bg-white rounded-xl shadow-lg overflow-hidden m-3 transform hover:scale-105 transition-transform duration-200">
            <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center">
                <img
                    src={product.images && product.images.length ? product.images[0] : ''}
                    alt={product.name || 'product image'}
                    className="max-h-full object-contain"
                />
            </div>

            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-900 font-semibold text-lg truncate">{product.name}</h3>
                    <span className="text-sm text-gray-500">{product.category}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-2">
                        {product.labelledPrice && product.labelledPrice > product.price ? (
                            <span className="text-sm text-gray-400 line-through">${product.labelledPrice.toFixed(2)}</span>
                        ) : null}
                        <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        onClick={() => { window.location.href = `/product/${product.productID}` }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm"
                    >
                        View Product
                    </button>
                </div>
            </div>
        </div>
    )

}

