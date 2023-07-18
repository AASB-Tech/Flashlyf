//import Image from "next/image";
import "@/app/globals.css";
//import WelcomeLogo from "@/features/GetStarted/WelcomeLogo";
import SignUp from "@/features/signup/SignUp";

export default function SignUpPage() {
  return (
    <div className="max-w-[393px] w-screen bg-[#F9F9F9] h-inherit min-h-[852px]">
      <div className="flex flex-col justify-center items-center gap-[0px]">
        {/* <WelcomeLogo /> */}
        <SignUp />
      </div>
    </div>
  );
}
