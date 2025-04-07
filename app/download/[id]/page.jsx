import Download from "./_components/Download";
const DownloadPage = async ({ params }) => {
  const id = (await params).id;
  return (
    <div className="w-full">
      <Download id={id} />
    </div>
  );
};

export default DownloadPage;
