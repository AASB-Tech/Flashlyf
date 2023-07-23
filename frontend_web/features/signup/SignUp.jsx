import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <>
      <div className="px-6 py-8 w-full flex flex-col gap-[100px]">
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <div className="flex flex-col gap-0 w-full">
            <p className="text-dark font-medium text-[30px] text-dm">Flashlyf</p>
          </div>

          <SignUpForm />

          <div className="flex flex-row gap-[5px]">
            <p className="text-dark">Have an account?</p>
            <Link href="/login">
              <p className="text-FFbluelink font-bold underline">Login</p>
            </Link>
          </div>
          <p className="text-xs text-dark">
            By clicking Sign Up, you agree to our {" "}
            <span>
              <Link href="/legal/terms-of-service">
                <button className="text-purple underline">Terms of Service </button>
              </Link>
              <span> and</span>
              <Link href="/legal/privacy-policy">
                <button className="text-purple underline"> Privacy Policy</button>
              </Link>
              .
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
