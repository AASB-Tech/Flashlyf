import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Login() {

  return (
    <>
      <div className="px-6 py-8 w-full flex flex-col gap-[100px]">
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <div className="flex flex-col gap-0 w-full">
            <p className="text-dark font-medium text-[30px] text-dm">Welcome back to FlashLyf!</p>
            <p className="text-grey font-normal">Login to your account</p>
          </div>

          <LoginForm />

          <div className="flex flex-row gap-[5px]">
            <p className="text-dark">Don't have an account?</p>
            <Link href="/signup">
              <button className="text-purple">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
