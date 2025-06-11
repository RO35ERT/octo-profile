import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // If you want to link to the developer or other pages
import { FaCheckCircle, FaGithub, FaHeart } from 'react-icons/fa'; // Example icons

const About = () => {
  const features = [
    "Search for GitHub users and their public repositories.",
    "View detailed repository information including stars, forks, and watchers.",
    "Explore repository-specific details (if linked from the profile page).",
    "Clean and intuitive interface for easy navigation.",
  ];

  return (
    // RootLayout's <main> likely provides `container mx-auto px-4 ...`
    // So, this component's main div doesn't need to re-apply those general page paddings.
    <div className="max-w-3xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-0">
      {/* Page Header */}
      <header className="text-center mb-10 md:mb-14">
        <div className="inline-block mb-6">
          <Image
            src={'/bg1.png'} // Assuming this is your project logo or a relevant illustration
            width={120}     // Increased size for better visibility
            height={120}
            alt="Octo-Profile Mascot or Logo" // Be descriptive
            className="rounded-full shadow-lg" // Example styling
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-3">
          About Octo-Profile
        </h1>
        <p className="text-xl text-gray-300">
          Your friendly neighborhood GitHub profile explorer.
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-10 text-lg text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 border-b border-gray-700 pb-2">
            What is Octo-Profile?
          </h2>
          <p>
            Octo-Profile is a web application designed to help you quickly search for and explore public GitHub user profiles and their repositories. Whether you're a developer looking to check out someone's work, a recruiter scouting talent, or just curious, Octo-Profile provides a streamlined way to access this information.
          </p>
          <p className="mt-3">
            Our goal is to offer a clean, user-friendly interface to navigate the vast world of GitHub projects without the clutter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-5 border-b border-gray-700 pb-2">
            Key Features
          </h2>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className="text-green-400 mt-1.5 mr-3 flex-shrink-0" size={20} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 border-b border-gray-700 pb-2">
            The Mission
          </h2>
          <p>
            We believe in the power of open source and the amazing work developers share on GitHub. Octo-Profile aims to make discovering and appreciating this work a little bit easier and more enjoyable for everyone.
          </p>
        </section>

        <section className="text-center pt-6">
          <p className="flex items-center justify-center">
            Crafted with <FaHeart className="text-red-500 mx-1.5" aria-label="love" /> by 
            <a
              href="https://github.com/RO35ERT" // Link to your GitHub profile
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
            >
              Robert
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Check out the project on <FaGithub className="inline-block mx-1" />
            <a
              href="https://github.com/RO35ERT/octo-profile" // Replace with actual project repo link if public
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline"
            >
              GitHub
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;