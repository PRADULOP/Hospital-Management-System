import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <img 
            onClick={() => navigate('/')} 
            className="w-36 sm:w-40 cursor-pointer transition-transform duration-300 hover:scale-105" 
            src={assets.admin_logo} 
            alt="Admin Logo" 
          />
          <span className="border border-gray-300 px-3 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-50">
            {aToken ? 'Admin' : 'Doctor'}
          </span>
        </div>
        
        <button 
          onClick={() => logout()} 
          className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-8 py-2 rounded-md font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default AdminNavbar

// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { DoctorContext } from '../context/DoctorContext'
// import { AdminContext } from '../context/AdminContext'
// import { useNavigate } from 'react-router-dom'

// const AdminNavbar = () => {

//   const { dToken, setDToken } = useContext(DoctorContext)
//   const { aToken, setAToken } = useContext(AdminContext)

//   const navigate = useNavigate()

//   const logout = () => {
//     navigate('/')
//     dToken && setDToken('')
//     dToken && localStorage.removeItem('dToken')
//     aToken && setAToken('')
//     aToken && localStorage.removeItem('aToken')
//   }

//   return (
//     <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
//       <div className='flex items-center gap-2 text-xs'>
//         <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
//         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
//       </div>
//       <button onClick={() => logout()} className='bg-cyan-500 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
//     </div>
//   )
// }

// export default AdminNavbar