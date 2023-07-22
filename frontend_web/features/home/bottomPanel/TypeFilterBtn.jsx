"use client"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function TypeFilterBtn() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(isOpen === true ? false : true);
    };

    return (
      <>
        <FontAwesomeIcon 
            icon={faFilter} 
            onClick={toggleFilter}
            fontSize="15px"
            style={{color: "#3734a6",}}
        />
        {isOpen ? 
          <div>
            <p>Hello</p>
          </div>
        : null
        }
      </>
    )
}
