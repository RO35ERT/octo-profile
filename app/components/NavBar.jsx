import React from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({weight: '500',subsets: ['latin-ext']});

const NavBar = () => {
  return (
    <div className={poppins.className}>
        <nav className='flex justify-end py-12 px-8'>
            <ul className='flex gap-8'>
                <li className='text-lg'><Link href='/'>Home</Link></li>
                <li className='text-lg'><Link href='/profile'>Profile</Link></li>
                <li className='text-lg'><Link href='/about'>About</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar