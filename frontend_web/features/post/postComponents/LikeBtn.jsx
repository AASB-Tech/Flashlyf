"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function LikeBtn({isClicked}) {

    const handleClick = () => {

    };

    return (
        <>
            <div>
                <button
                    onClick={handleClick}
                >
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        fontSize="20px"
                        style={isClicked ? {color: "#23cb98"} : {color: "#f8f2df"}}
                    />
                </button>
            </div>
        </>
    )
}
