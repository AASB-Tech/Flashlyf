import CreatePost from "@/features/post/createPost/CreatePost";

export default function CreatePostPage() {

    return (
        <>
            <div className="max-w-[415px] w-screen bg-offwhite h-inherit min-h-[852px]">
                <div className="flex flex-col">
                    <CreatePost />
                </div>
            </div>
        </>
    );
}
