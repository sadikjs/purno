import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { MainNav } from "@/components/main-nav";
import { SessionProvider } from "next-auth/react";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

//main nav item
const navLink = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Notice",
    href: "/notice",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className=" w-full flex flex-col justify-center items-center z-40 backdrop-blur-md fixed top-0 left-0 right-0 border-b">
          <div className="container flex h-20 items-center justify-between p-6 ">
            <SessionProvider>
              <MainNav items={navLink} />
            </SessionProvider>
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
