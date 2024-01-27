'use client'
import React from 'react'
import { useState } from'react';
import {FaStar,FaEye, FaCodeBranch} from "react-icons/fa";

const Profile = () => {

    const [search, setSearch] = useState("")

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    function handleSubmit(){
        
    }
  return (
    <div className='bg-gray-900 text-gray-100'>
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col justify-center items-center">
            <form action="" onSubmit={handleSubmit}>
                <input value={search} onChange={handleSearchChange} className="bg-white h-10 px-5 rounded-tl-lg rounded-bl-lg text-sm focus:outline-none text-black" placeholder="Search" />
                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-tr-lg rounded-br-lg">search</button>
            </form>
            <div className="bg-white w-2/4 mx-10 my-6 px-5 py-4 rounded-tl-lg rounded-bl-lg text-sm focus:outline-none text-black">
                <div className="">
                    <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
                        <h4>My blog post</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile