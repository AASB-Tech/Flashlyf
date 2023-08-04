import Link from "next/link";

export default function Button({ text, link, type, onclick, isDisabled }) {
  return (
    <>
      <Link href={`${link}`}>
        <button 
          className={`${isDisabled ? 'bg-inactivegrey' : 'bg-FFblue'} rounded-full text-white font-bold border border-black w-full flex items-center justify-center text-dm py-3 text-light`}
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


