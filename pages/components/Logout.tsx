import React from 'react'
import { useLogout } from '@thirdweb-dev/react/solana';
const Logout = () => {
    const logout = useLogout();
  return (
        <button
          onClick={logout}
          className="flex flex-row-reverse items-end mx-3 my-3 text-fuchsia-600 py-4 px-10 border-2 border-fuchsia-600 rounded-md transition duration-200 hover:text-white hover:bg-fuchsia-600 mt-10 font-bold uppercase"
          >
           LogOut
          </button>
  )
}

export default Logout