"use client";

import Link from "next/link";

export default function NavigationBtn({type, icon}) {
    return (
      <>
        <div className="mx-2 p-2 rounded-lg bg-FFblue">
          <Link href={`/${type.toLowerCase()}`}>
            <button>
              {icon}
              <p
                className="text-white"
              >
                {type}
              </p>
            </button>
          </Link>
        </div>
      </>
    );
}


