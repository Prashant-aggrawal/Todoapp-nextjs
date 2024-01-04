import User from "@/models/userModel";
import { NextResponse } from "next/server";


export async function POST(request)
{

try {
    const requestBody=await request.json();
    const {token}=requestBody
    console.log(token);

    const user=await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

    if (!user) {
        return NextResponse.json({error: "Invalid token"}, {status: 400})
    }
    console.log(user);

user.isVerfied = true;
user.verifyToken = undefined;
user.verifyTokenExpiry = undefined;
await user.save();

return NextResponse.json({
    message: "Email verified successfully",
    success: true
})


} catch (error) {
return NextResponse.json({error: error.message}, {status: 500})
}

}