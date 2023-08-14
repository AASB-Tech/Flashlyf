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
                        fontSize="30px"
                        style={isClicked ? {color: "#f8f2df"} : {color: "#23cb98"}}
                    />
                </button>
            </div>
        </>
    )
}
