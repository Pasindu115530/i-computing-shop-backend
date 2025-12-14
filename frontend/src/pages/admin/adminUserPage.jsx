import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all" , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    setUsers(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                    toast.error("Failed to load users");
                });
        }
    }, [loaded]);

    return (
        <div className="w-full p-8 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-auto mx-auto max-w-6xl">
                {loaded ? (
                    <table className="min-w-full table-auto">
                        <thead className="bg-accent text-white">
                            <tr>
                                <th className="px-4 py-3 text-center">Image</th>
                                <th className="px-4 py-3 text-center">Email</th>
                                <th className="px-4 py-3 text-center">First Name</th>
                                <th className="px-4 py-3 text-center">Last Name</th>
                                <th className="px-4 py-3 text-center">Role</th>
                                <th className="px-4 py-3 text-center">status</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr
                                    key={u.userID}
                                    className="odd:bg-slate-50 even:bg-white hover:bg-slate-100"
                                >
                                    <td className="px-4 py-3 flex items-center justify-center">
                                        <img
                                            src={u.images?.[0] ?? "/logo.png"}
                                            alt={u.firstName}
                                            className="w-14 h-14 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-center">{u.email}</td>
                                    <td className="px-4 py-3 text-center">{u.firstName}</td>
                                    <td className="px-4 py-3 text-center">{u.lastName}</td>
                                    <td className="px-4 py-3 text-center">{u.role}</td>
                                    <td className="px-4 py-3 text-center">{u.status}</td>
                                    <td className="px-4 py-3 text-center">
                                        <Link
                                            to={`/admin/edit-user/${u.userID}`}     
                                            className="text-blue-500 hover:underline"
                                        >Edit</Link>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <Loader />
                )}
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
