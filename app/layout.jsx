// RootLayout.jsx
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./footer/page";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"]
});

export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-900"> {/* Added bg-gray-900 here if it's the absolute base */}
      <body className={`${roboto.className} text-gray-100 flex flex-col min-h-screen antialiased`}>
        {/*
          - `flex flex-col`: Makes direct children (NavBar, main, Footer) stack vertically.
          - `min-h-screen`: Ensures the body takes at least the full viewport height.
        */}

        <NavBar />

        <main className="flex flex-col flex-grow"> {/* <--- KEY CHANGES HERE */}
          {/*
            - `flex flex-col`: If `children` (like HomePage) also use flex-grow, this helps them expand correctly.
            - `flex-grow`: Allows this main content area to expand and push the footer down.
            - Container/padding for general pages can be applied INSIDE children or conditionally.
              For a full-bleed hero like HomePage, we want <main> to be a flexible container first.
          */}
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}