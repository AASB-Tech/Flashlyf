import "@/app/globals.css";
//import WelcomeLogo from "@/features/GetStarted/WelcomeLogo";
import Login from "@/features/login/Login";

export default function LoginPage() {
  return (
    <div className="max-w-[415px] w-screen bg-[#F9F9F9] h-inherit min-h-[852px] bg-gradient-to-b from-FFyellow from-40% to-FForange">
      <div className="flex flex-col justify-center items-center gap-[0px]">
        {/* <WelcomeLogo /> */}
        <Login />
      </div>
    </div>
  );
}

//to-90%