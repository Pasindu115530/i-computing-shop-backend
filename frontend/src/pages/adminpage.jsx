import { Route, Routes ,Link } from "react-router-dom";
import { HiOutlineClipboardList} from "react-icons/hi";
import { LuBoxes } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { GoCodeReview } from "react-icons/go";
import AdminProductPage from "./admin/adminProductpage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";


export default function adminpage(){
    // Add at top of this file: 

        return(
            <div className="w-full h-full bg-accent flex">
                <div className="w-[300px] bg-accent h-full ">
                    <div className="w-full h-[100px] text-primary flex items-center ">
                        <img src="/logo.png" className="h-full" />
                        <h1 className="text 2xl">Admin Panel</h1>
                    </div>

                    <div className="w-full h-[400px] text-white bg-accent  text-2xl flex flex-col pl-[20px] pt-[20px]">
                        <Link to="/admin" className="w-full flex items-center h-[50px]"><HiOutlineClipboardList/>Orders</Link>
                        <Link to="/admin/products" className="w-full flex items-center h-[50px]"><LuBoxes />Products</Link>
                        <Link to="/admin/users" className="w-full flex items-center h-[50px]"><FiUsers/>Users</Link>
                        <Link to="/admin/reviews" className="w-full flex items-center h-[50px]"><GoCodeReview/>Reviews</Link>
                    </div>
                </div>

                <div className="w-[calc(100%-300px)] bg-primary h-full max-h-full overflow-y-scroll border-[10px]">
                    <Routes>
                        <Route path="/" element={<h1>Orders</h1>} />
                        <Route path="/products" element={<AdminProductPage />} />
                        <Route path="/add-items" element={<AdminAddProductPage/>} />
                        <Route path="/update-item" element={<AdminUpdateProductPage />} />
                        <Route path="/users" element={<h1>Users</h1>} />
                        <Route path="/reviews" element={<h1>Reviews</h1>} />
                    </Routes>
                </div>
            </div>
        )
}