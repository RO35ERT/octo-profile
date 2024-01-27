'use client'
import React from 'react'
import { useState } from 'react';

const [search, setSearch] = useState("");
    const [repos, setRepo] = useState([]);


    const  handleSubmit = async() => {
        if(search.length > 0){
            const res = await fetch(`https://api.github.com/users/${search}/repos`);
            const data = await res.json();
            setRepo(data);
        }
    }

const RepoPage = ({params}) => {
  return (
    <div><RepoPage/></div>
  )
}

export default RepoPage