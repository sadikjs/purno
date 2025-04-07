"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import logo from "@/public/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
export function MainNav({ items, children }) {
  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loginSession, setLoginSession] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  console.log(loggedInUser);
  useEffect(() => {
    setLoginSession(session);
    async function fetchMe() {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const data = await response.json();
          setLoggedInUser(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchMe();
  }, [session]);
  return (
    <>
      <div className="flex gap-6 lg:gap-10">
        <Link className="text-white" href="/">
          <Image src={logo} width="70" height="70" alt="logo" />
        </Link>
        {items?.length ? (
          <nav className="hidden gap-6 lg:flex text-white">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-amber-500 sm:text-sm"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
      </div>
      <nav className="flex items-center gap-3">
        {!loginSession && (
          <div className="items-center gap-3 hidden lg:flex">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Login
            </Link>
            <Link
              href="/application"
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Register
            </Link>
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage src={loggedInUser?.picture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            {loggedInUser?.user.role === "admin" && (
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/account/enrolled-courses">info</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="">Download</Link>
            </DropdownMenuItem>
            {loginSession && (
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href="#"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {loginSession && (
          <Link
            className="cursor-pointer"
            href="#"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Link>
        )}
        <Button
          className="flex items-center space-x-2 lg:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X /> : <Menu />}
        </Button>
      </nav>
    </>
  );
}
