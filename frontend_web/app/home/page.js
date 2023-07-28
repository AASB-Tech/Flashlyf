import "@/app/globals.css";
import BottomPanel from "@/features/home/bottomPanel/BottomPanel";
import Header from "@/features/home/header/Header";
import NavigationPanel from "@/features/home/navigationPanel/NavigationPanel";
//import Home from "@/features/home/Home";

// This is the personal newsfeed
export default function HomePage() {
  return (
    <div className="max-w-[415px] w-screen bg-[#F9F9F9] h-inherit min-h-[852px]">
      <div className="flex flex-col justify-center items-center">
        <Header/>
        <NavigationPanel />
        <BottomPanel />
      </div>
    </div>
  );
}
