import DislikeBtn from "./DislikeBtn";
import LikeBtn from "./LikeBtn";
import ShareBtn from "./ShareBtn";


export default function RightSidePanel() {

    return (
        <>
            <div className="flex">
                <LikeBtn />
                <ShareBtn />
                <DislikeBtn />
            </div>
        </>
    )
}
