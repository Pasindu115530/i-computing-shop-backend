import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";


export default function ForgotPasswordpage() {

    const [otpSent , setOtpSent] = useState(false);
    const [loading , setLoading] = useState(false);
    const [email, setEmail] = useState("");

    async function sentOtp(){
        setLoading(true);
        try{
        
        await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/send-otp/'+email);
        toast.success("OTP sent to your email");
        setLoading(false);
        setOtpSent(true);
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || "Failed to send OTP");
            setLoading(false);
        }

    }
    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            {
                loading && (
                    <Loader />
                )
            }
            {
                otpSent ? 
                ( <>

                 </>):
                    (
                       <div className="w-[400px] h-[400px] flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
                        <input 
                            type="email" placeholder="Enter Your Mail"
                            className="w-full p-2 mb-4 border-gray-400 rounded-2xl"
                            onChange = {(e) => setEmail(e.target.value)}
                        />
                        <button  onClick={() => sentOtp()}
                            className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600">
                                Send OTP </button>
                            

                    </div>
                       )
            }
        
            </div>
    )
}