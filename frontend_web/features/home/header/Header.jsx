import Link from "next/link";
import TextLogo from "@/shared/components/TextLogo";
import LatestNotification from "./LatestNotification";
import NotificationBtn from "./NotificationBtn";

export default function Header() {
    return (
        <>
            <div className="my-4 flex flex-row justify-between">
                <div className="flex flex-row gap-[5px]">
                    <div className="mr-10">
                        <Link href={`/global`}>
                            <TextLogo />
                        </Link>
                    </div>
                    <LatestNotification />
                    <NotificationBtn />
                </div>
            </div>
        </>
    );
}
