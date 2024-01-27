'use client'
import React from 'react'
import { useState } from'react';
import { useEffect } from 'react';


  const RepoPage = async({params}) => {
    const [repo, setRepo] = useState({});
    const [isSet, setIsSet] = useState(false);


    const  getData = async() => {
        const res = await fetch(`https://api.github.com/users/${params.params[1]}/repos`);
        const data = await res.json();
        const filtered = data.filter(e => e.name === params.params[0]);
        setRepo(filtered);
    }

    await getData();



    console.log(isSet);
  return (
    <div>
        {isSet? <div>{repo.name}</div> : <div>loading...</div>}
    </div>
  )
}

export default RepoPage