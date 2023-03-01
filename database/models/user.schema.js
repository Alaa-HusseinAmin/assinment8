import mongoose from "mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        minLength:[2,'name too short'],
        maxLength:[15,'name too long'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minLength:[2,'password too short'],
        required:true,
    },
    age:{
        type:Number,
        min:10,
        max:80,
    },
    PhoneNumber:{
        type:Number,
    },
    confirmedEmail:{
        type:Boolean,
        default:false,
    },
    IsDeleted:{
        name: String,
        isDeleted: { type: Boolean, defaults: false }
      },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
    },{timestamps:true})
    userSchema.plugin(softDeletePlugin);
export const userModel = mongoose.model('user',userSchema)