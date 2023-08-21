import BottomPanel from "@/features/bottomPanel/BottomPanel";
import PersonalNewsfeed from "@/features/home/Content/PersonalNewsfeed";
import Header from "@/features/home/header/Header";
import NavigationPanel from "@/features/home/navigationPanel/NavigationPanel";
//import Home from "@/features/home/Home";

// This is the personal newsfeed
export default function HomePage() {
  return (
    <div className="max-w-[415px] w-screen bg-offwhite h-inherit min-h-[852px]">
      <div className="flex flex-col items-center">
        <Header />
        <NavigationPanel />
        <PersonalNewsfeed />
        <BottomPanel />
      </div>
    </div>
  );
}
