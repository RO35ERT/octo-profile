import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar"; // Assuming this is the correct path for your NavBar
import Footer from "./footer/page";     // Using the path you provided for Footer

const roboto = Roboto({
  // It's good to include all the weights you might use throughout the site
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"]
});

export const metadata = {
  title: "Octo-Profile",
  description: "A GitHub profile card generator. Find and explore GitHub user profiles and their repositories.", // Slightly more descriptive
  keywords: "github, profile, repositories, octo-profile, developer, code", // Added some keywords
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full"> {/* Ensure html takes full height */}
      <body className={`${roboto.className} bg-gray-900 text-gray-100 flex flex-col min-h-screen antialiased`}>
        {/*
          The 'flex flex-col min-h-screen' on the body, combined with 'flex-grow' on the main content,
          helps ensure the footer sticks to the bottom even on pages with little content.
          'antialiased' provides smoother font rendering.
        */}

        <NavBar />
        {/*
          The NavBar component (if redesigned as suggested previously)
          should handle its own background and styling.
          No need for an extra wrapper div here just for background.
        */}

        <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
          {/*
            'flex-grow' allows this main content area to expand and push the footer down.
            'container mx-auto px-4' provides consistent padding and centering for page content.
            'py-6 sm:py-8' adds some default vertical padding to the main content area.
          */}
          {children}
        </main>

        <Footer />
        {/*
          Similarly, the Footer component (if redesigned)
          should handle its own background and styling.
          The previous wrapper with 'py-10 px-8' might conflict or be redundant.
          The redesigned Footer already has its own padding.
        */}
      </body>
    </html>
  );
}