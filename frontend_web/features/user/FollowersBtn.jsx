"use client"

import React, { useState } from "react";
import FollowersPopUp from "./FollowersPopUp";

export default function FollowersBtn() {

    const [showPopUp, setShowPopUp] = useState(false);

    const togglePopUp = () => {
        setShowPopUp(true)
    };

    return (
        <>
            {showPopUp ? <FollowersPopUp />
            : null}
            <div>
                
            </div>
        </>
    );
}


