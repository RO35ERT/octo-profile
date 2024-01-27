'use client'
import React from 'react'
import { useState } from'react';


const RepoPage = ({params}) => {
    const [repos, setRepo] = useState([]);
    // const  handleSubmit = async() => {
    //     if(search.length > 0){
    //         const res = await fetch(`https://api.github.com/users/ro35ert/repos`);
    //         const data = await res.json();
    //         setRepo(data);
    //     }
    // }
  return (
    <div>{params.name}</div>
  )
}

export default RepoPage