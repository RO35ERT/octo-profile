import React from 'react'
import Search from '../components/Search'
import { metadata } from '../layout'


const Profile = () => {
  return (
    <div className='bg-gray-900 text-gray-100'>
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex justify-center items-center">
            <Search/>
        </div>
    </div>
  )
}

export default Profile