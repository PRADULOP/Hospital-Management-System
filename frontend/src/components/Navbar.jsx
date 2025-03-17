import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  // Add scroll detection for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  // Custom NavLink component with active state styling
  const CustomNavLink = ({ to, children }) => {
    const isActive = location.pathname === to
    
    return (
      <NavLink to={to} onClick={() => setShowMenu(false)}>
        <li className={`relative px-4 py-2 transition-all duration-300 hover:text-cyan-600 ${
          isActive ? 'text-cyan-600 font-semibold' : 'text-gray-700'
        }`}>
          {children}
          {isActive && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-600 transform scale-x-100 transition-transform duration-300"></span>
          )}
        </li>
      </NavLink>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2 bg-white shadow-md' 
        : 'py-4 bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className='flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105'
          >
            {/* <img className='w-10 h-10' src={assets.logo2} alt="Logo" /> */}
            <span className="font-bold text-xl text-cyan-600 hidden sm:block">Care Connect</span>
          </div>
          
          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center gap-6 font-medium'>
            <CustomNavLink to='/'>HOME</CustomNavLink>
            <CustomNavLink to='/doctors'>ALL DOCTORS</CustomNavLink>
            <CustomNavLink to='/about'>ABOUT</CustomNavLink>
            <CustomNavLink to='/contact'>CONTACT</CustomNavLink>
          </ul>

          {/* Actions Section */}
          <div className='flex items-center gap-3'>
            {token && userData ? (
              <div className='relative group'>
                <div className='flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'>
                  <img 
                    className='w-9 h-9 rounded-full object-cover border-2 border-cyan-500' 
                    src={userData.image} 
                    alt="User" 
                  />
                  <span className="text-gray-700 hidden sm:block">{userData.name || 'User'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-cyan-600 transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Dropdown Menu */}
                <div className='absolute top-full right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right'>
                  <div className='bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden'>
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{userData.name || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{userData.email || 'user@example.com'}</p>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={() => navigate('/my-profile')} 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        My Profile
                      </button>
                      <button 
                        onClick={() => navigate('/my-appointments')} 
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        My Appointments
                      </button>
                    </div>
                    <div className="py-1 border-t border-gray-100">
                      <button 
                        onClick={logout} 
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className='hidden md:flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-md font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>LogIn</span>
              </button>
            )}
            
            <button 
              onClick={() => navigate('/admin-login')} 
              className='hidden md:flex items-center gap-1 bg-white border border-cyan-500 text-cyan-600 px-5 py-2 rounded-md font-medium hover:bg-cyan-50 transition-all duration-300'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414L10 11.414l1.42 1.42a3.5 3.5 0 101.414-1.414L11.414 10l1.42-1.42A3.5 3.5 0 1010 6.5L8.58 7.92 7.165 6.58A3.5 3.5 0 005.5 2zM9 2a1 1 0 00-1 1v1H3a1 1 0 00-1 1v3a1 1 0 102 0V6h4v1a1 1 0 102 0V3a1 1 0 00-1-1h1zm-.5 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
              </svg>
              <span>Admin/Doctor</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMenu(true)} 
              className='p-2 md:hidden rounded-full hover:bg-gray-100 transition-colors duration-200'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-xl transition-transform duration-300 transform ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-5 flex items-center justify-between border-b border-gray-200">
            {/* <img src={assets.logo2} className="h-8" alt="Logo" /> */}
            <span className="font-bold text-xl text-cyan-600 ">Care Connect</span>
            <button 
              onClick={() => setShowMenu(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-5">
            {token && userData && (
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
                <img 
                  src={userData.image} 
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" 
                />
                <div>
                  <p className="font-medium text-gray-900">{userData.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{userData.email || 'user@example.com'}</p>
                </div>
              </div>
            )}
            
            <ul className="space-y-4">
              <li>
                <NavLink 
                  to="/"
                  onClick={() => setShowMenu(false)}
                  className={({isActive}) => 
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-cyan-50 text-cyan-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/doctors"
                  onClick={() => setShowMenu(false)}
                  className={({isActive}) => 
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-cyan-50 text-cyan-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  ALL DOCTORS
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about"
                  onClick={() => setShowMenu(false)}
                  className={({isActive}) => 
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-cyan-50 text-cyan-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact"
                  onClick={() => setShowMenu(false)}
                  className={({isActive}) => 
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-cyan-50 text-cyan-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  CONTACT
                </NavLink>
              </li>
            </ul>
            
            <div className="mt-8 space-y-3">
              {!token && (
                <button 
                  onClick={() => {
                    navigate('/login')
                    setShowMenu(false)
                  }} 
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-md font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Sign In</span>
                </button>
              )}
              
              {token && userData && (
                <>
                  <button 
                    onClick={() => {
                      navigate('/my-profile')
                      setShowMenu(false)
                    }} 
                    className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    My Profile
                  </button>
                  
                  <button 
                    onClick={() => {
                      navigate('/my-appointments')
                      setShowMenu(false)
                    }} 
                    className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    My Appointments
                  </button>
                  
                  <button 
                    onClick={() => {
                      logout()
                      setShowMenu(false)
                    }} 
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </>
              )}
              
              <button 
                onClick={() => {
                  navigate('/admin-login')
                  setShowMenu(false)
                }} 
                className="w-full flex items-center justify-center gap-2 bg-white border border-cyan-500 text-cyan-600 px-4 py-3 rounded-md font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414L10 11.414l1.42 1.42a3.5 3.5 0 101.414-1.414L11.414 10l1.42-1.42A3.5 3.5 0 1010 6.5L8.58 7.92 7.165 6.58A3.5 3.5 0 005.5 2zM9 2a1 1 0 00-1 1v1H3a1 1 0 00-1 1v3a1 1 0 102 0V6h4v1a1 1 0 102 0V3a1 1 0 00-1-1h1zm-.5 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                </svg>
                <span>Admin/Doctor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar




// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Navbar = () => {

//   const navigate = useNavigate()

//   const [showMenu, setShowMenu] = useState(false)
//   const { token, setToken, userData } = useContext(AppContext)

//   const logout = () => {
//     localStorage.removeItem('token')
//     setToken(false)
//     navigate('/login')
//   }

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
//       <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo2} alt="" />
//       <ul className='md:flex items-start gap-5 font-medium hidden'>
//         <NavLink to='/' >
//           <li className='py-1'>HOME</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/doctors' >
//           <li className='py-1'>ALL DOCTORS</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/about' >
//           <li className='py-1'>ABOUT</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/contact' >
//           <li className='py-1'>CONTACT</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//       </ul>

//       <div className='flex items-center gap-4 '>
//         {
//           token && userData
//             ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//               <img className='w-8 rounded-full' src={userData.image} alt="" />
//               <img className='w-2.5' src={assets.dropdown_icon} alt="" />
//               <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//                 <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
//                   <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                   <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                   <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
//                 </div>
//               </div>
//             </div>
//             : <button onClick={() => navigate('/login')} className='bg-cyan-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
//         }
//         <button onClick={() => navigate('/admin-login')} className='bg-cyan-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Admin/Doctor</button>
        
//         <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

//         {/* ---- Mobile Menu ---- */}
//         <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//           <div className='flex items-center justify-between px-5 py-6'>
//             <img src={assets.logo} className='w-36' alt="" />
//             <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
//           </div>
//           <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//             <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar