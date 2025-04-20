import dashboard from "@/public/assets/data-dashboard.jpg";
import Image from "next/image";
export default function DashboardPage() {
  return (
    <div className="w-[95%] h-full flex flex-col justify-center items-center">
      <Image
        src={dashboard}
        alt=""
        width="100%"
        height="100%"
        quality={100}
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
        objectFit="cover"
      />
    </div>
  );
}
