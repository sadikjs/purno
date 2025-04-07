import Image from "next/image";
import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";
import logo from "@/public/assets/logo.png";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Link href="/">
          <Image src={logo} width="70" height="70" alt="logo" />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
