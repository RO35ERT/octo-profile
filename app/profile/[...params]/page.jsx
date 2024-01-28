import React from 'react'


const  getData = async(params) => {
  const res = await fetch(`https://api.github.com/users/${params.params[1]}/repos`);
  const data = await res.json();
  const filtered = data.filter(e => e.name === params.params[0]);
  return filtered[0];
}

  const RepoPage = async({params}) => {
    const repo = await getData(params);
  return (
    <div>
        <div className="bg-white">
            <h4>{repo.name}</h4>
        </div>
    </div>
  )
}

export default RepoPage