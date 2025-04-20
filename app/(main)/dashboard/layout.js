import Sidebar from "./_components/sidebar";
import dbConnect from "@/service/dbConnect";
const DashboardLayout = async ({ children }) => {
  await dbConnect();
  return (
    <div className="w-full h-full flex flex-row justify-start">
      <div className="hidden lg:flex h-full w-48 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="w-full h-full flex flex-col justify-center items-center lg:pl-56 pt-[80px] bg-[#013082]">
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;
