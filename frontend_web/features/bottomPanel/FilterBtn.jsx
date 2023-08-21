"use client"

import { useState } from "react";
import { useRecoilState } from "recoil";
import { postTypeFilterState as postTypeFilterStateRecoil, orderFilterState as orderFilterStateRecoil} from "@/shared/state/globalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faVideo, faImage, faMicrophoneLines, faFileLines, faAward, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@/shared/components/Backdrop";

export default function FilterBtn() {

  const [postTypeFilterState, setPostTypeFilterState] = useRecoilState(postTypeFilterStateRecoil);
  const [orderFilterState, setOrderFilterState] = useRecoilState(orderFilterStateRecoil);

    const [isOpen, setIsOpen] = useState(false);

    const togglePostTypeFilterState = (filterName) => {
      if (filterName === "text") {
        setPostTypeFilterState((prevFilter) => ({
          ...prevFilter,
          text: !prevFilter.text,
        }));
      } 
      else if (filterName === "image") {
        setPostTypeFilterState((prevFilter) => ({
          ...prevFilter,
          image: !prevFilter.image,
        }));
      } 
      else if (filterName === "video") {
        setPostTypeFilterState((prevFilter) => ({
          ...prevFilter,
          video: !prevFilter.video,
        }));
      } 
      else if (filterName === "audio") {
        setPostTypeFilterState((prevFilter) => ({
          ...prevFilter,
          audio: !prevFilter.audio,
        }));
      } 
      else if (filterName === "all") {
        setPostTypeFilterState({
          text: true,
          image: true,
          video: true,
          audio: true,
        });
      }
    };

    const toggleOrderFilterState = (filterName) => {
      if (filterName === "top") {
        setOrderFilterState({
          top: true,
          expiring: false,
          recent: false,
        });
      } 
      else if (filterName === "expiring") {
        setOrderFilterState({
          top: false,
          expiring: true,
          recent: false,
        });
      } 
      else if (filterName === "recent") {
        setOrderFilterState({
          top: false,
          expiring: false,
          recent: true,
        });
      } 
    };

    const toggleFilter = () => {
        setIsOpen(isOpen === true ? false : true);
    };

    return (
      <>
        <div className="relative bg-offwhite">
        <FontAwesomeIcon 
            icon={faFilter} 
            onClick={toggleFilter}
            fontSize="30px"
            style={{color: "#3734a6",}}
        />
        {isOpen ? 
          <>
            <Backdrop show={true} onClick={toggleFilter} />
            <div className="absolute bottom-full top-auto	right-0 z-[100] rounded-lg bg-white border p-2">
              <p className="text-center text-black">Filter by:</p>
              <div className="">
                <div className="flex flex-row justify-between">
                  <div className="m-2">                                         
                    <FontAwesomeIcon 
                      icon={faVideo} 
                      onClick={() => {togglePostTypeFilterState("video")}}
                      fontSize="30px"
                      style={{color: postTypeFilterState.video ? "#3734a6" : "#4d4d4d"}}
                    />
                  </div>
                  <div className="m-2">
                    <FontAwesomeIcon 
                      icon={faImage} 
                      onClick={() => {togglePostTypeFilterState("image")}}
                      fontSize="30px"
                      style={{color: postTypeFilterState.image ? "#3734a6" : "#4d4d4d"}}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="m-2">
                    <FontAwesomeIcon 
                      icon={faMicrophoneLines} 
                      onClick={() => {togglePostTypeFilterState("audio")}}
                      fontSize="30px"
                      style={{color: postTypeFilterState.audio ? "#3734a6" : "#4d4d4d"}}
                    />
                  </div>
                  <div className="m-2">
                    <FontAwesomeIcon 
                      icon={faFileLines} 
                      onClick={() => {togglePostTypeFilterState("text")}}
                      fontSize="30px"
                      style={{color: postTypeFilterState.text ? "#3734a6" : "#4d4d4d"}}
                    />
                  </div>
                </div>
                <div className="text-center m-2">
                  <button
                    onClick={() => {togglePostTypeFilterState("all")}}
                  >
                    <p className={`${postTypeFilterState.text &&
                                    postTypeFilterState.image &&
                                    postTypeFilterState.video &&
                                    postTypeFilterState.audio ? 
                                    'text-FFblue' : 'inactivegrey'} text-lg font-bold`}
                    >
                      All
                    </p>
                  </button>
              </div>
              </div>
              <hr className="h-0.5 bg-black" />
              <div className="flex flex-row justify-between">
                <div className="m-2">
                  <FontAwesomeIcon 
                    icon={faAward} 
                    onClick={() => {toggleOrderFilterState("top")}}
                    fontSize="30px"
                    style={{color: orderFilterState.top ? "#3734a6" : "#4d4d4d"}}
                  />
                </div>
                <div className="m-2">
                  <FontAwesomeIcon 
                    icon={faHourglassEnd} 
                    onClick={() => {toggleOrderFilterState("expiring")}}
                    fontSize="30px"
                    style={{color: orderFilterState.expiring ? "#3734a6" : "#4d4d4d"}}
                  />
                </div>
              </div>
              <div className="text-center m-2">
                <button
                  onClick={() => {toggleOrderFilterState("recent")}}
                >
                  <p className={`${orderFilterState.recent ? 'text-FFblue' : 'inactivegrey'} text-lg font-bold`}>Recent</p>
                </button>
              </div>
            </div>
          </>
        : null
        }
        </div>
      </>
    )
}
