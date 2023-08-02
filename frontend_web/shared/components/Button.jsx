import Link from "next/link";
import { gray } from "tailwindcss/colors";

export default function Button({ text, link, type, onclick, isDisabled }) {
  return (
    <>
      <Link href={`${link}`}>
        <button 
          className={`${isDisabled ? 'bg-gray-600' : 'bg-FFblue'} rounded-full text-white font-bold border border-black w-full flex items-center justify-center text-dm py-3 text-light`}
          onClick={onclick}
          type={type}
          disabled={isDisabled}
        >
          <p>{text}</p>
        </button>
      </Link>
    </>
  );
}
//{`${isDisabled ? 'inactivegrey' : 'bg-FFblue'}

