import "@/app/globals.css";
//import WelcomeLogo from "@/features/GetStarted/WelcomeLogo";
import ForgotPassword from "@/features/forgotPassword/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-[393px] w-screen bg-[#F9F9F9] h-inherit min-h-[852px] bg-gradient-to-b from-FFyellow from-40% to-FForange">
      <div className="flex flex-col justify-center items-center gap-[0px]">
        <ForgotPassword />
      </div>
    </div>
  );
}
