const { NextResponse } = require("next/server");


export async function GET()
{

    try {

const response=NextResponse.json(
    {
    success:true,
    message:"Logout successfully"
    }

    
)

response.cookies.set( "next-auth.session-token","",
    {
        httpOnly:true,
        expires:new Date(0)
    }
    )

    response.cookies.set( "token","",
    {
        httpOnly:true,
        expires:new Date(0)
    }
    )
return response;
}
catch(error)
{
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}