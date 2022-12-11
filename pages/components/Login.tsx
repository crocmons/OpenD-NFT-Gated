import { useRouter } from 'next/router'
import React from 'react'


const Login = () => {
    const router = useRouter();
    const handleLogin = ()=>{
        router.replace("/login")
      }
  return (
            <button
            onClick={handleLogin}
            className="flex flex-row-reverse items-end mx-3 my-3 text-fuchsia-600 py-4 px-10 border-2 border-fuchsia-600 rounded-md transition duration-200 hover:text-white hover:bg-fuchsia-600 mt-10 font-bold uppercase"
            >
              Login
            </button>
        
  )
}

export default Login