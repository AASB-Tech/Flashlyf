//import Image from "next/image";
//import WelcomeLogo from "@/features/GetStarted/WelcomeLogo";
import SignUp from "@/features/signup/SignUp";

export default function SignUpPage() {
  return (
    <div className="max-w-[415px] w-screen bg-offwhite h-inherit min-h-[852px] bg-gradient-to-b from-FFyellow from-40% to-FForange">
      <div className="flex flex-col justify-center items-center gap-[0px]">
        {/* <WelcomeLogo /> */}
        <SignUp />
      </div>
    </div>
  );
}
