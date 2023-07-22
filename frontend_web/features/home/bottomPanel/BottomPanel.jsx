import FlashLyfBtn from "./FlashLyfBtn";
import ScrollBtn from "./ScrollBtn";
import TypeFilterBtn from "./TypeFilterBtn";

export default function BottomPanel() {

    return (
    <>
        <div className="my-4 flex flex-row justify-between">
            <div className="flex flex-row gap-[5px]">
                <ScrollBtn />
                <FlashLyfBtn />
                <TypeFilterBtn />
            </div>
        </div>
    </>
    );
}
//min-h-[5%]