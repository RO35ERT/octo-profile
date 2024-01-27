'use client'
import React from 'react'
import { useState } from'react';
import { useRouter } from 'next/router';


const RepoPage = () => {
    const [repos, setRepo] = useState([]);

    const router = useRouter();
    const { params } = router.query;
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