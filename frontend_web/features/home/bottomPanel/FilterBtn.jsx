"use client"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faVideo, faImage, faMicrophoneLines, faFileLines, faAward, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@/shared/components/Backdrop";

export default function FilterBtn() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(isOpen === true ? false : true);
    };

    return (
      <>
        <div className="relative">
        <FontAwesomeIcon 
            icon={faFilter} 
            onClick={toggleFilter}
            fontSize="30px"
            style={{color: "#3734a6",}}
        />
        {isOpen ? 
          <>
            {/* <div className="fixed w-full h-full bg-overlay-black max-w-[415px] top-0"></div> */}
            <Backdrop show={true} onClick={toggleFilter} />
            <div className="absolute bottom-full top-auto	right-0 z-50 rounded-lg bg-white border p-2">
              <p className="text-center text-black">Filter by:</p>
              <div className="">
                <div className="flex flex-row justify-between">
                  <div className="m-2">                                         
                    <FontAwesomeIcon 
                      icon={faVideo} 
                      onClick=""
                      fontSize="30px"
                      style={{color: "#4d4d4d",}}
                    />
                  </div>
                  <div className="m-2">
                    <FontAwesomeIcon 
                      icon={faImage} 
                      onClick=""
                      fontSize="30px"
                      style={{color: "#4d4d4d",}}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="m-2">
                    <FontAwesomeIcon 
                      icon={faMicrophoneLines} 
                      onClick=""
                      fontSize="30px"
                      style={{color: "#4d4d4d",}}
                    />
                  </div>
                  <div className="m-2">
                    <FontAwesomeIcon 
                      icon={faFileLines} 
                      onClick=""
                      fontSize="30px"
                      style={{color: "#4d4d4d",}}
                    />
                  </div>
                </div>
              </div>
              <hr className="h-0.5 bg-black" />
              <div className="flex flex-row justify-between">
                <div className="m-2">
                  <FontAwesomeIcon 
                    icon={faAward} 
                    onClick=""
                    fontSize="30px"
                    style={{color: "#4d4d4d",}}
                  />
                </div>
                <div className="m-2">
                  <FontAwesomeIcon 
                    icon={faHourglassEnd} 
                    onClick=""
                    fontSize="30px"
                    style={{color: "#4d4d4d",}}
                  />
                </div>
              </div>
              <p className="text-FFblue text-lg font-bold text-center m-2">All</p>
            </div>
          </>
        : null
        }
        </div>
      </>
    )
}
