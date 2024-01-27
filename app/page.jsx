import React from 'react'
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-gray-100 flex justify-center items-center">
      <Image
        src={'/bg1.png'}
        width={300}
        height={300}
        alt='penguin'
      />
    </div>
  );
}

export default HomePage;