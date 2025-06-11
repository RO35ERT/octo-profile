import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa'; // Example icon

const HomePage = () => {
  return (
    // The RootLayout likely handles the overall page background (bg-gray-900)
    // and provides padding via `container mx-auto px-4 ...` in its <main> tag.
    // So, this component's main div doesn't need to re-apply those.
    // We'll focus on the content structure within the <main> area.

    <section className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-12 py-12 md:py-20 min-h-[calc(100vh-10rem)]">
      {/*
        min-h-[calc(100vh-10rem)] is an example to make the hero section take up significant vertical space.
        Adjust '10rem' (160px) based on your NavBar and Footer height to make it feel "full page".
        Alternatively, if your RootLayout's <main> is set to flex-grow, this section
        will naturally fill available space if it's the only child.
        For simplicity, we can also remove min-h and let content dictate height.
      */}

      {/* Text Content Area */}
      <div className="text-center lg:text-left max-w-xl lg:max-w-2xl px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Octo-Profile:
          </span>
          <br />
          Your GitHub Story, Visualized.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Effortlessly explore GitHub profiles, discover repositories, and view contribution activity.
          Get started by searching for a GitHub user.
        </p>
        <Link
          href="/profile" // Link to your profile search page
          className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base sm:text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
        >
          Explore Profiles
          <FaArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Image Area */}
      <div className="mt-8 lg:mt-0 px-4">
        <Image
          src={'/bg1.png'} // Ensure this path is correct (relative to /public folder)
          width={450}     // Increased size for better visual impact
          height={450}
          alt="Illustration representing GitHub profiles or code exploration - Octo-Profile" // More descriptive alt text
          className="rounded-xl shadow-2xl object-contain hover:scale-105 transition-transform duration-300"
          priority // Good for LCP (Largest Contentful Paint) if this image is above the fold
        />
      </div>
    </section>
  );
}

export default HomePage;