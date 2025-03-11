import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await userModel.findOne({ email });
        
        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        
        // Check if user has admin role
        if (user.role !== 'admin') {
            return res.json({ success: false, message: "Access denied: Admin privileges required" });
        }
        
        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            // Create token with user ID and role
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET
            );
            
            // Return success response with token and role
            res.json({ 
                success: true, 
                token,
                role: user.role
            });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    loginAdmin
}