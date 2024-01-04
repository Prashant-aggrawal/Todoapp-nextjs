

import User from '@/models/userModel';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


export const sendEmail =async({email, emailType, userId})=>{

    try {
        
   const hashedToken= await bcrypt.hash(userId.toString(),10);

   if(emailType=="VERIFY")
   {

    await User.findByIdAndUpdate(userId,
        {verifyToken:hashedToken,
            verifyTokenExpiry: Date.now() + 3600000})
   }

   else if(emailType=="RESET")
   {

    await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
   }

   var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5a53e69ab74431",
      pass: "278d3fe3249edf"
    }
  });
  const mailOptions = {
    from: 'pamittal43@gmail.com',
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`
}

const mailresponse = await transport.sendMail
(mailOptions);
return mailresponse;


    } catch (error) {
        throw new Error(error.message);   
    }

}