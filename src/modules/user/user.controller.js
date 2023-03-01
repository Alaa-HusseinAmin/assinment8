import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { userModel } from "../../../database/models/user.schema.js";
import { sendMail } from "../../email/user.emails.js";



export const signUp = async (req, res) => {
    const { name, email, password,age,PhoneNumber } = req.body
    let user = await userModel.findOne({ email })
    if (user) {
        res.json({ message: "email already in use" })
    } else {
        bcrypt.hash(password, 8, async function (err, hash) {
            
            await userModel.insertMany({ name, email,age,PhoneNumber,password: hash })
            res.json({ message: 'success' })
            sendMail({email})
        });
    }

}


export const signIn = async (req, res) => {
    const { _id ,email,name,password } = req.body
    let isFound = await userModel.findOne({ email })
    if (isFound) {
         const match = await bcrypt.compare(password, isFound.password);

        if (match) {
            let token=jwt.sign({name:isFound.name,userId:isFound._id,email:isFound.email,role:isFound.role},"alaa")
            res.json({ message: 'login', token })

        } else {
            res.json({ message: 'password incorrect' })
        }
        
    } else {
        res.json({ message: 'Account not found' })
    }
    }


export const Updateuser = async (req, res) => {
    const { _id:id ,email,name,PhoneNumber } = req.body
    let isFound = await userModel.findOne({ email })
    if (isFound) {
        let user = await userModel.findByIdAndUpdate(
            { _id:id },
            { name, PhoneNumber},
            { new: true }
          );
          res.json({ message: "success", user });  
    } else {
        res.json({ message: 'Account not found' })
    }
}

export const Deleteuser = async (req, res) => {
    const {_id:id}=req.body;
    let isFound = await userModel.findOne({_id:id})
    if (isFound) {
    await userModel.findByIdAndDelete({_id:id});
    res.json({ message: "success" }); 
    } else {
        res.json({ message: 'Account not found' })
    }
}


export const SoftDeleteUsers = async(req,res)=>{
    const {_id:id}=req.body
    let user= await userModel.findOne({_id:id})
    if(user){
       const deleted = await userModel.softDelete({ _id:user._id, name: user.name });
      if(deleted){
        const restored = await this.userModel.restore(deleted);
        res.json({restored})
      }
      else{
        res.json({message:"no deleted users"})
   }
}
   else{
       res.json({message:"notfound"})
   }
    }

    export const verify=async (req,res)=>{
        let {token}=req.params;

        jwt.verify(token,'email',async function(err,decoded){
          if(!err){
            await userModel.findOneAndUpdate({email:decoded.email},{confirmedEmail:true})
            res.json({message:"verified"})
          }else{
            res.json(err);
          }
        })
    }

