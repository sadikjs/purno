import Profile from "./_components/Profile";
const DynamicPage = async({ params }) => {
    const id = (await params).id
    return (
        <div className="w-full">
            <Profile id={id}/>
        </div>
    );
}

export default DynamicPage