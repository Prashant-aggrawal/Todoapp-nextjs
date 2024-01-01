

import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


connect();
export const POST=async (request) => {


    try {

        const reqBody=await request.json();
        const{email,password}=reqBody;
        console.log(reqBody);

        const user = User.findOne(email);


        if(!user){
            return NextResponse.json({error:"invlaid credentials"},{status:400});
        }

        console.log(user);

        const tokenData={
            id: user.id,
            username: user.username,
            email: user.email
        }

        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({success:true,
            message:"Login successful"
        });

        response.cookies.set("token",token,
        {httponly:true });

        return response;
        
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}