import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

function Dashboard
() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen'>
    {/* Navbar for Recuritor Panel */}
    <div className='shadow py-4'>
      <div className='px-5 flex justify-between items-center'>
        <img onClick={e=>navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo}/>
        <div className='flex items-center gap-3'>
          <p className='max-sm:hidden'> Welcome, Insiderjobs </p>
          <div className='relative group'>
            <img className='w-8 border rounded-full' src={assets.company_icon}/>
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
              <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                <li className='py-2 px-2 cursor-pointer pr-10'>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div className='flex items-start'>
     {/* Left sidebar with option to add job, manage jobs,view Application */}
     <div className='inline-block min-h-screen border-r-2'>
      <ul className='flex flex-col items-start pt-5 text-gray-800'>
        <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
          <img className='min-w-4' src={assets.add_icon}/>
          <p className='max-sm:hidden'>Add Job</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
          <img className='min-w-4' src={assets.home_icon}/>
          <p className='max-sm:hidden'>Manage Jobs</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-application'}>
          <img className='min-w-4' src={assets.person_icon}/>
          <p className='max-sm:hidden'>View Applications</p>
        </NavLink>
      </ul>
     </div>
     <div>
      <Outlet/>
     </div>
    </div>
    
    </div>
  )
}

export default Dashboard
