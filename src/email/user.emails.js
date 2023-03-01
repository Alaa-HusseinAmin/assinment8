import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { emailHtml } from "./email.html.js";
export const sendMail=async (options)=>{
    let token = jwt.sign({email:options.email},"email")
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"lola888hussein@gmail.com",
            pass:"phqmsfkdynspywjl",
        },
    });
  
    let info =await transporter.sendMail({
        from:"lola888hussein@gmail.com",
        to:options.email,
        subject:"Hi",
        html:emailHtml(token),
    });
    console.log(info);
}
