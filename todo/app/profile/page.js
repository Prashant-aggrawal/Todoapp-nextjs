'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

  const router = useRouter()
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

<button
            onClick={logout}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Logout</button>
            
    </div>
  )
}

export default page