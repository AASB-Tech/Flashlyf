import "./button.css";
import Link from "next/link";

export default function Button({ text, link, type, onclick }) {
  return (
    <>
      <Link href={`${link}`}>
        <button 
          className="gradient-button w-full flex items-center justify-center text-dm py-3 text-light"
          onClick={onclick}
          type={type}
        >
          <p>{text}</p>
        </button>
      </Link>
    </>
  );
}

