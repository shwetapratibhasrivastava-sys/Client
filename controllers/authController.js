import User from "../models/authModel.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "All feilds are required" });
  }

  const exisitingUser = await User.findOne({ email });
  if (exisitingUser) {
    return res.json({
      message: "User already exists,Please enter other email id",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedpassword });
  res.json({
    message: "User created successfully",
    data: user,
  });
};


export const login=async(req,res)=>{
    try {
     const{email,password}=req.body
  if(!email||!password)
    {
        return res.json({
            message:"All fields are required"
        })
    }

    const exisitingUser=await User.findOne({email})
    if(!exisitingUser){
        return res.json({
            message:"Email doesn't exists"
        })
    }
     const comparePassword=await bcrypt.compare(password,exisitingUser.password)
     if(comparePassword){
            return res.json({
            data:exisitingUser
     })
     }
     else{
        return res.json({
            message:"Incorrect Password"
        })
     }
   
    } catch (error) {
        res.json({
            message:error.message
        })
    }

} 
