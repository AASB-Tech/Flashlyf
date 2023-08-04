import User from "@/features/user/User";

export default function UserPage() {

    return (
        <>
            <div className="max-w-[415px] w-screen bg-[#F9F9F9] h-inherit min-h-[852px]">
                <div className="flex flex-col">
                    <User />
                    <BottomPanel />
                </div>
            </div>
        </>
    );
}
