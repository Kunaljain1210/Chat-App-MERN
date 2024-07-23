import React from 'react'
import { CiLogout } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useLogout from '../../hooks/useLogout';

const LoggoutButton = () => {

  const {loading, logout} = useLogout();
  return (
    <div className='mt-auto'>
      {/* <CiLogout className='w-6 h-6 mt-4 text-white cursor-pointer'/> */}

      {!loading ? (
          <CiLogout className='w-6 h-6 mt-4 text-white cursor-pointer' 
            onClick={logout}
          />
      ) : (
        <span> <AiOutlineLoading3Quarters /> </span>
      )}

    </div>
  )
}
export default LoggoutButton
