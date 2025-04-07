"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function MobileNav({ items, children }) {
  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-30 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md border">
        <nav className="grid grid-flow-row auto-rows-max text-sm justify-center items-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="w-32 flex flex-col justify-center items-center m-auto gap-3 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Main Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 mt-4">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="#">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {children}
      </div>
    </div>
  );
}
