import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[url(../public/assets/bg2.png)] no-repeat bg-center bg-cover text-center">
      <p className="text-amber-600 text-4xl">Welcome to Kazakhstan</p>
    </div>
  );
}
