"use client"

import "./halfCircleOverlay.css";
//import "@/shared/styles/halfCircleOverlay.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleUser } from "@fortawesome/free-solid-svg-icons";

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
            {isOpen ?
                <div className="half-circle z-40"> 
                    <div className="flex opacity-100 z-50">
                        <FontAwesomeIcon
                            icon={faPlus}
                            fontSize="25px"
                            style={{color: "#3734a6",}}
                        />
                    </div>

                    <div className="flex opacity-100 z-50">
                        <FontAwesomeIcon
                            icon={faCircleUser}
                            fontSize="25px"
                            style={{color: "#3734a6",}}
                        />
                    </div>
                </div>
                :
                null
            }
        </>
    )
}
//absolute w-1/2 h-1/2 top-1/2 left-1/2 rounded-full bg-red-800