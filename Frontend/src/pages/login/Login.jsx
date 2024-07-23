import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Login = () => {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const {loading, login} = useLogin()

  const handleSubmit = async (e) => { 
    e.preventDefault();
    await login(username, password)
}

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Login
            <span className='text-blue-500 ml-2'>ChatApp</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>UserName</span>
              </label>
              <input 
                type='text' 
                placeholder='Enter Your User Name' 
                className='w-full input input-border h-10'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className='label p-2'>
                  <span className='text-base label-text'>Password</span>
              </label>
              <input 
                type='password' 
                placeholder='Enter Password' 
                className='w-full input input-border h-10'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link
                to='/signup' 
                className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						    Don't have an account?
 					  </Link>

          <div>
            {/* <button className='btn btn-block btn-sm mt-2 btn-info'>Login</button> */}
            <button className='btn btn-block btn-sm mt-2 btn-info'
                disabled={loading}
            >   {
                    loading ? 
                    <span> <AiOutlineLoading3Quarters /></span> :
                    "Login"
                }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
