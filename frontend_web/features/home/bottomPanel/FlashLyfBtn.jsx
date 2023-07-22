"use client"

import { useState } from "react";

export default function FlashLyfBtn() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(isOpen === true ? false : true);
    };

    return (
        <>
            <div
                className="bg-FFyellow rounded-full"
            >
                <button
                    onClick={toggleOpen}
                >
                    <img 
                        src="" 
                        alt="FlashLyf Button" 
                        width="25" 
                        height="25"
                    />
                </button>
            </div>
        </>
    )
}
