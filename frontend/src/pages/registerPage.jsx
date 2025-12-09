import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";


export default function RegisterPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isloading , setisLoading] = useState(false);
  
    const navigate = useNavigate();

    async function register(){
        console.log("Reigister clicked");
        if(firstName.trim()=="" ){
            toast.error("First name is required");
            return;
        }
        if(lastName.trim()=="" ){
            toast.error("Last name is required");
            return;
        }
        if(email.trim()=="" ){
            toast.error("Email is required");
            return;
        }
        if(password !== confirmPassword ){
            toast.error("Passwords do not match");
            return;
        }

       setisLoading(true);
        
  

        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/users/", {
                email: email.trim(),
                password: password.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            });
            console.log("Register response:", res.data);
            console.log("Token (from response):", res.data.token);
            toast.success(res.data.message);

            navigate("/login");
            
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error?.response?.data?.message || "Login failed");
            setisLoading(false);
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
                    <h1 className="text-[40px] font-bold mb-[20px] text-accent text-shadow-white">Register</h1>
                    <input onChange={
                            (e) => {
                                setFirstName(e.target.value)
                            }
                        } type="text" placeholder="Your First Name" className="w-[400px] h-[50px] mb-[25px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-golden " />
                    <input onChange={
                            (e) => {
                                setLastName(e.target.value)
                            }
                        } type="text" placeholder="Your Last Name" className="w-[400px] h-[50px] mb-[25px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-golden " />
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
                    <input onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                            }
                        } type="password" placeholder="Confirm Your Password" className="w-[400px] h-[50px] mb-[20px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-golden " />    
                    <button onClick={register} className="w-[400px] h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg hover:bg-transparent hover:text-accent ">Register</button>
                    <div className="mt-[20px] text-white">
                        <span>Do you have an account? </span>
                        <Link to="/login" className="text-golden font-bold hover:underline">Login</Link>
                    </div>

                </div>

            </div>
            {isloading && <Loader/>}
        </div>
    )
}