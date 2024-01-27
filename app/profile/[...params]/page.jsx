'use client'
import React from 'react'
import { useState } from'react';


const RepoPage = ({params}) => {
    const [repos, setRepo] = useState([]);
    const  handleSubmit = async() => {
        if(search.length > 0){
            const res = await fetch(`https://api.github.com/users/${params.params[1]}/repos`);
            const data = await res.json();
            setRepo(data);
        }
    }

    

  return (
    <div>{}</div>
  )
}

export default RepoPage