import CreatePost from "@/features/post/CreatePost";

export default function CreatePostPage() {

    return (
        <>
            <div className="max-w-[415px] w-screen bg-[#F9F9F9] h-inherit min-h-[852px]">
                <div className="flex flex-col justify-center items-center gap-[0px]">
                    <CreatePost />
                </div>
            </div>
        </>
    );
}
