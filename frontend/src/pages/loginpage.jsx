import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";


export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const googleLogin = useGoogleLogin({})
  
    const navigate = useNavigate();

    async function login(){
        console.log("log clicked");
        console.log("Email:",email);
        console.log("Password:",password);
        setIsLoading(true);

        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/users/login", {
                email: email,
                password: password
            });
            console.log("Login response:", res.data);
            // Log token received from backend for debugging
            console.log("Token (from response):", res.data.token);
            toast.success(res.data.message);

            localStorage.setItem("token", res.data.token);

            // Backend returns token but not the role directly.
            // Decode the JWT payload to obtain the role when needed.
            const token = res.data.token || localStorage.getItem("token");
            console.log("Token (stored):", token);
            let role = res.data.role;
            if (!role && token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    role = payload.role;
                } catch (e) {
                    console.warn("Failed to decode token payload:", e);
                }
            }

            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
            
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error?.response?.data?.message || "Login failed");
            setIsLoading(false);
        }
          }


    return(
        <div className="w-full h-full bg-[url('/background.jpg')] flex bg-center bg-cover bg-no-repeat">
            <div className="w-[50%] h-full flex flex-col justify-center items-center">
                <img 
                    src="/logo.png" 
                    alt="logo" 
                    className="w-[200px] h-[200px] object-cover"
                />
                <h1 
                    className="text-[50px] text-golden text-shadow-2xs text-shadow-accent font-bold ">Plug In. Power Up. Play Hard
                    </h1>
                <p 
                    className="text-white italic text-[30px]">Your Ulitimate Destination for Gaming Gear</p>

            </div>
            <div className="w-[50%] h-full flex justify-center items-center ">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center">
                    <h1 className="text-[40px] font-bold mb-[20px] text-accent text-shadow-white">Login</h1>
                    <input onChange={
                            (e) => {
                                setEmail(e.target.value)
                            }
                        } type="email" placeholder="Your Email" className="w-[400px] h-[50px] mb-[25px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-golden " />
                    <input onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        } type="password" placeholder="Your Password" className="w-[400px] h-[50px] mb-[20px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-golden " />
                    <button onClick={login} className="w-[400px] h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg hover:bg-transparent hover:text-accent ">Login</button>
                    <button onClick={googleLogin} className="w-[400px] mt-[30px] h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg hover:bg-transparent hover:text-accent ">Login With <FaGoogle className="inline ml-2 mb-1 " /></button>
                    <div className="mt-[20px] text-white">
                        <span>Don't have an account? </span>
                        <Link to="/register" className="text-golden font-bold hover:underline">Register</Link>
                    </div>

                </div>

            </div>
            {isLoading && <Loader />}
        </div>
    )
}