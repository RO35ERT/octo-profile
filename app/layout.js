import { Roboto } from "next/font/google";
import "./globals.css";

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
