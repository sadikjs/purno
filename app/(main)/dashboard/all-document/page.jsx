import { getApplication } from "@/queries";
import dbConnect from "@/service/dbConnect";
import Document from "./_components/document";

const TanstackPage = async () => {
  await dbConnect();
  const data = await getApplication();
  return (
    <div className="w-full bg-[#013082]">
      <Document allData={data} />
    </div>
  );
};

export default TanstackPage;
