import EditEvisa from "./_components/edit-application";
import { getSingleApplication } from "@/queries";
import dbConnect from "@/service/dbConnect";
const EditPage = async ({ params }) => {
  await dbConnect();
  const { id } = await params;
  const initailData = await getSingleApplication(id);
  return (
    <div className="">
      <EditEvisa getUser={initailData} editId={id} />
    </div>
  );
};

export default EditPage;
