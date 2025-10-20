import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(){
        console.log("log clicked");
        console.log("Email:",email);
        console.log("Password:",password);
  

        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/users/login", {
                email: email,
                password: password
            });
            console.log("Login response:", res.data);
            alert(res.data.message);
            
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed");
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
                    <div className="mt-[20px] text-white">
                        <span>Don't have an account? </span>
                        <Link to="/register" className="text-golden font-bold hover:underline">Register</Link>
                    </div>

                </div>

            </div>
        </div>
    )
}