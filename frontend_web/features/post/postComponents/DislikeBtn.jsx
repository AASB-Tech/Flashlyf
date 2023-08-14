"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export default function DislikeBtn({isClicked}) {

    const handleClick = () => {

    };

    return (
        <>
            <div>
                <button
                    onClick={handleClick}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        fontSize="30px"
                        style={isClicked ? {color: "#23cb98"} : {color: "#ff3131"}}
                    />
                </button>
            </div>
        </>
    )
}
