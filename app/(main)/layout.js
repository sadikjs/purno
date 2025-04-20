import { MainNav } from "@/components/main-nav";
import { SessionProvider } from "next-auth/react";
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
    <div>
      <header className=" w-full flex flex-col justify-center items-center z-40 backdrop-blur-md fixed top-0 left-0 right-0 border-b">
        <div className="container flex h-20 items-center justify-between p-6 ">
          <SessionProvider>
            <MainNav items={navLink} />
          </SessionProvider>
        </div>
      </header>
      {children}
    </div>
  );
}
