import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {

  return (
    <>
      <div className="px-6 py-8 w-full flex flex-col gap-[100px]">
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <div className="flex flex-col gap-0 w-full">
            <p className="text-dark font-medium text-[30px] text-dm">FlashLyf</p>
            <p className="mb-8 text-FFblue font-normal text-center">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-16 flex flex-row gap-[5px]">
            <p className="text-dark">Go back to </p>
            <Link href="/signup">
              <button className="text-FFbluelink font-bold underline">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
