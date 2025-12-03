import { Link } from "react-router-dom";

export default function ProductCard(props){
    const product = props.product;

    return(
        <div className="max-w-[300px] w-full bg-white rounded-xl shadow-2xl overflow-hidden m-3 transform hover:scale-105 transition-transform duration-200 ">
            <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center relative hover:[&_.primary-image]:opacity-0 ">
                <img
                    src={product.images && product.images.length ? product.images[0] : ''}
                    alt={product.name || 'product image'}
                    className="max-h-full object-contain absolute"
                />
                <img
                    src={product.images && product.images.length ? product.images[1] : ''}
                    alt={product.name || 'product image'}
                    className="max-h-full object-contain absolute primary-image transition-opacity duration-500"
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
                    <Link
                        to={`/overview/${product.productID}`}
                        aria-label={`View ${product.name}`}
                        className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 rounded-md text-sm font-medium shadow-md transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        View Product
                    </Link>
                </div>
            </div>
        </div>
    )

}

