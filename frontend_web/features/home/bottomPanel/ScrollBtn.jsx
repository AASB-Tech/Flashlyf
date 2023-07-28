"use client"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDown, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

export default function ScrollBtn() {

    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(isActive === true ? false : true);
    };

    return (
        <>
            <FontAwesomeIcon 
                icon={faArrowsUpDown} 
                onClick={toggleActive}
                fontSize="30px"
                style={{color: "#3734a6",}}
            />
            <FontAwesomeIcon 
                icon={faTableCellsLarge} 
                onClick={toggleActive}
                fontSize="30px"
                style={{color: "#3734a6",}}
            />
            {/* {isActive ? 

            : null
            } */}
        </>
    )
}

/* Requires Fonteawesome Pro: */

/*
<FontAwesomeIcon 
icon={faGrid2} 
onClick={toggleActive}
fontSize="15px"
style={{color: "#3734a6",}}
/>
*/