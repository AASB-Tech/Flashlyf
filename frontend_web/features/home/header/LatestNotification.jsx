import "@/shared/styles/scrollText.css";

export default function LatestNotification() {

    return (
        <>
            <div className="bg-FFgrey text-black whitespace-nowrap text-clip overflow-hidden max-h-6 w-full max-w-fit">
                <p 
                    className="px-1 scroll-text"
                >
                    Iso commented on your post.
                </p>
            </div>
        </>
    );
}
