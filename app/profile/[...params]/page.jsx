import React from 'react';
import {FaStar,FaEye, FaCodeBranch} from "react-icons/fa";
import Link from 'next/link';


const  getData = async(params) => {
  const res = await fetch(`https://api.github.com/users/${params.params[1]}/repos`);
  const data = await res.json();
  const filtered = data.filter(e => e.name === params.params[0]);
  return filtered[0];
}


const getDirs = async(params) => {

  const res = await fetch(`https://api.github.com/repos/${params.params[1]}/${params.params[0]}/contents`);
  const data = await res.json();
  const filtered = data.filter(e => e.type === 'dir');
  return filtered;

}

const getLanguages = async(params) => {
  const res = await fetch(`https://api.github.com/repos/${params.params[1]}/${params.params[0]}/languages`);
  const data = await res.json();
  return data;

}


  const RepoPage = async({params}) => {
    const repo = await getData(params);
    const dirs = await getDirs(params);
    const langs = await getLanguages(params);
  return (
    <div>
        <div className="mt-10">
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
                <div className="">
                  <h3>Languages</h3>
                  <div className="pt-2">
                      <div className="flex gap-3">
                        {Object.keys.langs.map((lang)=>{
                          <p>{lang}</p>
                        })}
                      </div>
                  </div>
                </div>
                <div className="px-5 pb-4">
                  <h3>Directories</h3>
                  <div className="pt-2">
                      <ul className="flex flex-col gap-2">
                        {dirs.map((dir)=>{
                          return (
                            <li className="text-lg" key={dir.name}>
                              <div className='text-gray-500'>
                                {dir.name}
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RepoPage