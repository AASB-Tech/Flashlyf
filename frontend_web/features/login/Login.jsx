import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Login() {

  return (
    <>
      <div className="px-6 py-8 w-full flex flex-col gap-[100px]">
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <div className="flex flex-col gap-0 w-full">
            <p className="text-dark font-medium text-[30px] text-dm">FlashLyf</p>
          </div>

          <LoginForm />

          <Link href="/forgot-password">
            <p className="text-FFbluelink underline">Forgot password?</p>
          </Link>

          <div className="mt-16 flex flex-row gap-[5px]">
            <p className="text-dark">Don't have an account?</p>
            <Link href="/signup">
              <button className="text-FFbluelink font-bold underline">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
