import React from 'react'
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="">
      <Image
        src={'/bg1.png'}
        width={300}
        height={280}
        alt='penguin'
      />
    </div>
  );
}

export default HomePage;