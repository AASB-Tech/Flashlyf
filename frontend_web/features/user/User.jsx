import Username from "@/features/user/Username";
import FollowBtn from "./FollowBtn";
import FollowersBtn from "./FollowersBtn";

export default function User() {

    return (
        <>
            {/* top section */}
            <div className="flex flex-row justify-between">
                <FollowersBtn />
                <ProfilePic 
                    classes="m2"
                    width="30"
                    height="30"
                />
                <FollowBtn />

            </div>
            {/* top section END */}
            <Username/>
            {/* time details section */}
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <p className="font-bold">{"5 hours"}</p>
                    <p className="">Time added</p>
                </div>
                <div className="flex flex-col">
                    <p className="">Time lost</p>
                    <p className="font-bold">{"2 hours"}</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">{"900"}</p>
                    <p className="">Total posts</p>
                </div>
            </div>
            {/* time details section END */}
            {/* about section */}
            <div>
                <p className="font-bold">About</p>
                <p>{"Hi this is my bio page"}</p>
            </div>
            {/* about section END */}
        </>
    )
}
