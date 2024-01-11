import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

function createTransport (config){
    const transporter = nodemailer.createTransport(config)

    return transporter
}

let configurations = ({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    auth: {
        user: "devngecu@gmail.com",
        pass: "falvxbsapmgowzel" 
    }
})

export const sendMail = async(messageOption)=>{
    const transporter = await createTransport(configurations)

    await transporter.verify()

    await transporter.sendMail(messageOption, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log(info.response); 
        }
    })
}