'use client'

import React from 'react';
import { useState } from'react';

const Search = ({}) => {

    const [search, setSearch] = useState("")

    const handleSearchChange = (e) => {
    setSearch(e.target.value);
    };

    function handleSubmit(){
        
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input value={search} onChange={handleSearchChange} className="bg-white h-10 px-5 rounded-tl-lg rounded-bl-lg text-sm focus:outline-none text-black" placeholder="Search" />
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-tr-lg rounded-br-lg">search</button>
        </form>
    </div>
  )
}

export default Search;