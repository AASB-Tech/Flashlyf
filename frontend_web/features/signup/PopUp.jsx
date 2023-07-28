import Button from "@/shared/components/Button";
import "./popup.css";

export default function PopUp() {
  return (
    <>
      <div>
        <div className="fixed w-full h-full bg-overlay-black max-w-[415px] top-0"></div>
        <div className="z-20 max-w-[415px] text-dm fixed bottom-0 left-0 px-6 py-8 w-full flex flex-col gap-0 bg-[#ffff] text-dark">
          <p className="text-dark font-medium text-[28px] text-dm">Thank you for signing up.</p>
          <p className="text-grey font-normal">Your FlashLyf account has been created. <br/> You can now login.</p>
          <div className="mt-8">
            <Button
              text="Continue to login"
              link="/login"
            />
          </div>
        </div>
      </div>
    </>
  );
}
