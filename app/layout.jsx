import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./footer/page";

const roboto = Roboto(
  { 
    weight: '300',
  subsets: ["latin"] }
  );

export const metadata = {
  title: "Octo-Profile",
  description: "A GitHub profile card generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className='bg-gray-900 text-gray-100'>
            <NavBar className='bg-gray-900 text-gray-100'/>
        </div>  
        {children}
        <div className='bg-gray-900 text-gray-100 py-10 px-8'>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
