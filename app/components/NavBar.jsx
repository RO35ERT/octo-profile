'use client' // Keep this if you use client-side hooks like usePathname or useState

import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // For active link highlighting
import { FaBars, FaTimes, FaCode } from 'react-icons/fa'; // Example icons

const poppins = Poppins({
    weight: ['400', '500', '600', '700'], // Include weights you'll use
    subsets: ['latin-ext']
});

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/profile', label: 'Profile Explorer' }, // Renamed for clarity
    { href: '/about', label: 'About' },
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Get current path

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${poppins.className} bg-gray-900 text-gray-100 shadow-lg sticky top-0 z-50`}>
            <nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex items-center justify-between h-20"> {/* Increased height */}
                    {/* Logo/Site Title */}
                    <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                        <FaCode size={28} /> {/* Example Icon */}
                        <span>Octo Profile</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className='hidden md:flex items-center space-x-6 lg:space-x-8'>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`text-lg pb-1 border-b-2 transition-all duration-300 ease-in-out
                                            ${isActive
                                                ? 'text-blue-400 border-blue-400 font-semibold'
                                                : 'text-gray-300 border-transparent hover:text-blue-300 hover:border-blue-300'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            className="text-gray-300 hover:text-blue-400 focus:outline-none focus:text-blue-400 transition-colors"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <ul className='flex flex-col space-y-3 pt-2'>
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)} // Close menu on click
                                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                                                ${isActive
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default NavBar;