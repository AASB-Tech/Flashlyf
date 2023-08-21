import FlashLyfBtn from "./FlashLyfBtn";
import ScrollBtn from "./ScrollBtn";
import FilterBtn from "./FilterBtn";

export default function BottomPanel() {

    return (
    <>
        <div className="fixed bottom-0 left-0 w-full max-w-[415px] bg-offwhite z-[90]">
            <div className="flex flex-row gap-[5px] m-2">
                <ScrollBtn />
                <div className="flashlyf-btn">
                    <FlashLyfBtn />
                </div>
                <div className="absolute right-0 mr-2">
                    <FilterBtn />
                </div>
            </div>
        </div>
    </>
    );
}
//min-h-[5%]