import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  return (
    // This section will attempt to grow and fill the available space in RootLayout's <main>
    // It's also a flex container to center its content (the inner div).
    <section className="flex flex-col flex-grow items-center justify-center text-center p-4 sm:p-6 md:p-8 min-h-0">
      {/*
        - `flex-grow`: Allows this section to take up available space within the parent flex container (RootLayout's <main>).
        - `flex flex-col items-center justify-center`: Centers the direct child (the content div) vertically and horizontally.
        - `text-center`: Default text alignment to center for mobile.
        - `p-4 sm:p-6 md:p-8`: Responsive padding around the entire hero content.
        - `min-h-0`: Often useful for flex children that grow, to prevent overflow issues in some browsers/scenarios.
      */}

      {/* Inner container for the two-column layout (text and image) */}
      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-12 w-full max-w-6xl">
        {/*
          - `w-full max-w-6xl`: The content row takes full width up to a max of 6xl for better readability on large screens.
        */}

        {/* Text Content Area */}
        <div className="lg:text-left max-w-xl lg:max-w-2xl animate-fadeInUp"> {/* Added animation example */}
          {/* `lg:text-left`: Overrides the parent's `text-center` on larger screens. */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Octo-Profile:
            </span>
            <span className="block mt-1 sm:mt-2">Your GitHub Story, Visualized.</span>
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-300 mb-8">
            Effortlessly explore GitHub profiles, discover repositories, and view contribution activity.
            Get started by searching for a GitHub user.
          </p>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 border border-transparent text-base sm:text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
          >
            Explore Profiles
            <FaArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>

        {/* Image Area */}
        <div className="mt-8 lg:mt-0 animate-fadeInUp animation-delay-300"> {/* Added animation example with delay */}
          <Image
            src={'/bg1.png'}
            width={400} // Slightly adjusted for balance, can be tweaked
            height={400}
            alt="Octo-Profile: Illustration of GitHub exploration or a code mascot" // Slightly improved alt text
            className="rounded-xl shadow-2xl object-contain hover:scale-105 transition-transform duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md"
            // `w-full max-w-xs sm:max-w-sm md:max-w-md`: Makes image responsive within its column
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default HomePage;