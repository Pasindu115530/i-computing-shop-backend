import { Link } from "react-router-dom";
import {BiPlus} from "react-icons/bi";
export default function adminProductPage() {
    return (
        <div className="w-full h-full justify-center items-center flex text-6xl font-bold relative">
            Product pages
            <Link to="/admin/add-items" className="w-[50px] h-[50px] flex items-center text-6xl border-[2px] rounded-full absolute right-[20px] bottom-[20px] hover:text-white hover:bg-accent border-accent"><BiPlus /></Link>
        </div>

        
    );
}
