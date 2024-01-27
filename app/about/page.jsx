import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className='bg-gray-900 text-gray-100 px-8 text-lg'>
        <Image
        src={'/bg1.png'}
        width={100}
        height={100}
        alt='penguin'
      />
      <p>
        Welcome to the Git Repository Checker! <br />This site allows you to search and retrieve information about Git repositories.
      </p>
      <p>
        Whether you're looking for details about a specific repository, <br />exploring popular projects, or tracking the latest trends in the Git world, our site has you covered.
      </p>
      <ul className='pt-1'>
        <li>Search for repositories by name or owner</li>
        <li>View detailed information about a specific repository</li>
        <li>Discover popular repositories across different categories</li>
      </ul>
    </div>
  )
}

export default About