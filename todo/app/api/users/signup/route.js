import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/mailer";



connect()



export async function POST(request){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

       

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            console.log( "User already exists")
            return NextResponse.send({error: "User already exists"}, {status: 400})
        }
        console.log(reqBody);

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        

        return NextResponse.json    ({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}