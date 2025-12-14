import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
import Otp from "../models/Otp.js";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "pasindu.udana.mendis@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD
    }});

export async function createUser(req, res) {
    try {
        const data = req.body;

        // check if email exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = bcrypt.hashSync(data.password, 10);

        const user = new User({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: hashedPassword,
            role: data.role,
        });

        await user.save();

        res.json({ message: "User created successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// =====================
// LOGIN USER
// =====================
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            image: user.image,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "150h",
        });

        res.json({
            message: "Login successful",
            token,
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// =====================
// GET CURRENT USER
// =====================
export async function getCurrentUser(req, res) {
    try {
        // `verifyToken` middleware attaches `req.user` when a valid token is provided
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        res.json(req.user);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// =====================
// ADMIN CHECK (MIDDLEWARE)
// =====================
export function isAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Access denied" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }

    next();
}

export async function googleLogin(req, res) {
    try {
        // Get access token from frontend
        const accessToken = req.body.access_token;

        if (!accessToken) {
            return res.status(400).json({ message: "Token missing" });
        }

        // Fetch Google user info
        const googleResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = googleResponse.data;

        // Extract names safely (Google may not provide family_name)
        const firstName =
            data.given_name ||
            data.name?.split(" ")[0] ||
            "Unknown";

        const lastName =
            data.family_name ||
            data.name?.split(" ")[1] ||
            "NA"; // fallback to avoid validation error

        const email = data.email;
        const image = data.picture;

        // Check if user exists
        let user = await User.findOne({ email });

        // If not found → create new user
        if (!user) {
            user = new User({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: "123",   // You can hash this later
                image: image,
            });

            await user.save();
        }

        // JWT payload
        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isEmailVerified: true,
            image: user.image,
        };

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "150h",
        });

        // Successful response
        res.json({
            message: "Login successful",
            token,
            role: user.role
        });

    } catch (err) {
        console.error("Google login error:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}

export async function validateOTPAndUpdatePassword  (req, res) {

    try{
    const otpCode = req.body.otp;
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    const otp = await Otp.findOne({ email: email, otp: otpCode });
    if (!otp) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    
    await User.updateOne({email:email},{
        $set : {password: hashedPassword , isEmailVerified : true}
    });
    res.json({
        message: "Password updated successfully"})
        }catch(err){
            res.status(500).json({
                message: "failed to update",
                error: err.message,})
}
}


export async function sendOTP(req, res) {

    try{
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await Otp.deleteMany({
        email:email
    })    

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const otpEntry = new Otp({
        email: email,
        otp: otpCode 

    })
    await otpEntry.save();
    
    const message = {
        
        from : "pasindu.udana.mendis@gmail.com",
        to : email,
        subject : "You OTP Code for Password Reset",
        text : `Your OTP code is ${otpCode}. It is valid for 10 minutes.`
    }

    transporter.sendMail(message , (err,info) =>{
        if(err){
            res.status(500).json({
                message: "Failed to send OTP",
                error: err.message
            })
        }else{
            res.json({
                message:"OTP sent sucessfully"
            })

        }

    })
    }catch(err){
        res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}