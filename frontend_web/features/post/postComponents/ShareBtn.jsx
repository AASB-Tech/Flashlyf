"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

export default function ShareBtn() {

    const handleClick = () => {

    };

    return (
        <>
            <div>
                <button
                    onClick={handleClick}
                >
                    <FontAwesomeIcon
                        icon={faShare}
                        fontSize="30px"
                        style={{color: "#f8f2df"}}
                    />
                </button>
            </div>
        </>
    )
}
