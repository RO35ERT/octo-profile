'use client'
import React from 'react'
import { useState } from'react';
import {FaStar,FaEye, FaCodeBranch} from "react-icons/fa";
import Link from 'next/link';

const Profile = () => {

    const [search, setSearch] = useState("");
    const [repos, setRepo] = useState([]);
    const [set, setSet] = useState(false);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const  handleSubmit = async() => {
        if(search.length > 0){
            const res = await fetch(`https://api.github.com/users/${search}/repos`);
            const data = await res.json();
            setRepo(data);
            setSet(true);
        }
    }

  return (
    <div className='bg-gray-900 text-gray-100'>
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col justify-center items-center">
            <div className=''>
                <input value={search} onChange={handleSearchChange} className="bg-white h-10 px-5 rounded-tl-lg rounded-bl-lg text-sm focus:outline-none text-black" placeholder="Search" />
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-tr-lg rounded-br-lg">search</button>
            </div>
            <div className="w-3/4 mx-10 my-6 px-5 py-4 rounded-lg text-sm focus:outline-none text-black flex flex-col justify-center">
                <div className="">
                    {set ? repos.map((repo)=>{
                        return (
                            <Link className='' key={repo.id} href={`/profile/${repo.name}`}>
                            <div className="bg-blue-500 w-3/4 text-gray-300 mb-4 mx-auto font-bold py-2 px-4 rounded-lg">
                                <h4 className='px-5 text-lg'>{repo.name}</h4>
                                <div className="flex justify-between items-center text-lg px-5 py-5">
                                    <div className="flex items-center gap-4">
                                        <FaStar/>
                                        <p>{repo.stargazers_count}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <FaCodeBranch/>
                                        <p>{repo.forks_count}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <FaEye/>
                                        <p>{repo.watchers}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        )
                    }):<p className='text-center text-white pt-7'>Search for a repository</p>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile