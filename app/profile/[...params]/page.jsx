'use client'
import React from 'react'
import { useState } from'react';


  const RepoPage = ({params}) => {
    const [repo, setRepo] = useState([]);
    const  getData = async() => {
        const res = await fetch(`https://api.github.com/users/${params.params[1]}/repos`);
        const data = await res.json();
        setRepo(data);
        // return data;
    }

    // const handleData = async() => {
    //   const data = await getData();
    //   const filtered = data.filter(repo => repo.name === params.params[0]);
    //   setRepo(filtered);
    // }

   
    console.log(repo);
  return (
    <div>{repo.name}</div>
  )
}

export default RepoPage