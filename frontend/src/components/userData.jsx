import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default  function UserData(){
    const[user,setUser]= useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {    
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/",{
                headers: {
                    Authorization: `Bearer ${token}`,   
                },
            }).then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                setUser(null);
                console.error("Error fetching user data:", error);      
            });
        }
    } , []);

    return (
        <>
        {user ? 
             <div>{user.firstName} </div>
        : <div>
            <Link to="/login" className="text-primary underline">Login</Link> / <Link to="/register" className="text-primary underline">Register</Link>

        </div>

        }

        </>
    )
}