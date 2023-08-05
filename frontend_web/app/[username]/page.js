import { useParams } from "next/navigation";
import User from "@/features/user/User";

export default function UserPage() {
    const params = useParams();
    const username = params.username;

    return (
        <>
            <div className="max-w-[415px] w-screen bg-[#F9F9F9] h-inherit min-h-[852px]">
                <div className="flex flex-col">
                    <User 
                        username={username}
                    />
                    <BottomPanel />
                </div>
            </div>
        </>
    );
}
