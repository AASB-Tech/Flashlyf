"use client"

import "./halfCircleOverlay.css";
//import "@/shared/styles/halfCircleOverlay.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@/shared/components/Backdrop";

export default function FlashLyfBtn() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(isOpen === true ? false : true);
    };

    return (
        <>
            <div
                className="relative bg-FFyellow rounded-full p-1 w-[40px] h-[40px]"
            >
                <button
                    onClick={toggleOpen}
                >
                    <img 
                        className=""
                        src="/svg/flashlyf_logo_no_bg.svg" 
                        alt="Flashlyf Button" 
                        width="40" 
                        height="40"
                    />
                </button>
            </div>
            {isOpen ?
                <>
                <Backdrop show={true} onClick={toggleOpen} />
                <div className="absolute bottom-[40px] left-[-20px] flex flex-row opacity-100 z-50 bg-white"> 
                    <div className="flex m-2 ">
                        <FontAwesomeIcon
                            icon={faPlus}
                            fontSize="30px"
                            style={{color: "#3734a6",}}
                        />
                    </div>

                    <div className="flex m-2 opacity-100 z-50">
                        <FontAwesomeIcon
                            icon={faCircleUser}
                            fontSize="30px"
                            style={{color: "#3734a6",}}
                        />
                    </div>
                </div>
                </>
                :
                null
            }
        </>
    )
}
//absolute w-1/2 h-1/2 top-1/2 left-1/2 rounded-full bg-red-800

//bg-black opacity-50

/*
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
*/