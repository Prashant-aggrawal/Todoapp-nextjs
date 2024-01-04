'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

const page = () => {

  const router = useRouter()

const[data,setData] = useState("nothing");

  const getUserDetails = async() =>
  {
    const res=await axios.get('/api/users/me/')
  console.log(res)
  setData(res.data.data._id);


  }
  const logout = () => {
  
    try {

     const response= axios.get('/api/users/logout/');
     console.log("Logout success", response.data);
      
      router.push('/login')

    } catch (error) {
      console.log("Logout failed", error.message);
    }
  }

  return (
    <div  className="flex flex-col items-center justify-center  min-h-screen">

<h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            
            <h2 className="p-1 rounded bg-green-500">
              { data==="nothing"?"nothing":
              
              <Link href={`/profile/${data}`}> {data}
              </Link>
            }
            </h2> 
            

<button
            onClick={logout}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Logout</button>


          <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>  
    </div>
  )
}

export default page